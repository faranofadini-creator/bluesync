import React from "react";
import Link from "next/link";
import { Anchor, ShieldCheck, Sun, Zap, Fish, Globe2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white border-t border-navy-800 pt-12 pb-16 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg border border-teal/40">
                <img
                  src="/bluesync-logo.png"
                  alt="Logo BlueSync"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                BLUESYNC<span className="text-teal">.</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Inovasi Micro Cold Storage Tenaga Surya oleh Tim <strong>Universitas Airlangga</strong> untuk Ajang <em>UNISBA National Business Competition (Energy & Green Technology)</em>.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-teal-light font-mono font-semibold">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>100% Energi Surya Bersih (Clean-Tech)</span>
            </div>
          </div>

          {/* Col 2: Solutions & Technology */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">
              Solusi & Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/solution" className="hover:text-teal transition">
                  Micro Cold Storage Solar-Hybrid
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-teal transition">
                  Telemetri Sensor IoT & BMS
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-teal transition">
                  Alur Booking & Pay-Per-Use
                </Link>
              </li>
              <li>
                <Link href="/market" className="hover:text-teal transition">
                  Marketplace Ikan Terverifikasi
                </Link>
              </li>
              <li>
                <Link href="/trace/BATCH-MUARABARU-TUNA-001" className="hover:text-teal transition">
                  Lacak Mutu QR Traceability
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Impact & SDGs */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">
              Dampak & SDGs
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/gov/sdg" className="hover:text-teal transition">
                  SDG 1: Peningkatan Pendapatan Nelayan
                </Link>
              </li>
              <li>
                <Link href="/gov/sdg" className="hover:text-teal transition">
                  SDG 2: Reduksi Food Loss Pesisir
                </Link>
              </li>
              <li>
                <Link href="/gov/sdg" className="hover:text-teal transition">
                  SDG 8: Pendapatan Baru Koperasi Desa
                </Link>
              </li>
              <li>
                <Link href="/gov/sdg" className="hover:text-teal transition">
                  SDG 13 & 14: Emisi Karbon & Hasil Laut
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-teal transition">
                  Laporan Dampak Nasional
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Kemitraan & Kontak */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">
              Kemitraan & Dukungan
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/partners" className="hover:text-teal transition">
                  Program BUMDes & Hibah CSR
                </Link>
              </li>
              <li>
                <Link href="/business" className="hover:text-teal transition">
                  Model CSaaS & Lease-to-Own
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal transition">
                  Hubungi Tim BlueSync
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-teal transition">
                  Login Portals & Demo Pitch
                </Link>
              </li>
            </ul>
            <div className="mt-4 p-2.5 bg-navy-800/80 rounded-xl border border-navy-700 text-[11px] text-slate-300">
              <span className="text-white font-bold block">Hotline Operasional 24/7</span>
              <span>📞 0800-1-BLUESYNC (Bebas Pulsa)</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-navy-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-400">
          <div>
            © 2025–2026 BlueSync Indonesia. All rights reserved. PRD v2.0 Technical Edition.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal" /> WCAG 2.1 AA Compliant
            </span>
            <span>•</span>
            <span>Kementerian Kelautan & Perikanan RI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
