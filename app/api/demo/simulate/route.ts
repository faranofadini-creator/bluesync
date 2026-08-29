import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { action = "tick", unit_id = "BS-001", temp_c = -14.6 } = body;

    return NextResponse.json({
      success: true,
      action,
      unit_id,
      simulated_temp_c: temp_c,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({ error: "Simulation error" }, { status: 500 });
  }
}
