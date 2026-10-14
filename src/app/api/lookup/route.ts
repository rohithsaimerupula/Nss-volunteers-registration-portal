import { NextResponse } from "next/server";
import { turso, isTursoConfigured } from "@/lib/turso";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rollNumber = searchParams.get("rollNumber")?.trim().toUpperCase();

    if (!rollNumber) {
      return NextResponse.json(
        { error: "Please provide a valid student roll number." },
        { status: 400 }
      );
    }

    if (!isTursoConfigured()) {
      return NextResponse.json(
        { error: "Database configuration unavailable. Please contact the administrator." },
        { status: 503 }
      );
    }

    const result = await turso.execute({
      sql: `SELECT 
        id, registration_id, full_name, roll_number, email, phone, 
        program, department, year, section, ug_pg, interests, 
        previous_experience, motivation, status, created_at
      FROM volunteers 
      WHERE UPPER(roll_number) = ? 
      LIMIT 1`,
      args: [rollNumber],
    });

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          found: false,
          message: `No volunteer registration record found for roll number "${rollNumber}".`,
        },
        { status: 404 }
      );
    }

    const row = result.rows[0];

    let interests: string[] = [];
    try {
      interests = JSON.parse(String(row.interests || "[]"));
    } catch {
      interests = [String(row.interests || "")];
    }

    return NextResponse.json({
      found: true,
      volunteer: {
        id: row.id,
        registrationId: row.registration_id,
        fullName: row.full_name,
        rollNumber: row.roll_number,
        email: row.email,
        phone: row.phone,
        program: row.program,
        department: row.department,
        year: row.year,
        section: row.section,
        ugPg: row.ug_pg,
        interests,
        previousExperience: row.previous_experience,
        motivation: row.motivation,
        status: row.status || "Pending",
        createdAt: row.created_at,
      },
    });
  } catch (error: any) {
    console.error("Lookup query error:", error?.message || error);
    return NextResponse.json(
      { error: "Failed to query registration records. Please try again." },
      { status: 500 }
    );
  }
}
