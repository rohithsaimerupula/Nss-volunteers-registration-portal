import { NextResponse } from "next/server";
import { turso } from "@/lib/turso";
import { verifyAdminAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const isAuth = await verifyAdminAuth(request);
    if (!isAuth) {
      return NextResponse.json(
        { error: "Unauthorized access. Administrator privileges required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() || "";
    const department = searchParams.get("department")?.trim() || "";
    const year = searchParams.get("year")?.trim() || "";
    const ugPg = searchParams.get("ugPg")?.trim() || "";

    let sql = "SELECT * FROM volunteers WHERE 1=1";
    const args: any[] = [];

    if (search) {
      sql += " AND (full_name LIKE ? OR roll_number LIKE ? OR email LIKE ? OR phone LIKE ?)";
      const pattern = `%${search}%`;
      args.push(pattern, pattern, pattern, pattern);
    }

    if (department) {
      sql += " AND UPPER(department) = ?";
      args.push(department.toUpperCase());
    }

    if (year) {
      sql += " AND year = ?";
      args.push(year);
    }

    if (ugPg) {
      sql += " AND ug_pg = ?";
      args.push(ugPg.toUpperCase());
    }

    sql += " ORDER BY created_at DESC";

    const result = await turso.execute({ sql, args });

    // Also get overall total count for campaign tracking
    const totalResult = await turso.execute("SELECT COUNT(*) as total FROM volunteers");
    const totalCount = Number(totalResult.rows[0]?.total ?? 0);

    return NextResponse.json(
      {
        totalCount,
        matchedCount: result.rows.length,
        volunteers: result.rows,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error: any) {
    console.error("Admin volunteers query error:", error);
    return NextResponse.json(
      { error: "Failed to query volunteer records from database." },
      { status: 500 }
    );
  }
}
