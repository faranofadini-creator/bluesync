"use client";

import React from "react";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import { Users, Shield, Phone, Mail, UserCheck } from "lucide-react";

export default function AdminUsersPage() {
  const { users, switchUser } = useBlueSyncStore();

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-bold text-navy">Manajemen Pengguna & Hak Akses (RBAC)</h2>
        <p className="text-xs text-slate-500">
          Kelola otorisasi peran (Role-Based Access Control) bagi nelayan, operator BUMDes, buyer, dan instansi pemerintah.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b bg-slate-50 text-slate-600 font-bold uppercase text-[10px]">
              <th className="p-3">Pengguna</th>
              <th className="p-3">Email</th>
              <th className="p-3">Kontak</th>
              <th className="p-3">Peran (Role)</th>
              <th className="p-3">Organisasi / PPI</th>
              <th className="p-3 text-right">Switch Persona</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="p-3 font-bold text-navy flex items-center gap-2">
                  <img src={u.avatarUrl} alt={u.fullName} className="w-7 h-7 rounded-lg object-cover" />
                  <span>{u.fullName}</span>
                </td>
                <td className="p-3 font-mono text-slate-600">{u.email}</td>
                <td className="p-3 text-slate-600">{u.phone}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                      u.role === "fisherman"
                        ? "bg-teal-100 text-teal-800"
                        : u.role === "operator"
                        ? "bg-ocean/20 text-ocean"
                        : u.role === "buyer"
                        ? "bg-orange/20 text-orange"
                        : u.role === "gov"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="p-3 text-slate-600">{u.operatorOrg || "Pengguna Mandiri"}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => switchUser(u.id)}
                    className="bg-navy hover:bg-navy-800 text-white px-2.5 py-1 rounded text-[11px] font-bold inline-flex items-center gap-1"
                  >
                    <UserCheck className="w-3 h-3 text-teal" />
                    <span>Masuk Akun</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
