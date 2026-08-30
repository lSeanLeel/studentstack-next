"use client";

import React, { useState } from "react";
import { jakartaSans } from "@/app/fonts";
import { PortalEyebrow, portalCard } from "@/components/portal/portal-ui";

export function PortalMessageTeam({
  defaultName,
  defaultEmail,
  compact = false,
}: {
  defaultName: string;
  defaultEmail: string;
  compact?: boolean;
}) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setSent(false);
    try {
      const res = await fetch("/api/portal/message-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error ?? "Could not send your message.");
        return;
      }
      setSent(true);
      setSubject("");
      setMessage("");
    } catch {
      setError("Network error. Try again or email advising@studentstack.info.");
    } finally {
      setBusy(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl bg-[#f5f5f7] px-4 py-3 text-sm font-medium text-slate-900 outline-none ring-1 ring-black/[0.06] transition focus:bg-white focus:ring-sky-500/30";

  return (
    <section
      id="message-team"
      className={`${portalCard} ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"}`}
      aria-labelledby="message-team-heading"
    >
      <PortalEyebrow>StudentStack team</PortalEyebrow>
      <h2
        id="message-team-heading"
        className={`mt-2 text-xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-2xl ${jakartaSans.className}`}
      >
        Ask the team
      </h2>
      <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-500 ${jakartaSans.className}`}>
        Toolkit, resources, pathways, or school advice. Real students read member messages.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-3" noValidate>
        <div>
          <p className={`mb-1.5 text-xs font-semibold text-slate-500 ${jakartaSans.className}`}>From</p>
          <p className={`rounded-2xl bg-[#f5f5f7] px-4 py-3 text-sm font-semibold text-slate-800 ring-1 ring-black/[0.06] ${jakartaSans.className}`}>
            {defaultName}
            {defaultEmail ? ` · ${defaultEmail}` : ""}
          </p>
        </div>
        <div>
          <label htmlFor="portal-msg-subject" className={`mb-1.5 block text-xs font-semibold text-slate-500 ${jakartaSans.className}`}>
            Subject
          </label>
          <input
            id="portal-msg-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            maxLength={120}
            placeholder="Toolkit question…"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="portal-msg-body" className={`mb-1.5 block text-xs font-semibold text-slate-500 ${jakartaSans.className}`}>
            Message
          </label>
          <textarea
            id="portal-msg-body"
            rows={compact ? 3 : 4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            minLength={10}
            maxLength={4000}
            placeholder="What are you working on?"
            className={`${inputClass} resize-y`}
          />
        </div>

        {error ? (
          <p className="rounded-2xl bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 ring-1 ring-rose-200/80">
            {error}
          </p>
        ) : null}
        {sent ? (
          <p className="rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800 ring-1 ring-emerald-200/80">
            Sent. We will follow up at your member email.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className={`inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98] disabled:opacity-60 ${jakartaSans.className}`}
        >
          {busy ? "Sending…" : "Send to team"}
        </button>
      </form>
    </section>
  );
}
