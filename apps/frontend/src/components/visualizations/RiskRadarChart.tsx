'use client';

import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { RadarMetric } from '@/types/screening';

interface Props {
  data: RadarMetric[];
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: RadarMetric }[] }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="glass-panel border border-white/10 rounded-xl p-3 shadow-xl text-xs">
        <p className="font-bold text-white mb-1">{d.subject}</p>
        <p className="text-sky-400 font-semibold">Skor: <span className="text-white">{d.score}</span>/100</p>
        <p className="text-slate-400 mt-1 text-[10px]">
          {d.score >= 75 ? '✓ Kondisi baik' : d.score >= 50 ? '⚠ Perlu perhatian' : '⚠ Risiko tinggi'}
        </p>
      </div>
    );
  }
  return null;
};

export function RiskRadarChart({ data }: Props) {
  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 8, right: 20, bottom: 8, left: 20 }}>
          <PolarGrid
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1}
          />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600, fontFamily: 'Plus Jakarta Sans' }}
          />
          <Radar
            name="Profil Kesehatan"
            dataKey="score"
            stroke="rgba(14,165,233,0.8)"
            fill="rgba(14,165,233,0.15)"
            strokeWidth={2}
            dot={{ fill: '#0ea5e9', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#0ea5e9', stroke: 'rgba(14,165,233,0.3)', strokeWidth: 3 }}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
