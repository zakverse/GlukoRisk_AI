package handlers

import (
	"net/http"
	"time"

	"glukorisk-backend/internal/models"
	"glukorisk-backend/internal/services"

	"github.com/gin-gonic/gin"
)

// PredictionHandler handles HTTP requests for predictions and health checks.
type PredictionHandler struct {
	service services.PredictionService
}

// NewPredictionHandler creates a new PredictionHandler instance.
func NewPredictionHandler(service services.PredictionService) *PredictionHandler {
	return &PredictionHandler{
		service: service,
	}
}

// HandleHealth handles GET /api/health to report server and model readiness.
func (h *PredictionHandler) HandleHealth(c *gin.Context) {
	isLoaded := false
	modelPath := ""

	if h.service != nil {
		isLoaded = h.service.IsModelLoaded()
		modelPath = h.service.GetModelPath()
	}

	c.JSON(http.StatusOK, models.HealthResponse{
		Status:      "ok",
		ModelLoaded: isLoaded,
		ModelPath:   modelPath,
		Timestamp:   time.Now().UTC(),
	})
}

// HandlePredict handles POST /api/predict for diabetes risk inference.
func (h *PredictionHandler) HandlePredict(c *gin.Context) {
	var req models.PredictionRequest

	// 1. JSON binding validation
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.NewErrorResponse(
			"Invalid request payload",
			err.Error(),
		))
		return
	}

	// 2. Domain & feature range validation
	if err := req.Validate(); err != nil {
		c.JSON(http.StatusUnprocessableEntity, models.NewErrorResponse(
			"Validation failed for health indicator features",
			err.Error(),
		))
		return
	}

	// 3. Check service availability
	if h.service == nil || !h.service.IsModelLoaded() {
		c.JSON(http.StatusServiceUnavailable, models.NewErrorResponse(
			"Inference service unavailable",
			"ONNX model is not loaded or runtime is not initialized",
		))
		return
	}

	// 4. Run inference
	response, err := h.service.Predict(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.NewErrorResponse(
			"Prediction inference failed",
			err.Error(),
		))
		return
	}

	// 5. Return prediction result
	c.JSON(http.StatusOK, response)
}
