"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { formatRupiah } from "@/lib/utils";
import {
  Fish,
  ShieldCheck,
  QrCode,
  MapPin,
  Calendar,
  Building2,
  ArrowLeft,
  Truck,
  CheckCircle2,
  CreditCard,
} from "lucide-react";

export default function BatchPurchasePage() {
  const params = useParams();
  const router = useRouter();
  const batchId = params?.batch_id as string;
  const { batches, currentUser, createOrder } = useBlueSyncStore();

  const batch = batches.find((b) => b.id === batchId) || batches[0];

  const [quantityKg, setQuantityKg] = useState<number>(Math.min(batch.weightKg, 25));
  const [deliveryAddress, setDeliveryAddress] = useState<string>(
    "Kawasan Industri Pergudangan Pluit Blok C-12, Jakarta Utara"
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any | null>(null);

  const totalPrice = quantityKg * batch.pricePerKg;

  const handleBuy = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const order = createOrder({
        batchId: batch.id,
        quantityKg,
        deliveryAddress,
      });
      setCreatedOrder(order);
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/market"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-navy"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Katalog Marketplace</span>
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-navy via-navy to-ocean text-white p-6 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono font-bold bg-teal text-white px-2 py-0.5 rounded">
              BATCH ID: {batch.batchCode}
            </span>
            <span className="text-xs font-bold text-green flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              Skor Mutu: {batch.freshnessScore}/100 (Grade A)
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">{batch.fishSpeciesName} Segar</h1>
          <p className="text-xs text-slate-300">
            Tersimpan di {batch.unitName} • Pengelola {batch.bumdesName}
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {createdOrder ? (
            <div className="p-6 bg-green-50 text-green-900 rounded-2xl border border-green-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-green mx-auto" />
              <h3 className="text-xl font-bold text-navy">Pesanan Berhasil Dibuat & Lunas!</h3>
              <p className="text-xs text-slate-600">
                Kode Pesanan: <strong className="font-mono text-navy">{createdOrder.orderCode}</strong>
              </p>
              <div className="p-3 bg-white rounded-xl border text-xs text-left space-y-1">
                <div>Total Pembelian: <strong>{createdOrder.quantityKg} kg</strong></div>
                <div>Total Nilai: <strong className="text-teal font-mono">{formatRupiah(createdOrder.totalPrice)}</strong></div>
                <div>Tujuan: {createdOrder.deliveryAddress}</div>
              </div>
              <Link
                href="/market"
                className="inline-block bg-navy hover:bg-navy-800 text-white font-bold py-2 px-6 rounded-xl text-xs transition"
              >
                Belanja Ikan Lainnya
              </Link>
            </div>
          ) : (
            <form onSubmit={handleBuy} className="space-y-5 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border">
                <div>
                  <span className="text-slate-400 text-[10px] block">Harga Per Kg:</span>
                  <span className="font-bold font-mono text-base text-navy">{formatRupiah(batch.pricePerKg)}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Maksimal Tersedia:</span>
                  <span className="font-bold font-mono text-base text-teal">{batch.weightKg} kg</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-navy mb-1.5">Jumlah yang Ingin Dibeli (Kg):</label>
                <input
                  type="number"
                  min={1}
                  max={batch.weightKg}
                  value={quantityKg}
                  onChange={(e) => setQuantityKg(Number(e.target.value) || 1)}
                  className="w-full border-2 border-slate-300 rounded-xl p-3 text-lg font-bold font-mono text-navy focus:outline-none focus:border-teal"
                />
              </div>

              <div>
                <label className="block font-bold text-navy mb-1.5">Alamat Pengiriman / Cold Chain Trucking:</label>
                <textarea
                  required
                  rows={2}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full border rounded-xl p-2.5 text-navy focus:outline-none focus:border-teal"
                />
              </div>

              <div className="bg-slate-900 text-white p-4 rounded-2xl flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Total Pembayaran:</span>
                  <span className="text-2xl font-extrabold font-mono text-amber-400">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>
                <span className="text-[11px] text-teal-light font-medium">Virtual Account Otomatis</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-orange hover:bg-orange-dark text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition"
              >
                {isProcessing ? (
                  <span>Memproses Pembelian Langsung...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Bayar & Konfirmasi Pesanan Langsung</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}