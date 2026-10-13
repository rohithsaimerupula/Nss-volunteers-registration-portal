import { NextResponse } from "next/server";
import { turso } from "@/lib/turso";
import { registrationSchema } from "@/lib/validations";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

// Simple in-memory rate limiting: 5 attempts per IP per minute
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60000;
const MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "unknown-ip";

    // 1. Rate Limiting Check
    const now = Date.now();
    const rateLimitInfo = rateLimitMap.get(ip) || { count: 0, timestamp: now };

    if (now - rateLimitInfo.timestamp > RATE_LIMIT_WINDOW_MS) {
      rateLimitInfo.count = 1;
      rateLimitInfo.timestamp = now;
    } else {
      rateLimitInfo.count++;
      if (rateLimitInfo.count > MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          {
            error: "Too many registration attempts. Please wait a moment before trying again.",
          },
          { status: 429 }
        );
      }
    }
    rateLimitMap.set(ip, rateLimitInfo);

    // 2. Parse and Validate Input (Server-Side Validation)
    let rawData: unknown;
    try {
      rawData = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload in request." },
        { status: 400 }
      );
    }

    const parsed = registrationSchema.safeParse(rawData);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          error: "Validation failed. Please check the entered information.",
          details: fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const isTursoConfigured =
      process.env.TURSO_DATABASE_URL &&
      process.env.TURSO_DATABASE_URL !== "libsql://placeholder-project.turso.io";

    if (!isTursoConfigured) {
      return NextResponse.json(
        {
          error: "Database configuration unavailable. Please contact the administrator.",
        },
        { status: 503 }
      );
    }

    // 3. Generate Official Registration Identifier
    const yearSuffix = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const registrationId = `NSS-SETU-${yearSuffix}-${randomSuffix}`;
    const internalId = crypto.randomUUID();

    try {
      await turso.execute({
        sql: `INSERT INTO volunteers (
          id, registration_id, full_name, roll_number, email, phone, 
          program, department, year, section, ug_pg, interests, 
          previous_experience, motivation, consent
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          internalId,
          registrationId,
          data.fullName.trim(),
          data.rollNumber.trim().toUpperCase(),
          data.email.trim().toLowerCase(),
          data.phone.trim(),
          data.program.trim(),
          data.department.trim().toUpperCase(),
          data.year.trim(),
          data.section ? data.section.trim().toUpperCase() : null,
          data.ugPg,
          JSON.stringify(data.interests),
          data.previousExperience ? data.previousExperience.trim() : null,
          data.motivation ? data.motivation.trim() : "",
          data.consent ? 1 : 0,
        ],
      });

      return NextResponse.json(
        {
          success: true,
          registrationId,
          message: "Registration submitted successfully.",
        },
        { status: 201 }
      );
    } catch (insertError: any) {
      const msg = String(insertError?.message || "");
      const code = insertError?.code || "";

      // SQLite UNIQUE constraint violation
      if (
        msg.includes("UNIQUE constraint failed") ||
        code === "SQLITE_CONSTRAINT_UNIQUE" ||
        msg.includes("volunteers.roll_number") ||
        msg.includes("volunteers.email")
      ) {
        let field = "This student record (Roll Number or Email)";
        if (msg.includes("volunteers.roll_number")) field = "This Roll Number";
        if (msg.includes("volunteers.email")) field = "This Email address";

        return NextResponse.json(
          {
            error: `${field} is already registered for this campaign.`,
            duplicate: true,
          },
          { status: 409 }
        );
      }

      console.error("Turso database insert error:", insertError);
      return NextResponse.json(
        {
          error: "Failed to persist registration into campaign records. Please try again.",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Registration unhandled server error:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred while processing your registration.",
      },
      { status: 500 }
    );
  }
}
