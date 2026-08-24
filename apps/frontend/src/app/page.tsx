import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  Activity, ShieldCheck, FileText, HeartPulse, Sparkles,
  ChevronRight, TrendingUp, Eye, Zap, Users, ArrowRight,
  CheckCircle, AlertTriangle, Brain, BarChart3,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0f1e' }}>
      <Navbar />

      <main className="flex-1">
        {/* ==================== HERO ==================== */}
        <section className="relative overflow-hidden pt-10 pb-24">
          {/* Background Orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-20 blur-3xl"
              style={{ background: 'radial-gradient(ellipse, rgba(14,165,233,0.5) 0%, rgba(20,184,166,0.3) 40%, transparent 70%)' }} />
            <div className="absolute top-1/3 -right-20 w-64 h-64 rounded-full opacity-10 blur-3xl bg-indigo-500" />
            <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl bg-teal-500" />

            {/* Floating Medical Icons */}
            <div className="absolute top-20 left-[10%] animate-float opacity-20">
              <div className="h-14 w-14 rounded-2xl glass-card border border-sky-500/20 flex items-center justify-center">
                <HeartPulse className="h-7 w-7 text-sky-400" />
              </div>
            </div>
            <div className="absolute top-32 right-[12%] animate-float-delayed opacity-20">
              <div className="h-12 w-12 rounded-2xl glass-card border border-teal-500/20 flex items-center justify-center">
                <Activity className="h-6 w-6 text-teal-400" />
              </div>
            </div>
            <div className="absolute bottom-24 left-[15%] animate-float opacity-15">
              <div className="h-10 w-10 rounded-xl glass-card border border-indigo-500/20 flex items-center justify-center">
                <Brain className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
            <div className="absolute bottom-16 right-[18%] animate-float-delayed opacity-15">
              <div className="h-11 w-11 rounded-2xl glass-card border border-emerald-500/20 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border border-sky-500/25 text-sky-300 text-xs font-semibold shadow-lg shadow-sky-500/10 animate-fade-in">
                <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                Berbasis Machine Learning • Dataset BRFSS 2015 • Mendukung SDG 3
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] animate-slide-up">
                <span className="text-white">Kenali Risiko</span>
                <br />
                <span className="hero-gradient-text">Kesehatanmu</span>
                <br />
                <span className="text-white">Lebih Awal</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto animate-slide-up animate-delay-100">
                Skrining preventif berbasis AI untuk membantu memahami faktor risiko{' '}
                <span className="text-sky-400 font-semibold">diabetes</span> dan{' '}
                <span className="text-teal-400 font-semibold">penyakit kardiovaskular</span>.
                Dapatkan wawasan kesehatan personal dalam hitungan menit.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 animate-slide-up animate-delay-200">
                <Link
                  href="/assessment"
                  className="group flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-1 transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)' }}
                >
                  <Activity className="h-5 w-5" />
                  Mulai Skrining
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about"
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-slate-300 glass-card border border-white/10 hover:border-sky-500/30 hover:text-white transition-all duration-300"
                >
                  Pelajari Cara Kerjanya
                </Link>
              </div>

              {/* Stats Row */}
              <div className="pt-4 grid grid-cols-3 gap-4 max-w-lg mx-auto animate-slide-up animate-delay-300">
                {[
                  { value: '537M', label: 'Penderita Diabetes Global' },
                  { value: '17.9M', label: 'Kematian CVD/Tahun' },
                  { value: '80%', label: 'Dapat Dicegah' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl sm:text-3xl font-black teal-gradient-text">{stat.value}</div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="mt-16 max-w-2xl mx-auto animate-scale-in animate-delay-400">
              <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] shadow-2xl shadow-black/50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Contoh Hasil Skrining</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Data demonstrasi — bukan hasil nyata</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold badge-moderate">
                    Risiko Sedang
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Diabetes Risk */}
                  <div className="p-4 rounded-2xl" style={{ background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.15)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="h-4 w-4 text-sky-400" />
                      <span className="text-xs font-semibold text-sky-400">Risiko Diabetes</span>
                    </div>
                    <div className="text-3xl font-black text-white">61%</div>
                    <div className="mt-2 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full w-[61%] rounded-full" style={{ background: 'linear-gradient(90deg, #0ea5e9, #14b8a6)' }} />
                    </div>
                  </div>

                  {/* CVD Risk */}
                  <div className="p-4 rounded-2xl" style={{ background: 'rgba(20,184,166,0.06)', border: '1px solid rgba(20,184,166,0.15)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <HeartPulse className="h-4 w-4 text-teal-400" />
                      <span className="text-xs font-semibold text-teal-400">Risiko Kardio</span>
                    </div>
                    <div className="text-3xl font-black text-white">51%</div>
                    <div className="mt-2 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full w-[51%] rounded-full" style={{ background: 'linear-gradient(90deg, #14b8a6, #6366f1)' }} />
                    </div>
                  </div>
                </div>

                {/* Risk Factors Preview */}
                <div className="mt-4 space-y-2">
                  {[
                    { name: 'Kadar Glukosa', value: 82, color: '#f97316' },
                    { name: 'Indeks Massa Tubuh', value: 68, color: '#f59e0b' },
                    { name: 'Tekanan Darah', value: 55, color: '#0ea5e9' },
                  ].map((factor) => (
                    <div key={factor.name} className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 w-40 shrink-0">{factor.name}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${factor.value}%`, background: factor.color }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-300 w-8 text-right">{factor.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== MENGAPA SKRINING? ==================== */}
        <section className="py-24" style={{ background: 'rgba(6, 12, 26, 0.8)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">Mengapa Skrining?</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Deteksi Lebih Awal,{' '}
                <span className="health-gradient-text">Hidup Lebih Sehat</span>
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
                Penyakit tidak menular seperti diabetes dan kardiovaskular seringkali tidak menunjukkan gejala di awal. Skrining preventif membantu Anda bertindak sebelum terlambat.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Eye,
                  color: 'sky',
                  title: 'Deteksi Faktor Risiko Lebih Awal',
                  desc: 'Identifikasi indikator risiko sebelum berkembang menjadi kondisi yang serius dan membutuhkan penanganan intensif.',
                },
                {
                  icon: Brain,
                  color: 'teal',
                  title: 'Analisis Berbasis Data & AI',
                  desc: 'Model Machine Learning (Random Forest & XGBoost) terlatih pada data BRFSS 2015 yang mencakup ratusan ribu responden.',
                },
                {
                  icon: BarChart3,
                  color: 'indigo',
                  title: 'Visualisasi Faktor Risiko',
                  desc: 'Grafik interaktif menampilkan kontribusi setiap faktor risiko dalam profil kesehatan Anda secara jelas.',
                },
                {
                  icon: ShieldCheck,
                  color: 'emerald',
                  title: 'Rekomendasi Preventif',
                  desc: 'Saran gaya hidup yang dipersonalisasi berdasarkan profil risiko Anda untuk mendukung pencegahan penyakit tidak menular.',
                },
              ].map((item) => {
                const Icon = item.icon;
                const colorMap: Record<string, { bg: string; border: string; icon: string; dot: string }> = {
                  sky: { bg: 'rgba(14,165,233,0.06)', border: 'rgba(14,165,233,0.15)', icon: '#0ea5e9', dot: 'bg-sky-400' },
                  teal: { bg: 'rgba(20,184,166,0.06)', border: 'rgba(20,184,166,0.15)', icon: '#14b8a6', dot: 'bg-teal-400' },
                  indigo: { bg: 'rgba(99,102,241,0.06)', border: 'rgba(99,102,241,0.15)', icon: '#6366f1', dot: 'bg-indigo-400' },
                  emerald: { bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.15)', icon: '#10b981', dot: 'bg-emerald-400' },
                };
                const c = colorMap[item.color];
                return (
                  <div
                    key={item.title}
                    className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{ background: c.bg, border: `1px solid ${c.border}` }}
                  >
                    <div
                      className="h-11 w-11 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                      style={{ background: `${c.icon}20` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: c.icon }} />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== CARA KERJA ==================== */}
        <section className="py-24" id="cara-kerja">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Cara Kerja</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Tiga Langkah{' '}
                <span className="health-gradient-text">Sederhana</span>
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
                Skrining kesehatan preventif Anda siap dalam hitungan menit, tanpa perlu alat medis khusus.
              </p>
            </div>

            <div className="relative">
              {/* Connector Line (desktop) */}
              <div className="hidden lg:block absolute top-12 left-[16.66%] right-[16.66%] h-px"
                style={{ background: 'linear-gradient(90deg, rgba(14,165,233,0.3), rgba(20,184,166,0.3))' }} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
                {[
                  {
                    step: '01',
                    icon: FileText,
                    color: '#0ea5e9',
                    bg: 'rgba(14,165,233,0.08)',
                    border: 'rgba(14,165,233,0.2)',
                    title: 'Isi Data Kesehatan',
                    desc: 'Lengkapi formulir 4 langkah: data dasar, gaya hidup, indikator klinis, dan review. Tersedia tombol "Demo Data" untuk percobaan cepat.',
                    items: ['Usia & BMI', 'Gaya hidup & kebiasaan', 'Tekanan darah & glukosa'],
                  },
                  {
                    step: '02',
                    icon: Brain,
                    color: '#14b8a6',
                    bg: 'rgba(20,184,166,0.08)',
                    border: 'rgba(20,184,166,0.2)',
                    title: 'AI Menganalisis Risiko',
                    desc: 'Model Machine Learning menganalisis 20+ indikator kesehatan berdasarkan pola dari dataset BRFSS 2015.',
                    items: ['Algoritma Random Forest', 'Bobot SHAP feature importance', 'Threshold risiko klinis'],
                  },
                  {
                    step: '03',
                    icon: TrendingUp,
                    color: '#6366f1',
                    bg: 'rgba(99,102,241,0.08)',
                    border: 'rgba(99,102,241,0.2)',
                    title: 'Lihat Hasil & Rekomendasi',
                    desc: 'Hasil ditampilkan dengan visualisasi interaktif, wawasan kesehatan dalam bahasa sederhana, dan rekomendasi preventif personal.',
                    items: ['Skor risiko diabetes & kardio', 'Grafik faktor risiko', 'Download laporan PDF'],
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.step}
                      className="relative p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                      style={{ background: item.bg, border: `1px solid ${item.border}` }}
                    >
                      {/* Step Number */}
                      <div className="absolute -top-4 left-7">
                        <div
                          className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-black text-white shadow-lg"
                          style={{ background: item.color }}
                        >
                          {item.step}
                        </div>
                      </div>

                      <div className="mt-3 mb-4">
                        <div
                          className="h-12 w-12 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                          style={{ background: `${item.color}20` }}
                        >
                          <Icon className="h-6 w-6" style={{ color: item.color }} />
                        </div>
                        <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>

                      <ul className="space-y-2">
                        {item.items.map((point) => (
                          <li key={point} className="flex items-center gap-2 text-xs text-slate-400">
                            <CheckCircle className="h-3.5 w-3.5 shrink-0" style={{ color: item.color }} />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/assessment"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white shadow-xl shadow-teal-500/20 hover:shadow-teal-500/35 hover:-translate-y-1 transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)' }}
              >
                Coba Sekarang — Gratis
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="mt-3 text-xs text-slate-500">Tidak perlu registrasi. Mulai dalam 2 menit.</p>
            </div>
          </div>
        </section>

        {/* ==================== SDG 3 BANNER ==================== */}
        <section className="py-20" style={{ background: 'rgba(6, 12, 26, 0.9)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="relative overflow-hidden rounded-3xl p-10"
              style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(6,182,212,0.08) 50%, rgba(15,23,42,0.5) 100%)',
                border: '1px solid rgba(16,185,129,0.2)',
              }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 bg-emerald-400 blur-3xl" />

              <div className="relative flex flex-col lg:flex-row items-center gap-8">
                <div className="flex items-center gap-6 shrink-0">
                  <div className="h-20 w-20 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black text-4xl shadow-xl shadow-emerald-900">
                    3
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">UN Sustainable Development Goals</p>
                    <h3 className="text-2xl font-black text-white mt-1">SDG 3 — Good Health & Well-Being</h3>
                    <p className="text-sm text-emerald-300 font-medium">Kehidupan Sehat dan Sejahtera</p>
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <p className="text-slate-300 leading-relaxed">
                    MediRisk AI berkontribusi pada pencapaian SDG 3 dengan menyediakan akses mudah ke alat skrining kesehatan preventif. Dengan teknologi AI, kami membantu masyarakat mendeteksi faktor risiko penyakit tidak menular lebih awal — mendukung target pengurangan kematian dini akibat PTM sebesar sepertiga pada 2030.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Target 3.4 — Kurangi PTM', 'Target 3.8 — Cakupan Kesehatan Universal', 'Target 3.a — Edukasi Kesehatan'].map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold badge-low">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== DISCLAIMER ==================== */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="p-6 rounded-2xl"
              style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)' }}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-400 mb-1">Perhatian Penting</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Alat ini hanya digunakan untuk <strong className="text-slate-300">skrining dan edukasi kesehatan</strong>. Hasil tidak dimaksudkan sebagai diagnosis medis atau pengganti konsultasi dengan tenaga kesehatan profesional. Selalu konsultasikan kondisi kesehatan Anda dengan dokter atau tenaga medis yang berkompeten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
