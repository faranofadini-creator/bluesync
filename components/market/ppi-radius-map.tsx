"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Radio, ShieldCheck, ThermometerSnowflake, Sliders, Layers, Info, Check } from "lucide-react";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";

export interface PpiLocation {
  id: string;
  name: string;
  district: string;
  province: string;
  lat: number;
  lng: number;
  xPct: number; // SVG map position percentage (0-100)
  yPct: number; // SVG map position percentage (0-100)
  activeUnitsCount: number;
  totalCapacityKg: number;
  currentLoadKg: number;
  avgTempC: number;
}

export const PPI_LOCATIONS: PpiLocation[] = [
  {
    id: "loc-01",
    name: "PPI Muara Baru",
    district: "Penjaringan",
    province: "DKI Jakarta",
    lat: -6.1084,
    lng: 106.8041,
    xPct: 24,
    yPct: 62,
    activeUnitsCount: 2,
    totalCapacityKg: 4000,
    currentLoadKg: 2850,
    avgTempC: -18.2,
  },
  {
    id: "loc-02",
    name: "PPI Sendangbiru",
    district: "Sumbermanjing Wetan",
    province: "Jawa Timur",
    lat: -8.4312,
    lng: 112.6845,
    xPct: 38,
    yPct: 75,
    activeUnitsCount: 1,
    totalCapacityKg: 2000,
    currentLoadKg: 1400,
    avgTempC: -18.6,
  },
  {
    id: "loc-04",
    name: "PPI Muncar",
    district: "Banyuwangi",
    province: "Jawa Timur",
    lat: -8.4333,
    lng: 114.3333,
    xPct: 44,
    yPct: 76,
    activeUnitsCount: 1,
    totalCapacityKg: 2000,
    currentLoadKg: 1650,
    avgTempC: -18.4,
  },
  {
    id: "loc-03",
    name: "PPI Aertembaga",
    district: "Kota Bitung",
    province: "Sulawesi Utara",
    lat: 1.4398,
    lng: 125.1872,
    xPct: 66,
    yPct: 32,
    activeUnitsCount: 2,
    totalCapacityKg: 5000,
    currentLoadKg: 3200,
    avgTempC: -19.1,
  },
  {
    id: "loc-05",
    name: "PPI Dobo Kepulauan Aru",
    district: "Pulau-Pulau Aru",
    province: "Maluku",
    lat: -5.7667,
    lng: 134.2167,
    xPct: 84,
    yPct: 68,
    activeUnitsCount: 1,
    totalCapacityKg: 2000,
    currentLoadKg: 850,
    avgTempC: -18.5,
  },
];

interface PpiRadiusMapProps {
  selectedPpiId: string;
  onSelectPpi: (id: string) => void;
  radiusKm: number;
  onChangeRadius: (km: number) => void;
}

export default function PpiRadiusMap({
  selectedPpiId,
  onSelectPpi,
  radiusKm,
  onChangeRadius,
}: PpiRadiusMapProps) {
  const [isMapExpanded, setIsMapExpanded] = useState(true);

  const activePpi = PPI_LOCATIONS.find((p) => p.id === selectedPpiId) || PPI_LOCATIONS[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
      {/* Map Card Header */}
      <div className="bg-gradient-to-r from-navy via-navy to-ocean text-white p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase bg-teal text-white px-2 py-0.5 rounded">
              GEOLOCATION RADAR
            </span>
            <span className="text-xs text-teal-light flex items-center gap-1 font-mono">
              <Radio className="w-3.5 h-3.5 animate-pulse text-green-400" />
              5 Titik PPI Terhubung IoT
            </span>
          </div>
          <h2 className="text-lg font-extrabold text-white mt-1">
            Peta Sebaran Micro Cold Storage & Filter Radius PPI
          </h2>
        </div>

        <button
          onClick={() => setIsMapExpanded(!isMapExpanded)}
          className="text-xs font-bold text-slate-300 hover:text-white bg-navy-800/80 px-3 py-1.5 rounded-xl border border-slate-700 transition"
        >
          {isMapExpanded ? "Sembunyikan Peta" : "Tampilkan Radar Peta"}
        </button>
      </div>

      {isMapExpanded && (
        <div className="p-5 space-y-5">
          {/* Controls: PPI Selector & Radius Slider */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {/* PPI Selector */}
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-ocean" />
                <span>Pilih Titik Pusat Pendaratan Ikan (PPI):</span>
              </label>
              <select
                value={selectedPpiId}
                onChange={(e) => onSelectPpi(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-navy focus:outline-none focus:border-teal"
              >
                <option value="all">🌍 Semua Wilayah Pesisir Indonesia</option>
                {PPI_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} ({loc.district}, {loc.province})
                  </option>
                ))}
              </select>
            </div>

            {/* Radius Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-navy flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5 text-teal" />
                  <span>Jangkauan Radius Distribusi:</span>
                </label>
                <span className="text-xs font-extrabold font-mono text-teal bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {radiusKm === 0 ? "Tanpa Batas Radius" : `± ${radiusKm} KM`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={radiusKm}
                  onChange={(e) => onChangeRadius(Number(e.target.value))}
                  className="w-full accent-teal h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>Semua</span>
                <span>25 km</span>
                <span>50 km</span>
                <span>100 km</span>
              </div>
            </div>
          </div>

          {/* Stylized Visual Nusantara Radar Map */}
          <div className="relative bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-hidden min-h-[260px] flex items-center justify-center">
            {/* Grid Coordinates Background */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `linear-gradient(#0D9488 1px, transparent 1px), linear-gradient(90deg, #0D9488 1px, transparent 1px)`,
                backgroundSize: `32px 32px`,
              }}
            />

            {/* Radar Coordinates Title */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-teal-400/80 bg-slate-900/80 px-2 py-1 rounded border border-teal-900/50">
              INDONESIA COLD CHAIN TELEMETRY GRID • WGS84
            </div>

            {/* SVG Interactive Map Canvas */}
            <div className="relative w-full max-w-2xl h-56 sm:h-64 flex items-center justify-center">
              {/* Silhouette Archipelago Representation */}
              <svg viewBox="0 0 1000 450" className="w-full h-full opacity-40">
                {/* Sumatra */}
                <path d="M120,180 L200,240 L260,320 L220,350 L160,260 L90,190 Z" fill="#1A6B8A" />
                {/* Java */}
                <path d="M240,360 L380,370 L480,380 L480,400 L240,390 Z" fill="#1A6B8A" />
                {/* Kalimantan */}
                <path d="M340,160 L440,150 L480,240 L400,290 L330,240 Z" fill="#1A6B8A" />
                {/* Sulawesi */}
                <path d="M560,180 L640,170 L620,230 L660,280 L590,300 L560,240 Z" fill="#1A6B8A" />
                {/* Bali & Nusa Tenggara */}
                <path d="M500,390 L620,400 L620,410 L500,400 Z" fill="#1A6B8A" />
                {/* Maluku & Papua */}
                <path d="M680,220 L760,230 L730,300 L850,280 L920,330 L850,380 L760,340 Z" fill="#1A6B8A" />
              </svg>

              {/* Render PPI Location Radar Pins */}
              {PPI_LOCATIONS.map((loc) => {
                const isSelected = selectedPpiId === loc.id;
                const isMatchedByRadius =
                  selectedPpiId === "all" ||
                  selectedPpiId === loc.id ||
                  (radiusKm >= 30 && selectedPpiId === "loc-02" && loc.id === "loc-04") ||
                  (radiusKm >= 30 && selectedPpiId === "loc-04" && loc.id === "loc-02");

                return (
                  <div
                    key={loc.id}
                    onClick={() => onSelectPpi(loc.id)}
                    className="absolute cursor-pointer group -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${loc.xPct}%`, top: `${loc.yPct}%` }}
                  >
                    {/* Concentric Pulse Ring */}
                    {isSelected && (
                      <div className="absolute -inset-4 rounded-full border-2 border-teal animate-ping pointer-events-none" />
                    )}

                    {/* Radar Pin Icon */}
                    <div
                      className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                        isSelected
                          ? "bg-teal text-white ring-4 ring-teal/40 scale-125 z-20"
                          : isMatchedByRadius
                          ? "bg-ocean hover:bg-teal text-white hover:scale-110 z-10"
                          : "bg-slate-700 text-slate-400 opacity-60 z-0"
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>

                    {/* Pin Tooltip */}
                    <div
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition pointer-events-none ${
                        isSelected
                          ? "bg-teal text-white shadow-md z-30 opacity-100"
                          : "bg-slate-900 text-slate-200 border border-slate-700 opacity-0 group-hover:opacity-100 z-20"
                      }`}
                    >
                      <span>{loc.name}</span>
                      <span className="text-[9px] text-teal-light block font-normal">
                        {loc.totalCapacityKg - loc.currentLoadKg} kg sisa
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Active PPI Specs Bar */}
          {selectedPpiId !== "all" && activePpi && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-teal-50/60 p-4 rounded-2xl border border-teal-100 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Pangkalan Ikan:</span>
                <strong className="text-navy">{activePpi.name}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Kapasitas Tersedia:</span>
                <strong className="font-mono text-teal">
                  {activePpi.totalCapacityKg - activePpi.currentLoadKg} / {activePpi.totalCapacityKg} kg
                </strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Suhu Rata-rata:</span>
                <strong className="font-mono text-green">{activePpi.avgTempC}°C (Optimal)</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Unit Solar Terpasang:</span>
                <strong className="font-mono text-navy">{activePpi.activeUnitsCount} Micro Units</strong>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
