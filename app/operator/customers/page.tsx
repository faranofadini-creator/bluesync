"use client";

import React from "react";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { Users, Fish, Phone, Award, Search } from "lucide-react";

export default function OperatorCustomersPage() {
  const { users, bookings } = useBlueSyncStore();
  const fishermen = users.filter((u) => u.role === "fisherman");

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-bold text-navy">Direktori Nelayan Terdaftar</h2>
        <p className="text-xs text-slate-500">
          Daftar nelayan aktif di BUMDes Bahari Jaya pengguna fasilitas cold storage harian.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fishermen.map((f) => {
          const userBookings = bookings.filter((b) => b.fishermanId === f.id || b.fishermanName.includes("Anto"));
          const totalKg = userBookings.reduce((sum, b) => sum + b.weightKg, 0);

          return (
            <div key={f.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={f.avatarUrl}
                  alt={f.fullName}
                  className="w-12 h-12 rounded-xl object-cover ring-1 ring-teal"
                />
                <div>
                  <h3 className="font-bold text-navy text-sm">{f.fullName}</h3>
                  <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{f.phone}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px]">Total Booking:</span>
                  <div className="font-bold font-mono text-navy">{userBookings.length} Kali</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px]">Total Ikan Masuk:</span>
                  <div className="font-bold font-mono text-teal">{totalKg} kg</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
