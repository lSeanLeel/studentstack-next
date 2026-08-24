import { z } from "zod";
import { INTENDED_MAJORS, STUDENT_GRADES } from "@/lib/portal/certifications";

export const joinApplicationSchema = z.object({
  parentFullName: z.string().trim().min(1, "Parent name is required.").max(120),
  parentEmail: z.string().trim().email("Enter a valid parent email.").max(254),
  parentPhone: z.string().trim().max(30).optional(),
  studentFirstName: z.string().trim().min(1, "Student first name is required.").max(60),
  studentLastName: z.string().trim().max(60).optional(),
  studentEmail: z.string().trim().email("Enter a valid student email.").max(254),
  studentGrade: z.enum(STUDENT_GRADES),
  studentSchool: z.string().trim().max(120).optional(),
  intendedMajor: z.enum(INTENDED_MAJORS as [string, ...string[]]).optional(),
  backgroundNote: z.string().trim().max(1000).optional(),
});

export type JoinApplication = z.infer<typeof joinApplicationSchema>;

export const JOIN_SESSION_KEY = "ss_join_application_v2";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string) {
  return emailPattern.test(value.trim());
}

/** Prefer first name for parent-facing copy. */
export function studentFirstNameOnly(app: Pick<JoinApplication, "studentFirstName">) {
  return app.studentFirstName.trim();
}

export function studentDisplayName(app: Pick<JoinApplication, "studentFirstName" | "studentLastName">) {
  return [app.studentFirstName, app.studentLastName].filter(Boolean).join(" ").trim();
}

/** Mentor-match copy: matched mentor emails the student. Built around first name. */
export function mentorReachOutCopy(app: JoinApplication) {
  const first = studentFirstNameOnly(app);
  const major = app.intendedMajor && app.intendedMajor !== "Undecided" ? app.intendedMajor : null;
  const grade = app.studentGrade;

  let focus: string;
  if (major === "Computer Science" || major === "Other STEM" || major === "Engineering") {
    focus = "STEM coursework, technical programs, and how competitive applicants show real work";
  } else if (major === "Biology / Pre-Med") {
    focus = "research pathways, clinical exposure, and how pre-med applicants stay organized";
  } else if (major === "Business / Economics") {
    focus = "quant and business programs, writing for admissions, and internship timing";
  } else if (major === "Arts / Design" || major === "Humanities" || major === "Social Sciences") {
    focus = "portfolio and writing signals, selective programs, and how readers evaluate depth";
  } else {
    focus = "coursework, programs, and habits that keep a high schooler ahead for admissions";
  }

  return {
    headline: `${first}'s mentor will email them`,
    body: `After enrollment, we match ${first} with a StudentStack mentor for their ${grade} background${
      major ? ` and interest in ${major}` : ""
    }. That mentor emails ${first} directly at ${app.studentEmail}. The note is tailored to ${focus}.`,
    aside: "You finish payment next. The mentor email goes out after membership is confirmed.",
  };
}
