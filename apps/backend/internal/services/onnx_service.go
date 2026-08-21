package services

import (
	"errors"
	"fmt"
	"log"
	"os"
	"sync"
	"time"

	"glukorisk-backend/internal/models"

	ort "github.com/yalue/onnxruntime_go"
)

// PredictionService defines the interface for machine learning model inference.
type PredictionService interface {
	Predict(req *models.PredictionRequest) (*models.PredictionResponse, error)
	IsModelLoaded() bool
	GetModelPath() string
	Close() error
}

// ONNXService handles ONNX Runtime inference sessions and tensor management.
type ONNXService struct {
	modelPath    string
	session      *ort.AdvancedSession
	inputTensor  *ort.Tensor[float32]
	labelTensor  *ort.Tensor[int64]
	probTensor   *ort.Tensor[float32]
	mutex        sync.Mutex
	isLoaded     bool
}

// NewONNXService initializes the ONNX Runtime environment and loads the trained model.
func NewONNXService(modelPath, onnxLibPath string) (*ONNXService, error) {
	// 1. Check if model file exists
	if _, err := os.Stat(modelPath); os.IsNotExist(err) {
		return nil, fmt.Errorf("ONNX model file not found at '%s': %w", modelPath, err)
	}

	// 2. Initialize ONNX runtime shared library if not already initialized
	if !ort.IsInitialized() {
		if onnxLibPath != "" {
			ort.SetSharedLibraryPath(onnxLibPath)
		}
		if err := ort.InitializeEnvironment(); err != nil {
			return nil, fmt.Errorf("failed to initialize ONNX Runtime environment: %w", err)
		}
		log.Println("[INFO] ONNX Runtime environment initialized successfully.")
	}

	// 3. Create reusable input tensor: shape [1, 21]
	inputShape := ort.NewShape(1, 21)
	dummyInput := make([]float32, 21)
	inputTensor, err := ort.NewTensor(inputShape, dummyInput)
	if err != nil {
		return nil, fmt.Errorf("failed to allocate input tensor: %w", err)
	}

	// 4. Create reusable output tensors:
	// - Label tensor: shape [1] (int64)
	// - Probabilities tensor: shape [1, 2] (float32)
	labelShape := ort.NewShape(1)
	labelTensor, err := ort.NewEmptyTensor[int64](labelShape)
	if err != nil {
		inputTensor.Destroy()
		return nil, fmt.Errorf("failed to allocate label output tensor: %w", err)
	}

	probShape := ort.NewShape(1, 2)
	probTensor, err := ort.NewEmptyTensor[float32](probShape)
	if err != nil {
		inputTensor.Destroy()
		labelTensor.Destroy()
		return nil, fmt.Errorf("failed to allocate probabilities output tensor: %w", err)
	}

	// 5. Create Advanced Inference Session
	inputNames := []string{"float_input"}
	outputNames := []string{"label", "probabilities"}
	inputs := []ort.ArbitraryTensor{inputTensor}
	outputs := []ort.ArbitraryTensor{labelTensor, probTensor}

	session, err := ort.NewAdvancedSession(modelPath, inputNames, outputNames, inputs, outputs, nil)
	if err != nil {
		inputTensor.Destroy()
		labelTensor.Destroy()
		probTensor.Destroy()
		return nil, fmt.Errorf("failed to create ONNX session for '%s': %w", modelPath, err)
	}

	log.Printf("[INFO] ONNX model loaded successfully from: %s", modelPath)

	return &ONNXService{
		modelPath:   modelPath,
		session:     session,
		inputTensor: inputTensor,
		labelTensor: labelTensor,
		probTensor:  probTensor,
		isLoaded:    true,
	}, nil
}

// Predict performs diabetes risk inference on the provided 21 features.
func (s *ONNXService) Predict(req *models.PredictionRequest) (*models.PredictionResponse, error) {
	if !s.isLoaded || s.session == nil {
		return nil, errors.New("ONNX inference session is not active")
	}

	s.mutex.Lock()
	defer s.mutex.Unlock()

	// 1. Prepare feature vector [21]
	features := req.ToFeatureSlice()
	if len(features) != 21 {
		return nil, fmt.Errorf("expected 21 features, got %d", len(features))
	}

	// 2. Copy feature data into input tensor buffer
	copy(s.inputTensor.GetData(), features)

	// 3. Run inference
	if err := s.session.Run(); err != nil {
		return nil, fmt.Errorf("ONNX inference execution failed: %w", err)
	}

	// 4. Extract outputs
	labelData := s.labelTensor.GetData()
	probData := s.probTensor.GetData()

	if len(labelData) < 1 || len(probData) < 2 {
		return nil, errors.New("unexpected output dimensions from ONNX model")
	}

	predictedLabel := labelData[0]
	classProbabilities := []float32{probData[0], probData[1]}
	riskScore := probData[1] // Probability of class 1 (Diabetic)

	// 5. Determine qualitative risk level and guidance
	riskLevel, adviceMessage := models.DetermineRiskLevel(riskScore)
	riskPercent := fmt.Sprintf("%.2f%%", riskScore*100.0)

	return &models.PredictionResponse{
		Success:            true,
		Prediction:         predictedLabel,
		RiskScore:          riskScore,
		RiskPercent:        riskPercent,
		RiskLevel:          riskLevel,
		Message:            adviceMessage,
		ClassProbabilities: classProbabilities,
		Timestamp:          time.Now().UTC(),
	}, nil
}

// IsModelLoaded returns whether the ONNX session is ready for inference.
func (s *ONNXService) IsModelLoaded() bool {
	if s == nil {
		return false
	}
	return s.isLoaded && s.session != nil
}

// GetModelPath returns the path to the loaded model.
func (s *ONNXService) GetModelPath() string {
	if s == nil {
		return ""
	}
	return s.modelPath
}

// Close safely cleans up tensors and inference session resources.
func (s *ONNXService) Close() error {
	if s == nil {
		return nil
	}

	s.mutex.Lock()
	defer s.mutex.Unlock()

	s.isLoaded = false

	if s.session != nil {
		if err := s.session.Destroy(); err != nil {
			log.Printf("[WARN] Error destroying session: %v", err)
		}
		s.session = nil
	}

	if s.inputTensor != nil {
		s.inputTensor.Destroy()
		s.inputTensor = nil
	}
	if s.labelTensor != nil {
		s.labelTensor.Destroy()
		s.labelTensor = nil
	}
	if s.probTensor != nil {
		s.probTensor.Destroy()
		s.probTensor = nil
	}

	return nil
}
