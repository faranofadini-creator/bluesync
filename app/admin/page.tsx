"use client";

import React from "react";
import Link from "next/link";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { formatRupiah } from "@/lib/utils";
import { Server, Users, DollarSign, Activity, AlertTriangle, ArrowRight } from "lucide-react";

export default function AdminGlobalDashboardPage() {
  const { units, users, bookings, payments, notifications } = useBlueSyncStore();

  const totalNationalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const activeAlerts = notifications.filter((n) => !n.isRead && (n.severity === "critical" || n.severity === "warning"));

  return (
    <div className="space-y-6">
      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500">Total Unit Terkoneksi</span>
          <div className="text-3xl font-extrabold font-mono text-navy mt-2">{units.length} Unit</div>
          <span className="text-[10px] text-teal font-semibold mt-1 block">5 Desa Pesisir Aktif</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500">Total Pengguna Terdaftar</span>
          <div className="text-3xl font-extrabold font-mono text-ocean mt-2">{users.length} Akun</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Nelayan, Operator, Buyer, Gov</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500">Akumulasi Transaksi Ekosistem</span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-teal mt-2 truncate">
            {formatRupiah(totalNationalRevenue)}
          </div>
          <span className="text-[10px] text-green font-semibold mt-1 block">100% Tercatat Transparan</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500">Alert Aktif Sistem</span>
          <div className="text-3xl font-extrabold font-mono text-amber-500 mt-2">
            {activeAlerts.length} Peringatan
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Ambang batas IoT</span>
        </div>
      </div>

      {/* Fleet Overview Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-navy text-base">Status Seluruh Armada Cold Storage</h3>
          <Link href="/admin/units" className="text-xs font-bold text-teal hover:underline">
            Kelola Unit (CRUD) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b bg-slate-50 text-slate-600 font-bold uppercase text-[10px]">
                <th className="p-3">Kode</th>
                <th className="p-3">Nama Unit</th>
                <th className="p-3">Lokasi</th>
                <th className="p-3">Kapasitas</th>
                <th className="p-3">Suhu</th>
                <th className="p-3">Baterai</th>
                <th className="p-3">Solar PV</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {units.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-navy">{u.code}</td>
                  <td className="p-3 font-medium text-slate-800">{u.name}</td>
                  <td className="p-3 text-slate-600">{u.locationName}</td>
                  <td className="p-3 font-mono">{u.currentLoadKg} / {u.capacityKg} kg</td>
                  <td className="p-3 font-mono font-bold text-teal">{u.currentTempC}°C</td>
                  <td className="p-3 font-mono">{u.currentBatteryPct}%</td>
                  <td className="p-3 font-mono text-amber-600 font-bold">{u.currentSolarKw} kW</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                        u.status === "optimal"
                          ? "bg-green-100 text-green-800"
                          : u.status === "warning"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
