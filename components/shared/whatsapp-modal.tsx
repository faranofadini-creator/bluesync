"use client";

import React, { useState } from "react";
import { MessageSquare, X, Copy, Check, ExternalLink, Send, CheckCheck, Sparkles, ShieldCheck } from "lucide-react";
import { useBlueSyncStore } from "@/lib/store/bluesync-store";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    bookingCode: string;
    batchCode: string;
    fishermanName: string;
    fishermanPhone?: string;
    unitName: string;
    locationName: string;
    fishSpeciesName: string;
    weightKg: number;
    startDate: string;
    endDate: string;
    totalPrice: number;
  };
}

export default function WhatsAppModal({
  isOpen,
  onClose,
  bookingData,
}: WhatsAppModalProps) {
  const { addNotification } = useBlueSyncStore();
  const [copied, setCopied] = useState(false);
  const [simulatedSent, setSimulatedSent] = useState(false);

  if (!isOpen) return null;

  const recipientPhone = bookingData.fishermanPhone || "0812-3456-7890";
  const rawPhone = recipientPhone.replace(/[^0-9]/g, "");
  const formattedPhone = rawPhone.startsWith("0") ? `62${rawPhone.slice(1)}` : rawPhone;

  const messageText = `🌊 *BLUESYNC — KONFIRMASI BOOKING COLD STORAGE* 🌊
Halo Bpk/Ibu *${bookingData.fishermanName}*, sewa cold storage Anda telah AKTIF!

📋 *Detail Transaksi:*
• No. Booking: *${bookingData.bookingCode}*
• Kode Batch QR: *${bookingData.batchCode}*
• Ikan: *${bookingData.weightKg} kg ${bookingData.fishSpeciesName}*
• Lokasi Unit: *${bookingData.unitName}* (${bookingData.locationName})
• Tanggal: *${bookingData.startDate}* s/d *${bookingData.endDate}*
• Total Bayar: *Rp ${bookingData.totalPrice.toLocaleString("id-ID")}* (LUNAS via QRIS)

🔗 *Tautan Ketertelusuran Mutu Ikan:*
https://bluesync.id/trace/${bookingData.batchCode}

*Petunjuk Masuk:*
Bawa ikan ke unit BUMDes & tunjukkan kode *${bookingData.batchCode}* kepada operator.
Suhu tangkapan Anda dijaga otomatis ≤ -18°C dengan Solar Hybrid BlueSync. Terima kasih! 🎣`;

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateSend = () => {
    setSimulatedSent(true);
    addNotification({
      type: "booking",
      title: `📱 WhatsApp Terkirim ke ${bookingData.fishermanName}`,
      body: `Voucher booking ${bookingData.bookingCode} berhasil dikirim ke nomor ${recipientPhone}.`,
      severity: "info",
    });
    setTimeout(() => {
      setSimulatedSent(false);
    }, 3000);
  };

  const waUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(messageText)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0b141a] text-[#e9edef] rounded-3xl shadow-2xl border border-slate-700 max-w-md w-full overflow-hidden flex flex-col">
        {/* WhatsApp Mobile Top Bar */}
        <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between border-b border-[#2a3942]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00a884] text-white flex items-center justify-center font-bold text-sm shadow">
              BS
            </div>
            <div>
              <div className="font-bold text-sm text-[#e9edef] flex items-center gap-1.5">
                <span>BlueSync Dispatcher</span>
                <span className="w-2 h-2 rounded-full bg-[#00a884] inline-block animate-ping" />
              </div>
              <div className="text-[11px] text-[#8696a0]">
                Ke: {bookingData.fishermanName} ({recipientPhone})
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#2a3942] text-[#8696a0] hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* WhatsApp Chat Body Simulation */}
        <div
          className="p-4 space-y-3 flex-1 bg-[#0b141a] overflow-y-auto"
          style={{
            backgroundImage: `radial-gradient(#1f2c34 1px, transparent 1px)`,
            backgroundSize: `16px 16px`,
          }}
        >
          {/* Security Notice */}
          <div className="text-center">
            <span className="bg-[#182229] text-[#8696a0] text-[10px] px-3 py-1 rounded-lg border border-[#222d34] inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#00a884]" />
              Pesan terenkripsi end-to-end melalui BlueSync IoT Gateway
            </span>
          </div>

          {/* Chat Bubble Sent */}
          <div className="flex justify-end">
            <div className="bg-[#005c4b] text-[#e9edef] p-3.5 rounded-2xl rounded-tr-none shadow-md max-w-[90%] space-y-2 text-xs relative">
              <p className="whitespace-pre-line leading-relaxed font-sans">
                {messageText}
              </p>
              <div className="flex items-center justify-end gap-1 text-[10px] text-[#8696a0] pt-1">
                <span>{new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</span>
                <CheckCheck className="w-4 h-4 text-[#53bdeb]" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="bg-[#202c33] p-4 border-t border-[#2a3942] space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopy}
              className="bg-[#2a3942] hover:bg-[#374248] text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              {copied ? <Check className="w-4 h-4 text-[#00a884]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Tersalin!" : "Salin Pesan"}</span>
            </button>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#00a884] hover:bg-[#008f6f] text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Buka di WhatsApp</span>
            </a>
          </div>

          <button
            onClick={handleSimulateSend}
            disabled={simulatedSent}
            className="w-full bg-navy-700 hover:bg-navy-600 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 border border-teal/40 shadow-sm transition"
          >
            {simulatedSent ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-300">Notifikasi Berhasil Terkirim ke Nelayan!</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-teal-light" />
                <span>Simulasi Kirim Notifikasi WhatsApp</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
