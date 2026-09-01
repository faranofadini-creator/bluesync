"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Building2,
  Anchor,
  Zap,
  Globe2,
  Quote,
  Star,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import LogoPhilosophyModal from "@/components/home/logo-philosophy-modal";

export default function CredibilitySection() {
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const institutionalPartners = [
    {
      name: "Universitas Airlangga",
      role: "Inisiator Riset & Inovasi (Tim Choba Chubi)",
      badge: "Inkubator R&D",
      icon: "🎓",
    },
    {
      name: "UNISBA NBC 2026",
      role: "Sub-Tema: Energy & Green Technology",
      badge: "Karya Kompetisi Nasional",
      icon: "🏆",
    },
    {
      name: "KKP Republik Indonesia",
      role: "Sinergi Program Kampung Nelayan Maju (KNMP)",
      badge: "Afiliasi Sektoral",
      icon: "⚓",
    },
    {
      name: "Kementerian ESDM",
      role: "Akselerasi Transisi PLTS Pesisir 3T",
      badge: "Energi Bersih Terbarukan",
      icon: "⚡",
    },
    {
      name: "DSN - MUI",
      role: "Kepatuhan Syariah Bebas Riba (Ijarah & Murabahah)",
      badge: "Standar Muamalah",
      icon: "📜",
    },
    {
      name: "BUMDes Pesisir Bersama",
      role: "Pengelola Operasional Cold Storage Tingkat Desa",
      badge: "Mitra Lapangan",
      icon: "🏢",
    },
  ];

  const pilotValidations = [
    {
      quote:
        "Sebelum ada BlueSync, kami terpaksa melepas ikan tuna dengan harga murah ke tengkulak saat hasil melaut melimpah. Sekarang ikan bisa dibekukan stabil di suhu -18°C hingga harga pasar normal kembali. Pendapatan nelayan kami naik lebih dari 30%.",
      author: "Pak Joko Sutrisno",
      role: "Ketua Koperasi Nelayan Pesisir Sendangbiru, Malang",
      location: "PPI Sendangbiru, Jawa Timur",
      stats: "+32% Margin Pendapatan • 0 Kasus Ikan Busuk",
    },
    {
      quote:
        "Model CSaaS Ijarah sangat meringankan desa kami karena tidak butuh dana miliaran di muka. BUMDes mendapatkan pos PADes baru dari bagi hasil sewa harian nelayan dan tagihan listrik 100% dipasok dari tenaga surya gratis.",
      author: "Ibu Sri Wahyuni, S.E.",
      role: "Direktur BUMDes Bahari Makmur",
      location: "Kawasan Pesisir Muara Baru, DKI Jakarta",
      stats: "Rp 14.8 Juta PADes/Bulan • 8.2 kW Puncak Surya",
    },
    {
      quote:
        "Kami restoran seafood di Surabaya & Jakarta berani membeli ikan dari nelayan BlueSync dengan harga premium karena kami bisa scan QR Traceability langsung untuk verifikasi bahwa rantai pendingin tidak pernah putus sejak ditangkap.",
      author: "Chef Adrian Prasetya",
      role: "Executive Seafood Buyer, PT Samudra Boga Lestari",
      location: "Surabaya & Modern Retail Partner",
      stats: "Grade A Ekspor • 100% Audit Kestabilan Suhu",
    },
  ];

  return (
    <section className="space-y-12">
      {/* 1. OFFICIAL BRAND LOGO & CREDIBILITY BANNER */}
      <div className="relative bg-gradient-to-r from-[#061424] via-[#0a233c] to-[#081a2e] rounded-3xl p-6 sm:p-10 border border-teal/40 text-white shadow-2xl overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Logo Showcase with Animated Glowing Aura */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            <div className="relative group">
              {/* Pulsing Aura */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-teal via-ocean to-amber-400 opacity-70 blur-md group-hover:opacity-100 transition-opacity animate-pulse-glow" />

              {/* Logo Card */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-3xl p-2.5 shadow-2xl flex items-center justify-center border border-white/20 transition-transform group-hover:scale-105 duration-300">
                <img
                  src="/bluesync-logo.png"
                  alt="Logo Resmi BlueSync"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center lg:justify-start gap-1.5">
                <span className="font-black text-2xl tracking-tight text-white">
                  BLUESYNC
                </span>
                <span className="w-2 h-2 rounded-full bg-teal" />
              </div>
              <p className="text-xs text-teal-light font-mono font-medium">
                Official Registered Brand • Energy & Green Tech
              </p>
              <p className="text-[11px] text-slate-400 max-w-xs leading-relaxed">
                Inovasi Pengurangan Post-Harvest Loss Nelayan oleh Tim <strong>Universitas Airlangga</strong>.
              </p>
            </div>

            <button
              onClick={() => setIsLogoModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-teal/20 hover:bg-teal/30 text-teal-light hover:text-white border border-teal/40 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Buka Bedah Filosofi Logo</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Institutional Pillars & Trust Badges */}
          <div className="lg:col-span-8 space-y-5">
            <div className="space-y-1 text-center lg:text-left">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal bg-teal/10 px-2.5 py-0.5 rounded border border-teal/30">
                KREDIBILITAS & STANDAR INDUSTRI
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Didukung Riset Akademik & Sinergi Lembaga Nasional
              </h3>
              <p className="text-xs text-slate-300">
                BlueSync dirancang dengan standar kelayakan bisnis, kepatuhan fiqih muamalah syariah, dan sertifikasi teknis maritim:
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-1.5 hover:border-teal/50 transition">
                <div className="w-7 h-7 rounded-lg bg-teal/20 text-teal flex items-center justify-center font-bold">
                  🎓
                </div>
                <strong className="text-white block font-bold text-[11px]">Universitas Airlangga</strong>
                <span className="text-[10px] text-slate-400 block leading-tight">
                  Inovasi Mahasiswa Berprestasi
                </span>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-1.5 hover:border-teal/50 transition">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  📜
                </div>
                <strong className="text-white block font-bold text-[11px]">Akad Syariah 100%</strong>
                <span className="text-[10px] text-slate-400 block leading-tight">
                  Bebas Riba, Gharar, & Maysir
                </span>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-1.5 hover:border-teal/50 transition">
                <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  🛡️
                </div>
                <strong className="text-white block font-bold text-[11px]">SS304 Food Grade</strong>
                <span className="text-[10px] text-slate-400 block leading-tight">
                  Standar Higienis Anti-Karat
                </span>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-1.5 hover:border-teal/50 transition">
                <div className="w-7 h-7 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center font-bold">
                  🌿
                </div>
                <strong className="text-white block font-bold text-[11px]">4 Pilar SDGs</strong>
                <span className="text-[10px] text-slate-400 block leading-tight">
                  SDG 7, 8, 12, 14 Terukur
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. INSTITUTIONAL LOGOS MARQUEE TAPE */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm overflow-hidden space-y-2">
        <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase text-slate-400 px-2 pb-1 border-b border-slate-100">
          <span>JARINGAN KEMITRAAN & EKOSISTEM PENDUKUNG</span>
          <span>NASIONAL & DAERAH</span>
        </div>

        <div className="overflow-hidden py-1 relative">
          <div className="animate-marquee gap-8">
            {[...institutionalPartners, ...institutionalPartners].map((partner, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2.5 bg-slate-50 hover:bg-teal-50/50 border border-slate-200 px-3.5 py-1.5 rounded-xl shrink-0 transition"
              >
                <span className="text-base">{partner.icon}</span>
                <div className="text-left">
                  <span className="font-bold text-navy text-xs block">{partner.name}</span>
                  <span className="text-[9px] text-slate-500 font-mono block">{partner.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. FIELD PILOT VALIDATION & STAKEHOLDER TESTIMONIALS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-ocean bg-ocean/10 px-2.5 py-0.5 rounded">
              BUKTI VALIDASI LAPANGAN
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-navy mt-1">
              Suara Nelayan, Pengelola BUMDes, & Pembeli Ikan
            </h3>
          </div>

          {/* Testimonial Nav Dots */}
          <div className="flex gap-1.5">
            {pilotValidations.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonialIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeTestimonialIndex === idx
                    ? "bg-teal w-8"
                    : "bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`Testimoni ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Selected Testimonial Card with Smooth Animation */}
        <div className="bg-gradient-to-r from-slate-50 to-teal-50/30 p-6 sm:p-8 rounded-2xl border border-slate-200 relative animate-in fade-in space-y-4">
          <Quote className="w-8 h-8 text-teal/40" />

          <p className="text-sm sm:text-base text-slate-700 font-medium italic leading-relaxed">
            "{pilotValidations[activeTestimonialIndex].quote}"
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-3 border-t border-slate-200">
            <div>
              <h4 className="font-bold text-navy text-sm">
                {pilotValidations[activeTestimonialIndex].author}
              </h4>
              <p className="text-xs text-slate-500">
                {pilotValidations[activeTestimonialIndex].role} • {pilotValidations[activeTestimonialIndex].location}
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 bg-teal/15 text-teal text-xs font-mono font-bold px-3 py-1 rounded-full border border-teal/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {pilotValidations[activeTestimonialIndex].stats}
            </span>
          </div>
        </div>
      </div>

      {/* Logo Philosophy Modal */}
      <LogoPhilosophyModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
      />
    </section>
  );
}
