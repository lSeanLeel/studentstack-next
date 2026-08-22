import { NextResponse } from "next/server";
import { z } from "zod";
import { getServiceSupabase } from "@/lib/portal/entitlements";
import { isSupabaseConfigured } from "@/lib/supabase-server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { joinApplicationSchema, studentDisplayName } from "@/lib/join/types";
import { provisionEliteStudentLogin } from "@/lib/portal/provision-login";
import { persistInquiryFallback } from "@/lib/inquiry-fallback";

export const runtime = "nodejs";

const bodySchema = joinApplicationSchema.extend({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(72, "Password is too long."),
});

function membershipPriceId() {
  return (
    process.env.STRIPE_PRICE_ELITE?.trim() ||
    process.env.STRIPE_PRICE_MEMBERSHIP?.trim() ||
    process.env.STRIPE_PRICE_DAILY?.trim() ||
    ""
  );
}

/** Start Stripe Checkout after application + password. Stores chosen password for webhook provisioning. */
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
        { error: parsed.error.issues[0]?.message ?? "Invalid request." },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const parentEmail = data.parentEmail.toLowerCase();
    const studentEmail = data.studentEmail.toLowerCase();
    const studentName = studentDisplayName(data);
    const password = data.password;

    if (parentEmail === studentEmail) {
      return NextResponse.json(
        { error: "Student email (login) must be different from the parent billing email." },
        { status: 400 }
      );
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
    const message = [
      "COMMUNITY JOIN CHECKOUT",
      `Parent: ${data.parentFullName}`,
      data.parentPhone ? `Phone: ${data.parentPhone}` : null,
      `Student: ${studentName}`,
      `Student email: ${studentEmail}`,
      `Grade: ${data.studentGrade}`,
      data.studentSchool ? `School: ${data.studentSchool}` : null,
      data.intendedMajor ? `Intended major: ${data.intendedMajor}` : null,
      data.backgroundNote ? `Background: ${data.backgroundNote}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    // Soft path when Stripe is not configured: provision immediately if Supabase works (preview/dev).
    if (!isStripeConfigured() || !membershipPriceId()) {
      if (isSupabaseConfigured()) {
        const supabase = getServiceSupabase();
        const { data: pendingRow, error: insertError } = await supabase
          .from("elite_entitlements")
          .insert({
            parent_email: parentEmail,
            student_email: studentEmail,
            student_name: studentName,
            status: "active",
          })
          .select("id")
          .single();

        if (insertError || !pendingRow) {
          await persistInquiryFallback({
            source: "membership-register",
            name: data.parentFullName,
            email: parentEmail,
            message,
            createdAt: new Date().toISOString(),
          });
          return NextResponse.json(
            {
              error:
                "Billing is not connected yet. We saved your application. Email advising@studentstack.info to finish enrollment.",
            },
            { status: 503 }
          );
        }

        await supabase.from("elite_login_credentials").insert({
          entitlement_id: pendingRow.id,
          student_email: studentEmail,
          parent_email: parentEmail,
          student_name: studentName,
          temporary_password: password,
          delivered: false,
        });

        await supabase.from("contact_messages").insert({
          name: data.parentFullName,
          email: parentEmail,
          message,
        });

        await provisionEliteStudentLogin({
          entitlementId: pendingRow.id,
          studentEmail,
          parentEmail,
          studentName,
          password,
        });

        return NextResponse.json({
          url: `${origin}/join/success?demo=1&student=${encodeURIComponent(studentName)}&email=${encodeURIComponent(parentEmail)}`,
          demo: true,
        });
      }

      await persistInquiryFallback({
        source: "membership-register",
        name: data.parentFullName,
        email: parentEmail,
        message,
        createdAt: new Date().toISOString(),
      });
      return NextResponse.json(
        {
          error:
            "Billing is not connected yet. We saved your application. Email advising@studentstack.info to finish enrollment.",
        },
        { status: 503 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Membership database is not connected. Email advising@studentstack.info." },
        { status: 503 }
      );
    }

    const stripe = getStripe();
    const supabase = getServiceSupabase();
    const priceId = membershipPriceId();

    const customers = await stripe.customers.list({ email: parentEmail, limit: 1 });
    const customer =
      customers.data[0] ??
      (await stripe.customers.create({
        email: parentEmail,
        name: data.parentFullName,
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

    await supabase.from("elite_login_credentials").insert({
      entitlement_id: pendingRow.id,
      student_email: studentEmail,
      parent_email: parentEmail,
      student_name: studentName,
      temporary_password: password,
      delivered: false,
    });

    await supabase.from("contact_messages").insert({
      name: data.parentFullName,
      email: parentEmail,
      message,
    });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customer.id,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/join/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/join?step=payment&checkout=cancel`,
      client_reference_id: pendingRow.id,
      metadata: {
        entitlement_id: pendingRow.id,
        parent_email: parentEmail,
        student_email: studentEmail,
        student_name: studentName,
        product: "studentstack_membership",
      },
      subscription_data: {
        metadata: {
          entitlement_id: pendingRow.id,
          parent_email: parentEmail,
          student_email: studentEmail,
          student_name: studentName,
          product: "studentstack_membership",
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
