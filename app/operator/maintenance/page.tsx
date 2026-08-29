"use client";

import React, { useState } from "react";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { SlidersHorizontal, Plus, CheckCircle2, AlertTriangle, ShieldCheck, Wrench } from "lucide-react";

export default function OperatorMaintenancePage() {
  const { maintenanceLogs, addMaintenanceLog, units, currentUser } = useBlueSyncStore();
  const [showModal, setShowModal] = useState(false);
  const [issueType, setIssueType] = useState<any>("compressor");
  const [severity, setSeverity] = useState<any>("medium");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMaintenanceLog({
      unitId: "unit-01",
      unitCode: "BS-001",
      reportedBy: currentUser.fullName,
      issueType,
      severity,
      status: "open",
      notes,
    });
    setNotes("");
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-navy">Log Pemeliharaan & Tiket Servis Unit</h2>
          <p className="text-xs text-slate-500">
            Riwayat servis preventif, pemeriksaan refrigeran, dan perawatan panel surya.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-navy hover:bg-navy-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4 text-teal" />
          <span>Laporkan Masuk Servis</span>
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {maintenanceLogs.map((log) => (
          <div key={log.id} className="py-4 flex items-start justify-between gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-navy">{log.unitCode}</span>
                <span className="font-bold text-slate-700 capitalize">
                  {log.issueType.replace("_", " ")}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.2 rounded uppercase ${
                    log.severity === "critical"
                      ? "bg-red-100 text-red-800"
                      : log.severity === "medium"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {log.severity}
                </span>
              </div>
              <p className="text-slate-600">{log.notes}</p>
              <div className="text-[10px] text-slate-400">
                Dilaporkan oleh: {log.reportedBy} • {new Date(log.createdAt).toLocaleDateString("id-ID")}
              </div>
            </div>

            <span
              className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase shrink-0 ${
                log.status === "resolved"
                  ? "bg-green-100 text-green-800"
                  : log.status === "in_progress"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {log.status.replace("_", " ")}
            </span>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-navy">Laporkan Tiket Pemeliharaan</h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-navy mb-1">Komponen yang Bermasalah</label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full border rounded-xl p-2.5"
                >
                  <option value="compressor">Kompresor & Refrigeran</option>
                  <option value="solar_bms">Panel Surya & Baterai BMS</option>
                  <option value="door_seal">Karet Seal Pintu</option>
                  <option value="sensor_drift">Kalibrasi Sensor Suhu</option>
                  <option value="scheduled_inspection">Inspeksi Rutin Bulanan</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-navy mb-1">Tingkat Urgensi (Severity)</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full border rounded-xl p-2.5"
                >
                  <option value="low">Low (Preventif)</option>
                  <option value="medium">Medium (Fluktuasi Kecil)</option>
                  <option value="critical">Critical (Macet / Suhu Naik Cepat)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-navy mb-1">Catatan Diagnosa</label>
                <textarea
                  required
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Jelaskan kondisi unit secara rinci..."
                  className="w-full border rounded-xl p-2.5"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-navy text-white py-2.5 rounded-xl font-bold"
                >
                  Kirim Tiket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
