"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import {
  Anchor,
  Bell,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Shield,
  LayoutDashboard,
  Store,
  Compass,
  FileText,
  Activity,
  CheckCircle2,
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
    { href: "/solution", label: "Solusi" },
    { href: "/technology", label: "Teknologi" },
    { href: "/how-it-works", label: "Cara Kerja" },
    { href: "/impact", label: "Dampak & SDGs" },
    { href: "/business", label: "Model Bisnis" },
    { href: "/partners", label: "Kemitraan" },
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
        return "Operator BUMDes";
      case "buyer":
        return "Buyer Ikan";
      case "gov":
        return "Pemerintah / CSR";
      case "admin":
        return "Admin Global";
    }
  };

  const getRoleColor = () => {
    switch (currentUser.role) {
      case "fisherman":
        return "bg-teal text-white";
      case "operator":
        return "bg-ocean text-white";
      case "buyer":
        return "bg-orange text-white";
      case "gov":
        return "bg-green text-white";
      case "admin":
        return "bg-purple-700 text-white";
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-navy text-white shadow-md border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal to-ocean flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Anchor className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
                  BlueSync<span className="text-teal text-2xl leading-none">.</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-300 -mt-1 font-semibold">
                  Smart Cold Chain
                </span>
              </div>
            </Link>

            <span className="hidden lg:inline-flex items-center gap-1 ml-2 bg-navy-800 border border-teal/40 text-teal-light px-2 py-0.5 rounded-full text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              v2.0 Solar-Hybrid
            </span>
          </div>

          {/* Desktop Public Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  pathname === link.href
                    ? "bg-navy-800 text-teal-light font-bold"
                    : "text-slate-300 hover:text-white hover:bg-navy-800/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions: Quick Dashboard, Notifications, Persona Switcher */}
          <div className="flex items-center gap-2.5">
            {/* Quick Link to Current Role Dashboard */}
            <Link
              href={getDashboardHref()}
              className="hidden sm:flex items-center gap-1.5 bg-teal hover:bg-teal-dark text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Portal {getRoleLabel()}</span>
            </Link>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800 transition"
                aria-label="Notifikasi"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red rounded-full text-[10px] font-black flex items-center justify-center text-white ring-2 ring-navy animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Drawer Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in">
                  <div className="bg-navy text-white px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-teal" />
                      <span className="font-bold text-xs">Pusat Notifikasi & Smart Alert</span>
                    </div>
                    {notifications.length > 0 && (
                      <button
                        onClick={clearNotifications}
                        className="text-[10px] text-slate-300 hover:text-white underline"
                      >
                        Bersihkan
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 text-xs">
                        Tidak ada notifikasi baru
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationRead(notif.id)}
                          className={`p-3 text-xs transition cursor-pointer hover:bg-slate-50 ${
                            !notif.isRead ? "bg-teal-50/50" : ""
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span
                              className={`font-bold ${
                                notif.severity === "critical"
                                  ? "text-red"
                                  : notif.severity === "warning"
                                  ? "text-yellow-700"
                                  : "text-navy"
                              }`}
                            >
                              {notif.title}
                            </span>
                            {!notif.isRead && (
                              <span className="w-2 h-2 rounded-full bg-teal shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
                            {notif.body}
                          </p>
                          <div className="text-[9px] text-slate-400 mt-1 font-mono">
                            {new Date(notif.createdAt).toLocaleTimeString("id-ID", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
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
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-navy-800 transition border border-navy-700"
              >
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.fullName}
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-teal"
                />
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-xs font-bold text-white truncate max-w-[120px]">
                    {currentUser.fullName}
                  </span>
                  <span className="text-[10px] text-slate-300 capitalize font-medium">
                    {getRoleLabel()}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <div className="text-xs font-bold text-navy">{currentUser.fullName}</div>
                    <div className="text-[11px] text-slate-500">{currentUser.email}</div>
                    <div className={`mt-1.5 inline-block px-2 py-0.5 rounded text-[10px] font-bold ${getRoleColor()}`}>
                      {getRoleLabel()}
                    </div>
                  </div>

                  <div className="px-2 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Ganti Persona Cepat
                  </div>

                  <button
                    onClick={() => {
                      switchUser("user-nelayan-anto");
                      setUserMenuOpen(false);
                      router.push("/dashboard");
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-100 flex items-center justify-between text-slate-700"
                  >
                    <span>1. Nelayan Anto (Muara Baru)</span>
                    {currentUser.role === "fisherman" && <CheckCircle2 className="w-4 h-4 text-teal" />}
                  </button>

                  <button
                    onClick={() => {
                      switchUser("user-operator-budi");
                      setUserMenuOpen(false);
                      router.push("/operator");
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-100 flex items-center justify-between text-slate-700"
                  >
                    <span>2. Operator Budi (BUMDes)</span>
                    {currentUser.role === "operator" && <CheckCircle2 className="w-4 h-4 text-ocean" />}
                  </button>

                  <button
                    onClick={() => {
                      switchUser("user-buyer-citra");
                      setUserMenuOpen(false);
                      router.push("/market");
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-100 flex items-center justify-between text-slate-700"
                  >
                    <span>3. Buyer PT Laut Nusantara</span>
                    {currentUser.role === "buyer" && <CheckCircle2 className="w-4 h-4 text-orange" />}
                  </button>

                  <button
                    onClick={() => {
                      switchUser("user-gov-hendra");
                      setUserMenuOpen(false);
                      router.push("/gov");
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-100 flex items-center justify-between text-slate-700"
                  >
                    <span>4. Pemerintah KKP / CSR</span>
                    {currentUser.role === "gov" && <CheckCircle2 className="w-4 h-4 text-green" />}
                  </button>

                  <button
                    onClick={() => {
                      switchUser("user-admin-global");
                      setUserMenuOpen(false);
                      router.push("/admin");
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-100 flex items-center justify-between text-slate-700"
                  >
                    <span>5. Admin Master Global</span>
                    {currentUser.role === "admin" && <CheckCircle2 className="w-4 h-4 text-purple-700" />}
                  </button>

                  <div className="border-t border-slate-100 mt-2 pt-1 px-2">
                    <Link
                      href="/login"
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Halaman Login / Ganti Akun</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-900 border-t border-navy-800 px-4 pt-2 pb-4 space-y-1">
          <Link
            href={getDashboardHref()}
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full bg-teal text-white text-center py-2 rounded-lg font-bold text-xs mb-2"
          >
            Masuk Portal {getRoleLabel()}
          </Link>
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-xs font-medium ${
                pathname === link.href ? "bg-navy-800 text-teal-light font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-navy-800 flex justify-between text-[11px] text-slate-400">
            <span>Aktif: {currentUser.fullName}</span>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-teal">
              Ganti Akun
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
