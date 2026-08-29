"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { Globe2, Award, FileSpreadsheet, MapPin } from "lucide-react";

export default function GovLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentUser } = useBlueSyncStore();

  const tabs = [
    { href: "/gov", label: "Dampak Nasional", icon: Globe2 },
    { href: "/gov/sdg", label: "Pencapaian SDGs", icon: Award },
    { href: "/admin/reports", label: "Ekspor Laporan PDF", icon: FileSpreadsheet },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Gov Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-green-100 text-green flex items-center justify-center font-bold">
            <Globe2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase bg-green text-white px-2 py-0.5 rounded">
                PORTAL PEMERINTAH & CSR
              </span>
              <span className="text-xs text-slate-500 font-medium">Monitoring Subsidi & Indikator SDGs</span>
            </div>
            <h1 className="text-xl font-extrabold text-navy mt-0.5">
              Dashboard Dampak Sektoral: {currentUser.fullName}
            </h1>
          </div>
        </div>

        <div className="flex gap-2">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                  isActive
                    ? "bg-navy text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-navy"
                }`}
              >
                <Icon className="w-4 h-4 text-teal" />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}
