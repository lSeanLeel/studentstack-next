"use server";

import { z } from "zod";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";

const waitlistSchema = z.object({
  email: z.string().email("Enter a valid parent email."),
  gradeLevel: z.enum(["9", "10", "11", "12", "other"], {
    errorMap: () => ({ message: "Select a grade level." }),
  }),
  zipCode: z
    .string()
    .min(3, "Zip code is too short.")
    .max(12, "Zip code is too long.")
    .regex(/^[A-Za-z0-9 -]+$/, "Zip code contains invalid characters."),
});

export type WaitlistFormState = {
  success: boolean;
  message: string;
};

export const initialWaitlistState: WaitlistFormState = {
  success: false,
  message: "",
};

export async function joinWaitlistAction(
  _prevState: WaitlistFormState,
  formData: FormData
): Promise<WaitlistFormState> {
  const parsed = waitlistSchema.safeParse({
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    gradeLevel: String(formData.get("gradeLevel") ?? "").trim(),
    zipCode: String(formData.get("zipCode") ?? "").trim(),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please check your form fields.",
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message:
        "Waitlist is not connected yet. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local (see OPS_MANUAL.md).",
    };
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("waitlist_users").insert({
      email: parsed.data.email,
      grade_level: parsed.data.gradeLevel,
      zip_code: parsed.data.zipCode,
    });

    if (error) {
      return { success: false, message: `Could not save waitlist entry: ${error.message}` };
    }

    return { success: true, message: "You are on the waitlist. We will reach out when spots open." };
  } catch (e) {
    const raw = e instanceof Error ? e.message : String(e);
    const message =
      /fetch failed|ECONNREFUSED|ENOTFOUND|network|getaddrinfo/i.test(raw)
        ? "Could not reach the database. Check your internet connection and that SUPABASE_URL is correct, then try again."
        : raw || "Could not save. Try again.";
    return { success: false, message };
  }
}
