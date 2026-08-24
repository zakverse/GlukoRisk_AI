'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HistoryChart } from '@/components/visualizations/HistoryChart';
import { HistoryEntry } from '@/types/screening';
import { loadHistory } from '@/utils/calculator';
import { History, Activity, HeartPulse, AlertTriangle, TrendingDown, TrendingUp, Minus, Trash2 } from 'lucide-react';
import Link from 'next/link';

function RiskBadge({ level }: { level: 'Rendah' | 'Sedang' | 'Tinggi' }) {
  if (level === 'Tinggi') return <span className="px-2.5 py-1 rounded-full text-xs font-bold badge-high">Tinggi</span>;
  if (level === 'Sedang') return <span className="px-2.5 py-1 rounded-full text-xs font-bold badge-moderate">Sedang</span>;
  return <span className="px-2.5 py-1 rounded-full text-xs font-bold badge-low">Rendah</span>;
}

function RiskBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-xs font-bold text-white w-8 text-right">{value}%</span>
    </div>
  );
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHistory(loadHistory());
  }, []);

  const handleClearHistory = () => {
    if (confirm('Hapus semua riwayat skrining?')) {
      localStorage.removeItem('medirisk_history');
      setHistory([]);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0f1e' }}>
      <Navbar />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-sky-500/20 text-sky-300 text-xs font-semibold mb-3">
                <History className="h-3.5 w-3.5" />
                Riwayat Skrining
              </div>
              <h1 className="text-3xl font-black text-white">Riwayat Skrining Kesehatan</h1>
              <p className="text-slate-400 text-sm mt-1">
                {history.length > 0
                  ? `${history.length} skrining tersimpan — data lokal browser Anda`
                  : 'Belum ada riwayat skrining'}
              </p>
            </div>
            {history.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleClearHistory}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                  Hapus Semua
                </button>
                <Link
                  href="/assessment"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white shadow-lg shadow-sky-500/20"
                  style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)' }}
                >
                  <Activity className="h-4 w-4" />
                  Skrining Baru
                </Link>
              </div>
            )}
          </div>

          {history.length === 0 ? (
            /* Empty State */
            <div className="text-center py-24 space-y-6">
              <div className="h-20 w-20 rounded-full bg-slate-800 flex items-center justify-center mx-auto">
                <History className="h-10 w-10 text-slate-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-white">Belum Ada Riwayat</h2>
                <p className="text-slate-400 max-w-sm mx-auto text-sm">
                  Lakukan skrining pertama Anda untuk mulai memantau perkembangan profil risiko kesehatan dari waktu ke waktu.
                </p>
              </div>
              <Link
                href="/assessment"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-white shadow-lg shadow-sky-500/20 hover:-translate-y-0.5 transition-all"
                style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)' }}
              >
                <Activity className="h-4 w-4" />
                Mulai Skrining Pertama
              </Link>
            </div>
          ) : (
            <>
              {/* Summary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    label: 'Total Skrining',
                    value: history.length,
                    unit: 'kali',
                    color: '#0ea5e9',
                    icon: Activity,
                  },
                  {
                    label: 'Risiko Diabetes Terbaru',
                    value: history[0]?.diabetesRisk || 0,
                    unit: '%',
                    color: '#0ea5e9',
                    icon: Activity,
                  },
                  {
                    label: 'Risiko Kardio Terbaru',
                    value: history[0]?.cvdRisk || 0,
                    unit: '%',
                    color: '#14b8a6',
                    icon: HeartPulse,
                  },
                  {
                    label: 'BMI Terbaru',
                    value: history[0]?.bmi || 0,
                    unit: 'kg/m²',
                    color: '#6366f1',
                    icon: Activity,
                  },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="p-5 rounded-2xl glass-card border border-white/[0.06]">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="h-4 w-4" style={{ color: stat.color }} />
                        <p className="text-xs text-slate-400">{stat.label}</p>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-white">{stat.value}</span>
                        <span className="text-sm text-slate-400">{stat.unit}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chart */}
              <div className="p-6 rounded-2xl glass-panel border border-white/[0.07]">
                <h3 className="text-sm font-bold text-white mb-1">Perkembangan Risiko dari Waktu ke Waktu</h3>
                <p className="text-xs text-slate-400 mb-5">Grafik estimasi risiko dari setiap skrining yang dilakukan</p>
                <HistoryChart data={history} />
              </div>

              {/* History Table */}
              <div className="rounded-2xl glass-panel border border-white/[0.07] overflow-hidden">
                <div className="px-6 py-4 border-b border-white/[0.06]">
                  <h3 className="text-sm font-bold text-white">Tabel Riwayat Skrining</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/[0.05]">
                        {['Tanggal', 'Risiko Diabetes', 'Risiko Kardiovaskular', 'BMI', 'Status Keseluruhan'].map((h) => (
                          <th key={h} className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider px-5 py-3">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((entry, idx) => (
                        <tr
                          key={entry.id}
                          className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${idx === 0 ? 'bg-sky-500/[0.02]' : ''}`}
                        >
                          <td className="px-5 py-4">
                            <div className="text-sm text-slate-300">{entry.date.split(',')[0]}</div>
                            {idx === 0 && <div className="text-[10px] text-sky-400 font-semibold mt-0.5">Terbaru</div>}
                          </td>
                          <td className="px-5 py-4">
                            <div className="space-y-1 min-w-[100px]">
                              <RiskBar value={entry.diabetesRisk} color="#0ea5e9" />
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="space-y-1 min-w-[100px]">
                              <RiskBar value={entry.cvdRisk} color="#14b8a6" />
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-sm font-bold text-white">{entry.bmi}</span>
                            <span className="text-xs text-slate-400 ml-1">kg/m²</span>
                          </td>
                          <td className="px-5 py-4">
                            <RiskBadge level={entry.overallRisk} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Privacy note */}
              <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(245,158,11,0.04)', border: '1px solid rgba(245,158,11,0.15)' }}>
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400">
                  Data riwayat disimpan secara lokal di browser Anda menggunakan localStorage. Data tidak dikirimkan ke server manapun dan akan hilang jika browser cache dihapus.
                </p>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
