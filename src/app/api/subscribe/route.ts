import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hydrateProjectEnv } from "@/lib/project-env";
import { stripEnvValue } from "@/lib/supabase-server";

export const runtime = "nodejs";

const topFocusEnum = z.enum([
  "Boosting GPA",
  "Finding Research/Internships",
  "Writing",
  "Applying to College",
]);

const bodySchema = z.object({
  studentName: z.string().trim().min(1, "Student name is required."),
  studentEmail: z.string().trim().email("Enter a valid student email."),
  parentEmail: z.string().trim().min(1, "Parent email is required.").email("Enter a valid parent email."),
  studentGrade: z.string().trim().min(1, "Grade is required."),
  topFocus: topFocusEnum,
});

function beehiivApiKey(): string {
  return stripEnvValue(process.env.BEEHIIV_API_KEY) || stripEnvValue(process.env.BEEHIHV_API_KEY);
}

function beehiivPublicationId(): string {
  return stripEnvValue(process.env.BEEHIIV_PUBLICATION_ID);
}

async function subscribeBeehiiv(email: string): Promise<{ ok: true } | { ok: false; message: string }> {
  const apiKey = beehiivApiKey();
  const publicationId = beehiivPublicationId();
  if (!apiKey || !publicationId) {
    return { ok: false, message: "Newsletter service is not configured (missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID)." };
  }

  const url = `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`;
  const body = { email: email.toLowerCase(), tier: "free" as const, reactivate_existing: true };

  console.log("[subscribe] Beehiiv: POST", url.replace(publicationId, "[publicationId]"), { email: body.email });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: body.email,
        tier: "free",
        reactivate_existing: true,
      }),
    });

    console.log("[subscribe] Beehiiv: response status", res.status, { email: body.email });

    if (res.ok) {
      return { ok: true };
    }

    const errJson = (await res.json().catch(() => null)) as { message?: string; errors?: unknown } | null;
    const detail =
      typeof errJson?.message === "string"
        ? errJson.message
        : typeof errJson?.errors !== "undefined"
          ? JSON.stringify(errJson.errors)
          : `Beehiiv HTTP ${res.status}`;
    return { ok: false, message: detail };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.log("[subscribe] Beehiiv: fetch threw", msg, { email });
    return { ok: false, message: msg || "Beehiiv request failed." };
  }
}

export async function POST(req: Request) {
  console.log("=== API ROUTE HIT ===");

  try {
    hydrateProjectEnv();

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

    const { studentName, studentEmail, parentEmail, studentGrade, topFocus } = parsed.data;
    const studentNorm = studentEmail.toLowerCase();
    const parentNorm = parentEmail.trim().toLowerCase();

    if (parentNorm === studentNorm) {
      return NextResponse.json({ error: "Parent email must differ from the student email." }, { status: 400 });
    }

    const SUPABASE_URL_FALLBACK = "https://igpjdaorrbickqjtzjqf.supabase.co";

    const supabaseUrl =
      stripEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL) || SUPABASE_URL_FALLBACK;
    const supabaseServiceKey =
      stripEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY) ||
      stripEnvValue(process.env.SUPABASE_SECRET_KEY) ||
      stripEnvValue(process.env.SUPABASE_SERVICE_KEY);

    if (!supabaseUrl) {
      console.error(
        "[subscribe] BLOCKED before createClient: NEXT_PUBLIC_SUPABASE_URL is missing/empty and URL fallback did not apply."
      );
      return NextResponse.json(
        { error: "Missing Supabase URL (NEXT_PUBLIC_SUPABASE_URL)." },
        { status: 500 }
      );
    }
    if (!supabaseServiceKey) {
      console.error(
        "[subscribe] BLOCKED before createClient: missing server Supabase key. Set SUPABASE_SERVICE_ROLE_KEY (JWT) and/or SUPABASE_SECRET_KEY (sb_secret_…) in .env.local, then restart dev."
      );
      return NextResponse.json(
        {
          error:
            "Missing Supabase server key. Add SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET_KEY) to .env.local and restart npm run dev.",
        },
        { status: 500 }
      );
    }

    console.log("[subscribe] Supabase env", {
      supabaseHost: (() => {
        try {
          return new URL(supabaseUrl).hostname;
        } catch {
          return "(invalid URL)";
        }
      })(),
      serviceRoleKeyLength: supabaseServiceKey.length,
      urlFromEnv: Boolean(stripEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL)),
    });

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const insertRow = {
      student_name: studentName,
      student_email: studentNorm,
      parent_email: parentNorm,
      grade: studentGrade,
      top_focus: topFocus,
    };

    console.log("[subscribe] Supabase insert: before", { row: insertRow });

    const { data: inserted, error: insertError } = await supabase
      .from("signups")
      .insert(insertRow)
      .select("id")
      .single();

    console.log("[subscribe] Supabase insert: after", {
      id: inserted?.id ?? null,
      error: insertError
        ? {
            message: insertError.message,
            code: insertError.code,
            details: insertError.details,
            hint: insertError.hint,
          }
        : null,
    });

    if (insertError) {
      const code = insertError.code;
      if (code === "23505") {
        return NextResponse.json({ error: "This student email is already signed up.", code }, { status: 409 });
      }
      if (/relation|does not exist|schema cache/i.test(insertError.message ?? "")) {
        return NextResponse.json(
          {
            error: insertError.message,
            code,
            details: insertError.details,
            hint: insertError.hint,
          },
          { status: 503 }
        );
      }
      return NextResponse.json(
        {
          error: insertError.message,
          code,
          details: insertError.details,
          hint: insertError.hint,
        },
        { status: 500 }
      );
    }

    const rowId = inserted?.id as string | undefined;

    console.log("[subscribe] Beehiiv student: before", { email: studentNorm });
    const studentBee = await subscribeBeehiiv(studentNorm);
    console.log("[subscribe] Beehiiv student: after", {
      ok: studentBee.ok,
      message: "ok" in studentBee && !studentBee.ok ? studentBee.message : undefined,
    });

    if (!studentBee.ok) {
      if (rowId) {
        await supabase.from("signups").delete().eq("id", rowId);
      }
      return NextResponse.json({ error: studentBee.message }, { status: 502 });
    }

    console.log("[subscribe] Beehiiv parent: before", { email: parentNorm });
    const parentBee = await subscribeBeehiiv(parentNorm);
    console.log("[subscribe] Beehiiv parent: after", {
      ok: parentBee.ok,
      message: "ok" in parentBee && !parentBee.ok ? parentBee.message : undefined,
    });

    if (!parentBee.ok) {
      console.warn("[subscribe] Beehiiv parent subscribe failed:", parentBee.message);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error: unknown) {
    console.error("CRITICAL BACKEND ERROR:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    const fullError =
      error instanceof Error
        ? { name: error.name, message: error.message, stack: error.stack }
        : { value: error };
    return NextResponse.json(
      {
        error: message || "Unknown error",
        fullError,
      },
      { status: 500 }
    );
  }
}
