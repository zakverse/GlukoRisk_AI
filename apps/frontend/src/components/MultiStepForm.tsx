'use client';

import React, { useState } from 'react';
import { ClinicalDataInput, ScreeningResult } from '@/types/screening';
import { Step1Demographics } from './steps/Step1Demographics';
import { Step2Clinical } from './steps/Step2Clinical';
import { Step3Lifestyle } from './steps/Step3Lifestyle';
import { Step4HealthStatus } from './steps/Step4HealthStatus';
import { RiskResultDashboard } from './RiskResultDashboard';
import { ChevronRight, ChevronLeft, Activity, Sparkles, Loader2, CheckCircle } from 'lucide-react';

const INITIAL_FORM_DATA: ClinicalDataInput = {
  age: 42,
  sex: 1,
  heightCm: 168,
  weightKg: 72,
  education: 5,
  income: 6,
  highBP: 0,
  highChol: 0,
  cholCheck: 1,
  stroke: 0,
  heartDiseaseorAttack: 0,
  smoker: 0,
  physActivity: 1,
  fruits: 1,
  veggies: 1,
  hvyAlcoholConsump: 0,
  genHlth: 2,
  mentHlth: 2,
  physHlth: 1,
  diffWalk: 0,
  anyHealthcare: 1,
  noDocbcCost: 0,
};

export function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ClinicalDataInput>(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScreeningResult | null>(null);

  const handleUpdate = (updated: Partial<ClinicalDataInput>) => {
    setFormData((prev) => ({ ...prev, ...updated }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      handleNext();
      return;
    }
    setLoading(true);

    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Gagal memproses prediksi.');

      const data: ScreeningResult = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat memproses data skrining.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setStep(1);
  };

  if (result) {
    return <RiskResultDashboard result={result} onReset={handleReset} />;
  }

  const stepsList = [
    { num: 1, title: 'Demografi', desc: 'Usia, BMI & Sosial' },
    { num: 2, title: 'Klinis', desc: 'Tensi & Kolesterol' },
    { num: 3, title: 'Gaya Hidup', desc: 'Nutrisi & Olahraga' },
    { num: 4, title: 'Status Kesehatan', desc: 'Fisik & Akses Medis' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Bar Header */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-teal-400 uppercase bg-teal-950 px-2.5 py-1 rounded-full border border-teal-500/30">
              Langkah {step} dari 4
            </span>
            <h2 className="text-xl font-extrabold text-white mt-1">Assessment Skrining Risiko Kesehatan</h2>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400">Progres Pengisian:</span>
            <p className="text-sm font-black text-teal-400">{step * 25}% Selesai</p>
          </div>
        </div>

        {/* Multi-step Stepper Indicator */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stepsList.map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`p-3 rounded-2xl text-left transition-all border ${
                step === s.num
                  ? 'bg-slate-900 border-teal-500 shadow-lg shadow-teal-500/10 ring-1 ring-teal-500/50'
                  : step > s.num
                  ? 'bg-slate-900/60 border-teal-500/40 text-teal-300'
                  : 'glass-card border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === s.num ? 'bg-teal-500 text-slate-950' :
                  step > s.num ? 'bg-teal-950 text-teal-400 border border-teal-500/40' : 'bg-slate-800 text-slate-400'
                }`}>
                  {step > s.num ? <CheckCircle className="h-4 w-4 text-teal-400" /> : s.num}
                </div>
                <span className={`text-xs font-bold ${step === s.num ? 'text-white' : 'text-slate-400'}`}>
                  {s.title}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 pl-8 hidden md:block">{s.desc}</p>
            </button>
          ))}
        </div>

        {/* Progress Line */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Dynamic Form Step Card */}
      <form onSubmit={handleSubmit} className="p-8 rounded-3xl glass-panel border border-slate-800 shadow-2xl space-y-8">
        {step === 1 && <Step1Demographics formData={formData} onChange={handleUpdate} />}
        {step === 2 && <Step2Clinical formData={formData} onChange={handleUpdate} />}
        {step === 3 && <Step3Lifestyle formData={formData} onChange={handleUpdate} />}
        {step === 4 && <Step4HealthStatus formData={formData} onChange={handleUpdate} />}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-800">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1}
            className={`px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border ${
              step === 1
                ? 'opacity-40 cursor-not-allowed bg-slate-900 border-slate-800 text-slate-600'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <ChevronLeft className="h-4 w-4" /> Kembali
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all"
            >
              Langkah Selanjutnya <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 via-sky-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-xl shadow-teal-500/25 transition-all transform hover:scale-[1.02]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
                  <span>Menganalisis Risiko ML...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-slate-950" />
                  <span>Hitung Probabilitas Risiko Kesehatan</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
