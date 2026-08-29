"use client";

import React, { useState } from "react";
import Link from "next/link";
import { INITIAL_PARTNERSHIPS } from "@/lib/mock-data";
import { formatRupiah } from "@/lib/utils";
import { Building2, Handshake, CheckCircle2, Send, ArrowRight } from "lucide-react";

export default function PartnersPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-xs font-mono font-bold text-teal uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Kemitraan Strategis
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight">
          Kolaborasi Membangun Pesisir Berdaya
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Bekerja sama dengan Kementerian Kelautan & Perikanan (KKP), BUMDes, Koperasi Nelayan, serta program CSR BUMN & Swasta.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-navy text-lg">Program Kemitraan Berjalan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INITIAL_PARTNERSHIPS.map((p) => (
            <div key={p.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                  {p.type}
                </span>
                <span className="text-xs font-bold text-teal font-mono">{p.activeUnits}/{p.targetUnits} Unit</span>
              </div>
              <h4 className="font-bold text-navy text-sm">{p.partnerName}</h4>
              <p className="text-xs text-slate-500">{p.programName}</p>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-xs">
                <span className="text-slate-400">Total Hibah:</span>
                <span className="font-mono font-bold text-navy">{formatRupiah(p.fundingRp)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div>
          <h3 className="text-xl font-bold text-navy">Formulir Pengajuan Unit Cold Storage Desa</h3>
          <p className="text-xs text-slate-500 mt-1">
            Daftarkan desa pesisir atau koperasi Anda untuk program penempatan unit solar-hybrid BlueSync.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-teal-50 text-teal-900 rounded-2xl border border-teal-200 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-teal mx-auto" />
            <h4 className="font-bold text-base">Pengajuan Berhasil Dikirim!</h4>
            <p className="text-xs text-teal-800">
              Tim evaluasi teknis BlueSync akan menghubungi perwakilan desa Anda dalam 2 hari kerja untuk survei kelayakan PLTS.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs"
          >
            <div>
              <label className="block font-bold text-navy mb-1">Nama Desa / Wilayah Pesisir</label>
              <input required type="text" placeholder="Contoh: Desa Sendangbiru" className="w-full border p-2.5 rounded-xl" />
            </div>
            <div>
              <label className="block font-bold text-navy mb-1">Nama Lembaga (BUMDes / Koperasi)</label>
              <input required type="text" placeholder="Contoh: BUMDes Bahari Jaya" className="w-full border p-2.5 rounded-xl" />
            </div>
            <div>
              <label className="block font-bold text-navy mb-1">Kabupaten / Provinsi</label>
              <input required type="text" placeholder="Contoh: Malang, Jawa Timur" className="w-full border p-2.5 rounded-xl" />
            </div>
            <div>
              <label className="block font-bold text-navy mb-1">Estimasi Jumlah Nelayan Aktif</label>
              <input required type="number" placeholder="Contoh: 45" className="w-full border p-2.5 rounded-xl" />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-bold text-navy mb-1">Nomor Kontak / WhatsApp Perwakilan</label>
              <input required type="tel" placeholder="0812-xxxx-xxxx" className="w-full border p-2.5 rounded-xl" />
            </div>
            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full bg-teal hover:bg-teal-dark text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Formulir Pengajuan Kemitraan</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}