import React from "react";
import Link from "next/link";
import { Fish, Building2, ShoppingBag, ArrowRight, CheckCircle2, QrCode } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-xs font-mono font-bold text-teal uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Alur Kerja 3 Aktor
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight">
          Cara Kerja Ekosistem BlueSync
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Dari pendaratan perahu nelayan, pemantauan otomatis BUMDes, hingga pengiriman ikan bersertifikat dingin ke pembeli akhir.
        </p>
      </div>

      {/* 3 Actor Detailed Steps */}
      <div className="space-y-8">
        {/* Aktor 1: Nelayan */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center font-bold">
              <Fish className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-teal uppercase">Aktor 1</span>
              <h3 className="text-xl font-bold text-navy">Nelayan Kecil (Penyimpan Ikan)</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs pt-2">
            <div className="p-3 bg-slate-50 rounded-xl border space-y-1">
              <span className="font-bold text-navy block">1. Buka Platform</span>
              <p className="text-slate-600">Cek ketersediaan kapasitas dan tarif harian di unit cold storage terdekat.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border space-y-1">
              <span className="font-bold text-navy block">2. Pesan Slot 7-Step</span>
              <p className="text-slate-600">Pilih jenis ikan, bobot, durasi hari, dan bayar lewat QRIS.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border space-y-1">
              <span className="font-bold text-navy block">3. Masukkan Tangkapan</span>
              <p className="text-slate-600">Tunjukkan QR Voucher pada petugas operator BUMDes saat serah terima ikan.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border space-y-1">
              <span className="font-bold text-navy block">4. Pantau & Jual</span>
              <p className="text-slate-600">Pantau suhu pendinginan via HP atau daftarkan ikan ke marketplace BlueSync.</p>
            </div>
          </div>
        </div>

        {/* Aktor 2: Operator BUMDes */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-ocean/10 text-ocean flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-ocean uppercase">Aktor 2</span>
              <h3 className="text-xl font-bold text-navy">Pengelola BUMDes / Koperasi</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs pt-2">
            <div className="p-3 bg-slate-50 rounded-xl border space-y-1">
              <span className="font-bold text-navy block">1. Verifikasi Booking</span>
              <p className="text-slate-600">Timbang fisik ikan dan konfirmasi masuk ke rak penyimpanan teralokasi.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border space-y-1">
              <span className="font-bold text-navy block">2. Monitor IoT 24/7</span>
              <p className="text-slate-600">Terima smart alert jika pintu terbuka lama atau suhu naik di atas -15°C.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border space-y-1">
              <span className="font-bold text-navy block">3. Serah Terima & Checkout</span>
              <p className="text-slate-600">Tutup booking saat nelayan/buyer mengambil ikan, terbitkan invoice digital.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border space-y-1">
              <span className="font-bold text-navy block">4. Bagi Hasil BUMDes</span>
              <p className="text-slate-600">Menerima rekonsiliasi revenue sewa bulanan dan angsuran lease unit.</p>
            </div>
          </div>
        </div>

        {/* Aktor 3: Buyer */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange/10 text-orange flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-orange uppercase">Aktor 3</span>
              <h3 className="text-xl font-bold text-navy">Buyer Ikan & Industri Kuliner</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-3 bg-slate-50 rounded-xl border space-y-1">
              <span className="font-bold text-navy block">1. Jelajahi Katalog Ikan</span>
              <p className="text-slate-600">Lihat stok ikan segar yang sedang tersimpan di berbagai unit desa pesisir.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border space-y-1">
              <span className="font-bold text-navy block">2. Scan QR Traceability</span>
              <p className="text-slate-600">Cek grafik histori dingin, tanggal tangkap, nama nelayan, dan skor kesegaran.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border space-y-1">
              <span className="font-bold text-navy block">3. Order Langsung</span>
              <p className="text-slate-600">Beli langsung dari produsen dengan transparansi harga dan jaminan mutu.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          href="/dashboard/booking"
          className="inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white font-bold px-6 py-3 rounded-xl text-xs transition shadow-md"
        >
          <span>Mulai Simulasi Booking Nelayan</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
