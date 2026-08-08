"use client";

import React, { useState } from "react";

export function MembershipCheckoutButton({ disabled }: { disabled?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <button
        type="button"
        disabled={disabled || busy}
        onClick={async () => {
          setBusy(true);
          setError(null);
          try {
            const res = await fetch("/api/stripe/checkout", { method: "POST" });
            const data = (await res.json()) as { url?: string; error?: string };
            if (!res.ok || !data.url) {
              setError(data.error || "Checkout is not available yet.");
              return;
            }
            window.location.href = data.url;
          } catch (e) {
            setError(e instanceof Error ? e.message : "Checkout failed.");
          } finally {
            setBusy(false);
          }
        }}
        className="inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {busy ? "Redirecting…" : "Continue to membership"}
      </button>
      {error ? <p className="mt-2 text-xs font-medium text-rose-600">{error}</p> : null}
    </div>
  );
}
