import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  // Verify auth
  const cookieStore = await cookies();
  const hasAuth = cookieStore.has("admin_auth");
  
  if (!hasAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { full_name: { contains: search } },
        { student_id: { contains: search } },
        { application_id: { contains: search } }
      ];
    }
    
    if (status) {
      where.status = status;
    }

    const applications = await prisma.application.findMany({
      where,
      orderBy: { created_at: 'desc' }
    });

    const stats = {
      total: await prisma.application.count(),
      ug: await prisma.application.count({ where: { programme: 'UG' } }),
      pg: await prisma.application.count({ where: { programme: 'PG' } }),
      pending: await prisma.application.count({ where: { status: 'submitted' } }),
      selected: await prisma.application.count({ where: { status: 'selected' } }),
      rejected: await prisma.application.count({ where: { status: 'rejected' } })
    };

    return NextResponse.json({ applications, stats });
  } catch (error) {
    console.error("Admin API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const cookieStore = await cookies();
  const hasAuth = cookieStore.has("admin_auth");
  
  if (!hasAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const { id, status } = data;

    const updated = await prisma.application.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json({ success: true, application: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
