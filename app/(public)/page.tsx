"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import TemperatureGauge from "@/components/iot/temperature-gauge";
import LiveSensorBadges from "@/components/iot/live-sensor-badge";
import { formatRupiah } from "@/lib/utils";
import {
  Anchor,
  Sun,
  ShieldCheck,
  Zap,
  Fish,
  TrendingUp,
  MapPin,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users,
  Building2,
  Globe2,
  Sliders,
  DollarSign,
  QrCode,
} from "lucide-react";

export default function HomePage() {
  const { units, species, currentUser, switchUser } = useBlueSyncStore();
  const bs1 = units.find((u) => u.code === "BS-001") || units[0];

  // Interactive Tariff & Savings Calculator State
  const [calcWeight, setCalcWeight] = useState<number>(100);
  const [calcDays, setCalcDays] = useState<number>(4);
  const [calcSpeciesId, setCalcSpeciesId] = useState<string>("sp-01");

  const selSpecies = species.find((s) => s.id === calcSpeciesId) || species[0];
  const storageCost = calcWeight * calcDays * 3500;
  // Without cold storage: 28% spoiled or sold at 35% discount
  const normalSellingPrice = calcWeight * selSpecies.avgMarketPriceRp;
  const spoiledLossRp = normalSellingPrice * 0.28;
  const premiumGainRp = normalSellingPrice * 0.15; // 15% fresh price premium
  const netBenefitRp = spoiledLossRp + premiumGainRp - storageCost;

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy via-navy to-navy-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-navy-800">
        {/* Glow ambient effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-ocean/20 blur-[90px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero Headline & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-navy-800/90 border border-teal/40 text-teal-light px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-inner">
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <span>Solar-Hybrid Micro Cold Storage Ecosystem</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                Keep the Catch Fresh. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-light via-teal to-ocean-light">
                  Empower the Coast.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Platform digital desentralisasi cold chain berbasis energi surya untuk nelayan kecil, pengelola BUMDes,
                dan pembeli ikan di seluruh pesisir Indonesia. Mencegah 25%+ pembusukan hasil tangkapan.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/dashboard/booking"
                  className="bg-teal hover:bg-teal-dark text-white font-bold px-6 py-3.5 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-teal/30 hover:scale-105 transition-all"
                >
                  <Fish className="w-4 h-4" />
                  <span>Sewa Cold Storage (Pay-Per-Use)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/market"
                  className="bg-navy-800 hover:bg-navy-700 text-white font-bold px-5 py-3.5 rounded-xl text-sm border border-slate-700 flex items-center gap-2 transition"
                >
                  <QrCode className="w-4 h-4 text-teal" />
                  <span>Jelajahi Ikan Terverifikasi</span>
                </Link>
              </div>

              {/* Key Trust Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-navy-800/80">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-teal font-mono">↓ 25%</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Post-Harvest Loss</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">↑ 15%</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Pendapatan Nelayan</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-green font-mono">100%</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Solar PV Off-Grid</div>
                </div>
              </div>
            </div>

            {/* Right Col: Live Interactive Telemetry Card (Hero Preview) */}
            <div className="lg:col-span-5">
              <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-100 relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse" />
                    <span className="font-bold text-xs text-navy uppercase font-mono">
                      LIVE IoT NODE • {bs1.code}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {bs1.locationName}
                  </span>
                </div>

                <div className="py-2">
                  <TemperatureGauge temperatureC={bs1.currentTempC} unitCode={bs1.code} size="md" />
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-slate-400 text-[10px] block font-medium">Daya Solar PV:</span>
                    <span className="text-base font-bold font-mono text-amber-600">
                      {bs1.currentSolarKw} kW
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-slate-400 text-[10px] block font-medium">Baterai LiFePO4:</span>
                    <span className="text-base font-bold font-mono text-teal">
                      {bs1.currentBatteryPct}%
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    href={`/operator/units/${bs1.id}`}
                    className="w-full bg-navy hover:bg-navy-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Buka Telemetri Sensor Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REAL-TIME FLEET TELEMETRY OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
          <div>
            <span className="text-xs font-mono font-bold text-teal uppercase tracking-wider">
              Infrastruktur Terkoneksi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mt-1">
              Armada Micro Cold Storage Solar-Hybrid
            </h2>
          </div>
          <Link
            href="/operator"
            className="text-xs font-bold text-ocean hover:text-teal flex items-center gap-1"
          >
            <span>Masuk Dashboard Operator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <LiveSensorBadges unit={bs1} />
      </section>

      {/* 3. VALUE PROPOSITIONS & PROBLEM SOLVED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold text-teal uppercase tracking-wider">
            Solusi Menyeluruh 4 Aktor
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mt-1">
            Mengubah Setiap Cold Storage Menjadi Node Digital Terpadu
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            BlueSync mengatasi kendala klasik rantai pasok perikanan tangkap di daerah terpencil:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Nelayan */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal flex items-center justify-center mb-4">
              <Fish className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-navy text-base">Nelayan Kecil</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Tidak lagi terpaksa menjual murah ke pengepul saat panen raya. Sewa kapasitas harian mulai Rp 3.500/kg/hari.
            </p>
            <Link
              href="/dashboard"
              onClick={() => switchUser("user-nelayan-anto")}
              className="inline-flex items-center gap-1 text-xs font-bold text-teal mt-4 hover:underline"
            >
              <span>Portal Nelayan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: BUMDes */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-ocean/10 text-ocean flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-navy text-base">BUMDes / Koperasi</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Memiliki unit produktif dengan skema Lease-to-Own. Pendapatan sewa harian + komisi marketplace desa.
            </p>
            <Link
              href="/operator"
              onClick={() => switchUser("user-operator-budi")}
              className="inline-flex items-center gap-1 text-xs font-bold text-ocean mt-4 hover:underline"
            >
              <span>Portal Operator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Buyer */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-orange/10 text-orange flex items-center justify-center mb-4">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-navy text-base">Buyer & Restoran</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Beli langsung ikan segar berkualitas ekspor dengan bukti keterlacakan suhu dingin (QR Traceability).
            </p>
            <Link
              href="/market"
              onClick={() => switchUser("user-buyer-citra")}
              className="inline-flex items-center gap-1 text-xs font-bold text-orange mt-4 hover:underline"
            >
              <span>Marketplace Ikan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: Pemerintah / CSR */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green flex items-center justify-center mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-navy text-base">Pemerintah & CSR</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Transparansi dampak program bantuan secara real-time. Metrik emisi karbon, ekonomi, dan SDGs otomatis.
            </p>
            <Link
              href="/gov"
              onClick={() => switchUser("user-gov-hendra")}
              className="inline-flex items-center gap-1 text-xs font-bold text-green mt-4 hover:underline"
            >
              <span>Dashboard Dampak</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE SIMULATOR / CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-tr from-navy-900 to-navy text-white rounded-3xl p-6 sm:p-10 border border-navy-700 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col: Controls */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 bg-teal/20 text-teal-light px-3 py-1 rounded-full text-xs font-bold font-mono">
                <Sliders className="w-3.5 h-3.5" />
                <span>Simulasi Keuntungan Nelayan</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Hitung Manfaat Finansial Cold Storage
              </h3>
              <p className="text-xs text-slate-300">
                Geser parameter di bawah untuk melihat perbandingan hasil penjualan dengan vs tanpa pendingin BlueSync:
              </p>

              <div className="space-y-4 pt-2">
                {/* Species */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Jenis Ikan Tangkapan:
                  </label>
                  <select
                    value={calcSpeciesId}
                    onChange={(e) => setCalcSpeciesId(e.target.value)}
                    className="w-full bg-navy-800 border border-navy-600 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-teal"
                  >
                    {species.map((sp) => (
                      <option key={sp.id} value={sp.id}>
                        {sp.icon} {sp.name} ({formatRupiah(sp.avgMarketPriceRp)}/kg)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Weight Slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Berat Tangkapan:</span>
                    <span className="text-teal font-mono">{calcWeight} kg</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={500}
                    step={10}
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(Number(e.target.value))}
                    className="w-full accent-teal h-2 bg-navy-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Duration Slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Durasi Penyimpanan:</span>
                    <span className="text-teal font-mono">{calcDays} Hari</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={calcDays}
                    onChange={(e) => setCalcDays(Number(e.target.value))}
                    className="w-full accent-teal h-2 bg-navy-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Right Col: Calculation Output Box */}
            <div className="lg:col-span-6 bg-navy-800/80 rounded-2xl p-6 border border-navy-600 space-y-4">
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                Estimasi Hasil Finansial
              </div>

              <div className="space-y-2.5 text-xs border-b border-navy-700 pb-4">
                <div className="flex justify-between text-slate-300">
                  <span>Nilai Ikan Terselamatkan (Anti-Busuk):</span>
                  <span className="font-mono font-bold text-green">+{formatRupiah(spoiledLossRp)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Premi Harga Jual Segar (+15%):</span>
                  <span className="font-mono font-bold text-teal-light">+{formatRupiah(premiumGainRp)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Biaya Sewa Cold Storage:</span>
                  <span className="font-mono text-orange">-{formatRupiah(storageCost)}</span>
                </div>
              </div>

              <div className="pt-1">
                <span className="text-xs text-slate-300 block font-medium">
                  Keuntungan Bersih Tambahan Nelayan:
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-400 mt-1">
                  +{formatRupiah(netBenefitRp)}
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Dibandingkan jika langsung menjual rugi pada tengkulak di tepi pantai.
                </span>
              </div>

              <Link
                href="/dashboard/booking"
                className="w-full bg-teal hover:bg-teal-dark text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <span>Pesan Slot Penyimpanan Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}