import React from 'react';
import { ClinicalDataInput } from '@/types/screening';
import { calculateBMI } from '@/utils/calculator';
import { User, Scale, Ruler, GraduationCap, DollarSign } from 'lucide-react';

interface Step1Props {
  formData: ClinicalDataInput;
  onChange: (updated: Partial<ClinicalDataInput>) => void;
}

export function Step1Demographics({ formData, onChange }: Step1Props) {
  const bmiInfo = calculateBMI(formData.heightCm, formData.weightKg);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <User className="h-5 w-5 text-teal-400" /> Langkah 1: Informasi Dasar & Demografi
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Masukkan usia, jenis kelamin, serta parameter pengukuran fisik tubuh Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Usia */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Usia Saat Ini (Tahun)
          </label>
          <input
            type="number"
            min={18}
            max={100}
            value={formData.age || ''}
            onChange={(e) => onChange({ age: parseInt(e.target.value) || 18 })}
            className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium focus:ring-2 focus:ring-teal-500 transition-all"
            placeholder="Contoh: 45"
          />
        </div>

        {/* Jenis Kelamin */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Jenis Kelamin Biologis
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onChange({ sex: 1 })}
              className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border ${
                formData.sex === 1
                  ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-lg shadow-teal-500/10'
                  : 'glass-card border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              👨 Laki-laki
            </button>
            <button
              type="button"
              onClick={() => onChange({ sex: 0 })}
              className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border ${
                formData.sex === 0
                  ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-lg shadow-teal-500/10'
                  : 'glass-card border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              👩 Perempuan
            </button>
          </div>
        </div>

        {/* Tinggi Badan */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <Ruler className="h-4 w-4 text-sky-400" /> Tinggi Badan (cm)
          </label>
          <input
            type="number"
            min={100}
            max={230}
            value={formData.heightCm || ''}
            onChange={(e) => onChange({ heightCm: parseFloat(e.target.value) || 170 })}
            className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium focus:ring-2 focus:ring-sky-500 transition-all"
            placeholder="Contoh: 168"
          />
        </div>

        {/* Berat Badan */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <Scale className="h-4 w-4 text-indigo-400" /> Berat Badan (kg)
          </label>
          <input
            type="number"
            min={30}
            max={200}
            value={formData.weightKg || ''}
            onChange={(e) => onChange({ weightKg: parseFloat(e.target.value) || 65 })}
            className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="Contoh: 70"
          />
        </div>
      </div>

      {/* Live BMI Calculator Card */}
      <div className="p-4 rounded-2xl glass-card border border-teal-500/30 bg-gradient-to-r from-teal-950/40 via-slate-900/60 to-slate-950 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider">Kalkulasi Otomatis BMI</span>
          <h4 className="text-xl font-black text-white mt-0.5">
            {bmiInfo.bmi} <span className="text-xs font-normal text-slate-400">kg/m²</span>
          </h4>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400">Kategori BMI:</span>
          <p className={`text-sm font-bold mt-0.5 ${
            bmiInfo.category === 'Normal' ? 'text-emerald-400' :
            bmiInfo.category === 'Overweight' ? 'text-amber-400' : 'text-rose-400'
          }`}>
            {bmiInfo.category === 'Normal' ? 'Ideal (Normal)' :
             bmiInfo.category === 'Overweight' ? 'Kelebihan Berat' :
             bmiInfo.category === 'Obese' ? 'Obesitas' : 'Kekurangan Berat'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Pendidikan (BRFSS 1-6) */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <GraduationCap className="h-4 w-4 text-emerald-400" /> Tingkat Pendidikan Terakhir
          </label>
          <select
            value={formData.education}
            onChange={(e) => onChange({ education: parseInt(e.target.value) })}
            className="w-full px-4 py-3 rounded-xl glass-input text-xs font-medium focus:ring-2 focus:ring-emerald-500"
          >
            <option value={1} className="bg-slate-900 text-white">Tidak pernah sekolah / TK</option>
            <option value={2} className="bg-slate-900 text-white">SD / Sederajat (Kelas 1-8)</option>
            <option value={3} className="bg-slate-900 text-white">SMP / Tidak tamat SMA</option>
            <option value={4} className="bg-slate-900 text-white">SMA / SMUK / Sederajat</option>
            <option value={5} className="bg-slate-900 text-white">Diploma / Kuliah 1-3 Tahun</option>
            <option value={6} className="bg-slate-900 text-white">Sarjana (S1/S2/S3) / Lulus Perguruan Tinggi</option>
          </select>
        </div>

        {/* Tingkat Pendapatan (BRFSS 1-8) */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <DollarSign className="h-4 w-4 text-amber-400" /> Kategori Pendapatan Rumah Tangga
          </label>
          <select
            value={formData.income}
            onChange={(e) => onChange({ income: parseInt(e.target.value) })}
            className="w-full px-4 py-3 rounded-xl glass-input text-xs font-medium focus:ring-2 focus:ring-amber-500"
          >
            <option value={1} className="bg-slate-900 text-white">Kelompok Pendapatan Sangat Rendah (&lt; Rp 1,5 Juta/bln)</option>
            <option value={3} className="bg-slate-900 text-white">Kelompok Pendapatan Menengah Bawah (Rp 1,5 - 3.5 Juta/bln)</option>
            <option value={5} className="bg-slate-900 text-white">Kelompok Pendapatan Menengah (Rp 3,5 - 7.5 Juta/bln)</option>
            <option value={7} className="bg-slate-900 text-white">Kelompok Pendapatan Menengah Atas (Rp 7,5 - 15 Juta/bln)</option>
            <option value={8} className="bg-slate-900 text-white">Kelompok Pendapatan Tinggi (&gt; Rp 15 Juta/bln)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
