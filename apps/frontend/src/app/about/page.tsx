import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Brain, Database, Code2, HeartPulse, Target, Users, Shield, ExternalLink, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang MediRisk AI — Skrining Kesehatan Berbasis AI',
  description: 'Tentang MediRisk AI: platform skrining preventif diabetes dan kardiovaskular berbasis Machine Learning yang mendukung SDG 3.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0f1e' }}>
      <Navbar />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Hero */}
          <section className="text-center max-w-3xl mx-auto space-y-5 pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-sky-500/20 text-sky-300 text-xs font-semibold">
              <HeartPulse className="h-3.5 w-3.5" />
              Tentang MediRisk AI
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white">
              Teknologi AI untuk <span className="health-gradient-text">Hidup Lebih Sehat</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              MediRisk AI adalah platform skrining kesehatan preventif berbasis Machine Learning yang dirancang untuk membantu masyarakat mendeteksi faktor risiko diabetes tipe 2 dan penyakit kardiovaskular secara dini — mendukung SDG 3 (Good Health and Well-Being).
            </p>
          </section>

          {/* SDG 3 Impact */}
          <section>
            <div
              className="relative overflow-hidden rounded-3xl p-10"
              style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(6,182,212,0.08) 50%, rgba(15,23,42,0.5) 100%)',
                border: '1px solid rgba(16,185,129,0.2)',
              }}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-emerald-500 opacity-5 blur-3xl" />
              <div className="relative flex flex-col lg:flex-row items-center gap-8">
                <div className="flex items-center gap-6 shrink-0">
                  <div className="h-24 w-24 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black text-5xl shadow-xl">3</div>
                  <div>
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Sustainable Development Goals</p>
                    <h2 className="text-2xl font-black text-white mt-1">SDG 3 — Good Health<br />& Well-Being</h2>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <p className="text-slate-300 leading-relaxed">
                    Setiap tahun, jutaan orang meninggal akibat penyakit tidak menular (PTM) yang sebenarnya dapat dicegah. MediRisk AI hadir sebagai solusi digital untuk membantu masyarakat melakukan skrining mandiri, meningkatkan kesadaran akan faktor risiko, dan mendorong tindakan preventif lebih awal.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { target: 'SDG 3.4', desc: 'Kurangi kematian dini akibat PTM 1/3 pada 2030' },
                      { target: 'SDG 3.8', desc: 'Cakupan kesehatan universal yang merata' },
                      { target: 'SDG 3.a', desc: 'Edukasi kesehatan berbasis bukti' },
                    ].map((t) => (
                      <div key={t.target} className="p-3 rounded-xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}>
                        <p className="text-xs font-bold text-emerald-400">{t.target}</p>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{t.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Machine Learning */}
          <section className="space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">Machine Learning</span>
              <h2 className="text-3xl font-black text-white">Teknologi di Balik <span className="health-gradient-text">MediRisk AI</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl space-y-4" style={{ background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.15)' }}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-sky-500/15 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-sky-400" />
                  </div>
                  <h3 className="text-base font-bold text-white">Model Machine Learning</h3>
                </div>
                <ul className="space-y-2.5">
                  {[
                    'Random Forest — ensemble decision trees untuk klasifikasi risiko',
                    'XGBoost — gradient boosting dengan performa tinggi',
                    'Feature importance berbasis SHAP values',
                    'Threshold optimisasi berdasarkan sensitivitas klinis',
                    'Cross-validation dengan k-fold untuk validasi model',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl space-y-4" style={{ background: 'rgba(20,184,166,0.06)', border: '1px solid rgba(20,184,166,0.15)' }}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-teal-500/15 flex items-center justify-center">
                    <Database className="h-5 w-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Dataset BRFSS 2015</h3>
                    <p className="text-xs text-slate-400">Behavioral Risk Factor Surveillance System</p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {[
                    '253,680 responden survei nasional AS',
                    '22 variabel kesehatan dan gaya hidup',
                    'Dikurasi oleh CDC (Centers for Disease Control)',
                    'Tersedia publik di Kaggle (Alex Teboul)',
                    'Representasi lintas usia, jenis kelamin, dan kondisi sosial',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://www.kaggle.com/datasets/alexteboul/diabetes-health-indicators-dataset"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-sky-400 hover:text-sky-300 transition-colors font-semibold"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Lihat Dataset di Kaggle
                </a>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section className="space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Tech Stack</span>
              <h2 className="text-3xl font-black text-white">Dibangun dengan Teknologi <span className="health-gradient-text">Modern</span></h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  category: 'Frontend',
                  color: '#0ea5e9',
                  icon: Code2,
                  items: ['Next.js 16 (App Router)', 'React 19 + TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Recharts', 'Lucide Icons'],
                },
                {
                  category: 'Backend & ML',
                  color: '#14b8a6',
                  icon: Brain,
                  items: ['Python 3.11', 'FastAPI', 'scikit-learn', 'XGBoost', 'pandas + NumPy', 'SHAP (explainability)'],
                },
                {
                  category: 'Fitur Utama',
                  color: '#6366f1',
                  icon: Target,
                  items: ['Multi-step assessment form', 'Circular risk gauges', 'Radar + bar charts', 'PDF report export', 'localStorage history', 'Demo profiles'],
                },
              ].map((group) => {
                const Icon = group.icon;
                return (
                  <div key={group.category} className="p-6 rounded-2xl glass-card border border-white/[0.07]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: `${group.color}15` }}>
                        <Icon className="h-4 w-4" style={{ color: group.color }} />
                      </div>
                      <h3 className="text-sm font-bold text-white">{group.category}</h3>
                    </div>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-400">
                          <div className="h-1.5 w-1.5 rounded-full" style={{ background: group.color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Disclaimer */}
          <section className="max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl" style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-amber-400">Pernyataan Medis (Medical Disclaimer)</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    MediRisk AI adalah alat skrining dan edukasi kesehatan. Hasil yang ditampilkan merupakan <strong className="text-slate-300">estimasi probabilitas risiko berbasis data</strong>, bukan diagnosis medis yang definitif. Kami tidak mengklaim bahwa hasil skrining menggantikan evaluasi klinis oleh tenaga medis profesional. Selalu konsultasikan kondisi kesehatan Anda dengan dokter atau spesialis yang berkompeten sebelum mengambil keputusan medis apapun.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
