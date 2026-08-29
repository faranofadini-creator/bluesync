"use client";

import React from "react";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { formatRupiah } from "@/lib/utils";
import {
  Globe2,
  MapPin,
  Users,
  Fish,
  TrendingDown,
  Sun,
  DollarSign,
  ShieldCheck,
} from "lucide-react";

export default function GovImpactDashboardPage() {
  const { units, impactRecords, partnerships } = useBlueSyncStore();

  const totalVillages = units.length; // 5 coastal villages
  const totalFishermenServed = impactRecords.reduce((sum, r) => sum + r.fishermenServed, 0) + 15;
  const totalKgStored = impactRecords.reduce((sum, r) => sum + r.kgStored, 0);
  const totalLossAvoidedKg = impactRecords.reduce((sum, r) => sum + r.kgLossAvoided, 0);
  const totalRenewableEnergyKwh = impactRecords.reduce((sum, r) => sum + r.energyKwh, 0);
  const totalEconomicValueRp = impactRecords.reduce((sum, r) => sum + r.revenueRp, 0) * 12; // annualized

  const lossReductionPct = 25.4;

  return (
    <div className="space-y-6">
      {/* 6 KPI Cards (PRD Section 18) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {/* KPI 1: Desa Terjangkau */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Desa Pesisir Terjangkau</span>
            <MapPin className="w-4 h-4 text-ocean" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-navy">{totalVillages} Desa</div>
          <span className="text-[10px] text-teal font-semibold block">DKI, Jatim, Sulut, Sultra</span>
        </div>

        {/* KPI 2: Nelayan Terlayani */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Nelayan Terlayani (Aktif)</span>
            <Users className="w-4 h-4 text-teal" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-teal">{totalFishermenServed} Orang</div>
          <span className="text-[10px] text-slate-500 block">Penerima manfaat langsung</span>
        </div>

        {/* KPI 3: Total Ikan Tersimpan */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Total Ikan Tersimpan</span>
            <Fish className="w-4 h-4 text-navy" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-navy">
            {totalKgStored.toLocaleString("id-ID")} <span className="text-sm font-normal text-slate-500">kg</span>
          </div>
          <span className="text-[10px] text-green font-semibold block">Kualitas grade ekspor</span>
        </div>

        {/* KPI 4: Post-Harvest Loss Reduced */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Post-Harvest Loss Reduced</span>
            <TrendingDown className="w-4 h-4 text-green" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-green">↓ {lossReductionPct}%</div>
          <span className="text-[10px] text-green font-semibold block">
            {totalLossAvoidedKg.toFixed(0)} kg ikan terselamatkan
          </span>
        </div>

        {/* KPI 5: Energi Terbarukan */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Energi Terbarukan (PV)</span>
            <Sun className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-600">
            {totalRenewableEnergyKwh.toLocaleString("id-ID")} <span className="text-sm font-normal text-slate-500">kWh</span>
          </div>
          <span className="text-[10px] text-slate-500 block">Mengurangi emisi PLTD diesel</span>
        </div>

        {/* KPI 6: Nilai Ekonomi Terjaga */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Nilai Ekonomi Terjaga</span>
            <DollarSign className="w-4 h-4 text-teal" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-navy truncate">
            {formatRupiah(totalEconomicValueRp)}
          </div>
          <span className="text-[10px] text-teal font-semibold block">Peningkatan daya beli pesisir</span>
        </div>
      </div>

      {/* Provincial Deployment Breakdown Map/Table (PRD Section 18) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-navy text-base">Sebaran Node Cold Storage Wilayah Pesisir</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b bg-slate-50 text-slate-600 font-bold uppercase text-[10px]">
                <th className="p-3">Unit Code</th>
                <th className="p-3">Nama PPI / Desa</th>
                <th className="p-3">Provinsi</th>
                <th className="p-3">Kapasitas</th>
                <th className="p-3">Daya Solar PV</th>
                <th className="p-3">Suhu Operasional</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {units.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-navy">{u.code}</td>
                  <td className="p-3 font-medium text-slate-800">{u.locationName}</td>
                  <td className="p-3 text-slate-600">{u.province}</td>
                  <td className="p-3 font-mono">{u.capacityKg} kg</td>
                  <td className="p-3 font-mono text-amber-600 font-bold">{u.solarCapacityKw} kWp</td>
                  <td className="p-3 font-mono font-bold text-teal">{u.currentTempC}°C</td>
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
