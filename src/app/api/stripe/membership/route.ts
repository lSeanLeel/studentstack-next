import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { loadServerEnv } from "@/lib/server-env";

export const runtime = "nodejs";

const bodySchema = z.object({
  parentEmail: z.string().trim().email("Enter a valid parent email."),
});

/**
 * StudentStack Daily membership checkout ($40/mo).
 * Uses STRIPE_PRICE_MEMBERSHIP when configured; otherwise marks pending for manual follow-up.
 */
export async function POST(req: Request) {
  loadServerEnv();

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

    const parentEmail = parsed.data.parentEmail.toLowerCase();

    if (!isStripeConfigured()) {
      return NextResponse.json({ pending: true, email: parentEmail });
    }

    const priceId = process.env.STRIPE_PRICE_MEMBERSHIP?.trim() || process.env.STRIPE_PRICE_DAILY?.trim();
    if (!priceId) {
      return NextResponse.json({ pending: true, email: parentEmail });
    }

    const stripe = getStripe();
    const origin = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

    const customers = await stripe.customers.list({ email: parentEmail, limit: 1 });
    const customer =
      customers.data[0] ??
      (await stripe.customers.create({
        email: parentEmail,
        metadata: { product: "studentstack_daily_membership" },
      }));

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customer.id,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/#join?membership=success`,
      cancel_url: `${origin}/#join?membership=cancel`,
      metadata: {
        parent_email: parentEmail,
        product: "studentstack_daily_membership",
      },
      subscription_data: {
        metadata: {
          parent_email: parentEmail,
          product: "studentstack_daily_membership",
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
