"use client";

import React from "react";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import {
  PlaySquare,
  AlertTriangle,
  Flame,
  BatteryLow,
  DoorOpen,
  RefreshCw,
  Zap,
  Activity,
  CheckCircle2,
} from "lucide-react";

export default function DemoModeControlPage() {
  const {
    simulation,
    toggleDemoMode,
    triggerSimulationTick,
    injectTemperatureAnomaly,
    resetSimulation,
    units,
  } = useBlueSyncStore();

  const bs1 = units.find((u) => u.code === "BS-001") || units[0];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
      {/* PRD Section 19 Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase bg-amber-500 text-navy px-2 py-0.5 rounded">
            PRD SECTION 19 • PITCHING DEMO CONTROL CENTER
          </span>
          <h2 className="text-xl font-bold text-navy mt-1">
            Pusat Kendali Simulasi Presentasi & Injeksi Anomali
          </h2>
          <p className="text-xs text-slate-500">
            Digunakan saat pitching lomba untuk mensimulasikan dinamika sensor IoT, daylight curve surya, dan pemicu smart alert.
          </p>
        </div>

        <button
          onClick={() => toggleDemoMode()}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            simulation.isDemoMode
              ? "bg-green-600 text-white"
              : "bg-slate-200 text-slate-700"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${simulation.isDemoMode ? "bg-white animate-pulse" : "bg-slate-400"}`} />
          <span>Demo Mode: {simulation.isDemoMode ? "AKTIF (ON)" : "NON-AKTIF (OFF)"}</span>
        </button>
      </div>

      {/* Quick Trigger Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Trigger 1 */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-600 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>Anomali Suhu WARNING</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Naikkan suhu ke -14.6°C untuk memicu warning threshold (&gt; -15°C).
            </p>
          </div>
          <button
            onClick={() => injectTemperatureAnomaly("BS-001", -14.6)}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-xl text-xs transition"
          >
            Trigger Suhu -14.6°C
          </button>
        </div>

        {/* Trigger 2 */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-red font-bold text-xs">
              <Flame className="w-4 h-4" />
              <span>Anomali Suhu CRITICAL</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Naikkan suhu ke -9.2°C untuk memicu alarm bahaya kompresor (&gt; -10°C).
            </p>
          </div>
          <button
            onClick={() => injectTemperatureAnomaly("BS-001", -9.2)}
            className="w-full bg-red hover:bg-red-700 text-white font-bold py-2 rounded-xl text-xs transition"
          >
            Trigger Suhu -9.2°C (Kritis)
          </button>
        </div>

        {/* Trigger 3 */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-teal font-bold text-xs">
              <Activity className="w-4 h-4" />
              <span>Manual Telemetry Tick</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Dorong satu siklus data MQTT baru seketika tanpa menunggu interval 15 detik.
            </p>
          </div>
          <button
            onClick={triggerSimulationTick}
            className="w-full bg-navy hover:bg-navy-800 text-white font-bold py-2 rounded-xl text-xs transition"
          >
            Kirim Tick Telemetri (+1)
          </button>
        </div>

        {/* Trigger 4 */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-700 font-bold text-xs">
              <RefreshCw className="w-4 h-4" />
              <span>Reset State Pitching</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Kembalikan seluruh parameter suhu (-18.4°C), baterai, dan notifikasi ke kondisi awal.
            </p>
          </div>
          <button
            onClick={resetSimulation}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 rounded-xl text-xs transition"
          >
            Reset Semua Data
          </button>
        </div>
      </div>

      {/* Live Simulation Monitor Status */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-teal-light font-mono">STATUS TELEMETRI UNIT BS-001 SEKARANG</span>
          <span className="text-[10px] font-mono text-slate-400">
            Total Siklus Tick: {simulation.tickCount}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-navy-800 p-3 rounded-xl border border-navy-700">
            <span className="text-slate-400 text-[10px] block">Suhu Terbaca:</span>
            <span className="text-xl font-bold font-mono text-teal">{bs1.currentTempC}°C</span>
          </div>
          <div className="bg-navy-800 p-3 rounded-xl border border-navy-700">
            <span className="text-slate-400 text-[10px] block">Produksi PV:</span>
            <span className="text-xl font-bold font-mono text-amber-400">{bs1.currentSolarKw} kW</span>
          </div>
          <div className="bg-navy-800 p-3 rounded-xl border border-navy-700">
            <span className="text-slate-400 text-[10px] block">Baterai:</span>
            <span className="text-xl font-bold font-mono text-teal">{bs1.currentBatteryPct}%</span>
          </div>
          <div className="bg-navy-800 p-3 rounded-xl border border-navy-700">
            <span className="text-slate-400 text-[10px] block">Status Unit:</span>
            <span className="text-xl font-bold uppercase font-mono text-green">{bs1.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
