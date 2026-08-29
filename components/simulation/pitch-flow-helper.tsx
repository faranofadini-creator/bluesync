"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { Presentation, CheckCircle2, ArrowRight, ArrowLeft, X, Sparkles, AlertTriangle } from "lucide-react";

interface PitchStep {
  id: number;
  title: string;
  role: "all" | "fisherman" | "operator" | "buyer" | "gov" | "admin";
  targetRoute: string;
  actionText: string;
  description: string;
  triggerAnomaly?: boolean;
}

const PITCH_STEPS: PitchStep[] = [
  {
    id: 1,
    title: "1. LANDING PAGE",
    role: "all",
    targetRoute: "/",
    actionText: "Buka Homepage",
    description: "Tampilkan hero 'Keep the Catch Fresh. Empower the Coast.' dan gambaran ekosistem cold chain.",
  },
  {
    id: 2,
    title: "2. LOGIN AS NELAYAN",
    role: "fisherman",
    targetRoute: "/dashboard",
    actionText: "Login Nelayan Anto",
    description: "Masuk sebagai Nelayan Anto dan lihat ringkasan KPI serta widget live sensor cold storage.",
  },
  {
    id: 3,
    title: "3. CARI UNIT STORAGE",
    role: "fisherman",
    targetRoute: "/dashboard/booking",
    actionText: "Buka Formulir Booking",
    description: "Anto mencari BlueSync BD-001 di BUMDes Bahari Jaya, cek kapasitas sisa dan tarif.",
  },
  {
    id: 4,
    title: "4. BOOKING 50 KG TUNA",
    role: "fisherman",
    targetRoute: "/dashboard/booking",
    actionText: "Jalankan 7-Step Booking",
    description: "Input 50 kg Tuna Sirip Kuning, durasi 3 hari (Rp 525.000) dan bayar instan via QRIS.",
  },
  {
    id: 5,
    title: "5. SWITCH KE OPERATOR",
    role: "operator",
    targetRoute: "/operator/bookings",
    actionText: "Masuk Operator Budi",
    description: "Operator Budi melihat booking masuk dari Anto secara real-time dan menyetujuinya.",
  },
  {
    id: 6,
    title: "6. MONITORING SENSOR IOT",
    role: "operator",
    targetRoute: "/operator/units/unit-01",
    actionText: "Buka Telemetri Unit",
    description: "Pantau suhu presisi -18.4°C, daya solar PV 7.8 kW, dan baterai LiFePO4 88%.",
  },
  {
    id: 7,
    title: "7. TRIGGER SMART ALERT",
    role: "operator",
    targetRoute: "/operator/units/unit-01",
    actionText: "Simulasikan Anomali Suhu",
    description: "Suhu naik ke -14.6°C → Alert WARNING merah/kuning muncul seketika di dashboard.",
    triggerAnomaly: true,
  },
  {
    id: 8,
    title: "8. IMPACT DASHBOARD",
    role: "operator",
    targetRoute: "/operator/revenue",
    actionText: "Lihat Dampak & Revenue",
    description: "Operator melihat 750 kg ikan tersimpan, 180 kg post-harvest loss avoided, Rp 2.7M nilai ekonomi.",
  },
  {
    id: 9,
    title: "9. ADMIN GLOBAL & FORMULA",
    role: "admin",
    targetRoute: "/admin/impact-formulas",
    actionText: "Buka Formula Engine",
    description: "Admin melihat formula perhitungan dinamis tanpa hardcode dan audit trail perubahan rumus.",
  },
  {
    id: 10,
    title: "10. PENUTUP & SDGS",
    role: "gov",
    targetRoute: "/gov/sdg",
    actionText: "Tampilkan Matriks SDGs",
    description: "Pemerintah & CSR melihat kontribusi langsung pada SDG 1, 2, 8, 9, 12, 13, dan 14.",
  },
];

export default function PitchFlowHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const router = useRouter();
  const { switchUser, injectTemperatureAnomaly } = useBlueSyncStore();

  const step = PITCH_STEPS[currentStepIndex];

  const handleExecuteStep = (stepItem: PitchStep, index: number) => {
    setCurrentStepIndex(index);
    if (stepItem.role === "fisherman") switchUser("user-nelayan-anto");
    else if (stepItem.role === "operator") switchUser("user-operator-budi");
    else if (stepItem.role === "buyer") switchUser("user-buyer-citra");
    else if (stepItem.role === "gov") switchUser("user-gov-hendra");
    else if (stepItem.role === "admin") switchUser("user-admin-global");

    if (stepItem.triggerAnomaly) {
      injectTemperatureAnomaly("BS-001", -14.6);
    }

    router.push(stepItem.targetRoute);
  };

  const handleNext = () => {
    if (currentStepIndex < PITCH_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      handleExecuteStep(PITCH_STEPS[nextIdx], nextIdx);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      handleExecuteStep(PITCH_STEPS[prevIdx], prevIdx);
    }
  };

  return (
    <aside aria-label="Pitching Presentation Navigator" className="fixed bottom-20 sm:bottom-6 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-navy hover:bg-ocean text-white shadow-xl border-2 border-amber-400 px-4 py-2.5 rounded-full flex items-center gap-2 font-bold text-xs transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          <span>Panduan Pitching (10 Langkah)</span>
          <span className="bg-amber-400 text-navy font-black text-[10px] px-1.5 py-0.5 rounded-full">
            {currentStepIndex + 1}/10
          </span>
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-navy w-[340px] sm:w-[380px] overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-navy text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Presentation className="w-4 h-4 text-teal" />
              <span className="font-bold text-sm">Alur Pitching BlueSync (2-3 Menit)</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Current Step Content */}
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-mono uppercase font-bold text-ocean">
                Langkah {step.id} dari {PITCH_STEPS.length}
              </span>
              <span className="bg-teal/10 text-teal font-semibold px-2 py-0.5 rounded text-[10px] uppercase">
                Role: {step.role}
              </span>
            </div>
            <h4 className="font-bold text-navy text-base">{step.title}</h4>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{step.description}</p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleExecuteStep(step, currentStepIndex)}
                className="flex-1 bg-teal hover:bg-teal-dark text-white font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <span>{step.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Step Selector List */}
          <div className="max-h-48 overflow-y-auto p-2 space-y-1 bg-white">
            {PITCH_STEPS.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => handleExecuteStep(s, idx)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition ${
                  idx === currentStepIndex
                    ? "bg-navy text-white font-bold"
                    : "hover:bg-slate-100 text-slate-700 font-medium"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono ${
                      idx === currentStepIndex ? "bg-amber-400 text-navy font-bold" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {s.id}
                  </span>
                  <span className="truncate">{s.title}</span>
                </div>
                {idx === currentStepIndex && <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0" />}
              </button>
            ))}
          </div>

          {/* Footer Controls */}
          <div className="bg-slate-100 px-4 py-2.5 flex items-center justify-between border-t border-slate-200 text-xs">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="px-2.5 py-1 rounded text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent flex items-center gap-1 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Prev
            </button>
            <span className="text-[11px] text-slate-400 font-mono">
              {currentStepIndex + 1} / {PITCH_STEPS.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentStepIndex === PITCH_STEPS.length - 1}
              className="px-2.5 py-1 rounded bg-navy text-white hover:bg-navy-800 disabled:opacity-30 disabled:hover:bg-navy flex items-center gap-1 font-semibold"
            >
              Next <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
