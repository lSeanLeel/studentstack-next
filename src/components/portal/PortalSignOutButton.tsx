"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { jakartaSans } from "@/app/fonts";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function PortalSignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          await fetch("/api/portal/demo-logout", { method: "POST" });
          try {
            const supabase = createSupabaseBrowserClient();
            await supabase.auth.signOut();
          } catch {
            // Supabase may be unset in demo/preview environments.
          }
          router.replace("/login");
          router.refresh();
        } finally {
          setBusy(false);
        }
      }}
      className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-slate-600 transition hover:bg-black/[0.04] hover:text-slate-900 disabled:opacity-50 ${jakartaSans.className}`}
    >
      {busy ? "…" : "Sign out"}
    </button>
  );
}
