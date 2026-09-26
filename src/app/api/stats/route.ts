import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const total = 100;
    const applied = await prisma.application.count();
    const remaining = Math.max(0, total - applied);
    
    return NextResponse.json({
      total,
      applied,
      remaining
    });
  } catch (error) {
    return NextResponse.json({ total: 100, applied: 0, remaining: 100 });
  }
}
