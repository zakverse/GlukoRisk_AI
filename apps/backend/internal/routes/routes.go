package routes

import (
	"glukorisk-backend/internal/handlers"
	"glukorisk-backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

// SetupRouter initializes the Gin engine, registers middleware, and configures API routes.
func SetupRouter(handler *handlers.PredictionHandler, allowedOrigins []string) *gin.Engine {
	router := gin.Default()

	// Global CORS middleware
	router.Use(middleware.CORSMiddleware(allowedOrigins))

	// API Group
	api := router.Group("/api")
	{
		api.GET("/health", handler.HandleHealth)
		api.POST("/predict", handler.HandlePredict)
	}

	return router
}
