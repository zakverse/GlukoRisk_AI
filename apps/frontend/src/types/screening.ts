export interface ClinicalDataInput {
  // Step 1: Informasi Dasar & Demografi
  age: number; // Usia dalam tahun (misal: 45)
  ageCategory?: number; // Skala BRFSS 1-13
  sex: number; // 0 = Perempuan, 1 = Laki-laki
  heightCm: number; // Tinggi badan (cm)
  weightKg: number; // Berat badan (kg)
  education: number; // 1-6 (BRFSS scale)
  income: number; // 1-8 (BRFSS scale)

  // Step 2: Indikator Klinis
  highBP: number; // 0 = Tidak, 1 = Ya (Tekanan Darah Tinggi)
  highChol: number; // 0 = Tidak, 1 = Ya (Kolesterol Tinggi)
  cholCheck: number; // 0 = Tidak, 1 = Ya (Cek Kolesterol 5 thn terakhir)
  stroke: number; // 0 = Tidak, 1 = Ya (Riwayat Stroke)
  heartDiseaseorAttack: number; // 0 = Tidak, 1 = Ya (Penyakit Jantung/Serangan)

  // Step 3: Gaya Hidup & Nutrisi
  smoker: number; // 0 = Tidak, 1 = Perokok (>=100 batang seumur hidup)
  physActivity: number; // 0 = Tidak, 1 = Ya (Olahraga 30 hari terakhir)
  fruits: number; // 0 = Tidak, 1 = Konsumsi Buah harian
  veggies: number; // 0 = Tidak, 1 = Konsumsi Sayur harian
  hvyAlcoholConsump: number; // 0 = Tidak, 1 = Konsumsi Alkohol Berat

  // Step 4: Status Kesehatan Umum
  genHlth: number; // 1 = Sangat Baik, 2 = Baik Sekali, 3 = Baik, 4 = Cukup, 5 = Buruk
  mentHlth: number; // 0-30 Hari kesehatan mental terganggu
  physHlth: number; // 0-30 Hari kesehatan fisik terganggu
  diffWalk: number; // 0 = Tidak, 1 = Ya (Kesulitan Berjalan/Tangga)
  anyHealthcare: number; // 0 = Tidak, 1 = Punya Asuransi Kesehatan
  noDocbcCost: number; // 0 = Tidak, 1 = Terkendala Biaya Dokter
}

export interface CalculatedBMI {
  bmi: number;
  category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese';
}

export interface RiskFactor {
  id: string;
  name: string;
  nameId: string;
  impactScore: number; // 0 - 100
  category: 'Klinis' | 'Gaya Hidup' | 'Kesehatan Umum';
  status: 'Critical' | 'Warning' | 'Good';
  description: string;
  recommendation: string;
}

export interface RadarMetric {
  subject: string;
  score: number; // 0 - 100
  fullMark: number;
}

export interface PreventionTarget {
  id: string;
  title: string;
  sdgTarget: string;
  action: string;
  icon: string;
}

export interface ScreeningResult {
  timestamp: string;
  bmiInfo: CalculatedBMI;
  diabetesRiskProb: number; // 0 - 100%
  cvdRiskProb: number; // 0 - 100% (Cardiovascular Disease Risk)
  overallRiskLevel: 'Rendah' | 'Sedang' | 'Tinggi';
  riskScore: number; // 0 - 100
  topRiskFactors: RiskFactor[];
  radarMetrics: RadarMetric[];
  preventionPlan: PreventionTarget[];
  inputSummary: ClinicalDataInput;
}
