import type { Metadata } from "next";
import "./globals.css";
import DemoBanner from "@/components/shared/demo-banner";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import MobileBottomNav from "@/components/shared/mobile-bottom-nav";
import AlertToast from "@/components/shared/alert-toast";
import PitchFlowHelper from "@/components/simulation/pitch-flow-helper";
import ClientTelemetryWorker from "@/components/simulation/client-telemetry-worker";

export const metadata: Metadata = {
  title: "BlueSync — Smart Cold Chain Ecosystem (v2.0)",
  description:
    "Digital operating platform untuk ekosistem micro cold storage berbasis solar-hybrid di wilayah pesisir Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col antialiased bg-slate-50 text-slate-900 selection:bg-teal selection:text-white">
        <ClientTelemetryWorker />
        <DemoBanner />
        <Navbar />
        <AlertToast />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileBottomNav />
        <PitchFlowHelper />
      </body>
    </html>
  );
}
