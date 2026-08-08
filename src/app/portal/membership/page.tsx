import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MembershipCheckoutButton } from "@/components/portal/MembershipCheckoutButton";
import { isStripeConfigured } from "@/lib/stripe";

export default async function PortalMembershipPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let tier = "free";
  let status = "inactive";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("membership_tier, membership_status")
      .eq("id", user.id)
      .maybeSingle();
    if (profile) {
      tier = profile.membership_tier ?? "free";
      status = profile.membership_status ?? "inactive";
    }
  }

  const stripeReady = isStripeConfigured();

  return (
    <div className="max-w-2xl">
      <h1 className={`text-3xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}>
        Membership
      </h1>
      <p className={`mt-2 text-sm font-medium text-slate-600 sm:text-base ${jakartaSans.className}`}>
        Paid membership unlocks the deeper StudentStack experience inside this portal. Pricing and Stripe products can be
        connected when you are ready.
      </p>

      <div className="mt-8 rounded-[1.75rem] border border-slate-100 bg-white p-6">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Current plan</p>
        <p className={`mt-2 text-2xl font-semibold text-slate-900 ${fredokaHeadline.className}`}>
          {tier === "elite" ? "StudentStack Elite" : "Free"}
        </p>
        <p className="mt-1 text-sm font-medium text-slate-500">Status: {status}</p>

        <div className="mt-6">
          {tier === "elite" && status === "active" ? (
            <p className={`text-sm font-medium text-emerald-700 ${jakartaSans.className}`}>
              Your membership is active. Course and certification access follows this entitlement.
            </p>
          ) : (
            <>
              <MembershipCheckoutButton disabled={!stripeReady} />
              {!stripeReady ? (
                <p className="mt-3 text-xs font-medium text-slate-500">
                  Add `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ELITE`, and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to enable
                  checkout.
                </p>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
