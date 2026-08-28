"use client";

import React, { useState } from "react";
import { jakartaSans } from "@/app/fonts";
import { PortalEyebrow } from "@/components/portal/portal-ui";

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

  return (
    <section
      id="message-team"
      className={
        compact
          ? "rounded-[1.75rem] border-2 border-slate-200 bg-white p-5 shadow-[0_10px_0_0_rgba(15,23,42,0.05)] sm:p-6"
          : "rounded-[2rem] border-2 border-slate-200 bg-white p-6 shadow-[0_14px_0_0_rgba(15,23,42,0.06)] sm:p-8"
      }
      aria-labelledby="message-team-heading"
    >
      <PortalEyebrow>College team</PortalEyebrow>
      <h2
        id="message-team-heading"
        className={`mt-2 text-xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-2xl ${jakartaSans.className}`}
      >
        Ask the team
      </h2>
      <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
        Toolkit, resources, pathways, or school advice. Real students read member messages.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-3" noValidate>
        <div>
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">From</p>
          <p className="rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800">
            {defaultName}
            {defaultEmail ? ` · ${defaultEmail}` : ""}
          </p>
        </div>
        <div>
          <label htmlFor="portal-msg-subject" className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
            Subject
          </label>
          <input
            id="portal-msg-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            maxLength={120}
            placeholder="Toolkit question…"
            className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          />
        </div>
        <div>
          <label htmlFor="portal-msg-body" className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
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
            className="w-full resize-y rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          />
        </div>

        {error ? (
          <p className="rounded-2xl border-2 border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
            {error}
          </p>
        ) : null}
        {sent ? (
          <p className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
            Sent. We will follow up at your member email.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className={`inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3.5 text-[11px] font-black uppercase tracking-[0.14em] text-white shadow-[0_8px_0_0_rgba(15,23,42,0.2)] transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60 ${jakartaSans.className}`}
        >
          {busy ? "Sending…" : "Send to team"}
        </button>
      </form>
    </section>
  );
}
