'use client';

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { RadarMetric } from '@/types/screening';

interface Props {
  data: RadarMetric[];
}

export function RiskRadarChart({ data }: Props) {
  return (
    <div className="w-full h-[320px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#334155" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 9 }} />
          <Radar
            name="Skor Kesehatan"
            dataKey="score"
            stroke="#2dd4bf"
            fill="#14b8a6"
            fillOpacity={0.45}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '0.75rem',
              color: '#f8fafc',
              fontSize: '12px',
              fontWeight: '600'
            }}
            formatter={(value: any) => [`${value} / 100`, 'Nilai Kebugaran']}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
