import React from 'react';
import { ClinicalDataInput } from '@/types/screening';
import { HeartPulse, Stethoscope, Activity, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

interface Step2Props {
  formData: ClinicalDataInput;
  onChange: (updated: Partial<ClinicalDataInput>) => void;
}

export function Step2Clinical({ formData, onChange }: Step2Props) {
  const clinicalItems = [
    {
      key: 'highBP' as keyof ClinicalDataInput,
      title: 'Tekanan Darah Tinggi (Hipertensi)',
      desc: 'Apakah dokter/tenaga medis pernah memberitahu bahwa Anda memiliki tekanan darah tinggi?',
      icon: Activity,
      color: 'rose'
    },
    {
      key: 'highChol' as keyof ClinicalDataInput,
      title: 'Kadar Kolesterol Tinggi',
      desc: 'Apakah Anda pernah didiagnosis memiliki kadar kolesterol darah di atas batas normal?',
      icon: HeartPulse,
      color: 'amber'
    },
    {
      key: 'cholCheck' as keyof ClinicalDataInput,
      title: 'Pemeriksaan Kolesterol Rutin',
      desc: 'Apakah Anda pernah melakukan cek kadar kolesterol dalam 5 tahun terakhir?',
      icon: Stethoscope,
      color: 'teal'
    },
    {
      key: 'stroke' as keyof ClinicalDataInput,
      title: 'Riwayat Stroke',
      desc: 'Apakah Anda pernah mengalami serangan stroke atau gangguan pembuluh darah otak?',
      icon: ShieldAlert,
      color: 'purple'
    },
    {
      key: 'heartDiseaseorAttack' as keyof ClinicalDataInput,
      title: 'Riwayat Penyakit Jantung Koroner',
      desc: 'Apakah Anda pernah mengalami angina (nyeri dada) atau serangan jantung koroner?',
      icon: ShieldAlert,
      color: 'red'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-sky-400" /> Langkah 2: Indikator Klinis & Riwayat Medis
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Indikator ini merupakan prediktor klinis utama dalam model Machine Learning BRFSS.
        </p>
      </div>

      <div className="space-y-4">
        {clinicalItems.map((item) => {
          const Icon = item.icon;
          const isSelected = formData[item.key] === 1;

          return (
            <div
              key={item.key}
              className={`p-4 rounded-2xl border transition-all ${
                isSelected
                  ? 'bg-slate-900/90 border-teal-500/50 shadow-lg shadow-teal-500/5'
                  : 'glass-card border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl mt-0.5 ${
                    isSelected ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => onChange({ [item.key]: 1 })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                      formData[item.key] === 1
                        ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-md shadow-teal-500/20'
                        : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Ya
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ [item.key]: 0 })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                      formData[item.key] === 0
                        ? 'bg-slate-700 text-white border-slate-600'
                        : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <XCircle className="h-3.5 w-3.5" /> Tidak
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
