import { NextResponse } from "next/server";
import { turso } from "@/lib/turso";
import { registrationSchema } from "@/lib/validations";
import { headers } from "next/headers";

// Mock database for when Turso is not configured (for demo/development)
const mockDb = new Set();
// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown-ip";

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
          { error: "Too many registration attempts. Please try again later." },
          { status: 429 }
        );
      }
    }
    rateLimitMap.set(ip, rateLimitInfo);

    // 2. Parse and Validate Input (Server-Side Validation)
    const rawData = await request.json();
    const parsed = registrationSchema.safeParse(rawData);

    if (!parsed.success) {
      console.warn("Validation failed for registration attempt", parsed.error.flatten());
      return NextResponse.json(
        { error: "Invalid data provided. Please check your form." },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const isTursoConfigured = 
      process.env.TURSO_DATABASE_URL && 
      process.env.TURSO_DATABASE_URL !== "libsql://placeholder-project.turso.io";

    if (isTursoConfigured) {
      // 3. Insert new registration safely
      // Rely on SQLite UNIQUE constraints to prevent duplicates
      const registrationId = `NSS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
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
            data.fullName,
            data.rollNumber.toUpperCase(),
            data.email.toLowerCase(),
            data.phone,
            data.program,
            data.department,
            data.year,
            data.section || null,
            data.ugPg,
            JSON.stringify(data.interests),
            data.previousExperience || null,
            data.motivation,
            data.consent ? 1 : 0
          ]
        });
        
        return NextResponse.json({ success: true, registrationId }, { status: 201 });

      } catch (insertError: any) {
        // SQLite unique constraint error check
        if (insertError.message && (insertError.message.includes('UNIQUE constraint failed') || insertError.code === 'SQLITE_CONSTRAINT_UNIQUE')) {
          return NextResponse.json(
            { error: "You have already registered." },
            { status: 409 }
          );
        }
        
        console.error("Turso insert error:", insertError);
        return NextResponse.json({ error: "Failed to save registration. Please try again." }, { status: 500 });
      }
      
    } else {
      // Mock logic for demo purposes when Turso keys are absent
      const identifier = `${data.rollNumber}-${data.email}`;
      if (mockDb.has(identifier)) {
        return NextResponse.json(
          { error: "You have already registered." },
          { status: 409 }
        );
      }
      
      mockDb.add(identifier);
      const registrationId = `NSS-MOCK-${Math.floor(1000 + Math.random() * 9000)}`;
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({ success: true, registrationId }, { status: 201 });
    }

  } catch (error: any) {
    console.error("Registration unhandled error:", error);
    return NextResponse.json(
      { error: "Something went wrong while processing your request." },
      { status: 500 }
    );
  }
}
