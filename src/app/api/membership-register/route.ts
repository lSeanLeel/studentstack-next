import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";
import { INTENDED_MAJORS, STUDENT_GRADES } from "@/lib/portal/certifications";

export const runtime = "nodejs";

const bodySchema = z.object({
  parentFullName: z.string().trim().min(1, "Parent name is required.").max(120),
  parentEmail: z.string().trim().email("Enter a valid email.").max(254),
  parentPhone: z.string().trim().max(30).optional(),
  studentFirstName: z.string().trim().min(1, "Student first name is required.").max(60),
  studentLastName: z.string().trim().min(1, "Student last name is required.").max(60),
  studentGrade: z.enum(STUDENT_GRADES),
  studentSchool: z.string().trim().max(120).optional(),
  intendedMajor: z.enum(INTENDED_MAJORS as [string, ...string[]]).optional(),
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
        { error: parsed.error.issues[0]?.message ?? "Invalid registration." },
        { status: 400 }
      );
    }

    const {
      parentFullName,
      parentEmail,
      parentPhone,
      studentFirstName,
      studentLastName,
      studentGrade,
      studentSchool,
      intendedMajor,
    } = parsed.data;

    const studentName = `${studentFirstName} ${studentLastName}`.trim();
    const message = [
      "MEMBERSHIP REGISTRATION",
      `Parent: ${parentFullName}`,
      parentPhone ? `Phone: ${parentPhone}` : null,
      `Student: ${studentName}`,
      `Grade: ${studentGrade}`,
      studentSchool ? `School: ${studentSchool}` : null,
      intendedMajor ? `Intended major: ${intendedMajor}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          error:
            "Registration is not connected yet. Email advising@studentstack.info and we will help you enroll.",
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
        { error: "Could not save your registration. Email advising@studentstack.info instead." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      studentName,
      parentEmail: parentEmail.toLowerCase(),
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}
