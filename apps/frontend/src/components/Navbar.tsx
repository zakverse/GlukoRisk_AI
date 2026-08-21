import React from 'react';
import { Activity, HeartPulse, ShieldCheck } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-teal-500 via-sky-500 to-indigo-600 p-0.5 shadow-lg shadow-teal-500/20">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Activity className="h-6 w-6 text-teal-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold tracking-tight text-white">
                MediCheck <span className="health-gradient-text">AI</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider text-teal-300 bg-teal-950/80 border border-teal-500/30 rounded-full">
                PREVENTIVE ML
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Skrining Risiko Diabetes & Penyakit Kardiovaskular
            </p>
          </div>
        </div>

        {/* SDG 3 Badge & Indicators */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs">
            <div className="h-6 w-6 rounded-md bg-emerald-600 flex items-center justify-center text-white font-bold text-[11px]">
              3
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">SDG 3</p>
              <p className="text-slate-300 font-medium text-[11px]">Kehidupan Sehat & Sejahtera</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs bg-slate-900/90 text-slate-300 px-3 py-2 rounded-xl border border-slate-800">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="hidden sm:inline font-medium">Validasi BRFSS ML</span>
          </div>
        </div>
      </div>
    </header>
  );
}
