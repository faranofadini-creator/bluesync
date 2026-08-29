"use client";

import React, { useState } from "react";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { AlertTriangle, Flame, RefreshCw, Zap, BatteryLow, ShieldAlert, ChevronDown, ChevronUp, Play } from "lucide-react";

export default function DemoBanner() {
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

  if (!simulation.isDemoMode) {
    return (
      <div className="bg-navy text-white px-4 py-1.5 text-xs flex justify-between items-center border-b border-navy-700">
        <span className="text-slate-300">Mode Produksi Aktif</span>
        <button
          onClick={() => toggleDemoMode(true)}
          className="bg-teal hover:bg-teal-dark text-white px-2.5 py-0.5 rounded font-medium transition text-[11px]"
        >
          Aktifkan Demo Mode
        </button>
      </div>
    );
  }

  const bs1 = units.find((u) => u.code === "BS-001") || units[0];

  return (
    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-md text-xs border-b border-amber-600">
      <div className="max-w-7xl mx-auto px-3 py-1.5 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2 font-bold tracking-wide">
          <span className="bg-black text-amber-300 px-2 py-0.5 rounded text-[10px] font-mono animate-pulse uppercase">
            SIMULATION / DEMO DATA
          </span>
          <span className="hidden sm:inline text-slate-950 font-semibold text-xs">
            IoT & Telemetri Real-Time Aktif (BS-001: {bs1.currentTempC}°C | Solar: {bs1.currentSolarKw} kW)
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Quick Anomaly Triggers for Pitch */}
          <button
            onClick={() => injectTemperatureAnomaly("BS-001", -14.6)}
            title="Simulasikan kenaikan suhu di atas -15°C"
            className="bg-red-700 hover:bg-red-800 text-white font-medium px-2 py-1 rounded flex items-center gap-1 text-[11px] transition shadow-sm"
          >
            <AlertTriangle className="w-3 h-3 text-amber-200" />
            <span>Trigger Alert (-14.6°C)</span>
          </button>

          <button
            onClick={() => injectTemperatureAnomaly("BS-001", -9.2)}
            title="Simulasikan anomali kritis di atas -10°C"
            className="bg-red-950 hover:bg-red-900 text-white font-medium px-2 py-1 rounded flex items-center gap-1 text-[11px] transition shadow-sm hidden md:flex"
          >
            <Flame className="w-3 h-3 text-red-400" />
            <span>Kritis (-9.2°C)</span>
          </button>

          <button
            onClick={resetSimulation}
            title="Kembalikan suhu ke status optimal -18.4°C"
            className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-2 py-1 rounded flex items-center gap-1 text-[11px] transition"
          >
            <RefreshCw className="w-3 h-3 text-teal-400" />
            <span>Reset Demo</span>
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="bg-amber-800 hover:bg-amber-900 text-amber-100 px-1.5 py-1 rounded flex items-center text-[11px]"
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="bg-amber-600/90 px-4 py-2 text-slate-900 text-[11px] border-t border-amber-700 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold">Ganti Persona Instan:</span>
            <button
              onClick={() => switchUser("user-nelayan-anto")}
              className={`px-2 py-0.5 rounded font-medium ${
                currentUser.role === "fisherman" ? "bg-navy text-white" : "bg-white/80 hover:bg-white text-navy"
              }`}
            >
              1. Nelayan Anto
            </button>
            <button
              onClick={() => switchUser("user-operator-budi")}
              className={`px-2 py-0.5 rounded font-medium ${
                currentUser.role === "operator" ? "bg-navy text-white" : "bg-white/80 hover:bg-white text-navy"
              }`}
            >
              2. Operator Budi
            </button>
            <button
              onClick={() => switchUser("user-buyer-citra")}
              className={`px-2 py-0.5 rounded font-medium ${
                currentUser.role === "buyer" ? "bg-navy text-white" : "bg-white/80 hover:bg-white text-navy"
              }`}
            >
              3. Buyer PT Laut
            </button>
            <button
              onClick={() => switchUser("user-gov-hendra")}
              className={`px-2 py-0.5 rounded font-medium ${
                currentUser.role === "gov" ? "bg-navy text-white" : "bg-white/80 hover:bg-white text-navy"
              }`}
            >
              4. Gov / CSR KKP
            </button>
            <button
              onClick={() => switchUser("user-admin-global")}
              className={`px-2 py-0.5 rounded font-medium ${
                currentUser.role === "admin" ? "bg-navy text-white" : "bg-white/80 hover:bg-white text-navy"
              }`}
            >
              5. Admin Global
            </button>
          </div>

          <div className="flex items-center gap-2 text-amber-950 font-medium">
            <span>Siklus Telemetri IoT Berjalan (Interval 30s)</span>
            <button
              onClick={() => toggleDemoMode(false)}
              className="text-amber-950 hover:underline text-[10px]"
            >
              [Matikan Banner]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
