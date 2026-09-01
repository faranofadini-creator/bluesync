"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sun,
  BatteryCharging,
  ThermometerSnowflake,
  Cpu,
  ShieldCheck,
  Rotate3d,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  Layers,
  CheckCircle2,
  Play,
  Pause,
  RefreshCw,
  Eye,
} from "lucide-react";

export default function ProductMockupDiagram() {
  const [activePart, setActivePart] = useState<"solar" | "coldroom" | "bess" | "iot" | "chassis">("solar");
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [rotY, setRotY] = useState<number>(-25); // degrees
  const [rotX, setRotX] = useState<number>(15); // degrees
  const [zoom, setZoom] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const partDetails = {
    solar: {
      title: "Kanopi Solar PV 4.000 Wp",
      spec: "10x 400W Monocrystalline Panels",
      desc: "Menghasilkan rata-rata 22 kWh energi surya per hari (5,5 peak sun hours). Menopang 100% beban kompresor di siang hari dan mengisi baterai.",
      tag: "Clean Energy Source",
      cameraAngle: { rotY: -20, rotX: 28 },
    },
    coldroom: {
      title: "Kabin Cold Storage Insulasi 100mm",
      spec: "Kapasitas 500 – 1.000 kg • Suhu ≤ -18°C",
      desc: "Dinding Sandwich Panel Polyurethane Density 42 kg/m³ berlapis plat stainless steel food-grade 304 anti-korosi air laut.",
      tag: "Marine-Grade Preservation",
      cameraAngle: { rotY: 0, rotX: 10 },
    },
    bess: {
      title: "Battery Energy Storage (BESS) 10 kWh",
      spec: "LiFePO4 48V 200Ah • Siklus > 4.000 Kali",
      desc: "Menyimpan daya surya untuk menjaga pendinginan tetap aktif selama 16+ jam di malam hari atau saat cuaca mendung berkepanjangan.",
      tag: "Night-Shift Power Stability",
      cameraAngle: { rotY: 55, rotX: 15 },
    },
    iot: {
      title: "Smart IoT Controller & Gateway",
      spec: "Sensor Presisi DS18B20 + 4G/LoRa Telemetri",
      desc: "Mencatat fluktuasi temperatur secara real-time, mendeteksi pintu terbuka, dan menerbitkan tiket QR traceability untuk nelayan.",
      tag: "Digital Synchronization",
      cameraAngle: { rotY: -55, rotX: 12 },
    },
    chassis: {
      title: "Rangka Modular & Proteksi Salinitas",
      spec: "Hot-Dip Galvanized & SS304 Skid",
      desc: "Konstruksi modular portabel yang mudah dimobilisasi dengan truk engkel ke dermaga terpencil, tahan cuaca ekstrem pesisir.",
      tag: "Coastal Durability",
      cameraAngle: { rotY: 15, rotX: -5 },
    },
  };

  // Auto-rotation loop
  useEffect(() => {
    if (!isAutoRotate || isDragging) return;

    const interval = setInterval(() => {
      setRotY((prev) => (prev + 0.5) % 360);
    }, 30);

    return () => clearInterval(interval);
  }, [isAutoRotate, isDragging]);

  // Handle switching parts with smooth camera alignment
  const handleSelectPart = (part: "solar" | "coldroom" | "bess" | "iot" | "chassis") => {
    setActivePart(part);
    setIsAutoRotate(false);
    setRotY(partDetails[part].cameraAngle.rotY);
    setRotX(partDetails[part].cameraAngle.rotX);
  };

  // 3D Canvas Rendering Engine (Real-time 3D Matrix Projection & Shading)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2 + 30;

    // Convert angles to radians
    const radY = (rotY * Math.PI) / 180;
    const radX = (rotX * Math.PI) / 180;

    // 3D Vector & Projection Helper
    type Point3D = [number, number, number];
    type Point2D = { x: number; y: number; z: number };

    const project = (p: Point3D): Point2D => {
      // Rotation Y
      const x1 = p[0] * Math.cos(radY) + p[2] * Math.sin(radY);
      const y1 = p[1];
      const z1 = -p[0] * Math.sin(radY) + p[2] * Math.cos(radY);

      // Rotation X
      const x2 = x1;
      const y2 = y1 * Math.cos(radX) - z1 * Math.sin(radX);
      const z2 = y1 * Math.sin(radX) + z1 * Math.cos(radX);

      // Perspective Projection
      const fov = 700;
      const scale = (fov / (fov + z2)) * zoom;
      return {
        x: cx + x2 * scale,
        y: cy + y2 * scale,
        z: z2,
      };
    };

    // Draw frame
    ctx.clearRect(0, 0, width, height);

    // 1. Draw Grid Floor / Dock Pier
    ctx.strokeStyle = "rgba(13, 148, 136, 0.15)";
    ctx.lineWidth = 1;
    const gridSize = 320;
    const gridStep = 40;

    for (let gx = -gridSize; gx <= gridSize; gx += gridStep) {
      const p1 = project([gx, 150, -gridSize]);
      const p2 = project([gx, 150, gridSize]);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
    for (let gz = -gridSize; gz <= gridSize; gz += gridStep) {
      const p1 = project([-gridSize, 150, gz]);
      const p2 = project([gridSize, 150, gz]);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }

    // 2. Drop Shadow under Unit
    const shadowP1 = project([-170, 148, -110]);
    const shadowP2 = project([170, 148, -110]);
    const shadowP3 = project([170, 148, 110]);
    const shadowP4 = project([-170, 148, 110]);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.beginPath();
    ctx.moveTo(shadowP1.x, shadowP1.y);
    ctx.lineTo(shadowP2.x, shadowP2.y);
    ctx.lineTo(shadowP3.x, shadowP3.y);
    ctx.lineTo(shadowP4.x, shadowP4.y);
    ctx.closePath();
    ctx.fill();

    // 3D Polygons definition for the unit
    interface Poly3D {
      points: Point3D[];
      color: string;
      strokeColor: string;
      isHighlighted: boolean;
      label?: string;
    }

    const polys: Poly3D[] = [];

    // Helper: Add 3D Box
    const addBox = (
      minX: number,
      minY: number,
      minZ: number,
      maxX: number,
      maxY: number,
      maxZ: number,
      baseColor: string,
      highlight: boolean
    ) => {
      const cTop = highlight ? "#14b8a6" : baseColor;
      const cFront = highlight ? "#0d9488" : adjustBrightness(baseColor, -15);
      const cRight = highlight ? "#0f766e" : adjustBrightness(baseColor, -30);
      const cLeft = highlight ? "#0f766e" : adjustBrightness(baseColor, -25);
      const cBack = adjustBrightness(baseColor, -40);

      // Top
      polys.push({
        points: [
          [minX, minY, minZ],
          [maxX, minY, minZ],
          [maxX, minY, maxZ],
          [minX, minY, maxZ],
        ],
        color: cTop,
        strokeColor: highlight ? "#5eead4" : "#334155",
        isHighlighted: highlight,
      });
      // Front (Z+)
      polys.push({
        points: [
          [minX, minY, maxZ],
          [maxX, minY, maxZ],
          [maxX, maxY, maxZ],
          [minX, maxY, maxZ],
        ],
        color: cFront,
        strokeColor: highlight ? "#5eead4" : "#334155",
        isHighlighted: highlight,
      });
      // Back (Z-)
      polys.push({
        points: [
          [maxX, minY, minZ],
          [minX, minY, minZ],
          [minX, maxY, minZ],
          [maxX, maxY, minZ],
        ],
        color: cBack,
        strokeColor: "#1e293b",
        isHighlighted: highlight,
      });
      // Right (X+)
      polys.push({
        points: [
          [maxX, minY, maxZ],
          [maxX, minY, minZ],
          [maxX, maxY, minZ],
          [maxX, maxY, maxZ],
        ],
        color: cRight,
        strokeColor: highlight ? "#5eead4" : "#334155",
        isHighlighted: highlight,
      });
      // Left (X-)
      polys.push({
        points: [
          [minX, minY, minZ],
          [minX, minY, maxZ],
          [minX, maxY, maxZ],
          [minX, maxY, minZ],
        ],
        color: cLeft,
        strokeColor: highlight ? "#5eead4" : "#334155",
        isHighlighted: highlight,
      });
    };

    function adjustBrightness(hex: string, percent: number) {
      if (!hex.startsWith("#") || hex.length !== 7) return hex;
      const num = parseInt(hex.slice(1), 16);
      const r = Math.min(255, Math.max(0, (num >> 16) + percent));
      const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + percent));
      const b = Math.min(255, Math.max(0, (num & 0x0000ff) + percent));
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    // A. Main Stainless Steel Cold Storage Cabin
    addBox(-120, -10, -70, 120, 130, 70, "#1e293b", activePart === "coldroom");

    // Inner Door Frame Detail (Front)
    polys.push({
      points: [
        [-90, 10, 72],
        [40, 10, 72],
        [40, 115, 72],
        [-90, 115, 72],
      ],
      color: activePart === "coldroom" ? "#115e59" : "#0f172a",
      strokeColor: activePart === "coldroom" ? "#2dd4bf" : "#0D9488",
      isHighlighted: activePart === "coldroom",
    });

    // B. Base Skid Rangka SS304
    addBox(-145, 130, -85, 145, 148, 85, "#334155", activePart === "chassis");

    // C. BESS LiFePO4 Compartment (Right Box)
    addBox(60, 15, 73, 110, 115, 88, activePart === "bess" ? "#15803d" : "#1e3a8a", activePart === "bess");

    // D. IoT Smart Controller Gateway (Left Box)
    addBox(-110, 20, 73, -65, 70, 85, activePart === "iot" ? "#7e22ce" : "#1e293b", activePart === "iot");

    // E. Canopy Truss Pillars
    const trussColor = "#64748b";
    addBox(-115, -110, -65, -105, -10, -55, trussColor, activePart === "solar");
    addBox(105, -110, -65, 115, -10, -55, trussColor, activePart === "solar");
    addBox(-115, -90, 55, -105, -10, 65, trussColor, activePart === "solar");
    addBox(105, -90, 55, 115, -10, 65, trussColor, activePart === "solar");

    // F. Solar PV Canopy (Slanted Roof 4.000 Wp)
    const sWidth = 175;
    const sDepth = 110;
    const sTopY = -140;
    const sBotY = -95;

    // Slanted Solar Panels Grid
    polys.push({
      points: [
        [-sWidth, sTopY, -sDepth],
        [sWidth, sTopY, -sDepth],
        [sWidth, sBotY, sDepth],
        [-sWidth, sBotY, sDepth],
      ],
      color: activePart === "solar" ? "#1d4ed8" : "#0f172a",
      strokeColor: activePart === "solar" ? "#60a5fa" : "#3b82f6",
      isHighlighted: activePart === "solar",
    });

    // Sort polygons by average Z depth (Painter's Algorithm for correct 3D overlap)
    const sortedPolys = polys.map((poly) => {
      let avgZ = 0;
      poly.points.forEach((p) => {
        const proj = project(p);
        avgZ += proj.z;
      });
      avgZ /= poly.points.length;
      return { ...poly, avgZ };
    });

    sortedPolys.sort((a, b) => a.avgZ - b.avgZ);

    // Draw all sorted 3D polygons
    sortedPolys.forEach((poly) => {
      const projPoints = poly.points.map(project);
      ctx.beginPath();
      ctx.moveTo(projPoints[0].x, projPoints[0].y);
      for (let i = 1; i < projPoints.length; i++) {
        ctx.lineTo(projPoints[i].x, projPoints[i].y);
      }
      ctx.closePath();

      ctx.fillStyle = poly.color;
      ctx.fill();

      ctx.strokeStyle = poly.strokeColor;
      ctx.lineWidth = poly.isHighlighted ? 2.5 : 1;
      ctx.stroke();
    });

    // Draw 3D Solar Cell Grid Lines on the Solar Roof
    const roofP1 = project([-sWidth, sTopY, -sDepth]);
    const roofP2 = project([sWidth, sTopY, -sDepth]);
    const roofP3 = project([sWidth, sBotY, sDepth]);
    const roofP4 = project([-sWidth, sBotY, sDepth]);

    // Draw individual PV panel separations
    ctx.strokeStyle = activePart === "solar" ? "rgba(96, 165, 250, 0.8)" : "rgba(59, 130, 246, 0.4)";
    ctx.lineWidth = 1.5;
    for (let i = 1; i <= 4; i++) {
      const frac = i / 5;
      const topPt = project([-sWidth + 2 * sWidth * frac, sTopY, -sDepth]);
      const botPt = project([-sWidth + 2 * sWidth * frac, sBotY, sDepth]);
      ctx.beginPath();
      ctx.moveTo(topPt.x, topPt.y);
      ctx.lineTo(botPt.x, botPt.y);
      ctx.stroke();
    }

    // Front Temperature Screen Glowing Reading
    const screenCenter = project([-25, 60, 74]);
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 13px monospace";
    ctx.textAlign = "center";
    ctx.fillText("≤ -18.4°C", screenCenter.x, screenCenter.y);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "8px sans-serif";
    ctx.fillText("DEEP FREEZE • 1.000 KG", screenCenter.x, screenCenter.y + 14);

    // IoT Diode pulse
    const diode = project([-88, 35, 86]);
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.arc(diode.x, diode.y, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // LiFePO4 battery label
    const battText = project([85, 65, 89]);
    ctx.fillStyle = "#4ade80";
    ctx.font = "bold 9px monospace";
    ctx.fillText("10 kWh", battText.x, battText.y);
  }, [rotY, rotX, zoom, activePart]);

  // Mouse & Touch Drag Event Handlers for 3D Orbit
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoRotate(false);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    setRotY((prev) => prev + dx * 0.6);
    setRotX((prev) => Math.max(-45, Math.min(60, prev - dy * 0.4)));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setIsAutoRotate(false);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStart.x;
    const dy = e.touches[0].clientY - dragStart.y;

    setRotY((prev) => prev + dx * 0.7);
    setRotX((prev) => Math.max(-45, Math.min(60, prev - dy * 0.5)));
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  return (
    <div className="bg-gradient-to-b from-[#06121f] via-[#091b2e] to-[#0c243d] rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-2xl space-y-6">
      {/* Header with 3D Status */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase bg-teal text-navy px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <Rotate3d className="w-3 h-3" />
              HD 3D INTERACTIVE PROTOTYPE
            </span>
            <span className="text-xs text-teal-light font-mono hidden sm:inline">
              Model: BlueSync CS-1000 Solar-Hybrid (360° Orbit View)
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            Arsitektur Fisik & Prototipe 3D Micro Cold Storage
          </h3>
          <p className="text-xs text-slate-400">
            Klik dan seret (drag) model 3D untuk memutar 360°, atau pilih komponen hardware di bawah:
          </p>
        </div>

        {/* Part Selector Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "solar", label: "Solar Panel 4kW", icon: Sun },
            { id: "coldroom", label: "Kabin Pendingin", icon: ThermometerSnowflake },
            { id: "bess", label: "Baterai LiFePO4", icon: BatteryCharging },
            { id: "iot", label: "Modul IoT", icon: Cpu },
            { id: "chassis", label: "Rangka SS304", icon: ShieldCheck },
          ].map((item) => {
            const isSelected = activePart === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectPart(item.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  isSelected
                    ? "bg-teal text-navy font-bold shadow-lg ring-2 ring-teal-light scale-105"
                    : "bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3D Viewport & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Interactive 3D Canvas Viewport */}
        <div className="lg:col-span-7 bg-[#030810] rounded-2xl p-4 border border-teal/40 relative overflow-hidden shadow-inner flex flex-col items-center justify-center min-h-[380px]">
          {/* 3D Coordinate Grid Watermark */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#0D9488 1px, transparent 1px), linear-gradient(90deg, #0D9488 1px, transparent 1px)`,
              backgroundSize: `24px 24px`,
            }}
          />

          {/* Interactive 3D Canvas */}
          <canvas
            ref={canvasRef}
            width={580}
            height={360}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            className="w-full max-w-lg h-auto cursor-grab active:cursor-grabbing relative z-10 select-none touch-none"
          />

          {/* 3D Viewport Controls (Overlay Top Left & Bottom) */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
            <span className="text-[10px] font-mono text-teal-300 bg-slate-950/80 px-2 py-0.5 rounded border border-teal-900/60 flex items-center gap-1">
              <Eye className="w-3 h-3 text-teal animate-pulse" />
              <span>3D ORBIT VIEWPORT • ACTIVE</span>
            </span>
          </div>

          <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-slate-950/90 p-1.5 rounded-xl border border-slate-800 shadow-md">
            <button
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              title={isAutoRotate ? "Jeda Rotasi Otomatis" : "Putar Otomatis 360°"}
              className={`p-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1 ${
                isAutoRotate ? "bg-teal text-navy font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              {isAutoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="text-[10px] hidden sm:inline">{isAutoRotate ? "Jeda" : "Putar 360°"}</span>
            </button>

            <button
              onClick={() => setZoom((prev) => Math.min(1.4, prev + 0.1))}
              title="Zoom In"
              className="p-1.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setZoom((prev) => Math.max(0.7, prev - 0.1))}
              title="Zoom Out"
              className="p-1.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setRotY(-25);
                setRotX(15);
                setZoom(1);
                setIsAutoRotate(true);
              }}
              title="Reset Sudut Pandang Kamera"
              className="p-1.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <RefreshCw className="w-3.5 h-3.5 text-teal" />
            </button>
          </div>

          <div className="absolute bottom-3 left-3 z-20 text-[10px] font-mono text-slate-500 bg-slate-950/70 px-2 py-0.5 rounded">
            Sudut: {Math.round(rotY)}° Y • {Math.round(rotX)}° X
          </div>
        </div>

        {/* Right: Active Component Details Card */}
        <div className="lg:col-span-5 bg-slate-950/90 p-5 sm:p-6 rounded-2xl border border-teal/40 space-y-4 shadow-lg animate-in fade-in">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-teal bg-teal/10 px-2.5 py-1 rounded-full border border-teal/30">
              {partDetails[activePart].tag}
            </span>
            <h4 className="text-xl font-bold text-white mt-2">
              {partDetails[activePart].title}
            </h4>
            <div className="text-xs font-mono font-semibold text-amber-400 mt-0.5">
              {partDetails[activePart].spec}
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {partDetails[activePart].desc}
          </p>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[9px] uppercase">Proteksi Karat:</span>
              <strong className="text-white text-xs">IP65 & SS304 Marine</strong>
            </div>
            <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[9px] uppercase">Garansi Sistem:</span>
              <strong className="text-teal-light text-xs">5 Tahun Fabrikasi</strong>
            </div>
          </div>

          <div className="bg-teal/10 p-3 rounded-xl border border-teal/30 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-[11px] text-teal-light">
              Sentuh &amp; geser model 3D di sebelah kiri untuk melihat detail perakitan dari segala sudut.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
