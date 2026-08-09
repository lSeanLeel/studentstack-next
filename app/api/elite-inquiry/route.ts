import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";

export const runtime = "nodejs";

const bodySchema = z.object({
  parentName: z.string().trim().min(1, "Parent name is required.").max(120),
  parentEmail: z.string().trim().email("Enter a valid parent email.").max(254),
  studentName: z.string().trim().min(1, "Student name is required.").max(120),
  studentGrade: z.string().trim().min(1, "Grade is required.").max(40),
  school: z.string().trim().max(160).optional().default(""),
  note: z.string().trim().max(2000).optional().default(""),
});

/** Parent inquiry / application for StudentStack Elite (not a checkout). */
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
        { error: parsed.error.issues[0]?.message ?? "Invalid request." },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          error:
            "Inquiry form is not connected yet. Email advising@studentstack.info and we’ll get back to you.",
        },
        { status: 503 }
      );
    }

    const { parentName, parentEmail, studentName, studentGrade, school, note } = parsed.data;
    const supabase = getSupabaseServerClient();

    const message = [
      "[Elite inquiry / application]",
      `Parent: ${parentName}`,
      `Student: ${studentName}`,
      `Grade: ${studentGrade}`,
      school ? `School: ${school}` : null,
      note ? `Note: ${note}` : "Note: (none)",
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await supabase.from("contact_messages").insert({
      name: parentName,
      email: parentEmail.toLowerCase(),
      message,
    });

    if (error) {
      return NextResponse.json(
        {
          error:
            "Could not send your inquiry right now. Email advising@studentstack.info instead.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error: "Something went wrong. Email advising@studentstack.info and we’ll help.",
      },
      { status: 500 }
    );
  }
}
