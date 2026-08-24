import React from 'react';
import Link from 'next/link';
import { HeartPulse, Shield } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-white/[0.06]" style={{ background: 'rgba(6, 12, 26, 0.95)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-lg">
                <HeartPulse className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-black text-white">
                MediRisk <span className="health-gradient-text">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Platform skrining kesehatan preventif berbasis AI untuk membantu memahami faktor risiko diabetes dan penyakit kardiovaskular secara dini.
            </p>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-950/50 border border-emerald-500/20 w-fit">
              <div className="h-6 w-6 rounded bg-emerald-600 flex items-center justify-center text-white font-black text-[11px]">3</div>
              <span className="text-xs font-semibold text-emerald-400">SDG 3 — Kehidupan Sehat & Sejahtera</span>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Navigasi</p>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Beranda' },
                { href: '/assessment', label: 'Mulai Skrining' },
                { href: '/history', label: 'Riwayat Skrining' },
                { href: '/about', label: 'Tentang Kami' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-sky-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div className="space-y-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Teknologi</p>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Next.js + TypeScript</li>
              <li>Python FastAPI</li>
              <li>Random Forest / XGBoost</li>
              <li>Dataset BRFSS 2015</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 pt-8 border-t border-white/[0.06]">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-950/20 border border-amber-500/15 mb-6">
            <Shield className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-xs text-slate-400 leading-relaxed">
              <span className="font-semibold text-amber-400">Perhatian Medis: </span>
              MediRisk AI hanya digunakan untuk tujuan skrining dan edukasi kesehatan. Hasil estimasi risiko tidak dimaksudkan sebagai diagnosis medis atau pengganti konsultasi dengan tenaga kesehatan. Selalu konsultasikan kondisi kesehatan Anda dengan dokter atau tenaga medis profesional.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {currentYear} MediRisk AI. Dibuat untuk mendukung SDG 3 — Kesehatan yang Baik dan Kesejahteraan.</p>
            <div className="flex items-center gap-4">
              <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 font-medium">
                v1.0.0 — Demo Mode
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
