import React from "react";
import Link from "next/link";
import { Sun, Battery, ShieldCheck, ThermometerSnowflake, Zap, ArrowRight, Activity, Radio } from "lucide-react";

export default function TechnologyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-xs font-mono font-bold text-teal uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Inovasi & Rekayasa Teknik
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight">
          Teknologi Pendingin Surya Pesisir
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Mengintegrasikan pembangkit listrik tenaga surya off-grid, baterai LiFePO4 cerdas, dan insulasi termal canggih untuk ketahanan operasional tinggi di pulau terluar.
        </p>
      </div>

      {/* Clean Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Sun className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-navy">Pembangkit Listrik Tenaga Surya (PLTS 8.4 kWp)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Menggunakan panel surya Monocrystalline berefisiensi tinggi dengan teknologi anti-korosi air laut (marine-grade coating) yang mampu menghasilkan daya mandiri 35–45 kWh per hari.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal flex items-center justify-center">
            <Battery className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-navy">Baterai LiFePO4 24 kWh & Smart BMS</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Penyimpan energi berbasis Lithium Iron Phosphate dengan siklus hidup hingga 6.000+ kali pengisian dan sistem Battery Management System (BMS) untuk proteksi suhu dan voltase.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-ocean/10 text-ocean flex items-center justify-center">
            <ThermometerSnowflake className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-navy">Insulasi Termal Polyurethane & Phase Change Material</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Dinding panel insulasi PU tebal 150mm dipadukan dengan PCM (Phase Change Material) yang mampu mempertahankan temperatur -18°C hingga 16 jam meskipun tanpa pasokan listrik.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-green-100 text-green flex items-center justify-center">
            <Radio className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-navy">Telemetri & Pemantauan Cloud Otomatis</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Sensor suhu dan kelistrikan terhubung secara otomatis ke platform cloud, memberikan notifikasi seketika kepada operator desa bila terdeteksi potensi anomali suhu.
          </p>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          href="/how-it-works"
          className="inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white font-bold px-6 py-3 rounded-xl text-xs transition shadow-md"
        >
          <span>Pelajari Alur Kerja Sistem</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}