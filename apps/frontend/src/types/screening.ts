export interface ClinicalDataInput {
  // Step 1: Data Dasar
  age: number;
  sex: number; // 0 = Perempuan, 1 = Laki-laki
  heightCm: number;
  weightKg: number;
  education: number; // 1-6
  income: number; // 1-8

  // Step 2: Gaya Hidup
  smoker: number; // 0 = Tidak, 1 = Ya
  physActivity: number; // 0 = Tidak, 1 = Ya
  fruits: number; // 0 = Tidak, 1 = Ya
  veggies: number; // 0 = Tidak, 1 = Ya
  hvyAlcoholConsump: number; // 0 = Tidak, 1 = Ya
  genHlth: number; // 1-5 (1=Sangat Baik, 5=Buruk)

  // Step 3: Indikator Kesehatan
  highBP: number; // 0 = Tidak, 1 = Ya
  highChol: number; // 0 = Tidak, 1 = Ya
  cholCheck: number; // 0 = Tidak, 1 = Ya (cek kolesterol 5 thn terakhir)
  stroke: number; // 0 = Tidak, 1 = Ya
  heartDiseaseorAttack: number; // 0 = Tidak, 1 = Ya
  diffWalk: number; // 0 = Tidak, 1 = Ya
  mentHlth: number; // 0-30
  physHlth: number; // 0-30
  anyHealthcare: number; // 0 = Tidak, 1 = Ya
  noDocbcCost: number; // 0 = Tidak, 1 = Ya

  // Extended fields (for richer ML model)
  systolicBP?: number; // Tekanan darah sistolik (mmHg)
  diastolicBP?: number; // Tekanan darah diastolik (mmHg)
  glucoseLevel?: number; // Kadar glukosa (mg/dL)
  familyDiabetes?: number; // 0 = Tidak, 1 = Ya (riwayat diabetes keluarga)

  // Computed
  ageCategory?: number; // BRFSS 1-13
}

export interface CalculatedBMI {
  bmi: number;
  category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese I' | 'Obese II';
  color: string;
}

export interface RiskFactor {
  id: string;
  name: string;
  nameId: string;
  impactScore: number; // 0-100
  category: 'Klinis' | 'Gaya Hidup' | 'Kesehatan Umum' | 'Demografi';
  status: 'Critical' | 'Warning' | 'Good';
  description: string;
  recommendation: string;
}

export interface RadarMetric {
  subject: string;
  score: number; // 0-100
  fullMark: number;
}

export interface PreventionTarget {
  id: string;
  title: string;
  icon: string;
  sdgTarget: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ScreeningResult {
  id: string;
  timestamp: string;
  bmiInfo: CalculatedBMI;
  diabetesRiskProb: number; // 0-100%
  cvdRiskProb: number; // 0-100%
  overallRiskLevel: 'Rendah' | 'Sedang' | 'Tinggi';
  riskScore: number; // 0-100
  topRiskFactors: RiskFactor[];
  radarMetrics: RadarMetric[];
  preventionPlan: PreventionTarget[];
  inputSummary: ClinicalDataInput;
  healthInsight: string;
}

export interface HistoryEntry {
  id: string;
  date: string;
  diabetesRisk: number;
  cvdRisk: number;
  overallRisk: 'Rendah' | 'Sedang' | 'Tinggi';
  bmi: number;
}

export interface DemoProfile {
  id: 'low' | 'moderate' | 'high';
  label: string;
  description: string;
  data: ClinicalDataInput;
}
