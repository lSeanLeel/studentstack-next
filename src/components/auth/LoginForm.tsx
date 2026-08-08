"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { BrandWordmark } from "@/components/BrandWordmark";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/portal";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
        return;
      }
      router.replace(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className={`min-h-screen bg-[#f8fafc] px-4 py-10 sm:px-6 ${jakartaSans.className}`}>
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="inline-flex" aria-label="StudentStack home">
          <BrandWordmark compact />
        </Link>

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)] sm:p-8">
          <h1 className={`text-2xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}>
            Student portal
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-600">
            Students sign in here for Elite toolkit and resource access. Parents buy Elite separately.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
            <div>
              <label htmlFor="login-email" className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-200"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-200"
              />
            </div>

            {error ? (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={busy}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm font-medium text-slate-500">
            New here?{" "}
            <Link href="/signup" className="font-bold text-sky-700 hover:text-sky-900">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
