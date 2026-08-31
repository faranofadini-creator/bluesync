"use client";

import { useState, useEffect, useCallback } from "react";
import {
  User,
  UserRole,
  Unit,
  Booking,
  FishBatch,
  FishSpecies,
  Order,
  Payment,
  LeaseContract,
  ImpactRecord,
  MaintenanceLog,
  Partnership,
  Notification,
  ImpactFormula,
} from "../types";
import {
  INITIAL_USERS,
  INITIAL_LOCATIONS,
  INITIAL_FISH_SPECIES,
  INITIAL_UNITS,
  INITIAL_BOOKINGS,
  INITIAL_FISH_BATCHES,
  INITIAL_ORDERS,
  INITIAL_PAYMENTS,
  INITIAL_LEASE_CONTRACTS,
  INITIAL_IMPACT_RECORDS,
  INITIAL_MAINTENANCE_LOGS,
  INITIAL_PARTNERSHIPS,
  INITIAL_FORMULAS,
  INITIAL_NOTIFICATIONS,
} from "../mock-data";
import {
  SimulationState,
  DEFAULT_SIMULATION_STATE,
  generateNextSensorReading,
} from "../simulation-engine";
import { calculateComprehensiveImpact } from "../impact-engine";

const STORAGE_KEY = "bluesync_store_state_v2";
const BROADCAST_NAME = "bluesync_state_channel";

export interface BlueSyncData {
  currentUser: User;
  users: User[];
  units: Unit[];
  bookings: Booking[];
  batches: FishBatch[];
  species: FishSpecies[];
  orders: Order[];
  payments: Payment[];
  leaseContracts: LeaseContract[];
  impactRecords: ImpactRecord[];
  maintenanceLogs: MaintenanceLog[];
  partnerships: Partnership[];
  formulas: ImpactFormula[];
  notifications: Notification[];
  simulation: SimulationState;
}

const initialData: BlueSyncData = {
  currentUser: INITIAL_USERS[0], // Nelayan Anto
  users: INITIAL_USERS,
  units: INITIAL_UNITS,
  bookings: INITIAL_BOOKINGS,
  batches: INITIAL_FISH_BATCHES,
  species: INITIAL_FISH_SPECIES,
  orders: INITIAL_ORDERS,
  payments: INITIAL_PAYMENTS,
  leaseContracts: INITIAL_LEASE_CONTRACTS,
  impactRecords: INITIAL_IMPACT_RECORDS,
  maintenanceLogs: INITIAL_MAINTENANCE_LOGS,
  partnerships: INITIAL_PARTNERSHIPS,
  formulas: INITIAL_FORMULAS,
  notifications: INITIAL_NOTIFICATIONS,
  simulation: DEFAULT_SIMULATION_STATE,
};

// Global in-memory instance for client components
let globalData: BlueSyncData = initialData;
let listeners: Array<(data: BlueSyncData) => void> = [];
let broadcastChannel: BroadcastChannel | null = null;

if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      globalData = { ...initialData, ...parsed };
    }
  } catch (e) {
    console.error("Failed to load store from localStorage", e);
  }

  try {
    broadcastChannel = new BroadcastChannel(BROADCAST_NAME);
    broadcastChannel.onmessage = (event) => {
      if (event.data && typeof event.data === "object") {
        globalData = event.data;
        notifyListeners();
      }
    };
  } catch (e) {
    console.warn("BroadcastChannel not supported in this browser");
  }
}

function persistAndBroadcast(newData: BlueSyncData) {
  globalData = newData;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      broadcastChannel?.postMessage(newData);
    } catch (e) {
      console.error("Failed to persist state", e);
    }
  }
  notifyListeners();
}

function notifyListeners() {
  listeners.forEach((listener) => listener(globalData));
}

export function useBlueSyncStore() {
  const [data, setData] = useState<BlueSyncData>(globalData);

  useEffect(() => {
    const handler = (newData: BlueSyncData) => {
      setData({ ...newData });
    };
    listeners.push(handler);
    return () => {
      listeners = listeners.filter((l) => l !== handler);
    };
  }, []);

  // --- Auth Actions ---
  const switchUser = useCallback((userOrRole: UserRole | string) => {
    let target = globalData.users.find((u) => u.id === userOrRole || u.role === userOrRole);
    if (!target) {
      target = globalData.users[0];
    }
    const updated = { ...globalData, currentUser: target };
    persistAndBroadcast(updated);
    return target;
  }, []);

  const loginWithCredentials = useCallback((email: string) => {
    const target = globalData.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (target) {
      const updated = { ...globalData, currentUser: target };
      persistAndBroadcast(updated);
      return target;
    }
    return null;
  }, []);

  // --- Booking Actions (AC-01) ---
  const createBooking = useCallback(
    (params: {
      unitId: string;
      fishSpeciesId: string;
      weightKg: number;
      startDate: string;
      endDate: string;
      durationDays: number;
      paymentMethod: "qris" | "bank_transfer" | "ewallet";
      notes?: string;
    }) => {
      const unit = globalData.units.find((u) => u.id === params.unitId) || globalData.units[0];
      const sp = globalData.species.find((s) => s.id === params.fishSpeciesId) || globalData.species[0];
      const fisherman = globalData.currentUser;

      const totalPrice = params.weightKg * params.durationDays * unit.pricePerKgPerDay;
      const count = globalData.bookings.length + 1;
      const bookingCode = `BS-${unit.code}-BK${count.toString().padStart(2, "0")}`;

      const newBooking: Booking = {
        id: `bk-${Date.now()}`,
        bookingCode,
        unitId: unit.id,
        unitCode: unit.code,
        unitName: unit.name,
        fishermanId: fisherman.id,
        fishermanName: fisherman.fullName,
        fishermanPhone: fisherman.phone,
        fishSpeciesId: sp.id,
        fishSpeciesName: sp.name,
        weightKg: params.weightKg,
        startDate: params.startDate,
        endDate: params.endDate,
        durationDays: params.durationDays,
        status: "active", // Auto-active upon simulated payment confirmation (AC-01)
        totalPrice,
        paymentStatus: "paid",
        paymentMethod: params.paymentMethod,
        notes: params.notes,
        createdAt: new Date().toISOString(),
      };

      // Create Payment Record
      const newPayment: Payment = {
        id: `pay-${Date.now()}`,
        bookingId: newBooking.id,
        amount: totalPrice,
        method: params.paymentMethod,
        status: "paid",
        xenditRef: `XND-${params.paymentMethod.toUpperCase()}-${Math.floor(10000000 + Math.random() * 90000000)}`,
        paidAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        description: `Sewa Cold Storage ${params.weightKg}kg ${sp.name} (${params.durationDays} Hari)`,
        payerName: fisherman.fullName,
      };

      // Create Corresponding Traceable Batch
      const batchCode = `BATCH-${unit.locationName.replace(/\s+/g, "").toUpperCase()}-${sp.name.split(" ")[0].toUpperCase()}-${Date.now().toString().slice(-4)}`;
      const newBatch: FishBatch = {
        id: `batch-${Date.now()}`,
        batchCode,
        bookingId: newBooking.id,
        fishermanName: fisherman.fullName,
        fishSpeciesName: sp.name,
        fishSpeciesId: sp.id,
        weightKg: params.weightKg,
        qrCodeUrl: `/trace/${batchCode}`,
        tempHistory: [unit.currentTempC, unit.currentTempC - 0.2, unit.currentTempC + 0.1],
        freshnessScore: 99,
        entryDate: new Date().toISOString(),
        unitId: unit.id,
        unitCode: unit.code,
        unitName: unit.name,
        locationName: `${unit.locationName}, ${unit.province}`,
        operatorName: unit.operatorName,
        bumdesName: unit.name.includes("(") ? unit.name.split("(")[1].replace(")", "") : "BUMDes Pengelola",
        pricePerKg: sp.avgMarketPriceRp,
        isAvailableInMarket: true,
        notes: params.notes || `Tangkapan segar nelayan ${fisherman.fullName}, pendinginan optimal BlueSync`,
      };

      // Update Unit Load
      const updatedUnits = globalData.units.map((u) => {
        if (u.id === unit.id) {
          return {
            ...u,
            currentLoadKg: Math.min(u.capacityKg, u.currentLoadKg + params.weightKg),
          };
        }
        return u;
      });

      // Add Notification for Operator & Fisherman
      const notifs: Notification[] = [
        {
          id: `notif-bk-new-${Date.now()}`,
          targetRole: "operator",
          type: "booking",
          severity: "info",
          title: `Booking Baru: ${bookingCode}`,
          body: `${fisherman.fullName} memesan penyimpanan ${params.weightKg} kg ${sp.name} di ${unit.name}.`,
          isRead: false,
          unitCode: unit.code,
          createdAt: new Date().toISOString(),
        },
        {
          id: `notif-pay-success-${Date.now()}`,
          targetRole: "fisherman",
          type: "payment",
          severity: "info",
          title: `Pembayaran Berhasil!`,
          body: `Pembayaran Rp ${totalPrice.toLocaleString("id-ID")} untuk booking ${bookingCode} telah diterima.`,
          isRead: false,
          createdAt: new Date().toISOString(),
        },
      ];

      const updatedData: BlueSyncData = {
        ...globalData,
        bookings: [newBooking, ...globalData.bookings],
        batches: [newBatch, ...globalData.batches],
        payments: [newPayment, ...globalData.payments],
        units: updatedUnits,
        notifications: [...notifs, ...globalData.notifications],
      };

      persistAndBroadcast(updatedData);
      return { booking: newBooking, batch: newBatch, payment: newPayment };
    },
    []
  );

  // --- Operator Actions ---
  const approveBooking = useCallback((bookingId: string) => {
    const booking = globalData.bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const updatedBookings = globalData.bookings.map((b) =>
      b.id === bookingId ? { ...b, status: "active" as const } : b
    );

    const notif: Notification = {
      id: `notif-app-${Date.now()}`,
      targetRole: "fisherman",
      type: "booking",
      severity: "info",
      title: `Booking ${booking.bookingCode} Disetujui`,
      body: `Ikan Anda siap dimasukkan ke unit ${booking.unitName}.`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    persistAndBroadcast({
      ...globalData,
      bookings: updatedBookings,
      notifications: [notif, ...globalData.notifications],
    });
  }, []);

  const rejectBooking = useCallback((bookingId: string, reason: string) => {
    const booking = globalData.bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const updatedBookings = globalData.bookings.map((b) =>
      b.id === bookingId ? { ...b, status: "rejected" as const, notes: `Ditolak: ${reason}` } : b
    );

    const notif: Notification = {
      id: `notif-rej-${Date.now()}`,
      targetRole: "fisherman",
      type: "booking",
      severity: "warning",
      title: `Booking ${booking.bookingCode} Ditolak`,
      body: `Alasan penolakan: ${reason}`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    persistAndBroadcast({
      ...globalData,
      bookings: updatedBookings,
      notifications: [notif, ...globalData.notifications],
    });
  }, []);

  const extendBooking = useCallback((bookingId: string, additionalDays: number) => {
    const booking = globalData.bookings.find((b) => b.id === bookingId);
    const unit = globalData.units.find((u) => u.id === booking?.unitId);
    if (!booking || !unit) return;

    const newDuration = booking.durationDays + additionalDays;
    const additionalPrice = booking.weightKg * additionalDays * unit.pricePerKgPerDay;
    const newTotalPrice = booking.totalPrice + additionalPrice;

    const updatedBookings = globalData.bookings.map((b) =>
      b.id === bookingId
        ? {
            ...b,
            durationDays: newDuration,
            totalPrice: newTotalPrice,
            notes: `${b.notes || ""} [Diperpanjang +${additionalDays} hari]`,
          }
        : b
    );

    persistAndBroadcast({
      ...globalData,
      bookings: updatedBookings,
    });
  }, []);

  const checkOutBooking = useCallback((bookingId: string) => {
    const booking = globalData.bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const species = globalData.species.find((s) => s.id === booking.fishSpeciesId) || globalData.species[0];
    const unit = globalData.units.find((u) => u.id === booking.unitId) || globalData.units[0];

    // Compute Impact using dynamic configurable engine (AC-04)
    const impact = calculateComprehensiveImpact(
      booking.weightKg,
      booking.durationDays,
      species.lossRateWithoutColdChainPct,
      species.lossRateWithColdChainPct,
      species.avgMarketPriceRp,
      globalData.formulas,
      unit.solarCapacityKw
    );

    const newImpactRecord: ImpactRecord = {
      id: `imp-${Date.now()}`,
      unitId: unit.id,
      unitCode: unit.code,
      locationName: unit.locationName,
      periodStart: booking.startDate,
      periodEnd: booking.endDate,
      kgStored: booking.weightKg,
      kgLossAvoided: impact.foodLossAvoidedKg,
      revenueRp: booking.totalPrice,
      energyKwh: impact.solarKwh,
      co2AvoidedKg: impact.co2AvoidedKg,
      fishermenServed: 1,
    };

    const updatedBookings = globalData.bookings.map((b) =>
      b.id === bookingId ? { ...b, status: "completed" as const } : b
    );

    // Free unit capacity
    const updatedUnits = globalData.units.map((u) => {
      if (u.id === booking.unitId) {
        return {
          ...u,
          currentLoadKg: Math.max(0, u.currentLoadKg - booking.weightKg),
        };
      }
      return u;
    });

    const notif: Notification = {
      id: `notif-co-${Date.now()}`,
      targetRole: "all",
      type: "booking",
      severity: "info",
      title: `Checkout Selesai: ${booking.bookingCode}`,
      body: `Penyimpanan ${booking.weightKg} kg selesai. Berhasil menyelamatkan ~${impact.foodLossAvoidedKg} kg ikan (Nilai Ekonomi Rp ${impact.economicValueRp.toLocaleString("id-ID")})!`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    persistAndBroadcast({
      ...globalData,
      bookings: updatedBookings,
      units: updatedUnits,
      impactRecords: [newImpactRecord, ...globalData.impactRecords],
      notifications: [notif, ...globalData.notifications],
    });

    return { impact, booking };
  }, []);

  // --- Buyer Marketplace Actions ---
  const createOrder = useCallback(
    (params: { batchId: string; quantityKg: number; deliveryAddress: string }) => {
      const batch = globalData.batches.find((b) => b.id === params.batchId);
      if (!batch) return null;

      const buyer = globalData.currentUser;
      const orderCount = globalData.orders.length + 1;
      const orderCode = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${orderCount.toString().padStart(3, "0")}`;
      const totalPrice = params.quantityKg * batch.pricePerKg;

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderCode,
        batchId: batch.id,
        buyerId: buyer.id,
        buyerName: buyer.fullName,
        buyerPhone: buyer.phone,
        fishSpeciesName: batch.fishSpeciesName,
        quantityKg: params.quantityKg,
        pricePerKg: batch.pricePerKg,
        totalPrice,
        status: "confirmed",
        deliveryAddress: params.deliveryAddress,
        bumdesName: batch.bumdesName,
        createdAt: new Date().toISOString(),
      };

      const newPayment: Payment = {
        id: `pay-ord-${Date.now()}`,
        orderId: newOrder.id,
        amount: totalPrice,
        method: "bank_transfer",
        status: "paid",
        xenditRef: `XND-VA-${Math.floor(10000000 + Math.random() * 90000000)}`,
        paidAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        description: `Pembelian ${params.quantityKg}kg ${batch.fishSpeciesName} Terverifikasi`,
        payerName: buyer.fullName,
      };

      const notif: Notification = {
        id: `notif-ord-${Date.now()}`,
        targetRole: "operator",
        type: "booking",
        severity: "info",
        title: `Pesanan Baru dari Buyer: ${orderCode}`,
        body: `${buyer.fullName} membeli ${params.quantityKg} kg ${batch.fishSpeciesName} dari batch ${batch.batchCode}.`,
        isRead: false,
        createdAt: new Date().toISOString(),
      };

      persistAndBroadcast({
        ...globalData,
        orders: [newOrder, ...globalData.orders],
        payments: [newPayment, ...globalData.payments],
        notifications: [notif, ...globalData.notifications],
      });

      return newOrder;
    },
    []
  );

  // --- Admin Configurable Formula Actions ---
  const updateFormula = useCallback((formulaId: string, expression: string) => {
    const updated = globalData.formulas.map((f) =>
      f.id === formulaId
        ? {
            ...f,
            formulaExpression: expression,
            updatedAt: new Date().toISOString(),
            updatedBy: globalData.currentUser.fullName || "Admin BlueSync",
          }
        : f
    );
    persistAndBroadcast({ ...globalData, formulas: updated });
  }, []);

  // --- Admin Unit Management Actions ---
  const addUnit = useCallback((unit: Omit<Unit, "id" | "status" | "currentLoadKg" | "currentTempC" | "currentBatteryPct" | "currentSolarKw" | "currentGridStatus" | "compressorOk" | "doorOpen">) => {
    const newUnit: Unit = {
      ...unit,
      id: `unit-${Date.now()}`,
      currentLoadKg: 0,
      status: "optimal",
      currentTempC: -18.5,
      currentBatteryPct: 90,
      currentSolarKw: 7.5,
      currentGridStatus: "standby",
      compressorOk: true,
      doorOpen: false,
    };
    persistAndBroadcast({ ...globalData, units: [...globalData.units, newUnit] });
  }, []);

  const updateUnit = useCallback((unitId: string, updates: Partial<Unit>) => {
    const updated = globalData.units.map((u) => (u.id === unitId ? { ...u, ...updates } : u));
    persistAndBroadcast({ ...globalData, units: updated });
  }, []);

  // --- Maintenance Actions ---
  const addMaintenanceLog = useCallback((log: Omit<MaintenanceLog, "id" | "createdAt">) => {
    const newLog: MaintenanceLog = {
      ...log,
      id: `maint-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    persistAndBroadcast({ ...globalData, maintenanceLogs: [newLog, ...globalData.maintenanceLogs] });
  }, []);

  // --- Simulation & Pitching Control Actions (AC-05, PRD Section 19 & 27) ---
  const toggleDemoMode = useCallback((forced?: boolean) => {
    const nextVal = forced !== undefined ? forced : !globalData.simulation.isDemoMode;
    const sim: SimulationState = { ...globalData.simulation, isDemoMode: nextVal };
    persistAndBroadcast({ ...globalData, simulation: sim });
  }, []);

  const triggerSimulationTick = useCallback(() => {
    if (!globalData.simulation.isDemoMode) return;

    let newNotifs = [...globalData.notifications];
    const updatedUnits = globalData.units.map((u) => {
      const { updatedUnit, alertNotifs } = generateNextSensorReading(u, globalData.simulation, new Date());
      newNotifs = [...alertNotifs, ...newNotifs];
      return updatedUnit;
    });

    const nextSim: SimulationState = {
      ...globalData.simulation,
      tickCount: globalData.simulation.tickCount + 1,
    };

    persistAndBroadcast({
      ...globalData,
      units: updatedUnits,
      simulation: nextSim,
      notifications: newNotifs.slice(0, 30), // keep recent 30
    });
  }, []);

  const injectTemperatureAnomaly = useCallback((unitCode: string = "BS-001", tempC: number = -14.6) => {
    const nextSim: SimulationState = {
      ...globalData.simulation,
      anomalyTempInjected: true,
      injectedTempC: tempC,
    };

    const updatedUnits = globalData.units.map((u) => {
      if (u.code === unitCode) {
        return {
          ...u,
          currentTempC: tempC,
          status: tempC > -10.0 ? ("critical" as const) : ("warning" as const),
        };
      }
      return u;
    });

    const alertNotif: Notification = {
      id: `alert-inj-${Date.now()}`,
      targetRole: "all",
      type: "alert",
      severity: tempC > -10.0 ? "critical" : "warning",
      title: `⚠️ PERINGATAN SUHU ANOMALI: Unit ${unitCode} (${tempC}°C)`,
      body: `Simulasi mendeteksi kenaikan suhu ke ${tempC}°C. Ambang batas aman terlampaui!`,
      isRead: false,
      unitCode,
      createdAt: new Date().toISOString(),
    };

    persistAndBroadcast({
      ...globalData,
      units: updatedUnits,
      simulation: nextSim,
      notifications: [alertNotif, ...globalData.notifications],
    });
  }, []);

  const resetSimulation = useCallback(() => {
    persistAndBroadcast({
      ...initialData,
      simulation: {
        ...DEFAULT_SIMULATION_STATE,
        isDemoMode: true,
      },
    });
  }, []);

  const addNotification = useCallback((notif: Omit<Notification, "id" | "isRead" | "createdAt">) => {
    const newNotif: Notification = {
      ...notif,
      id: `notif-${Date.now()}`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    persistAndBroadcast({
      ...globalData,
      notifications: [newNotif, ...globalData.notifications],
    });
  }, []);

  const markNotificationRead = useCallback((notifId: string) => {
    const updated = globalData.notifications.map((n) => (n.id === notifId ? { ...n, isRead: true } : n));
    persistAndBroadcast({ ...globalData, notifications: updated });
  }, []);

  const clearNotifications = useCallback(() => {
    persistAndBroadcast({ ...globalData, notifications: [] });
  }, []);

  return {
    ...data,
    switchUser,
    loginWithCredentials,
    createBooking,
    approveBooking,
    rejectBooking,
    extendBooking,
    checkOutBooking,
    createOrder,
    updateFormula,
    addUnit,
    updateUnit,
    addMaintenanceLog,
    toggleDemoMode,
    triggerSimulationTick,
    injectTemperatureAnomaly,
    resetSimulation,
    addNotification,
    markNotificationRead,
    clearNotifications,
  };
}
