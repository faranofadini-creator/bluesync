"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import {
  ShieldCheck,
  ArrowRight,
  UserCheck,
  Lock,
  Mail,
  Radio,
  AlertTriangle,
  Flame,
  RefreshCw,
  Sun,
  BatteryCharging,
  Fish,
  Building2,
  Store,
  Landmark,
  Sliders,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const {
    users,
    currentUser,
    switchUser,
    loginWithCredentials,
    units,
    injectTemperatureAnomaly,
    resetSimulation,
  } = useBlueSyncStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("••••••••");
  const [error, setError] = useState("");

  const bs1 = units.find((u) => u.code === "BS-001") || units[0];

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = loginWithCredentials(email);
    if (user) {
      redirectToRole(user.role);
    } else {
      setError("Email tidak ditemukan dalam sistem simulasi.");
    }
  };

  const handleQuickPersona = (userId: string) => {
    const user = switchUser(userId);
    if (user) {
      redirectToRole(user.role);
    }
  };

  const redirectToRole = (role: string) => {
    switch (role) {
      case "fisherman":
        router.push("/dashboard");
        break;
      case "operator":
        router.push("/operator");
        break;
      case "buyer":
        router.push("/market");
        break;
      case "gov":
        router.push("/gov");
        break;
      case "admin":
        router.push("/admin");
        break;
      default:
        router.push("/dashboard");
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "fisherman":
        return Fish;
      case "operator":
        return Building2;
      case "buyer":
        return Store;
      case "gov":
        return Landmark;
      default:
        return Sliders;
    }
  };

  return (
    <div className="min-h-[90vh] py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#081524] via-[#0a1b2e] to-slate-50 text-slate-900">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white p-1 flex items-center justify-center mx-auto shadow-xl border border-teal/40">
            <img
              src="/bluesync-logo.png"
              alt="Logo BlueSync"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal-light bg-teal/20 px-3 py-0.5 rounded-full border border-teal/30">
              AUTHENTICATION & DEMO COCKPIT HUB
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Pusat Akses & Simulasi Akun BlueSync
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mt-1">
              Pilih peran persona interaktif untuk mencoba demo komprehensif, atau masuk dengan kredensial terdaftar.
            </p>
          </div>
        </div>

        {/* SECTION 1: LIVE IOT TELEMETRY CONTROL COCKPIT */}
        <div className="bg-[#050e1a] rounded-3xl p-5 sm:p-6 border border-teal/40 text-white shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal animate-ping" />
              <span className="text-xs font-mono font-bold text-teal-light">
                LIVE IOT TELEMETRY SANDBOX • UNIT BS-001 (SENDANGBIRU)
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Status Suhu:</span>
              <strong
                className={`px-2 py-0.5 rounded text-xs ${
                  bs1.currentTempC <= -18
                    ? "bg-green-950 text-green-400 border border-green-700"
                    : bs1.currentTempC <= -15
                    ? "bg-amber-950 text-amber-400 border border-amber-700"
                    : "bg-red-950 text-red-400 border border-red-700"
                }`}
              >
                {bs1.currentTempC}°C
              </strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Daya Solar PV:</span>
                <strong className="text-amber-400 text-sm">{bs1.currentSolarKw} kW</strong>
              </div>
              <Sun className="w-5 h-5 text-amber-400/80" />
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Baterai LiFePO4:</span>
                <strong className="text-green-400 text-sm">{bs1.currentBatteryPct}%</strong>
              </div>
              <BatteryCharging className="w-5 h-5 text-green-400/80" />
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Suhu Preset:</span>
                <strong className="text-teal-light text-sm">≤ -18.0°C (Deep Freeze)</strong>
              </div>
              <Radio className="w-5 h-5 text-teal/80 animate-pulse" />
            </div>
          </div>

          {/* Sandbox Controls */}
          <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 font-mono text-[11px]">
              Simulasi Pitching Interaktif (Injeksi Anomali):
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => injectTemperatureAnomaly("BS-001", -14.6)}
                className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Picu Peringatan (-14.6°C)</span>
              </button>

              <button
                onClick={() => injectTemperatureAnomaly("BS-001", -9.2)}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 px-3 py-1 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Picu Kritis (-9.2°C)</span>
              </button>

              <button
                onClick={resetSimulation}
                className="bg-teal hover:bg-teal-dark text-navy font-bold px-3 py-1 rounded-lg text-xs font-mono transition flex items-center gap-1.5 shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Optimal (-18.4°C)</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: 1-CLICK DEMO PERSONA ACCESS (5 STAKEHOLDER ROLES) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-teal">
                PILIH PERAN DEMO
              </span>
              <h2 className="text-lg font-extrabold text-navy">
                1-Click Demo Persona Login
              </h2>
            </div>
            <span className="text-xs font-mono text-teal bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200 font-bold">
              Instant Access
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {users.map((u, idx) => {
              const Icon = getRoleIcon(u.role);
              return (
                <button
                  key={u.id}
                  onClick={() => handleQuickPersona(u.id)}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-teal hover:bg-teal-50/40 transition flex items-center justify-between group text-left"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={u.avatarUrl}
                      alt={u.fullName}
                      className="w-11 h-11 rounded-xl object-cover ring-2 ring-slate-100 group-hover:ring-teal"
                    />
                    <div className="space-y-0.5">
                      <div className="text-xs font-extrabold text-navy group-hover:text-teal flex items-center gap-1.5">
                        <span>{idx + 1}. {u.fullName}</span>
                      </div>
                      <div className="text-[11px] font-semibold text-slate-500 capitalize flex items-center gap-1">
                        <Icon className="w-3 h-3 text-teal" />
                        <span>Peran: {u.role}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {u.role === "fisherman"
                          ? "Booking sewa, cetak voucher QRIS"
                          : u.role === "operator"
                          ? "Manajemen unit PPI, stok & suhu"
                          : u.role === "buyer"
                          ? "Beli ikan terverifikasi Grade A"
                          : u.role === "gov"
                          ? "Pengawasan dampak SDG & food loss"
                          : "Simulasi telemetri & konfigurasi"}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal group-hover:translate-x-1 transition shrink-0 ml-2" />
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: MANUAL PRODUCTION LOGIN FORM */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 max-w-md mx-auto">
          <div className="text-center space-y-1">
            <h3 className="font-extrabold text-navy text-sm">
              Atau Masuk dengan Kredensial Terdaftar
            </h3>
            <p className="text-xs text-slate-500">
              Gunakan email operasional terdaftar untuk masuk ke portal.
            </p>
          </div>

          {error && (
            <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleManualLogin} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-navy mb-1">Alamat Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contoh: nelayan.anto@bluesync.id"
                  className="w-full border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-navy focus:outline-none focus:border-teal"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-navy mb-1">Kata Sandi</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-navy focus:outline-none focus:border-teal"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-navy hover:bg-navy-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition mt-2 shadow-sm"
            >
              <span>Masuk Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-teal hover:underline font-semibold">
              ← Kembali ke Beranda Publik
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
