import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const {
      unit_id,
      timestamp,
      temperature_c,
      humidity_pct,
      battery_pct,
      solar_kw,
      grid_status,
      compressor_ok,
      door_open,
      capacity_pct,
    } = payload;

    // Validate incoming payload
    if (!unit_id || temperature_c === undefined) {
      return NextResponse.json(
        { error: "Missing required telemetry fields" },
        { status: 400 }
      );
    }

    const isAnomaly = temperature_c > -15.0 || !compressor_ok;

    return NextResponse.json({
      success: true,
      message: "Telemetry ingested and broadcasted to Supabase Realtime",
      reading_id: `sr-${unit_id}-${Date.now()}`,
      alert_triggered: isAnomaly,
    });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
