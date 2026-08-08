import { NextResponse } from "next/server";
import { z } from "zod";
import { getServiceSupabase } from "@/lib/portal/entitlements";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export const runtime = "nodejs";

const bodySchema = z.object({
  parentEmail: z.string().trim().email("Enter a valid parent email."),
  studentName: z.string().trim().min(1, "Student name is required.").max(120),
  studentEmail: z.string().trim().email("Enter a valid student email."),
});

/** Parent buys Elite for a student. No student login required at checkout. */
export async function POST(req: Request) {
  try {
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: "Stripe is not configured yet. Add STRIPE_SECRET_KEY and STRIPE_PRICE_ELITE." },
        { status: 503 }
      );
    }

    const priceId = process.env.STRIPE_PRICE_ELITE?.trim();
    if (!priceId) {
      return NextResponse.json({ error: "Missing STRIPE_PRICE_ELITE." }, { status: 503 });
    }

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

    const parentEmail = parsed.data.parentEmail.toLowerCase();
    const studentEmail = parsed.data.studentEmail.toLowerCase();
    const studentName = parsed.data.studentName;

    if (parentEmail === studentEmail) {
      return NextResponse.json(
        { error: "Use the student’s own email for portal access (different from the parent email)." },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const origin = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
    const supabase = getServiceSupabase();

    const customers = await stripe.customers.list({ email: parentEmail, limit: 1 });
    const customer =
      customers.data[0] ??
      (await stripe.customers.create({
        email: parentEmail,
        metadata: {
          role: "parent_buyer",
          student_email: studentEmail,
        },
      }));

    const { data: pendingRow, error: insertError } = await supabase
      .from("elite_entitlements")
      .insert({
        parent_email: parentEmail,
        student_email: studentEmail,
        student_name: studentName,
        stripe_customer_id: customer.id,
        status: "pending",
      })
      .select("id")
      .single();

    if (insertError || !pendingRow) {
      return NextResponse.json(
        { error: "Could not start checkout. Confirm elite_entitlements migration is applied." },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customer.id,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/elite/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/elite?checkout=cancel`,
      client_reference_id: pendingRow.id,
      metadata: {
        entitlement_id: pendingRow.id,
        parent_email: parentEmail,
        student_email: studentEmail,
        student_name: studentName,
        product: "studentstack_elite",
      },
      subscription_data: {
        metadata: {
          entitlement_id: pendingRow.id,
          parent_email: parentEmail,
          student_email: studentEmail,
          student_name: studentName,
          product: "studentstack_elite",
        },
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Stripe did not return a checkout URL." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Checkout failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
