import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";

const topFocusEnum = z.enum([
  "Boosting GPA",
  "Finding Research/Internships",
  "Writing",
  "Applying to College",
]);

const bodySchema = z.object({
  studentName: z.string().trim().min(1, "Student name is required."),
  studentEmail: z.string().trim().email("Enter a valid student email."),
  parentEmail: z.string().trim().optional(),
  studentGrade: z.string().trim().min(1, "Grade is required."),
  topFocus: topFocusEnum,
});

function beehiivConfigured(): boolean {
  const key = process.env.BEEHIIV_API_KEY?.trim();
  const pub = process.env.BEEHIIV_PUBLICATION_ID?.trim();
  return Boolean(key && pub && key.length > 10);
}

async function subscribeBeehiiv(email: string): Promise<{ ok: true } | { ok: false; message: string }> {
  if (!beehiivConfigured()) {
    return { ok: false, message: "Newsletter service is not configured." };
  }

  const apiKey = process.env.BEEHIIV_API_KEY!.trim();
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID!.trim();
  const url = `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        tier: "free",
        reactivate_existing: true,
      }),
    });

    if (res.ok) {
      return { ok: true };
    }

    const errJson = (await res.json().catch(() => null)) as { message?: string; errors?: unknown } | null;
    const detail =
      typeof errJson?.message === "string"
        ? errJson.message
        : `Beehiiv returned ${res.status}. Please try again later.`;
    return { ok: false, message: detail };
  } catch {
    return { ok: false, message: "Could not reach the newsletter service. Try again in a moment." };
  }
}

export async function POST(req: Request) {
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
  const parentRaw = parentEmail?.trim() ?? "";
  const parentNorm = parentRaw ? parentRaw.toLowerCase() : null;

  if (parentNorm && parentNorm === studentNorm) {
    return NextResponse.json({ error: "Parent email must differ from the student email." }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Signups are not connected yet. Please try again later or email help@studentstack.info." },
      { status: 503 }
    );
  }

  const supabase = getSupabaseServerClient();
  const { data: inserted, error: insertError } = await supabase
    .from("signups")
    .insert({
      student_name: studentName,
      student_email: studentNorm,
      parent_email: parentNorm,
      grade: studentGrade,
      top_focus: topFocus,
    })
    .select("id")
    .single();

  if (insertError) {
    const code = (insertError as { code?: string }).code;
    if (code === "23505") {
      return NextResponse.json({ error: "This student email is already signed up." }, { status: 409 });
    }
    if (/relation|does not exist|schema cache/i.test(insertError.message ?? "")) {
      return NextResponse.json(
        { error: "Signup storage is not ready yet. Ask the team to run the latest database migration." },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: "We could not save your signup. Please try again." }, { status: 500 });
  }

  const rowId = inserted?.id as string | undefined;

  const studentBee = await subscribeBeehiiv(studentNorm);
  if (!studentBee.ok) {
    if (rowId) {
      await supabase.from("signups").delete().eq("id", rowId);
    }
    return NextResponse.json({ error: studentBee.message }, { status: 502 });
  }

  if (parentNorm) {
    const parentBee = await subscribeBeehiiv(parentNorm);
    if (!parentBee.ok) {
      console.warn("[subscribe] Beehiiv parent subscribe failed:", parentBee.message);
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
