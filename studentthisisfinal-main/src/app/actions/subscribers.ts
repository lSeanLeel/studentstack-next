"use server";

import { z } from "zod";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";

const subscriberSchema = z.object({
  parent_email: z.string().email("Please enter a valid parent email."),
  student_email: z.string().email("Please enter a valid student email."),
  student_grade: z.enum(["8th", "Freshman", "Sophomore", "Junior", "Senior"]),
  friction_point: z.enum(["Finding Research/Internships", "Boosting GPA", "Writing Essays"]),
});

export type SubscriberPayload = z.infer<typeof subscriberSchema>;

export type SaveSubscriberResult =
  | { ok: true }
  | { ok: false; message: string };

function friendlyDbMessage(raw: string): string {
  const lower = raw.toLowerCase();
  if (lower.includes("row-level security") || lower.includes("permission denied") || lower.includes("rls")) {
    return "We couldn't save your signup. Please try again or email help@studentstack.info.";
  }
  if (lower.includes("jwt") || lower.includes("invalid api key") || lower.includes("apikey")) {
    return "Signup is temporarily unavailable. Please try again in a few minutes.";
  }
  if (/relation|does not exist|schema cache/i.test(lower)) {
    return "We're updating our signup system. Please try again later or email help@studentstack.info.";
  }
  return "We couldn't save your signup. Check your connection and try again.";
}

export async function saveSubscriberAction(input: SubscriberPayload): Promise<SaveSubscriberResult> {
  const parsed = subscriberSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      message:
        "Signups aren't live on this preview yet. Email help@studentstack.info and we'll add you.",
    };
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("subscribers").insert({
      parent_email: parsed.data.parent_email.trim().toLowerCase(),
      student_email: parsed.data.student_email.trim().toLowerCase(),
      student_grade: parsed.data.student_grade,
      friction_point: parsed.data.friction_point,
    });

    if (error) {
      const code = (error as { code?: string }).code;
      if (code === "23505") {
        return { ok: true };
      }
      return { ok: false, message: friendlyDbMessage(error.message ?? "") };
    }
    return { ok: true };
  } catch (e) {
    const raw = e instanceof Error ? e.message : String(e);
    const msg = /fetch failed|econnrefused|enotfound|network|getaddrinfo/i.test(raw)
      ? "Connection problem. Check your internet and try again."
      : "Something went wrong. Please try again.";
    return { ok: false, message: msg };
  }
}
