import React from "react";
import Link from "next/link";
import { Sun, Battery, Cpu, ShieldCheck, ThermometerSnowflake, Zap, ArrowRight } from "lucide-react";

export default function SolutionPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-xs font-mono font-bold text-teal uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Solusi Terintegrasi
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight">
          Micro Cold Storage Solar-Hybrid
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Menggabungkan hardware pendingin berkapasitas 500–1.000 kg dengan PLTS atap, baterai LiFePO4 cerdas, dan platform operasi cloud.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-navy">Spesifikasi Teknis Unggulan</h2>
          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
              <Sun className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy block">PLTS Solar PV Monocrystalline 8.4 kWp</strong>
                <span className="text-slate-600">Menghasilkan daya mandiri 35–45 kWh per hari untuk menggerakkan kompresor inverter.</span>
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
              <Battery className="w-5 h-5 text-teal shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy block">Baterai LiFePO4 24 kWh dengan Smart BMS</strong>
                <span className="text-slate-600">Daya tahan siklus 6.000+ kali dengan perlindungan thermal runaway dan pemantauan per cell.</span>
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
              <ThermometerSnowflake className="w-5 h-5 text-ocean shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy block">Suhu Stabil -18°C s/d -22°C (Grade Ekspor)</strong>
                <span className="text-slate-600">Refrigeran ramah lingkungan R404A dengan insulasi termal Polyurethane 150mm.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-navy text-white p-6 rounded-3xl border border-navy-700 shadow-xl space-y-4">
          <span className="text-xs uppercase font-mono text-teal font-bold block">Keunggulan Operasional</span>
          <h3 className="text-xl font-bold">Mengapa Solar-Hybrid Lebih Unggul?</h3>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal shrink-0" />
              <span>Bebas biaya bahan bakar solar genset yang mahal di pulau terluar</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal shrink-0" />
              <span>Otomatis beralih ke grid PLN jika cuaca mendung ekstrem tanpa gangguan suhu</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal shrink-0" />
              <span>Instalasi modular cepat (Plug-and-Play) dalam 3 hari kerja</span>
            </li>
          </ul>

          <div className="pt-2">
            <Link
              href="/technology"
              className="inline-flex items-center gap-1.5 bg-teal hover:bg-teal-dark text-white text-xs font-bold py-2.5 px-4 rounded-xl transition"
            >
              <span>Arsitektur IoT & Sensor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
