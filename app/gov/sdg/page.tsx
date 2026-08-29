"use client";

import React from "react";
import { SDG_METRICS } from "@/lib/mock-data";
import { Award, ShieldCheck, TrendingUp, CheckCircle2 } from "lucide-react";

export default function SDGDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
        <h2 className="text-xl font-bold text-navy">Pencapaian Indikator Sustainable Development Goals (SDGs)</h2>
        <p className="text-xs text-slate-500">
          Metrik keberlanjutan yang terisi 100% otomatis dari data telemetri IoT dan transaksi operasional cold storage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SDG_METRICS.map((sdg) => {
          const progressPct = Math.min(100, Math.round((sdg.currentValue / sdg.targetValue) * 100));

          return (
            <div
              key={sdg.sdgNumber}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl text-white font-black flex items-center justify-center text-sm shadow-md"
                    style={{ backgroundColor: sdg.color }}
                  >
                    {sdg.sdgNumber}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                    {progressPct}% Target
                  </span>
                </div>

                <h3 className="font-bold text-navy text-base">{sdg.title}</h3>
                <div className="text-xs text-slate-500 font-medium">{sdg.tagline}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{sdg.description}</p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500">Realisasi:</span>
                  <span className="font-bold text-navy">
                    {sdg.currentValue} / {sdg.targetValue} {sdg.unit}
                  </span>
                </div>

                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${progressPct}%`,
                      backgroundColor: sdg.color,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
