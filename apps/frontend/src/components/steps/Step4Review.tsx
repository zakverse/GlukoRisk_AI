'use client';

import React from 'react';
import { ClinicalDataInput } from '@/types/screening';
import { calculateBMI } from '@/utils/calculator';
import { CheckCircle2, Edit3, Sparkles } from 'lucide-react';

interface Props {
  formData: ClinicalDataInput;
  onEdit: (step: number) => void;
}

const BOOL = (v: number) => (v === 1 ? '✓ Ya' : '✗ Tidak');
const GEN_HLTH = ['', 'Sangat Baik', 'Baik Sekali', 'Baik', 'Cukup', 'Buruk'];
const EDU = ['', 'SD/Tidak Sekolah', 'SMP', 'SMA', 'SMK/Diploma', 'Sarjana', 'Pascasarjana'];

function SummaryCard({ title, step, color, children, onEdit }: {
  title: string; step: number; color: string; children: React.ReactNode; onEdit: (s: number) => void;
}) {
  return (
    <div className="rounded-2xl border p-5" style={{ background: `${color}06`, borderColor: `${color}20` }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold" style={{ color }}>
          {title}
        </h3>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.06]"
        >
          <Edit3 className="h-3.5 w-3.5" /> Edit
        </button>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-start justify-between gap-4 text-xs py-1 border-b border-white/[0.04] last:border-0">
      <span className="text-slate-500 shrink-0">{label}</span>
      <span className="text-slate-200 font-semibold text-right">{value}</span>
    </div>
  );
}

export function Step4Review({ formData, onEdit }: Props) {
  const bmiInfo = calculateBMI(formData.heightCm, formData.weightKg);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          Review Data
        </h2>
        <p className="text-sm text-slate-400 mt-1">Periksa kembali data Anda sebelum memulai analisis AI.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SummaryCard title="📋 Data Dasar" step={1} color="#0ea5e9" onEdit={onEdit}>
          <SummaryRow label="Usia" value={`${formData.age} tahun`} />
          <SummaryRow label="Jenis Kelamin" value={formData.sex === 1 ? 'Laki-laki' : 'Perempuan'} />
          <SummaryRow label="Tinggi Badan" value={`${formData.heightCm} cm`} />
          <SummaryRow label="Berat Badan" value={`${formData.weightKg} kg`} />
          <SummaryRow label="BMI" value={`${bmiInfo.bmi} kg/m² (${bmiInfo.category})`} />
          <SummaryRow label="Pendidikan" value={EDU[formData.education] || '-'} />
        </SummaryCard>

        <SummaryCard title="🏃 Gaya Hidup" step={2} color="#14b8a6" onEdit={onEdit}>
          <SummaryRow label="Aktivitas Fisik" value={BOOL(formData.physActivity)} />
          <SummaryRow label="Merokok" value={BOOL(formData.smoker)} />
          <SummaryRow label="Alkohol Berat" value={BOOL(formData.hvyAlcoholConsump)} />
          <SummaryRow label="Konsumsi Buah" value={BOOL(formData.fruits)} />
          <SummaryRow label="Konsumsi Sayur" value={BOOL(formData.veggies)} />
          <SummaryRow label="Kesehatan Umum" value={GEN_HLTH[formData.genHlth] || '-'} />
        </SummaryCard>

        <SummaryCard title="🩺 Indikator Kesehatan" step={3} color="#6366f1" onEdit={onEdit}>
          <SummaryRow label="Hipertensi" value={BOOL(formData.highBP)} />
          <SummaryRow label="Kolesterol Tinggi" value={BOOL(formData.highChol)} />
          <SummaryRow label="Penyakit Jantung" value={BOOL(formData.heartDiseaseorAttack)} />
          <SummaryRow label="Riwayat Stroke" value={BOOL(formData.stroke)} />
          <SummaryRow label="Riwayat Diabetes Keluarga" value={BOOL(formData.familyDiabetes || 0)} />
          {formData.glucoseLevel && <SummaryRow label="Glukosa" value={`${formData.glucoseLevel} mg/dL`} />}
          {formData.systolicBP && <SummaryRow label="Tekanan Darah" value={`${formData.systolicBP}/${formData.diastolicBP || '?'} mmHg`} />}
        </SummaryCard>

        {/* BMI Highlight Card */}
        <div
          className="rounded-2xl p-5 flex flex-col justify-between"
          style={{ background: `${bmiInfo.color}08`, border: `1px solid ${bmiInfo.color}25` }}
        >
          <div>
            <p className="text-xs font-bold mb-1" style={{ color: bmiInfo.color }}>📊 Indeks Massa Tubuh</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-black text-white">{bmiInfo.bmi}</span>
              <span className="text-sm text-slate-400">kg/m²</span>
            </div>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold" style={{ color: bmiInfo.color, background: `${bmiInfo.color}20` }}>
              {bmiInfo.category}
            </span>
          </div>
          <div className="mt-4 w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, ((bmiInfo.bmi - 10) / 30) * 100)}%`, background: bmiInfo.color }} />
          </div>
        </div>
      </div>

      {/* Confirmation */}
      <div
        className="p-5 rounded-2xl flex items-start gap-4"
        style={{ background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.15)' }}
      >
        <Sparkles className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-sky-300 mb-1">Siap untuk Analisis AI</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Klik tombol <strong className="text-white">"Analisis Risiko"</strong> untuk memulai. Model AI akan menganalisis 20+ indikator kesehatan Anda dan menghasilkan estimasi risiko serta rekomendasi preventif personal.
          </p>
        </div>
      </div>
    </div>
  );
}
