"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Lock,
  LogOut,
  Newspaper,
  Send,
  Sparkles,
} from "lucide-react";
import { extractSubtitleFromMarkdown, extractTitleFromMarkdown } from "@/lib/markdown-to-html";

type StatusKind = "idle" | "loading" | "success" | "error";

type StatusAlert = {
  kind: StatusKind;
  message: string;
};

export default function AdminPortalPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [seedText, setSeedText] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [markdown, setMarkdown] = useState("");

  const [generateStatus, setGenerateStatus] = useState<StatusAlert>({ kind: "idle", message: "" });
  const [pushStatus, setPushStatus] = useState<StatusAlert>({ kind: "idle", message: "" });

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/auth");
      const data = (await res.json()) as { authorized?: boolean };
      setAuthorized(Boolean(data.authorized));
    } catch {
      setAuthorized(false);
    }
  }, []);

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setLoginError(data.error ?? "Invalid password.");
        return;
      }
      setAuthorized(true);
      setPassword("");
    } catch {
      setLoginError("Could not reach auth service.");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" }).catch(() => undefined);
    setAuthorized(false);
    setGenerateStatus({ kind: "idle", message: "" });
    setPushStatus({ kind: "idle", message: "" });
  }

  async function handleGenerate() {
    setGenerateStatus({ kind: "loading", message: "Claude is drafting your issue…" });
    try {
      const res = await fetch("/api/admin/generate-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seedText: seedText.trim() }),
      });
      const data = (await res.json()) as { markdown?: string; error?: string; success?: boolean };
      if (!res.ok) {
        setGenerateStatus({ kind: "error", message: data.error ?? "Generation failed." });
        return;
      }
      const nextMarkdown = data.markdown ?? "";
      setMarkdown(nextMarkdown);
      setTitle(extractTitleFromMarkdown(nextMarkdown));
      setSubtitle(extractSubtitleFromMarkdown(nextMarkdown));
      setGenerateStatus({ kind: "success", message: "Draft generated — edit the Parent Note below before pushing." });
    } catch {
      setGenerateStatus({ kind: "error", message: "Network error while generating." });
    }
  }

  async function handlePush() {
    setPushStatus({ kind: "loading", message: "Creating Beehiiv draft…" });
    try {
      const res = await fetch("/api/admin/push-to-beehiiv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          subtitle: subtitle.trim(),
          markdownContent: markdown,
        }),
      });
      const data = (await res.json()) as { postId?: string; error?: string; success?: boolean };
      if (!res.ok) {
        setPushStatus({ kind: "error", message: data.error ?? "Beehiiv push failed." });
        return;
      }
      setPushStatus({
        kind: "success",
        message: `Draft saved in Beehiiv (post id: ${data.postId}). Open app.beehiiv.com to review.`,
      });
    } catch {
      setPushStatus({ kind: "error", message: "Network error while pushing to Beehiiv." });
    }
  }

  if (authorized === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <Loader2 className="h-8 w-8 animate-spin text-sky-400" aria-label="Loading" />
      </main>
    );
  }

  if (!authorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
        <motion.section
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-md rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-[0_24px_60px_-20px_rgba(14,165,233,0.35)]"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-sky-500/15 px-4 py-2 text-xs font-black uppercase tracking-widest text-sky-300">
            <Lock className="h-4 w-4" />
            Operator Portal
          </div>
          <h1 className="text-3xl font-black text-white">StudentStack Admin</h1>
          <p className="mt-3 text-sm font-medium text-slate-400">
            Enter the operator password to open the newsletter studio.
          </p>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Admin password"
              className="w-full rounded-2xl border-2 border-slate-700 bg-slate-950 px-4 py-3 font-semibold text-white outline-none transition focus:border-sky-500"
            />
            {loginError ? (
              <StatusBanner kind="error" message={loginError} />
            ) : null}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 text-sm font-black uppercase tracking-widest text-white shadow-[0_8px_0_0_#0369a1] transition hover:-translate-y-0.5 hover:bg-sky-400 active:translate-y-0.5"
            >
              <Lock className="h-4 w-4" />
              Unlock
            </button>
          </form>
          <Link href="/" className="mt-5 block text-center text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-300">
            Back to site
          </Link>
        </motion.section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)]">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-sky-400">Newsletter studio</p>
            <h1 className="mt-1 text-3xl font-black text-white">Operator Portal</h1>
            <p className="mt-2 text-sm font-medium text-slate-400">
              Generate with Claude · edit the Parent Note · push a Beehiiv draft
            </p>
          </div>
          <button
            type="button"
            onClick={() => void handleLogout()}
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-slate-300 transition hover:border-slate-500 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </header>

        <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-400" />
            <h2 className="text-xl font-black text-white">1. Seed research</h2>
          </div>
          <textarea
            value={seedText}
            onChange={(e) => setSeedText(e.target.value)}
            rows={5}
            placeholder="Paste today’s links, headlines, tool announcements, or research notes…"
            className="w-full rounded-2xl border-2 border-slate-700 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-100 outline-none transition focus:border-violet-500"
          />
          <button
            type="button"
            onClick={() => void handleGenerate()}
            disabled={!seedText.trim() || generateStatus.kind === "loading"}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-violet-500 px-6 py-3 text-sm font-black uppercase tracking-widest text-white shadow-[0_8px_0_0_#6d28d9] transition hover:-translate-y-0.5 hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {generateStatus.kind === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Newspaper className="h-4 w-4" />
            )}
            Generate Daily Issue
          </button>
          {generateStatus.kind !== "idle" ? (
            <div className="mt-4">
              <StatusBanner kind={generateStatus.kind} message={generateStatus.message} />
            </div>
          ) : null}
        </section>

        <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Send className="h-5 w-5 text-sky-400" />
            <h2 className="text-xl font-black text-white">2. Review &amp; push</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-400">Title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-2xl border-2 border-slate-700 bg-slate-950 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-sky-500"
                placeholder="Newsletter title"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-400">Subtitle</span>
              <input
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full rounded-2xl border-2 border-slate-700 bg-slate-950 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-sky-500"
                placeholder="Optional subtitle"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-400">
              Markdown preview (edit Parent Note)
            </span>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              rows={18}
              placeholder="Generated markdown will appear here…"
              className="w-full rounded-2xl border-2 border-slate-700 bg-slate-950 px-4 py-3 font-mono text-sm leading-relaxed text-slate-100 outline-none focus:border-sky-500"
            />
          </label>

          <button
            type="button"
            onClick={() => void handlePush()}
            disabled={!title.trim() || !markdown.trim() || pushStatus.kind === "loading"}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 text-sm font-black uppercase tracking-widest text-white shadow-[0_8px_0_0_#0369a1] transition hover:-translate-y-0.5 hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pushStatus.kind === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Push Draft to Beehiiv
          </button>
          {pushStatus.kind !== "idle" ? (
            <div className="mt-4">
              <StatusBanner kind={pushStatus.kind} message={pushStatus.message} />
            </div>
          ) : null}
        </section>

        <p className="text-center text-xs text-slate-600">
          Drafts land in Beehiiv as <code className="rounded bg-slate-900 px-1 text-slate-400">status: draft</code> — publish from the Beehiiv dashboard.
        </p>
      </div>
    </main>
  );
}

function StatusBanner({ kind, message }: { kind: StatusKind; message: string }) {
  if (kind === "loading") {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm font-semibold text-sky-200">
        <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin" />
        <span>{message}</span>
      </div>
    );
  }

  if (kind === "success") {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
        <span>{message}</span>
      </div>
    );
  }

  if (kind === "error") {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-200">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        <span>{message}</span>
      </div>
    );
  }

  return null;
}
