import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";

export const runtime = "nodejs";

const bodySchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(120, "Name is too long."),
  email: z.string().trim().email("Enter a valid email.").max(254),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more (at least 10 characters).")
    .max(4000, "Message is too long."),
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
      const msg = parsed.error.issues[0]?.message ?? "Invalid request.";
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          error:
            "Contact form is not connected yet. Email advising@studentstack.info and we’ll get back to you.",
        },
        { status: 503 }
      );
    }

    const { name, email, message } = parsed.data;
    const supabase = getSupabaseServerClient();

    const { error } = await supabase.from("contact_messages").insert({
      name,
      email: email.toLowerCase(),
      message,
    });

    if (error) {
      return NextResponse.json(
        {
          error:
            "Could not send your message right now. Email advising@studentstack.info instead.",
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
