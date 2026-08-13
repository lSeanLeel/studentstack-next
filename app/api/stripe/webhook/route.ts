import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/portal/entitlements";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export const runtime = "nodejs";

async function activateEntitlement(opts: {
  entitlementId?: string | null;
  studentEmail?: string | null;
  parentEmail?: string | null;
  studentName?: string | null;
  customerId?: string | null;
  subscriptionId?: string | null;
  status: "active" | "past_due" | "canceled";
}) {
  const supabase = getServiceSupabase();
  const studentEmail = (opts.studentEmail || "").trim().toLowerCase();
  const parentEmail = (opts.parentEmail || "").trim().toLowerCase();

  if (opts.entitlementId) {
    await supabase
      .from("elite_entitlements")
      .update({
        status: opts.status,
        parent_email: parentEmail || undefined,
        student_email: studentEmail || undefined,
        student_name: opts.studentName || undefined,
        stripe_customer_id: opts.customerId,
        stripe_subscription_id: opts.subscriptionId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", opts.entitlementId);
  }

  if (!studentEmail) return;

  if (opts.status === "active") {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", studentEmail)
      .maybeSingle();

    if (profile?.id) {
      await supabase.from("profiles").upsert({
        id: profile.id,
        email: studentEmail,
        full_name: opts.studentName,
        membership_tier: "elite",
        membership_status: "active",
      });
    } else {
      const origin = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
      await supabase.auth.admin.inviteUserByEmail(studentEmail, {
        data: {
          full_name: opts.studentName,
          parent_email: parentEmail,
          product: "studentstack_elite",
        },
        redirectTo: `${origin}/login`,
      });
    }
  }

  if (opts.status === "canceled" || opts.status === "past_due") {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", studentEmail)
      .maybeSingle();
    if (profile?.id) {
      await supabase
        .from("profiles")
        .update({
          membership_tier: opts.status === "past_due" ? "elite" : "free",
          membership_status: opts.status,
        })
        .eq("id", profile.id);
    }
  }
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

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      await activateEntitlement({
        entitlementId: session.metadata?.entitlement_id || session.client_reference_id,
        studentEmail: session.metadata?.student_email,
        parentEmail: session.metadata?.parent_email,
        studentName: session.metadata?.student_name,
        customerId: typeof session.customer === "string" ? session.customer : null,
        subscriptionId: typeof session.subscription === "string" ? session.subscription : null,
        status: "active",
      });
    }

    if (
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const subscription = event.data.object;
      const active = subscription.status === "active" || subscription.status === "trialing";
      const pastDue = subscription.status === "past_due";
      await activateEntitlement({
        entitlementId: subscription.metadata?.entitlement_id,
        studentEmail: subscription.metadata?.student_email,
        parentEmail: subscription.metadata?.parent_email,
        studentName: subscription.metadata?.student_name,
        customerId: typeof subscription.customer === "string" ? subscription.customer : null,
        subscriptionId: subscription.id,
        status: active ? "active" : pastDue ? "past_due" : "canceled",
      });
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Webhook error.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
