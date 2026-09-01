"use client";

import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Radio,
  ShieldCheck,
  ThermometerSnowflake,
  Sliders,
  Layers,
  Info,
  Check,
  Fish,
  Sun,
  Activity,
  Compass,
} from "lucide-react";
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
  solarKw: number;
  species: string[];
}

export const PPI_LOCATIONS: PpiLocation[] = [
  {
    id: "loc-01",
    name: "PPI Muara Baru",
    district: "Penjaringan",
    province: "DKI Jakarta",
    lat: -6.1084,
    lng: 106.8041,
    xPct: 22.5,
    yPct: 66,
    activeUnitsCount: 2,
    totalCapacityKg: 4000,
    currentLoadKg: 2850,
    avgTempC: -18.2,
    solarKw: 7.8,
    species: ["Tuna Sirip Kuning", "Tongkol Krai", "Cumi-Cumi"],
  },
  {
    id: "loc-02",
    name: "PPI Sendangbiru",
    district: "Sumbermanjing Wetan",
    province: "Jawa Timur",
    lat: -8.4312,
    lng: 112.6845,
    xPct: 35.5,
    yPct: 76,
    activeUnitsCount: 1,
    totalCapacityKg: 2000,
    currentLoadKg: 1400,
    avgTempC: -18.6,
    solarKw: 8.2,
    species: ["Tuna Sirip Kuning", "Cakalang", "Kerapu Macan"],
  },
  {
    id: "loc-04",
    name: "PPI Muncar",
    district: "Banyuwangi",
    province: "Jawa Timur",
    lat: -8.4333,
    lng: 114.3333,
    xPct: 40.5,
    yPct: 77,
    activeUnitsCount: 1,
    totalCapacityKg: 2000,
    currentLoadKg: 1650,
    avgTempC: -18.4,
    solarKw: 8.0,
    species: ["Lemuru Segar", "Tongkol", "Cumi-Cumi"],
  },
  {
    id: "loc-03",
    name: "PPI Aertembaga",
    district: "Kota Bitung",
    province: "Sulawesi Utara",
    lat: 1.4398,
    lng: 125.1872,
    xPct: 62.5,
    yPct: 31,
    activeUnitsCount: 2,
    totalCapacityKg: 5000,
    currentLoadKg: 3200,
    avgTempC: -19.1,
    solarKw: 8.4,
    species: ["Tuna Bigeye", "Cakalang Super", "Kakap Merah"],
  },
  {
    id: "loc-05",
    name: "PPI Dobo Kepulauan Aru",
    district: "Pulau-Pulau Aru",
    province: "Maluku",
    lat: -5.7667,
    lng: 134.2167,
    xPct: 79.5,
    yPct: 67,
    activeUnitsCount: 1,
    totalCapacityKg: 2000,
    currentLoadKg: 850,
    avgTempC: -18.5,
    solarKw: 8.1,
    species: ["Udang Windu", "Kerapu Sunu", "Kakap Merah"],
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
  const [hoveredLoc, setHoveredLoc] = useState<PpiLocation | null>(null);

  const activePpi = PPI_LOCATIONS.find((p) => p.id === selectedPpiId) || PPI_LOCATIONS[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
      {/* Map Card Header */}
      <div className="bg-gradient-to-r from-[#081524] via-[#091d33] to-[#0d2e4a] text-white p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase bg-teal text-navy px-2 py-0.5 rounded">
              GEOLOCATION RADAR
            </span>
            <span className="text-xs text-teal-light flex items-center gap-1 font-mono">
              <Radio className="w-3.5 h-3.5 animate-pulse text-green-400" />
              5 Titik PPI Terhubung IoT Real-Time
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white mt-1">
            Peta Sebaran Micro Cold Storage & Filter Radius PPI
          </h2>
        </div>

        <button
          onClick={() => setIsMapExpanded(!isMapExpanded)}
          className="text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700 transition"
        >
          {isMapExpanded ? "Sembunyikan Peta" : "Buka Radar Nusantara"}
        </button>
      </div>

      {isMapExpanded && (
        <div className="p-4 sm:p-6 space-y-5">
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
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-semibold text-navy focus:outline-none focus:border-teal"
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
                <span className="text-xs font-bold font-mono text-teal bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
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

          {/* High-Fidelity Indonesian Archipelago Radar Canvas */}
          <div className="relative bg-gradient-to-b from-[#040b14] via-[#061220] to-[#07182b] rounded-2xl border border-slate-800 p-4 overflow-hidden min-h-[300px] flex items-center justify-center shadow-inner">
            {/* Radar Coordinates & Sonar Sweep Grid */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `linear-gradient(#0D9488 1px, transparent 1px), linear-gradient(90deg, #0D9488 1px, transparent 1px)`,
                backgroundSize: `28px 28px`,
              }}
            />

            {/* Radar Compass & Coordinates Title */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-teal-300 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-teal-800/40 flex items-center gap-1.5 shadow-sm">
              <Compass className="w-3 h-3 text-teal animate-spin" style={{ animationDuration: "12s" }} />
              <span>INDONESIA MARITIME COLD-CHAIN TELEMETRY • WGS84</span>
            </div>

            <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
              Coverage: 6°N - 11°S • 95°E - 141°E
            </div>

            {/* SVG Interactive Map Canvas */}
            <div className="relative w-full max-w-4xl h-64 sm:h-80 flex items-center justify-center">
              <svg viewBox="0 0 1000 480" className="w-full h-full">
                <defs>
                  {/* Island Land Gradient */}
                  <linearGradient id="islandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#134e4a" />
                    <stop offset="100%" stopColor="#0f2f3d" />
                  </linearGradient>
                  {/* Selected Island Highlight */}
                  <linearGradient id="islandSelected" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0D9488" />
                    <stop offset="100%" stopColor="#115e59" />
                  </linearGradient>
                  {/* Radar Pulse Filter */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Ocean Depth Curves (Bathymetric lines) */}
                <path
                  d="M50,150 Q250,180 500,160 T950,220"
                  fill="none"
                  stroke="#0D9488"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  opacity="0.25"
                />
                <path
                  d="M50,320 Q300,280 600,340 T950,300"
                  fill="none"
                  stroke="#0D9488"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  opacity="0.25"
                />

                {/* 1. SUMATRA */}
                <path
                  d="M75,105 C85,90 100,75 110,85 C130,110 150,140 185,175 C215,205 240,240 265,280 C270,295 260,305 245,300 C220,290 195,250 165,210 C135,170 105,140 85,120 Z"
                  fill="url(#islandGrad)"
                  stroke="#14b8a6"
                  strokeWidth="1"
                  opacity="0.85"
                />
                {/* Nias & Mentawai */}
                <ellipse cx="95" cy="180" rx="6" ry="16" transform="rotate(-30 95 180)" fill="#134e4a" stroke="#14b8a6" strokeWidth="0.5" />
                <ellipse cx="145" cy="245" rx="5" ry="18" transform="rotate(-30 145 245)" fill="#134e4a" stroke="#14b8a6" strokeWidth="0.5" />
                <ellipse cx="175" cy="285" rx="5" ry="14" transform="rotate(-30 175 285)" fill="#134e4a" stroke="#14b8a6" strokeWidth="0.5" />

                {/* Bangka & Belitung */}
                <ellipse cx="260" cy="225" rx="10" ry="18" fill="#134e4a" stroke="#14b8a6" strokeWidth="0.7" />
                <ellipse cx="295" cy="240" rx="9" ry="9" fill="#134e4a" stroke="#14b8a6" strokeWidth="0.7" />

                {/* 2. JAWA */}
                <path
                  d="M210,315 C240,310 270,312 300,318 C330,325 360,322 390,328 C415,332 445,338 455,348 C440,358 400,355 360,350 C320,345 270,340 225,335 C210,332 205,320 210,315 Z"
                  fill="url(#islandGrad)"
                  stroke="#14b8a6"
                  strokeWidth="1"
                  opacity="0.9"
                />
                {/* Madura */}
                <path d="M380,315 C395,310 415,312 425,318 C415,324 395,324 380,315 Z" fill="#134e4a" stroke="#14b8a6" strokeWidth="0.7" />

                {/* 3. BALI, LOMBOK, SUMBAWA, FLORES, TIMOR (Nusa Tenggara) */}
                <path d="M465,348 C472,348 478,352 472,356 C465,356 460,352 465,348 Z" fill="#134e4a" stroke="#14b8a6" strokeWidth="0.7" />
                <path d="M485,348 C495,348 502,354 492,357 C485,356 480,352 485,348 Z" fill="#134e4a" stroke="#14b8a6" strokeWidth="0.7" />
                <path d="M510,346 C530,345 545,354 535,358 C515,358 505,352 510,346 Z" fill="#134e4a" stroke="#14b8a6" strokeWidth="0.7" />
                <path d="M560,346 C590,346 610,352 605,358 C580,358 555,354 560,346 Z" fill="#134e4a" stroke="#14b8a6" strokeWidth="0.7" />
                <path d="M625,355 C650,350 670,360 655,372 C635,372 620,365 625,355 Z" fill="#134e4a" stroke="#14b8a6" strokeWidth="0.7" />

                {/* 4. KALIMANTAN */}
                <path
                  d="M310,130 C335,110 380,95 410,105 C440,115 450,140 455,170 C460,200 445,230 425,245 C400,260 360,260 330,245 C305,230 295,190 300,160 Z"
                  fill="url(#islandGrad)"
                  stroke="#14b8a6"
                  strokeWidth="1"
                  opacity="0.85"
                />

                {/* 5. SULAWESI (Distinctive K-Shape) */}
                <path
                  d="M540,140 C565,130 610,125 635,135 C640,145 615,155 580,158 C570,175 585,200 620,205 C625,215 595,225 565,215 C560,230 580,260 605,285 C595,295 570,285 555,250 C545,260 540,290 530,300 C520,300 525,270 535,235 C525,200 525,160 540,140 Z"
                  fill="url(#islandGrad)"
                  stroke="#14b8a6"
                  strokeWidth="1"
                  opacity="0.9"
                />

                {/* 6. MALUKU & HALMAHERA */}
                <path d="M670,140 C685,130 700,145 690,165 C685,185 700,200 685,210 C675,190 675,160 670,140 Z" fill="#134e4a" stroke="#14b8a6" strokeWidth="0.8" />
                <path d="M660,240 C690,235 710,245 700,255 C675,258 655,250 660,240 Z" fill="#134e4a" stroke="#14b8a6" strokeWidth="0.8" />
                <ellipse cx="680" cy="275" rx="14" ry="7" fill="#134e4a" stroke="#14b8a6" strokeWidth="0.7" />
                {/* Aru Islands (Dobo) */}
                <ellipse cx="795" cy="320" rx="14" ry="22" fill="#134e4a" stroke="#14b8a6" strokeWidth="0.9" />

                {/* 7. PAPUA (Bird's Head & Main Island) */}
                <path
                  d="M740,215 C770,205 785,220 770,235 C755,245 770,260 805,255 C845,250 890,260 935,270 C945,300 920,335 885,355 C845,375 805,340 780,310 C765,285 735,250 740,215 Z"
                  fill="url(#islandGrad)"
                  stroke="#14b8a6"
                  strokeWidth="1"
                  opacity="0.9"
                />

                {/* Dynamic Radius Circles around selected PPI */}
                {selectedPpiId !== "all" && activePpi && radiusKm > 0 && (
                  <g>
                    <circle
                      cx={`${activePpi.xPct}%`}
                      cy={`${activePpi.yPct}%`}
                      r={radiusKm * 1.6}
                      fill="#0D9488"
                      fillOpacity="0.12"
                      stroke="#14b8a6"
                      strokeWidth="1.5"
                      strokeDasharray="6 3"
                    />
                    <circle
                      cx={`${activePpi.xPct}%`}
                      cy={`${activePpi.yPct}%`}
                      r={radiusKm * 0.8}
                      fill="#0D9488"
                      fillOpacity="0.08"
                      stroke="#14b8a6"
                      strokeWidth="1"
                    />
                  </g>
                )}
              </svg>

              {/* Render Interactive Radar Pins */}
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
                    onMouseEnter={() => setHoveredLoc(loc)}
                    onMouseLeave={() => setHoveredLoc(null)}
                    className="absolute cursor-pointer group -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ left: `${loc.xPct}%`, top: `${loc.yPct}%` }}
                  >
                    {/* Concentric Pulse Ring */}
                    {isSelected && (
                      <div className="absolute -inset-3 rounded-full border-2 border-teal animate-ping pointer-events-none" />
                    )}

                    {/* Radar Pin Icon */}
                    <div
                      className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                        isSelected
                          ? "bg-teal text-navy ring-4 ring-teal/50 scale-125 z-30 font-bold"
                          : isMatchedByRadius
                          ? "bg-[#0c314d] hover:bg-teal text-teal-light hover:text-navy hover:scale-110 ring-2 ring-teal/40"
                          : "bg-slate-800 text-slate-400 opacity-60"
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>

                    {/* Pin Label Tag */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-mono font-bold transition pointer-events-none ${
                        isSelected
                          ? "bg-teal text-navy shadow-md opacity-100 z-30"
                          : "bg-slate-900/90 text-slate-300 border border-slate-700 opacity-0 group-hover:opacity-100 z-20"
                      }`}
                    >
                      <span>{loc.name}</span>
                      <span className="text-[9px] block text-teal-300 font-normal">
                        {loc.avgTempC}°C • {loc.totalCapacityKg - loc.currentLoadKg}kg sisa
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Active PPI Specs Bar */}
          {selectedPpiId !== "all" && activePpi && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-teal-50/70 p-4 rounded-2xl border border-teal-100 text-xs animate-in fade-in">
              <div>
                <span className="text-slate-500 text-[10px] block">Pangkalan Ikan (PPI):</span>
                <strong className="text-navy">{activePpi.name}</strong>
                <span className="text-[10px] text-slate-500 block">{activePpi.province}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Kapasitas Tersedia:</span>
                <strong className="font-mono text-teal">
                  {activePpi.totalCapacityKg - activePpi.currentLoadKg} / {activePpi.totalCapacityKg} kg
                </strong>
                <span className="text-[10px] text-slate-500 block">Tingkat Isi: {((activePpi.currentLoadKg / activePpi.totalCapacityKg) * 100).toFixed(0)}%</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Suhu & Tenaga Surya:</span>
                <strong className="font-mono text-green-700">{activePpi.avgTempC}°C (Deep Freeze)</strong>
                <span className="text-[10px] text-amber-700 font-mono block">☀️ {activePpi.solarKw} kW Peak</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Spesies Utama Tersedia:</span>
                <strong className="text-navy truncate block">{activePpi.species.join(", ")}</strong>
                <span className="text-[10px] text-teal font-semibold block">Grade A Ekspor</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
