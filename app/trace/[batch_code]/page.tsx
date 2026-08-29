"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { formatRupiah } from "@/lib/utils";
import {
  QrCode,
  ShieldCheck,
  ThermometerSnowflake,
  Calendar,
  User,
  MapPin,
  Building2,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export default function FishTraceabilityPage() {
  const params = useParams();
  const batchCode = params?.batch_code as string;
  const { batches } = useBlueSyncStore();

  const batch =
    batches.find((b) => b.batchCode.toLowerCase() === batchCode?.toLowerCase()) ||
    batches[0];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-navy"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Beranda</span>
      </Link>

      <div className="bg-white rounded-3xl border-2 border-teal/40 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-navy via-navy to-ocean text-white p-6 sm:p-8 space-y-3">
          <div className="flex justify-between items-start">
            <div className="inline-flex items-center gap-1.5 bg-teal/20 text-teal-light px-3 py-1 rounded-full text-xs font-bold font-mono border border-teal/40">
              <ShieldCheck className="w-4 h-4" />
              <span>TERVERIFIKASI RANTAI DINGIN BLUESYNC</span>
            </div>
            <span className="text-[11px] font-mono text-slate-300">
              ID: {batch.batchCode}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {batch.fishSpeciesName} Segar
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Ditangkap oleh Nelayan <strong className="text-white">{batch.fishermanName}</strong> • {batch.locationName}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-teal-50 p-4 rounded-2xl border border-teal-200 text-center">
              <span className="text-[10px] uppercase font-bold text-teal-800 tracking-wider block">
                Skor Kesegaran (Freshness)
              </span>
              <div className="text-4xl font-extrabold font-mono text-teal mt-1">
                {batch.freshnessScore}/100
              </div>
              <span className="text-[10px] text-teal-700 font-semibold mt-0.5 inline-block">
                Grade A • Sashimi / Ekspor
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Suhu Rata-rata Cold Chain
              </span>
              <div className="text-4xl font-extrabold font-mono text-navy mt-1">
                -18.4°C
              </div>
              <span className="text-[10px] text-green font-semibold mt-0.5 inline-block">
                Stabil Selama Penyimpanan
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Total Bobot Batch
              </span>
              <div className="text-4xl font-extrabold font-mono text-navy mt-1">
                {batch.weightKg} kg
              </div>
              <span className="text-[10px] text-slate-500 font-semibold mt-0.5 inline-block">
                {formatRupiah(batch.pricePerKg)} / kg
              </span>
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="bg-slate-50 px-4 py-2.5 text-xs font-bold text-navy border-b border-slate-200">
              Riwayat Keterlacakan Tangkapan & Penyimpanan (Traceability Log)
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="p-3 flex justify-between">
                <span className="text-slate-500">Jenis Komoditas Ikan:</span>
                <span className="font-bold text-navy">{batch.fishSpeciesName}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-500">Nama Nelayan Tangkap:</span>
                <span className="font-bold text-navy">{batch.fishermanName}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-500">Unit Penyimpanan:</span>
                <span className="font-bold text-navy">{batch.unitName} ({batch.unitCode})</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-500">BUMDes / Koperasi Pengelola:</span>
                <span className="font-bold text-navy">{batch.bumdesName}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-500">Waktu Masuk Storage:</span>
                <span className="font-mono text-slate-700">{new Date(batch.entryDate).toLocaleString("id-ID")}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-500">Petugas Operator Verifikator:</span>
                <span className="font-bold text-navy">{batch.operatorName}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-500">Catatan Kondisi Fisik:</span>
                <span className="text-slate-700">{batch.notes}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-teal-light">Log Sensor Telemetri Suhu Berkelanjutan</span>
              <span className="text-[10px] font-mono text-slate-400">Recorded via MQTT</span>
            </div>
            <div className="flex items-center gap-2 pt-2">
              {batch.tempHistory.map((t, idx) => (
                <div key={idx} className="flex-1 text-center bg-navy-800 p-2 rounded-lg border border-navy-700">
                  <span className="text-[9px] text-slate-400 block font-mono">T-{idx + 1}</span>
                  <span className="font-mono font-bold text-xs text-teal">{t}°C</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Link
              href={`/market/${batch.id}`}
              className="flex-1 bg-teal hover:bg-teal-dark text-white font-bold py-3 px-4 rounded-xl text-xs text-center transition shadow-md"
            >
              Beli Ikan dari Batch Ini di Marketplace
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}