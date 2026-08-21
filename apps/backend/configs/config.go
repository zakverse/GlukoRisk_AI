package configs

import (
	"os"
	"path/filepath"
	"strings"
)

// Config holds all configuration variables for the application.
type Config struct {
	Port           string
	ModelPath      string
	ONNXLibPath    string
	AllowedOrigins []string
	Environment    string
}

// LoadConfig initializes the configuration from environment variables or sensible defaults.
func LoadConfig() *Config {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	if !strings.HasPrefix(port, ":") {
		port = ":" + port
	}

	modelPath := os.Getenv("MODEL_PATH")
	if modelPath == "" {
		// Check common locations
		candidates := []string{
			"../../models/diabetes_model.onnx",
			"../models/diabetes_model.onnx",
			"models/diabetes_model.onnx",
		}
		for _, c := range candidates {
			if _, err := os.Stat(c); err == nil {
				modelPath = c
				break
			}
		}
		if modelPath == "" {
			modelPath = "../../models/diabetes_model.onnx"
		}
	}
	if absModel, err := filepath.Abs(modelPath); err == nil {
		modelPath = absModel
	}

	onnxLibPath := os.Getenv("ONNXRUNTIME_SHARED_LIBRARY_PATH")
	if onnxLibPath == "" {
		onnxLibPath = os.Getenv("ONNX_LIB_PATH")
	}
	if onnxLibPath == "" {
		// Look for local onnxruntime.dll
		candidates := []string{
			"onnxruntime.dll",
			"./onnxruntime.dll",
			"apps/backend/onnxruntime.dll",
		}
		for _, c := range candidates {
			if _, err := os.Stat(c); err == nil {
				onnxLibPath = c
				break
			}
		}
	}
	if onnxLibPath != "" {
		if absLib, err := filepath.Abs(onnxLibPath); err == nil {
			onnxLibPath = absLib
		}
	}

	originsEnv := os.Getenv("ALLOWED_ORIGINS")
	var allowedOrigins []string
	if originsEnv != "" {
		allowedOrigins = strings.Split(originsEnv, ",")
	} else {
		allowedOrigins = []string{"*"}
	}

	env := os.Getenv("APP_ENV")
	if env == "" {
		env = "development"
	}

	return &Config{
		Port:           port,
		ModelPath:      modelPath,
		ONNXLibPath:    onnxLibPath,
		AllowedOrigins: allowedOrigins,
		Environment:    env,
	}
}
