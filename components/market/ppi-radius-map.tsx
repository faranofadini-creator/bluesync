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
  Sparkles,
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
    xPct: 27.5,
    yPct: 67.5,
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
    xPct: 39.5,
    yPct: 77.0,
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
    xPct: 43.0,
    yPct: 77.0,
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
    xPct: 64.5,
    yPct: 31.0,
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
    xPct: 82.5,
    yPct: 67.0,
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
            <span className="text-[10px] font-mono font-bold uppercase bg-teal text-navy px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Radio className="w-3 h-3 text-navy animate-pulse" />
              GEOLOCATION RADAR NUSANTARA
            </span>
            <span className="text-xs text-teal-light font-mono hidden sm:inline">
              Peta Sebaran Real-Time 5 Pangkalan Pendaratan Ikan (PPI)
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white mt-1">
            Peta Jaringan Cold Storage Pesisir &amp; Filter Radius Distribusi
          </h2>
        </div>

        <button
          onClick={() => setIsMapExpanded(!isMapExpanded)}
          className="text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/90 px-3.5 py-1.5 rounded-xl border border-slate-700 transition flex items-center gap-1.5"
        >
          <Compass className="w-3.5 h-3.5 text-teal" />
          <span>{isMapExpanded ? "Sembunyikan Peta" : "Tampilkan Peta Radar"}</span>
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
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-semibold text-navy focus:outline-none focus:border-teal shadow-sm"
              >
                <option value="all">🌍 Semua Wilayah Pesisir Indonesia (5 Titik Terkoneksi)</option>
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
                <span className="text-xs font-bold font-mono text-teal bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-200">
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
                <span>Semua Titik</span>
                <span>25 km</span>
                <span>50 km</span>
                <span>100 km</span>
              </div>
            </div>
          </div>

          {/* High-Fidelity Indonesian Archipelago Vector Radar Canvas */}
          <div className="relative bg-gradient-to-b from-[#040c17] via-[#061424] to-[#071c33] rounded-2xl border border-teal/40 p-4 overflow-hidden min-h-[320px] flex items-center justify-center shadow-inner">
            {/* Radar Coordinates & Sonar Sweep Grid */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(#0D9488 1px, transparent 1px), linear-gradient(90deg, #0D9488 1px, transparent 1px)`,
                backgroundSize: `28px 28px`,
              }}
            />

            {/* HUD Status Header */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-teal-300 bg-slate-950/90 px-3 py-1 rounded-lg border border-teal-800/60 flex items-center gap-2 shadow-md z-10">
              <Compass className="w-3.5 h-3.5 text-teal animate-spin-slow" />
              <span>INDONESIA MARITIME COLD-CHAIN TELEMETRY GRID • WGS84</span>
            </div>

            <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800 z-10 hidden sm:block">
              Coordinates: 6°N - 11°S • 95°E - 141°E
            </div>

            {/* SVG Interactive Map Canvas */}
            <div className="relative w-full max-w-4xl h-72 sm:h-84 flex items-center justify-center">
              <svg viewBox="0 0 1000 460" className="w-full h-full">
                <defs>
                  {/* Island Land Gradient */}
                  <linearGradient id="islandLandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0f4c5c" />
                    <stop offset="50%" stopColor="#0d3b48" />
                    <stop offset="100%" stopColor="#092731" />
                  </linearGradient>
                  <linearGradient id="islandStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="50%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>

                {/* Ocean Depth Bathymetric Contour Lines */}
                <g stroke="#0D9488" strokeWidth="0.75" strokeDasharray="5 5" opacity="0.2">
                  <path d="M40,120 Q200,160 400,140 T800,180 T980,240" fill="none" />
                  <path d="M40,260 Q250,220 500,280 T850,240 T980,310" fill="none" />
                  <path d="M40,360 Q300,320 600,380 T980,360" fill="none" />
                </g>

                {/* ========================================================
                    ACCURATE INDONESIAN ARCHIPELAGO VECTOR MAP
                    ======================================================== */}

                {/* 1. SUMATRA & OFFSHORE ISLANDS */}
                <g>
                  {/* Main Sumatra Island */}
                  <path
                    d="M60,65 C72,50 88,40 100,50 C120,68 140,88 165,115 C190,140 215,170 235,195 C255,220 270,245 285,270 C295,290 288,300 270,295 C240,285 210,250 180,210 C150,170 120,135 95,105 C80,90 65,78 60,65 Z"
                    fill="url(#islandLandGrad)"
                    stroke="url(#islandStrokeGrad)"
                    strokeWidth="1.2"
                  />
                  {/* Nias Island */}
                  <path d="M80,140 C85,130 92,135 88,155 C84,170 78,165 80,140 Z" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.8" />
                  {/* Mentawai (Siberut & Sipora) */}
                  <path d="M118,205 C124,195 130,200 125,225 C120,240 115,230 118,205 Z" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.8" />
                  <path d="M145,250 C150,242 155,245 150,265 C145,275 140,270 145,250 Z" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.8" />
                  {/* Bangka */}
                  <path d="M265,190 C280,175 292,185 285,210 C278,225 262,215 265,190 Z" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.9" />
                  {/* Belitung */}
                  <path d="M310,205 C325,198 335,210 325,225 C315,232 305,220 310,205 Z" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.9" />
                  {/* Riau Archipelago */}
                  <ellipse cx="220" cy="130" rx="8" ry="6" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.6" />
                </g>

                {/* 2. JAWA & MADURA */}
                <g>
                  {/* Main Java Island */}
                  <path
                    d="M235,305 C265,298 300,300 335,308 C370,314 405,310 440,316 C470,320 500,328 515,338 C495,348 450,345 405,340 C360,336 310,332 260,328 C240,324 230,312 235,305 Z"
                    fill="url(#islandLandGrad)"
                    stroke="url(#islandStrokeGrad)"
                    strokeWidth="1.3"
                  />
                  {/* Ujung Kulon / Banten */}
                  <path d="M225,312 C230,308 238,310 235,318 C230,322 224,318 225,312 Z" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.8" />
                  {/* Madura Island */}
                  <path d="M430,302 C450,296 470,300 480,306 C468,312 445,312 430,302 Z" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="1" />
                </g>

                {/* 3. BALI, LOMBOK, SUMBAWA, FLORES, SUMBA, TIMOR */}
                <g>
                  {/* Bali */}
                  <path d="M520,338 C530,336 538,340 532,346 C524,346 518,342 520,338 Z" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.9" />
                  {/* Lombok */}
                  <path d="M545,338 C555,336 562,342 554,348 C546,346 542,342 545,338 Z" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.9" />
                  {/* Sumbawa */}
                  <path d="M570,336 C595,332 615,340 605,348 C585,348 575,342 570,336 Z" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.9" />
                  {/* Flores */}
                  <path d="M625,334 C655,332 680,336 690,344 C675,348 645,346 625,344 Z" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.9" />
                  {/* Sumba */}
                  <path d="M610,365 C635,360 655,368 645,376 C625,376 612,372 610,365 Z" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.9" />
                  {/* Timor */}
                  <path d="M695,355 C725,342 755,355 745,370 C720,375 700,368 695,355 Z" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="1" />
                </g>

                {/* 4. KALIMANTAN (BORNEO) */}
                <g>
                  <path
                    d="M310,120 C340,90 395,75 435,88 C468,98 480,125 488,155 C495,188 478,220 455,238 C425,255 380,252 345,236 C318,220 300,180 305,148 Z"
                    fill="url(#islandLandGrad)"
                    stroke="url(#islandStrokeGrad)"
                    strokeWidth="1.3"
                  />
                  {/* Tarakan / Nunukan */}
                  <ellipse cx="490" cy="98" rx="8" ry="6" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.6" />
                </g>

                {/* 5. SULAWESI (Distinctive 4-Armed K-Shape) */}
                <g>
                  <path
                    d="M555,130 C585,118 630,112 655,122 C660,132 640,140 600,144 C585,160 605,185 640,190 C645,200 615,208 585,198 C580,215 605,245 628,272 C618,280 592,270 575,238 C562,250 555,280 545,292 C535,290 538,260 550,225 C538,190 538,150 555,130 Z"
                    fill="url(#islandLandGrad)"
                    stroke="url(#islandStrokeGrad)"
                    strokeWidth="1.3"
                  />
                  {/* Buton & Muna */}
                  <ellipse cx="620" cy="295" rx="10" ry="16" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.8" />
                  {/* Sangihe & Talaud (North) */}
                  <ellipse cx="658" cy="85" rx="5" ry="8" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.6" />
                </g>

                {/* 6. MALUKU ARCHIPELAGO */}
                <g>
                  {/* Halmahera */}
                  <path
                    d="M675,105 C695,95 710,110 700,130 C695,150 710,165 695,178 C682,158 680,128 675,105 Z"
                    fill="url(#islandLandGrad)"
                    stroke="#14b8a6"
                    strokeWidth="0.9"
                  />
                  {/* Morotai */}
                  <path d="M698,75 C708,70 715,78 708,90 C700,92 695,84 698,75 Z" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.7" />
                  {/* Buru */}
                  <path d="M665,225 C685,218 700,228 690,242 C675,246 660,238 665,225 Z" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.8" />
                  {/* Seram */}
                  <path d="M705,220 C745,215 770,225 760,238 C725,242 700,232 705,220 Z" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.9" />
                  {/* Ambon */}
                  <ellipse cx="720" cy="248" rx="6" ry="4" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.7" />
                  {/* Kai Islands */}
                  <ellipse cx="788" cy="298" rx="8" ry="12" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.8" />
                  {/* Kepulauan Aru (Dobo Hub) */}
                  <path d="M818,295 C832,285 842,300 835,325 C824,335 812,320 818,295 Z" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="1" />
                </g>

                {/* 7. PAPUA (BIRD'S HEAD & MAINLAND) */}
                <g>
                  {/* Papua Mainland & Bird's Head */}
                  <path
                    d="M735,175 C765,160 782,175 765,195 C750,205 765,220 798,215 C835,210 875,218 920,228 C930,255 905,290 870,310 C830,330 790,298 770,270 C755,245 728,210 735,175 Z"
                    fill="url(#islandLandGrad)"
                    stroke="url(#islandStrokeGrad)"
                    strokeWidth="1.4"
                  />
                  {/* Biak */}
                  <path d="M805,170 C820,165 830,172 822,182 C810,185 802,178 805,170 Z" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.8" />
                  {/* Yapen */}
                  <path d="M815,190 C835,185 850,192 840,198 C825,200 812,196 815,190 Z" fill="url(#islandLandGrad)" stroke="#14b8a6" strokeWidth="0.8" />
                </g>

                {/* Dynamic Radius Pulse Circles around Selected PPI */}
                {selectedPpiId !== "all" && activePpi && radiusKm > 0 && (
                  <g>
                    <circle
                      cx={`${activePpi.xPct}%`}
                      cy={`${activePpi.yPct}%`}
                      r={radiusKm * 1.5}
                      fill="#0D9488"
                      fillOpacity="0.15"
                      stroke="#14b8a6"
                      strokeWidth="1.5"
                      strokeDasharray="6 3"
                    />
                    <circle
                      cx={`${activePpi.xPct}%`}
                      cy={`${activePpi.yPct}%`}
                      r={radiusKm * 0.75}
                      fill="#0D9488"
                      fillOpacity="0.08"
                      stroke="#14b8a6"
                      strokeWidth="1"
                    />
                  </g>
                )}
              </svg>

              {/* Render Interactive Radar Pins on Geographic Positions */}
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
                      className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-2xl transition-all ${
                        isSelected
                          ? "bg-teal text-navy ring-4 ring-teal/50 scale-125 z-30 font-bold shadow-teal/50"
                          : isMatchedByRadius
                          ? "bg-[#09263e] hover:bg-teal text-teal-light hover:text-navy hover:scale-110 ring-2 ring-teal/40"
                          : "bg-slate-800 text-slate-500 opacity-60"
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>

                    {/* Pin Label Tag */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition shadow-xl pointer-events-none ${
                        isSelected
                          ? "bg-teal text-navy opacity-100 z-30"
                          : "bg-slate-900/95 text-slate-200 border border-slate-700 opacity-0 group-hover:opacity-100 z-20"
                      }`}
                    >
                      <span className="block">{loc.name}</span>
                      <span className="text-[9px] block text-teal-300 font-normal">
                        {loc.avgTempC}°C • {loc.totalCapacityKg - loc.currentLoadKg} kg sisa
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active PPI Details Bar */}
          {selectedPpiId !== "all" && activePpi && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-teal-50/70 p-4 rounded-2xl border border-teal-100 text-xs animate-in fade-in">
              <div>
                <span className="text-slate-500 text-[10px] block">Pangkalan Ikan (PPI):</span>
                <strong className="text-navy font-bold text-xs">{activePpi.name}</strong>
                <span className="text-[10px] text-slate-500 block">{activePpi.province}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Kapasitas Cold Storage:</span>
                <strong className="font-mono text-teal font-bold text-xs">
                  {activePpi.totalCapacityKg - activePpi.currentLoadKg} / {activePpi.totalCapacityKg} kg
                </strong>
                <span className="text-[10px] text-slate-500 block">
                  Tingkat Keterisian: {((activePpi.currentLoadKg / activePpi.totalCapacityKg) * 100).toFixed(0)}%
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Suhu &amp; Tenaga Surya:</span>
                <strong className="font-mono text-green-700 font-bold text-xs">
                  {activePpi.avgTempC}°C (Deep Freeze)
                </strong>
                <span className="text-[10px] text-amber-700 font-mono block font-semibold">
                  ☀️ {activePpi.solarKw} kW Peak
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Spesies Utama Tersedia:</span>
                <strong className="text-navy truncate block font-bold text-xs">
                  {activePpi.species.join(", ")}
                </strong>
                <span className="text-[10px] text-teal font-semibold block">Grade A Ekspor Terverifikasi</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
