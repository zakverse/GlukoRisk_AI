'use client';

import React from 'react';
import { ClinicalDataInput } from '@/types/screening';
import { Dumbbell, Cigarette, Wine, Apple, Leaf, Heart } from 'lucide-react';

interface Props {
  formData: ClinicalDataInput;
  onChange: (data: Partial<ClinicalDataInput>) => void;
}

type CardOptionItem = {
  value: number;
  label: string;
  sublabel?: string;
  icon?: string;
};

function YesNoCard({
  label,
  description,
  icon: Icon,
  value,
  yesLabel = 'Ya',
  noLabel = 'Tidak',
  iconColor = '#0ea5e9',
  onChange,
}: {
  label: string;
  description: string;
  icon: React.ElementType;
  value: number;
  yesLabel?: string;
  noLabel?: string;
  iconColor?: string;
  onChange: (val: number) => void;
}) {
  return (
    <div className="p-5 rounded-2xl glass-card border border-white/[0.06]">
      <div className="flex items-start gap-3 mb-4">
        <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${iconColor}15` }}>
          <Icon className="h-4 w-4" style={{ color: iconColor }} />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{label}</p>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onChange(1)}
          className={`py-2.5 px-4 rounded-xl text-sm font-semibold transition-all border ${
            value === 1
              ? 'border-sky-500 bg-sky-500/15 text-sky-300'
              : 'border-white/[0.07] bg-slate-800/50 text-slate-400 hover:border-white/20 hover:text-slate-300'
          }`}
        >
          ✓ {yesLabel}
        </button>
        <button
          type="button"
          onClick={() => onChange(0)}
          className={`py-2.5 px-4 rounded-xl text-sm font-semibold transition-all border ${
            value === 0
              ? 'border-teal-500 bg-teal-500/15 text-teal-300'
              : 'border-white/[0.07] bg-slate-800/50 text-slate-400 hover:border-white/20 hover:text-slate-300'
          }`}
        >
          ✗ {noLabel}
        </button>
      </div>
    </div>
  );
}

export function Step2Lifestyle({ formData, onChange }: Props) {
  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-teal-400" />
          Gaya Hidup
        </h2>
        <p className="text-sm text-slate-400 mt-1">Kebiasaan sehari-hari yang sangat mempengaruhi profil risiko kesehatan Anda.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <YesNoCard
          label="Aktivitas Fisik"
          description="Apakah Anda melakukan olahraga atau aktivitas fisik dalam 30 hari terakhir (di luar pekerjaan)?"
          icon={Dumbbell}
          value={formData.physActivity}
          yesLabel="Ya, Aktif"
          noLabel="Tidak Aktif"
          iconColor="#14b8a6"
          onChange={(v) => onChange({ physActivity: v })}
        />

        <YesNoCard
          label="Kebiasaan Merokok"
          description="Apakah Anda pernah merokok setidaknya 100 batang sepanjang hidup Anda?"
          icon={Cigarette}
          value={formData.smoker}
          yesLabel="Perokok"
          noLabel="Tidak Merokok"
          iconColor="#f97316"
          onChange={(v) => onChange({ smoker: v })}
        />

        <YesNoCard
          label="Konsumsi Alkohol Berat"
          description="Untuk pria: >14 minuman/minggu. Untuk wanita: >7 minuman/minggu."
          icon={Wine}
          value={formData.hvyAlcoholConsump}
          yesLabel="Ya, Berat"
          noLabel="Tidak / Ringan"
          iconColor="#a855f7"
          onChange={(v) => onChange({ hvyAlcoholConsump: v })}
        />

        <YesNoCard
          label="Konsumsi Buah-buahan"
          description="Apakah Anda mengonsumsi buah-buahan minimal 1 kali setiap hari?"
          icon={Apple}
          value={formData.fruits}
          yesLabel="Ya, Rutin"
          noLabel="Jarang"
          iconColor="#10b981"
          onChange={(v) => onChange({ fruits: v })}
        />

        <YesNoCard
          label="Konsumsi Sayur-sayuran"
          description="Apakah Anda mengonsumsi sayur-sayuran minimal 1 kali setiap hari?"
          icon={Leaf}
          value={formData.veggies}
          yesLabel="Ya, Rutin"
          noLabel="Jarang"
          iconColor="#10b981"
          onChange={(v) => onChange({ veggies: v })}
        />
      </div>

      {/* Persepsi Kesehatan Umum */}
      <div className="p-5 rounded-2xl glass-card border border-white/[0.06]">
        <div className="flex items-start gap-3 mb-4">
          <div className="h-9 w-9 rounded-xl bg-sky-500/15 flex items-center justify-center shrink-0">
            <Heart className="h-4 w-4 text-sky-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Persepsi Kesehatan Umum</p>
            <p className="text-xs text-slate-400 mt-0.5">Secara keseluruhan, bagaimana Anda menilai kondisi kesehatan Anda saat ini?</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {[
            { value: 1, label: 'Sangat Baik', color: '#10b981' },
            { value: 2, label: 'Baik Sekali', color: '#14b8a6' },
            { value: 3, label: 'Baik', color: '#0ea5e9' },
            { value: 4, label: 'Cukup', color: '#f59e0b' },
            { value: 5, label: 'Buruk', color: '#ef4444' },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ genHlth: opt.value })}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-center transition-all border ${
                formData.genHlth === opt.value
                  ? 'text-white'
                  : 'border-white/[0.07] bg-slate-800/50 text-slate-400 hover:border-white/20'
              }`}
              style={
                formData.genHlth === opt.value
                  ? { background: `${opt.color}25`, border: `1px solid ${opt.color}60`, color: opt.color }
                  : {}
              }
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
