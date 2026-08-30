import { NextResponse } from "next/server";
import { z } from "zod";
import { getPortalMember } from "@/lib/portal/session";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";
import { persistInquiryFallback } from "@/lib/inquiry-fallback";

export const runtime = "nodejs";

const bodySchema = z.object({
  subject: z.string().trim().min(2, "Add a short subject.").max(120),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more (at least 10 characters).")
    .max(4000, "Message is too long."),
});

export async function POST(req: Request) {
  const member = await getPortalMember();
  if (!member || !member.isMember) {
    return NextResponse.json({ error: "Sign in to message the team." }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request." },
      { status: 400 }
    );
  }

  const { subject, message } = parsed.data;
  const name = member.displayName || "Member";
  const email = (member.email || "member@studentstack.info").toLowerCase();
  const composed = `[Portal · Message team]\nSubject: ${subject}\nMember: ${name} (${email})\nKind: ${member.kind}\n\n${message}`;

  try {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseServerClient();
      const { error } = await supabase.from("contact_messages").insert({
        name,
        email,
        message: composed,
      });

      if (error) {
        console.error("[portal/message-team] supabase insert failed", error.message);
        await persistInquiryFallback({
          source: "portal-message-team",
          name,
          email,
          message: composed,
          createdAt: new Date().toISOString(),
        });
        return NextResponse.json({ ok: true, stored: "fallback" });
      }

      return NextResponse.json({ ok: true });
    }

    await persistInquiryFallback({
      source: "portal-message-team",
      name,
      email,
      message: composed,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true, stored: "fallback" });
  } catch {
    return NextResponse.json(
      { error: "Could not send right now. Email advising@studentstack.info." },
      { status: 500 }
    );
  }
}
