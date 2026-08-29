"use client";

import React from "react";
import { ShieldCheck, AlertTriangle, Flame } from "lucide-react";

interface TemperatureGaugeProps {
  temperatureC: number;
  unitCode?: string;
  size?: "sm" | "md" | "lg";
}

export default function TemperatureGauge({
  temperatureC,
  unitCode,
  size = "md",
}: TemperatureGaugeProps) {
  // Gauge range: -30°C (min / index 0) to 0°C (max / index 100)
  const minTemp = -30;
  const maxTemp = 0;
  const clampedTemp = Math.min(maxTemp, Math.max(minTemp, temperatureC));
  const pct = (clampedTemp - minTemp) / (maxTemp - minTemp); // 0 (coldest) to 1 (warmest)

  // Arc angles: 140deg to 400deg (260 deg total sweep)
  const startAngle = 140;
  const totalSweep = 260;
  const currentAngle = startAngle + pct * totalSweep;

  // Status computation based on PRD:
  // OPTIMAL <= -15°C
  // WARNING > -15°C
  // CRITICAL > -10°C
  let status: "optimal" | "warning" | "critical" = "optimal";
  let statusColor = "#16A34A"; // green
  let statusBg = "bg-green-100 text-green-800 border-green-300";
  let statusText = "OPTIMAL";
  let StatusIcon = ShieldCheck;

  if (temperatureC > -10.0) {
    status = "critical";
    statusColor = "#DC2626"; // red
    statusBg = "bg-red-100 text-red-800 border-red-300 animate-pulse";
    statusText = "CRITICAL / ANOMALI";
    StatusIcon = Flame;
  } else if (temperatureC > -15.0) {
    status = "warning";
    statusColor = "#D97706"; // yellow
    statusBg = "bg-amber-100 text-amber-800 border-amber-300";
    statusText = "WARNING (> -15°C)";
    StatusIcon = AlertTriangle;
  }

  const radius = size === "lg" ? 90 : size === "sm" ? 50 : 70;
  const strokeWidth = size === "lg" ? 14 : size === "sm" ? 8 : 11;
  const center = radius + strokeWidth;
  const circumference = Math.PI * radius; // for semicircle approx

  // Convert polar to cartesian
  const polarToCartesian = (centerX: number, centerY: number, rad: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + rad * Math.cos(angleInRadians),
      y: centerY + rad * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x: number, y: number, rad: number, startAng: number, endAng: number) => {
    const start = polarToCartesian(x, y, rad, endAng);
    const end = polarToCartesian(x, y, rad, startAng);
    const largeArcFlag = endAng - startAng <= 180 ? "0" : "1";
    return ["M", start.x, start.y, "A", rad, rad, 0, largeArcFlag, 0, end.x, end.y].join(" ");
  };

  const backgroundArc = describeArc(center, center, radius, 140, 400);
  const activeArc = describeArc(center, center, radius, 140, Math.max(141, currentAngle));
  const needlePoint = polarToCartesian(center, center, radius - strokeWidth, currentAngle);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
      {unitCode && (
        <div className="text-[11px] font-mono font-semibold text-slate-400 mb-1">
          SENSOR TELEMETRI • {unitCode}
        </div>
      )}

      {/* SVG Arc Gauge */}
      <div className="relative flex items-center justify-center">
        <svg
          width={center * 2}
          height={center * 1.7}
          viewBox={`0 0 ${center * 2} ${center * 1.7}`}
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0D9488" />
              <stop offset="60%" stopColor="#16A34A" />
              <stop offset="80%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>

          {/* Background Track */}
          <path
            d={backgroundArc}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Active Colored Arc */}
          <path
            d={activeArc}
            fill="none"
            stroke={statusColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />

          {/* Needle Indicator */}
          <circle
            cx={center}
            cy={center}
            r={strokeWidth / 2}
            fill="#0A2342"
          />
          <line
            x1={center}
            y1={center}
            x2={needlePoint.x}
            y2={needlePoint.y}
            stroke="#0A2342"
            strokeWidth="3"
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Temperature Readout */}
        <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <div className="text-3xl sm:text-4xl font-extrabold text-navy font-mono tracking-tight">
            {temperatureC > 0 ? `+${temperatureC.toFixed(1)}` : temperatureC.toFixed(1)}
            <span className="text-xl sm:text-2xl font-normal text-slate-500">°C</span>
          </div>
          <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
            Target: ≤ -18.0°C
          </div>
        </div>
      </div>

      {/* Scale Range labels */}
      <div className="w-full flex justify-between px-4 -mt-2 text-[10px] text-slate-400 font-mono">
        <span>-30°C</span>
        <span>-15°C (Ambang)</span>
        <span>0°C</span>
      </div>

      {/* Status Pill Badge */}
      <div
        className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusBg} transition-all duration-300`}
      >
        <StatusIcon className="w-3.5 h-3.5" />
        <span>{statusText}</span>
      </div>
    </div>
  );
}
