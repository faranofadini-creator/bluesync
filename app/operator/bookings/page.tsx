"use client";

import React, { useState } from "react";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { formatRupiah } from "@/lib/utils";
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  LogOut,
  FileText,
  ShieldCheck,
  Search,
  Sparkles,
} from "lucide-react";

export default function OperatorBookingsPage() {
  const {
    bookings,
    approveBooking,
    rejectBooking,
    extendBooking,
    checkOutBooking,
  } = useBlueSyncStore();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedInvoiceBooking, setSelectedInvoiceBooking] = useState<any | null>(null);
  const [checkoutModalResult, setCheckoutModalResult] = useState<any | null>(null);

  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.bookingCode.toLowerCase().includes(search.toLowerCase()) ||
      b.fishermanName.toLowerCase().includes(search.toLowerCase()) ||
      b.fishSpeciesName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleCheckout = (bookingId: string) => {
    const res = checkOutBooking(bookingId);
    if (res) {
      setCheckoutModalResult(res);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy">Manajemen Booking & Antrean Ikan</h2>
          <p className="text-xs text-slate-500">
            Kelola persetujuan, perpanjangan durasi, serta proses serah terima & checkout ikan nelayan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Cari kode/nelayan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-xl px-3 py-1.5 text-xs text-navy focus:outline-none focus:border-teal"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-xl px-3 py-1.5 text-xs text-navy focus:outline-none focus:border-teal"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Bookings Table (PRD Section 14.2) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
              <th className="p-3">Kode Booking</th>
              <th className="p-3">Nama Nelayan</th>
              <th className="p-3">Spesies Ikan</th>
              <th className="p-3">Bobot</th>
              <th className="p-3">Durasi</th>
              <th className="p-3">Total Tarif</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Aksi Operator</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50 transition">
                <td className="p-3 font-mono font-bold text-navy">{b.bookingCode}</td>
                <td className="p-3 font-medium text-slate-900">{b.fishermanName}</td>
                <td className="p-3">{b.fishSpeciesName}</td>
                <td className="p-3 font-mono font-bold text-navy">{b.weightKg} kg</td>
                <td className="p-3 font-mono text-slate-600">{b.durationDays} hari</td>
                <td className="p-3 font-mono font-bold text-teal">{formatRupiah(b.totalPrice)}</td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      b.status === "active"
                        ? "bg-green-100 text-green-800"
                        : b.status === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : b.status === "completed"
                        ? "bg-slate-100 text-slate-600"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {/* Pending Actions */}
                    {b.status === "pending" && (
                      <>
                        <button
                          onClick={() => approveBooking(b.id)}
                          className="bg-teal hover:bg-teal-dark text-white px-2.5 py-1 rounded text-[11px] font-bold"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectBooking(b.id, "Kapasitas penuh sementara")}
                          className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded text-[11px] font-bold"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {/* Active Actions */}
                    {b.status === "active" && (
                      <>
                        <button
                          onClick={() => extendBooking(b.id, 1)}
                          title="Perpanjang durasi penyimpanan +1 hari"
                          className="bg-slate-100 hover:bg-slate-200 text-navy px-2 py-1 rounded text-[11px] font-bold border"
                        >
                          +1 Hari
                        </button>
                        <button
                          onClick={() => handleCheckout(b.id)}
                          className="bg-ocean hover:bg-ocean-dark text-white px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1"
                        >
                          <LogOut className="w-3 h-3" />
                          <span>Check Out</span>
                        </button>
                      </>
                    )}

                    {/* Invoice Button */}
                    <button
                      onClick={() => setSelectedInvoiceBooking(b)}
                      className="p-1 text-slate-400 hover:text-navy"
                      title="Lihat Invoice"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Checkout & Impact Calculation Modal (AC-04) */}
      {checkoutModalResult && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border-2 border-teal animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-teal">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-lg font-bold text-navy">Checkout & Perhitungan Dampak Sukses</h3>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs border">
              <div className="flex justify-between">
                <span className="text-slate-500">Kode Booking:</span>
                <span className="font-mono font-bold text-navy">{checkoutModalResult.booking.bookingCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ikan Terselamatkan (Anti-Loss):</span>
                <span className="font-mono font-bold text-green">
                  ~{checkoutModalResult.impact.foodLossAvoidedKg} kg
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nilai Ekonomi Terjaga:</span>
                <span className="font-mono font-bold text-teal">
                  {formatRupiah(checkoutModalResult.impact.economicValueRp)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Energi Surya Terpakai:</span>
                <span className="font-mono font-bold text-amber-600">
                  {checkoutModalResult.impact.solarKwh} kWh
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Reduksi Emisi CO₂:</span>
                <span className="font-mono font-bold text-green">
                  {checkoutModalResult.impact.co2AvoidedKg} kg CO₂
                </span>
              </div>
            </div>

            <button
              onClick={() => setCheckoutModalResult(null)}
              className="w-full bg-navy hover:bg-navy-800 text-white font-bold py-2.5 rounded-xl text-xs"
            >
              Selesai & Tutup
            </button>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {selectedInvoiceBooking && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="text-[10px] font-mono text-teal uppercase font-bold">INVOICE SEWA RESMI</span>
                <h3 className="text-lg font-bold text-navy">{selectedInvoiceBooking.bookingCode}</h3>
              </div>
              <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded">LUNAS</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Penyewa:</span>
                <span className="font-bold text-navy">{selectedInvoiceBooking.fishermanName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Komoditas:</span>
                <span className="text-navy">{selectedInvoiceBooking.weightKg} kg {selectedInvoiceBooking.fishSpeciesName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Durasi:</span>
                <span className="text-navy">{selectedInvoiceBooking.durationDays} Hari</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-bold text-navy">Total Bayar:</span>
                <span className="font-mono font-bold text-teal text-sm">
                  {formatRupiah(selectedInvoiceBooking.totalPrice)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedInvoiceBooking(null)}
              className="w-full bg-navy hover:bg-navy-800 text-white font-bold py-2.5 rounded-xl text-xs"
            >
              Tutup Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
