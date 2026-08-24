'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { RiskResultDashboard } from '@/components/RiskResultDashboard';
import { ScreeningResult } from '@/types/screening';
import { loadLatestResult } from '@/utils/calculator';
import { Activity, ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const data = loadLatestResult();
    if (data) {
      setResult(data);
    }
  }, []);

  const handleReset = () => {
    router.push('/assessment');
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0f1e' }}>
      <Navbar />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back navigation */}
          <div className="mb-6">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Skrining
            </Link>
          </div>

          {result ? (
            <RiskResultDashboard result={result} onReset={handleReset} />
          ) : (
            <div className="text-center py-20 space-y-6">
              <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto">
                <Activity className="h-8 w-8 text-slate-500" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-white">Belum Ada Hasil Skrining</h2>
                <p className="text-slate-400">Lengkapi formulir skrining terlebih dahulu untuk melihat hasil di sini.</p>
              </div>
              <div className="flex items-center gap-2 max-w-md mx-auto p-4 rounded-xl" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                <p className="text-xs text-slate-400">Hasil akan tersimpan sementara di browser Anda.</p>
              </div>
              <Link
                href="/assessment"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-white shadow-lg shadow-sky-500/20 hover:-translate-y-0.5 transition-all"
                style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)' }}
              >
                <Activity className="h-4 w-4" />
                Mulai Skrining Sekarang
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
