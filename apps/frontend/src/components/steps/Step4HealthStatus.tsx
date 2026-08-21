import React from 'react';
import { ClinicalDataInput } from '@/types/screening';
import { Heart, Brain, Footprints, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';

interface Step4Props {
  formData: ClinicalDataInput;
  onChange: (updated: Partial<ClinicalDataInput>) => void;
}

export function Step4HealthStatus({ formData, onChange }: Step4Props) {
  const genHlthOptions = [
    { value: 1, label: 'Sangat Baik (Excellent)', color: 'text-emerald-400 border-emerald-500/50' },
    { value: 2, label: 'Baik Sekali (Very Good)', color: 'text-teal-400 border-teal-500/50' },
    { value: 3, label: 'Cukup Baik (Good)', color: 'text-sky-400 border-sky-500/50' },
    { value: 4, label: 'Sedang / Cukup (Fair)', color: 'text-amber-400 border-amber-500/50' },
    { value: 5, label: 'Kurang Baik (Poor)', color: 'text-rose-400 border-rose-500/50' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Heart className="h-5 w-5 text-rose-400" /> Langkah 4: Persepsi Kesehatan & Akses Medis
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Evaluasi kondisi fisik umum dan akses jaminan kesehatan Anda.
        </p>
      </div>

      {/* Persepsi Kesehatan Umum (GenHlth 1-5) */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-amber-400" /> Persepsi Kondisi Kesehatan Umum Anda
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {genHlthOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ genHlth: opt.value })}
              className={`p-3 rounded-xl text-xs font-bold transition-all border text-center ${
                formData.genHlth === opt.value
                  ? `bg-slate-900 ${opt.color} shadow-lg shadow-teal-500/10 ring-1 ring-teal-400`
                  : 'glass-card border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Days Slider for MentHlth & PhysHlth */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* PhysHlth */}
        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-rose-400" /> Hari Gangguan Kesehatan Fisik
            </label>
            <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-bold text-xs">
              {formData.physHlth} Hari / Bulan
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Dalam 30 hari terakhir, berapa hari fisik Anda terganggu penyakit?</p>
          <input
            type="range"
            min={0}
            max={30}
            value={formData.physHlth}
            onChange={(e) => onChange({ physHlth: parseInt(e.target.value) })}
            className="w-full accent-rose-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* MentHlth */}
        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Brain className="h-4 w-4 text-indigo-400" /> Hari Gangguan Kesehatan Mental
            </label>
            <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-xs">
              {formData.mentHlth} Hari / Bulan
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Dalam 30 hari terakhir, berapa hari Anda mengalami stres/depresi?</p>
          <input
            type="range"
            min={0}
            max={30}
            value={formData.mentHlth}
            onChange={(e) => onChange({ mentHlth: parseInt(e.target.value) })}
            className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* DiffWalk & Healthcare Coverage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* DiffWalk */}
        <div className={`p-4 rounded-2xl border transition-all ${
          formData.diffWalk === 1 ? 'bg-slate-900 border-amber-500/50' : 'glass-card border-slate-800'
        }`}>
          <div className="flex items-center gap-2.5 mb-2">
            <Footprints className="h-4 w-4 text-amber-400" />
            <h4 className="text-xs font-bold text-white">Kesulitan Berjalan / Tangga</h4>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              type="button"
              onClick={() => onChange({ diffWalk: 1 })}
              className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                formData.diffWalk === 1 ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Ya
            </button>
            <button
              type="button"
              onClick={() => onChange({ diffWalk: 0 })}
              className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                formData.diffWalk === 0 ? 'bg-slate-700 text-white border-slate-600' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Tidak
            </button>
          </div>
        </div>

        {/* Asuransi Kesehatan */}
        <div className={`p-4 rounded-2xl border transition-all ${
          formData.anyHealthcare === 1 ? 'bg-slate-900 border-teal-500/50' : 'glass-card border-slate-800'
        }`}>
          <div className="flex items-center gap-2.5 mb-2">
            <ShieldCheck className="h-4 w-4 text-teal-400" />
            <h4 className="text-xs font-bold text-white">Asuransi / JKN (BPJS)</h4>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              type="button"
              onClick={() => onChange({ anyHealthcare: 1 })}
              className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                formData.anyHealthcare === 1 ? 'bg-teal-500 text-slate-950 border-teal-400' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Ada
            </button>
            <button
              type="button"
              onClick={() => onChange({ anyHealthcare: 0 })}
              className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                formData.anyHealthcare === 0 ? 'bg-slate-700 text-white border-slate-600' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Tidak Ada
            </button>
          </div>
        </div>

        {/* Kendala Biaya Dokter */}
        <div className={`p-4 rounded-2xl border transition-all ${
          formData.noDocbcCost === 1 ? 'bg-slate-900 border-purple-500/50' : 'glass-card border-slate-800'
        }`}>
          <div className="flex items-center gap-2.5 mb-2">
            <CreditCard className="h-4 w-4 text-purple-400" />
            <h4 className="text-xs font-bold text-white">Terkendala Biaya Berobat</h4>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              type="button"
              onClick={() => onChange({ noDocbcCost: 1 })}
              className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                formData.noDocbcCost === 1 ? 'bg-purple-500 text-slate-950 border-purple-400' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Ya (Terkendala)
            </button>
            <button
              type="button"
              onClick={() => onChange({ noDocbcCost: 0 })}
              className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                formData.noDocbcCost === 0 ? 'bg-slate-700 text-white border-slate-600' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Tidak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
