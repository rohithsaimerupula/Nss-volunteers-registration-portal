import { NextResponse } from "next/server";

export async function GET() {
  // Database disabled for now. Returning mock stats.
  return NextResponse.json({
    total: 100,
    applied: 42,
    remaining: 58
  });
}
