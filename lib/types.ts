export type UserRole = "admin" | "operator" | "fisherman" | "buyer" | "gov";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  phone: string;
  avatarUrl: string;
  unitId?: string;
  operatorOrg?: string;
  createdAt: string;
}

export interface Location {
  id: string;
  villageName: string;
  district: string;
  province: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
}

export interface FishSpecies {
  id: string;
  name: string;
  localName: string;
  recommendedTempC: number;
  maxStorageDays: number;
  icon: string;
  avgMarketPriceRp: number;
  lossRateWithoutColdChainPct: number; // e.g. 28%
  lossRateWithColdChainPct: number;    // e.g. 3%
}

export type UnitStatus = "optimal" | "warning" | "critical" | "maintenance";

export interface Unit {
  id: string;
  code: string;
  name: string;
  locationId: string;
  locationName: string;
  district: string;
  province: string;
  capacityKg: number;
  currentLoadKg: number;
  status: UnitStatus;
  operatorId: string;
  operatorName: string;
  installedAt: string;
  solarCapacityKw: number;
  batteryCapacityKwh: number;
  pricePerKgPerDay: number;
  minWeightKg: number;
  currentTempC: number;
  currentBatteryPct: number;
  currentSolarKw: number;
  currentGridStatus: "standby" | "active";
  compressorOk: boolean;
  doorOpen: boolean;
}

export interface SensorReading {
  id: string;
  unitId: string;
  unitCode: string;
  temperatureC: number;
  humidityPct: number;
  batteryPct: number;
  solarKw: number;
  gridStatus: "standby" | "active";
  compressorOk: boolean;
  doorOpen: boolean;
  doorOpenMinutes: number;
  recordedAt: string;
}

export type BookingStatus = "pending" | "active" | "completed" | "cancelled" | "rejected";
export type PaymentStatus = "pending" | "paid" | "failed";

export interface Booking {
  id: string;
  bookingCode: string;
  unitId: string;
  unitCode: string;
  unitName: string;
  fishermanId: string;
  fishermanName: string;
  fishermanPhone: string;
  fishSpeciesId: string;
  fishSpeciesName: string;
  weightKg: number;
  startDate: string;
  endDate: string;
  durationDays: number;
  status: BookingStatus;
  totalPrice: number;
  paymentStatus: PaymentStatus;
  paymentMethod: "qris" | "bank_transfer" | "ewallet";
  notes?: string;
  createdAt: string;
}

export interface FishBatch {
  id: string;
  batchCode: string;
  bookingId: string;
  fishermanName: string;
  fishSpeciesName: string;
  fishSpeciesId: string;
  weightKg: number;
  qrCodeUrl: string;
  tempHistory: number[];
  freshnessScore: number; // 0-100
  entryDate: string;
  exitDate?: string;
  unitId: string;
  unitCode: string;
  unitName: string;
  locationName: string;
  operatorName: string;
  bumdesName: string;
  pricePerKg: number;
  isAvailableInMarket: boolean;
  notes: string;
}

export type OrderStatus = "pending" | "confirmed" | "shipping" | "delivered";

export interface Order {
  id: string;
  orderCode: string;
  batchId: string;
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  fishSpeciesName: string;
  quantityKg: number;
  pricePerKg: number;
  totalPrice: number;
  status: OrderStatus;
  deliveryAddress: string;
  bumdesName: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId?: string;
  orderId?: string;
  amount: number;
  method: "qris" | "bank_transfer" | "ewallet";
  status: "paid" | "pending" | "failed";
  xenditRef: string;
  paidAt?: string;
  createdAt: string;
  description: string;
  payerName: string;
}

export interface LeaseContract {
  id: string;
  unitId: string;
  unitCode: string;
  unitName: string;
  operatorId: string;
  operatorName: string;
  bumdesName: string;
  unitPriceRp: number;
  dpPaidRp: number;
  monthlyInstallmentRp: number;
  totalMonths: number;
  remainingMonths: number;
  progressPct: number;
}

export interface ImpactRecord {
  id: string;
  unitId: string;
  unitCode: string;
  locationName: string;
  periodStart: string;
  periodEnd: string;
  kgStored: number;
  kgLossAvoided: number;
  revenueRp: number;
  energyKwh: number;
  co2AvoidedKg: number;
  fishermenServed: number;
}

export interface MaintenanceLog {
  id: string;
  unitId: string;
  unitCode: string;
  reportedBy: string;
  issueType: "compressor" | "solar_bms" | "door_seal" | "sensor_drift" | "scheduled_inspection";
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "in_progress" | "resolved";
  resolvedAt?: string;
  notes: string;
  createdAt: string;
}

export interface Partnership {
  id: string;
  partnerName: string;
  type: "bumdes" | "csr" | "pemda" | "koperasi";
  province: string;
  fundingRp: number;
  targetUnits: number;
  activeUnits: number;
  programName: string;
  contactPerson: string;
}

export interface Notification {
  id: string;
  userId?: string;
  targetRole?: UserRole | "all";
  type: "alert" | "booking" | "payment" | "maintenance" | "system";
  severity?: "info" | "warning" | "critical";
  title: string;
  body: string;
  isRead: boolean;
  unitCode?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface ImpactFormula {
  id: string;
  name: string;
  formulaKey: "food_loss_avoided" | "economic_value" | "co2_avoided" | "renewable_share" | "income_improvement";
  formulaExpression: string;
  unit: string;
  description: string;
  isActive: boolean;
  updatedAt: string;
  updatedBy: string;
}

export interface SDGMetric {
  sdgNumber: number;
  title: string;
  tagline: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  description: string;
  color: string;
}
