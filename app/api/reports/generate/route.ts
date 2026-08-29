import { NextResponse } from "next/server";
import { INITIAL_IMPACT_RECORDS } from "@/lib/mock-data";

export async function POST() {
  return NextResponse.json({
    success: true,
    report_title: "Laporan Dampak Cold Chain Nasional BlueSync v2.0",
    generated_at: new Date().toISOString(),
    records: INITIAL_IMPACT_RECORDS,
  });
}
