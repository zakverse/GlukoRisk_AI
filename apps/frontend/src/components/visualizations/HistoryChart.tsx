'use client';

import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Area, AreaChart,
} from 'recharts';
import { HistoryEntry } from '@/types/screening';

interface Props {
  data: HistoryEntry[];
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel border border-white/10 rounded-xl p-3 shadow-xl text-xs space-y-1">
        <p className="font-bold text-white mb-2">{label}</p>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ background: p.color }} />
            <span className="text-slate-400">{p.name}:</span>
            <span className="font-bold text-white">{p.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function HistoryChart({ data }: Props) {
  if (!data || data.length < 2) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-500 text-sm">
        Butuh minimal 2 data skrining untuk menampilkan grafik perkembangan.
      </div>
    );
  }

  const chartData = data
    .slice()
    .reverse()
    .map((entry) => ({
      date: entry.date.split(',')[0],
      'Risiko Diabetes': entry.diabetesRisk,
      'Risiko Kardio': entry.cvdRisk,
    }));

  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -10 }}>
          <defs>
            <linearGradient id="diabetesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="cvdGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'Plus Jakarta Sans' }} />
          <YAxis tick={{ fill: '#64748b', fontSize: 10 }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="Risiko Diabetes"
            stroke="#0ea5e9"
            fill="url(#diabetesGrad)"
            strokeWidth={2}
            dot={{ fill: '#0ea5e9', r: 4, strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="Risiko Kardio"
            stroke="#14b8a6"
            fill="url(#cvdGrad)"
            strokeWidth={2}
            dot={{ fill: '#14b8a6', r: 4, strokeWidth: 0 }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'Plus Jakarta Sans' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
