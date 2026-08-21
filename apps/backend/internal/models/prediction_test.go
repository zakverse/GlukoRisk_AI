package models

import (
	"testing"
)

func ptr(v float32) *float32 {
	return &v
}

func getValidRequest() PredictionRequest {
	return PredictionRequest{
		HighBP:               ptr(1),
		HighChol:             ptr(1),
		CholCheck:            ptr(1),
		BMI:                  ptr(28.5),
		Smoker:               ptr(0),
		Stroke:               ptr(0),
		HeartDiseaseorAttack: ptr(0),
		PhysActivity:         ptr(1),
		Fruits:               ptr(1),
		Veggies:              ptr(1),
		HvyAlcoholConsump:    ptr(0),
		AnyHealthcare:        ptr(1),
		NoDocbcCost:          ptr(0),
		GenHlth:              ptr(3),
		MentHlth:             ptr(0),
		PhysHlth:             ptr(0),
		DiffWalk:             ptr(0),
		Sex:                  ptr(1),
		Age:                  ptr(9),
		Education:            ptr(6),
		Income:               ptr(8),
	}
}

func TestPredictionRequest_Validate_Success(t *testing.T) {
	req := getValidRequest()
	if err := req.Validate(); err != nil {
		t.Fatalf("expected valid request, got error: %v", err)
	}

	slice := req.ToFeatureSlice()
	if len(slice) != 21 {
		t.Fatalf("expected 21 features in slice, got %d", len(slice))
	}
}

func TestPredictionRequest_Validate_MissingField(t *testing.T) {
	req := getValidRequest()
	req.HighBP = nil

	if err := req.Validate(); err == nil {
		t.Fatal("expected error for missing high_bp, got nil")
	}
}

func TestPredictionRequest_Validate_InvalidBinary(t *testing.T) {
	req := getValidRequest()
	req.Smoker = ptr(2.5)

	if err := req.Validate(); err == nil {
		t.Fatal("expected error for non-binary smoker value, got nil")
	}
}

func TestPredictionRequest_Validate_OutOfRange(t *testing.T) {
	req := getValidRequest()
	req.BMI = ptr(5.0) // BMI min is 10

	if err := req.Validate(); err == nil {
		t.Fatal("expected error for out of range BMI, got nil")
	}
}

func TestDetermineRiskLevel(t *testing.T) {
	tests := []struct {
		score         float32
		expectedLevel string
	}{
		{0.15, "Low"},
		{0.39, "Low"},
		{0.40, "Moderate"},
		{0.55, "Moderate"},
		{0.70, "Moderate"},
		{0.71, "High"},
		{0.95, "High"},
	}

	for _, tt := range tests {
		level, _ := DetermineRiskLevel(tt.score)
		if level != tt.expectedLevel {
			t.Errorf("DetermineRiskLevel(%v) = %s; want %s", tt.score, level, tt.expectedLevel)
		}
	}
}
