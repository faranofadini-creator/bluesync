"use client";

import React, { useState, useEffect } from "react";
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
  Moon,
  Sun,
  Radio,
} from "lucide-react";

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentUser, units } = useBlueSyncStore();
  const [isNightMode, setIsNightMode] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bluesync_operator_night_mode");
      if (saved === "true") setIsNightMode(true);
    } catch (e) {}
  }, []);

  const toggleNightMode = () => {
    const next = !isNightMode;
    setIsNightMode(next);
    try {
      localStorage.setItem("bluesync_operator_night_mode", String(next));
    } catch (e) {}
  };

  const tabs = [
    { href: "/operator", label: "Overview", icon: LayoutDashboard },
    { href: "/operator/units/unit-01", label: "Sensor Telemetri", icon: Activity },
    { href: "/operator/bookings", label: "Kelola Booking", icon: ClipboardList },
    { href: "/operator/revenue", label: "Pendapatan Desa", icon: DollarSign },
    { href: "/operator/customers", label: "Nelayan Terdaftar", icon: Users },
    { href: "/operator/maintenance", label: "Log Pemeliharaan", icon: SlidersHorizontal },
  ];

  return (
    <div
      className={`transition-colors duration-500 min-h-screen ${
        isNightMode
          ? "bg-[#070e17] text-slate-100"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Operator Portal Header */}
        <div
          className={`rounded-3xl p-5 border shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors ${
            isNightMode
              ? "bg-[#0f1d2e] border-slate-800 text-white shadow-teal/5"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                isNightMode
                  ? "bg-teal/20 text-teal-light ring-2 ring-teal/30"
                  : "bg-ocean/10 text-ocean"
              }`}
            >
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                    isNightMode
                      ? "bg-teal text-navy font-black"
                      : "bg-ocean text-white"
                  }`}
                >
                  PORTAL OPERATOR BUMDES
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Desa Muara Baru • Unit BS-001
                </span>
              </div>
              <h1 className="text-xl font-extrabold mt-0.5 flex items-center gap-2">
                <span>Operator: {currentUser.fullName}</span>
                {isNightMode && (
                  <span className="text-[10px] font-mono text-teal-light bg-teal/10 px-2 py-0.5 rounded-full border border-teal/30 flex items-center gap-1">
                    <Radio className="w-3 h-3 animate-pulse text-teal" />
                    NIGHT COCKPIT ACTIVE
                  </span>
                )}
              </h1>
            </div>
          </div>

          {/* Action & Night Mode Toggle */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={toggleNightMode}
              className={`flex-1 sm:flex-initial py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition ${
                isNightMode
                  ? "bg-[#182a3e] hover:bg-[#20364f] text-teal-light border-teal/40 shadow-inner"
                  : "bg-slate-100 hover:bg-slate-200 text-navy border-slate-300"
              }`}
              title="Toggle Night Shift / Dark Cockpit Mode"
            >
              {isNightMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Mode Siang</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-600" />
                  <span>Mode Malam</span>
                </>
              )}
            </button>

            <Link
              href="/operator/bookings"
              className={`flex-1 sm:flex-initial font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition ${
                isNightMode
                  ? "bg-teal hover:bg-teal-light text-navy font-black"
                  : "bg-navy hover:bg-navy-800 text-white"
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>Antrean Booking</span>
            </Link>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <div
          className={`hidden md:flex p-1.5 rounded-2xl gap-1 border transition-colors ${
            isNightMode
              ? "bg-[#0c1826] border-slate-800"
              : "bg-slate-200/70 border-slate-200"
          }`}
        >
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  isActive
                    ? isNightMode
                      ? "bg-teal text-navy font-black shadow-md"
                      : "bg-navy text-white shadow-sm"
                    : isNightMode
                    ? "text-slate-400 hover:text-white hover:bg-white/5"
                    : "text-slate-600 hover:text-navy hover:bg-white/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="truncate">{tab.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Children Body Container */}
        <div className={isNightMode ? "operator-dark-mode" : ""}>{children}</div>
      </div>
    </div>
  );
}
