"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import {
  LayoutDashboard,
  Activity,
  ClipboardList,
  DollarSign,
  Users,
  SlidersHorizontal,
  Building2,
} from "lucide-react";

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentUser, units } = useBlueSyncStore();

  const tabs = [
    { href: "/operator", label: "Overview", icon: LayoutDashboard },
    { href: "/operator/units/unit-01", label: "Sensor Telemetri", icon: Activity },
    { href: "/operator/bookings", label: "Kelola Booking", icon: ClipboardList },
    { href: "/operator/revenue", label: "Pendapatan Desa", icon: DollarSign },
    { href: "/operator/customers", label: "Nelayan Terdaftar", icon: Users },
    { href: "/operator/maintenance", label: "Log Pemeliharaan", icon: SlidersHorizontal },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Operator Portal Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-ocean/10 text-ocean flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase bg-ocean text-white px-2 py-0.5 rounded">
                PORTAL OPERATOR BUMDES
              </span>
              <span className="text-xs text-slate-500 font-medium">Desa Muara Baru • Unit BS-001</span>
            </div>
            <h1 className="text-xl font-extrabold text-navy mt-0.5">
              Operator: {currentUser.fullName}
            </h1>
          </div>
        </div>

        <Link
          href="/operator/bookings"
          className="bg-navy hover:bg-navy-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 shadow-sm transition"
        >
          <ClipboardList className="w-4 h-4 text-teal" />
          <span>Lihat Antrean Booking Masuk</span>
        </Link>
      </div>

      {/* Desktop Navigation Tabs */}
      <div className="hidden md:flex bg-slate-200/70 p-1.5 rounded-2xl gap-1">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                isActive
                  ? "bg-navy text-white shadow-sm"
                  : "text-slate-600 hover:text-navy hover:bg-white/60"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="truncate">{tab.label}</span>
            </Link>
          );
        })}
      </div>

      <div>{children}</div>
    </div>
  );
}
