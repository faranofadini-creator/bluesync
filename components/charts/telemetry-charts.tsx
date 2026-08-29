"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
  ReferenceLine,
} from "recharts";
import { formatRupiah } from "@/lib/utils";

// 24h Temperature Data Sample
export const TEMP_24H_DATA = [
  { time: "00:00", temp: -18.8, threshold: -15 },
  { time: "02:00", temp: -18.9, threshold: -15 },
  { time: "04:00", temp: -19.1, threshold: -15 },
  { time: "06:00", temp: -18.6, threshold: -15 },
  { time: "08:00", temp: -18.2, threshold: -15 },
  { time: "10:00", temp: -17.9, threshold: -15 },
  { time: "12:00", temp: -17.5, threshold: -15 },
  { time: "14:00", temp: -17.8, threshold: -15 },
  { time: "16:00", temp: -18.1, threshold: -15 },
  { time: "18:00", temp: -18.4, threshold: -15 },
  { time: "20:00", temp: -18.6, threshold: -15 },
  { time: "22:00", temp: -18.7, threshold: -15 },
];

// 7-Day Temperature Data Sample
export const TEMP_7D_DATA = [
  { day: "Senin", avgTemp: -18.6, minTemp: -19.2, maxTemp: -17.4 },
  { day: "Selasa", avgTemp: -18.5, minTemp: -19.0, maxTemp: -17.2 },
  { day: "Rabu", avgTemp: -18.7, minTemp: -19.3, maxTemp: -17.6 },
  { day: "Kamis", avgTemp: -18.3, minTemp: -18.9, maxTemp: -17.1 },
  { day: "Jumat", avgTemp: -18.6, minTemp: -19.1, maxTemp: -17.5 },
  { day: "Sabtu", avgTemp: -18.4, minTemp: -18.8, maxTemp: -17.3 },
  { day: "Minggu", avgTemp: -18.5, minTemp: -19.0, maxTemp: -17.4 },
];

// Solar Daylight Generation Curve
export const SOLAR_DAILY_DATA = [
  { time: "05:00", solarKw: 0, batteryPct: 65 },
  { time: "06:00", solarKw: 0.8, batteryPct: 66 },
  { time: "07:00", solarKw: 2.4, batteryPct: 70 },
  { time: "08:00", solarKw: 4.6, batteryPct: 76 },
  { time: "09:00", solarKw: 6.8, batteryPct: 84 },
  { time: "10:00", solarKw: 7.9, batteryPct: 91 },
  { time: "11:00", solarKw: 8.3, batteryPct: 96 },
  { time: "12:00", solarKw: 8.4, batteryPct: 99 },
  { time: "13:00", solarKw: 8.1, batteryPct: 100 },
  { time: "14:00", solarKw: 7.2, batteryPct: 100 },
  { time: "15:00", solarKw: 5.4, batteryPct: 98 },
  { time: "16:00", solarKw: 3.1, batteryPct: 95 },
  { time: "17:00", solarKw: 1.2, batteryPct: 92 },
  { time: "18:00", solarKw: 0.1, batteryPct: 88 },
  { time: "19:00", solarKw: 0, batteryPct: 84 },
];

export function TemperatureHistoryChart({ currentTemp }: { currentTemp?: number }) {
  const [view, setView] = useState<"24h" | "7d">("24h");

  // In case live temp changed, update the last 24h point
  const display24h = [...TEMP_24H_DATA];
  if (currentTemp !== undefined) {
    display24h[display24h.length - 1] = {
      time: "Sekarang",
      temp: currentTemp,
      threshold: -15,
    };
  }

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div>
          <h3 className="font-bold text-navy text-sm">Histori Temperatur Ruang Pendingin</h3>
          <span className="text-[11px] text-slate-500">
            Ambang batas aman cold storage ≤ -15.0°C
          </span>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg text-xs">
          <button
            onClick={() => setView("24h")}
            className={`px-3 py-1 rounded-md font-bold transition ${
              view === "24h" ? "bg-navy text-white shadow" : "text-slate-600 hover:text-navy"
            }`}
          >
            24 Jam Terakhir
          </button>
          <button
            onClick={() => setView("7d")}
            className={`px-3 py-1 rounded-md font-bold transition ${
              view === "7d" ? "bg-navy text-white shadow" : "text-slate-600 hover:text-navy"
            }`}
          >
            7 Hari Terakhir
          </button>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {view === "24h" ? (
            <LineChart data={display24h} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#64748B" }} />
              <YAxis domain={[-25, -5]} tick={{ fontSize: 11, fill: "#64748B" }} unit="°C" />
              <Tooltip
                contentStyle={{ backgroundColor: "#0A2342", color: "#fff", borderRadius: 8, fontSize: 12 }}
                formatter={(val: any) => [`${val}°C`, "Suhu"]}
              />
              <ReferenceLine y={-15} stroke="#D97706" strokeDasharray="4 4" label={{ value: "Ambang Warning -15°C", fill: "#D97706", fontSize: 10, position: "top" }} />
              <ReferenceLine y={-10} stroke="#DC2626" strokeDasharray="4 4" label={{ value: "Ambang Kritis -10°C", fill: "#DC2626", fontSize: 10, position: "top" }} />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#0D9488"
                strokeWidth={3}
                dot={{ r: 3, fill: "#0D9488" }}
                activeDot={{ r: 6, fill: "#EA580C" }}
              />
            </LineChart>
          ) : (
            <LineChart data={TEMP_7D_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748B" }} />
              <YAxis domain={[-25, -5]} tick={{ fontSize: 11, fill: "#64748B" }} unit="°C" />
              <Tooltip
                contentStyle={{ backgroundColor: "#0A2342", color: "#fff", borderRadius: 8, fontSize: 12 }}
              />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
              <Line type="monotone" name="Suhu Rata-rata" dataKey="avgTemp" stroke="#0D9488" strokeWidth={3} />
              <Line type="monotone" name="Suhu Maksimum" dataKey="maxTemp" stroke="#D97706" strokeWidth={2} strokeDasharray="3 3" />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function SolarGenerationChart() {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-navy text-sm">Produksi Energi Surya (PV) & Baterai BMS</h3>
          <span className="text-[11px] text-slate-500">Kurva fotovoltaik 24 jam dengan puncak 8.4 kW pada siang hari</span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={SOLAR_DAILY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="solarFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#EA580C" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#EA580C" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#64748B" }} />
            <YAxis tick={{ fontSize: 11, fill: "#64748B" }} unit=" kW" />
            <Tooltip
              contentStyle={{ backgroundColor: "#0A2342", color: "#fff", borderRadius: 8, fontSize: 12 }}
            />
            <Area
              type="monotone"
              dataKey="solarKw"
              name="Daya Surya (kW)"
              stroke="#EA580C"
              strokeWidth={3}
              fill="url(#solarFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function MonthlyRevenueChart() {
  const data = [
    { month: "Apr", rental: 8500000, lease: 4111111, commission: 1200000 },
    { month: "Mei", rental: 9800000, lease: 4111111, commission: 1450000 },
    { month: "Jun", rental: 11200000, lease: 4111111, commission: 1800000 },
    { month: "Jul", rental: 12400000, lease: 4111111, commission: 2100000 },
    { month: "Agt", rental: 14850000, lease: 4111111, commission: 2650000 },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div>
        <h3 className="font-bold text-navy text-sm">Pendapatan Operasional BUMDes per Bulan</h3>
        <span className="text-[11px] text-slate-500">Kombinasi sewa pay-per-use, cicilan lease-to-own, dan komisi pasar</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} />
            <YAxis
              tick={{ fontSize: 10, fill: "#64748B" }}
              tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#0A2342", color: "#fff", borderRadius: 8, fontSize: 12 }}
              formatter={(val: any) => [formatRupiah(val), ""]}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <Bar dataKey="rental" name="Sewa Pay-Per-Use" fill="#0D9488" stackId="a" radius={[0, 0, 0, 0]} />
            <Bar dataKey="lease" name="Cicilan Lease-to-Own" fill="#1A6B8A" stackId="a" />
            <Bar dataKey="commission" name="Komisi Pasar Ikan" fill="#EA580C" stackId="a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
