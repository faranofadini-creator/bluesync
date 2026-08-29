"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import TemperatureGauge from "@/components/iot/temperature-gauge";
import LiveSensorBadges from "@/components/iot/live-sensor-badge";
import {
  TemperatureHistoryChart,
  SolarGenerationChart,
} from "@/components/charts/telemetry-charts";
import {
  Activity,
  AlertTriangle,
  Sun,
  Battery,
  Zap,
  ShieldCheck,
  Radio,
  Sliders,
} from "lucide-react";

export default function UnitMonitorPage() {
  const params = useParams();
  const unitId = (params?.id as string) || "unit-01";
  const { units, injectTemperatureAnomaly, resetSimulation } = useBlueSyncStore();

  const unit = units.find((u) => u.id === unitId || u.code === unitId) || units[0];

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase bg-navy text-white px-2 py-0.5 rounded">
              UNIT ID: {unit.code}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {unit.locationName}, {unit.province}
            </span>
          </div>
          <h2 className="text-xl font-bold text-navy mt-1">{unit.name}</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => injectTemperatureAnomaly(unit.code, -14.6)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center gap-1.5 transition shadow-sm"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Simulasi Anomali Suhu (-14.6°C)</span>
          </button>
          <button
            onClick={resetSimulation}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-3 rounded-xl text-xs transition"
          >
            Reset
          </button>
        </div>
      </div>

      <LiveSensorBadges unit={unit} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-4">
          <TemperatureGauge temperatureC={unit.currentTempC} unitCode={unit.code} size="lg" />

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs">
            <h4 className="font-bold text-navy border-b border-slate-100 pb-2">
              Parameter Kontrol Refrigerasi
            </h4>
            <div className="flex justify-between text-slate-600">
              <span>Set Point Target:</span>
              <span className="font-mono font-bold text-navy">-18.0°C</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Batas Toleransi Alarm:</span>
              <span className="font-mono font-bold text-amber-600">&gt; -15.0°C</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Ambang Kritis:</span>
              <span className="font-mono font-bold text-red">&gt; -10.0°C</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Kapasitas Muatan:</span>
              <span className="font-mono font-bold text-navy">{unit.currentLoadKg} / {unit.capacityKg} kg</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <TemperatureHistoryChart currentTemp={unit.currentTempC} />
          <SolarGenerationChart />
        </div>
      </div>
    </div>
  );
}