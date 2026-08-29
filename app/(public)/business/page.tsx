import React from "react";
import Link from "next/link";
import { DollarSign, ShieldCheck, TrendingUp, Building, ArrowRight, Check } from "lucide-react";

export default function BusinessModelPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-xs font-mono font-bold text-teal uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Model Bisnis Berkelanjutan
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight">
          Struktur Monetisasi & Revenue Multi-Stream
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          BlueSync dirancang dengan model ekonomi yang inklusif bagi nelayan, menguntungkan bagi BUMDes, dan menarik bagi investor CSR/Pemerintah.
        </p>
      </div>

      {/* 4 Revenue Streams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stream 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <span className="text-xs font-mono font-bold text-teal uppercase">Stream 1</span>
          <h3 className="text-lg font-bold text-navy">Pay-Per-Use Cold Storage (CSaaS)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tarif sewa harian fleksibel (Rp 3.000 – Rp 3.800 / kg / hari). Nelayan hanya membayar sesuai bobot dan durasi ikan yang disimpan tanpa biaya langganan bulanan yang membebani.
          </p>
          <div className="text-xs bg-slate-50 p-2.5 rounded-xl font-mono text-slate-700">
            Bagi hasil: 70% BUMDes Desa • 30% Platform & Pemeliharaan
          </div>
        </div>

        {/* Stream 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <span className="text-xs font-mono font-bold text-ocean uppercase">Stream 2</span>
          <h3 className="text-lg font-bold text-navy">Lease-to-Own Hardware Unit</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Koperasi atau BUMDes dapat memiliki unit fisik cold storage secara penuh melalui skema cicilan 36 bulan yang dibayarkan dari surplus pendapatan sewa.
          </p>
          <div className="text-xs bg-slate-50 p-2.5 rounded-xl font-mono text-slate-700">
            DP: 20% • Angsuran: ~Rp 4.1 Juta/bulan
          </div>
        </div>

        {/* Stream 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <span className="text-xs font-mono font-bold text-orange uppercase">Stream 3</span>
          <h3 className="text-lg font-bold text-navy">Marketplace Take-Rate Commission</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Komisi 3–5% atas setiap transaksi penjualan ikan segar terverifikasi cold chain antara nelayan dan pembeli korporat (hotel, restoran, eksportir).
          </p>
          <div className="text-xs bg-slate-50 p-2.5 rounded-xl font-mono text-slate-700">
            Take-Rate: 3.5% per volume transaksi sukses
          </div>
        </div>

        {/* Stream 4 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <span className="text-xs font-mono font-bold text-green uppercase">Stream 4</span>
          <h3 className="text-lg font-bold text-navy">SaaS Analytics & ESG Reporting</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Dashboard data telemetri, jejak karbon, dan pelaporan dampak berbasis SDGs untuk lembaga donor CSR, perbankan hijau, dan dinas kelautan pemda.
          </p>
          <div className="text-xs bg-slate-50 p-2.5 rounded-xl font-mono text-slate-700">
            Model: Annual ESG Subscription / CSR Grant Tier
          </div>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          href="/partners"
          className="inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white font-bold px-6 py-3 rounded-xl text-xs transition shadow-md"
        >
          <span>Ajukan Program Kemitraan Desa</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
