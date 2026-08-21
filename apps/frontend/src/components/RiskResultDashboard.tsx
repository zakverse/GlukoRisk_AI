'use client';

import React from 'react';
import { ScreeningResult } from '@/types/screening';
import { RiskRadarChart } from './visualizations/RiskRadarChart';
import { FeatureImportanceBarChart } from './visualizations/FeatureImportanceBarChart';
import { ExportPDFButton } from './ExportPDFButton';
import { ShieldAlert, Activity, HeartPulse, RefreshCw, Sparkles, CheckCircle2, AlertTriangle, Info, ArrowUpRight } from 'lucide-react';

interface Props {
  result: ScreeningResult;
  onReset: () => void;
}

export function RiskResultDashboard({ result, onReset }: Props) {
  const getRiskBadge = (level: ScreeningResult['overallRiskLevel']) => {
    if (level === 'Tinggi') {
      return (
        <span className="px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase bg-rose-500/20 border border-rose-500/40 text-rose-300 flex items-center gap-1.5">
          <AlertTriangle className="h-4 w-4 text-rose-400" /> Kategori Risiko Tinggi
        </span>
      );
    }
    if (level === 'Sedang') {
      return (
        <span className="px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center gap-1.5">
          <Info className="h-4 w-4 text-amber-400" /> Kategori Risiko Sedang
        </span>
      );
    }
    return (
      <span className="px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5">
        <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Kategori Risiko Rendah
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-white">Hasil Analisis Riset ML & Health Assessment</h2>
            {getRiskBadge(result.overallRiskLevel)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Waktu Pemeriksaan: <span className="text-slate-300 font-semibold">{result.timestamp}</span> • Berdasarkan Model XGBoost BRFSS 2015
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onReset}
            className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-2 border border-slate-700 transition-all"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Skrining Ulang
          </button>
          <ExportPDFButton elementId="screening-pdf-report" />
        </div>
      </div>

      {/* Target printable PDF container wrapper */}
      <div id="screening-pdf-report" className="space-y-8 p-6 rounded-3xl bg-slate-950/80 border border-slate-800/80 shadow-2xl">
        {/* PDF Header Logo inside report */}
        <div className="hidden print:flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-xl font-bold text-teal-400">MediCheck AI - Laporan Skrining Kesehatan Preventif</h1>
            <p className="text-xs text-slate-400">Poin SDG 3: Kehidupan Sehat & Sejahtera (UN Sustainable Development Goals)</p>
          </div>
          <p className="text-xs text-slate-400">{result.timestamp}</p>
        </div>

        {/* Probabilities Gauges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Probabilitas Diabetes */}
          <div className="p-6 rounded-2xl glass-card border border-teal-500/30 bg-gradient-to-b from-teal-950/30 via-slate-900 to-slate-950 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Risiko Diabetes Tipe-2</span>
              <Activity className="h-5 w-5 text-teal-400" />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-4xl font-black text-white tracking-tight">{result.diabetesRiskProb}%</span>
              <span className="text-xs text-slate-400">Probabilitas ML</span>
            </div>
            {/* Meter Bar */}
            <div className="w-full h-2 bg-slate-800 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-sky-400 rounded-full transition-all duration-1000"
                style={{ width: `${result.diabetesRiskProb}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
              Berdasarkan perpaduan indikator tekanan darah, BMI ({result.bmiInfo.bmi}), dan tingkat glukosa/gaya hidup.
            </p>
          </div>

          {/* Card 2: Probabilitas Penyakit Kardiovaskular (CVD) */}
          <div className="p-6 rounded-2xl glass-card border border-sky-500/30 bg-gradient-to-b from-sky-950/30 via-slate-900 to-slate-950 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Risiko Kardiovaskular (Jantung)</span>
              <HeartPulse className="h-5 w-5 text-sky-400" />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-4xl font-black text-white tracking-tight">{result.cvdRiskProb}%</span>
              <span className="text-xs text-slate-400">Probabilitas ML</span>
            </div>
            {/* Meter Bar */}
            <div className="w-full h-2 bg-slate-800 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-1000"
                style={{ width: `${result.cvdRiskProb}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
              Estimasi keterpaparan plak arteri, ketegangan sistem pembuluh darah, dan faktor riwayat klinis.
            </p>
          </div>

          {/* Card 3: Summary Kategori & BMI */}
          <div className="p-6 rounded-2xl glass-card border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Indeks Massa Tubuh (BMI)</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{result.bmiInfo.bmi}</span>
                <span className="text-xs text-slate-400">kg/m²</span>
                <span className="text-xs font-bold text-teal-400 ml-auto bg-teal-950 border border-teal-500/30 px-2 py-0.5 rounded-lg">
                  {result.bmiInfo.category}
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800/80 mt-4">
              <span className="text-xs font-bold text-slate-400">Persepsi Fisik BRFSS</span>
              <p className="text-xs text-slate-300 font-semibold mt-1">
                Kondisi Fisik Terganggu: <span className="text-teal-300 font-bold">{result.inputSummary.physHlth} Hari/Bln</span>
              </p>
            </div>
          </div>
        </div>

        {/* Charts Section: Radar Chart & Feature Importance Bar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Radar Chart: Profil Kebugaran Health Attributes */}
          <div className="p-6 rounded-2xl glass-card border border-slate-800 bg-slate-900/60">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-teal-400" /> Profil Kebugaran & Risiko (Radar Chart)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Makin mendekati area luar (100), semakin ideal kondisi kesehatan.</p>
              </div>
            </div>
            <RiskRadarChart data={result.radarMetrics} />
          </div>

          {/* Bar Chart: SHAP Feature Importances */}
          <div className="p-6 rounded-2xl glass-card border border-slate-800 bg-slate-900/60">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-rose-400" /> Faktor Pemicu Utama (SHAP Feature Importance)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Persentase kontribusi variabel dalam menaikkan probabilitas risiko.</p>
              </div>
            </div>
            <FeatureImportanceBarChart factors={result.topRiskFactors} />
          </div>
        </div>

        {/* Detailed Risk Trigger Factors List */}
        <div className="p-6 rounded-2xl glass-card border border-slate-800">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-sky-400" /> Analisis Detail Faktor Risiko & Rekomendasi Klinis
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.topRiskFactors.map((factor) => (
              <div key={factor.id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-white flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${
                      factor.status === 'Critical' ? 'bg-rose-500 animate-pulse' :
                      factor.status === 'Warning' ? 'bg-amber-400' : 'bg-emerald-400'
                    }`} />
                    {factor.nameId}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    Dampak: {factor.impactScore}%
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{factor.description}</p>
                <div className="p-2.5 rounded-lg bg-teal-950/40 border border-teal-500/20 text-xs text-teal-300 font-medium flex items-start gap-2">
                  <ArrowUpRight className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                  <span><strong>Saran Tindakan:</strong> {factor.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SDG 3 Prevention Plan Section */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-900 border border-emerald-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-sm">
              3
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Rencana Aksi Preventif (Target SDG 3 UN)</h3>
              <p className="text-xs text-slate-400">Rekomendasi gaya hidup untuk menjaga kesehatan kardiovaskular jangka panjang.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {result.preventionPlan.map((plan) => (
              <div key={plan.id} className="p-4 rounded-xl glass-card border border-emerald-500/20 space-y-2">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                  {plan.sdgTarget}
                </span>
                <h4 className="text-xs font-bold text-white mt-1">{plan.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{plan.action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
