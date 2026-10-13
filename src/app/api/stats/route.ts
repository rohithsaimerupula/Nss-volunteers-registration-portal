import { NextResponse } from "next/server";
import { turso, isTursoConfigured } from "@/lib/turso";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!isTursoConfigured()) {
      return NextResponse.json({
        connected: false,
        count: null,
        target: 100,
      });
    }

    const result = await turso.execute("SELECT COUNT(*) as count FROM volunteers");
    const count = Number(result.rows[0]?.count ?? 0);

    return NextResponse.json({
      connected: true,
      count,
      target: 100,
    }, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error: any) {
    console.error("Error fetching volunteer stats:", error?.message || error);
    return NextResponse.json(
      {
        connected: false,
        count: null,
        target: 100,
        error: "Database count unavailable",
      },
      { status: 500 }
    );
  }
}
