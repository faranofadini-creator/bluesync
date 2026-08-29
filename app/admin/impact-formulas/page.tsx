"use client";

import React, { useState } from "react";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { evaluateFormula } from "@/lib/impact-engine";
import { Calculator, CheckCircle2, Save, Play, Sparkles, History } from "lucide-react";

export default function ImpactFormulaConfigPage() {
  const { formulas, updateFormula } = useBlueSyncStore();
  const [selectedFormulaId, setSelectedFormulaId] = useState<string>(formulas[0]?.id || "");
  const [editingExpression, setEditingExpression] = useState<string>(formulas[0]?.formulaExpression || "");
  const [testResult, setTestResult] = useState<number | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const currentFormula = formulas.find((f) => f.id === selectedFormulaId) || formulas[0];

  const handleSelectFormula = (formulaId: string) => {
    const f = formulas.find((item) => item.id === formulaId);
    if (f) {
      setSelectedFormulaId(f.id);
      setEditingExpression(f.formulaExpression);
      setTestResult(null);
      setSavedSuccess(false);
    }
  };

  const handleInsertVariable = (varName: string) => {
    setEditingExpression((prev) => `${prev} ${varName}`);
  };

  const handleTestRun = () => {
    const sampleContext = {
      weight_kg: 50,
      loss_rate_without_cold_chain: 0.28,
      loss_rate_with_cold_chain: 0.03,
      avg_price_per_kg_by_species: 75000,
      solar_kwh: 45,
      total_kwh: 60,
      CO2_per_kwh_grid: 0.78,
      CO2_per_kwh_solar: 0.05,
      fisherman_share_pct: 0.65,
    };
    const res = evaluateFormula(editingExpression, sampleContext);
    setTestResult(res);
  };

  const handleSave = () => {
    updateFormula(selectedFormulaId, editingExpression);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const availableVariables = [
    { name: "weight_kg", desc: "Bobot Ikan (kg)" },
    { name: "loss_rate_without_cold_chain", desc: "Tingkat Susut Tanpa Cold Chain (0.28)" },
    { name: "loss_rate_with_cold_chain", desc: "Tingkat Susut Dengan Cold Chain (0.03)" },
    { name: "food_loss_avoided", desc: "Ikan Terselamatkan (kg)" },
    { name: "avg_price_per_kg_by_species", desc: "Harga Pasar Ikan per Kg (Rp)" },
    { name: "economic_value_preserved", desc: "Nilai Ekonomi Terjaga (Rp)" },
    { name: "solar_kwh", desc: "Pembangkitan Daya Surya (kWh)" },
    { name: "total_kwh", desc: "Total Konsumsi Listrik Unit" },
    { name: "CO2_per_kwh_grid", desc: "Faktor Emisi Batubara PLN (0.78 kg/kWh)" },
    { name: "CO2_per_kwh_solar", desc: "Faktor Emisi Surya PV (0.05 kg/kWh)" },
    { name: "fisherman_share_pct", desc: "Proporsi Margin Nelayan (0.65)" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
      {/* PRD Section 17 Header */}
      <div>
        <span className="text-[10px] font-mono font-bold uppercase bg-teal text-white px-2 py-0.5 rounded">
          PRD SECTION 17 • CONFIGURABLE IMPACT ENGINE
        </span>
        <h2 className="text-xl font-bold text-navy mt-1">Konfigurasi Rumus Kalkulasi Dampak Dinamis</h2>
        <p className="text-xs text-slate-500">
          Semua formula dapat dikonfigurasi dinamis oleh Admin tanpa hard-coding dalam codebase aplikasi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Formula List */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Daftar Formula Dampak
          </span>
          {formulas.map((f) => (
            <button
              key={f.id}
              onClick={() => handleSelectFormula(f.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition ${
                f.id === selectedFormulaId
                  ? "bg-navy text-white font-bold border-navy shadow"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
              }`}
            >
              <div className="text-xs font-bold">{f.name}</div>
              <div className={`text-[10px] font-mono mt-0.5 ${f.id === selectedFormulaId ? "text-teal-light" : "text-slate-500"}`}>
                Satuan: {f.unit} • key: {f.formulaKey}
              </div>
            </button>
          ))}
        </div>

        {/* Right Col: Editor & Live Preview */}
        <div className="lg:col-span-8 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-bold text-navy">{currentFormula.name}</h3>
              <p className="text-xs text-slate-500">{currentFormula.description}</p>
            </div>
            <span className="text-xs font-mono font-bold bg-teal-100 text-teal-800 px-2.5 py-1 rounded-lg">
              Output: {currentFormula.unit}
            </span>
          </div>

          {/* Variable Picker Buttons */}
          <div>
            <label className="block text-xs font-bold text-navy mb-1.5">
              Sisipkan Variabel Matematika:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableVariables.map((v) => (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => handleInsertVariable(v.name)}
                  title={v.desc}
                  className="bg-white hover:bg-teal hover:text-white text-navy font-mono text-[11px] px-2.5 py-1 rounded-lg border border-slate-300 transition shadow-2xs"
                >
                  +{v.name}
                </button>
              ))}
            </div>
          </div>

          {/* Formula Expression Input */}
          <div>
            <label className="block text-xs font-bold text-navy mb-1">
              Ekspresi Matematika (Formula Expression):
            </label>
            <textarea
              rows={3}
              value={editingExpression}
              onChange={(e) => setEditingExpression(e.target.value)}
              className="w-full font-mono text-xs p-3 border-2 border-slate-300 rounded-xl bg-white focus:outline-none focus:border-teal text-navy"
            />
          </div>

          {/* Action Buttons: Test Run & Save */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleTestRun}
              className="bg-navy hover:bg-navy-800 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 transition"
            >
              <Play className="w-3.5 h-3.5 text-teal" />
              <span>Uji Coba Formula (Test Run)</span>
            </button>

            <button
              onClick={handleSave}
              className="bg-teal hover:bg-teal-dark text-white font-bold py-2 px-5 rounded-xl text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Perubahan Formula</span>
            </button>

            {savedSuccess && (
              <span className="text-xs font-bold text-green flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Formula berhasil diperbarui!
              </span>
            )}
          </div>

          {/* Test Run Output Box */}
          {testResult !== null && (
            <div className="bg-slate-900 text-white p-4 rounded-xl space-y-1 animate-in fade-in">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Hasil Kalkulasi Sampel (50kg):</span>
              <div className="text-2xl font-extrabold font-mono text-teal-light">
                {testResult.toLocaleString("id-ID")} {currentFormula.unit}
              </div>
            </div>
          )}

          {/* Audit Trail Note */}
          <div className="text-[10px] text-slate-400 pt-2 border-t flex justify-between">
            <span>Terakhir diubah: {new Date(currentFormula.updatedAt).toLocaleString("id-ID")}</span>
            <span>Oleh: {currentFormula.updatedBy}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
