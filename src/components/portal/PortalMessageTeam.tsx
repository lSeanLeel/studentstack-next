"use client";

import React, { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

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
          ? "rounded-[1.75rem] border border-slate-200 bg-white p-5 sm:p-6"
          : "rounded-[2rem] border-2 border-slate-200 bg-white p-6 shadow-[0_14px_0_0_rgba(15,23,42,0.05)] sm:p-8"
      }
      aria-labelledby="message-team-heading"
    >
      <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 ${jakartaSans.className}`}>
        Student team
      </p>
      <h2
        id="message-team-heading"
        className={`mt-1 text-2xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}
      >
        Message the team
      </h2>
      <p className={`mt-2 max-w-xl text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
        Ask about AI for school, toolkit workflows, resources, or certifications. College students on the StudentStack
        team read member messages.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-3" noValidate>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">From</p>
            <p className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
              {defaultName}
              {defaultEmail ? ` · ${defaultEmail}` : ""}
            </p>
          </div>
          <div>
            <label
              htmlFor="portal-msg-subject"
              className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500"
            >
              Subject
            </label>
            <input
              id="portal-msg-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              maxLength={120}
              placeholder="Toolkit question, resource help…"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-200"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="portal-msg-body"
            className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500"
          >
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
            placeholder="What are you working on, and how can we help?"
            className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-200"
          />
        </div>

        {error ? (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
            {error}
          </p>
        ) : null}
        {sent ? (
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
            Sent. The team will follow up at your member email.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
          {busy ? "Sending…" : "Send to team"}
        </button>
      </form>
    </section>
  );
}
