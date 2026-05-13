import { NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";

export async function GET() {
  const authorized = await isAdminAuthorized();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local." },
      { status: 503 }
    );
  }

  let supabase;
  try {
    supabase = getSupabaseServerClient();
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Supabase client error";
    return NextResponse.json({ error: msg }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("waitlist_users")
    .select("id,email,grade_level,zip_code,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const header = ["id", "email", "grade_level", "zip_code", "created_at"];
  const rows = (data ?? []).map((row) =>
    [row.id, row.email, row.grade_level, row.zip_code, row.created_at]
      .map((value) => `"${String(value ?? "").replace(/"/g, "\"\"")}"`)
      .join(",")
  );

  return new NextResponse([header.join(","), ...rows].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="waitlist-users-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}
