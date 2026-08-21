# GlukoRisk_AI Backend - Go ONNX Inference API

Backend REST API berkinerja tinggi berbasis **Go (Golang)** yang mengintegrasikan model Machine Learning **ONNX** (`diabetes_model.onnx`) untuk inferensi prediksi risiko diabetes berdasarkan 21 indikator kesehatan BRFSS2015.

---

## 📁 Struktur Arsitektur (Clean Architecture)

```
apps/backend/
├── cmd/
│   └── api/
│       └── main.go                 # Entry point, HTTP server & graceful shutdown
├── configs/
│   └── config.go                   # Konfigurasi environment, port, path model, & CORS
├── internal/
│   ├── handlers/
│   │   ├── prediction_handler.go   # HTTP handlers (POST /api/predict, GET /api/health)
│   │   └── prediction_handler_test.go
│   ├── middleware/
│   │   └── cors.go                 # Configurable CORS middleware
│   ├── models/
│   │   ├── prediction.go           # Struct 21 fitur, validasi rentang, & response format
│   │   └── prediction_test.go
│   ├── routes/
│   │   └── routes.go               # Router setup & endpoint mapping
│   └── services/
│       └── onnx_service.go         # Wrapper ONNX Runtime, tensor management, & scoring
├── .env.example                    # Template environment variables
├── go.mod                          # Go module definition
├── go.sum                          # Checksum dependencies
├── onnxruntime.dll                 # Dynamic library ONNX Runtime (Windows x64)
└── README.md
```

---

## ⚙️ Fitur & Logic Inferensi

Model menerima **21 Fitur Indikator Kesehatan** (`float32` tensor `[1, 21]`):
1. `high_bp` (0 = Tidak, 1 = Ya)
2. `high_chol` (0 = Tidak, 1 = Ya)
3. `chol_check` (0 = Tidak, 1 = Ya)
4. `bmi` (Body Mass Index, misal 28.5)
5. `smoker` (0 = Tidak, 1 = Ya)
6. `stroke` (0 = Tidak, 1 = Ya)
7. `heart_disease_or_attack` (0 = Tidak, 1 = Ya)
8. `phys_activity` (0 = Tidak, 1 = Ya)
9. `fruits` (0 = Tidak, 1 = Ya)
10. `veggies` (0 = Tidak, 1 = Ya)
11. `hvy_alcohol_consump` (0 = Tidak, 1 = Ya)
12. `any_healthcare` (0 = Tidak, 1 = Ya)
13. `no_docbc_cost` (0 = Tidak, 1 = Ya)
14. `gen_hlth` (1 = Sangat Baik s/d 5 = Sangat Buruk)
15. `ment_hlth` (Hari masalah mental dlm 30 hari: 0 - 30)
16. `phys_hlth` (Hari sakit fisik dlm 30 hari: 0 - 30)
17. `diff_walk` (Sulit jalan/tangga: 0 = Tidak, 1 = Ya)
18. `sex` (0 = Wanita, 1 = Pria)
19. `age` (Kategori usia 1 - 13, misal 9 untuk 60-64 tahun)
20. `education` (Tingkat pendidikan 1 - 6)
21. `income` (Skala pendapatan 1 - 8)

### Klasifikasi Tingkat Risiko (`risk_level`):
- **Low**: Probabilitas $< 40\%$ ($< 0.40$)
- **Moderate**: Probabilitas $40\% - 70\%$ ($0.40 - 0.70$)
- **High**: Probabilitas $> 70\%$ ($> 0.70$)

---

## 🚀 Cara Menjalankan Server

### 1. Menjalankan Server API

```powershell
cd apps/backend
go run cmd/api/main.go
```

Server default akan berjalan di `http://localhost:8080`.

---

## 📡 Dokumentasi Endpoint & Contoh Request

### 1. Health Check
Memeriksa status kesiapan server dan status model ONNX yang dimuat.

- **URL:** `GET /api/health`
- **Response `200 OK`:**
```json
{
  "status": "ok",
  "model_loaded": true,
  "model_path": "../../models/diabetes_model.onnx",
  "timestamp": "2026-08-21T09:50:00Z"
}
```

- **Contoh PowerShell (Invoke-RestMethod):**
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/health" -Method Get
```

- **Contoh cURL:**
```bash
curl -X GET http://localhost:8080/api/health
```

---

### 2. Prediksi Risiko Diabetes
Melakukan inferensi risiko diabetes berdasarkan 21 indikator kesehatan.

- **URL:** `POST /api/predict`
- **Content-Type:** `application/json`

#### 📨 Contoh Request Body:
```json
{
  "high_bp": 1,
  "high_chol": 1,
  "chol_check": 1,
  "bmi": 32.5,
  "smoker": 1,
  "stroke": 0,
  "heart_disease_or_attack": 1,
  "phys_activity": 0,
  "fruits": 0,
  "veggies": 1,
  "hvy_alcohol_consump": 0,
  "any_healthcare": 1,
  "no_docbc_cost": 0,
  "gen_hlth": 4,
  "ment_hlth": 5,
  "phys_hlth": 10,
  "diff_walk": 1,
  "sex": 1,
  "age": 10,
  "education": 4,
  "income": 5
}
```

#### 📬 Contoh Response `200 OK`:
```json
{
  "success": true,
  "prediction": 1,
  "risk_score": 0.8425,
  "risk_percent": "84.25%",
  "risk_level": "High",
  "message": "High likelihood of diabetes risk detected. Please consult a healthcare professional for clinical diagnostic evaluation and medical guidance.",
  "class_probabilities": [0.1575, 0.8425],
  "timestamp": "2026-08-21T09:50:05Z"
}
```

- **Contoh PowerShell (Invoke-RestMethod):**
```powershell
$body = @{
    high_bp = 1
    high_chol = 1
    chol_check = 1
    bmi = 32.5
    smoker = 1
    stroke = 0
    heart_disease_or_attack = 1
    phys_activity = 0
    fruits = 0
    veggies = 1
    hvy_alcohol_consump = 0
    any_healthcare = 1
    no_docbc_cost = 0
    gen_hlth = 4
    ment_hlth = 5
    phys_hlth = 10
    diff_walk = 1
    sex = 1
    age = 10
    education = 4
    income = 5
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/predict" -Method Post -ContentType "application/json" -Body $body
```

---

## 🧪 Menjalankan Unit Tests

```powershell
go test -v ./internal/models ./internal/handlers
```
