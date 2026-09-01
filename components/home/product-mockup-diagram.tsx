"use client";

import React, { useState } from "react";
import {
  Sun,
  BatteryCharging,
  ThermometerSnowflake,
  Cpu,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Sliders,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function ProductMockupDiagram() {
  const [activePart, setActivePart] = useState<"solar" | "coldroom" | "bess" | "iot" | "chassis">("coldroom");

  const partDetails = {
    solar: {
      title: "Kanopi Solar PV 4.000 Wp",
      spec: "10x 400W Monocrystalline Panels",
      desc: "Menghasilkan rata-rata 22 kWh energi surya per hari (5,5 peak sun hours). Menopang 100% beban kompresor di siang hari dan mengisi baterai.",
      tag: "Clean Energy Source",
    },
    coldroom: {
      title: "Kabin Cold Storage Insulasi 100mm",
      spec: "Kapasitas 500 – 1.000 kg • Suhu ≤ -18°C",
      desc: "Dinding Sandwich Panel Polyurethane Density 42 kg/m³ berlapis plat stainless steel food-grade 304 anti-korosi air laut.",
      tag: "Marine-Grade Preservation",
    },
    bess: {
      title: "Battery Energy Storage (BESS) 10 kWh",
      spec: "LiFePO4 48V 200Ah • Siklus > 4.000 Kali",
      desc: "Menyimpan daya surya untuk menjaga pendinginan tetap aktif selama 16+ jam di malam hari atau saat cuaca mendung berkepanjangan.",
      tag: "Night-Shift Power Stability",
    },
    iot: {
      title: "Smart IoT Controller & Gateway",
      spec: "Sensor Presisi DS18B20 + 4G/LoRa Telemetri",
      desc: "Mencatat fluktuasi temperatur secara real-time, mendeteksi pintu terbuka, dan menerbitkan tiket QR traceability untuk nelayan.",
      tag: "Digital Synchronization",
    },
    chassis: {
      title: "Rangka Modular & Proteksi Salinitas",
      spec: "Hot-Dip Galvanized & SS304 Skid",
      desc: "Konstruksi modular portabel yang mudah dimobilisasi dengan truk engkel ke dermaga terpencil, tahan cuaca ekstrem pesisir.",
      tag: "Coastal Durability",
    },
  };

  return (
    <div className="bg-gradient-to-b from-[#091626] to-[#0d1e33] rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase bg-teal text-navy px-2 py-0.5 rounded">
              SKEMATIK HARDWARE & ANATOMI UNIT
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Model: BlueSync CS-1000 Solar-Hybrid
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            Arsitektur Fisik Micro Cold Storage
          </h3>
        </div>

        {/* Part Selector Pills */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "solar", label: "Solar Panel", icon: Sun },
            { id: "coldroom", label: "Kabin Pendingin", icon: ThermometerSnowflake },
            { id: "bess", label: "Baterai LiFePO4", icon: BatteryCharging },
            { id: "iot", label: "Modul IoT", icon: Cpu },
            { id: "chassis", label: "Rangka SS304", icon: ShieldCheck },
          ].map((item) => {
            const isSelected = activePart === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActivePart(item.id as any)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  isSelected
                    ? "bg-teal text-navy font-bold shadow-md"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Interactive Vector Schematics */}
        <div className="lg:col-span-7 bg-[#050c14] rounded-2xl p-6 border border-slate-800 relative overflow-hidden flex items-center justify-center min-h-[300px]">
          {/* Coordinates Grid */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `linear-gradient(#0D9488 1px, transparent 1px), linear-gradient(90deg, #0D9488 1px, transparent 1px)`,
              backgroundSize: `24px 24px`,
            }}
          />

          {/* SVG Cold Storage Cross-Section */}
          <svg viewBox="0 0 500 320" className="w-full max-w-md h-auto relative z-10">
            {/* Ground / Pier Base */}
            <rect x="30" y="270" width="440" height="20" rx="3" fill="#1e293b" />
            <line x1="30" y1="270" x2="470" y2="270" stroke="#334155" strokeWidth="2" />

            {/* Main Stainless Container Cabin */}
            <rect
              x="80"
              y="110"
              width="340"
              height="160"
              rx="8"
              fill={activePart === "coldroom" ? "#0f2f3d" : "#0f172a"}
              stroke={activePart === "coldroom" ? "#0D9488" : "#334155"}
              strokeWidth={activePart === "coldroom" ? "3" : "1.5"}
              className="transition-colors duration-300"
            />

            {/* Insulation Layer */}
            <rect
              x="92"
              y="122"
              width="316"
              height="136"
              rx="4"
              fill={activePart === "coldroom" ? "#134e4a" : "#1e293b"}
              stroke="#0D9488"
              strokeWidth="1"
              strokeDasharray="4 2"
              opacity="0.6"
            />

            {/* Cold Air Circulation Glow */}
            <circle cx="250" cy="190" r="45" fill="#38bdf8" opacity="0.12" />
            <text x="250" y="195" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              ≤ -18.0°C DEEP FREEZE
            </text>
            <text x="250" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
              Kapasitas 500–1.000 kg Ikan
            </text>

            {/* Solar Canopy Roof on Top */}
            <g
              onClick={() => setActivePart("solar")}
              className="cursor-pointer group"
            >
              {/* Supports */}
              <line x1="100" y1="110" x2="60" y2="50" stroke="#64748b" strokeWidth="3" />
              <line x1="400" y1="110" x2="440" y2="50" stroke="#64748b" strokeWidth="3" />
              <line x1="250" y1="110" x2="250" y2="50" stroke="#64748b" strokeWidth="3" />

              {/* Slanted PV Panels */}
              <polygon
                points="40,50 460,40 450,20 30,30"
                fill={activePart === "solar" ? "#f59e0b" : "#1e3a8a"}
                stroke={activePart === "solar" ? "#fbbf24" : "#3b82f6"}
                strokeWidth="2"
                className="transition-colors duration-300"
              />
              {/* PV Grid Lines */}
              <line x1="140" y1="46" x2="135" y2="27" stroke="#60a5fa" strokeWidth="1" />
              <line x1="250" y1="44" x2="245" y2="24" stroke="#60a5fa" strokeWidth="1" />
              <line x1="360" y1="42" x2="355" y2="22" stroke="#60a5fa" strokeWidth="1" />

              <text x="250" y="18" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                SOLAR PV CANOPY 4.000 Wp
              </text>
            </g>

            {/* Battery Compartment (Right Box) */}
            <g
              onClick={() => setActivePart("bess")}
              className="cursor-pointer"
            >
              <rect
                x="340"
                y="140"
                width="60"
                height="110"
                rx="4"
                fill={activePart === "bess" ? "#15803d" : "#0f172a"}
                stroke={activePart === "bess" ? "#22c55e" : "#475569"}
                strokeWidth="2"
                className="transition-colors duration-300"
              />
              <text x="370" y="195" fill="#4ade80" fontSize="9" fontWeight="bold" textAnchor="middle" transform="rotate(-90 370 195)">
                LiFePO4 10kWh
              </text>
            </g>

            {/* IoT Telemetry Controller (Left Box) */}
            <g
              onClick={() => setActivePart("iot")}
              className="cursor-pointer"
            >
              <rect
                x="100"
                y="140"
                width="50"
                height="70"
                rx="4"
                fill={activePart === "iot" ? "#7e22ce" : "#0f172a"}
                stroke={activePart === "iot" ? "#c084fc" : "#475569"}
                strokeWidth="2"
                className="transition-colors duration-300"
              />
              <circle cx="125" cy="160" r="8" fill="#22c55e" />
              <rect x="110" y="180" width="30" height="15" fill="#1e293b" />
              <text x="125" y="192" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                -18°C
              </text>
            </g>
          </svg>
        </div>

        {/* Right: Active Component Details Card */}
        <div className="lg:col-span-5 bg-slate-900/90 p-5 sm:p-6 rounded-2xl border border-teal/40 space-y-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-teal bg-teal/10 px-2.5 py-1 rounded-full border border-teal/30">
              {partDetails[activePart].tag}
            </span>
            <h4 className="text-lg font-bold text-white mt-2">
              {partDetails[activePart].title}
            </h4>
            <div className="text-xs font-mono font-semibold text-amber-400 mt-0.5">
              {partDetails[activePart].spec}
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {partDetails[activePart].desc}
          </p>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[9px]">Proteksi Karat:</span>
              <strong className="text-white">IP65 & SS304 Marine</strong>
            </div>
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[9px]">Garansi Sistem:</span>
              <strong className="text-teal-light">5 Tahun Fabrikasi</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
