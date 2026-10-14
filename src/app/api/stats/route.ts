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
        isRegistrationOpen: true,
      });
    }

    const countResult = await turso.execute("SELECT COUNT(*) as count FROM volunteers");
    const count = Number(countResult.rows[0]?.count ?? 0);

    let isRegistrationOpen = true;
    try {
      const settingResult = await turso.execute(
        "SELECT value FROM campaign_settings WHERE key = 'is_registration_open' LIMIT 1"
      );
      if (settingResult.rows.length > 0) {
        const val = String(settingResult.rows[0]?.value);
        isRegistrationOpen = val === "1" || val === "true";
      }
    } catch {
      // campaign_settings table might not be queried if not yet initialized
    }

    return NextResponse.json({
      connected: true,
      count,
      target: 100,
      isRegistrationOpen,
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
        isRegistrationOpen: true,
        error: "Database count unavailable",
      },
      { status: 500 }
    );
  }
}
