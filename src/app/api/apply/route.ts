import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";
import { getBeehiivApiKey, getBeehiivPublicationId, loadServerEnv } from "@/lib/server-env";
import { AI_USE_LEVELS, COHORT, CONTACT_EMAIL, HEARD_FROM, STUDENT_GRADES } from "@/lib/program";

export const runtime = "nodejs";

const bodySchema = z.object({
  parentName: z.string().trim().min(1, "Please add your name.").max(120),
  parentEmail: z.string().trim().email("Enter a valid email.").max(254),
  parentPhone: z.string().trim().max(40).optional().default(""),
  studentName: z.string().trim().min(1, "Please add your student's first name.").max(120),
  studentGrade: z.enum(STUDENT_GRADES, { errorMap: () => ({ message: "Choose a grade." }) }),
  school: z.string().trim().max(160).optional().default(""),
  goals: z.string().trim().min(10, "Tell us a little more about your student's goals.").max(3000),
  aiUse: z.enum(AI_USE_LEVELS, { errorMap: () => ({ message: "Choose how your student uses AI today." }) }),
  heardFrom: z.enum(HEARD_FROM).optional(),
  newsletterOptIn: z.boolean().optional().default(true),
  /** utm_source / utm_campaign from the ad or link that brought them. */
  utm: z.string().trim().max(300).optional().default(""),
  /** Honeypot: real people never fill this in. */
  website: z.string().optional().default(""),
});

async function subscribeToBeehiiv(email: string) {
  const key = getBeehiivApiKey();
  const pub = getBeehiivPublicationId();
  if (!key || !pub) return;
  try {
    await fetch(`https://api.beehiiv.com/v2/publications/${pub}/subscriptions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        tier: "free",
        reactivate_existing: true,
        utm_source: "studentstack_apply",
      }),
    });
  } catch (e) {
    console.warn("[apply] beehiiv subscribe failed", e);
  }
}

export async function POST(req: Request) {
  loadServerEnv();

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message;
    return NextResponse.json(
      { error: !msg || msg === "Required" ? "Please fill in all required fields." : msg },
      { status: 400 }
    );
  }
  const d = parsed.data;

  // Bots that fill the hidden field get a quiet success and nothing is stored.
  if (d.website) return NextResponse.json({ ok: true });

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: `Applications aren't connected yet. Email ${CONTACT_EMAIL} and we'll follow up.` },
      { status: 503 }
    );
  }

  const supabase = getSupabaseServerClient();
  const email = d.parentEmail.toLowerCase();

  const { error } = await supabase.from("program_applications").insert({
    cohort: COHORT.name,
    parent_name: d.parentName,
    parent_email: email,
    parent_phone: d.parentPhone || null,
    student_name: d.studentName,
    student_grade: d.studentGrade,
    school: d.school || null,
    goals: d.goals,
    ai_use: d.aiUse,
    heard_from: d.heardFrom ?? null,
    newsletter_opt_in: d.newsletterOptIn,
    utm: d.utm || null,
  });

  if (error) {
    // Table not created yet: keep the lead instead of losing it.
    console.warn("[apply] program_applications insert failed, falling back:", error.message);
    const message = [
      `APPLICATION · ${COHORT.name}`,
      `Parent: ${d.parentName} <${email}> ${d.parentPhone}`,
      `Student: ${d.studentName}, ${d.studentGrade}${d.school ? `, ${d.school}` : ""}`,
      `AI use today: ${d.aiUse}`,
      `Heard from: ${d.heardFrom ?? "-"}${d.utm ? ` (${d.utm})` : ""}`,
      `Newsletter: ${d.newsletterOptIn ? "yes" : "no"}`,
      "",
      d.goals,
    ].join("\n");
    const fallback = await supabase.from("contact_messages").insert({ name: d.parentName, email, message });
    if (fallback.error) {
      return NextResponse.json(
        { error: `We couldn't save your application. Email ${CONTACT_EMAIL} instead.` },
        { status: 500 }
      );
    }
  }

  if (d.newsletterOptIn) await subscribeToBeehiiv(email);

  return NextResponse.json({ ok: true });
}
