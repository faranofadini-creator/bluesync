"use client";

import React, { useEffect, useState } from "react";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { AlertTriangle, Flame, X, ShieldAlert, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AlertToast() {
  const { notifications, units, markNotificationRead } = useBlueSyncStore();
  const [activeAlert, setActiveAlert] = useState<any | null>(null);

  // Find latest unread warning or critical alert
  useEffect(() => {
    const criticalOrWarning = notifications.find(
      (n) => !n.isRead && (n.severity === "critical" || n.severity === "warning" || n.type === "alert")
    );
    if (criticalOrWarning) {
      setActiveAlert(criticalOrWarning);
    }
  }, [notifications]);

  if (!activeAlert) return null;

  const isCritical = activeAlert.severity === "critical";

  return (
    <aside
      aria-label="Smart Alert Banner"
      className="fixed top-20 right-4 z-50 max-w-md w-[92vw] sm:w-[420px] animate-in slide-in-from-top-4 fade-in duration-300"
    >
      <div
        className={`rounded-2xl p-4 shadow-2xl border-2 flex items-start gap-3.5 backdrop-blur-md ${
          isCritical
            ? "bg-red-950/95 border-red-500 text-white"
            : "bg-amber-950/95 border-amber-500 text-white"
        }`}
      >
        <div
          className={`p-2 rounded-xl shrink-0 ${
            isCritical ? "bg-red-600 text-white animate-bounce" : "bg-amber-500 text-slate-950 animate-pulse"
          }`}
        >
          {isCritical ? <Flame className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded ${
                isCritical ? "bg-red-500 text-white" : "bg-amber-400 text-slate-950"
              }`}
            >
              SMART ALERT • {isCritical ? "CRITICAL" : "WARNING"}
            </span>
            <button
              onClick={() => {
                markNotificationRead(activeAlert.id);
                setActiveAlert(null);
              }}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h4 className="font-bold text-sm mt-1 text-white truncate">{activeAlert.title}</h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{activeAlert.body}</p>

          <div className="mt-3 flex items-center justify-between gap-2">
            <Link
              href="/operator/units/unit-01"
              onClick={() => {
                markNotificationRead(activeAlert.id);
                setActiveAlert(null);
              }}
              className="inline-flex items-center gap-1 text-xs font-bold text-teal-light hover:underline"
            >
              <span>Buka Telemetri Unit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => {
                markNotificationRead(activeAlert.id);
                setActiveAlert(null);
              }}
              className="text-[11px] text-slate-400 hover:text-slate-200"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
