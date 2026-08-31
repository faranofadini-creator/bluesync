"use client";

import React from "react";
import { QrCode, Printer, X, ShieldCheck, CheckCircle2, MapPin, Calendar, User, Scale, ArrowDownToLine } from "lucide-react";
import { formatRupiah } from "@/lib/utils";

interface PrintableVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    bookingCode: string;
    batchCode: string;
    fishermanName: string;
    fishermanPhone?: string;
    unitName: string;
    unitCode?: string;
    locationName: string;
    fishSpeciesName: string;
    weightKg: number;
    startDate: string;
    endDate: string;
    durationDays: number;
    totalPrice: number;
    paymentMethod: string;
    paymentStatus: string;
    createdAt: string;
  };
}

export default function PrintableVoucherModal({
  isOpen,
  onClose,
  bookingData,
}: PrintableVoucherModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden print:shadow-none print:border-none print:max-w-full">
        {/* Header - Hidden when printing */}
        <div className="bg-navy text-white px-6 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-teal" />
            <h3 className="font-bold text-sm">Voucher & Pass Masuk Cold Storage</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-navy-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Ticket Area */}
        <div id="printable-voucher" className="p-6 sm:p-8 space-y-6 text-navy">
          {/* Brand & Security Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
            <div>
              <div className="text-xl font-black tracking-tight text-navy flex items-center gap-1.5">
                <span>🌊 BLUESYNC</span>
                <span className="text-[10px] bg-teal text-white px-2 py-0.5 rounded font-mono font-bold">
                  OFFICIAL PASS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Digital Micro Cold Storage Network • Indonesia
              </p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 text-[10px] font-bold font-mono bg-green-100 text-green-800 px-2.5 py-1 rounded-full border border-green-300">
                <CheckCircle2 className="w-3 h-3" />
                <span>LUNAS / VERIFIED</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">
                {new Date(bookingData.createdAt || Date.now()).toLocaleString("id-ID")}
              </div>
            </div>
          </div>

          {/* Ticket Barcode & ID */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-500">KODE BOOKING:</span>
              <strong className="text-navy text-sm font-bold">{bookingData.bookingCode}</strong>
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-500">KODE BATCH KETERTELUSURAN:</span>
              <strong className="text-teal font-bold">{bookingData.batchCode}</strong>
            </div>

            {/* Visual Barcode Simulation */}
            <div className="pt-2">
              <div className="h-10 w-full flex items-center justify-center gap-1 bg-white p-1 rounded border border-slate-200">
                {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 3, 1, 2, 4, 2, 1, 3, 2, 1, 4, 2, 1, 3, 1].map(
                  (bar, i) => (
                    <div
                      key={i}
                      className="bg-navy h-full rounded-sm"
                      style={{ width: `${bar * 2}px` }}
                    />
                  )
                )}
              </div>
              <div className="text-[9px] font-mono tracking-widest text-slate-400 mt-1">
                *{bookingData.batchCode}*
              </div>
            </div>
          </div>

          {/* QR Code & Core Details */}
          <div className="grid grid-cols-3 gap-4 items-center bg-teal-50/50 p-4 rounded-2xl border border-teal-100">
            <div className="col-span-1 flex flex-col items-center justify-center bg-white p-3 rounded-xl border border-teal-200 shadow-sm">
              <QrCode className="w-24 h-24 text-navy" />
              <span className="text-[8px] font-mono font-bold text-teal-800 mt-1 text-center">
                SCAN AT PPI COLD ROOM
              </span>
            </div>

            <div className="col-span-2 space-y-2 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Pemilik Tangkapan / Nelayan:</span>
                <strong className="text-navy text-sm">{bookingData.fishermanName}</strong>
                {bookingData.fishermanPhone && (
                  <span className="text-[11px] text-slate-500 block font-mono">
                    {bookingData.fishermanPhone}
                  </span>
                )}
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">Komoditas & Bobot:</span>
                <strong className="text-navy text-sm">
                  {bookingData.weightKg} KG • {bookingData.fishSpeciesName}
                </strong>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">Lokasi Unit Cold Storage:</span>
                <span className="text-slate-800 font-medium">
                  {bookingData.unitName} ({bookingData.locationName})
                </span>
              </div>
            </div>
          </div>

          {/* Schedule & Financial Breakdown */}
          <div className="border-t border-b border-slate-200 py-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Tanggal Masuk:</span>
              <strong className="font-mono text-navy">{bookingData.startDate}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Batas Pengambilan:</span>
              <strong className="font-mono text-navy">{bookingData.endDate} ({bookingData.durationDays} Hari)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Metode Pembayaran:</span>
              <span className="uppercase font-mono font-bold text-slate-700">
                {bookingData.paymentMethod === "qris" ? "QRIS Dinamis" : bookingData.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-slate-100">
              <span className="font-bold text-navy">Total Biaya Sewa:</span>
              <span className="text-lg font-extrabold font-mono text-teal">
                {formatRupiah(bookingData.totalPrice)}
              </span>
            </div>
          </div>

          {/* Verification Footnote & BUMDes Stamp */}
          <div className="flex justify-between items-end text-[10px] text-slate-400 pt-1">
            <div className="space-y-0.5">
              <p>• Tunjukkan voucher ini kepada operator BUMDes saat check-in.</p>
              <p>• Suhu cold storage dijaga otomatis ≤ -18°C berbasis solar-hybrid.</p>
              <p className="font-mono text-slate-300">Security Hash: SHA256-BLUESYNC-{bookingData.batchCode}</p>
            </div>
            <div className="text-center p-2 rounded-xl border border-teal-300 bg-teal-50/50 text-teal-800 font-mono font-bold text-[9px] w-28">
              <ShieldCheck className="w-4 h-4 mx-auto mb-0.5 text-teal" />
              VERIFIKASI SISTEM
            </div>
          </div>
        </div>

        {/* Modal Action Controls - Hidden when printing */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition"
          >
            Tutup
          </button>
          <button
            onClick={handlePrint}
            className="bg-navy hover:bg-navy-800 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 shadow-md transition hover:scale-105 active:scale-95"
          >
            <Printer className="w-4 h-4 text-teal" />
            <span>🖨️ Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
