"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
          const supabase = createSupabaseBrowserClient();
          await supabase.auth.signOut();
          router.replace("/login");
          router.refresh();
        } finally {
          setBusy(false);
        }
      }}
      className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-slate-700 transition hover:border-sky-200 hover:text-sky-700 disabled:opacity-60"
    >
      {busy ? "…" : "Sign out"}
    </button>
  );
}
