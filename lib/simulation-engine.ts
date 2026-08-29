import { Unit, SensorReading, Notification } from "./types";

export interface SimulationState {
  isDemoMode: boolean;
  tickCount: number;
  anomalyTempInjected: boolean;
  injectedTempC?: number;
  doorForceOpen: boolean;
  batteryDepleted: boolean;
  compressorError: boolean;
}

export const DEFAULT_SIMULATION_STATE: SimulationState = {
  isDemoMode: true,
  tickCount: 0,
  anomalyTempInjected: false,
  doorForceOpen: false,
  batteryDepleted: false,
  compressorError: false,
};

/**
 * Calculates simulated solar output in kW based on time of day (0 to 24h)
 * Peak at 12:00 (8.4 kW), zero during night (18:00 - 06:00)
 */
export function calculateSimulatedSolarKw(date: Date = new Date(), maxKw: number = 8.4): number {
  const hours = date.getHours() + date.getMinutes() / 60;
  if (hours < 6 || hours > 18) return 0;
  // Sine curve between 6h and 18h (period = 12h)
  const solarAngle = ((hours - 6) / 12) * Math.PI;
  const rawKw = maxKw * Math.sin(solarAngle);
  // Add minor cloud variance (+- 5%)
  const variance = 1 + (Math.sin(date.getTime() / 100000) * 0.05);
  return Math.max(0, Math.round(rawKw * variance * 10) / 10);
}

/**
 * Calculates sine-wave oscillating cold storage temperature between -20°C and -15°C
 */
export function calculateSimulatedTemp(tick: number, baseTemp: number = -18.2): number {
  // Sine wave oscillation with 60 ticks period
  const oscillation = Math.sin((tick * 2 * Math.PI) / 60) * 1.8;
  const temp = baseTemp + oscillation;
  return Math.round(temp * 10) / 10;
}

/**
 * Generates the next telemetry reading for a given cold storage unit
 */
export function generateNextSensorReading(
  unit: Unit,
  simState: SimulationState,
  date: Date = new Date()
): { updatedUnit: Unit; reading: SensorReading; alertNotifs: Notification[] } {
  const tick = simState.tickCount + 1;
  const solarKw = calculateSimulatedSolarKw(date, unit.solarCapacityKw);

  let tempC = calculateSimulatedTemp(tick, -18.2);
  let batteryPct = unit.currentBatteryPct;
  let compressorOk = !simState.compressorError;
  let doorOpen = simState.doorForceOpen;

  // Handle injected anomalies for pitching demo
  if (simState.anomalyTempInjected) {
    tempC = simState.injectedTempC ?? -14.6; // Triggers WARNING (> -15°C)
  }

  if (simState.batteryDepleted) {
    batteryPct = 18; // Triggers WARNING (< 20%)
  } else {
    // Battery dynamics: drain slightly, charge when solar > 2 kW
    if (solarKw > 2.0) {
      batteryPct = Math.min(100, Math.round((batteryPct + 0.3) * 10) / 10);
    } else {
      batteryPct = Math.max(25, Math.round((batteryPct - 0.1) * 10) / 10);
    }
  }

  const gridStatus: "standby" | "active" = solarKw < 1.0 && batteryPct < 30 ? "active" : "standby";

  // Determine unit status
  let status: Unit["status"] = "optimal";
  if (tempC > -10.0 || !compressorOk) {
    status = "critical";
  } else if (tempC > -15.0 || batteryPct < 20 || doorOpen) {
    status = "warning";
  }

  const updatedUnit: Unit = {
    ...unit,
    currentTempC: tempC,
    currentBatteryPct: batteryPct,
    currentSolarKw: solarKw,
    currentGridStatus: gridStatus,
    compressorOk,
    doorOpen,
    status,
  };

  const reading: SensorReading = {
    id: `sr-${unit.code}-${Date.now()}`,
    unitId: unit.id,
    unitCode: unit.code,
    temperatureC: tempC,
    humidityPct: 62 + Math.round(Math.sin(tick) * 4),
    batteryPct,
    solarKw,
    gridStatus,
    compressorOk,
    doorOpen,
    doorOpenMinutes: doorOpen ? 6 : 0,
    recordedAt: date.toISOString(),
  };

  // Generate alerts if threshold breached
  const alertNotifs: Notification[] = [];

  if (tempC > -10.0) {
    alertNotifs.push({
      id: `alert-temp-crit-${Date.now()}`,
      targetRole: "all",
      type: "alert",
      severity: "critical",
      title: `🚨 KRITIKAL: Suhu Unit ${unit.code} Naik ke ${tempC}°C`,
      body: `Suhu unit ${unit.name} melampaui batas kritis (-10°C). Segera cek kompresor pendingin!`,
      isRead: false,
      unitCode: unit.code,
      createdAt: date.toISOString(),
    });
  } else if (tempC > -15.0) {
    alertNotifs.push({
      id: `alert-temp-warn-${Date.now()}`,
      targetRole: "all",
      type: "alert",
      severity: "warning",
      title: `⚠️ PERINGATAN: Suhu Unit ${unit.code} di Atas Batas Optimal (${tempC}°C)`,
      body: `Suhu unit ${unit.name} naik ke ${tempC}°C (ambang batas > -15.0°C). Sistem mengaktifkan daya kompresor cadangan.`,
      isRead: false,
      unitCode: unit.code,
      createdAt: date.toISOString(),
    });
  }

  if (batteryPct < 20) {
    alertNotifs.push({
      id: `alert-bat-${Date.now()}`,
      targetRole: "operator",
      type: "alert",
      severity: "warning",
      title: `🔋 Baterai Rendah: Unit ${unit.code} (${batteryPct}%)`,
      body: `Daya baterai LiFePO4 di bawah 20%. Grid PLN/Genset otomatis disiapkan.`,
      isRead: false,
      unitCode: unit.code,
      createdAt: date.toISOString(),
    });
  }

  if (!compressorOk) {
    alertNotifs.push({
      id: `alert-comp-${Date.now()}`,
      targetRole: "all",
      type: "alert",
      severity: "critical",
      title: `❌ Kompresor Unit ${unit.code} Bermasalah`,
      body: `Sensor mendeteksi kegagalan sirkulasi freon/kompresor. Teknisi BUMDes segera ditugaskan.`,
      isRead: false,
      unitCode: unit.code,
      createdAt: date.toISOString(),
    });
  }

  return { updatedUnit, reading, alertNotifs };
}
