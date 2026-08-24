import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MultiStepForm } from '@/components/MultiStepForm';
import { Activity, Shield, AlertTriangle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skrining Kesehatan — MediRisk AI',
  description: 'Isi formulir skrining kesehatan 4 langkah untuk mendapatkan estimasi risiko diabetes dan kardiovaskular berbasis AI.',
};

export default function AssessmentPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0f1e' }}>
      <Navbar />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-sky-500/20 text-sky-300 text-xs font-semibold">
              <Activity className="h-3.5 w-3.5" />
              Assessment Skrining Kesehatan Preventif
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Isi <span className="health-gradient-text">Data Kesehatan</span> Anda
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              Lengkapi formulir berikut secara jujur untuk hasil skrining yang lebih akurat. Semua data diproses secara lokal dan tidak disimpan di server.
            </p>
          </div>

          {/* Disclaimer Banner */}
          <div className="max-w-3xl mx-auto mb-8 p-4 rounded-xl flex items-start gap-3" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400">
              <span className="font-semibold text-amber-400">Peringatan: </span>
              Hasil skrining ini merupakan estimasi berbasis AI, bukan diagnosis medis. Konsultasikan dengan tenaga kesehatan untuk evaluasi lebih lanjut.
            </p>
          </div>

          {/* Multi-step Form */}
          <MultiStepForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
