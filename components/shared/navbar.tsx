"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import {
  Bell,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, switchUser, notifications, markNotificationRead, clearNotifications } =
    useBlueSyncStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const publicLinks = [
    { href: "/", label: "Beranda" },
    { href: "/#masalah", label: "Tantangan" },
    { href: "/#solusi", label: "Solusi" },
    { href: "/#workflow", label: "Alur Kerja" },
    { href: "/#finansial", label: "Spesifikasi & Bisnis" },
    { href: "/#kemitraan", label: "Kemitraan" },
    { href: "/market", label: "Pasar Ikan" },
  ];

  const getDashboardHref = () => {
    switch (currentUser.role) {
      case "fisherman":
        return "/dashboard";
      case "operator":
        return "/operator";
      case "buyer":
        return "/market";
      case "gov":
        return "/gov";
      case "admin":
        return "/admin";
      default:
        return "/dashboard";
    }
  };

  const getRoleLabel = () => {
    switch (currentUser.role) {
      case "fisherman":
        return "Nelayan";
      case "operator":
        return "Operator";
      case "buyer":
        return "Buyer";
      case "gov":
        return "Pemerintah";
      case "admin":
        return "Admin";
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#081524]/90 backdrop-blur-md text-white border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Brand Logo - Slim & Minimalist */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform bg-white/10 border border-white/20">
                <img
                  src="/bluesync-logo.png"
                  alt="Logo BlueSync"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-white flex items-center">
                  BLUESYNC
                  <span className="w-1.5 h-1.5 rounded-full bg-teal ml-0.5 inline-block" />
                </span>
                <span className="text-[8px] uppercase tracking-widest text-teal-light -mt-1 font-mono font-medium">
                  Solar Cold Chain
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Public Navigation - Slim Pills */}
          <nav className="hidden lg:flex items-center space-x-1">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                  pathname === link.href
                    ? "text-teal-light font-semibold bg-white/5"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions: Slim Role Portal, Notification Bell & User Switcher */}
          <div className="flex items-center gap-2">
            {/* Quick Link to Current Role Dashboard */}
            <Link
              href={getDashboardHref()}
              className="hidden sm:flex items-center gap-1.5 bg-teal/90 hover:bg-teal text-white px-3 py-1 rounded-lg text-xs font-semibold transition shadow-sm"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Portal {getRoleLabel()}</span>
            </Link>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
                aria-label="Notifikasi"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full text-[9px] font-bold flex items-center justify-center text-white ring-2 ring-slate-900 animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Drawer Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in">
                  <div className="bg-[#081524] text-white px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-3.5 h-3.5 text-teal" />
                      <span className="font-bold text-xs">Pusat Notifikasi & Telemetri</span>
                    </div>
                    {notifications.length > 0 && (
                      <button
                        onClick={clearNotifications}
                        className="text-[10px] text-slate-400 hover:text-white underline"
                      >
                        Bersihkan
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-400">
                        Tidak ada notifikasi baru. Sistem beroperasi normal.
                      </div>
                    ) : (
                      notifications.slice(0, 8).map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationRead(notif.id)}
                          className={`p-3.5 hover:bg-slate-50 transition cursor-pointer text-xs space-y-1 ${
                            !notif.isRead ? "bg-teal-50/50" : ""
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span
                              className={`font-semibold ${
                                notif.severity === "critical"
                                  ? "text-red-600"
                                  : notif.severity === "warning"
                                  ? "text-amber-600"
                                  : "text-navy"
                              }`}
                            >
                              {notif.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {new Date(notif.createdAt).toLocaleTimeString("id-ID", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            {notif.body}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Persona Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1.5 p-1 sm:px-2 rounded-lg hover:bg-white/5 transition text-left border border-white/10"
              >
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.fullName}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-teal/40"
                />
                <span className="hidden md:inline text-[11px] font-medium text-slate-200 max-w-[100px] truncate">
                  {currentUser.fullName}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in">
                  <div className="bg-slate-50 p-3 border-b border-slate-100">
                    <div className="font-bold text-xs text-navy">{currentUser.fullName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{currentUser.email}</div>
                  </div>

                  <div className="p-2 space-y-1 text-xs">
                    <span className="px-2 py-1 text-[10px] font-mono text-slate-400 block uppercase">
                      Ganti Akun Demo (1-Klik):
                    </span>
                    {[
                      { id: "user-nelayan-anto", label: "Nelayan Anto", role: "fisherman" },
                      { id: "user-operator-budi", label: "Operator Budi", role: "operator" },
                      { id: "user-buyer-citra", label: "Buyer PT Laut", role: "buyer" },
                      { id: "user-gov-hendra", label: "Pemerintah / CSR", role: "gov" },
                      { id: "user-admin-global", label: "Admin Global", role: "admin" },
                    ].map((user) => (
                      <button
                        key={user.id}
                        onClick={() => {
                          switchUser(user.id);
                          setUserMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center justify-between text-xs ${
                          currentUser.role === user.role
                            ? "bg-teal-50 text-teal font-bold"
                            : "hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        <span>{user.label}</span>
                        {currentUser.role === user.role && <CheckCircle2 className="w-3.5 h-3.5 text-teal" />}
                      </button>
                    ))}
                  </div>

                  <div className="p-2 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        router.push(getDashboardHref());
                      }}
                      className="w-full bg-navy hover:bg-navy-800 text-white font-bold py-1.5 rounded-lg text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      <span>Masuk ke Dashboard</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#081524] border-t border-slate-800 px-4 py-3 space-y-1 animate-in slide-in-from-top-2">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <Link
              href={getDashboardHref()}
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 bg-teal text-white text-center py-2 rounded-lg text-xs font-bold"
            >
              Buka Dashboard ({getRoleLabel()})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
