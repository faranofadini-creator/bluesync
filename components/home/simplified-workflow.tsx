"use client";

import React, { useState } from "react";
import {
  Fish,
  Snowflake,
  Activity,
  Truck,
  TrendingUp,
  Building2,
  Users,
  Store,
  Landmark,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  DollarSign,
} from "lucide-react";

export default function SimplifiedWorkflow() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [activeStakeholder, setActiveStakeholder] = useState<"nelayan" | "bumdes" | "pasar" | "pemerintah">("nelayan");

  const steps = [
    {
      id: 1,
      title: "1. TANGKAP",
      subtitle: "Hasil Tangkapan Pesisir",
      icon: Fish,
      color: "bg-sky-500",
      description:
        "Nelayan mendaratkan ikan segar di dermaga/PPI. Ikan segera ditimbang dan siap dimasukkan ke micro cold storage sebelum terjadi penurunan mutu.",
      stat: "Menyelamatkan 20–30% mutu awal",
    },
    {
      id: 2,
      title: "2. SIMPAN",
      subtitle: "Micro Cold Storage Surya",
      icon: Snowflake,
      color: "bg-teal",
      description:
        "Ikan dibekukan dan disimpan pada suhu presisi ≤ -18°C dengan sistem modular bertenaga solar-hybrid 4000 Wp tanpa khawatir mati listrik.",
      stat: "Daya simpan hingga 21 hari",
    },
    {
      id: 3,
      title: "3. MONITOR",
      subtitle: "IoT Telemetri Real-Time",
      icon: Activity,
      color: "bg-ocean",
      description:
        "Sensor IoT memantau stabilitas suhu, kelembapan, status baterai LiFePO4, dan pintu unit 24/7 dengan peringatan anomali otomatis.",
      stat: "100% data terverifikasi digital",
    },
    {
      id: 4,
      title: "4. KIRIM",
      subtitle: "Distribusi Rantai Dingin",
      icon: Truck,
      color: "bg-indigo-600",
      description:
        "Batch ikan dilengkapi QR Code ketertelusuran (traceability) dan didistribusikan ke restoran, pasar induk, atau industri pengolahan bernilai tinggi.",
      stat: "Jangkauan pasar 5x lebih luas",
    },
    {
      id: 5,
      title: "5. UNTUNG",
      subtitle: "Harga Terbaik & Margin Tinggi",
      icon: TrendingUp,
      color: "bg-green",
      description:
        "Nelayan terbebas dari jerat harga murah tengkulak saat panen raya. Nilai jual meningkat hingga 25–40% dengan margin berkelanjutan.",
      stat: "+40% Peningkatan pendapatan",
    },
  ];

  return (
    <div className="space-y-12">
      {/* 5-Step Interactive Linear Workflow */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            VISUALISASI ALUR 5 LANGKAH
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-navy">
            Bagaimana BlueSync Mengubah Hasil Laut Menjadi Nilai Maksimal
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Dari pendaratan ikan di dermaga hingga penerimaan keuntungan optimal oleh nelayan kecil.
          </p>
        </div>

        {/* Circular / Card Progress Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {steps.map((step) => {
            const isSelected = activeStep === step.id;
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? "bg-gradient-to-b from-navy to-navy-900 text-white border-teal shadow-lg scale-105"
                    : "bg-slate-50 hover:bg-slate-100/80 text-navy border-slate-200"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isSelected ? "bg-teal text-white" : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      LANGKAH {step.id}
                    </span>
                    {isSelected && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                  </div>

                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? "bg-teal text-white shadow-md" : `${step.color} text-white`
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <h4 className="font-extrabold text-sm">{step.title}</h4>
                  <div className={`text-[11px] ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                    {step.subtitle}
                  </div>
                </div>

                <div
                  className={`mt-3 pt-2 border-t text-[10px] font-mono font-semibold ${
                    isSelected ? "border-navy-700 text-teal-light" : "border-slate-200 text-teal"
                  }`}
                >
                  ✓ {step.stat}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Step Detailed Explanation */}
        <div className="bg-gradient-to-r from-navy-50 to-teal-50/50 p-6 rounded-2xl border border-teal-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-teal">
              Detail Langkah {activeStep}: {steps[activeStep - 1].title}
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {steps[activeStep - 1].description}
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setActiveStep((prev) => (prev > 1 ? prev - 1 : 5))}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-navy hover:bg-slate-100 transition"
            >
              ← Sebelumnya
            </button>
            <button
              onClick={() => setActiveStep((prev) => (prev < 5 ? prev + 1 : 1))}
              className="px-4 py-1.5 rounded-xl bg-teal text-white text-xs font-bold hover:bg-teal-dark transition flex items-center gap-1"
            >
              <span>Selanjutnya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stakeholder Switcher & Economic Loop (PRD Section 3.2 & 3.3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Tab Switcher for Stakeholders */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-ocean">
              MULTI-STAKEHOLDER PERSPECTIVE
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-navy">
              Nilai Manfaat untuk Seluruh Ekosistem
            </h3>
            <p className="text-xs text-slate-500">
              Pilih peran untuk melihat alur kerja operasional dan manfaat ekonomi yang didapatkan:
            </p>
          </div>

          {/* 4 Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: "nelayan", label: "Nelayan Kecil", icon: Users },
              { id: "bumdes", label: "BUMDes/Koperasi", icon: Building2 },
              { id: "pasar", label: "Buyer & Pasar", icon: Store },
              { id: "pemerintah", label: "Pemerintah/CSR", icon: Landmark },
            ].map((tab) => {
              const isSelected = activeStakeholder === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveStakeholder(tab.id as any)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                    isSelected
                      ? "bg-navy text-white shadow-md ring-2 ring-teal"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  <Icon className="w-4 h-4 text-teal" />
                  <span className="text-[11px]">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            {activeStakeholder === "nelayan" && (
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-navy text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-teal" />
                  Alur Kerja & Keuntungan Nelayan Skala Kecil
                </h4>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                    <span><strong>Tanpa Investasi Awal:</strong> Cukup bayar sewa harian (pay-per-use Rp3.500/kg/hari) melalui voucher QRIS BUMDes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                    <span><strong>Bebas Tengkulak:</strong> Ikan dapat disimpan hingga harga pasar membaik tanpa takut busuk.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                    <span><strong>Sertifikat Segar Grade A:</strong> Memperoleh kode batch ketertelusuran yang diakui restoran dan eksportir.</span>
                  </li>
                </ul>
              </div>
            )}

            {activeStakeholder === "bumdes" && (
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-navy text-sm flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-ocean" />
                  Alur Kerja & Keuntungan BUMDes / Koperasi Desa
                </h4>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-ocean shrink-0 mt-0.5" />
                    <span><strong>Sumber PADes Baru:</strong> Mendapatkan pendapatan pasif dari biaya sewa harian dan marjin agregasi pasar.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-ocean shrink-0 mt-0.5" />
                    <span><strong>Skema Kepemilikan Bertahap:</strong> Dapat memilih sewa beli (Lease-to-Own / Ijarah Muntahiyah bit Tamlik).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-ocean shrink-0 mt-0.5" />
                    <span><strong>Dashboard IoT Operator:</strong> Monitoring kapasitas, revenue, dan suhu unit secara otomatis tanpa pencatatan manual.</span>
                  </li>
                </ul>
              </div>
            )}

            {activeStakeholder === "pasar" && (
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-navy text-sm flex items-center gap-2">
                  <Store className="w-4 h-4 text-orange" />
                  Alur Kerja & Keuntungan Pembeli / Industri / Restoran
                </h4>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                    <span><strong>Pasokan Terjamin & Konsisten:</strong> Mengakses pasokan ikan langsung dari cold storage pesisir dengan kualitas grade ekspor.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                    <span><strong>Full QR Traceability:</strong> Bukti riwayat kestabilan suhu rantai dingin dapat diaudit sebelum membeli.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                    <span><strong>Transaksi Aman & Cepat:</strong> Pembayaran terintegrasi QRIS dan Virtual Account otomatis.</span>
                  </li>
                </ul>
              </div>
            )}

            {activeStakeholder === "pemerintah" && (
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-navy text-sm flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-green" />
                  Alur Kerja & Capaian Pemerintah / CSR / Pemda
                </h4>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green shrink-0 mt-0.5" />
                    <span><strong>Target SDG Terukur:</strong> Kontribusi langsung pada SDG 7 (Energi Bersih), SDG 8 (Ekonomi), SDG 12 (Cegah Susut), dan SDG 14 (Laut).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green shrink-0 mt-0.5" />
                    <span><strong>Penguatan Ekonomi Biru:</strong> Solusi konkret program Kampung Nelayan Maju (Kalaju / KNMP) KKP RI.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green shrink-0 mt-0.5" />
                    <span><strong>Laporan Dampak Transparan:</strong> Metrik food loss avoided dan reduksi CO2 dihitung dengan formula matematis tanpa manipulasi.</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right: Economic Impact Loop Diagram (PRD Section 3.3) */}
        <div className="lg:col-span-6 bg-gradient-to-b from-navy to-navy-900 text-white p-6 sm:p-8 rounded-3xl border border-navy-800 shadow-xl space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal-light">
              ECONOMIC IMPACT LOOP
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Siklus Sirkular Ekonomi Nelayan & Pesisir
            </h3>
            <p className="text-xs text-slate-300">
              Bagaimana ekosistem teknologi BlueSync menciptakan efek pengganda ekonomi (*economic multiplier*):
            </p>
          </div>

          {/* Visual Circular Flow */}
          <div className="bg-navy-800/80 p-5 rounded-2xl border border-navy-700 space-y-4">
            <div className="text-center p-3 bg-teal/20 rounded-xl border border-teal/40">
              <span className="font-extrabold text-xs text-teal-light tracking-wide block">
                ⚡ TEKNOLOGI BLUESYNC SOLAR COLD STORAGE
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="bg-navy-900/90 p-3 rounded-xl border border-navy-700">
                <strong className="text-white block font-bold">NELAYAN</strong>
                <span className="text-[10px] text-teal-light mt-1 block">Harga ↑ Mutu ↑</span>
              </div>
              <div className="bg-navy-900/90 p-3 rounded-xl border border-navy-700">
                <strong className="text-white block font-bold">BUMDes</strong>
                <span className="text-[10px] text-teal-light mt-1 block">PADes ↑ Usaha ↑</span>
              </div>
              <div className="bg-navy-900/90 p-3 rounded-xl border border-navy-700">
                <strong className="text-white block font-bold">PASAR</strong>
                <span className="text-[10px] text-teal-light mt-1 block">Akses ↑ Pasokan ↑</span>
              </div>
            </div>

            <div className="text-center p-3 bg-green-900/40 rounded-xl border border-green-700/50">
              <span className="font-extrabold text-xs text-green-300 tracking-wide block">
                🌊 HASIL AKHIR: EKONOMI PESISIR MANDIRI & BERDAYA SAING TINGGI
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-navy-800/50 p-3.5 rounded-xl border border-navy-700">
              <span className="text-slate-400 text-[10px] block">Estimasi Nilai Hemat:</span>
              <strong className="text-base font-extrabold font-mono text-teal">Rp 60+ Triliun/Thn</strong>
              <span className="text-[10px] text-slate-400 block mt-0.5">Potensi susut ikan nasional</span>
            </div>
            <div className="bg-navy-800/50 p-3.5 rounded-xl border border-navy-700">
              <span className="text-slate-400 text-[10px] block">Energi Bersih (Clean Tech):</span>
              <strong className="text-base font-extrabold font-mono text-amber-400">100% Zero-Carbon</strong>
              <span className="text-[10px] text-slate-400 block mt-0.5">Solar PV + LiFePO4 BESS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
