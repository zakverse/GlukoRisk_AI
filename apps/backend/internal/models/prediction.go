package models

import (
	"fmt"
	"time"
)

// PredictionRequest contains the 21 health indicator features from BRFSS2015 dataset.
// JSON tags support snake_case, PascalCase, and camelCase where relevant.
type PredictionRequest struct {
	HighBP               *float32 `json:"high_bp" form:"high_bp"`
	HighChol             *float32 `json:"high_chol" form:"high_chol"`
	CholCheck            *float32 `json:"chol_check" form:"chol_check"`
	BMI                  *float32 `json:"bmi" form:"bmi"`
	Smoker               *float32 `json:"smoker" form:"smoker"`
	Stroke               *float32 `json:"stroke" form:"stroke"`
	HeartDiseaseorAttack *float32 `json:"heart_disease_or_attack" form:"heart_disease_or_attack"`
	PhysActivity         *float32 `json:"phys_activity" form:"phys_activity"`
	Fruits               *float32 `json:"fruits" form:"fruits"`
	Veggies              *float32 `json:"veggies" form:"veggies"`
	HvyAlcoholConsump    *float32 `json:"hvy_alcohol_consump" form:"hvy_alcohol_consump"`
	AnyHealthcare        *float32 `json:"any_healthcare" form:"any_healthcare"`
	NoDocbcCost          *float32 `json:"no_docbc_cost" form:"no_docbc_cost"`
	GenHlth              *float32 `json:"gen_hlth" form:"gen_hlth"`
	MentHlth             *float32 `json:"ment_hlth" form:"ment_hlth"`
	PhysHlth             *float32 `json:"phys_hlth" form:"phys_hlth"`
	DiffWalk             *float32 `json:"diff_walk" form:"diff_walk"`
	Sex                  *float32 `json:"sex" form:"sex"`
	Age                  *float32 `json:"age" form:"age"`
	Education            *float32 `json:"education" form:"education"`
	Income               *float32 `json:"income" form:"income"`
}

// ToFeatureSlice converts the struct fields into an ordered float32 slice matching model input order.
func (p *PredictionRequest) ToFeatureSlice() []float32 {
	return []float32{
		*p.HighBP,
		*p.HighChol,
		*p.CholCheck,
		*p.BMI,
		*p.Smoker,
		*p.Stroke,
		*p.HeartDiseaseorAttack,
		*p.PhysActivity,
		*p.Fruits,
		*p.Veggies,
		*p.HvyAlcoholConsump,
		*p.AnyHealthcare,
		*p.NoDocbcCost,
		*p.GenHlth,
		*p.MentHlth,
		*p.PhysHlth,
		*p.DiffWalk,
		*p.Sex,
		*p.Age,
		*p.Education,
		*p.Income,
	}
}

// Validate checks that all 21 fields are present and within valid physiological / categorical ranges.
func (p *PredictionRequest) Validate() error {
	fields := []struct {
		name  string
		val   *float32
		isBin bool
		min   float32
		max   float32
	}{
		{"high_bp", p.HighBP, true, 0, 1},
		{"high_chol", p.HighChol, true, 0, 1},
		{"chol_check", p.CholCheck, true, 0, 1},
		{"bmi", p.BMI, false, 10, 100},
		{"smoker", p.Smoker, true, 0, 1},
		{"stroke", p.Stroke, true, 0, 1},
		{"heart_disease_or_attack", p.HeartDiseaseorAttack, true, 0, 1},
		{"phys_activity", p.PhysActivity, true, 0, 1},
		{"fruits", p.Fruits, true, 0, 1},
		{"veggies", p.Veggies, true, 0, 1},
		{"hvy_alcohol_consump", p.HvyAlcoholConsump, true, 0, 1},
		{"any_healthcare", p.AnyHealthcare, true, 0, 1},
		{"no_docbc_cost", p.NoDocbcCost, true, 0, 1},
		{"gen_hlth", p.GenHlth, false, 1, 5},
		{"ment_hlth", p.MentHlth, false, 0, 30},
		{"phys_hlth", p.PhysHlth, false, 0, 30},
		{"diff_walk", p.DiffWalk, true, 0, 1},
		{"sex", p.Sex, true, 0, 1},
		{"age", p.Age, false, 1, 13},
		{"education", p.Education, false, 1, 6},
		{"income", p.Income, false, 1, 8},
	}

	for _, f := range fields {
		if f.val == nil {
			return fmt.Errorf("field '%s' is required and cannot be null", f.name)
		}
		if f.isBin {
			if *f.val != 0 && *f.val != 1 {
				return fmt.Errorf("field '%s' must be binary (0 or 1), got %v", f.name, *f.val)
			}
		} else {
			if *f.val < f.min || *f.val > f.max {
				return fmt.Errorf("field '%s' must be between %.1f and %.1f, got %v", f.name, f.min, f.max, *f.val)
			}
		}
	}

	return nil
}

// PredictionResponse represents the inference result payload.
type PredictionResponse struct {
	Success       bool      `json:"success"`
	Prediction    int64     `json:"prediction"`     // 0 = Non-Diabetic, 1 = Diabetic
	RiskScore     float32   `json:"risk_score"`     // e.g. 0.8425
	RiskPercent   string    `json:"risk_percent"`   // e.g. "84.25%"
	RiskLevel     string    `json:"risk_level"`     // "Low", "Moderate", "High"
	Message       string    `json:"message"`        // Explanatory medical advice
	ClassProbabilities []float32 `json:"class_probabilities,omitempty"`
	Timestamp     time.Time `json:"timestamp"`
}

// HealthResponse represents the health check status.
type HealthResponse struct {
	Status      string    `json:"status"`
	ModelLoaded bool      `json:"model_loaded"`
	ModelPath   string    `json:"model_path,omitempty"`
	Timestamp   time.Time `json:"timestamp"`
}

// ErrorResponse represents standard error payload.
type ErrorResponse struct {
	Success   bool      `json:"success"`
	Error     string    `json:"error"`
	Details   string    `json:"details,omitempty"`
	Timestamp time.Time `json:"timestamp"`
}

// NewErrorResponse creates a standard error response.
func NewErrorResponse(err string, details string) ErrorResponse {
	return ErrorResponse{
		Success:   false,
		Error:     err,
		Details:   details,
		Timestamp: time.Now().UTC(),
	}
}

// DetermineRiskLevel returns "Low", "Moderate", or "High" based on diabetes probability.
func DetermineRiskLevel(probability float32) (string, string) {
	if probability < 0.40 {
		return "Low", "Low likelihood of diabetes risk. Maintain a balanced diet and regular physical activity."
	} else if probability <= 0.70 {
		return "Moderate", "Moderate diabetes risk detected. Consider consulting a doctor for routine blood glucose screening and lifestyle adjustments."
	}
	return "High", "High likelihood of diabetes risk detected. Please consult a healthcare professional for clinical diagnostic evaluation and medical guidance."
}
