"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { formatRupiah } from "@/lib/utils";
import {
  Fish,
  QrCode,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Search,
  CheckCircle2,
} from "lucide-react";

export default function FishermanInventoryPage() {
  const { batches, currentUser } = useBlueSyncStore();
  const [search, setSearch] = useState("");

  const filteredBatches = batches.filter(
    (b) =>
      b.fishSpeciesName.toLowerCase().includes(search.toLowerCase()) ||
      b.batchCode.toLowerCase().includes(search.toLowerCase()) ||
      b.fishermanName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-bold text-navy">Inventaris Ikan Tersimpan & QR Code</h2>
          <p className="text-xs text-slate-500">
            Daftar batch ikan dengan sertifikasi cold chain yang siap dijual ke pasar atau diambil.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari jenis ikan / batch..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl pl-9 pr-3 py-2 text-xs text-navy focus:outline-none focus:border-teal"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBatches.map((b) => (
          <div
            key={b.id}
            className="p-5 rounded-2xl border border-slate-200 hover:border-teal bg-slate-50/40 transition space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono bg-navy text-white px-2 py-0.5 rounded font-bold">
                  {b.batchCode}
                </span>
                <span className="text-[11px] font-bold text-green flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Skor {b.freshnessScore}/100
                </span>
              </div>

              <h3 className="font-bold text-navy text-base mt-2">{b.fishSpeciesName}</h3>
              <p className="text-xs text-slate-500">{b.locationName}</p>

              <div className="mt-3 pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px]">Berat Batch:</span>
                  <div className="font-bold font-mono text-navy">{b.weightKg} kg</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px]">Harga Pasar:</span>
                  <div className="font-bold font-mono text-teal">{formatRupiah(b.pricePerKg)}/kg</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <Link
                href={`/trace/${b.batchCode}`}
                className="flex-1 bg-navy hover:bg-navy-800 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
              >
                <QrCode className="w-3.5 h-3.5 text-teal" />
                <span>Lihat QR Trace</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
