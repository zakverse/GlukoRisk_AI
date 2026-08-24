'use client';

import React, { useEffect } from 'react';
import { ClinicalDataInput, CalculatedBMI } from '@/types/screening';
import { calculateBMI } from '@/utils/calculator';
import { User, Ruler, Weight, Calendar, TrendingUp } from 'lucide-react';

interface Props {
  formData: ClinicalDataInput;
  onChange: (data: Partial<ClinicalDataInput>) => void;
}

function BMIDisplay({ bmiInfo }: { bmiInfo: CalculatedBMI }) {
  if (!bmiInfo.bmi) return null;
  const pct = Math.min(100, ((bmiInfo.bmi - 10) / 30) * 100);

  return (
    <div
      className="p-4 rounded-xl transition-all"
      style={{ background: `${bmiInfo.color}10`, border: `1px solid ${bmiInfo.color}30` }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-400">Indeks Massa Tubuh (BMI)</span>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: bmiInfo.color, background: `${bmiInfo.color}20` }}>
          {bmiInfo.category}
        </span>
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-3xl font-black text-white">{bmiInfo.bmi}</span>
        <span className="text-sm text-slate-400">kg/m²</span>
      </div>
      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: bmiInfo.color }} />
      </div>
      <div className="flex justify-between text-[10px] text-slate-600 mt-1.5">
        <span>Kurus &lt;18.5</span>
        <span>Normal 18.5–24.9</span>
        <span>Gemuk ≥25</span>
      </div>
    </div>
  );
}

export function Step1BasicData({ formData, onChange }: Props) {
  const bmiInfo = calculateBMI(formData.heightCm, formData.weightKg);

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <User className="h-5 w-5 text-sky-400" />
          Data Dasar
        </h2>
        <p className="text-sm text-slate-400 mt-1">Informasi dasar untuk menghitung profil risiko Anda.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Usia */}
        <div>
          <label className="form-label flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-sky-400" /> Usia (tahun)
          </label>
          <input
            type="number"
            min={18} max={110}
            value={formData.age}
            onChange={(e) => onChange({ age: +e.target.value })}
            className="glass-input form-input rounded-xl"
            placeholder="Contoh: 35"
          />
          <p className="text-[11px] text-slate-500 mt-1">Rentang: 18 – 110 tahun</p>
        </div>

        {/* Jenis Kelamin */}
        <div>
          <label className="form-label flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-sky-400" /> Jenis Kelamin
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 0, label: '♀ Perempuan' },
              { value: 1, label: '♂ Laki-laki' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ sex: opt.value })}
                className={`card-option text-sm font-semibold text-center py-3 ${formData.sex === opt.value ? 'selected' : ''}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tinggi Badan */}
        <div>
          <label className="form-label flex items-center gap-1.5">
            <Ruler className="h-3.5 w-3.5 text-teal-400" /> Tinggi Badan (cm)
          </label>
          <input
            type="number"
            min={100} max={250}
            value={formData.heightCm}
            onChange={(e) => onChange({ heightCm: +e.target.value })}
            className="glass-input form-input rounded-xl"
            placeholder="Contoh: 168"
          />
          <p className="text-[11px] text-slate-500 mt-1">Rentang: 100 – 250 cm</p>
        </div>

        {/* Berat Badan */}
        <div>
          <label className="form-label flex items-center gap-1.5">
            <Weight className="h-3.5 w-3.5 text-teal-400" /> Berat Badan (kg)
          </label>
          <input
            type="number"
            min={20} max={300}
            value={formData.weightKg}
            onChange={(e) => onChange({ weightKg: +e.target.value })}
            className="glass-input form-input rounded-xl"
            placeholder="Contoh: 70"
          />
          <p className="text-[11px] text-slate-500 mt-1">Rentang: 20 – 300 kg</p>
        </div>
      </div>

      {/* BMI Display */}
      {formData.heightCm > 0 && formData.weightKg > 0 && (
        <BMIDisplay bmiInfo={bmiInfo} />
      )}

      {/* Education & Income */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-white/[0.05]">
        <div>
          <label className="form-label">Tingkat Pendidikan Terakhir</label>
          <select
            value={formData.education}
            onChange={(e) => onChange({ education: +e.target.value })}
            className="glass-input form-select rounded-xl"
          >
            <option value={1}>Tidak Sekolah / SD</option>
            <option value={2}>SMP</option>
            <option value={3}>SMA</option>
            <option value={4}>SMK / Diploma</option>
            <option value={5}>Sarjana (S1)</option>
            <option value={6}>Pascasarjana (S2/S3)</option>
          </select>
        </div>

        <div>
          <label className="form-label">Kisaran Penghasilan Bulanan</label>
          <select
            value={formData.income}
            onChange={(e) => onChange({ income: +e.target.value })}
            className="glass-input form-select rounded-xl"
          >
            <option value={1}>&lt; Rp 1 Juta</option>
            <option value={2}>Rp 1 – 2 Juta</option>
            <option value={3}>Rp 2 – 3 Juta</option>
            <option value={4}>Rp 3 – 5 Juta</option>
            <option value={5}>Rp 5 – 7 Juta</option>
            <option value={6}>Rp 7 – 10 Juta</option>
            <option value={7}>Rp 10 – 20 Juta</option>
            <option value={8}>&gt; Rp 20 Juta</option>
          </select>
          <p className="text-[11px] text-slate-500 mt-1">Opsional — digunakan untuk analisis akses layanan kesehatan</p>
        </div>
      </div>
    </div>
  );
}
