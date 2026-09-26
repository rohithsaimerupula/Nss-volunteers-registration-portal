import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  // Verify auth
  const cookieStore = await cookies();
  const hasAuth = cookieStore.has("admin_auth");
  
  if (!hasAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const stats = {
      total: 0,
      ug: 0,
      pg: 0,
      pending: 0,
      selected: 0,
      rejected: 0
    };

    return NextResponse.json({ applications: [], stats });
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
    return NextResponse.json({ success: true, application: { id: "mock" } });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
