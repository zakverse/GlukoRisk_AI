import React from 'react';
import { Heart, Globe2, ShieldAlert } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 mt-20 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-base mb-3 flex items-center gap-2">
              <Globe2 className="h-5 w-5 text-teal-400" /> Komitmen SDG 3 UN
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              MediCheck AI mendukung Tujuan Pembangunan Berkelanjutan (SDG 3 Target 3.4) untuk mengurangi 1/3 kematian dini akibat Penyakit Tidak Menular (PTM) seperti Diabetes Melitus dan Penyakit Jantung melalui deteksi dini berbasis Machine Learning.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-base mb-3">Model Machine Learning</h3>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>• Train dataset: CDC BRFSS 2015 Health Indicators (253,680 responden)</li>
              <li>• Algoritma: XGBoost Classifier & Random Forest Ensemble</li>
              <li>• Metrik Evaluasi: ROC-AUC 0.82+, Recall Penyakit Tanda Awal 84%</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-base mb-3 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-400" /> Penafian Medis (Disclaimer)
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Hasil kalkulator ini bertujuan untuk asesmen risiko preventif dan edukasi publik, bukan merupakan diagnosis medis final. Selalu konsultasikan kondisi kesehatan Anda kepada dokter spesialis atau tenaga medis profesional.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MediCheck AI - Platform Skrining Risiko Kesehatan Preventif.</p>
          <p className="flex items-center gap-1">
            Dikembangkan dengan <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> untuk Kesehatan Masyarakat Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
