'use client';

import React from 'react';
import { ClinicalDataInput } from '@/types/screening';
import { Activity, Heart, Droplets, Users, AlertCircle, Info } from 'lucide-react';

interface Props {
  formData: ClinicalDataInput;
  onChange: (data: Partial<ClinicalDataInput>) => void;
}

function ToggleGroup({
  label,
  description,
  icon: Icon,
  iconColor,
  value,
  onChange,
  isOptional,
}: {
  label: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  value: number;
  onChange: (val: number) => void;
  isOptional?: boolean;
}) {
  return (
    <div className="p-5 rounded-2xl glass-card border border-white/[0.06]">
      <div className="flex items-start gap-3 mb-3">
        <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${iconColor}15` }}>
          <Icon className="h-4 w-4" style={{ color: iconColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-white">{label}</p>
            {isOptional && (
              <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                Opsional
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[{ v: 1, t: 'Ya' }, { v: 0, t: 'Tidak' }].map((opt) => (
          <button
            key={opt.v}
            type="button"
            onClick={() => onChange(opt.v)}
            className={`py-2 rounded-xl text-sm font-semibold transition-all border ${
              value === opt.v
                ? opt.v === 1
                  ? 'border-rose-500/60 bg-rose-500/15 text-rose-300'
                  : 'border-emerald-500/60 bg-emerald-500/15 text-emerald-300'
                : 'border-white/[0.07] bg-slate-800/50 text-slate-400 hover:border-white/20'
            }`}
          >
            {opt.v === 1 ? '✓' : '✗'} {opt.t}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Step3HealthIndicators({ formData, onChange }: Props) {
  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity className="h-5 w-5 text-rose-400" />
          Indikator Kesehatan
        </h2>
        <p className="text-sm text-slate-400 mt-1">Data klinis ini digunakan untuk meningkatkan akurasi prediksi model AI.</p>
      </div>

      {/* Numeric indicators (optional) */}
      <div className="p-5 rounded-2xl" style={{ background: 'rgba(14,165,233,0.04)', border: '1px solid rgba(14,165,233,0.12)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Info className="h-4 w-4 text-sky-400" />
          <p className="text-xs font-semibold text-sky-400">Data Pengukuran Klinis (Opsional)</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-rose-400" /> Tekanan Darah Sistolik (mmHg)
            </label>
            <input
              type="number" min={70} max={250}
              value={formData.systolicBP || ''}
              onChange={(e) => onChange({ systolicBP: e.target.value ? +e.target.value : undefined })}
              className="glass-input form-input rounded-xl"
              placeholder="Contoh: 120"
            />
            <p className="text-[11px] text-slate-500 mt-1">Normal: &lt; 120 mmHg</p>
          </div>

          <div>
            <label className="form-label flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-rose-400" /> Tekanan Darah Diastolik (mmHg)
            </label>
            <input
              type="number" min={40} max={150}
              value={formData.diastolicBP || ''}
              onChange={(e) => onChange({ diastolicBP: e.target.value ? +e.target.value : undefined })}
              className="glass-input form-input rounded-xl"
              placeholder="Contoh: 80"
            />
            <p className="text-[11px] text-slate-500 mt-1">Normal: &lt; 80 mmHg</p>
          </div>

          <div className="sm:col-span-2">
            <label className="form-label flex items-center gap-1.5">
              <Droplets className="h-3.5 w-3.5 text-amber-400" /> Kadar Glukosa Darah Puasa (mg/dL)
            </label>
            <input
              type="number" min={50} max={500}
              value={formData.glucoseLevel || ''}
              onChange={(e) => onChange({ glucoseLevel: e.target.value ? +e.target.value : undefined })}
              className="glass-input form-input rounded-xl"
              placeholder="Contoh: 95"
            />
            <p className="text-[11px] text-slate-500 mt-1">Normal: &lt; 100 mg/dL • Pre-diabetes: 100–125 mg/dL • Diabetes: ≥ 126 mg/dL</p>
          </div>
        </div>
      </div>

      {/* Riwayat kondisi */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Riwayat Kondisi Kesehatan</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ToggleGroup
            label="Tekanan Darah Tinggi"
            description="Apakah Anda pernah didiagnosis atau memiliki riwayat hipertensi?"
            icon={Heart}
            iconColor="#f97316"
            value={formData.highBP}
            onChange={(v) => onChange({ highBP: v })}
          />
          <ToggleGroup
            label="Kolesterol Tinggi"
            description="Apakah Anda pernah didiagnosis memiliki kadar kolesterol tinggi?"
            icon={Activity}
            iconColor="#f59e0b"
            value={formData.highChol}
            onChange={(v) => onChange({ highChol: v })}
          />
          <ToggleGroup
            label="Cek Kolesterol (5 Thn Terakhir)"
            description="Apakah Anda melakukan pemeriksaan kolesterol dalam 5 tahun terakhir?"
            icon={Activity}
            iconColor="#0ea5e9"
            value={formData.cholCheck}
            onChange={(v) => onChange({ cholCheck: v })}
          />
          <ToggleGroup
            label="Riwayat Diabetes Keluarga"
            description="Apakah ada anggota keluarga dekat (orang tua/saudara) yang memiliki diabetes?"
            icon={Users}
            iconColor="#a855f7"
            value={formData.familyDiabetes || 0}
            onChange={(v) => onChange({ familyDiabetes: v })}
            isOptional
          />
          <ToggleGroup
            label="Riwayat Stroke"
            description="Apakah Anda pernah mengalami stroke?"
            icon={AlertCircle}
            iconColor="#ef4444"
            value={formData.stroke}
            onChange={(v) => onChange({ stroke: v })}
          />
          <ToggleGroup
            label="Penyakit Jantung / Serangan Jantung"
            description="Apakah Anda pernah didiagnosis penyakit jantung koroner atau mengalami serangan jantung?"
            icon={Heart}
            iconColor="#ef4444"
            value={formData.heartDiseaseorAttack}
            onChange={(v) => onChange({ heartDiseaseorAttack: v })}
          />
          <ToggleGroup
            label="Kesulitan Berjalan / Naik Tangga"
            description="Apakah Anda memiliki kesulitan serius saat berjalan atau naik tangga?"
            icon={Activity}
            iconColor="#6366f1"
            value={formData.diffWalk}
            onChange={(v) => onChange({ diffWalk: v })}
          />
          <ToggleGroup
            label="Memiliki Asuransi Kesehatan"
            description="Apakah Anda memiliki BPJS, asuransi swasta, atau jaminan kesehatan lainnya?"
            icon={Activity}
            iconColor="#10b981"
            value={formData.anyHealthcare}
            onChange={(v) => onChange({ anyHealthcare: v })}
          />
        </div>
      </div>
    </div>
  );
}
