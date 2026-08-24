'use client';

import React from 'react';
import { ScreeningResult } from '@/types/screening';
import { RiskRadarChart } from './visualizations/RiskRadarChart';
import { FeatureImportanceBarChart } from './visualizations/FeatureImportanceBarChart';
import { RiskGauge } from './visualizations/RiskGauge';
import { ExportPDFButton } from './ExportPDFButton';
import {
  Activity, HeartPulse, RefreshCw, Sparkles, CheckCircle2,
  AlertTriangle, Info, ArrowRight, Shield, Lightbulb,
} from 'lucide-react';
import Link from 'next/link';

interface Props {
  result: ScreeningResult;
  onReset: () => void;
}

function getRiskConfig(level: ScreeningResult['overallRiskLevel']) {
  if (level === 'Tinggi') {
    return {
      color: '#ef4444',
      bg: 'rgba(239,68,68,0.08)',
      border: 'rgba(239,68,68,0.2)',
      badge: 'badge-high',
      icon: AlertTriangle,
      label: 'Estimasi Risiko Tinggi',
    };
  }
  if (level === 'Sedang') {
    return {
      color: '#f59e0b',
      bg: 'rgba(245,158,11,0.08)',
      border: 'rgba(245,158,11,0.2)',
      badge: 'badge-moderate',
      icon: Info,
      label: 'Estimasi Risiko Sedang',
    };
  }
  return {
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
    badge: 'badge-low',
    icon: CheckCircle2,
    label: 'Estimasi Risiko Rendah',
  };
}

export function RiskResultDashboard({ result, onReset }: Props) {
  const riskConfig = getRiskConfig(result.overallRiskLevel);
  const RiskIcon = riskConfig.icon;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center flex-wrap gap-3 mb-1">
            <h1 className="text-2xl font-black text-white">Hasil Skrining Kesehatan</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${riskConfig.badge}`}>
              <RiskIcon className="h-3.5 w-3.5" />
              {riskConfig.label}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {result.timestamp} • Analisis berbasis model Machine Learning BRFSS 2015
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 glass-card border border-white/10 hover:border-white/20 hover:text-white transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            Skrining Ulang
          </button>
          <ExportPDFButton elementId="pdf-report-content" />
        </div>
      </div>

      {/* Printable content */}
      <div id="pdf-report-content" className="space-y-8">
        {/* ---- Risk Score Cards ---- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Diabetes Gauge */}
          <div className="p-6 rounded-2xl flex flex-col items-center gap-4 text-center" style={{ background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.15)' }}>
            <RiskGauge
              percentage={result.diabetesRiskProb}
              color="#0ea5e9"
              label="Diabetes"
              sublabel="Estimasi risiko diabetes tipe 2"
            />
            <div className="w-full space-y-1">
              <p className="text-xs font-bold text-sky-400 uppercase tracking-wider">Risiko Diabetes Tipe-2</p>
              <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${result.diabetesRiskProb}%`, background: 'linear-gradient(90deg, #0ea5e9, #14b8a6)' }} />
              </div>
              <p className="text-[11px] text-slate-400">
                {result.diabetesRiskProb >= 55 ? 'Estimasi risiko tinggi — konsultasikan ke dokter' :
                 result.diabetesRiskProb >= 30 ? 'Estimasi risiko sedang — perlu perhatian' :
                 'Estimasi risiko rendah — pertahankan gaya hidup sehat'}
              </p>
            </div>
          </div>

          {/* CVD Gauge */}
          <div className="p-6 rounded-2xl flex flex-col items-center gap-4 text-center" style={{ background: 'rgba(20,184,166,0.06)', border: '1px solid rgba(20,184,166,0.15)' }}>
            <RiskGauge
              percentage={result.cvdRiskProb}
              color="#14b8a6"
              label="Kardio"
              sublabel="Estimasi risiko kardiovaskular"
            />
            <div className="w-full space-y-1">
              <p className="text-xs font-bold text-teal-400 uppercase tracking-wider">Risiko Kardiovaskular</p>
              <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${result.cvdRiskProb}%`, background: 'linear-gradient(90deg, #14b8a6, #6366f1)' }} />
              </div>
              <p className="text-[11px] text-slate-400">
                {result.cvdRiskProb >= 55 ? 'Estimasi risiko tinggi — perlu evaluasi kardio' :
                 result.cvdRiskProb >= 30 ? 'Estimasi risiko sedang — pantau faktor risiko' :
                 'Estimasi risiko rendah — teruskan kebiasaan baik'}
              </p>
            </div>
          </div>

          {/* Summary Card */}
          <div className="p-6 rounded-2xl space-y-4" style={{ background: `${riskConfig.color}08`, border: `1px solid ${riskConfig.border}` }}>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: riskConfig.color }}>Profil Risiko Keseluruhan</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-5xl font-black text-white">{result.riskScore}</span>
                <span className="text-lg text-slate-400">/100</span>
              </div>
              <div className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${riskConfig.badge}`}>
                <RiskIcon className="h-3.5 w-3.5" />
                {result.overallRiskLevel}
              </div>
            </div>
            <div className="border-t border-white/[0.06] pt-4 space-y-2">
              <p className="text-xs font-bold text-slate-400">BMI</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">{result.bmiInfo.bmi}</span>
                <span className="text-xs text-slate-400">kg/m²</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: result.bmiInfo.color, background: `${result.bmiInfo.color}20` }}>
                  {result.bmiInfo.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Health Insight ---- */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-500/15 flex items-center justify-center shrink-0">
              <Lightbulb className="h-4 w-4 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                Apa Artinya?
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                  Wawasan Kesehatan
                </span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{result.healthInsight}</p>
            </div>
          </div>
        </div>

        {/* ---- Charts ---- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl glass-card border border-white/[0.06]">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-teal-400" /> Profil Risiko (Radar)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Semakin tinggi skor, semakin ideal kondisi tersebut.</p>
            </div>
            <RiskRadarChart data={result.radarMetrics} />
          </div>

          <div className="p-6 rounded-2xl glass-card border border-white/[0.06]">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="h-4 w-4 text-rose-400" /> Faktor Pemicu Utama
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Kontribusi setiap faktor terhadap peningkatan risiko.</p>
            </div>
            <FeatureImportanceBarChart factors={result.topRiskFactors} />
          </div>
        </div>

        {/* ---- Risk Factor Details ---- */}
        <div className="p-6 rounded-2xl glass-card border border-white/[0.06]">
          <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
            <HeartPulse className="h-4 w-4 text-sky-400" />
            Analisis Detail Faktor Risiko
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.topRiskFactors.map((factor) => {
              const statusColor = factor.status === 'Critical' ? '#ef4444' : factor.status === 'Warning' ? '#f59e0b' : '#10b981';
              return (
                <div key={factor.id} className="p-4 rounded-xl border space-y-3" style={{ background: `${statusColor}05`, borderColor: `${statusColor}20` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${factor.status === 'Critical' ? 'animate-pulse' : ''}`} style={{ background: statusColor }} />
                      <span className="text-sm font-bold text-white">{factor.nameId}</span>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: statusColor, background: `${statusColor}20` }}>
                      {factor.impactScore}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{factor.description}</p>
                  <div className="p-2.5 rounded-lg text-xs flex items-start gap-2" style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.15)' }}>
                    <ArrowRight className="h-3.5 w-3.5 text-sky-400 mt-0.5 shrink-0" />
                    <span className="text-sky-300">{factor.recommendation}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---- Prevention Plan ---- */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-9 w-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-lg">3</div>
            <div>
              <h3 className="text-sm font-bold text-white">Rencana Preventif (SDG 3)</h3>
              <p className="text-xs text-slate-400">Rekomendasi personal berdasarkan profil risiko Anda.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.preventionPlan.map((plan) => (
              <div key={plan.id} className="p-4 rounded-xl glass-card border border-emerald-500/15 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{plan.icon}</span>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{plan.sdgTarget}</span>
                    <h4 className="text-sm font-bold text-white">{plan.title}</h4>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{plan.action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Disclaimer ---- */}
        <div className="p-5 rounded-2xl" style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)' }}>
          <div className="flex items-start gap-3">
            <Shield className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              <span className="font-semibold text-amber-400">Perhatian: </span>
              Hasil ini merupakan estimasi skrining berbasis data dan <strong className="text-slate-300">bukan diagnosis medis</strong>. Untuk interpretasi kondisi kesehatan dan tindakan lebih lanjut, konsultasikan dengan tenaga kesehatan yang berkompeten. Dataset: BRFSS 2015 (CDC) — tidak menggantikan pemeriksaan klinis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
