import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { loadServerEnv } from "@/lib/server-env";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";
import { APPLICATION_STATUSES } from "@/lib/program";

export const runtime = "nodejs";

const COLUMNS =
  "id,cohort,parent_name,parent_email,parent_phone,student_name,student_grade,school,goals,ai_use,heard_from,utm,newsletter_opt_in,status,notes,contacted_at,created_at";

/** Applications hold family contact details, so refuse the default admin/admin login in production. */
function passwordIsDefault() {
  return (
    process.env.NODE_ENV === "production" &&
    !(process.env.ADMIN_PASSWORD?.trim() || process.env.OPERATOR_PASSWORD?.trim())
  );
}

async function guard() {
  loadServerEnv();
  if (passwordIsDefault()) {
    return NextResponse.json(
      { error: "Set ADMIN_PASSWORD in Vercel before viewing applications." },
      { status: 503 }
    );
  }
  if (!(await isAdminAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }
  return null;
}

function csv(rows: Record<string, unknown>[]) {
  const header = COLUMNS.split(",");
  const lines = rows.map((r) =>
    header.map((h) => `"${String(r[h] ?? "").replace(/"/g, '""')}"`).join(",")
  );
  return [header.join(","), ...lines].join("\n");
}

export async function GET(req: Request) {
  const blocked = await guard();
  if (blocked) return blocked;

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("program_applications")
    .select(COLUMNS)
    .order("created_at", { ascending: false })
    .limit(2000);

  if (error) {
    return NextResponse.json(
      { error: `${error.message}. Run supabase/migrations/004_program_applications.sql.` },
      { status: 500 }
    );
  }

  if (new URL(req.url).searchParams.get("format") === "csv") {
    return new NextResponse(csv((data ?? []) as Record<string, unknown>[]), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="applications-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  return NextResponse.json({ applications: data ?? [] });
}

const patchSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(APPLICATION_STATUSES).optional(),
  notes: z.string().max(4000).optional(),
});

export async function PATCH(req: Request) {
  const blocked = await guard();
  if (blocked) return blocked;

  const parsed = patchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid update." }, { status: 400 });

  const { id, status, notes } = parsed.data;
  const update: Record<string, unknown> = {};
  if (status) update.status = status;
  if (status === "contacted") update.contacted_at = new Date().toISOString();
  if (notes !== undefined) update.notes = notes;

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from("program_applications").update(update).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
