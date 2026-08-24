import {
  ClinicalDataInput,
  ScreeningResult,
  CalculatedBMI,
  RiskFactor,
  RadarMetric,
  PreventionTarget,
  DemoProfile,
} from '@/types/screening';

// =============================================
// BMI Calculator
// =============================================
export function calculateBMI(heightCm: number, weightKg: number): CalculatedBMI {
  if (!heightCm || !weightKg) return { bmi: 0, category: 'Normal', color: '#10b981' };
  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

  if (bmi < 18.5) return { bmi, category: 'Underweight', color: '#60a5fa' };
  if (bmi < 25.0) return { bmi, category: 'Normal', color: '#10b981' };
  if (bmi < 30.0) return { bmi, category: 'Overweight', color: '#f59e0b' };
  if (bmi < 35.0) return { bmi, category: 'Obese I', color: '#f97316' };
  return { bmi, category: 'Obese II', color: '#ef4444' };
}

// =============================================
// Age to BRFSS Category Converter
// =============================================
function ageToCategory(age: number): number {
  if (age < 25) return 1;
  if (age < 30) return 2;
  if (age < 35) return 3;
  if (age < 40) return 4;
  if (age < 45) return 5;
  if (age < 50) return 6;
  if (age < 55) return 7;
  if (age < 60) return 8;
  if (age < 65) return 9;
  if (age < 70) return 10;
  if (age < 75) return 11;
  if (age < 80) return 12;
  return 13;
}

// =============================================
// Mock ML Prediction Engine
// (Structured to be replaced with real FastAPI/Python backend)
// =============================================
export function calculateRiskPrediction(input: ClinicalDataInput): ScreeningResult {
  const bmiInfo = calculateBMI(input.heightCm, input.weightKg);
  const bmi = bmiInfo.bmi;
  const ageCategory = input.ageCategory || ageToCategory(input.age);

  // ---- Diabetes Risk Score (weighted logistic approximation) ----
  let diabetesScore = 0;
  diabetesScore += input.highBP ? 18 : 0;
  diabetesScore += input.highChol ? 12 : 0;
  diabetesScore += bmi >= 30 ? 22 : bmi >= 25 ? 10 : 0;
  diabetesScore += ageCategory >= 8 ? 14 : ageCategory >= 5 ? 7 : 0;
  diabetesScore += !input.physActivity ? 10 : 0;
  diabetesScore += input.smoker ? 6 : 0;
  diabetesScore += input.hvyAlcoholConsump ? 5 : 0;
  diabetesScore += !input.fruits && !input.veggies ? 8 : !input.fruits || !input.veggies ? 4 : 0;
  diabetesScore += input.genHlth >= 4 ? 10 : input.genHlth >= 3 ? 5 : 0;
  diabetesScore += input.stroke ? 8 : 0;
  diabetesScore += input.heartDiseaseorAttack ? 7 : 0;
  diabetesScore += input.diffWalk ? 5 : 0;

  // Extended fields bonus
  if (input.glucoseLevel) {
    if (input.glucoseLevel >= 126) diabetesScore += 25;
    else if (input.glucoseLevel >= 100) diabetesScore += 12;
  }
  if (input.familyDiabetes) diabetesScore += 15;

  // ---- CVD Risk Score ----
  let cvdScore = 0;
  cvdScore += input.highBP ? 22 : 0;
  cvdScore += input.highChol ? 18 : 0;
  cvdScore += input.heartDiseaseorAttack ? 28 : 0;
  cvdScore += input.stroke ? 18 : 0;
  cvdScore += input.smoker ? 15 : 0;
  cvdScore += bmi >= 30 ? 12 : bmi >= 25 ? 6 : 0;
  cvdScore += ageCategory >= 9 ? 12 : ageCategory >= 6 ? 6 : 0;
  cvdScore += !input.physActivity ? 10 : 0;
  cvdScore += input.hvyAlcoholConsump ? 8 : 0;
  cvdScore += input.genHlth >= 4 ? 8 : 0;
  cvdScore += input.diffWalk ? 6 : 0;

  if (input.systolicBP && input.systolicBP >= 140) cvdScore += 20;
  else if (input.systolicBP && input.systolicBP >= 130) cvdScore += 10;
  if (input.diastolicBP && input.diastolicBP >= 90) cvdScore += 12;

  // Normalize to 0-100
  const diabetesRiskProb = Math.min(100, Math.round(diabetesScore * 0.72));
  const cvdRiskProb = Math.min(100, Math.round(cvdScore * 0.68));

  // Overall risk level
  const avgRisk = (diabetesRiskProb + cvdRiskProb) / 2;
  const overallRiskLevel =
    avgRisk >= 55 ? 'Tinggi' : avgRisk >= 30 ? 'Sedang' : 'Rendah';

  // ---- Risk Factors ----
  const topRiskFactors: RiskFactor[] = buildRiskFactors(input, bmi, diabetesRiskProb, cvdRiskProb);

  // ---- Radar Metrics ----
  const radarMetrics: RadarMetric[] = [
    { subject: 'Metabolisme', score: Math.max(10, 100 - diabetesScore * 0.7), fullMark: 100 },
    { subject: 'Kardio', score: Math.max(10, 100 - cvdScore * 0.65), fullMark: 100 },
    { subject: 'Aktivitas', score: input.physActivity ? 85 : 30, fullMark: 100 },
    { subject: 'Nutrisi', score: (input.fruits ? 40 : 0) + (input.veggies ? 40 : 0) + (input.hvyAlcoholConsump ? 0 : 20), fullMark: 100 },
    { subject: 'Tekanan Darah', score: input.highBP ? 35 : 80, fullMark: 100 },
    { subject: 'Berat Badan', score: bmi >= 30 ? 30 : bmi >= 25 ? 55 : 90, fullMark: 100 },
  ];

  // ---- Prevention Plan ----
  const preventionPlan: PreventionTarget[] = buildPreventionPlan(input, overallRiskLevel);

  // ---- Health Insight ----
  const healthInsight = buildHealthInsight(input, overallRiskLevel, diabetesRiskProb, cvdRiskProb, bmiInfo);

  const timestamp = new Date().toLocaleString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const id = `screening-${Date.now()}`;

  return {
    id,
    timestamp,
    bmiInfo,
    diabetesRiskProb,
    cvdRiskProb,
    overallRiskLevel,
    riskScore: Math.round(avgRisk),
    topRiskFactors,
    radarMetrics,
    preventionPlan,
    inputSummary: input,
    healthInsight,
  };
}

// =============================================
// Risk Factor Builder
// =============================================
function buildRiskFactors(
  input: ClinicalDataInput,
  bmi: number,
  diabetesScore: number,
  cvdScore: number
): RiskFactor[] {
  const factors: RiskFactor[] = [];

  if (input.glucoseLevel && input.glucoseLevel >= 100) {
    factors.push({
      id: 'glucose',
      name: 'Blood Glucose',
      nameId: 'Kadar Glukosa',
      impactScore: input.glucoseLevel >= 126 ? 88 : 70,
      category: 'Klinis',
      status: input.glucoseLevel >= 126 ? 'Critical' : 'Warning',
      description: `Kadar glukosa Anda ${input.glucoseLevel} mg/dL. ${input.glucoseLevel >= 126 ? 'Nilai ini berada di atas ambang diabetes (≥126 mg/dL).' : 'Nilai ini berada di zona pre-diabetes (100–125 mg/dL).'}`,
      recommendation: 'Batasi konsumsi gula dan karbohidrat sederhana. Lakukan pemeriksaan HbA1c dengan tenaga kesehatan.',
    });
  }

  if (bmi >= 25) {
    factors.push({
      id: 'bmi',
      name: 'Body Mass Index',
      nameId: 'Indeks Massa Tubuh (BMI)',
      impactScore: bmi >= 30 ? 78 : 58,
      category: 'Klinis',
      status: bmi >= 30 ? 'Critical' : 'Warning',
      description: `BMI Anda adalah ${bmi} kg/m² (${bmi >= 30 ? 'Obesitas' : 'Kelebihan Berat Badan'}). Ini meningkatkan risiko diabetes dan penyakit kardiovaskular secara signifikan.`,
      recommendation: 'Target penurunan berat badan 5–10% melalui kombinasi pola makan seimbang dan olahraga teratur.',
    });
  }

  if (input.highBP) {
    factors.push({
      id: 'bp',
      name: 'High Blood Pressure',
      nameId: 'Tekanan Darah Tinggi',
      impactScore: 72,
      category: 'Klinis',
      status: 'Warning',
      description: 'Riwayat tekanan darah tinggi meningkatkan beban kerja jantung dan risiko kerusakan pembuluh darah.',
      recommendation: 'Monitor tekanan darah secara rutin. Kurangi asupan garam dan kelola stres dengan baik.',
    });
  }

  if (input.highChol) {
    factors.push({
      id: 'chol',
      name: 'High Cholesterol',
      nameId: 'Kolesterol Tinggi',
      impactScore: 65,
      category: 'Klinis',
      status: 'Warning',
      description: 'Kadar kolesterol tinggi dapat menyebabkan penumpukan plak di arteri yang meningkatkan risiko serangan jantung.',
      recommendation: 'Kurangi konsumsi lemak jenuh dan trans. Pertimbangkan pemeriksaan profil lipid secara berkala.',
    });
  }

  if (!input.physActivity) {
    factors.push({
      id: 'activity',
      name: 'Physical Inactivity',
      nameId: 'Kurang Aktivitas Fisik',
      impactScore: 55,
      category: 'Gaya Hidup',
      status: 'Warning',
      description: 'Kurangnya aktivitas fisik berkontribusi pada resistensi insulin, peningkatan berat badan, dan risiko kardiovaskular.',
      recommendation: 'Mulai dengan 30 menit aktivitas fisik moderat (jalan kaki, bersepeda) minimal 5 hari per minggu.',
    });
  }

  if (input.smoker) {
    factors.push({
      id: 'smoking',
      name: 'Smoking',
      nameId: 'Kebiasaan Merokok',
      impactScore: 62,
      category: 'Gaya Hidup',
      status: input.smoker && cvdScore > 50 ? 'Critical' : 'Warning',
      description: 'Merokok merusak pembuluh darah, menurunkan kadar HDL, dan secara langsung meningkatkan risiko penyakit jantung dan diabetes.',
      recommendation: 'Berhenti merokok adalah langkah terpenting untuk kesehatan kardiovaskular. Konsultasikan program berhenti merokok dengan dokter.',
    });
  }

  if (input.heartDiseaseorAttack) {
    factors.push({
      id: 'heart',
      name: 'Heart Disease History',
      nameId: 'Riwayat Penyakit Jantung',
      impactScore: 85,
      category: 'Klinis',
      status: 'Critical',
      description: 'Riwayat serangan jantung atau penyakit jantung sebelumnya sangat meningkatkan probabilitas kejadian kardiovaskular berikutnya.',
      recommendation: 'Wajib berkonsultasi dengan dokter spesialis jantung. Pastikan pengobatan dan gaya hidup kardioprotektif.',
    });
  }

  if (input.familyDiabetes) {
    factors.push({
      id: 'family',
      name: 'Family Diabetes History',
      nameId: 'Riwayat Diabetes Keluarga',
      impactScore: 60,
      category: 'Demografi',
      status: 'Warning',
      description: 'Faktor genetik dari riwayat diabetes dalam keluarga meningkatkan kerentanan seseorang terhadap diabetes tipe 2.',
      recommendation: 'Lakukan skrining glukosa darah secara rutin (minimal 1x per tahun) dan pertahankan gaya hidup sehat.',
    });
  }

  if (!input.fruits || !input.veggies) {
    factors.push({
      id: 'diet',
      name: 'Poor Diet',
      nameId: 'Pola Makan Tidak Seimbang',
      impactScore: 40,
      category: 'Gaya Hidup',
      status: 'Warning',
      description: 'Kurangnya konsumsi buah dan sayur dikaitkan dengan defisiensi antioksidan yang penting untuk kesehatan metabolik.',
      recommendation: 'Konsumsi 5 porsi buah dan sayur setiap hari. Variasikan jenis untuk mendapatkan beragam nutrisi.',
    });
  }

  // If no risk factors found, add a positive one
  if (factors.length === 0) {
    factors.push({
      id: 'general',
      name: 'General Health',
      nameId: 'Status Kesehatan Umum',
      impactScore: 20,
      category: 'Kesehatan Umum',
      status: 'Good',
      description: 'Profil kesehatan Anda secara keseluruhan menunjukkan faktor risiko yang rendah untuk diabetes dan penyakit kardiovaskular.',
      recommendation: 'Pertahankan gaya hidup sehat dan lakukan pemeriksaan kesehatan rutin minimal 1x per tahun.',
    });
  }

  return factors.sort((a, b) => b.impactScore - a.impactScore).slice(0, 6);
}

// =============================================
// Prevention Plan Builder
// =============================================
function buildPreventionPlan(
  input: ClinicalDataInput,
  riskLevel: 'Rendah' | 'Sedang' | 'Tinggi'
): PreventionTarget[] {
  const plans: PreventionTarget[] = [];

  if (!input.physActivity || riskLevel !== 'Rendah') {
    plans.push({
      id: 'exercise',
      icon: '🏃',
      title: 'Tingkatkan Aktivitas Fisik',
      sdgTarget: 'SDG 3.4',
      action: 'Lakukan aktivitas fisik moderat 150 menit/minggu (setara 30 menit, 5x seminggu). Mulai bertahap dan konsisten.',
      priority: 'high',
    });
  }

  if (!input.fruits || !input.veggies || input.highChol) {
    plans.push({
      id: 'diet',
      icon: '🥗',
      title: 'Perbaiki Pola Makan',
      sdgTarget: 'SDG 3.4',
      action: 'Perbanyak konsumsi sayur, buah, dan biji-bijian utuh. Kurangi gula tambahan, garam, dan lemak jenuh.',
      priority: 'high',
    });
  }

  if (input.highBP || (input.systolicBP && input.systolicBP >= 130)) {
    plans.push({
      id: 'bloodpressure',
      icon: '💊',
      title: 'Kontrol Tekanan Darah',
      sdgTarget: 'SDG 3.4',
      action: 'Monitor tekanan darah di rumah atau apotek. Kurangi garam dan konsultasikan obat dengan dokter jika diperlukan.',
      priority: 'high',
    });
  }

  if (input.smoker) {
    plans.push({
      id: 'quit-smoking',
      icon: '🚭',
      title: 'Berhenti Merokok',
      sdgTarget: 'SDG 3.a',
      action: 'Bergabunglah dengan program Quit Smoking. Minta dukungan dokter untuk terapi pengganti nikotin.',
      priority: 'high',
    });
  }

  plans.push({
    id: 'checkup',
    icon: '🏥',
    title: 'Pemeriksaan Rutin',
    sdgTarget: 'SDG 3.8',
    action: `Lakukan medical check-up ${riskLevel === 'Tinggi' ? '3-6 bulan' : riskLevel === 'Sedang' ? '6-12 bulan' : 'setiap tahun'} sekali. Pantau glukosa, kolesterol, dan tekanan darah.`,
    priority: riskLevel === 'Tinggi' ? 'high' : 'medium',
  });

  plans.push({
    id: 'stress',
    icon: '🧘',
    title: 'Kelola Stres',
    sdgTarget: 'SDG 3.4',
    action: 'Praktikkan teknik relaksasi seperti meditasi, pernapasan dalam, atau yoga. Stres kronis dapat meningkatkan kadar kortisol yang mempengaruhi gula darah.',
    priority: 'medium',
  });

  return plans.slice(0, 4);
}

// =============================================
// Health Insight Generator
// =============================================
function buildHealthInsight(
  input: ClinicalDataInput,
  riskLevel: 'Rendah' | 'Sedang' | 'Tinggi',
  diabetesRisk: number,
  cvdRisk: number,
  bmiInfo: ReturnType<typeof calculateBMI>
): string {
  const name = input.sex === 1 ? 'Anda' : 'Anda';

  if (riskLevel === 'Rendah') {
    return `Profil kesehatan ${name} menunjukkan estimasi risiko yang relatif rendah untuk diabetes tipe 2 (${diabetesRisk}%) dan penyakit kardiovaskular (${cvdRisk}%). Ini adalah kabar baik! Namun, mempertahankan gaya hidup sehat tetap penting untuk menjaga kondisi ini. BMI ${name} sebesar ${bmiInfo.bmi} berada dalam kategori ${bmiInfo.category === 'Normal' ? 'normal yang baik' : bmiInfo.category}. Terus pertahankan aktivitas fisik dan pola makan seimbang.`;
  }

  if (riskLevel === 'Sedang') {
    const topConcerns = [];
    if (input.highBP) topConcerns.push('tekanan darah tinggi');
    if (input.highChol) topConcerns.push('kolesterol tinggi');
    if (!input.physActivity) topConcerns.push('kurangnya aktivitas fisik');
    if (bmiInfo.bmi >= 25) topConcerns.push(`BMI ${bmiInfo.bmi}`);

    return `Hasil skrining menunjukkan estimasi risiko sedang untuk diabetes (${diabetesRisk}%) dan kardiovaskular (${cvdRisk}%). Beberapa faktor yang perlu diperhatikan${topConcerns.length > 0 ? ` antara lain ${topConcerns.join(', ')}` : ''}. Perubahan gaya hidup seperti peningkatan aktivitas fisik dan perbaikan pola makan dapat membantu mengurangi estimasi risiko secara signifikan.`;
  }

  // High risk
  return `Hasil skrining menunjukkan estimasi risiko yang lebih tinggi untuk diabetes (${diabetesRisk}%) dan penyakit kardiovaskular (${cvdRisk}%). Penting untuk dipahami bahwa ini adalah estimasi skrining berbasis data, bukan diagnosis medis. Kami sangat menyarankan untuk segera berkonsultasi dengan tenaga kesehatan untuk evaluasi lebih lanjut dan penanganan yang tepat. Perubahan gaya hidup yang konsisten dapat membantu memperbaiki profil risiko kesehatan Anda.`;
}

// =============================================
// Demo Profiles
// =============================================
export const DEMO_PROFILES: DemoProfile[] = [
  {
    id: 'low',
    label: '🟢 Risiko Rendah',
    description: 'Aktif, pola makan sehat, tanpa kondisi kronis',
    data: {
      age: 28, sex: 0, heightCm: 162, weightKg: 55,
      education: 5, income: 6,
      smoker: 0, physActivity: 1, fruits: 1, veggies: 1, hvyAlcoholConsump: 0, genHlth: 1,
      highBP: 0, highChol: 0, cholCheck: 1, stroke: 0, heartDiseaseorAttack: 0,
      diffWalk: 0, mentHlth: 1, physHlth: 0, anyHealthcare: 1, noDocbcCost: 0,
      systolicBP: 118, diastolicBP: 75, glucoseLevel: 88, familyDiabetes: 0,
    },
  },
  {
    id: 'moderate',
    label: '🟡 Risiko Sedang',
    description: 'Kelebihan berat badan, jarang olahraga, kolesterol batas',
    data: {
      age: 45, sex: 1, heightCm: 172, weightKg: 88,
      education: 4, income: 5,
      smoker: 0, physActivity: 0, fruits: 0, veggies: 1, hvyAlcoholConsump: 0, genHlth: 3,
      highBP: 1, highChol: 0, cholCheck: 1, stroke: 0, heartDiseaseorAttack: 0,
      diffWalk: 0, mentHlth: 5, physHlth: 5, anyHealthcare: 1, noDocbcCost: 0,
      systolicBP: 132, diastolicBP: 85, glucoseLevel: 108, familyDiabetes: 1,
    },
  },
  {
    id: 'high',
    label: '🔴 Risiko Tinggi',
    description: 'Obesitas, merokok, hipertensi, glukosa tinggi',
    data: {
      age: 58, sex: 1, heightCm: 168, weightKg: 102,
      education: 3, income: 3,
      smoker: 1, physActivity: 0, fruits: 0, veggies: 0, hvyAlcoholConsump: 1, genHlth: 5,
      highBP: 1, highChol: 1, cholCheck: 1, stroke: 0, heartDiseaseorAttack: 1,
      diffWalk: 1, mentHlth: 15, physHlth: 20, anyHealthcare: 0, noDocbcCost: 1,
      systolicBP: 155, diastolicBP: 95, glucoseLevel: 148, familyDiabetes: 1,
    },
  },
];

// =============================================
// Local Storage Helpers
// =============================================
const HISTORY_KEY = 'medirisk_history';

export function saveToHistory(result: ScreeningResult): void {
  try {
    const existing = loadHistory();
    const entry = {
      id: result.id,
      date: result.timestamp,
      diabetesRisk: result.diabetesRiskProb,
      cvdRisk: result.cvdRiskProb,
      overallRisk: result.overallRiskLevel,
      bmi: result.bmiInfo.bmi,
    };
    const updated = [entry, ...existing].slice(0, 20); // max 20 entries
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // localStorage not available
  }
}

export function loadHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveResult(result: ScreeningResult): void {
  try {
    localStorage.setItem('medirisk_latest_result', JSON.stringify(result));
  } catch {
    // not available
  }
}

export function loadLatestResult(): ScreeningResult | null {
  try {
    const data = localStorage.getItem('medirisk_latest_result');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}
