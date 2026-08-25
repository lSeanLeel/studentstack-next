import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";
import { persistInquiryFallback } from "@/lib/inquiry-fallback";
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
    const normalizedEmail = parentEmail.toLowerCase();
    const message = [
      "COMMUNITY JOIN",
      `Parent: ${parentFullName}`,
      parentPhone ? `Phone: ${parentPhone}` : null,
      `Student: ${studentName}`,
      `Grade: ${studentGrade}`,
      studentSchool ? `School: ${studentSchool}` : null,
      intendedMajor ? `Intended major: ${intendedMajor}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const success = {
      ok: true as const,
      studentName,
      parentEmail: normalizedEmail,
    };

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseServerClient();
      const { error } = await supabase.from("contact_messages").insert({
        name: parentFullName,
        email: normalizedEmail,
        message,
      });

      if (error) {
        console.error("[membership-register] supabase insert failed", error.message);
        await persistInquiryFallback({
          source: "membership-register",
          name: parentFullName,
          email: normalizedEmail,
          message,
          createdAt: new Date().toISOString(),
        });
        return NextResponse.json({ ...success, stored: "fallback" });
      }

      return NextResponse.json(success);
    }

    await persistInquiryFallback({
      source: "membership-register",
      name: parentFullName,
      email: normalizedEmail,
      message,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ ...success, stored: "fallback" });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}
