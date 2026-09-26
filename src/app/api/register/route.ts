import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validate registration mode
    const registrationMode = process.env.REGISTRATION_MODE || "OPTION_B";
    const capacityLimit = 100;

    if (registrationMode === "OPTION_A") {
      const currentCount = await prisma.application.count();
      if (currentCount >= capacityLimit) {
        return NextResponse.json(
          { error: "Volunteer registration is currently closed. Limit reached." },
          { status: 403 }
        );
      }
    }

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

    // Duplicate check
    const existing = await prisma.application.findUnique({
      where: { student_id: data.studentId.toUpperCase() }
    });

    if (existing) {
      return NextResponse.json(
        { error: "An application already exists for this student ID." },
        { status: 400 }
      );
    }

    // Generate Application ID: NSS-2026-XXXX
    const year = new Date().getFullYear();
    const count = await prisma.application.count();
    const uniqueId = String(count + 1).padStart(4, '0');
    const appId = `NSS-${year}-${uniqueId}`;

    const newApp = await prisma.application.create({
      data: {
        application_id: appId,
        full_name: data.fullName,
        mobile: data.mobile,
        email: data.email,
        gender: data.gender,
        date_of_birth: new Date(data.dob),
        student_id: data.studentId.toUpperCase(),
        programme: data.programme,
        department: data.department,
        year: data.year,
        section: data.section || "",
        previous_nss_experience: data.previousExperience,
        interests: data.interests.join(", "),
        experience_description: data.experienceDescription || null,
        status: "submitted",
      }
    });

    return NextResponse.json({ success: true, applicationId: newApp.application_id });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
