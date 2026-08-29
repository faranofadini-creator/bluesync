"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { Store, ShoppingBag, ShieldCheck, QrCode, ArrowLeft } from "lucide-react";

export default function MarketLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useBlueSyncStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Buyer Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange/10 text-orange flex items-center justify-center font-bold">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase bg-orange text-white px-2 py-0.5 rounded">
                MARKETPLACE IKAN TERVERIFIKASI
              </span>
              <span className="text-xs text-slate-500 font-medium">Direct Producer to Buyer</span>
            </div>
            <h1 className="text-xl font-extrabold text-navy mt-0.5">
              Beli Ikan Segar Langsung dari Cold Storage Nelayan
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Akun Buyer: <strong>{currentUser.fullName}</strong>
          </span>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}
