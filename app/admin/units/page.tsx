"use client";

import React, { useState } from "react";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { formatRupiah } from "@/lib/utils";
import { Server, Plus, Edit2, MapPin, Sun, Battery, DollarSign, CheckCircle2 } from "lucide-react";

export default function AdminUnitsPage() {
  const { units, addUnit } = useBlueSyncStore();
  const [showModal, setShowModal] = useState(false);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("Jawa Timur");
  const [capacityKg, setCapacityKg] = useState(1000);
  const [solarCapacityKw, setSolarCapacityKw] = useState(8.4);
  const [batteryCapacityKwh, setBatteryCapacityKwh] = useState(24);
  const [pricePerKgPerDay, setPricePerKgPerDay] = useState(3500);

  const handleCreateUnit = (e: React.FormEvent) => {
    e.preventDefault();
    addUnit({
      code,
      name,
      locationId: `loc-${Date.now()}`,
      locationName,
      district,
      province,
      capacityKg,
      operatorId: "user-operator-budi",
      operatorName: "Pengelola BUMDes Desa",
      installedAt: new Date().toISOString().slice(0, 10),
      solarCapacityKw,
      batteryCapacityKwh,
      pricePerKgPerDay,
      minWeightKg: 5,
    });
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-navy">Manajemen Armada Unit Cold Storage (CRUD)</h2>
          <p className="text-xs text-slate-500">
            Daftar unit fisik micro cold storage solar-hybrid yang terhubung dalam sistem BlueSync.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-navy hover:bg-navy-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 transition shadow-sm"
        >
          <Plus className="w-4 h-4 text-teal" />
          <span>Tambah Unit Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {units.map((u) => (
          <div key={u.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono font-bold bg-navy text-white px-2 py-0.5 rounded">
                {u.code}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  u.status === "optimal"
                    ? "bg-green-100 text-green-800"
                    : u.status === "warning"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {u.status}
              </span>
            </div>

            <h3 className="font-bold text-navy text-base">{u.name}</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-ocean" />
              <span>{u.locationName}, {u.province}</span>
            </p>

            <div className="pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 text-[10px]">Kapasitas:</span>
                <div className="font-mono font-bold text-navy">{u.currentLoadKg} / {u.capacityKg} kg</div>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Tarif Harian:</span>
                <div className="font-mono font-bold text-teal">{formatRupiah(u.pricePerKgPerDay)}/kg</div>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">PLTS Surya:</span>
                <div className="font-mono font-bold text-amber-600">{u.solarCapacityKw} kWp</div>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Baterai LiFePO4:</span>
                <div className="font-mono font-bold text-navy">{u.batteryCapacityKwh} kWh</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-navy">Tambah Unit Cold Storage Baru</h3>
            <form onSubmit={handleCreateUnit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-navy mb-1">Kode Unit (e.g. BS-006)</label>
                <input required type="text" placeholder="BS-006" value={code} onChange={(e) => setCode(e.target.value)} className="w-full border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="block font-bold text-navy mb-1">Nama Unit & Pengelola</label>
                <input required type="text" placeholder="BlueSync BL-006 (Mina Bahari)" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2.5 rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-navy mb-1">Desa / PPI</label>
                  <input required type="text" placeholder="Desa Kusamba" value={locationName} onChange={(e) => setLocationName(e.target.value)} className="w-full border p-2.5 rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-navy mb-1">Provinsi</label>
                  <input required type="text" placeholder="Bali" value={province} onChange={(e) => setProvince(e.target.value)} className="w-full border p-2.5 rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-navy mb-1">Kapasitas (kg)</label>
                  <input required type="number" value={capacityKg} onChange={(e) => setCapacityKg(Number(e.target.value))} className="w-full border p-2.5 rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-navy mb-1">Tarif (Rp/kg/hari)</label>
                  <input required type="number" value={pricePerKgPerDay} onChange={(e) => setPricePerKgPerDay(Number(e.target.value))} className="w-full border p-2.5 rounded-xl" />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-bold">Batal</button>
                <button type="submit" className="flex-1 bg-teal text-white py-2.5 rounded-xl font-bold">Simpan Unit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
