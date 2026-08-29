"use client";

import React from "react";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { formatRupiah } from "@/lib/utils";
import { FileSpreadsheet, Download, Printer, ShieldCheck, Globe2 } from "lucide-react";

export default function AdminReportsPage() {
  const { impactRecords, units, partnerships } = useBlueSyncStore();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 print:shadow-none print:border-none">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase bg-teal text-white px-2 py-0.5 rounded">
            DOKUMEN RESMI BLUESYNC • IMPACT REPORT v2.0
          </span>
          <h2 className="text-2xl font-extrabold text-navy mt-1">
            Laporan Akuntabilitas Dampak Cold Chain Nasional
          </h2>
          <p className="text-xs text-slate-500">
            Diterbitkan untuk Kementerian Kelautan & Perikanan RI serta Lembaga Mitra CSR.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="bg-navy hover:bg-navy-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 transition shadow-sm print:hidden"
        >
          <Printer className="w-4 h-4 text-teal" />
          <span>Cetak / Simpan PDF</span>
        </button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-slate-50 rounded-xl border">
          <span className="text-slate-500 block">Total Ikan Tersimpan:</span>
          <span className="text-xl font-bold font-mono text-navy">2.560 kg</span>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border">
          <span className="text-slate-500 block">Post-Harvest Loss Avoided:</span>
          <span className="text-xl font-bold font-mono text-green">640 kg</span>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border">
          <span className="text-slate-500 block">Total Energi Bersih Surya:</span>
          <span className="text-xl font-bold font-mono text-amber-600">1.045 kWh</span>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border">
          <span className="text-slate-500 block">Reduksi Emisi CO₂eq:</span>
          <span className="text-xl font-bold font-mono text-green">762.8 kg</span>
        </div>
      </div>

      {/* Detailed Records Table */}
      <div className="space-y-2">
        <h3 className="font-bold text-navy text-sm">Rincian Dampak per Node Unit BUMDes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b bg-slate-50 text-slate-600 font-bold uppercase text-[10px]">
                <th className="p-3">Kode Unit</th>
                <th className="p-3">Wilayah PPI</th>
                <th className="p-3">Ikan Masuk</th>
                <th className="p-3">Loss Avoided</th>
                <th className="p-3">Surya PV (kWh)</th>
                <th className="p-3">CO₂ Avoided</th>
                <th className="p-3">Nilai Ekonomi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {impactRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-navy">{r.unitCode}</td>
                  <td className="p-3 text-slate-800">{r.locationName}</td>
                  <td className="p-3 font-mono">{r.kgStored} kg</td>
                  <td className="p-3 font-mono font-bold text-green">{r.kgLossAvoided} kg</td>
                  <td className="p-3 font-mono text-amber-600">{r.energyKwh} kWh</td>
                  <td className="p-3 font-mono text-green">{r.co2AvoidedKg} kg</td>
                  <td className="p-3 font-mono font-bold text-teal">{formatRupiah(r.revenueRp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Signature Seal Box */}
      <div className="pt-8 border-t flex justify-between items-end text-xs text-slate-500">
        <div>
          <div>Dicetak Otomatis oleh Sistem BlueSync Cloud</div>
          <div className="font-mono text-[10px]">Timestamp: {new Date().toISOString()}</div>
        </div>
        <div className="text-right">
          <div className="font-bold text-navy">Direktorat Tata Kelola Pesisir BlueSync</div>
          <div className="text-[10px] text-slate-400 mt-6">Sertifikasi Standar HACCP & KKP RI</div>
        </div>
      </div>
    </div>
  );
}
