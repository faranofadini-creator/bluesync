"use client";

import React from "react";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { MonthlyRevenueChart } from "@/components/charts/telemetry-charts";
import { formatRupiah } from "@/lib/utils";
import { DollarSign, TrendingUp, Building2, ShoppingBag, ShieldCheck, Activity } from "lucide-react";

export default function OperatorRevenuePage() {
  const { payments, leaseContracts, orders, units } = useBlueSyncStore();
  const lease = leaseContracts[0];
  const unit = units[0];

  const rentalIncome = payments
    .filter((p) => p.bookingId)
    .reduce((sum, p) => sum + p.amount, 0);

  const marketCommissions = orders.reduce(
    (sum, ord) => sum + ord.totalPrice * 0.035, // 3.5% commission
    0
  );

  const totalMonthlyGross = rentalIncome + marketCommissions;

  return (
    <div className="space-y-6">
      {/* 4 Financial KPI Cards (PRD Section 14.3) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500">Pendapatan Sewa (Pay-per-use)</span>
          <div className="text-xl sm:text-2xl font-extrabold font-mono text-teal mt-2">
            {formatRupiah(rentalIncome)}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Bagi hasil 70% BUMDes</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500">Cicilan Lease-to-Own Unit</span>
          <div className="text-xl sm:text-2xl font-extrabold font-mono text-ocean mt-2">
            {formatRupiah(lease?.monthlyInstallmentRp || 4111111)}
          </div>
          <span className="text-[10px] text-teal font-semibold mt-1 block">
            {lease?.remainingMonths || 26} bulan tersisa ({lease?.progressPct || 38.8}%)
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500">Komisi Pasar Ikan Desa</span>
          <div className="text-xl sm:text-2xl font-extrabold font-mono text-orange mt-2">
            {formatRupiah(marketCommissions)}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Take-rate 3.5% volume</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500">Total Revenue Terkumpul</span>
          <div className="text-xl sm:text-2xl font-extrabold font-mono text-navy mt-2">
            {formatRupiah(totalMonthlyGross)}
          </div>
          <span className="text-[10px] text-green font-semibold mt-1 block">Surplus Operasional</span>
        </div>
      </div>

      {/* Monthly Chart */}
      <MonthlyRevenueChart />

      {/* Lease-to-own Progress Card (PRD Section 14.3) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-navy text-sm">Status Kontrak Kepemilikan Unit (Lease-to-Own)</h3>
            <span className="text-xs text-slate-500">BUMDes Bahari Jaya • Unit BS-001</span>
          </div>
          <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full">
            {lease?.progressPct || 38.8}% Terbayar
          </span>
        </div>

        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div
            className="bg-teal h-full rounded-full transition-all duration-700"
            style={{ width: `${lease?.progressPct || 38.8}%` }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2">
          <div>
            <span className="text-slate-400 text-[10px]">Harga Pokok Unit:</span>
            <div className="font-bold font-mono text-navy">{formatRupiah(lease?.unitPriceRp || 185000000)}</div>
          </div>
          <div>
            <span className="text-slate-400 text-[10px]">Uang Muka (DP 20%):</span>
            <div className="font-bold font-mono text-teal">{formatRupiah(lease?.dpPaidRp || 37000000)}</div>
          </div>
          <div>
            <span className="text-slate-400 text-[10px]">Angsuran Bulanan:</span>
            <div className="font-bold font-mono text-navy">{formatRupiah(lease?.monthlyInstallmentRp || 4111111)}</div>
          </div>
          <div>
            <span className="text-slate-400 text-[10px]">Sisa Tenor:</span>
            <div className="font-bold font-mono text-ocean">{lease?.remainingMonths || 26} dari {lease?.totalMonths || 36} Bulan</div>
          </div>
        </div>
      </div>
    </div>
  );
}
