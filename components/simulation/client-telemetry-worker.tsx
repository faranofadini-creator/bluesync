"use client";

import { useEffect } from "react";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";

export default function ClientTelemetryWorker() {
  const { triggerSimulationTick, simulation } = useBlueSyncStore();

  useEffect(() => {
    if (!simulation.isDemoMode) return;

    // Simulation tick every 15 seconds
    const interval = setInterval(() => {
      triggerSimulationTick();
    }, 15000);

    return () => clearInterval(interval);
  }, [simulation.isDemoMode, triggerSimulationTick]);

  return null;
}
