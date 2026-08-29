"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-xs font-mono font-bold text-teal uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Kontak & Dukungan 24/7
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          Hubungi Tim Operasional BlueSync
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Kami siap membantu operasional cold storage, instalasi solar PV, maupun pertanyaan teknis platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <Phone className="w-6 h-6 text-teal" />
          <h4 className="font-bold text-navy text-sm">Hotline Darurat IoT</h4>
          <p className="text-xs text-slate-500">Dukungan teknisi pendingin 24/7 di seluruh site pesisir.</p>
          <div className="text-xs font-bold font-mono text-navy">0800-1-BLUESYNC</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <Mail className="w-6 h-6 text-ocean" />
          <h4 className="font-bold text-navy text-sm">Email Resmi</h4>
          <p className="text-xs text-slate-500">Pertanyaan kemitraan CSR & pengadaan unit.</p>
          <div className="text-xs font-bold font-mono text-navy">halo@bluesync.id</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <MapPin className="w-6 h-6 text-orange" />
          <h4 className="font-bold text-navy text-sm">Kantor Pusat</h4>
          <p className="text-xs text-slate-500">Jakarta Maritime Innovation Hub, Penjaringan, Jakarta Utara.</p>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg">
        <h3 className="font-bold text-navy text-base mb-4">Kirim Pesan Langsung</h3>
        {submitted ? (
          <div className="p-6 bg-teal-50 text-teal-900 rounded-2xl border border-teal-200 text-center">
            <CheckCircle2 className="w-8 h-8 text-teal mx-auto mb-2" />
            <h4 className="font-bold text-sm">Pesan Anda Telah Diterima</h4>
            <p className="text-xs text-teal-800">Tim kami akan membalas via email/WhatsApp dalam hitungan jam.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4 text-xs"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-navy mb-1">Nama Lengkap</label>
                <input required type="text" placeholder="Nama Anda" className="w-full border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="block font-bold text-navy mb-1">Email / WhatsApp</label>
                <input required type="text" placeholder="email@domain.com" className="w-full border p-2.5 rounded-xl" />
              </div>
            </div>
            <div>
              <label className="block font-bold text-navy mb-1">Pesan / Kebutuhan</label>
              <textarea required rows={4} placeholder="Tuliskan pertanyaan atau kebutuhan Anda..." className="w-full border p-2.5 rounded-xl" />
            </div>
            <button
              type="submit"
              className="bg-navy hover:bg-navy-800 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-2 transition"
            >
              <Send className="w-4 h-4 text-teal" />
              <span>Kirim Pesan</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}