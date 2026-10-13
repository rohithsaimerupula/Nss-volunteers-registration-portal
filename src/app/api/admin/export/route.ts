import { NextResponse } from "next/server";
import { turso } from "@/lib/turso";
import { verifyAdminAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

function escapeCsvField(field: unknown): string {
  if (field === null || field === undefined) return '""';
  const str = String(field);
  // Double-quote escaping
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

export async function GET(request: Request) {
  try {
    const isAuth = await verifyAdminAuth(request);
    if (!isAuth) {
      return NextResponse.json(
        { error: "Unauthorized access. Administrator privileges required." },
        { status: 401 }
      );
    }

    const result = await turso.execute("SELECT * FROM volunteers ORDER BY created_at ASC");
    const rows = result.rows;

    const headers = [
      "Registration ID",
      "Full Name",
      "Roll Number",
      "Email Address",
      "Phone Number",
      "UG/PG",
      "Program",
      "Department",
      "Academic Year",
      "Section",
      "Interests",
      "Previous Experience",
      "Motivation",
      "Consent (1=Yes)",
      "Registered At (UTC)",
    ];

    const csvLines: string[] = [headers.map(escapeCsvField).join(",")];

    for (const r of rows) {
      let interestsStr = "";
      try {
        const parsed = JSON.parse(String(r.interests || "[]"));
        interestsStr = Array.isArray(parsed) ? parsed.join("; ") : String(r.interests);
      } catch {
        interestsStr = String(r.interests || "");
      }

      const line = [
        r.registration_id,
        r.full_name,
        r.roll_number,
        r.email,
        r.phone,
        r.ug_pg,
        r.program,
        r.department,
        r.year,
        r.section || "N/A",
        interestsStr,
        r.previous_experience || "N/A",
        r.motivation || "N/A",
        r.consent,
        r.created_at,
      ].map(escapeCsvField).join(",");

      csvLines.push(line);
    }

    const csvContent = csvLines.join("\r\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="NSS_SETU_Volunteers_Cohort_${new Date().getFullYear()}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error: any) {
    console.error("CSV export generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate CSV export file." },
      { status: 500 }
    );
  }
}
