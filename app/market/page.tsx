"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { formatRupiah } from "@/lib/utils";
import {
  Fish,
  ShieldCheck,
  QrCode,
  MapPin,
  Search,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import PpiRadiusMap, { PPI_LOCATIONS } from "@/components/market/ppi-radius-map";

export default function MarketplacePage() {
  const { batches, species } = useBlueSyncStore();
  const [selectedSpecies, setSelectedSpecies] = useState<string>("all");
  const [selectedPpiId, setSelectedPpiId] = useState<string>("all");
  const [radiusKm, setRadiusKm] = useState<number>(0);
  const [search, setSearch] = useState("");

  const filtered = batches.filter((b) => {
    const matchSpecies = selectedSpecies === "all" || b.fishSpeciesId === selectedSpecies;
    const matchSearch =
      b.fishSpeciesName.toLowerCase().includes(search.toLowerCase()) ||
      b.locationName.toLowerCase().includes(search.toLowerCase()) ||
      b.fishermanName.toLowerCase().includes(search.toLowerCase());

    // Location / PPI match
    let matchPpi = true;
    if (selectedPpiId !== "all") {
      const ppi = PPI_LOCATIONS.find((p) => p.id === selectedPpiId);
      if (ppi) {
        const isDirectMatch =
          b.locationName.toLowerCase().includes(ppi.district.toLowerCase()) ||
          b.locationName.toLowerCase().includes(ppi.province.toLowerCase()) ||
          b.locationName.toLowerCase().includes(ppi.name.replace("PPI ", "").toLowerCase());

        if (radiusKm > 0) {
          // In real application, haversine distance. Here mock radius expansion
          matchPpi = isDirectMatch || radiusKm >= 50;
        } else {
          matchPpi = isDirectMatch;
        }
      }
    }

    return matchSpecies && matchSearch && matchPpi;
  });

  return (
    <div className="space-y-6">
      {/* Interactive PPI Radius Map */}
      <PpiRadiusMap
        selectedPpiId={selectedPpiId}
        onSelectPpi={setSelectedPpiId}
        radiusKm={radiusKm}
        onChangeRadius={setRadiusKm}
      />

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <button
            onClick={() => setSelectedSpecies("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedSpecies === "all"
                ? "bg-navy text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Semua Ikan
          </button>
          {species.map((sp) => (
            <button
              key={sp.id}
              onClick={() => setSelectedSpecies(sp.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1 transition ${
                selectedSpecies === sp.id
                  ? "bg-navy text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>{sp.icon}</span>
              <span>{sp.name}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari lokasi PPI / nama..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl pl-9 pr-3 py-2 text-xs text-navy focus:outline-none focus:border-teal"
          />
        </div>
      </div>

      {/* Fish Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-3xl border border-slate-200 hover:border-orange/60 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Card Header Tag */}
              <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold bg-navy text-white px-2 py-0.5 rounded">
                  {b.batchCode}
                </span>
                <span className="text-[11px] font-bold text-green flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Grade A ({b.freshnessScore}/100)
                </span>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-navy">{b.fishSpeciesName}</h3>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-ocean" />
                  <span>{b.locationName} ({b.bumdesName})</span>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">{b.notes}</div>

                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Tersedia di Unit:</span>
                    <span className="font-bold font-mono text-navy">{b.weightKg} kg</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Harga Per Kg:</span>
                    <span className="font-bold font-mono text-orange text-sm">
                      {formatRupiah(b.pricePerKg)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
              <Link
                href={`/trace/${b.batchCode}`}
                className="flex-1 bg-white hover:bg-slate-100 text-navy font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 border border-slate-300 transition"
              >
                <QrCode className="w-3.5 h-3.5 text-teal" />
                <span>QR Trace</span>
              </Link>

              <Link
                href={`/market/${b.id}`}
                className="flex-1 bg-orange hover:bg-orange-dark text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 transition shadow-sm"
              >
                <span>Beli Batch Ikan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
