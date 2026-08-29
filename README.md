# 🌊 BlueSync — Smart Cold Chain Ecosystem v2.0

> **Solar-Hybrid Micro Cold Storage Digital Platform for Indonesian Coastal Fishermen**

Platform digital desentralisasi cold chain berbasis energi surya untuk nelayan kecil, pengelola BUMDes, dan pembeli ikan di seluruh pesisir Indonesia.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **IoT Visualization**: Recharts + Custom SVG Temperature Gauge
- **State Management**: Zustand + LocalStorage + BroadcastChannel
- **Sensor Protocol**: MQTT over TLS 8883 → Supabase Edge Functions → WebSocket Realtime

## Roles & Portals

| Portal | Path | Deskripsi |
|--------|------|-----------|
| 🐟 Nelayan | `/dashboard` | Booking cold storage, inventaris batch ikan, pembayaran QRIS |
| 🏭 Operator BUMDes | `/operator` | IoT monitoring unit, manajemen booking, laporan pendapatan |
| 🛒 Buyer | `/market` | Katalog ikan segar terverifikasi cold chain |
| 🏛️ Pemerintah/CSR | `/gov` | Dashboard dampak nasional, matriks SDG |
| ⚙️ Admin | `/admin` | Manajemen armada unit, RBAC, configurable formula engine |
| 🔍 QR Trace | `/trace/[batch_code]` | Sertifikat keterlacakan suhu cold chain publik |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000)

## Key Features

- ✅ **7-Step Booking Wizard** — Nelayan pilih unit, spesies ikan, bayar QRIS, cetak QR Pass
- ✅ **Live SVG Temperature Gauge** — OPTIMAL (-18°C), WARNING (>-15°C), CRITICAL (>-10°C)
- ✅ **Configurable Impact Formula Engine** — Admin ubah formula tanpa hard-code
- ✅ **QR Fish Traceability** — Sertifikasi digital freshness score 0-100
- ✅ **10-Step Pitching Demo Mode** — Floating navigator untuk presentasi kompetisi
- ✅ **Solar Curve & BMS Charts** — Recharts daylight PV kW + LiFePO4 battery level

## Demo Personas (1-Click Login)

| Persona | Role | Akses |
|---------|------|-------|
| Nelayan Anto | `fisherman` | `/dashboard` |
| Operator Budi Santoso | `operator` | `/operator` |
| PT Laut Nusantara | `buyer` | `/market` |
| Dr. Hendra Wijaya (KKP RI) | `gov` | `/gov` |
| Master Admin | `admin` | `/admin` |

---

*Built with ❤️ for Indonesian coastal communities • Aligned with SDG 1, 2, 8, 9, 12, 13, 14*