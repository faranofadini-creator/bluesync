"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import TemperatureGauge from "@/components/iot/temperature-gauge";
import SimplifiedWorkflow from "@/components/home/simplified-workflow";
import LogoPhilosophyModal from "@/components/home/logo-philosophy-modal";
import ProductMockupDiagram from "@/components/home/product-mockup-diagram";
import BmcRevenueChart from "@/components/home/bmc-revenue-chart";
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
      title: `🤝 Permohonan Kemitraan: ${partnerForm.orgName}`,
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
      {/* 1. HERO SECTION (PRD Section 2.2 - Slim, Minimalist with Grand Maritime Solar Banner) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#06121f] via-[#08182b] to-[#0a2038] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        {/* GRAND MARITIME & SOLAR BACKDROP BANNER (Low Opacity ~15%) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-10 right-1/4 w-[600px] h-[400px] bg-teal/15 blur-[120px] rounded-full" />
          <div className="absolute top-0 right-10 w-[400px] h-[400px] bg-amber-500/10 blur-[140px] rounded-full" />

          {/* Grand Vector Illustration of Nusantara Coastal Cold Chain & Solar Fleet */}
          <svg
            viewBox="0 0 1440 600"
            preserveAspectRatio="xMidYMid slice"
            className="w-full h-full opacity-18 mix-blend-screen"
          >
            <defs>
              <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0D9488" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#0284c7" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0D9488" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0f766e" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="sunRays" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Rising Solar Sun & Subtle Rays */}
            <circle cx="1150" cy="120" r="140" fill="url(#sunRays)" />
            <circle cx="1150" cy="120" r="60" fill="#f59e0b" fillOpacity="0.25" />

            {/* Distant Coastal Islands Silhouette */}
            <path
              d="M0,380 Q180,330 360,370 T720,350 T1080,360 T1440,340 L1440,600 L0,600 Z"
              fill="#062137"
              opacity="0.7"
            />
            <path
              d="M0,420 Q240,380 480,410 T960,390 T1440,410 L1440,600 L0,600 Z"
              fill="#041829"
              opacity="0.85"
            />

            {/* Traditional Fishing Boats (Perahu Nelayan Nusantara) */}
            {/* Boat 1 - Left */}
            <g transform="translate(180, 360) scale(0.65)">
              <path d="M10,40 Q50,45 90,40 Q80,60 50,60 Q20,60 10,40 Z" fill="#0D9488" opacity="0.8" />
              <line x1="50" y1="40" x2="50" y2="10" stroke="#38bdf8" strokeWidth="2" />
              <polygon points="50,12 85,25 50,38" fill="#38bdf8" opacity="0.5" />
            </g>

            {/* Boat 2 - Middle Coast */}
            <g transform="translate(680, 340) scale(0.8)">
              <path d="M10,40 Q60,45 110,40 Q100,60 60,60 Q20,60 10,40 Z" fill="#14b8a6" opacity="0.7" />
              <line x1="60" y1="40" x2="60" y2="5" stroke="#7dd3fc" strokeWidth="2.5" />
              <polygon points="60,8 100,22 60,36" fill="#7dd3fc" opacity="0.6" />
            </g>

            {/* Boat 3 - Right */}
            <g transform="translate(1220, 320) scale(0.55)">
              <path d="M10,40 Q50,45 90,40 Q80,60 50,60 Q20,60 10,40 Z" fill="#0D9488" opacity="0.7" />
              <line x1="50" y1="40" x2="50" y2="10" stroke="#38bdf8" strokeWidth="2" />
              <polygon points="50,12 85,25 50,38" fill="#38bdf8" opacity="0.5" />
            </g>

            {/* Micro Cold Storage & Solar Arrays on Coastline (Right Side) */}
            <g transform="translate(980, 240) scale(0.85)">
              {/* Solar Canopy Panels */}
              <polygon points="40,60 220,40 250,90 70,110" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" opacity="0.7" />
              <line x1="100" y1="55" x2="130" y2="103" stroke="#93c5fd" strokeWidth="1" opacity="0.6" />
              <line x1="160" y1="48" x2="190" y2="97" stroke="#93c5fd" strokeWidth="1" opacity="0.6" />
              {/* Cold Storage Container Cabin */}
              <rect x="70" y="105" width="160" height="90" rx="4" fill="#0f2f3d" stroke="#0D9488" strokeWidth="2" opacity="0.8" />
              {/* Cold Glow Indicator */}
              <circle cx="150" cy="145" r="18" fill="#38bdf8" opacity="0.3" />
            </g>

            {/* Digital IoT Circuit Constellation Telemetry Lines */}
            <g stroke="#0D9488" strokeWidth="1" strokeDasharray="3 3" opacity="0.5">
              <line x1="210" y1="380" x2="450" y2="310" />
              <line x1="450" y1="310" x2="720" y2="350" />
              <line x1="720" y1="350" x2="1050" y2="290" />
              <line x1="1050" y1="290" x2="1150" y2="120" />
            </g>

            {/* Pulsing Nodes */}
            <circle cx="450" cy="310" r="4" fill="#14b8a6" />
            <circle cx="720" cy="350" r="4" fill="#14b8a6" />
            <circle cx="1050" cy="290" r="5" fill="#38bdf8" />

            {/* Foreground Rolling Ocean Waves */}
            <path
              d="M0,490 C320,440 420,530 720,480 C1020,430 1180,520 1440,470 L1440,600 L0,600 Z"
              fill="url(#waveGrad1)"
            />
            <path
              d="M0,530 C360,490 600,560 900,510 C1200,460 1320,540 1440,510 L1440,600 L0,600 Z"
              fill="url(#waveGrad2)"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Hero Headline & CTAs */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              {/* Badge with Logo Trigger */}
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <button
                  onClick={() => setIsLogoModalOpen(true)}
                  className="bg-slate-900/90 border border-teal/40 hover:border-teal text-teal-light px-3 py-1 rounded-full text-xs font-semibold shadow-inner flex items-center gap-2 transition hover:scale-105"
                >
                  <img
                    src="/bluesync-logo.png"
                    alt="Logo BlueSync"
                    className="w-3.5 h-3.5 rounded-full object-cover"
                  />
                  <span>Filosofi & Relevansi Logo</span>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </button>

                <span className="hidden sm:inline-block bg-teal/10 text-teal-light text-[11px] font-mono px-3 py-0.5 rounded-full border border-teal/20">
                  Universitas Airlangga Innovation
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2] text-white">
                Solusi Cold Storage Bertenaga Surya untuk Nelayan Pesisir
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Mengurangi Post-Harvest Loss 20–30%, Mengamankan Kualitas Hasil Tangkapan Laut, dan Meningkatkan Kesejahteraan Komunitas Pesisir Nusantara.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 pt-1">
                <a
                  href="#kemitraan"
                  className="bg-teal hover:bg-teal-dark text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-teal/20 transition hover:scale-105"
                >
                  <span>Mulai Kemitraan</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  href="/dashboard/booking"
                  className="bg-slate-900/90 hover:bg-slate-800 text-white font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-700 flex items-center gap-2 transition"
                >
                  <Fish className="w-4 h-4 text-teal" />
                  <span>Sewa Pay-Per-Use</span>
                </Link>

                <Link
                  href="/market"
                  className="bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white font-medium px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-800 flex items-center gap-2 transition"
                >
                  <QrCode className="w-4 h-4 text-ocean-light" />
                  <span>Pasar Ikan</span>
                </Link>
              </div>

              {/* Key Trust Stats (PRD Section 4) */}
              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-slate-800/80">
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-teal font-mono">↓ 20–30%</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Post-Harvest Loss</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-mono">Rp 60+ T</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Potensi Hemat / Thn</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">1.000+</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Target Nelayan Thn 1</div>
                </div>
              </div>
            </div>

            {/* Right Col: Live IoT Telemetry Simulator Preview */}
            <div className="lg:col-span-5">
              <div className="bg-[#0b1b2d]/90 rounded-3xl p-5 sm:p-6 border border-teal/40 shadow-xl backdrop-blur-sm space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
                    <span className="text-xs font-mono font-bold text-teal-light">
                      LIVE IOT COCKPIT TELEMETRY
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    BS-001 • PPI MUARA BARU
                  </span>
                </div>

                <TemperatureGauge temperatureC={bs1.currentTempC} unitCode={bs1.code} size="md" />

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[9px] text-slate-400 block">Daya Surya (Solar PV):</span>
                    <span className="text-amber-400 font-bold text-xs">
                      {bs1.currentSolarKw.toFixed(1)} kW (Peak 8.4 kW)
                    </span>
                  </div>
                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[9px] text-slate-400 block">Baterai LiFePO4:</span>
                    <span className="text-green-400 font-bold text-xs">
                      {bs1.currentBatteryPct.toFixed(0)}% (10 kWh BESS)
                    </span>
                  </div>
                </div>

                <div className="text-center pt-1">
                  <Link
                    href="/admin/demo"
                    className="inline-flex items-center gap-1 text-[11px] text-teal-light hover:underline font-medium"
                  >
                    <span>Buka Panel Simulasi Pitching & Injeksi Anomali →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* 2. PROBLEM STATEMENT SECTION (PRD Section 2.3) */}
        <section id="masalah" className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
              TANTANGAN NYATA SEKTOR PERIKANAN
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
              Tingginya Post-Harvest Loss dan Keterbatasan Rantai Dingin
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Berdasarkan data Kertas Kerja JP2GI (2021) dan KKP RI, hampir sepertiga hasil tangkapan laut Indonesia tidak dapat dimanfaatkan secara optimal karena minimnya fasilitas pendingin di pesisir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-base">
                20-30%
              </div>
              <h3 className="font-bold text-navy text-sm">Susut Pascapanen Tinggi</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hampir 1/3 ikan segar mengalami penurunan kualitas sebelum sampai ke pasar atau konsumen akhir.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                Rp 82 T
              </div>
              <h3 className="font-bold text-navy text-sm">Kerugian Ekonomi Nasional</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rp63,3 – 82,8 triliun nilai ekonomi perikanan hilang setiap tahun akibat keterbatasan cold chain.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-ocean flex items-center justify-center font-bold text-sm">
                ⚡ Krisis
              </div>
              <h3 className="font-bold text-navy text-sm">Akses Listrik Terbatas</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Banyak PPI dan desa nelayan di pulau terpencil belum terjangkau listrik PLN 24 jam yang stabil.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm">
                🔗 Terikat
              </div>
              <h3 className="font-bold text-navy text-sm">Jerat Tengkulak Lokal</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nelayan terpaksa menjual tangkapan murah karena tidak memiliki tempat penyimpanan dingin mandiri.
              </p>
            </div>
          </div>
        </section>

        {/* 3. SOLUTION OVERVIEW SECTION (PRD Section 2.4 - 4 Modular Cards) */}
        <section id="solusi" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              SOLUSI BLUESYNC
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
              Smart Cold Chain Ecosystem Desentralisasi
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Empat pilar keunggulan micro cold storage ramah lingkungan berkapasitas 500–1.000 kg:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Card 1: Teknologi */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal shadow-sm hover:shadow-md transition-all space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                  <Sun className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-navy text-sm">1. Teknologi Solar-Hybrid</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kombinasi Panel Surya 4.000 Wp + Baterai LiFePO4 10 kWh + Grid PLN otomatis. Tetap dingin 24 jam walau tanpa listrik jaringan.
                </p>
              </div>
              <div className="text-[10px] font-mono text-teal font-semibold pt-2 border-t border-slate-100">
                ✓ 100% Zero Fuel Emission
              </div>
            </div>

            {/* Card 2: Aksesibilitas */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal shadow-sm hover:shadow-md transition-all space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-navy text-sm">2. Model CSaaS Terjangkau</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Skema <em>Pay-Per-Use</em> harian untuk nelayan (Rp3.500/kg/hari) dan <em>Lease-to-Own</em> untuk BUMDes tanpa beban investasi awal tinggi.
                </p>
              </div>
              <div className="text-[10px] font-mono text-teal font-semibold pt-2 border-t border-slate-100">
                ✓ Akad Syariah Bebas Riba
              </div>
            </div>

            {/* Card 3: Durabilitas */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal shadow-sm hover:shadow-md transition-all space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-ocean/10 text-ocean flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-navy text-sm">3. Durabilitas Pesisir</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Rangka dan bodi stainless steel food-grade 304 anti-korosi air laut dengan panel insulasi polyurethane tebal 100mm.
                </p>
              </div>
              <div className="text-[10px] font-mono text-teal font-semibold pt-2 border-t border-slate-100">
                ✓ Standar Kelautan Tropis
              </div>
            </div>

            {/* Card 4: Monitoring */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal shadow-sm hover:shadow-md transition-all space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-navy text-sm">4. IoT & QR Traceability</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sensor digital mencatat telemetri suhu dan menerbitkan QR Code untuk memverifikasi mutu ikan segar sampai ke tangan konsumen.
                </p>
              </div>
              <div className="text-[10px] font-mono text-teal font-semibold pt-2 border-t border-slate-100">
                ✓ Kestabilan Suhu Terjamin
              </div>
            </div>
          </div>
        </section>

        {/* 4. REALISTIC PRODUCT SCHEMATICS (Hardware Breakdown) */}
        <section id="skematik">
          <ProductMockupDiagram />
        </section>

        {/* 5. WORKFLOW VISUALIZATION (PRD Section 3 - CENTERPIECE) */}
        <section id="workflow">
          <SimplifiedWorkflow />
        </section>

        {/* 6. BUSINESS MODEL CANVAS & REVENUE STREAMS (TIM CHOBA CHUBI UNAIR) */}
        <section id="bmc">
          <BmcRevenueChart />
        </section>

        {/* 7. INTERACTIVE TARIFF & VALUE CALCULATOR */}
        <section className="bg-gradient-to-br from-[#081524] via-[#09182a] to-[#0f2d42] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-teal-light bg-teal/20 px-2.5 py-0.5 rounded-full border border-teal/40">
              SIMULATOR KEUNTUNGAN NELAYAN
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Hitung Penghematan & Peningkatan Pendapatan
            </h2>
            <p className="text-xs text-slate-300">
              Bandingkan hasil penjualan dengan cold storage BlueSync vs tanpa cold storage:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Col: Sliders */}
            <div className="lg:col-span-6 space-y-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
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
                          : "bg-slate-950 text-slate-300 hover:bg-slate-800"
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
                  <span className="text-teal-light font-mono text-sm">{calcWeight} kg</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={500}
                  step={10}
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(Number(e.target.value))}
                  className="w-full accent-teal h-2 bg-slate-950 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span className="text-slate-300">Durasi Penyimpanan:</span>
                  <span className="text-teal-light font-mono text-sm">{calcDays} Hari</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={selSpecies.maxStorageDays}
                  value={calcDays}
                  onChange={(e) => setCalcDays(Number(e.target.value))}
                  className="w-full accent-teal h-2 bg-slate-950 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Right Col: Benefit Result Card */}
            <div className="lg:col-span-6 bg-slate-950/90 p-5 rounded-2xl border border-teal/40 space-y-3 text-xs">
              <h3 className="font-bold text-xs text-teal-light border-b border-slate-800 pb-2">
                Analisis Finansial Nilai Tambah
              </h3>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Nilai Pasar Normal:</span>
                  <span className="font-mono font-bold text-white">{formatRupiah(normalSellingPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kerugian Susut Dihindari (28%):</span>
                  <span className="font-mono text-green-400 font-bold">+{formatRupiah(spoiledLossRp)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Premi Mutu Grade A (+15%):</span>
                  <span className="font-mono text-amber-400 font-bold">+{formatRupiah(premiumGainRp)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Biaya Sewa Cold Storage:</span>
                  <span className="font-mono text-red-400 font-bold">-{formatRupiah(storageCost)}</span>
                </div>
              </div>

              <div className="bg-teal/20 p-3.5 rounded-xl border border-teal/40 flex justify-between items-baseline pt-2.5">
                <div>
                  <span className="text-[9px] text-teal-light block uppercase font-bold">
                    Net Keuntungan Tambahan:
                  </span>
                  <span className="text-xl font-bold font-mono text-teal-light">
                    {formatRupiah(Math.max(0, netBenefitRp))}
                  </span>
                </div>
                <Link
                  href="/dashboard/booking"
                  className="bg-teal hover:bg-teal-dark text-white font-bold py-1.5 px-3 rounded-lg text-xs transition"
                >
                  Pesan Slot →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 8. TIMELINE & ROADMAP (PRD Section 6) */}
        <section id="roadmap" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-ocean bg-ocean/10 px-2.5 py-0.5 rounded-full border border-ocean/20">
              TIMELINE & STRATEGI EKSPANSI
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
              Rencana Implementasi 12 Bulan (3 Fase)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Peta jalan pengembangan bertahap dari validasi pilot hingga replikasi nasional:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Phase 1 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-teal text-white font-mono text-[9px] font-bold px-2.5 py-0.5 rounded-bl-lg">
                Bulan 1–3
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-teal">FASE 1</span>
              <h3 className="text-base font-bold text-navy">Pilot Testing & Validasi</h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                  <span>Penempatan 2 unit percontohan di PPI Jawa Timur & Jakarta.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                  <span>Validasi performa sensor IoT & sistem baterai LiFePO4.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                  <span>Pelatihan intensif 10 operator BUMDes perdana.</span>
                </li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="bg-white p-5 rounded-2xl border-2 border-teal shadow-sm space-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-navy text-white font-mono text-[9px] font-bold px-2.5 py-0.5 rounded-bl-lg">
                Bulan 4–8
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-ocean">FASE 2</span>
              <h3 className="text-base font-bold text-navy">Scaling & Kemitraan B2G</h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ocean shrink-0 mt-0.5" />
                  <span>Deployment 10 unit micro cold storage di 5 kabupaten pesisir.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ocean shrink-0 mt-0.5" />
                  <span>Integrasi program Kampung Nelayan Maju (KNMP) KKP RI.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ocean shrink-0 mt-0.5" />
                  <span>Peluncuran fitur marketplace QR traceability untuk resto.</span>
                </li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-slate-700 text-white font-mono text-[9px] font-bold px-2.5 py-0.5 rounded-bl-lg">
                Bulan 9–12
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-purple-700">FASE 3</span>
              <h3 className="text-base font-bold text-navy">Expansion & Hub Regional</h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                  <span>Ekspansi 20+ unit ke wilayah Indonesia Timur (Sulawesi & Maluku).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                  <span>Pembangunan Regional Service Hub untuk maintenance.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                  <span>Penerbitan laporan dampak capaian SDG tahunan.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 9. TECHNICAL SPECS & FINANCIAL ACCORDIONS */}
        <section id="finansial" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              DETAIL TEKNIS & KELAYAKAN FINANSIAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
              Spesifikasi Produk & Analisis Bisnis
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Rincian komponen, struktur modal, titik impas (BEP), dan kepatuhan syariah:
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-200">
            {/* Accordion 1: Technical Specs */}
            <div>
              <button
                onClick={() => setOpenAccordion(openAccordion === "spec" ? null : "spec")}
                className="w-full p-4 sm:p-5 text-left flex justify-between items-center hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-sm">
                      1. Spesifikasi Teknis Hardware & Sistem Pendingin
                    </h3>
                    <p className="text-[11px] text-slate-500">Kapasitas, Tenaga Surya, Baterai, dan Material</p>
                  </div>
                </div>
                {openAccordion === "spec" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {openAccordion === "spec" && (
                <div className="p-5 bg-slate-50/70 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-navy block">Kapasitas Muatan:</strong>
                    <span className="text-slate-600">500 – 1.000 kg ikan segar per unit (modular)</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-navy block">Pembangkit Surya:</strong>
                    <span className="text-slate-600">Solar Panel Monocrystalline 4.000 Wp</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-navy block">Penyimpanan Energi:</strong>
                    <span className="text-slate-600">Baterai LiFePO4 10 kWh 48V (&gt; 4000 siklus)</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-navy block">Suhu Kerja:</strong>
                    <span className="text-slate-600">Preset suhu -18°C s/d -20°C (Deep Freeze)</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-navy block">Material & Insulasi:</strong>
                    <span className="text-slate-600">Stainless Steel 304 Food Grade, PU Foam 100mm</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-navy block">Konektivitas IoT:</strong>
                    <span className="text-slate-600">GSM/4G + LoRa Gateway, Sensor Suhu DS18B20</span>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Financial Projections */}
            <div>
              <button
                onClick={() => setOpenAccordion(openAccordion === "fin" ? null : "fin")}
                className="w-full p-4 sm:p-5 text-left flex justify-between items-center hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-ocean/10 text-ocean flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-sm">
                      2. Kelayakan Bisnis, BEP & Payback Period
                    </h3>
                    <p className="text-[11px] text-slate-500">Berdasarkan Analisis Keuangan Proposal BlueSync</p>
                  </div>
                </div>
                {openAccordion === "fin" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {openAccordion === "fin" && (
                <div className="p-5 bg-slate-50/70 border-t border-slate-200 space-y-3 text-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                      <span className="text-slate-400 text-[10px] block uppercase">Harga Jual Unit:</span>
                      <strong className="text-navy font-mono text-sm block mt-0.5">Rp 152.260.000</strong>
                      <span className="text-[10px] text-teal font-semibold">Margin 15%</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                      <span className="text-slate-400 text-[10px] block uppercase">Biaya Variabel:</span>
                      <strong className="text-navy font-mono text-sm block mt-0.5">Rp 132.400.000</strong>
                      <span className="text-[10px] text-slate-500">Komponen & Perakitan</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                      <span className="text-slate-400 text-[10px] block uppercase">BEP Penjualan:</span>
                      <strong className="text-amber-600 font-mono text-sm block mt-0.5">2,2 Unit / Bln</strong>
                      <span className="text-[10px] text-slate-500">≈ 3 Unit Penjualan</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                      <span className="text-slate-400 text-[10px] block uppercase">Payback Period:</span>
                      <strong className="text-green font-mono text-sm block mt-0.5">± 26 Bulan</strong>
                      <span className="text-[10px] text-green font-semibold">Tahun ke-2</span>
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
                className="w-full p-4 sm:p-5 text-left flex justify-between items-center hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 text-green flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-sm">
                      3. Kepatuhan Syariah & Pemetaan Akad Muamalah
                    </h3>
                    <p className="text-[11px] text-slate-500">Bebas Riba, Gharar, dan Maysir</p>
                  </div>
                </div>
                {openAccordion === "syariah" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {openAccordion === "syariah" && (
                <div className="p-5 bg-slate-50/70 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-navy block font-bold">1. Akad Murabahah (Jual Beli Unit):</strong>
                    <p className="text-slate-600 leading-relaxed">
                      Harga pokok dan margin keuntungan (15%) disampaikan transparan di awal tanpa bunga tersembunyi.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-navy block font-bold">2. Akad Ijarah (Sewa Harian Pay-Per-Use):</strong>
                    <p className="text-slate-600 leading-relaxed">
                      Objek sewa berupa manfaat ruang pendingin (Rp3.500/kg/hari) dengan durasi jelas.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-navy block font-bold">3. Akad IMBT (Lease-to-Own):</strong>
                    <p className="text-slate-600 leading-relaxed">
                      Cicilan sewa bulanan BUMDes yang diakhiri pemindahan kepemilikan unit di akhir periode.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-navy block font-bold">4. Akad Samsarah (Keagenan Pasar):</strong>
                    <p className="text-slate-600 leading-relaxed">
                      Fee perantara jasa yang wajar dan disepakati di muka untuk menghubungkan nelayan dengan buyer resto.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 10. CALL-TO-ACTION & PARTNERSHIP FORM (PRD Section 8) */}
        <section id="kemitraan" className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-lg space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              FORMULIR KERJASAMA RESMI
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
              Siap Bermitra dengan BlueSync?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Bawa teknologi micro cold storage tenaga surya ke desa pesisir Anda. Tim kami siap menindaklanjuti:
            </p>
          </div>

          <form onSubmit={handlePartnerSubmit} className="max-w-xl mx-auto space-y-3.5">
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
                className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-navy focus:outline-none focus:border-teal"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-navy focus:outline-none focus:border-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1">
                  No. Telepon / WhatsApp:
                </label>
                <input
                  type="text"
                  required
                  placeholder="0812-xxxx-xxxx"
                  value={partnerForm.contact}
                  onChange={(e) => setPartnerForm({ ...partnerForm, contact: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-navy focus:outline-none focus:border-teal"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-navy mb-1">
                  Kebutuhan Unit:
                </label>
                <select
                  value={partnerForm.unitCount}
                  onChange={(e) => setPartnerForm({ ...partnerForm, unitCount: Number(e.target.value) })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-navy bg-white focus:outline-none focus:border-teal font-medium"
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
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-navy bg-white focus:outline-none focus:border-teal font-medium"
                >
                  <option value="pay_per_use">Pay-Per-Use (Sewa Harian)</option>
                  <option value="lease_to_own">Lease-to-Own (Sewa Beli BUMDes)</option>
                  <option value="csr_grant">Hibah CSR / Pemda</option>
                  <option value="direct_purchase">Pembelian Unit (Murabahah)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitted}
              className="w-full bg-teal hover:bg-teal-dark text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-teal/20 transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitted ? (
                <>
                  <Check className="w-4 h-4 text-green-300" />
                  <span>Permohonan Terkirim! Tim Segera Menghubungi Anda</span>
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