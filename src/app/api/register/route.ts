import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Check dates
    const startDate = process.env.REGISTRATION_START_DATE;
    const endDate = process.env.REGISTRATION_END_DATE;
    const now = new Date();

    if (startDate && new Date(startDate) > now) {
      return NextResponse.json({ error: "Registration has not started yet." }, { status: 403 });
    }
    if (endDate && new Date(endDate) < now) {
      return NextResponse.json({ error: "Registration is closed." }, { status: 403 });
    }

    // Generate Mock Application ID
    const year = new Date().getFullYear();
    const uniqueId = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    const appId = `NSS-${year}-${uniqueId}`;

    return NextResponse.json({ success: true, applicationId: appId });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
