import React from "react";
import Link from "next/link";
import { SDG_METRICS } from "@/lib/mock-data";
import { Globe2, ShieldCheck, TrendingUp, Sun, Fish, ArrowRight } from "lucide-react";

export default function ImpactPublicPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-xs font-mono font-bold text-teal uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Dampak Lingkungan & Sosial
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight">
          Menjaga Mutu Ikan, Menurunkan Emisi Karbon
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Setiap unit BlueSync yang terpasang berkontribusi nyata pada pengurangan susut pascapanen ikan dan pencapaian indikator SDGs nasional.
        </p>
      </div>

      {/* Aggregate Impact Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="text-3xl font-extrabold font-mono text-teal">2.560 kg</div>
          <div className="text-xs font-bold text-navy mt-1">Ikan Terselamatkan</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Dari risiko pembusukan</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="text-3xl font-extrabold font-mono text-ocean">Rp 192M+</div>
          <div className="text-xs font-bold text-navy mt-1">Nilai Ekonomi Terjaga</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Pendapatan nelayan pesisir</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="text-3xl font-extrabold font-mono text-green">1.045 kg</div>
          <div className="text-xs font-bold text-navy mt-1">Emisi CO2 Dihindari</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Berkat tenaga surya off-grid</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="text-3xl font-extrabold font-mono text-amber-500">59 Nelayan</div>
          <div className="text-xs font-bold text-navy mt-1">Penerima Manfaat Aktif</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Di 5 desa pesisir</div>
        </div>
      </div>

      {/* SDG Cards Grid */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy">Penyelarasan Indikator SDGs</h2>
          <p className="text-xs text-slate-500 mt-1">Target terukur PBB yang didukung langsung oleh arsitektur BlueSync</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SDG_METRICS.map((sdg) => (
            <div
              key={sdg.sdgNumber}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative overflow-hidden"
            >
              <div
                className="w-1.5 absolute left-0 top-0 bottom-0"
                style={{ backgroundColor: sdg.color }}
              />
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-mono font-bold px-2 py-0.5 rounded text-white"
                  style={{ backgroundColor: sdg.color }}
                >
                  SDG {sdg.sdgNumber}
                </span>
                <span className="text-xs font-bold text-slate-700 font-mono">
                  {sdg.currentValue} / {sdg.targetValue} {sdg.unit}
                </span>
              </div>
              <h4 className="font-bold text-navy text-sm">{sdg.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{sdg.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          href="/gov/sdg"
          className="inline-flex items-center gap-2 bg-navy hover:bg-navy-800 text-white font-bold px-6 py-3 rounded-xl text-xs transition shadow-md"
        >
          <span>Buka Dashboard SDGs Interaktif</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
