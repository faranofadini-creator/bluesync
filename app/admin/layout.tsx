"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import {
  ShieldAlert,
  Server,
  Users,
  Calculator,
  PlaySquare,
  FileSpreadsheet,
  Layers,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentUser } = useBlueSyncStore();

  const tabs = [
    { href: "/admin", label: "Master Overview", icon: Layers },
    { href: "/admin/units", label: "Armada Unit (CRUD)", icon: Server },
    { href: "/admin/users", label: "User & Role", icon: Users },
    { href: "/admin/impact-formulas", label: "Formula Engine", icon: Calculator },
    { href: "/admin/demo", label: "Simulasi Pitching", icon: PlaySquare },
    { href: "/admin/reports", label: "Laporan Dampak", icon: FileSpreadsheet },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Admin Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase bg-purple-700 text-white px-2 py-0.5 rounded">
                PORTAL ADMIN MASTER
              </span>
              <span className="text-xs text-slate-500 font-medium">Pengawasan Sistem Global & Konfigurasi Engine</span>
            </div>
            <h1 className="text-xl font-extrabold text-navy mt-0.5">
              Admin BlueSync: {currentUser.fullName}
            </h1>
          </div>
        </div>

        <Link
          href="/admin/demo"
          className="bg-amber-500 hover:bg-amber-600 text-navy font-black py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 shadow-sm transition"
        >
          <PlaySquare className="w-4 h-4" />
          <span>Buka Demo & Simulasi Pitching</span>
        </Link>
      </div>

      {/* Desktop Navigation Tabs */}
      <div className="hidden md:flex bg-slate-200/70 p-1.5 rounded-2xl gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap transition ${
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
