import { NextResponse } from "next/server";
import { INITIAL_USERS } from "@/lib/mock-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    const user = INITIAL_USERS.find(
      (u) => u.email.toLowerCase() === email?.toLowerCase()
    );

    if (!user) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
      token: `mock_jwt_token_for_${user.id}`,
    });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
