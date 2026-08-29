"use client";

import React from "react";
import Link from "next/link";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import TemperatureGauge from "@/components/iot/temperature-gauge";
import LiveSensorBadges from "@/components/iot/live-sensor-badge";
import { formatRupiah } from "@/lib/utils";
import {
  Fish,
  Scale,
  Calendar,
  CreditCard,
  PlusCircle,
  QrCode,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Clock,
} from "lucide-react";

export default function FishermanDashboardPage() {
  const { bookings, units, batches, payments, currentUser } = useBlueSyncStore();

  const myBookings = bookings.filter(
    (b) => b.fishermanId === currentUser.id || currentUser.role === "fisherman"
  );
  const activeBookings = myBookings.filter((b) => b.status === "active");

  const totalKgStored = activeBookings.reduce((sum, b) => sum + b.weightKg, 0);

  const unitBS1 = units.find((u) => u.code === "BS-001") || units[0];
  const remainingCapacity = Math.max(0, unitBS1.capacityKg - unitBS1.currentLoadKg);

  const totalUnpaidRp = myBookings
    .filter((b) => b.paymentStatus === "pending")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div className="space-y-6">
      {/* 12.1 KPI Cards (Top Section - PRD Section 12.1) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Ikan Tersimpan (kg) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Ikan Tersimpan</span>
            <Fish className="w-4 h-4 text-teal" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-navy">
              {totalKgStored} <span className="text-sm font-normal text-slate-500">kg</span>
            </div>
            <div className="text-[11px] text-teal font-semibold mt-1">
              {activeBookings.length} batch aktif
            </div>
          </div>
        </div>

        {/* Card 2: Sisa Kapasitas Unit */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Sisa Kapasitas Unit</span>
            <Scale className="w-4 h-4 text-ocean" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-ocean">
              {remainingCapacity} <span className="text-sm font-normal text-slate-500">kg</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Unit {unitBS1.code} ({unitBS1.capacityKg} kg max)
            </div>
          </div>
        </div>

        {/* Card 3: Booking Aktif */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Booking Aktif</span>
            <Calendar className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-navy">
              {activeBookings.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Siap diambil / dijual</div>
          </div>
        </div>

        {/* Card 4: Tagihan Bulan Ini */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Tagihan Belum Lunas</span>
            <CreditCard className="w-4 h-4 text-orange" />
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-orange truncate">
              {formatRupiah(totalUnpaidRp)}
            </div>
            <div className="text-[11px] text-green font-semibold mt-1">
              {totalUnpaidRp === 0 ? "Semua Lunas" : "Perlu Dibayar"}
            </div>
          </div>
        </div>
      </div>

      {/* 12.2 Current Storage Widget & Live Sensor Display (PRD Section 12.2) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Responsive SVG Gauge */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-navy text-sm">Status Suhu Cold Storage Anda</h3>
            <span className="text-[10px] font-mono text-teal font-bold bg-teal-50 px-2 py-0.5 rounded">
              Real-Time
            </span>
          </div>

          <TemperatureGauge
            temperatureC={unitBS1.currentTempC}
            unitCode={unitBS1.code}
            size="lg"
          />

          <div className="text-xs text-slate-500 text-center leading-relaxed">
            Ikan Anda disimpan pada temperatur terstandar HACCP internasional untuk menjaga kualitas grade sashimi.
          </div>
        </div>

        {/* Right: Active Bookings & Stored Fish Quick Cards */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-navy text-sm">Batch Ikan Sedang Disimpan</h3>
            <Link
              href="/dashboard/inventory"
              className="text-xs font-bold text-teal hover:underline flex items-center gap-1"
            >
              <span>Semua Ikan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {myBookings.slice(0, 3).map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-teal/50 bg-slate-50/50 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center font-bold">
                    <Fish className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-navy">{b.bookingCode}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.2 rounded-full uppercase ${
                          b.status === "active"
                            ? "bg-green-100 text-green-800"
                            : b.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-navy mt-0.5">
                      {b.weightKg} kg {b.fishSpeciesName}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Masuk: {b.startDate} • Durasi: {b.durationDays} hari
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <Link
                    href={`/trace/BATCH-MUARABARU-TUNA-001`}
                    className="bg-navy hover:bg-navy-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
                  >
                    <QrCode className="w-3.5 h-3.5 text-teal" />
                    <span>QR Pass</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/dashboard/booking"
              className="w-full bg-teal hover:bg-teal-dark text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Simpan Tangkapan Baru (7-Step Wizard)</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
