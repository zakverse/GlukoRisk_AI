package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"glukorisk-backend/configs"
	"glukorisk-backend/internal/handlers"
	"glukorisk-backend/internal/routes"
	"glukorisk-backend/internal/services"

	"github.com/gin-gonic/gin"
)

func main() {
	// 1. Load Configurations
	cfg := configs.LoadConfig()

	if cfg.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	log.Println("==================================================")
	log.Println(" GlukoRisk_AI - Diabetes Risk Inference Backend")
	log.Printf(" Environment : %s", cfg.Environment)
	log.Printf(" Model Path  : %s", cfg.ModelPath)
	log.Printf(" Port        : %s", cfg.Port)
	log.Println("==================================================")

	// 2. Initialize ONNX Prediction Service
	var svc services.PredictionService
	onnxService, err := services.NewONNXService(cfg.ModelPath, cfg.ONNXLibPath)
	if err != nil {
		log.Printf("[WARN] ONNX service failed to initialize at startup: %v", err)
	} else {
		svc = onnxService
	}
	defer func() {
		if svc != nil {
			if closeErr := svc.Close(); closeErr != nil {
				log.Printf("[WARN] Error closing ONNX service: %v", closeErr)
			}
		}
	}()

	// 3. Initialize Handlers & Router
	handler := handlers.NewPredictionHandler(svc)
	router := routes.SetupRouter(handler, cfg.AllowedOrigins)

	// 4. Configure HTTP Server
	srv := &http.Server{
		Addr:         cfg.Port,
		Handler:      router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// 5. Start Server in a Goroutine
	go func() {
		log.Printf("[INFO] Server listening on http://localhost%s", cfg.Port)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("[FATAL] Server error: %v", err)
		}
	}()

	// 6. Graceful Shutdown listener
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("[INFO] Shutting down server gracefully...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("[FATAL] Server forced to shutdown: %v", err)
	}

	log.Println("[INFO] Server exited successfully.")
}
