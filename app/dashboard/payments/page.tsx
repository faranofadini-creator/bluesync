"use client";

import React, { useState } from "react";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { formatRupiah } from "@/lib/utils";
import { CreditCard, QrCode, CheckCircle2, DollarSign, Download, ArrowRight } from "lucide-react";

export default function FishermanPaymentsPage() {
  const { payments, currentUser } = useBlueSyncStore();
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-bold text-navy">Tagihan & Riwayat Pembayaran</h2>
        <p className="text-xs text-slate-500">
          Semua transaksi sewa cold storage terintegrasi gateway pembayaran Xendit & QRIS Nasional.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
              <th className="p-3">Ref Transaksi</th>
              <th className="p-3">Keterangan</th>
              <th className="p-3">Metode</th>
              <th className="p-3">Jumlah</th>
              <th className="p-3">Status</th>
              <th className="p-3">Waktu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.map((pay) => (
              <tr key={pay.id} className="hover:bg-slate-50 transition">
                <td className="p-3 font-mono font-bold text-navy">{pay.xenditRef}</td>
                <td className="p-3 font-medium text-slate-700">{pay.description}</td>
                <td className="p-3 uppercase font-mono text-[11px] text-slate-600">{pay.method}</td>
                <td className="p-3 font-mono font-bold text-navy">{formatRupiah(pay.amount)}</td>
                <td className="p-3">
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase">
                    <CheckCircle2 className="w-3 h-3" />
                    {pay.status}
                  </span>
                </td>
                <td className="p-3 text-slate-500 text-[11px]">
                  {new Date(pay.paidAt || pay.createdAt).toLocaleDateString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
