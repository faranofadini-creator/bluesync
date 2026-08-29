"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { LayoutDashboard, PlusCircle, Package, CreditCard, Fish } from "lucide-react";

export default function FishermanLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentUser } = useBlueSyncStore();

  const tabs = [
    { href: "/dashboard", label: "Ringkasan & IoT", icon: LayoutDashboard },
    { href: "/dashboard/booking", label: "Pesan Slot (7-Step)", icon: PlusCircle },
    { href: "/dashboard/inventory", label: "Ikan Tersimpan", icon: Package },
    { href: "/dashboard/payments", label: "Tagihan & Pembayaran", icon: CreditCard },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Fisherman Portal Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal flex items-center justify-center font-bold">
            <Fish className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase bg-teal text-white px-2 py-0.5 rounded">
                PORTAL NELAYAN
              </span>
              <span className="text-xs text-slate-500 font-medium">BUMDes Mitra: Bahari Jaya</span>
            </div>
            <h1 className="text-xl font-extrabold text-navy mt-0.5">
              Selamat Datang, {currentUser.fullName}
            </h1>
          </div>
        </div>

        <Link
          href="/dashboard/booking"
          className="bg-teal hover:bg-teal-dark text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 shadow-sm transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Booking Baru</span>
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
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                isActive
                  ? "bg-navy text-white shadow-sm"
                  : "text-slate-600 hover:text-navy hover:bg-white/60"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>

      <div>{children}</div>
    </div>
  );
}
