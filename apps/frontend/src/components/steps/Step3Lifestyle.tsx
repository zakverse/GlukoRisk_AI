import React from 'react';
import { ClinicalDataInput } from '@/types/screening';
import { Flame, Dumbbell, Apple, Salad, Wine, Check, X } from 'lucide-react';

interface Step3Props {
  formData: ClinicalDataInput;
  onChange: (updated: Partial<ClinicalDataInput>) => void;
}

export function Step3Lifestyle({ formData, onChange }: Step3Props) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-emerald-400" /> Langkah 3: Gaya Hidup & Kebiasaan Nutrisi
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Faktor gaya hidup sangat mempengaruhi resiko diabetes tipe-2 dan fleksibilitas metabolisme.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Merokok */}
        <div className={`p-4 rounded-2xl border transition-all ${
          formData.smoker === 1 ? 'bg-slate-900 border-amber-500/50' : 'glass-card border-slate-800'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Riwayat Merokok</h4>
                <p className="text-xs text-slate-400 mt-0.5">Pernah merokok ≥100 batang seumur hidup?</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              type="button"
              onClick={() => onChange({ smoker: 1 })}
              className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                formData.smoker === 1 ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              Ya (Perokok)
            </button>
            <button
              type="button"
              onClick={() => onChange({ smoker: 0 })}
              className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                formData.smoker === 0 ? 'bg-slate-700 text-white border-slate-600' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              Tidak Merokok
            </button>
          </div>
        </div>

        {/* Olahraga / Aktivitas Fisik */}
        <div className={`p-4 rounded-2xl border transition-all ${
          formData.physActivity === 1 ? 'bg-slate-900 border-emerald-500/50' : 'glass-card border-slate-800'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Dumbbell className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Aktivitas Fisik / Olahraga</h4>
                <p className="text-xs text-slate-400 mt-0.5">Melakukan olahraga rutin 30 hari terakhir?</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              type="button"
              onClick={() => onChange({ physActivity: 1 })}
              className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                formData.physActivity === 1 ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              Ya (Aktif Olahraga)
            </button>
            <button
              type="button"
              onClick={() => onChange({ physActivity: 0 })}
              className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                formData.physActivity === 0 ? 'bg-slate-700 text-white border-slate-600' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              Tidak Olahraga
            </button>
          </div>
        </div>

        {/* Buah */}
        <div className={`p-4 rounded-2xl border transition-all ${
          formData.fruits === 1 ? 'bg-slate-900 border-rose-500/50' : 'glass-card border-slate-800'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400">
                <Apple className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Konsumsi Buah Harian</h4>
                <p className="text-xs text-slate-400 mt-0.5">Mengkonsumsi minimal 1 porsi buah per hari?</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              type="button"
              onClick={() => onChange({ fruits: 1 })}
              className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                formData.fruits === 1 ? 'bg-rose-500 text-slate-950 border-rose-400' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              Ya (Rutin)
            </button>
            <button
              type="button"
              onClick={() => onChange({ fruits: 0 })}
              className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                formData.fruits === 0 ? 'bg-slate-700 text-white border-slate-600' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              Jarang / Tidak
            </button>
          </div>
        </div>

        {/* Sayuran */}
        <div className={`p-4 rounded-2xl border transition-all ${
          formData.veggies === 1 ? 'bg-slate-900 border-teal-500/50' : 'glass-card border-slate-800'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400">
                <Salad className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Konsumsi Sayur Harian</h4>
                <p className="text-xs text-slate-400 mt-0.5">Mengkonsumsi minimal 1 porsi sayuran per hari?</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              type="button"
              onClick={() => onChange({ veggies: 1 })}
              className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                formData.veggies === 1 ? 'bg-teal-500 text-slate-950 border-teal-400' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              Ya (Rutin)
            </button>
            <button
              type="button"
              onClick={() => onChange({ veggies: 0 })}
              className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                formData.veggies === 0 ? 'bg-slate-700 text-white border-slate-600' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              Jarang / Tidak
            </button>
          </div>
        </div>
      </div>

      {/* Alkohol */}
      <div className={`p-4 rounded-2xl border transition-all ${
        formData.hvyAlcoholConsump === 1 ? 'bg-slate-900 border-purple-500/50' : 'glass-card border-slate-800'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
              <Wine className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Konsumsi Alkohol Berat</h4>
              <p className="text-xs text-slate-400 mt-0.5">Pria &gt;14 minuman/minggu atau Wanita &gt;7 minuman/minggu?</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onChange({ hvyAlcoholConsump: 1 })}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                formData.hvyAlcoholConsump === 1 ? 'bg-purple-500 text-slate-950 border-purple-400' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Ya
            </button>
            <button
              type="button"
              onClick={() => onChange({ hvyAlcoholConsump: 0 })}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                formData.hvyAlcoholConsump === 0 ? 'bg-slate-700 text-white border-slate-600' : 'bg-slate-800 text-slate-400'
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
