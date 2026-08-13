import { NextResponse } from "next/server";
import { z } from "zod";
import { getBeehiivApiKey, getBeehiivPublicationId, loadServerEnv } from "@/lib/server-env";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";

export const runtime = "nodejs";

/** Parent email is the only required field for the daily. */
const bodySchema = z.object({
  parentEmail: z.string().trim().min(1, "Parent email is required").email("Enter a valid parent email."),
});

export async function POST(req: Request) {
  loadServerEnv();

  try {
    let json: unknown;
    try {
      json = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Invalid request.";
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const parentNorm = parsed.data.parentEmail.trim().toLowerCase();
    const beehiivApiKey = getBeehiivApiKey();
    const beehiivPubId = getBeehiivPublicationId();

    if (!beehiivApiKey || !beehiivPubId) {
      return NextResponse.json(
        { error: "Signup is not connected yet. Email help@studentstack.info and we will add you." },
        { status: 503 }
      );
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseServerClient();
        const { error: insertError } = await supabase.from("signups").insert({
          student_name: "Newsletter parent",
          student_email: null,
          parent_email: parentNorm,
          grade: "-",
          top_focus: "Boosting GPA",
        });
        if (insertError && insertError.code !== "23505") {
          console.warn("[subscribe] Supabase insert:", insertError.message);
        }
      } catch (e) {
        console.warn("[subscribe] Supabase unavailable:", e);
      }
    }

    const url = `https://api.beehiiv.com/v2/publications/${beehiivPubId}/subscriptions`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${beehiivApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: parentNorm,
        tier: "free",
        reactivate_existing: true,
      }),
    });

    if (!res.ok) {
      const errJson = (await res.json().catch(() => null)) as { message?: string } | null;
      return NextResponse.json(
        { error: errJson?.message ?? `Could not subscribe (${res.status}).` },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
