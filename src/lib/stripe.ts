import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set. Add it to .env.local when you are ready for billing.");
  }
  return new Stripe(key, {
    apiVersion: "2026-07-29.dahlia",
  });
}

export function isStripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}
