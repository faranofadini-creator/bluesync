"use client";

import React from "react";
import Link from "next/link";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import TemperatureGauge from "@/components/iot/temperature-gauge";
import LiveSensorBadges from "@/components/iot/live-sensor-badge";
import { formatRupiah } from "@/lib/utils";
import {
  Activity,
  ClipboardList,
  AlertTriangle,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Fish,
} from "lucide-react";

export default function OperatorDashboardPage() {
  const { units, bookings, payments, impactRecords } = useBlueSyncStore();
  const bs1 = units.find((u) => u.code === "BS-001") || units[0];

  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const activeBookings = bookings.filter((b) => b.status === "active");

  const totalRevenueRp = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalLossAvoidedKg = impactRecords.reduce((sum, r) => sum + r.kgLossAvoided, 0);

  return (
    <div className="space-y-6">
      {/* 4 Quick Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <span className="text-xs text-slate-500">Okupansi Muatan Unit</span>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-navy">
              {bs1.currentLoadKg} / {bs1.capacityKg} <span className="text-xs text-slate-400">kg</span>
            </div>
            <div className="text-[11px] text-teal font-semibold mt-1">
              {Math.round((bs1.currentLoadKg / bs1.capacityKg) * 100)}% Terisi
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <span className="text-xs text-slate-500">Booking Menunggu Konfirmasi</span>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-500">
              {pendingBookings.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Perlu diverifikasi fisik</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <span className="text-xs text-slate-500">Total Pendapatan Terkumpul</span>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-navy truncate">
              {formatRupiah(totalRevenueRp)}
            </div>
            <div className="text-[11px] text-green font-semibold mt-1">Pay-per-use + Pasar</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <span className="text-xs text-slate-500">Ikan Terselamatkan (Anti-Loss)</span>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-green">
              {totalLossAvoidedKg.toFixed(1)} <span className="text-xs text-slate-400">kg</span>
            </div>
            <div className="text-[11px] text-teal font-semibold mt-1">Dampak Koperasi Desa</div>
          </div>
        </div>
      </div>

      {/* Live Unit Badges */}
      <LiveSensorBadges unit={bs1} />

      {/* Grid: Unit Temperature Gauge & Pending Bookings Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-navy text-sm">Status Telemetri Unit BS-001</h3>
            <Link href="/operator/units/unit-01" className="text-xs font-bold text-teal hover:underline">
              Buka Sensor Lengkap →
            </Link>
          </div>

          <TemperatureGauge temperatureC={bs1.currentTempC} unitCode={bs1.code} size="lg" />
        </div>

        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-navy text-sm">Booking Masuk Terbaru</h3>
            <Link href="/operator/bookings" className="text-xs font-bold text-ocean hover:underline">
              Kelola Semua ({bookings.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {bookings.slice(0, 4).map((b) => (
              <div
                key={b.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-navy">{b.bookingCode}</span>
                    <span className="text-[10px] font-bold px-2 py-0.2 bg-teal-100 text-teal-800 rounded">
                      {b.status}
                    </span>
                  </div>
                  <div className="font-medium text-slate-800 mt-0.5">
                    {b.fishermanName} • {b.weightKg} kg {b.fishSpeciesName}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-navy">{formatRupiah(b.totalPrice)}</div>
                  <div className="text-[10px] text-slate-400">{b.durationDays} hari simpan</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
