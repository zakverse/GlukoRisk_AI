'use client';

import React, { useEffect, useRef } from 'react';

interface Props {
  percentage: number; // 0-100
  color: string;
  size?: number;
  strokeWidth?: number;
  label: string;
  sublabel?: string;
  animate?: boolean;
}

export function RiskGauge({
  percentage,
  color,
  size = 140,
  strokeWidth = 10,
  label,
  sublabel,
  animate = true,
}: Props) {
  const clampedPct = Math.min(100, Math.max(0, percentage));
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (clampedPct / 100) * circumference;

  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!animate || !circleRef.current) return;
    const el = circleRef.current;
    el.style.strokeDashoffset = `${circumference}`;
    el.style.transition = 'none';

    const timeout = setTimeout(() => {
      el.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
      el.style.strokeDashoffset = `${dashOffset}`;
    }, 100);

    return () => clearTimeout(timeout);
  }, [clampedPct, circumference, dashOffset, animate]);

  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <circle
            ref={circleRef}
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animate ? circumference : dashOffset}
            style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-white leading-none">{clampedPct}%</span>
          <span className="text-[11px] font-semibold mt-1" style={{ color }}>{label}</span>
        </div>
      </div>

      {sublabel && (
        <p className="text-xs text-slate-400 text-center max-w-[120px] leading-snug">{sublabel}</p>
      )}
    </div>
  );
}
