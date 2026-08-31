"use client";

import React from "react";
import Image from "next/image";
import { X, Sun, Waves, Cpu, ShieldCheck, Award, Sparkles, CheckCircle2 } from "lucide-react";

interface LogoPhilosophyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoPhilosophyModal({ isOpen, onClose }: LogoPhilosophyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col">
        {/* Modal Top Header */}
        <div className="bg-navy text-white px-6 py-4 flex items-center justify-between border-b border-navy-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal to-ocean flex items-center justify-center shadow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Relevansi & Filosofi Logo BlueSync</h3>
              <span className="text-[10px] text-teal-light font-mono">
                Official Visual Identity • Inisiasi Universitas Airlangga
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-navy-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 text-navy overflow-y-auto max-h-[80vh]">
          {/* Logo Showcase Banner */}
          <div className="bg-gradient-to-b from-navy-50 to-white p-6 rounded-3xl border border-slate-200 text-center space-y-3">
            <div className="relative w-36 h-36 mx-auto bg-white rounded-2xl p-2 shadow-md border border-slate-100 flex items-center justify-center">
              <img
                src="/bluesync-logo.png"
                alt="Logo Resmi BlueSync"
                className="w-full h-full object-contain"
              />
            </div>
            <h4 className="text-xl font-extrabold text-navy tracking-tight">
              BLUESYNC — Smart Cold Chain Ecosystem
            </h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Karya Inovasi Tim <strong>Universitas Airlangga</strong> pada ajang <em>UNISBA National Business Competition</em> (Sub-Tema: Energy & Green Technology).
            </p>
          </div>

          {/* 4 Pillars of Logo Relevance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pillar 1: Solar & Grid */}
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-sm">
                  <Sun className="w-4 h-4" />
                </div>
                <span>1. Matahari Emas & Grid PV</span>
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                Melambangkan <strong>kemandirian energi bersih</strong> melalui instalasi solar panel 4.000 Wp dan baterai LiFePO4. Membebaskan nelayan dari biaya genset solar yang mahal dan ketidakstabilan pasokan listrik di pulau terluar.
              </p>
            </div>

            {/* Pillar 2: Ocean & Fresh Catch */}
            <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-200/80 space-y-2">
              <div className="flex items-center gap-2 text-sky-900 font-bold text-xs">
                <div className="w-7 h-7 rounded-lg bg-ocean text-white flex items-center justify-center shadow-sm">
                  <Waves className="w-4 h-4" />
                </div>
                <span>2. Ombak Samudra Biru & Teal</span>
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                Merefleksikan <strong>kekayaan maritim Nusantara</strong> dan komitmen BlueSync dalam melindungi kesegaran hasil tangkapan laut nelayan skala kecil agar tidak mengalami penurunan mutu pascapanen (post-harvest loss).
              </p>
            </div>

            {/* Pillar 3: IoT & Digital Sync */}
            <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-200/80 space-y-2">
              <div className="flex items-center gap-2 text-teal-900 font-bold text-xs">
                <div className="w-7 h-7 rounded-lg bg-teal text-white flex items-center justify-center shadow-sm">
                  <Cpu className="w-4 h-4" />
                </div>
                <span>3. Node Sirkuit IoT Digital</span>
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                Titik-titik putih pada gelombang adalah <strong>simbol konektivitas telemetri pintar</strong>. Data suhu presisi ≤ -18°C, konsumsi daya, dan alarm peringatan tersinkronisasi secara digital langsung ke dashboard pengelola.
              </p>
            </div>

            {/* Pillar 4: BlueSync Identity */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-navy font-bold text-xs">
                <div className="w-7 h-7 rounded-lg bg-navy text-white flex items-center justify-center shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>4. Tipografi Tegas & Amanah</span>
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                Bentuk huruf kapital <strong>BLUESYNC</strong> mencerminkan ketangguhan fisik unit stainless steel tahan korosi, stabilitas rantai dingin, serta tata kelola syariah yang transparan, jujur, dan berkeadilan (amanah).
              </p>
            </div>
          </div>

          {/* SDG Alignment Tag */}
          <div className="bg-navy text-white p-4 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold block">Kontribusi Nyata 4 Pilar SDGs:</span>
                <span className="text-[10px] text-slate-300">
                  SDG 7 (Energi Bersih) • SDG 8 (Pekerjaan Layak) • SDG 12 (Konsumsi Bertanggung Jawab) • SDG 14 (Ekosistem Laut)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-navy hover:bg-navy-800 text-white font-bold py-2 px-5 rounded-xl text-xs transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
