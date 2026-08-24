'use client';

import React, { useState } from 'react';
import { ClinicalDataInput, ScreeningResult } from '@/types/screening';
import { Step1BasicData } from './steps/Step1BasicData';
import { Step2Lifestyle } from './steps/Step2Lifestyle';
import { Step3HealthIndicators } from './steps/Step3HealthIndicators';
import { Step4Review } from './steps/Step4Review';
import { ChevronRight, ChevronLeft, Loader2, Sparkles, CheckCircle, Brain, Database } from 'lucide-react';
import { DEMO_PROFILES, saveToHistory, saveResult } from '@/utils/calculator';
import { useRouter } from 'next/navigation';

const INITIAL_FORM_DATA: ClinicalDataInput = {
  age: 35,
  sex: 1,
  heightCm: 170,
  weightKg: 70,
  education: 4,
  income: 5,
  smoker: 0,
  physActivity: 1,
  fruits: 1,
  veggies: 1,
  hvyAlcoholConsump: 0,
  genHlth: 2,
  highBP: 0,
  highChol: 0,
  cholCheck: 1,
  stroke: 0,
  heartDiseaseorAttack: 0,
  diffWalk: 0,
  mentHlth: 2,
  physHlth: 1,
  anyHealthcare: 1,
  noDocbcCost: 0,
  familyDiabetes: 0,
};

const STEPS = [
  { num: 1, title: 'Data Dasar', shortTitle: 'Data Dasar', icon: '👤' },
  { num: 2, title: 'Gaya Hidup', shortTitle: 'Gaya Hidup', icon: '🏃' },
  { num: 3, title: 'Indikator Kesehatan', shortTitle: 'Klinis', icon: '🩺' },
  { num: 4, title: 'Review', shortTitle: 'Review', icon: '✅' },
];

const LOADING_MESSAGES = [
  'AI sedang menganalisis data kesehatan Anda...',
  'Memproses 20+ indikator risiko...',
  'Menghitung probabilitas diabetes dan kardiovaskular...',
  'Menyiapkan visualisasi faktor risiko...',
  'Menyusun rekomendasi preventif personal...',
];

export function MultiStepForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ClinicalDataInput>(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [showDemoMenu, setShowDemoMenu] = useState(false);

  const handleUpdate = (updated: Partial<ClinicalDataInput>) => {
    setFormData((prev) => ({ ...prev, ...updated }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditFromReview = (targetStep: number) => {
    setStep(targetStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setLoadingMsg(0);

    // Cycle through loading messages
    const interval = setInterval(() => {
      setLoadingMsg((prev) => Math.min(prev + 1, LOADING_MESSAGES.length - 1));
    }, 800);

    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Gagal memproses prediksi.');
      const data: ScreeningResult = await res.json();

      // Save to localStorage
      saveResult(data);
      saveToHistory(data);

      // Navigate to results page
      router.push('/results');
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat memproses data skrining. Silakan coba lagi.');
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const handleDemoProfile = (profileId: 'low' | 'moderate' | 'high') => {
    const profile = DEMO_PROFILES.find((p) => p.id === profileId);
    if (profile) {
      setFormData(profile.data);
      setShowDemoMenu(false);
      setStep(4); // Jump to review
    }
  };

  const progressPct = ((step - 1) / (STEPS.length - 1)) * 100;

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center py-16 space-y-6">
        <div className="relative">
          <div className="h-20 w-20 rounded-full border-4 border-sky-500/20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-t-sky-500 animate-spin" />
            <Brain className="h-8 w-8 text-sky-400" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-bold text-white">{LOADING_MESSAGES[loadingMsg]}</p>
          <p className="text-sm text-slate-400">Model Machine Learning sedang bekerja...</p>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-sky-500 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header with Demo Button */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Assessment Skrining</h1>
          <p className="text-sm text-slate-400 mt-0.5">Isi data kesehatan Anda secara lengkap untuk hasil terbaik</p>
        </div>

        {/* Demo Data Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDemoMenu(!showDemoMenu)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 glass-card border border-white/10 hover:border-sky-500/30 hover:text-white transition-all"
          >
            <Database className="h-4 w-4 text-sky-400" />
            Demo Data
          </button>

          {showDemoMenu && (
            <div className="absolute right-0 top-full mt-2 w-72 z-20 glass-panel border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-3 border-b border-white/[0.06]">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pilih Profil Demo</p>
              </div>
              {DEMO_PROFILES.map((profile) => (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => handleDemoProfile(profile.id)}
                  className="w-full flex flex-col items-start p-4 hover:bg-white/[0.04] transition-colors text-left border-b border-white/[0.04] last:border-0"
                >
                  <span className="text-sm font-bold text-white">{profile.label}</span>
                  <span className="text-xs text-slate-400 mt-0.5">{profile.description}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="glass-panel border border-white/[0.07] rounded-2xl p-5">
        {/* Step indicators */}
        <div className="flex items-center gap-0">
          {STEPS.map((s, idx) => {
            const isActive = step === s.num;
            const isDone = step > s.num;
            return (
              <React.Fragment key={s.num}>
                <button
                  type="button"
                  onClick={() => isDone && setStep(s.num)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all text-left ${
                    isActive ? 'bg-sky-500/10 border border-sky-500/30' :
                    isDone ? 'hover:bg-white/[0.04] cursor-pointer' : 'opacity-40 cursor-default'
                  }`}
                  disabled={!isDone && !isActive}
                >
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-all ${
                      isActive ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' :
                      isDone ? 'bg-teal-500/20 border border-teal-500/40' :
                      'bg-slate-800'
                    }`}
                  >
                    {isDone ? <CheckCircle className="h-4 w-4 text-teal-400" /> : s.num}
                  </div>
                  <span className={`text-sm font-semibold hidden sm:block ${isActive ? 'text-sky-300' : isDone ? 'text-slate-400' : 'text-slate-600'}`}>
                    {s.shortTitle}
                  </span>
                </button>
                {idx < STEPS.length - 1 && (
                  <div className="flex-1 h-px mx-1" style={{
                    background: step > s.num
                      ? 'linear-gradient(90deg, rgba(20,184,166,0.6), rgba(14,165,233,0.3))'
                      : 'rgba(255,255,255,0.06)'
                  }} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressPct}%`,
              background: 'linear-gradient(90deg, #0ea5e9, #14b8a6)',
            }}
          />
        </div>

        <div className="flex justify-between mt-2">
          <span className="text-[11px] text-slate-500">Langkah {step} dari {STEPS.length}</span>
          <span className="text-[11px] font-bold text-sky-400">{Math.round(progressPct)}% Selesai</span>
        </div>
      </div>

      {/* Form Card */}
      <div className="glass-panel border border-white/[0.07] rounded-2xl p-6 sm:p-8">
        {step === 1 && <Step1BasicData formData={formData} onChange={handleUpdate} />}
        {step === 2 && <Step2Lifestyle formData={formData} onChange={handleUpdate} />}
        {step === 3 && <Step3HealthIndicators formData={formData} onChange={handleUpdate} />}
        {step === 4 && <Step4Review formData={formData} onEdit={handleEditFromReview} />}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/[0.06]">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
              step === 1
                ? 'opacity-30 cursor-not-allowed border-white/[0.05] text-slate-600 bg-slate-900'
                : 'border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.06] hover:border-white/20'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            Kembali
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30"
              style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)' }}
            >
              Selanjutnya
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-xl shadow-sky-500/25 hover:shadow-sky-500/35"
              style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)' }}
            >
              <Sparkles className="h-4 w-4" />
              Analisis Risiko
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Click outside to close demo menu */}
      {showDemoMenu && (
        <div className="fixed inset-0 z-10" onClick={() => setShowDemoMenu(false)} />
      )}
    </div>
  );
}
