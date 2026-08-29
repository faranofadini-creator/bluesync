"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { Unit, FishSpecies } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";
import {
  Search,
  MapPin,
  Calendar,
  Weight,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  QrCode,
  CreditCard,
  Wallet,
  ShieldCheck,
  Zap,
  Info,
  Clock,
  Sparkles,
  Download,
} from "lucide-react";

export default function BookingWizard() {
  const router = useRouter();
  const { units, species, currentUser, createBooking } = useBlueSyncStore();

  // Wizard Step (1 to 7)
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [selectedUnitId, setSelectedUnitId] = useState<string>(units[0]?.id || "");
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>(species[0]?.id || "");
  const [weightKg, setWeightKg] = useState<number>(50);
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [durationDays, setDurationDays] = useState<number>(3);
  const [paymentMethod, setPaymentMethod] = useState<"qris" | "bank_transfer" | "ewallet">("qris");
  const [notes, setNotes] = useState<string>("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [createdResult, setCreatedResult] = useState<any | null>(null);

  const selectedUnit = units.find((u) => u.id === selectedUnitId) || units[0];
  const selectedSpecies = species.find((s) => s.id === selectedSpeciesId) || species[0];

  const remainingCapacity = Math.max(0, selectedUnit.capacityKg - selectedUnit.currentLoadKg);
  const totalPrice = weightKg * durationDays * selectedUnit.pricePerKgPerDay;

  // Calculate End Date
  const calculateEndDate = () => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + durationDays);
    return d.toISOString().slice(0, 10);
  };

  const handleNextStep = () => {
    if (currentStep === 6) {
      // Simulate Payment Processing
      setIsProcessingPayment(true);
      setTimeout(() => {
        const res = createBooking({
          unitId: selectedUnit.id,
          fishSpeciesId: selectedSpecies.id,
          weightKg,
          startDate,
          endDate: calculateEndDate(),
          durationDays,
          paymentMethod,
          notes,
        });
        setCreatedResult(res);
        setIsProcessingPayment(false);
        setCurrentStep(7);
      }, 1200);
    } else {
      setCurrentStep((prev) => Math.min(7, prev + 1));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Stepper Progress Bar */}
      <div className="bg-navy text-white px-6 py-4 border-b border-navy-800">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-teal font-semibold">
              Alur Pemesanan Cold Storage (Pay-Per-Use)
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Langkah {currentStep} dari 7:{" "}
              {currentStep === 1 && "Pilih Unit Cold Storage Terdekat"}
              {currentStep === 2 && "Pilih Spesies Ikan Hasil Tangkapan"}
              {currentStep === 3 && "Input Bobot Tangkapan (Kg)"}
              {currentStep === 4 && "Tentukan Durasi Penyimpanan"}
              {currentStep === 5 && "Review Kalkulasi Tarif & Layanan"}
              {currentStep === 6 && "Metode Pembayaran Digital (Xendit/QRIS)"}
              {currentStep === 7 && "Konfirmasi & Voucher Masuk Ikan"}
            </h2>
          </div>
          <span className="hidden sm:inline-block bg-teal/20 text-teal-light font-mono font-bold text-xs px-3 py-1 rounded-full border border-teal/40">
            Nelayan: {currentUser.fullName}
          </span>
        </div>

        {/* 7 Progress Dots / Bar */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div
                className={`w-full h-2 rounded-full transition-all ${
                  s < currentStep
                    ? "bg-teal"
                    : s === currentStep
                    ? "bg-amber-400 animate-pulse"
                    : "bg-navy-800"
                }`}
              />
              <span className="text-[9px] mt-1 text-slate-300 font-mono hidden md:inline">
                {s === 1 && "Unit"}
                {s === 2 && "Ikan"}
                {s === 3 && "Bobot"}
                {s === 4 && "Durasi"}
                {s === 5 && "Review"}
                {s === 6 && "Bayar"}
                {s === 7 && "Selesai"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Contents */}
      <div className="p-6">
        {/* STEP 1: Find Unit */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Pilih lokasi micro cold storage bertenaga surya terdekat dari pangkalan pendaratan ikan (PPI) Anda:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {units.map((u) => {
                const isSelected = u.id === selectedUnitId;
                const freeCap = u.capacityKg - u.currentLoadKg;
                return (
                  <div
                    key={u.id}
                    onClick={() => setSelectedUnitId(u.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition relative ${
                      isSelected
                        ? "border-teal bg-teal-50/40 shadow-md ring-2 ring-teal/20"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-3 right-3 bg-teal text-white p-1 rounded-full">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    )}
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-navy">
                      <MapPin className="w-4 h-4 text-ocean" />
                      <span>{u.code} • {u.locationName}</span>
                    </div>
                    <h3 className="font-bold text-navy text-sm mt-1">{u.name}</h3>
                    <p className="text-xs text-slate-500">{u.district}, {u.province}</p>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400 text-[11px]">Sisa Kapasitas:</span>
                        <div className="font-mono font-bold text-navy">{freeCap} kg</div>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 text-[11px]">Tarif Harian:</span>
                        <div className="font-mono font-bold text-teal">{formatRupiah(u.pricePerKgPerDay)}/kg/hari</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Select Fish Type */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Pilih komoditas ikan untuk menentukan setelan temperatur dan batas aman daya simpan mutu:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {species.map((sp) => {
                const isSelected = sp.id === selectedSpeciesId;
                return (
                  <div
                    key={sp.id}
                    onClick={() => setSelectedSpeciesId(sp.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition text-center ${
                      isSelected
                        ? "border-teal bg-teal-50/50 shadow-md ring-2 ring-teal/20"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="text-4xl mb-2">{sp.icon}</div>
                    <h4 className="font-bold text-navy text-sm">{sp.name}</h4>
                    <div className="text-[11px] text-slate-500">{sp.localName}</div>
                    <div className="mt-2 text-[10px] bg-slate-100 py-1 px-2 rounded-lg text-slate-600 font-mono">
                      Suhu: {sp.recommendedTempC}°C | Max {sp.maxStorageDays} Hari
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Input Weight */}
        {currentStep === 3 && (
          <div className="max-w-md mx-auto space-y-6 py-4">
            <div className="text-center">
              <span className="text-xs text-slate-500 font-medium">Berapa kilogram ikan yang ingin disimpan?</span>
              <div className="mt-4 flex items-center justify-center gap-3">
                <input
                  type="number"
                  min={1}
                  max={remainingCapacity}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Math.max(1, Math.min(remainingCapacity, Number(e.target.value) || 1)))}
                  className="w-36 text-center text-4xl font-extrabold font-mono text-navy border-2 border-slate-300 rounded-2xl p-3 focus:outline-none focus:border-teal"
                />
                <span className="text-2xl font-bold text-slate-500">KG</span>
              </div>
            </div>

            {/* Quick Weight Selector Buttons */}
            <div className="flex justify-center gap-2">
              {[20, 50, 100, 200, 300].map((w) => (
                <button
                  key={w}
                  onClick={() => setWeightKg(Math.min(remainingCapacity, w))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition ${
                    weightKg === w ? "bg-teal text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {w} kg
                </button>
              ))}
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-500">
                <span>Unit Dipilih:</span>
                <span className="font-bold text-navy">{selectedUnit.name}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Kapasitas Tersedia:</span>
                <span className="font-mono font-bold text-green">{remainingCapacity} kg</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Select Duration */}
        {currentStep === 4 && (
          <div className="max-w-md mx-auto space-y-5 py-4">
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                Tanggal Masuk Penyimpanan
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border-2 border-slate-300 rounded-xl p-2.5 text-xs font-medium text-navy focus:outline-none focus:border-teal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                Durasi Penyimpanan (Hari)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={1}
                  max={selectedSpecies.maxStorageDays}
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full accent-teal h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <span className="text-xl font-bold font-mono text-navy min-w-[60px] text-right">
                  {durationDays} Hari
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Batas rekomendasi kesegaran mutu {selectedSpecies.name} adalah {selectedSpecies.maxStorageDays} hari.
              </p>
            </div>

            <div className="bg-teal-50 p-4 rounded-xl border border-teal-200 text-xs space-y-1 text-teal-900">
              <div className="flex justify-between">
                <span>Tanggal Selesai / Pengambilan:</span>
                <span className="font-bold font-mono">{calculateEndDate()}</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Review & Price (PRD Section 13 Price Formula) */}
        {currentStep === 5 && (
          <div className="max-w-lg mx-auto space-y-5 py-2">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="font-bold text-navy text-sm border-b border-slate-200 pb-2">
                Rincian Pemesanan & Formula Tarif
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-slate-500">Unit Penyimpanan:</div>
                <div className="font-bold text-navy text-right">{selectedUnit.name}</div>

                <div className="text-slate-500">Komoditas Ikan:</div>
                <div className="font-bold text-navy text-right">{selectedSpecies.name} ({selectedSpecies.icon})</div>

                <div className="text-slate-500">Berat Ikan:</div>
                <div className="font-mono font-bold text-navy text-right">{weightKg} kg</div>

                <div className="text-slate-500">Durasi Penyimpanan:</div>
                <div className="font-mono font-bold text-navy text-right">{durationDays} hari</div>

                <div className="text-slate-500">Tarif Satuan:</div>
                <div className="font-mono text-navy text-right">{formatRupiah(selectedUnit.pricePerKgPerDay)} / kg / hari</div>
              </div>

              <div className="pt-3 border-t border-slate-200 bg-teal-50/70 p-3 rounded-xl">
                <div className="text-[11px] text-teal-800 font-mono mb-1">
                  Formula: {weightKg} kg × {durationDays} hari × {formatRupiah(selectedUnit.pricePerKgPerDay)}
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-navy text-sm">Total Tagihan:</span>
                  <span className="text-2xl font-extrabold font-mono text-teal">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy mb-1">
                Catatan Tambahan (Opsional):
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Tangkapan pancing tonda pagi hari, kualitas grade ekspor..."
                rows={2}
                className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-navy focus:outline-none focus:border-teal"
              />
            </div>
          </div>
        )}

        {/* STEP 6: Payment Method (Xendit/QRIS Mock) */}
        {currentStep === 6 && (
          <div className="max-w-md mx-auto space-y-4 py-2">
            <p className="text-xs text-slate-500">
              Pilih kanal pembayaran instan terintegrasi gateway Xendit untuk aktivasi slot penyimpanan:
            </p>

            <div className="space-y-2.5">
              {/* QRIS */}
              <div
                onClick={() => setPaymentMethod("qris")}
                className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-center justify-between ${
                  paymentMethod === "qris"
                    ? "border-teal bg-teal-50 shadow-sm ring-2 ring-teal/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center text-teal">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-navy">QRIS Dinamis</div>
                    <div className="text-[11px] text-slate-500">Gopay, OVO, ShopeePay, BCA Mobile, Livin</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-teal">Instan</span>
              </div>

              {/* Bank Transfer VA */}
              <div
                onClick={() => setPaymentMethod("bank_transfer")}
                className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-center justify-between ${
                  paymentMethod === "bank_transfer"
                    ? "border-teal bg-teal-50 shadow-sm ring-2 ring-teal/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-ocean/10 flex items-center justify-center text-ocean">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-navy">Virtual Account Bank</div>
                    <div className="text-[11px] text-slate-500">BRI, Mandiri, BNI, BCA Otomatis</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-500">VA 24 Jam</span>
              </div>

              {/* E-Wallet */}
              <div
                onClick={() => setPaymentMethod("ewallet")}
                className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-center justify-between ${
                  paymentMethod === "ewallet"
                    ? "border-teal bg-teal-50 shadow-sm ring-2 ring-teal/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center text-orange">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-navy">Dompet Digital</div>
                    <div className="text-[11px] text-slate-500">DANA / LinkAja / Sakuku</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-orange">Promo</span>
              </div>
            </div>

            {/* Total Display */}
            <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Jumlah yang Harus Dibayar:</span>
                <span className="text-xl font-bold font-mono text-teal-light">{formatRupiah(totalPrice)}</span>
              </div>
              <span className="bg-teal text-white px-2.5 py-1 rounded text-xs font-semibold">
                Simulasi Otomatis Lunas
              </span>
            </div>
          </div>
        )}

        {/* STEP 7: Confirmation & Booking Receipt (AC-01) */}
        {currentStep === 7 && createdResult && (
          <div className="max-w-md mx-auto space-y-5 text-center py-2">
            <div className="w-16 h-16 bg-green-100 text-green rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="bg-teal-100 text-teal-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Booking Berhasil & Status AKTIF
              </span>
              <h3 className="text-xl font-extrabold text-navy mt-2">
                ID Booking: {createdResult.booking.bookingCode}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Bawa ikan hasil tangkapan Anda ke unit cold storage BUMDes untuk penimbangan & penempatan.
              </p>
            </div>

            {/* QR Pass Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-teal/40 text-left space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-navy">Pass Masuk Cold Storage</span>
                <span className="text-[10px] font-mono bg-navy text-white px-2 py-0.5 rounded">
                  {createdResult.batch.batchCode}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-white p-2 border rounded-xl shadow-sm flex items-center justify-center">
                  <QrCode className="w-20 h-20 text-navy" />
                </div>
                <div className="space-y-1 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px]">Nelayan:</span>
                    <div className="font-bold text-navy">{createdResult.booking.fishermanName}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Komoditas:</span>
                    <div className="font-bold text-navy">
                      {createdResult.booking.weightKg} kg {createdResult.booking.fishSpeciesName}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Lokasi:</span>
                    <div className="text-slate-700">{createdResult.booking.unitName}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/trace/${createdResult.batch.batchCode}`)}
                className="flex-1 bg-ocean hover:bg-ocean-dark text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <span>Lihat QR Traceability</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => router.push("/dashboard/inventory")}
                className="flex-1 bg-navy hover:bg-navy-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <span>Daftar Ikan Saya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Stepper Controls */}
      {currentStep < 7 && (
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>

          <button
            onClick={handleNextStep}
            disabled={isProcessingPayment}
            className="bg-teal hover:bg-teal-dark text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50"
          >
            {isProcessingPayment ? (
              <span>Memproses Pembayaran...</span>
            ) : currentStep === 6 ? (
              <>
                <span>Bayar & Konfirmasi</span>
                <CheckCircle2 className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Lanjutkan</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
