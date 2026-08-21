import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MultiStepForm } from '@/components/MultiStepForm';
import { Activity, ShieldCheck, FileText, HeartPulse, Sparkles, PieChart, Layers } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-teal-500/30 text-teal-300 text-xs font-semibold shadow-lg shadow-teal-500/10">
            <Sparkles className="h-4 w-4 text-teal-400" />
            <span>Kalkulator Kesehatan Preventif Berbasis AI & Dataset BRFSS 2015</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Skrining Risiko <span className="health-gradient-text">Diabetes</span> & <span className="text-sky-400">Kardiovaskular</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Gunakan kekuatan Machine Learning (Random Forest & XGBoost) untuk mendeteksi probabilitas awal penyakit tidak menular (PTM), melihat visualisasi faktor pemicu utama, dan mengunduh laporan medis preventif.
          </p>

          {/* Quick Feature Badges */}
          <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 font-medium">
              <Layers className="h-4 w-4 text-teal-400" /> Multi-Step Assessment Form
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 font-medium">
              <PieChart className="h-4 w-4 text-sky-400" /> Visualisasi Radar & SHAP Chart
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 font-medium">
              <FileText className="h-4 w-4 text-indigo-400" /> Ekspor Laporan PDF Medis
            </div>
          </div>
        </section>

        {/* Form Container */}
        <section className="scroll-mt-10" id="assessment">
          <MultiStepForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
