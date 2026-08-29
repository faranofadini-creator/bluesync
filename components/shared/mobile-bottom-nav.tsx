"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  CreditCard,
  SlidersHorizontal,
  Activity,
  ClipboardList,
  DollarSign,
  Users,
  Store,
} from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { currentUser } = useBlueSyncStore();

  // Show only on mobile for fisherman or operator
  if (currentUser.role !== "fisherman" && currentUser.role !== "operator") {
    return null;
  }

  // 5 items max for Fisherman
  const fishermanItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/booking", label: "Booking", icon: PlusCircle },
    { href: "/dashboard/inventory", label: "Ikan Saya", icon: Package },
    { href: "/dashboard/payments", label: "Tagihan", icon: CreditCard },
    { href: "/market", label: "Pasar", icon: Store },
  ];

  // 5 items max for Operator
  const operatorItems = [
    { href: "/operator", label: "Overview", icon: LayoutDashboard },
    { href: "/operator/units/unit-01", label: "Sensor", icon: Activity },
    { href: "/operator/bookings", label: "Booking", icon: ClipboardList },
    { href: "/operator/revenue", label: "Revenue", icon: DollarSign },
    { href: "/operator/maintenance", label: "Log Unit", icon: SlidersHorizontal },
  ];

  const navItems = currentUser.role === "fisherman" ? fishermanItems : operatorItems;

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-900 border-t border-navy-800 text-white shadow-2xl px-2 py-1 flex justify-around items-center h-16"
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] rounded-xl transition ${
              isActive ? "text-teal bg-navy-800/80 font-bold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-teal scale-110" : ""}`} />
            <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
