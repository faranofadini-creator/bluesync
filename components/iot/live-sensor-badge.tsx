"use client";

import React from "react";
import { Battery, Sun, Zap, Activity, ShieldCheck, AlertCircle, DoorClosed, DoorOpen, Radio } from "lucide-react";
import { Unit } from "@/lib/types";

interface LiveSensorBadgeProps {
  unit: Unit;
  showAll?: boolean;
}

export default function LiveSensorBadges({ unit, showAll = true }: LiveSensorBadgeProps) {
  const capacityPct = Math.round((unit.currentLoadKg / unit.capacityKg) * 100);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* 1. Battery Level */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 text-xs">
          <span>Baterai LiFePO4</span>
          <Battery className={`w-4 h-4 ${unit.currentBatteryPct < 20 ? "text-red-500 animate-pulse" : "text-teal"}`} />
        </div>
        <div className="mt-2">
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold font-mono text-navy">{unit.currentBatteryPct}%</span>
            <span className="text-[10px] text-slate-400">{unit.batteryCapacityKwh} kWh</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${
                unit.currentBatteryPct < 20 ? "bg-red-500" : unit.currentBatteryPct < 50 ? "bg-amber-500" : "bg-teal"
              }`}
              style={{ width: `${unit.currentBatteryPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Solar Generation */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 text-xs">
          <span>Daya Surya (PV)</span>
          <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />
        </div>
        <div className="mt-2">
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold font-mono text-amber-600">{unit.currentSolarKw} kW</span>
            <span className="text-[10px] text-slate-400">Maks {unit.solarCapacityKw} kW</span>
          </div>
          <div className="text-[10px] text-green font-medium flex items-center gap-1 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            100% Energi Bersih
          </div>
        </div>
      </div>

      {/* 3. Grid Status */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 text-xs">
          <span>PLN / Genset Backup</span>
          <Zap className={`w-4 h-4 ${unit.currentGridStatus === "active" ? "text-orange" : "text-slate-400"}`} />
        </div>
        <div className="mt-2">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
              unit.currentGridStatus === "active"
                ? "bg-orange-100 text-orange-800 border border-orange-300"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {unit.currentGridStatus === "active" ? "AKTIF (Backup)" : "STANDBY (0 Watt)"}
          </span>
          <div className="text-[10px] text-slate-400 mt-1">
            {unit.currentGridStatus === "active" ? "Mengisi dari Grid" : "Hemat Emisi Karbon"}
          </div>
        </div>
      </div>

      {/* 4. Storage Capacity */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 text-xs">
          <span>Okupansi Ruang</span>
          <Activity className="w-4 h-4 text-ocean" />
        </div>
        <div className="mt-2">
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold font-mono text-navy">{capacityPct}%</span>
            <span className="text-[10px] text-slate-400">{unit.currentLoadKg} / {unit.capacityKg} kg</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${
                capacityPct > 90 ? "bg-red-500" : capacityPct > 70 ? "bg-amber-500" : "bg-ocean"
              }`}
              style={{ width: `${capacityPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 5. Compressor Health */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 text-xs">
          <span>Kompresor Inverter</span>
          {unit.compressorOk ? (
            <ShieldCheck className="w-4 h-4 text-green" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 animate-bounce" />
          )}
        </div>
        <div className="mt-2">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
              unit.compressorOk ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {unit.compressorOk ? "NORMAL / RUNNING" : "ERROR / MACET"}
          </span>
          <div className="text-[10px] text-slate-400 mt-1">Refrigeran R404A OK</div>
        </div>
      </div>

      {/* 6. Door & Telemetry */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 text-xs">
          <span>Pintu & IoT Link</span>
          <Radio className="w-4 h-4 text-teal animate-pulse" />
        </div>
        <div className="mt-2">
          <div className="flex items-center gap-1">
            {unit.doorOpen ? (
              <span className="text-red-600 font-bold flex items-center gap-1 text-xs">
                <DoorOpen className="w-3.5 h-3.5" /> Terbuka
              </span>
            ) : (
              <span className="text-slate-700 font-semibold flex items-center gap-1 text-xs">
                <DoorClosed className="w-3.5 h-3.5 text-teal" /> Tertutup Rapat
              </span>
            )}
          </div>
          <div className="text-[10px] text-teal font-mono mt-1">MQTT Connected (12ms)</div>
        </div>
      </div>
    </div>
  );
}
