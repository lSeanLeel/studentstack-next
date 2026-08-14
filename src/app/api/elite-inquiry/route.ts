import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";
import { INTENDED_MAJORS, STUDENT_GRADES } from "@/lib/portal/certifications";

export const runtime = "nodejs";

const bodySchema = z.object({
  parentFullName: z.string().trim().min(1).max(120),
  parentEmail: z.string().trim().email().max(254),
  studentGrade: z.enum(STUDENT_GRADES),
  intendedMajor: z.enum(INTENDED_MAJORS as [string, ...string[]]),
  questions: z.string().trim().min(10).max(4000),
});

export async function POST(req: Request) {
  try {
    let json: unknown;
    try {
      json = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid application." },
        { status: 400 }
      );
    }

    const { parentFullName, parentEmail, studentGrade, intendedMajor, questions } = parsed.data;
    const message = [
      "APPLY FOR ELITE",
      `Parent: ${parentFullName}`,
      `Grade: ${studentGrade}`,
      `Intended major: ${intendedMajor}`,
      "",
      "Questions for our team:",
      questions,
    ].join("\n");

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          error:
            "Applications are not connected yet. Email advising@studentstack.info and we will follow up within 24 hours.",
        },
        { status: 503 }
      );
    }

    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: parentFullName,
      email: parentEmail.toLowerCase(),
      message,
    });

    if (error) {
      return NextResponse.json(
        { error: "Could not save your application. Email advising@studentstack.info instead." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}
