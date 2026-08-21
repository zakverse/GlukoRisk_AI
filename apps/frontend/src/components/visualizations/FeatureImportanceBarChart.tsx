'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { RiskFactor } from '@/types/screening';

interface Props {
  factors: RiskFactor[];
}

export function FeatureImportanceBarChart({ factors }: Props) {
  // Take top 5 risk factors and prepare data
  const chartData = factors.slice(0, 5).map((f) => ({
    name: f.nameId,
    impact: f.impactScore,
    status: f.status,
    category: f.category,
  }));

  const getBarColor = (status: string) => {
    if (status === 'Critical') return '#f43f5e'; // Rose/Red
    if (status === 'Warning') return '#f59e0b';  // Amber/Yellow
    return '#10b981';                            // Emerald/Green
  };

  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="name"
            width={170}
            tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 500 }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '0.75rem',
              color: '#f8fafc',
              fontSize: '12px',
            }}
            formatter={(val: any) => [`${val}% Kontribusi SHAP`, 'Tingkat Dampak Risiko']}
          />
          <Bar dataKey="impact" radius={[0, 8, 8, 0]} barSize={22}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
