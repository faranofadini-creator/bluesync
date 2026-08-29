"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { Anchor, ShieldCheck, ArrowRight, UserCheck, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { users, currentUser, switchUser, loginWithCredentials } = useBlueSyncStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("••••••••");
  const [error, setError] = useState("");

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

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal to-ocean flex items-center justify-center mx-auto shadow-lg">
            <Anchor className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-navy">Masuk ke BlueSync</h2>
          <p className="text-xs text-slate-500">
            Sistem Autentikasi & Role-Based Access Control (RBAC) v2.0
          </p>
        </div>

        {/* 1-Click Demo Persona Switcher (PRD Feature) */}
        <div className="bg-white p-5 rounded-2xl border-2 border-teal/40 shadow-md space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-navy flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-teal" />
              1-Click Demo Persona Login:
            </span>
            <span className="text-[10px] font-mono bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-bold">
              Pitching Ready
            </span>
          </div>

          <div className="space-y-2">
            {users.map((u, idx) => (
              <button
                key={u.id}
                onClick={() => handleQuickPersona(u.id)}
                className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-teal hover:bg-teal-50/50 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={u.avatarUrl}
                    alt={u.fullName}
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <div className="text-xs font-bold text-navy group-hover:text-teal flex items-center gap-1.5">
                      <span>{idx + 1}. {u.fullName}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 capitalize">{u.role} • {u.email}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal group-hover:translate-x-1 transition" />
              </button>
            ))}
          </div>
        </div>

        {/* Manual Login Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Atau Masuk dengan Email
          </span>

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
                  className="w-full border rounded-xl pl-9 pr-3 py-2.5 text-xs text-navy focus:outline-none focus:border-teal"
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
                  className="w-full border rounded-xl pl-9 pr-3 py-2.5 text-xs text-navy focus:outline-none focus:border-teal"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-navy hover:bg-navy-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition mt-2"
            >
              <span>Masuk Sistem</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
