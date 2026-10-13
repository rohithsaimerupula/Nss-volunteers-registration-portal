import { NextResponse } from "next/server";
import { generateAdminToken, verifyAdminAuth, SESSION_COOKIE_NAME } from "@/lib/auth";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const expectedPassword = process.env.ADMIN_PASSWORD || "VIIT_NSS_SETU_ADMIN_2026!";

    if (!password || password !== expectedPassword) {
      return NextResponse.json(
        { error: "Invalid administrative credentials." },
        { status: 401 }
      );
    }

    const token = generateAdminToken();
    const cookieStore = await cookies();

    cookieStore.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12, // 12 hours
    });

    return NextResponse.json({ success: true, message: "Authorized." });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Authentication processing failed." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const isAuth = await verifyAdminAuth(request);
  return NextResponse.json({ authenticated: isAuth });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  return NextResponse.json({ success: true, message: "Logged out." });
}
