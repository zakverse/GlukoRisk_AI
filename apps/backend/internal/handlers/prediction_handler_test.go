package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"glukorisk-backend/internal/models"

	"github.com/gin-gonic/gin"
)

// mockPredictionService mocks services.PredictionService
type mockPredictionService struct {
	loaded   bool
	path     string
	resp     *models.PredictionResponse
	err      error
}

func (m *mockPredictionService) Predict(req *models.PredictionRequest) (*models.PredictionResponse, error) {
	return m.resp, m.err
}

func (m *mockPredictionService) IsModelLoaded() bool {
	return m.loaded
}

func (m *mockPredictionService) GetModelPath() string {
	return m.path
}

func (m *mockPredictionService) Close() error {
	return nil
}

func ptr(v float32) *float32 {
	return &v
}

func getValidReq() models.PredictionRequest {
	return models.PredictionRequest{
		HighBP:               ptr(1),
		HighChol:             ptr(1),
		CholCheck:            ptr(1),
		BMI:                  ptr(32.5),
		Smoker:               ptr(1),
		Stroke:               ptr(0),
		HeartDiseaseorAttack: ptr(1),
		PhysActivity:         ptr(0),
		Fruits:               ptr(0),
		Veggies:              ptr(1),
		HvyAlcoholConsump:    ptr(0),
		AnyHealthcare:        ptr(1),
		NoDocbcCost:          ptr(0),
		GenHlth:              ptr(4),
		MentHlth:             ptr(5),
		PhysHlth:             ptr(10),
		DiffWalk:             ptr(1),
		Sex:                  ptr(1),
		Age:                  ptr(10),
		Education:            ptr(4),
		Income:               ptr(5),
	}
}

func setupTestRouter(service *mockPredictionService) *gin.Engine {
	gin.SetMode(gin.TestMode)
	router := gin.New()
	handler := NewPredictionHandler(service)

	api := router.Group("/api")
	{
		api.GET("/health", handler.HandleHealth)
		api.POST("/predict", handler.HandlePredict)
	}

	return router
}

func TestHandleHealth(t *testing.T) {
	mockSvc := &mockPredictionService{
		loaded: true,
		path:   "../../models/diabetes_model.onnx",
	}
	router := setupTestRouter(mockSvc)

	req, _ := http.NewRequest(http.MethodGet, "/api/health", nil)
	rec := httptest.NewRecorder()
	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", rec.Code)
	}

	var res models.HealthResponse
	if err := json.Unmarshal(rec.Body.Bytes(), &res); err != nil {
		t.Fatalf("failed to decode json response: %v", err)
	}

	if res.Status != "ok" || !res.ModelLoaded || res.ModelPath != "../../models/diabetes_model.onnx" {
		t.Errorf("unexpected health response: %+v", res)
	}
}

func TestHandlePredict_Success(t *testing.T) {
	mockSvc := &mockPredictionService{
		loaded: true,
		resp: &models.PredictionResponse{
			Success:            true,
			Prediction:         1,
			RiskScore:          0.85,
			RiskPercent:        "85.00%",
			RiskLevel:          "High",
			Message:            "High likelihood of diabetes risk detected.",
			ClassProbabilities: []float32{0.15, 0.85},
			Timestamp:          time.Now().UTC(),
		},
	}
	router := setupTestRouter(mockSvc)

	body, _ := json.Marshal(getValidReq())
	req, _ := http.NewRequest(http.MethodPost, "/api/predict", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	rec := httptest.NewRecorder()
	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d, body: %s", rec.Code, rec.Body.String())
	}

	var res models.PredictionResponse
	if err := json.Unmarshal(rec.Body.Bytes(), &res); err != nil {
		t.Fatalf("failed to decode json response: %v", err)
	}

	if !res.Success || res.Prediction != 1 || res.RiskLevel != "High" {
		t.Errorf("unexpected prediction response: %+v", res)
	}
}

func TestHandlePredict_ValidationError(t *testing.T) {
	mockSvc := &mockPredictionService{loaded: true}
	router := setupTestRouter(mockSvc)

	invalidReq := getValidReq()
	invalidReq.GenHlth = ptr(10) // Valid range is 1-5

	body, _ := json.Marshal(invalidReq)
	req, _ := http.NewRequest(http.MethodPost, "/api/predict", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	rec := httptest.NewRecorder()
	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusUnprocessableEntity {
		t.Fatalf("expected status 422, got %d", rec.Code)
	}
}

func TestHandlePredict_ServiceUnavailable(t *testing.T) {
	mockSvc := &mockPredictionService{loaded: false}
	router := setupTestRouter(mockSvc)

	body, _ := json.Marshal(getValidReq())
	req, _ := http.NewRequest(http.MethodPost, "/api/predict", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	rec := httptest.NewRecorder()
	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusServiceUnavailable {
		t.Fatalf("expected status 503, got %d", rec.Code)
	}
}
