# 🩺 GlukoRisk_AI - Preventive Diabetes & Cardiovascular Risk Screening Platform

<div align="center">

![Project Status](https://img.shields.io/badge/Status-Active%20Development-success?style=for-the-badge)
![Go](https://img.shields.io/badge/Backend-Go%201.22+-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016%20%2F%20React%2019-black?style=for-the-badge&logo=next.js&logoColor=white)
![ONNX Runtime](https://img.shields.io/badge/ML%20Engine-ONNX%20Runtime-005CED?style=for-the-badge&logo=onnx&logoColor=white)
![Python](https://img.shields.io/badge/Data%20Science-Python%203.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SDG 3](https://img.shields.io/badge/UN%20SDG-Target%203.4%20Health-4C9F38?style=for-the-badge)

<p align="center">
  <b>Platform Skrining & Asesmen Risiko Dini Diabetes Melitus Tipe-2 dan Penyakit Kardiovaskular Berbasis Machine Learning & ONNX Runtime</b>
</p>

</div>

---

## 📌 Daftar Isi
1. [Tentang GlukoRisk_AI](#-tentang-glukorisk_ai)
2. [Penyelarasan dengan UN SDG 3](#-penyelarasan-dengan-un-sdg-3-target-34)
3. [Arsitektur Sistem](#-arsitektur-sistem)
4. [Struktur Repositori (Monorepo)](#-struktur-repositori-monorepo)
5. [21 Fitur Indikator Kesehatan (BRFSS 2015)](#-21-fitur-indikator-kesehatan-brfss-2015)
6. [Tingkat Risiko & Logika Inferensi](#-tingkat-risiko--logika-inferensi)
7. [Fitur Utama Aplikasi](#-fitur-utama-aplikasi)
8. [Panduan Instalasi & Menjalankan](#-panduan-instalasi--menjalankan)
   - [Prasyarat Sistem](#1-prasyarat-sistem)
   - [Menjalankan Backend (Go API)](#2-menjalankan-backend-go-api)
   - [Menjalankan Frontend (Next.js)](#3-menjalankan-frontend-nextjs)
   - [Eksplorasi Machine Learning & Notebooks](#4-eksplorasi-machine-learning--notebooks)
9. [Dokumentasi API](#-dokumentasi-api)
10. [Unit Testing](#-unit-testing)
11. [Penafian Medis (Medical Disclaimer)](#-penafian-medis-medical-disclaimer)

---

## 📖 Tentang GlukoRisk_AI

**GlukoRisk_AI** adalah platform kesehatan preventif cerdas yang dirancang untuk mendeteksi probabilitas awal risiko **Diabetes Melitus Tipe-2** dan **Penyakit Kardiovaskular (CVD)**.

Dengan memanfaatkan data survei kesehatan berskala besar dari **CDC BRFSS 2015 (Behavioral Risk Factor Surveillance System)** yang mencakup lebih dari 253.000 responden, GlukoRisk_AI melatih model klasifikasi *Machine Learning* (Random Forest & XGBoost) berkinerja tinggi, mengonversinya ke format **ONNX (Open Neural Network Exchange)**, dan mengintegrasikannya ke dalam **Backend Go berkinerja tinggi** serta antarmuka web modern **Next.js**.

---

## 🌍 Penyelarasan dengan UN SDG 3 (Target 3.4)

GlukoRisk_AI dikembangkan untuk mendukung agenda **Tujuan Pembangunan Berkelanjutan (Sustainable Development Goals / SDG 3: Kehidupan Sehat dan Sejahtera)**, khususnya **Target 3.4**:

> *"Pada tahun 2030, mengurangi sepertiga dari kematian dini yang disebabkan oleh Penyakit Tidak Menular (PTM) melalui pencegahan dan pengobatan, serta meningkatkan kesehatan mental dan kesejahteraan."*

Melalui asesmen preventif non-invasif, GlukoRisk_AI memberdayakan individu untuk memahami faktor risiko mereka lebih awal dan mengambil tindakan preventif sebelum komplikasi klinis yang parah terjadi.

---

## 🏗 Arsitektur Sistem

```
┌────────────────────────────────────────────────────────────────────────┐
│                          GLUKORISK_AI PLATFORM                         │
└────────────────────────────────────────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌──────────────────────┐                         ┌───────────────────────┐
│   FRONTEND WEB APP   │                         │  ML RESEARCH PIPELINE │
│ (Next.js 16, React 19│                         │  (Python, Scikit-Learn│
│  Tailwind CSS v4,    │                         │   XGBoost, ONNX Export│
│  Framer Motion, PDF) │                         │   Jupyter Notebooks)  │
└──────────┬───────────┘                         └───────────┬───────────┘
           │                                                 │
           │ HTTP REST (JSON)                                │ Model Export
           │                                                 ▼
           │                                     ┌───────────────────────┐
           ▼                                     │ diabetes_model.onnx   │
┌──────────────────────────────────────────────┐ └───────────┬───────────┘
│            GO ONNX INFERENCE API             │             │
│  - Gin Web Framework                         │◄────────────┘
│  - ONNX Runtime Engine (onnxruntime.dll)     │
│  - In-memory Matrix Tensor Inference [1, 21] │
│  - Graceful Shutdown & CORS Middleware       │
└──────────────────────────────────────────────┘
```

---

## 📁 Struktur Repositori (Monorepo)

```
GlukoRisk_AI/
├── apps/
│   ├── backend/                     # Go (Golang) REST API & ONNX Inference Engine
│   │   ├── cmd/api/main.go          # Entry point HTTP server & graceful shutdown
│   │   ├── configs/config.go        # Konfigurasi env, port, path model & CORS
│   │   ├── internal/
│   │   │   ├── handlers/            # HTTP Controller (/api/predict, /api/health)
│   │   │   ├── middleware/          # CORS & logging middleware
│   │   │   ├── models/              # Struct 21 fitur, validasi, & response schema
│   │   │   ├── routes/              # Routing table & endpoint registration
│   │   │   └── services/            # ONNX Runtime session & tensor scoring
│   │   ├── onnxruntime.dll          # Dynamic library ONNX Runtime (Windows x64)
│   │   ├── go.mod / go.sum          # Dependensi modul Go
│   │   └── README.md                # Dokumentasi spesifik backend
│   │
│   └── frontend/                    # Next.js 16 Modern Web Interface
│       ├── src/
│       │   ├── app/                 # App Router (page.tsx, layout.tsx, /api/predict)
│       │   ├── components/          # UI Components (Navbar, Footer, MultiStepForm)
│       │   │   ├── steps/           # Form Multi-Step (Demografi, Klinis, Gaya Hidup, Status)
│       │   │   └── visualizations/  # Recharts Radar Chart & Feature Importance Chart
│       │   ├── types/               # TypeScript interfaces (screening.ts)
│       │   └── utils/               # Kalkulator BMI, skoring risiko & rekomendasi
│       ├── package.json             # Dependensi frontend
│       └── tsconfig.json            # Konfigurasi TypeScript
│
├── data/
│   └── raw/                         # Dataset CDC BRFSS 2015
│       ├── diabetes_012_health_indicators_BRFSS2015.csv
│       ├── diabetes_binary_5050split_health_indicators_BRFSS2015.csv
│       └── diabetes_binary_health_indicators_BRFSS2015.csv
│
├── models/
│   └── diabetes_model.onnx          # Pre-trained Machine Learning Model (ONNX Format)
│
├── notebooks/                       # Jupyter Notebooks Data Science & Riset ML
│   ├── 01_eda_baseline.ipynb        # Exploratory Data Analysis & Baseline Model
│   ├── 02_model_training_onnx.ipynb # Pelatihan model & ekspor ke ONNX
│   └── 03_model_overfitting_underfitting_visual_analysis.ipynb # Diagnostik Bias-Variance
│
└── README.md                        # Dokumentasi Utama GlukoRisk_AI
```

---

## 🧬 21 Fitur Indikator Kesehatan (BRFSS 2015)

Model inferensi menerima **21 Fitur Indikator Kesehatan** (`float32` tensor dimensi `[1, 21]`):

| No | Nama Fitur | Kategori | Rentang Nilai / Skala | Deskripsi |
|:--:|:-----------|:---------|:---------------------:|:----------|
| 1 | `high_bp` | Klinis | `0` (Tidak) / `1` (Ya) | Riwayat diagnosis tekanan darah tinggi |
| 2 | `high_chol` | Klinis | `0` (Tidak) / `1` (Ya) | Riwayat kadar kolesterol tinggi |
| 3 | `chol_check` | Klinis | `0` (Tidak) / `1` (Ya) | Pemeriksaan kolesterol dalam 5 tahun terakhir |
| 4 | `bmi` | Klinis | `10.0 - 70.0` | Indeks Massa Tubuh (Body Mass Index) |
| 5 | `smoker` | Gaya Hidup | `0` (Tidak) / `1` (Ya) | Telah merokok setidaknya 100 batang seumur hidup |
| 6 | `stroke` | Klinis | `0` (Tidak) / `1` (Ya) | Riwayat pernah mengalami stroke |
| 7 | `heart_disease_or_attack` | Klinis | `0` (Tidak) / `1` (Ya) | Riwayat penyakit jantung koroner atau serangan jantung |
| 8 | `phys_activity` | Gaya Hidup | `0` (Tidak) / `1` (Ya) | Aktivitas fisik/olahraga dalam 30 hari terakhir |
| 9 | `fruits` | Gaya Hidup | `0` (Tidak) / `1` (Ya) | Konsumsi buah setidaknya 1 kali per hari |
| 10 | `veggies` | Gaya Hidup | `0` (Tidak) / `1` (Ya) | Konsumsi sayur setidaknya 1 kali per hari |
| 11 | `hvy_alcohol_consump` | Gaya Hidup | `0` (Tidak) / `1` (Ya) | Konsumsi alkohol berat (Pria: >14 gelas/mgg, Wanita: >7 gelas/mgg) |
| 12 | `any_healthcare` | Akses Medis | `0` (Tidak) / `1` (Ya) | Memiliki cakupan asuransi kesehatan |
| 13 | `no_docbc_cost` | Akses Medis | `0` (Tidak) / `1` (Ya) | Terkendala biaya saat butuh periksa ke dokter dlm 12 bln |
| 14 | `gen_hlth` | Status Umum | `1` (Sangat Baik) - `5` (Buruk) | Penilaian mandiri terhadap kondisi kesehatan umum |
| 15 | `ment_hlth` | Status Umum | `0 - 30` (Hari) | Jumlah hari kondisi kesehatan mental terganggu dlm 30 hari |
| 16 | `phys_hlth` | Status Umum | `0 - 30` (Hari) | Jumlah hari kondisi fisik sakit/cedera dlm 30 hari |
| 17 | `diff_walk` | Status Fisik | `0` (Tidak) / `1` (Ya) | Kesulitan serius saat berjalan atau menaiki tangga |
| 18 | `sex` | Demografi | `0` (Wanita) / `1` (Pria) | Jenis kelamin biologis responden |
| 19 | `age` | Demografi | `1 - 13` (Kategori Usia) | Skala usia CDC (1: 18-24 th, ..., 9: 60-64 th, ..., 13: 80+ th) |
| 20 | `education` | Sosio-Ekonomi | `1 - 6` (Tingkat Pendidikan) | 1: Tidak sekolah, ..., 6: Lulusan Perguruan Tinggi |
| 21 | `income` | Sosio-Ekonomi | `1 - 8` (Skala Pendapatan) | Skala pendapatan rumah tangga tahunan |

---

## 📊 Tingkat Risiko & Logika Inferensi

Model mengkalkulasi probabilitas risiko diabetes $P(\text{Diabetes} = 1)$ dan mengelompokkannya ke dalam tiga kategori:

| Tingkat Risiko | Rentang Probabilitas | Rekomendasi & Tindakan |
|:--------------:|:--------------------:|:-----------------------|
| 🟢 **Low** | $< 40\%$ | Pertahankan pola hidup sehat, konsumsi serat, dan lakukan skrining berkala. |
| 🟡 **Moderate** | $40\% - 70\%$ | Perlu kewaspadaan: kurangi konsumsi gula sederhana, tingkatkan aktivitas fisik, dan cek gula darah berkala. |
| 🔴 **High** | $> 70\%$ | Indikasi risiko tinggi: Sangat disarankan untuk segera berkonsultasi dengan dokter untuk tes HbA1c & evaluasi klinis. |

---

## 🌟 Fitur Utama Aplikasi

- 📝 **Multi-Step Assessment Form**: Form interaktif 4 tahap yang mudah diisi (Demografi, Indikator Klinis, Gaya Hidup, Status Kesehatan).
- ⚖️ **Kalkulator BMI Real-time**: Perhitungan indeks massa tubuh otomatis beserta kategori berat badan.
- 🎯 **Dual Risk Prediction**: Memprediksi risiko **Diabetes Tipe-2** dan **Penyakit Kardiovaskular (CVD)** secara simultan.
- 🕸️ **Radar Risk Assessment Chart**: Visualisasi 5 dimensi profil risiko kesehatan menggunakan Recharts.
- 📊 **Feature Importance & Contributing Factors**: Analisis faktor utama yang paling berkontribusi terhadap skor risiko pasien.
- 📄 **Export Laporan PDF Medis**: Ekspor hasil skrining ke dokumen PDF berkualitas tinggi untuk dibawa saat konsultasi dokter.
- ⚡ **Ultra-Fast ONNX Inference**: Inferensi berbasis Go dan ONNX Runtime dengan latensi sub-milidetik.

---

## 🚀 Panduan Instalasi & Menjalankan

### 1. Prasyarat Sistem
- **Go**: Versi 1.22 atau lebih baru
- **Node.js**: Versi 18+ (atau Bun / npm / yarn)
- **Python**: Versi 3.10+ (opsional, jika ingin menjalankan Jupyter Notebooks)

---

### 2. Menjalankan Backend (Go API)

```powershell
# Masuk ke direktori backend
cd apps/backend

# Jalankan server API
go run cmd/api/main.go
```

> Server API akan berjalan secara default di: **`http://localhost:8080`**

---

### 3. Menjalankan Frontend (Next.js)

Buka terminal baru:

```powershell
# Masuk ke direktori frontend
cd apps/frontend

# Instal dependensi
npm install

# Jalankan development server
npm run dev
```

> Buka browser Anda di: **`http://localhost:3000`**

---

### 4. Eksplorasi Machine Learning & Notebooks

Untuk melihat proses *Exploratory Data Analysis*, pelatihan model, dan analisis bias-variance:

```powershell
# Buat virtual environment (opsional)
python -m venv .venv
.venv\Scripts\activate

# Instal pustaka yang dibutuhkan
pip install numpy pandas scikit-learn xgboost matplotlib seaborn onnxruntime skl2onnx jupyter

# Jalankan Jupyter Lab / Notebook
jupyter lab
```

Buka notebook di direktori `notebooks/`:
- `01_eda_baseline.ipynb`: Analisis eksplorasi dataset BRFSS.
- `02_model_training_onnx.ipynb`: Pipeline training Random Forest & ekspor ONNX.
- `03_model_overfitting_underfitting_visual_analysis.ipynb`: Evaluasi kurva pembelajaran & generalisasi model.

---

## 📡 Dokumentasi API

### 1. Health Check
Memeriksa kesiapan server dan status model ONNX yang dimuat.

- **Endpoint:** `GET /api/health`
- **Response `200 OK`:**
```json
{
  "status": "ok",
  "model_loaded": true,
  "model_path": "../../models/diabetes_model.onnx",
  "timestamp": "2026-08-23T10:00:00Z"
}
```

---

### 2. Prediksi Risiko Diabetes & Kardiovaskular
Melakukan inferensi prediksi risiko berdasarkan 21 indikator kesehatan.

- **Endpoint:** `POST /api/predict`
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
  "timestamp": "2026-08-23T10:00:05Z"
}
```

---

## 🧪 Unit Testing

Untuk menjalankan pengujian unit pada logika model dan HTTP handler backend Go:

```powershell
cd apps/backend
go test -v ./internal/models ./internal/handlers
```

---

## ⚠️ Penafian Medis (Medical Disclaimer)

> [!CAUTION]
> **Penting untuk Diperhatikan:**
> GlukoRisk_AI dirancang semata-mata untuk **tujuan edukasi, asesmen preventif awal, dan riset akademik**, dan **BUKAN** merupakan pengganti diagnosis medis profesional, saran klinis, atau perawatan dokter.
> Jika Anda mengalami gejala kesehatan atau memiliki pertanyaan terkait kondisi medis Anda, selalu konsultasikan secara langsung dengan dokter spesialis atau tenaga medis berwenang.

---

<div align="center">

Dikembangkan dengan dedikasi untuk mendukung **Kesehatan Masyarakat & Pencegahan Penyakit Tidak Menular (SDG 3)**.

</div>