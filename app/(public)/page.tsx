"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import TemperatureGauge from "@/components/iot/temperature-gauge";
import LiveSensorBadges from "@/components/iot/live-sensor-badge";
import SimplifiedWorkflow from "@/components/home/simplified-workflow";
import LogoPhilosophyModal from "@/components/home/logo-philosophy-modal";
import { formatRupiah } from "@/lib/utils";
import {
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
  Layers,
  AlertTriangle,
  Send,
  Check,
  FileText,
  Calendar,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function HomePage() {
  const { units, species, currentUser, addNotification } = useBlueSyncStore();
  const bs1 = units.find((u) => u.code === "BS-001") || units[0];

  // Modals & Accordions
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("spec");

  // Partnership Form State
  const [partnerForm, setPartnerForm] = useState({
    orgName: "",
    location: "",
    contact: "",
    unitCount: 1,
    scheme: "pay_per_use",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Interactive Tariff & Savings Calculator State
  const [calcWeight, setCalcWeight] = useState<number>(100);
  const [calcDays, setCalcDays] = useState<number>(4);
  const [calcSpeciesId, setCalcSpeciesId] = useState<string>("sp-01");

  const selSpecies = species.find((s) => s.id === calcSpeciesId) || species[0];
  const storageCost = calcWeight * calcDays * 3500;
  // Without cold storage: 28% spoiled or sold at steep discount
  const normalSellingPrice = calcWeight * selSpecies.avgMarketPriceRp;
  const spoiledLossRp = normalSellingPrice * 0.28;
  const premiumGainRp = normalSellingPrice * 0.15; // 15% fresh price premium
  const netBenefitRp = spoiledLossRp + premiumGainRp - storageCost;

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.orgName || !partnerForm.contact) return;

    addNotification({
      type: "system",
      title: `🤝 Permohonan Kemitraan Baru: ${partnerForm.orgName}`,
      body: `Lokasi: ${partnerForm.location || "Pesisir"}, Kebutuhan: ${partnerForm.unitCount} Unit (${partnerForm.scheme}). Kontak: ${partnerForm.contact}`,
      severity: "info",
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setPartnerForm({
        orgName: "",
        location: "",
        contact: "",
        unitCount: 1,
        scheme: "pay_per_use",
      });
    }, 4000);
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION (PRD Section 2.2) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy via-navy to-navy-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-navy-800">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-ocean/20 blur-[90px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero Headline & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge with Logo Trigger */}
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <button
                  onClick={() => setIsLogoModalOpen(true)}
                  className="bg-navy-800/95 border border-teal/40 hover:border-teal text-teal-light px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-inner flex items-center gap-2 transition hover:scale-105"
                >
                  <img
                    src="/bluesync-logo.png"
                    alt="Logo BlueSync"
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>Filosofi & Relevansi Logo</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </button>

                <span className="hidden sm:inline-block bg-teal/20 text-teal-light text-[11px] font-mono px-3 py-1 rounded-full border border-teal/30">
                  Universitas Airlangga Innovation
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
                Solusi Cold Storage Bertenaga Surya untuk Nelayan Pesisir
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Mengurangi Post-Harvest Loss 20–30%, Mengamankan Kualitas Hasil Tangkapan Laut, dan Meningkatkan Kesejahteraan Komunitas Pesisir Nusantara.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
                <a
                  href="#kemitraan"
                  className="bg-teal hover:bg-teal-dark text-white font-bold px-6 py-3.5 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-teal/30 hover:scale-105 transition-all"
                >
                  <span>Mulai Kemitraan</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  href="/dashboard/booking"
                  className="bg-navy-800 hover:bg-navy-700 text-white font-bold px-5 py-3.5 rounded-xl text-sm border border-slate-700 flex items-center gap-2 transition"
                >
                  <Fish className="w-4 h-4 text-teal" />
                  <span>Sewa Pay-Per-Use</span>
                </Link>

                <Link
                  href="/market"
                  className="bg-navy-900/90 hover:bg-navy-800 text-slate-300 hover:text-white font-semibold px-4 py-3.5 rounded-xl text-sm border border-slate-800 flex items-center gap-2 transition"
                >
                  <QrCode className="w-4 h-4 text-ocean-light" />
                  <span>Pasar Ikan Terverifikasi</span>
                </Link>
              </div>

              {/* Key Trust Stats (PRD Section 4) */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-navy-800/80">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-teal font-mono">↓ 20–30%</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Post-Harvest Loss</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">Rp 60+ T</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Potensi Hemat/Thn</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">1.000+</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Target Nelayan Thn 1</div>
                </div>
              </div>
            </div>

            {/* Right Col: Live IoT Telemetry Simulator Preview */}
            <div className="lg:col-span-5">
              <div className="bg-navy-800/90 rounded-3xl p-6 border-2 border-teal/40 shadow-2xl backdrop-blur-sm space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-navy-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal animate-ping" />
                    <span className="text-xs font-mono font-bold text-teal-light">
                      LIVE IOT COCKPIT TELEMETRY
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-navy-900 px-2 py-0.5 rounded">
                    UNIT BS-001 • DESA MUARA BARU
                  </span>
                </div>

                <TemperatureGauge temperatureC={bs1.currentTempC} unitCode={bs1.code} size="md" />

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2">
                  <div className="bg-navy-900/90 p-3 rounded-xl border border-navy-700">
                    <span className="text-[10px] text-slate-400 block">Daya Surya (Solar PV):</span>
                    <span className="text-amber-400 font-bold text-sm">
                      {bs1.currentSolarKw.toFixed(1)} kW (Peak 8.4 kW)
                    </span>
                  </div>
                  <div className="bg-navy-900/90 p-3 rounded-xl border border-navy-700">
                    <span className="text-[10px] text-slate-400 block">Baterai LiFePO4:</span>
                    <span className="text-green-400 font-bold text-sm">
                      {bs1.currentBatteryPct.toFixed(0)}% (10 kWh BESS)
                    </span>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <Link
                    href="/admin/demo"
                    className="inline-flex items-center gap-1.5 text-xs text-teal-light hover:underline font-semibold"
                  >
                    <span>Buka Panel Simulasi Interaktif & Injeksi Anomali →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* 2. PROBLEM STATEMENT SECTION (PRD Section 2.3) */}
        <section id="masalah" className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red bg-red-50 px-3 py-1 rounded-full border border-red-200">
              TANTANGAN NYATA SEKTOR PERIKANAN
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Tingginya Post-Harvest Loss dan Keterbatasan Rantai Dingin
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Berdasarkan data Kertas Kerja JP2GI (2021) dan KKP RI, hampir sepertiga hasil tangkapan laut Indonesia tidak dapat dimanfaatkan secara optimal karena lemahnya fasilitas pendingin di pesisir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red flex items-center justify-center font-black text-xl">
                20-30%
              </div>
              <h3 className="font-bold text-navy text-base">Susut Pascapanen Tinggi</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hampir 1/3 ikan segar mengalami penurunan kualitas sebelum sampai ke pasar atau konsumen akhir.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-black text-lg">
                Rp 82 T
              </div>
              <h3 className="font-bold text-navy text-base">Potensi Kerugian Ekonomi</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rp63,3 – 82,8 triliun nilai ekonomi perikanan hilang setiap tahun akibat ketidaksiapan infrastruktur rantai dingin.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-ocean flex items-center justify-center font-black text-xl">
                ⚡ Krisis
              </div>
              <h3 className="font-bold text-navy text-base">Akses Listrik Terbatas</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Banyak PPI dan desa nelayan di pulau terpencil belum terjangkau listrik PLN 24 jam yang stabil.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xl">
                🔗 Terikat
              </div>
              <h3 className="font-bold text-navy text-base">Jerat Tengkulak Lokal</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nelayan terpaksa menjual tangkapan murah karena tidak memiliki tempat penyimpanan dingin mandiri.
              </p>
            </div>
          </div>
        </section>

        {/* 3. SOLUTION OVERVIEW SECTION (PRD Section 2.4 - 4 Modular Cards) */}
        <section id="solusi" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              SOLUSI BLUESYNC
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Smart Cold Chain Ecosystem Desentralisasi
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Empat pilar keunggulan micro cold storage ramah lingkungan berkapasitas 500–1.000 kg:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Teknologi */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-teal shadow-sm hover:shadow-lg transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
                  <Sun className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-navy text-base">1. Teknologi Solar-Hybrid</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kombinasi Panel Surya 4.000 Wp + Baterai LiFePO4 10 kWh + Grid PLN otomatis. Tetap dingin 24 jam walau tanpa listrik jaringan.
                </p>
              </div>
              <div className="text-[11px] font-mono text-teal font-bold pt-3 border-t border-slate-100">
                ✓ 100% Zero Fuel Emission
              </div>
            </div>

            {/* Card 2: Aksesibilitas */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-teal shadow-sm hover:shadow-lg transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-navy text-base">2. Model CSaaS Terjangkau</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Skema <em>Pay-Per-Use</em> harian untuk nelayan (Rp3.500/kg/hari) dan <em>Lease-to-Own</em> untuk BUMDes tanpa beban investasi awal tinggi.
                </p>
              </div>
              <div className="text-[11px] font-mono text-teal font-bold pt-3 border-t border-slate-100">
                ✓ Akad Syariah Bebas Riba
              </div>
            </div>

            {/* Card 3: Durabilitas */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-teal shadow-sm hover:shadow-lg transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-ocean/10 text-ocean flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-navy text-base">3. Durabilitas Pesisir</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Rangka dan bodi stainless steel food-grade 304 anti-korosi air laut dengan panel insulasi polyurethane tebal 100mm.
                </p>
              </div>
              <div className="text-[11px] font-mono text-teal font-bold pt-3 border-t border-slate-100">
                ✓ Standar Kelautan Tropis
              </div>
            </div>

            {/* Card 4: Monitoring */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-teal shadow-sm hover:shadow-lg transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-navy text-base">4. IoT & QR Traceability</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sensor digital mencatat telemetri suhu dan menerbitkan QR Code untuk memverifikasi mutu ikan segar sampai ke tangan konsumen.
                </p>
              </div>
              <div className="text-[11px] font-mono text-teal font-bold pt-3 border-t border-slate-100">
                ✓ Kestabilan Suhu Terjamin
              </div>
            </div>
          </div>
        </section>

        {/* 4. WORKFLOW VISUALIZATION (PRD Section 3 - CENTERPIECE) */}
        <section id="workflow">
          <SimplifiedWorkflow />
        </section>

        {/* 5. INTERACTIVE TARIFF & VALUE CALCULATOR */}
        <section className="bg-gradient-to-br from-navy via-navy to-ocean text-white p-6 sm:p-10 rounded-3xl shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-teal-light bg-teal/20 px-3 py-1 rounded-full border border-teal/40">
              SIMULATOR KEUNTUNGAN NELAYAN
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Hitung Penghematan & Peningkatan Pendapatan
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Bandingkan hasil penjualan dengan cold storage BlueSync vs tanpa cold storage:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col: Sliders */}
            <div className="lg:col-span-6 space-y-5 bg-navy-800/80 p-6 rounded-2xl border border-navy-700">
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-300">
                  Pilih Spesies Komoditas Ikan:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {species.map((sp) => (
                    <button
                      key={sp.id}
                      onClick={() => setCalcSpeciesId(sp.id)}
                      className={`p-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                        calcSpeciesId === sp.id
                          ? "bg-teal text-white shadow-md ring-2 ring-teal-light"
                          : "bg-navy-900 text-slate-300 hover:bg-navy-700"
                      }`}
                    >
                      <span>{sp.icon}</span>
                      <span className="truncate">{sp.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span className="text-slate-300">Bobot Tangkapan:</span>
                  <span className="text-teal-light font-mono text-base">{calcWeight} kg</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={500}
                  step={10}
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(Number(e.target.value))}
                  className="w-full accent-teal h-2 bg-navy-900 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span className="text-slate-300">Durasi Penyimpanan:</span>
                  <span className="text-teal-light font-mono text-base">{calcDays} Hari</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={selSpecies.maxStorageDays}
                  value={calcDays}
                  onChange={(e) => setCalcDays(Number(e.target.value))}
                  className="w-full accent-teal h-2 bg-navy-900 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Right Col: Benefit Result Card */}
            <div className="lg:col-span-6 bg-slate-900/90 p-6 rounded-2xl border border-teal/40 space-y-4 text-xs">
              <h3 className="font-extrabold text-sm text-teal-light border-b border-navy-700 pb-2">
                Analisis Finansial Nilai Tambah
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Nilai Pasar Normal:</span>
                  <span className="font-mono font-bold text-white">{formatRupiah(normalSellingPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kerugian Susut Dihindari (28%):</span>
                  <span className="font-mono text-green-400 font-bold">+{formatRupiah(spoiledLossRp)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Premi Harga Ikan Segar Grade A (+15%):</span>
                  <span className="font-mono text-amber-400 font-bold">+{formatRupiah(premiumGainRp)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Biaya Sewa Cold Storage:</span>
                  <span className="font-mono text-red-400 font-bold">-{formatRupiah(storageCost)}</span>
                </div>
              </div>

              <div className="bg-teal/20 p-4 rounded-xl border border-teal/40 flex justify-between items-baseline pt-3">
                <div>
                  <span className="text-[10px] text-teal-light block uppercase font-bold">
                    Net Keuntungan Bersih Tambahan:
                  </span>
                  <span className="text-2xl font-black font-mono text-teal-light">
                    {formatRupiah(Math.max(0, netBenefitRp))}
                  </span>
                </div>
                <Link
                  href="/dashboard/booking"
                  className="bg-teal hover:bg-teal-dark text-white font-bold py-2 px-3 rounded-lg text-xs transition"
                >
                  Pesan Slot →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6. TIMELINE & ROADMAP (PRD Section 6) */}
        <section id="roadmap" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-ocean bg-ocean/10 px-3 py-1 rounded-full border border-ocean/20">
              TIMELINE & STRATEGI EKSPANSI
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Rencana Implementasi 12 Bulan (3 Fase)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Peta jalan pengembangan bertahap dari validasi pilot hingga replikasi nasional:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phase 1 */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-teal text-white font-mono text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                Bulan 1–3
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-teal">FASE 1</span>
              <h3 className="text-lg font-bold text-navy">Pilot Testing & Validasi</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span>Penempatan 2 unit percontohan di sentra PPI Jawa Timur & Jakarta.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span>Validasi performa sensor IoT & sistem baterai LiFePO4.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span>Pelatihan intensif 10 operator BUMDes perdana.</span>
                </li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="bg-white p-6 rounded-3xl border-2 border-teal shadow-md space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-navy text-white font-mono text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                Bulan 4–8
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-ocean">FASE 2</span>
              <h3 className="text-lg font-bold text-navy">Scaling & Kemitraan B2G</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-ocean shrink-0 mt-0.5" />
                  <span>Deployment 10 unit micro cold storage di 5 kabupaten pesisir.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-ocean shrink-0 mt-0.5" />
                  <span>Integrasi program Kampung Nelayan Maju (KNMP) KKP RI.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-ocean shrink-0 mt-0.5" />
                  <span>Peluncuran fitur marketplace QR traceability untuk restoran.</span>
                </li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-slate-700 text-white font-mono text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                Bulan 9–12
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-purple-700">FASE 3</span>
              <h3 className="text-lg font-bold text-navy">Expansion & Hub Regional</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span>Ekspansi 20+ unit ke wilayah Indonesia Timur (Sulawesi & Maluku).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span>Pembangunan Regional Service Hub untuk maintenance preventif.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span>Penerbitan laporan tahunan capaian SDG dan sertifikasi mutu perikanan.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 7. TECHNICAL SPECS & FINANCIAL PROJECTIONS (PRD Section 7 & Proposal Details) */}
        <section id="finansial" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              DETAIL TEKNIS & KELAYAKAN FINANSIAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Spesifikasi Produk & Analisis Bisnis
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Rincian komponen, struktur modal, titik impas (BEP), dan kepatuhan syariah:
            </p>
          </div>

          {/* Accordion Panels */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-200">
            {/* Accordion 1: Technical Specs */}
            <div>
              <button
                onClick={() => setOpenAccordion(openAccordion === "spec" ? null : "spec")}
                className="w-full p-5 sm:p-6 text-left flex justify-between items-center hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-navy text-sm sm:text-base">
                      1. Spesifikasi Teknis Hardware & Sistem Pendingin
                    </h3>
                    <p className="text-xs text-slate-500">Kapasitas, Tenaga Surya, Baterai, dan Material</p>
                  </div>
                </div>
                {openAccordion === "spec" ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>

              {openAccordion === "spec" && (
                <div className="p-6 bg-slate-50/70 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-navy block">Kapasitas Muatan:</strong>
                    <span className="text-slate-600">500 – 1.000 kg ikan segar per unit (modular dapat digabung)</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-navy block">Pembangkit Surya:</strong>
                    <span className="text-slate-600">Solar Panel Monocrystalline 4.000 Wp (Peak 8.4 kW harian)</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-navy block">Penyimpanan Energi (BESS):</strong>
                    <span className="text-slate-600">Baterai LiFePO4 10 kWh 48V (umur pakai &gt; 10 tahun / 4000 siklus)</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-navy block">Suhu Kerja:</strong>
                    <span className="text-slate-600">Preset suhu -18°C s/d -20°C (Deep Freeze) &amp; Chilling 0°C s/d 4°C</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-navy block">Material &amp; Insulasi:</strong>
                    <span className="text-slate-600">Stainless Steel 304 Food Grade, Polyurethane Foam High Density 100mm</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-navy block">Konektivitas IoT:</strong>
                    <span className="text-slate-600">GSM/4G + LoRa Gateway, Sensor Suhu DS18B20 &amp; BMS Telemetry</span>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Financial Projections */}
            <div>
              <button
                onClick={() => setOpenAccordion(openAccordion === "fin" ? null : "fin")}
                className="w-full p-5 sm:p-6 text-left flex justify-between items-center hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-ocean/10 text-ocean flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-navy text-sm sm:text-base">
                      2. Kelayakan Bisnis, BEP &amp; Payback Period
                    </h3>
                    <p className="text-xs text-slate-500">Berdasarkan Analisis Keuangan Proposal BlueSync</p>
                  </div>
                </div>
                {openAccordion === "fin" ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>

              {openAccordion === "fin" && (
                <div className="p-6 bg-slate-50/70 border-t border-slate-200 space-y-4 text-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                      <span className="text-slate-400 text-[10px] block uppercase">Harga Jual per Unit:</span>
                      <strong className="text-navy font-mono text-base block mt-0.5">Rp 152.260.000</strong>
                      <span className="text-[10px] text-teal font-semibold">Margin 15%</span>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                      <span className="text-slate-400 text-[10px] block uppercase">Biaya Variabel (HPP):</span>
                      <strong className="text-navy font-mono text-base block mt-0.5">Rp 132.400.000</strong>
                      <span className="text-[10px] text-slate-500">Komponen &amp; Perakitan</span>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                      <span className="text-slate-400 text-[10px] block uppercase">Break Even Point (BEP):</span>
                      <strong className="text-amber-600 font-mono text-base block mt-0.5">2,2 Unit / Bulan</strong>
                      <span className="text-[10px] text-slate-500">≈ 3 Unit Penjualan</span>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                      <span className="text-slate-400 text-[10px] block uppercase">Payback Period:</span>
                      <strong className="text-green font-mono text-base block mt-0.5">± 26 Bulan</strong>
                      <span className="text-[10px] text-green font-semibold">Tercapai di Tahun ke-2</span>
                    </div>
                  </div>

                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Dengan modal awal operasional sebesar <strong>Rp 405.000.000</strong> dan target penjualan 3 unit/bulan pada tahun pertama, BlueSync mencapai keuntungan bersih <strong>Rp 15.780.000/bulan</strong> secara stabil.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 3: Islamic Business Ethics & Akad Syariah */}
            <div>
              <button
                onClick={() => setOpenAccordion(openAccordion === "syariah" ? null : "syariah")}
                className="w-full p-5 sm:p-6 text-left flex justify-between items-center hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-green flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-navy text-sm sm:text-base">
                      3. Kepatuhan Syariah &amp; Pemetaan Akad Muamalah
                    </h3>
                    <p className="text-xs text-slate-500">Bebas Riba, Gharar, dan Maysir</p>
                  </div>
                </div>
                {openAccordion === "syariah" ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>

              {openAccordion === "syariah" && (
                <div className="p-6 bg-slate-50/70 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                    <strong className="text-navy block font-bold">1. Akad Murabahah (Jual Beli Unit):</strong>
                    <p className="text-slate-600 leading-relaxed">
                      Harga pokok produksi dan margin keuntungan (15%) disampaikan secara transparan di awal kepada pembeli/BUMDes tanpa bunga tersembunyi.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                    <strong className="text-navy block font-bold">2. Akad Ijarah (Sewa Harian Pay-Per-Use):</strong>
                    <p className="text-slate-600 leading-relaxed">
                      Objek sewa berupa manfaat ruang pendingin (Rp3.500/kg/hari) dengan durasi jelas dan tidak ada peralihan kepemilikan.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                    <strong className="text-navy block font-bold">3. Akad Ijarah Muntahiyah bit Tamlik (Lease-to-Own):</strong>
                    <p className="text-slate-600 leading-relaxed">
                      Cicilan sewa bulanan oleh BUMDes yang diakhiri dengan hibah/pemindahan kepemilikan unit setelah seluruh kewajiban selesai disepakati.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                    <strong className="text-navy block font-bold">4. Akad Samsarah (Keagenan Pasar):</strong>
                    <p className="text-slate-600 leading-relaxed">
                      Fee perantara jasa yang wajar dan disepakati di muka untuk menghubungkan nelayan binaan dengan pembeli restoran skala besar.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 8. CALL-TO-ACTION & PARTNERSHIP FORM (PRD Section 8) */}
        <section id="kemitraan" className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              FORMULIR KERJASAMA RESMI
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Siap Bermitra dengan BlueSync?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Bawa teknologi micro cold storage tenaga surya ke desa pesisir Anda. Tim kami akan segera menindaklanjuti studi kelayakan teknis:
            </p>
          </div>

          <form onSubmit={handlePartnerSubmit} className="max-w-xl mx-auto space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy mb-1">
                Nama Instansi / BUMDes / Koperasi:
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: BUMDes Bahari Makmur"
                value={partnerForm.orgName}
                onChange={(e) => setPartnerForm({ ...partnerForm, orgName: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-xs text-navy focus:outline-none focus:border-teal"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy mb-1">
                  Lokasi Pesisir / PPI / Kabupaten:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sendangbiru, Malang"
                  value={partnerForm.location}
                  onChange={(e) => setPartnerForm({ ...partnerForm, location: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-3 text-xs text-navy focus:outline-none focus:border-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1">
                  No. Telepon / WhatsApp / Email:
                </label>
                <input
                  type="text"
                  required
                  placeholder="0812-xxxx-xxxx"
                  value={partnerForm.contact}
                  onChange={(e) => setPartnerForm({ ...partnerForm, contact: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-3 text-xs text-navy focus:outline-none focus:border-teal"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy mb-1">
                  Estimasi Kebutuhan Unit:
                </label>
                <select
                  value={partnerForm.unitCount}
                  onChange={(e) => setPartnerForm({ ...partnerForm, unitCount: Number(e.target.value) })}
                  className="w-full border border-slate-300 rounded-xl p-3 text-xs text-navy bg-white focus:outline-none focus:border-teal font-semibold"
                >
                  <option value={1}>1 Unit (500–1.000 kg)</option>
                  <option value={2}>2 Unit (1–2 Ton)</option>
                  <option value={5}>5 Unit (Pusat Hub Pesisir)</option>
                  <option value={10}>10+ Unit (Program Daerah)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1">
                  Skema Kemitraan:
                </label>
                <select
                  value={partnerForm.scheme}
                  onChange={(e) => setPartnerForm({ ...partnerForm, scheme: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-3 text-xs text-navy bg-white focus:outline-none focus:border-teal font-semibold"
                >
                  <option value="pay_per_use">Pay-Per-Use (Sewa Harian)</option>
                  <option value="lease_to_own">Lease-to-Own (Sewa Beli BUMDes)</option>
                  <option value="csr_grant">Hibah CSR / Pembiayaan Pemda</option>
                  <option value="direct_purchase">Pembelian Unit (Murabahah)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitted}
              className="w-full bg-teal hover:bg-teal-dark text-white font-extrabold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal/20 transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitted ? (
                <>
                  <Check className="w-5 h-5 text-green-300" />
                  <span>Permohonan Terkirim! Tim Kami Segera Menghubungi Anda</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim Formulir Kemitraan</span>
                </>
              )}
            </button>
          </form>
        </section>
      </div>

      {/* Logo Philosophy Modal */}
      <LogoPhilosophyModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
      />
    </div>
  );
}