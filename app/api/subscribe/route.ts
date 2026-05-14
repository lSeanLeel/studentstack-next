import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { z } from "zod";

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
  parentEmail: z.string().trim().min(1, "Parent email is required").email("Enter a valid parent email."),
  studentGrade: z.string().trim().min(1, "Grade is required."),
  topFocus: topFocusEnum,
});

export async function POST(req: Request) {
  try {
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://igpjdaorrbickqjtzjqf.supabase.co";
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlncGpkYW9ycmJpY2txanR6anFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODc3NTk2MywiZXhwIjoyMDk0MzUxOTYzfQ.rAKddOBnWyzom17hhzP6Ik9wiHdmzLH8NK1l880dDqQ";
    const beehiivApiKey =
      process.env.BEEHIIV_API_KEY ||
      "usIJBFLlEu61UusG8pCQgig6Z9D5tC78tLTX8tJEm91xUw8EAnfAX54XJqsPxrho";
    const rawBeehiivPubId =
      process.env.BEEHIIV_PUBLICATION_ID?.trim() || "pub_97584e54-1e39-4011-9ae7-8d76ca07ed91";
    const beehiivPubId = rawBeehiivPubId.startsWith("pub_")
      ? rawBeehiivPubId
      : `pub_${rawBeehiivPubId}`;

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

    const { data: inserted, error: insertError } = await supabase
      .from("signups")
      .insert(insertRow)
      .select("id")
      .single();

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

    const beehiivSubscribe = async (email: string) => {
      const url = `https://api.beehiiv.com/v2/publications/${beehiivPubId}/subscriptions`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${beehiivApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          tier: "free",
          reactivate_existing: true,
        }),
      });
      if (res.ok) return { ok: true as const };
      const errJson = (await res.json().catch(() => null)) as { message?: string; errors?: unknown } | null;
      const detail =
        typeof errJson?.message === "string"
          ? errJson.message
          : typeof errJson?.errors !== "undefined"
            ? JSON.stringify(errJson.errors)
            : `Beehiiv HTTP ${res.status}`;
      return { ok: false as const, message: detail };
    };

    const studentBee = await beehiivSubscribe(studentNorm);
    if (!studentBee.ok) {
      if (rowId) {
        await supabase.from("signups").delete().eq("id", rowId);
      }
      return NextResponse.json({ error: studentBee.message }, { status: 502 });
    }

    const parentBee = await beehiivSubscribe(parentNorm);
    if (!parentBee.ok) {
      console.warn("[subscribe] Beehiiv parent subscribe failed:", parentBee.message);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error: unknown) {
    console.error("Backend Error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
