"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { AlertTriangle, Flame, RefreshCw, Radio, ChevronDown, ChevronUp, X } from "lucide-react";

export default function DemoBanner() {
  const pathname = usePathname();
  const {
    simulation,
    toggleDemoMode,
    injectTemperatureAnomaly,
    resetSimulation,
    units,
    currentUser,
    switchUser,
  } = useBlueSyncStore();

  const [expanded, setExpanded] = useState(false);

  // Check if current route is an internal dashboard / admin / login route
  const isInternalOrLoginRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/operator") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/gov") ||
    pathname === "/login";

  // DO NOT show demo banner on public pages (homepage, market, solutions, impact, etc.)
  // to preserve clean, unpolluted UI/UX for regular users and stakeholders
  if (!isInternalOrLoginRoute || !simulation.isDemoMode) {
    return null;
  }

  const bs1 = units.find((u) => u.code === "BS-001") || units[0];

  return (
    <div className="bg-[#050d18] text-slate-300 border-b border-slate-800 text-[11px] backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between gap-3">
        {/* Left Status Pill */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-teal/15 text-teal-light border border-teal/30 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold">
            <Radio className="w-2.5 h-2.5 text-teal animate-pulse" />
            TELEMETRY SIMULATOR
          </span>
          <span className="hidden sm:inline text-slate-400 font-mono text-[11px]">
            BS-001: <strong className="text-white">{bs1.currentTempC}°C</strong> • Solar: <strong className="text-amber-400">{bs1.currentSolarKw} kW</strong> • Baterai: <strong className="text-green-400">{bs1.currentBatteryPct}%</strong>
          </span>
        </div>

        {/* Right Action Triggers */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => injectTemperatureAnomaly("BS-001", -14.6)}
            title="Simulasikan kenaikan suhu di atas -15°C"
            className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium transition flex items-center gap-1"
          >
            <AlertTriangle className="w-2.5 h-2.5" />
            <span>Alert (-14.6°C)</span>
          </button>

          <button
            onClick={() => injectTemperatureAnomaly("BS-001", -9.2)}
            title="Simulasikan anomali kritis di atas -10°C"
            className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium transition hidden md:flex items-center gap-1"
          >
            <Flame className="w-2.5 h-2.5" />
            <span>Kritis (-9.2°C)</span>
          </button>

          <button
            onClick={resetSimulation}
            title="Reset simulasi ke kondisi optimal"
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-md text-[10px] font-mono transition flex items-center gap-1"
          >
            <RefreshCw className="w-2.5 h-2.5 text-teal" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-slate-400 hover:text-white p-1 rounded transition"
            title="Pilih Persona"
          >
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Expanded Persona Switcher Tray */}
      {expanded && (
        <div className="bg-[#081525] px-4 py-2 border-t border-slate-800 text-[11px] flex flex-wrap items-center justify-between gap-2 animate-in slide-in-from-top-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-mono text-[10px]">Pindah Persona Demo:</span>
            {[
              { id: "user-nelayan-anto", label: "1. Nelayan Anto", role: "fisherman" },
              { id: "user-operator-budi", label: "2. Operator Budi", role: "operator" },
              { id: "user-buyer-citra", label: "3. Buyer PT Laut", role: "buyer" },
              { id: "user-gov-hendra", label: "4. Gov/KKP RI", role: "gov" },
              { id: "user-admin-global", label: "5. Admin", role: "admin" },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => switchUser(p.id)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition ${
                  currentUser.role === p.role
                    ? "bg-teal text-navy font-bold shadow-sm"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => toggleDemoMode(false)}
            className="text-slate-400 hover:text-white text-[10px] font-mono flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            <span>Tutup Bar Simulasi</span>
          </button>
        </div>
      )}
    </div>
  );
}
