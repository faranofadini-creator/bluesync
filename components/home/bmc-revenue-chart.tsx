"use client";

import React, { useState } from "react";
import {
  DollarSign,
  PieChart as PieIcon,
  TrendingUp,
  Landmark,
  Building2,
  Users,
  Store,
  Layers,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function BmcRevenueChart() {
  const [activeTab, setActiveTab] = useState<"revenue" | "cost" | "market">("revenue");

  const revenueStreams = [
    {
      name: "Sewa Unit CSaaS (Ijarah)",
      pct: 40,
      color: "bg-teal",
      textColor: "text-teal-400",
      akad: "Akad Ijarah (Sewa Murni)",
      desc: "Ujrah/biaya sewa harian (Rp3.500/kg/hari) dari nelayan kecil tanpa kewajiban beli putus.",
    },
    {
      name: "Penjualan Unit (Murabahah)",
      pct: 25,
      color: "bg-ocean",
      textColor: "text-sky-400",
      akad: "Akad Murabahah (Jual Beli)",
      desc: "Penjualan unit penuh ke BUMDes/Koperasi dengan margin transparan 15% dari HPP.",
    },
    {
      name: "Lease-to-Own (IMBT)",
      pct: 20,
      color: "bg-indigo-500",
      textColor: "text-indigo-400",
      akad: "Ijarah Muntahiyah bit Tamlik",
      desc: "Cicilan sewa bulanan dengan peralihan kepemilikan unit di akhir periode kontrak sewa.",
    },
    {
      name: "Market Linkage (Samsarah)",
      pct: 10,
      color: "bg-orange",
      textColor: "text-orange-400",
      akad: "Akad Samsarah (Keagenan)",
      desc: "Komisi perantara mempertemukan batch ikan berkualitas nelayan dengan buyer resto premium.",
    },
    {
      name: "Hibah CSR / Qardhul Hasan",
      pct: 5,
      color: "bg-amber-500",
      textColor: "text-amber-400",
      akad: "Qardhul Hasan / Hibah",
      desc: "Pendanaan sosial non-profit untuk subsidi unit di pulau terluar berpenghasilan rendah.",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-ocean bg-ocean/10 px-2.5 py-0.5 rounded">
            BUSINESS MODEL CANVAS (BMC) • TIM CHOBA CHUBI UNAIR
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-navy mt-1">
            Arsitektur Finansial & Potensi Pasar BlueSync
          </h3>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
          {[
            { id: "revenue", label: "Arus Pendapatan (Revenue)" },
            { id: "cost", label: "Struktur Biaya (CapEx/OpEx)" },
            { id: "market", label: "Ukuran Pasar (TAM/SAM/SOM)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === tab.id
                  ? "bg-navy text-white shadow-sm"
                  : "text-slate-600 hover:text-navy hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Revenue Streams Breakdown */}
      {activeTab === "revenue" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visual Multi-Segment Bar */}
            <div className="lg:col-span-12 space-y-2">
              <div className="h-5 w-full rounded-full overflow-hidden flex shadow-inner bg-slate-100">
                {revenueStreams.map((r) => (
                  <div
                    key={r.name}
                    className={`${r.color} h-full transition-all duration-500`}
                    style={{ width: `${r.pct}%` }}
                    title={`${r.name}: ${r.pct}%`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap justify-between text-[11px] font-mono text-slate-500 px-1">
                <span>CSaaS 40%</span>
                <span>Murabahah 25%</span>
                <span>Lease-to-Own 20%</span>
                <span>Samsarah 10%</span>
                <span>CSR 5%</span>
              </div>
            </div>

            {/* 4 Cards of Revenue Details */}
            <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {revenueStreams.slice(0, 4).map((item) => (
                <div
                  key={item.name}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
                        {item.akad}
                      </span>
                      <span className={`text-base font-extrabold font-mono ${item.textColor}`}>
                        {item.pct}%
                      </span>
                    </div>
                    <h4 className="font-bold text-navy text-sm">{item.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-teal font-semibold">
                    ✓ Kepatuhan Syariah Teruji
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Cost Structure (CapEx & OpEx) */}
      {activeTab === "cost" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CapEx */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-navy text-sm flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-ocean" />
                <span>Capital Expenditure (CapEx)</span>
              </h4>
              <span className="text-[10px] font-mono bg-ocean/10 text-ocean font-bold px-2 py-0.5 rounded">
                Investasi Alat
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { label: "Peralatan Produksi & Fabrikasi Workshop", val: "37%" },
                { label: "Legalitas, R&D & Sertifikasi Standar", val: "37%" },
                { label: "Mesin Jig & Perakitan Modular", val: "12%" },
                { label: "Alat Kit Instalasi Lapangan Pesisir", val: "8%" },
                { label: "Peralatan Kantor & Administrasi", val: "6%" },
              ].map((c) => (
                <div key={c.label} className="flex justify-between items-center p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-600">{c.label}</span>
                  <strong className="font-mono text-navy">{c.val}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* OpEx */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-navy text-sm flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-teal" />
                <span>Operational Expenditure (OpEx)</span>
              </h4>
              <span className="text-[10px] font-mono bg-teal-50 text-teal font-bold px-2 py-0.5 rounded">
                Biaya Rutin
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { label: "Produksi Unit Cold Storage (Panel, Baterai, SS304)", val: "71%" },
                { label: "SDM & Tim Operasional (Gaji Karyawan)", val: "18%" },
                { label: "Sewa Tempat & Logistik Pesisir", val: "7%" },
                { label: "Pemasaran & Operasional Lain-lain", val: "4%" },
              ].map((o) => (
                <div key={o.label} className="flex justify-between items-center p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-600">{o.label}</span>
                  <strong className="font-mono text-teal">{o.val}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Market Size (TAM, SAM, SOM) */}
      {activeTab === "market" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-b from-navy to-navy-900 text-white p-6 rounded-2xl space-y-2 text-center">
            <span className="text-[10px] font-mono font-bold uppercase text-teal-light">
              TOTAL ADDRESSABLE MARKET (TAM)
            </span>
            <div className="text-3xl font-extrabold font-mono text-white mt-1">
              Rp 1.655 T
            </div>
            <div className="text-xs text-slate-300 font-medium">± 15 Juta Unit Cold Storage</div>
            <p className="text-[11px] text-slate-400 pt-2 border-t border-navy-700 leading-relaxed">
              Total estimasi kebutuhan cold storage perikanan nasional berdasarkan data tangkapan laut KKP RI (18,45 juta ton/tahun).
            </p>
          </div>

          <div className="bg-teal-50 p-6 rounded-2xl border border-teal-200 space-y-2 text-center text-navy">
            <span className="text-[10px] font-mono font-bold uppercase text-teal-800">
              SERVICEABLE AVAILABLE MARKET (SAM)
            </span>
            <div className="text-3xl font-extrabold font-mono text-teal mt-1">
              Rp 408,75 T
            </div>
            <div className="text-xs text-slate-600 font-medium">± 3,75 Juta Unit Pesisir</div>
            <p className="text-[11px] text-slate-600 pt-2 border-t border-teal-200 leading-relaxed">
              Fokus pada 25% wilayah pesisir Indonesia berpotensi perikanan tinggi namun minim akses kelistrikan grid PLN.
            </p>
          </div>

          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 space-y-2 text-center text-navy">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-800">
              SERVICEABLE OBTAINABLE MARKET (SOM)
            </span>
            <div className="text-3xl font-extrabold font-mono text-amber-600 mt-1">
              Rp 204,4 M
            </div>
            <div className="text-xs text-slate-600 font-medium">± 1.875 Unit (Target 3 Tahun)</div>
            <p className="text-[11px] text-slate-600 pt-2 border-t border-amber-200 leading-relaxed">
              Target penetrasi 3 tahun pertama melalui kemitraan BUMDes & Program Kampung Nelayan Maju (KNMP) KKP RI.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
