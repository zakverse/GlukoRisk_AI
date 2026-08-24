'use client';

import React from 'react';
import { RiskFactor } from '@/types/screening';

interface Props {
  factors: RiskFactor[];
}

function getBarColor(score: number, status: string): string {
  if (status === 'Critical') return '#ef4444';
  if (status === 'Warning') return '#f59e0b';
  return '#10b981';
}

function getStatusLabel(status: string): string {
  if (status === 'Critical') return 'Kritis';
  if (status === 'Warning') return 'Perhatian';
  return 'Baik';
}

export function FeatureImportanceBarChart({ factors }: Props) {
  const maxScore = Math.max(...factors.map((f) => f.impactScore), 1);

  return (
    <div className="space-y-4">
      {factors.map((factor, idx) => {
        const color = getBarColor(factor.impactScore, factor.status);
        const widthPct = (factor.impactScore / 100) * 100;

        return (
          <div key={factor.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[10px] font-bold text-slate-500 w-4 shrink-0">#{idx + 1}</span>
                <span className="font-semibold text-slate-200 truncate">{factor.nameId}</span>
                <span
                  className="px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0"
                  style={{ color, background: `${color}20` }}
                >
                  {getStatusLabel(factor.status)}
                </span>
              </div>
              <span className="font-black text-white ml-2 shrink-0">{factor.impactScore}%</span>
            </div>

            <div className="relative w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${widthPct}%`,
                  background: `linear-gradient(90deg, ${color}cc, ${color})`,
                  boxShadow: `0 0 8px ${color}40`,
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="flex items-center gap-4 pt-2 border-t border-white/[0.05]">
        {[
          { color: '#ef4444', label: 'Kritis' },
          { color: '#f59e0b', label: 'Perhatian' },
          { color: '#10b981', label: 'Baik' },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}
