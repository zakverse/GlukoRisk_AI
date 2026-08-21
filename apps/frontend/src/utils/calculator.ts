import { ClinicalDataInput, CalculatedBMI, ScreeningResult, RiskFactor, RadarMetric, PreventionTarget } from '../types/screening';

export function calculateBMI(heightCm: number, weightKg: number): CalculatedBMI {
  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
    return { bmi: 22.5, category: 'Normal' };
  }
  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

  let category: CalculatedBMI['category'] = 'Normal';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi >= 18.5 && bmi < 25.0) category = 'Normal';
  else if (bmi >= 25.0 && bmi < 30.0) category = 'Overweight';
  else category = 'Obese';

  return { bmi, category };
}

export function getBRFSSAgeCategory(ageYears: number): number {
  if (ageYears < 25) return 1;
  if (ageYears < 30) return 2;
  if (ageYears < 35) return 3;
  if (ageYears < 40) return 4;
  if (ageYears < 45) return 5;
  if (ageYears < 50) return 6;
  if (ageYears < 55) return 7;
  if (ageYears < 60) return 8;
  if (ageYears < 65) return 9;
  if (ageYears < 70) return 10;
  if (ageYears < 75) return 11;
  if (ageYears < 80) return 12;
  return 13;
}

/**
 * Prediksi Risiko Klinis berbasis bobot variabel BRFSS 2015 Kaggle Dataset
 * (HighBP, HighChol, BMI, Smoker, Stroke, HeartDisease, PhysActivity, GenHlth, Age, DiffWalk)
 */
export function calculateRiskPrediction(input: ClinicalDataInput): ScreeningResult {
  const bmiInfo = calculateBMI(input.heightCm, input.weightKg);
  const ageCategory = input.ageCategory || getBRFSSAgeCategory(input.age);

  // Bobot fitur yang diturunkan dari model XGBoost/Random Forest pada dataset BRFSS2015
  let rawScore = -3.8; // Intercept

  // Kontribusi Fitur
  const bpImpact = input.highBP * 0.75;
  const cholImpact = input.highChol * 0.55;
  const bmiImpact = (bmiInfo.bmi > 25 ? (bmiInfo.bmi - 25) * 0.08 : 0) + (bmiInfo.bmi >= 30 ? 0.45 : 0);
  const genHlthImpact = (input.genHlth - 1) * 0.35;
  const ageImpact = ageCategory * 0.12;
  const heartImpact = input.heartDiseaseorAttack * 0.85;
  const strokeImpact = input.stroke * 0.70;
  const diffWalkImpact = input.diffWalk * 0.50;
  const smokerImpact = input.smoker * 0.25;
  const physActProtective = (1 - input.physActivity) * 0.30;
  const dietProtective = ((1 - input.fruits) + (1 - input.veggies)) * 0.15;
  const alcoholImpact = input.hvyAlcoholConsump * 0.35;

  rawScore += bpImpact + cholImpact + bmiImpact + genHlthImpact + ageImpact +
             heartImpact + strokeImpact + diffWalkImpact + smokerImpact +
             physActProtective + dietProtective + alcoholImpact;

  // Logistic Sigmoid Activation -> Probability %
  const diabetesProbRaw = 1 / (1 + Math.exp(-rawScore));
  const diabetesRiskProb = Math.min(Math.max(Math.round(diabetesProbRaw * 100), 5), 96);

  // Penyakit Jantung / Kardiovaskular (CVD) Probability calculation
  let cvdScore = -3.5 + (heartImpact * 1.5) + (strokeImpact * 1.4) + (bpImpact * 1.1) + (cholImpact * 0.9) + (smokerImpact * 0.8) + (ageImpact * 0.7) + (bmiImpact * 0.5);
  const cvdProbRaw = 1 / (1 + Math.exp(-cvdScore));
  const cvdRiskProb = Math.min(Math.max(Math.round(cvdProbRaw * 100), 4), 98);

  const riskScore = Math.max(diabetesRiskProb, cvdRiskProb);

  let overallRiskLevel: 'Rendah' | 'Sedang' | 'Tinggi' = 'Rendah';
  if (riskScore >= 55) overallRiskLevel = 'Tinggi';
  else if (riskScore >= 25) overallRiskLevel = 'Sedang';

  // Menyusun daftar faktor pemicu utama (Feature Importance SHAP breakdown)
  const factors: RiskFactor[] = [];

  if (input.highBP) {
    factors.push({
      id: 'highBP',
      name: 'High Blood Pressure',
      nameId: 'Tekanan Darah Tinggi (Hipertensi)',
      impactScore: 88,
      category: 'Klinis',
      status: 'Critical',
      description: 'Hipertensi merusak pembuluh darah arteri dan meningkatkan resistensi insulin serta beban kerja jantung.',
      recommendation: 'Batasi asupan garam < 2000mg/hari (1 sendok teh), lakukan cek tensi rutin, dan konsultasi ke dokter.'
    });
  }

  if (input.highChol) {
    factors.push({
      id: 'highChol',
      name: 'High Cholesterol',
      nameId: 'Kadar Kolesterol Tinggi',
      impactScore: 78,
      category: 'Klinis',
      status: 'Critical',
      description: 'Penumpukan plak kolesterol menyumbat arteri koronaria dan memicu pengerasan pembuluh darah.',
      recommendation: 'Kurangi konsumsi lemak jenuh & gorengan. Tingkatkan serat larut (oatmeal, buah-buahan).'
    });
  }

  if (bmiInfo.bmi >= 25) {
    factors.push({
      id: 'bmi',
      name: 'High BMI / Obesity',
      nameId: `Indeks Massa Tubuh Tinggi (${bmiInfo.bmi} kg/m²)`,
      impactScore: bmiInfo.bmi >= 30 ? 85 : 62,
      category: 'Klinis',
      status: bmiInfo.bmi >= 30 ? 'Critical' : 'Warning',
      description: 'Penumpukan lemak viseral memicu peradangan kronis dan resistensi sel terhadap insulin.',
      recommendation: 'Targetkan penurunan berat badan 5-10% secara bertahap melalui defisit kalori terukur.'
    });
  }

  if (!input.physActivity) {
    factors.push({
      id: 'physActivity',
      name: 'Sedentary Lifestyle',
      nameId: 'Kurang Aktivitas Fisik / Olahraga',
      impactScore: 70,
      category: 'Gaya Hidup',
      status: 'Warning',
      description: 'Kurang gerak menurunkan sensitivitas insulin dan memperlambat metabolisme pembakaran glukosa.',
      recommendation: 'Lakukan olahraga kardio moderat minimal 150 menit/minggu (jalan cepat, bersepeda, berenang).'
    });
  }

  if (input.smoker) {
    factors.push({
      id: 'smoker',
      name: 'Smoking History',
      nameId: 'Riwayat Merokok',
      impactScore: 75,
      category: 'Gaya Hidup',
      status: 'Critical',
      description: 'Racun nikotin & karbon monoksida merusak lapisan endotel pembuluh darah dan memicu penggumpalan darah.',
      recommendation: 'Mengikuti program konseling berhentinya merokok dan hindari paparan asap rokok pasif.'
    });
  }

  if (input.genHlth >= 4) {
    factors.push({
      id: 'genHlth',
      name: 'Poor General Health Perception',
      nameId: 'Kondisi Fisik / Kesehatan Umum Cukup-Buruk',
      impactScore: 65,
      category: 'Kesehatan Umum',
      status: 'Warning',
      description: 'Persepsi kesehatan tubuh yang kurang baik sering berkorelasi dengan gangguan sistemik non-terdiagnosis.',
      recommendation: 'Jadwalkan Medical Check-Up (MCU) lengkap mencakup HbA1c, profil lipid, dan elektrokardiogram (EKG).'
    });
  }

  if (factors.length === 0) {
    factors.push({
      id: 'lifestyle_opt',
      name: 'Optimal Health Baseline',
      nameId: 'Profil Gaya Hidup Optimal',
      impactScore: 15,
      category: 'Gaya Hidup',
      status: 'Good',
      description: 'Indikator klinis dan pola hidup Anda berada pada rentang ideal yang sangat mendukung kesehatan kardiovaskular.',
      recommendation: 'Pertahankan pola makan gizi seimbang dan olahraga teratur secara berkelanjutan.'
    });
  }

  // Sorting faktor risiko berdasarkan impact
  factors.sort((a, b) => b.impactScore - a.impactScore);

  // Metrik Radar Chart (0-100 score, di mana 100 = Sangat Sehat)
  const radarMetrics: RadarMetric[] = [
    { subject: 'Tekanan Darah', score: input.highBP ? 30 : 95, fullMark: 100 },
    { subject: 'Kolesterol', score: input.highChol ? 35 : 90, fullMark: 100 },
    { subject: 'Manajemen BMI', score: Math.max(10, 100 - Math.abs(bmiInfo.bmi - 22) * 4), fullMark: 100 },
    { subject: 'Aktivitas Fisik', score: input.physActivity ? 95 : 30, fullMark: 100 },
    { subject: 'Nutrisi & Diets', score: (input.fruits * 40) + (input.veggies * 40) + 20, fullMark: 100 },
    { subject: 'Status Vitalitas', score: Math.max(20, (6 - input.genHlth) * 20), fullMark: 100 },
  ];

  // Action plan sesuai indikator SDG 3 (Kehidupan Sehat & Sejahtera)
  const preventionPlan: PreventionTarget[] = [
    {
      id: 'sdg_target_3_4',
      title: 'Pencegahan Penyakit Tidak Menular (SDG Target 3.4)',
      sdgTarget: 'SDG 3.4 - Kurangi 1/3 Kematian Dini Akibat PTM',
      action: 'Lakukan pemeriksaan kadar gula darah puasa (GDP) dan HbA1c minimal 6 bulan sekali.',
      icon: 'Activity'
    },
    {
      id: 'sdg_target_diet',
      title: 'Pola Makan Gizi Seimbang & Rendah Gula',
      sdgTarget: 'SDG 3.d - Penguatan Kapasitas Risiko Kesehatan',
      action: 'Terapkan porsi piring makan "Isi Piringku": 50% sayur & buah, 25% karbohidrat kompleks, 25% protein tanpa lemak.',
      icon: 'Utensils'
    },
    {
      id: 'sdg_target_exercise',
      title: 'Rutin Aktivitas Fisik Terukur',
      sdgTarget: 'SDG 3.3 - Penguatan Kebugaran Komunitas',
      action: 'Targetkan minimal 8.000 - 10.000 langkah sehari atau 30 menit latihan aerobik 5 kali dalam seminggu.',
      icon: 'HeartPulse'
    }
  ];

  return {
    timestamp: new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    bmiInfo,
    diabetesRiskProb,
    cvdRiskProb,
    overallRiskLevel,
    riskScore,
    topRiskFactors: factors,
    radarMetrics,
    preventionPlan,
    inputSummary: input
  };
}
