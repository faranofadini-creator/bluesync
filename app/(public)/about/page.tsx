import React from "react";
import Link from "next/link";
import { Anchor, ShieldCheck, Sun, Users, Award, Target, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-mono font-bold text-teal uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Tentang BlueSync Indonesia
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight">
          Menghubungkan Laut, Energi Surya, dan Kesejahteraan Nelayan
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Indonesia adalah negara maritim kepulauan terbesar di dunia dengan potensi perikanan lebih dari 12 juta ton per tahun.
          Namun, 20–29% dari hasil tangkapan nelayan kecil mengalami pembusukan sebelum sempat terjual karena ketiadaan rantai pendingin (cold chain) di pelosok pesisir.
        </p>
      </div>

      {/* Grid: 3 Pilar Utama */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="font-bold text-navy text-base">Infrastruktur Fisik</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Micro cold storage solar-hybrid (500–1.000 kg) dengan insulasi termal Polyurethane & Phase Change Material (PCM) yang menjaga suhu -18°C hingga 16 jam tanpa matahari.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-ocean/10 text-ocean flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="font-bold text-navy text-base">Digital Intelligence</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Sensor telemetri IoT real-time, integrasi protokol MQTT, peringatan anomali suhu otomatis, dan keterlacakan QR Code dari pendaratan hingga meja konsumen.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-orange/10 text-orange flex items-center justify-center font-bold">
            03
          </div>
          <h3 className="font-bold text-navy text-base">Model Bisnis Berdaya</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Skema Cold Storage as a Service (CSaaS), sewa harian terjangkau (pay-per-use), kepemilikan BUMDes via lease-to-own, serta direct marketplace ke pembeli kota.
          </p>
        </div>
      </div>

      {/* Vision & Mission Box */}
      <div className="bg-navy text-white p-8 rounded-3xl space-y-6">
        <div className="border-l-4 border-teal pl-4 space-y-2">
          <span className="text-xs uppercase tracking-widest text-teal font-mono font-bold">
            Visi BlueSync
          </span>
          <p className="text-lg sm:text-xl font-medium italic text-slate-200">
            &ldquo;Digital backbone of Indonesia&apos;s decentralized coastal cold chain — mengubah setiap unit cold storage menjadi node dalam ekosistem digital yang terkoneksi, terukur, dan berkelanjutan.&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-navy-800 text-xs">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-teal shrink-0 mt-0.5" />
            <span>Mendukung target KKP RI dalam swasembada pangan laut dan zero waste fishery.</span>
          </div>
          <div className="flex items-start gap-2">
            <Sun className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>Mengurangi ketergantungan genset diesel beremisi tinggi dengan energi surya terbarukan.</span>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          href="/solution"
          className="inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white font-bold px-6 py-3 rounded-xl text-xs transition"
        >
          <span>Pelajari Solusi Teknis Kami</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
