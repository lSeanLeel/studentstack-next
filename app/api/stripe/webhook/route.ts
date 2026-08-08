import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export const runtime = "nodejs";

function adminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    "";
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function POST(req: Request) {
  try {
    if (!isStripeConfigured()) {
      return NextResponse.json({ error: "Stripe not configured." }, { status: 503 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
    if (!webhookSecret) {
      return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET." }, { status: 503 });
    }

    const stripe = getStripe();
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing stripe-signature." }, { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    const supabase = adminSupabase();

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata?.supabase_user_id;
      if (userId) {
        await supabase.from("profiles").upsert({
          id: userId,
          membership_tier: "elite",
          membership_status: "active",
          stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
        });
      }
    }

    if (
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const subscription = event.data.object;
      const userId = subscription.metadata?.supabase_user_id;
      if (userId) {
        const active = subscription.status === "active" || subscription.status === "trialing";
        await supabase.from("profiles").upsert({
          id: userId,
          membership_tier: active ? "elite" : "free",
          membership_status: active ? "active" : subscription.status === "past_due" ? "past_due" : "canceled",
          stripe_customer_id: typeof subscription.customer === "string" ? subscription.customer : null,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Webhook error.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
