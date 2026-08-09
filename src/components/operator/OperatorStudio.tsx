"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Eye,
  Loader2,
  Lock,
  LogOut,
  Newspaper,
  Palette,
  Send,
  Sparkles,
  Wand2,
} from "lucide-react";
import { extractSubtitleFromMarkdown, extractTitleFromMarkdown } from "@/lib/markdown-to-html";
import { FOCUS_PILLARS, NEWSLETTER_ANGLE, buildAngleSeed, type FocusPillarId } from "@/lib/newsletter/angle";
import {
  DESIGN_PRESETS,
  SAMPLE_DAILY_MARKDOWN,
  buildBeehiivHtml,
  createDefaultDesign,
  type NewsletterDesign,
} from "@/lib/newsletter/beehiiv-template";

type StatusKind = "idle" | "loading" | "success" | "error";
type StatusAlert = { kind: StatusKind; message: string };
type EnvStatus = {
  cwd: string;
  envLocalExists: boolean;
  anthropicApiKey: boolean;
  beehiivApiKey: boolean;
  beehiivPublicationId: boolean;
  adminPassword: boolean;
};
type StepId = "brief" | "edit" | "design" | "export";

const LS_KEY = "ss-operator-daily-draft-v1";
const STEPS: { id: StepId; label: string; n: string }[] = [
  { id: "brief", label: "Brief", n: "1" },
  { id: "edit", label: "Tailor", n: "2" },
  { id: "design", label: "Design", n: "3" },
  { id: "export", label: "Beehiiv HTML", n: "4" },
];

function todayLabel() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function OperatorStudio() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [envStatus, setEnvStatus] = useState<EnvStatus | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [step, setStep] = useState<StepId>("brief");
  const [focusPillar, setFocusPillar] = useState<FocusPillarId>("organization");
  const [issueDate, setIssueDate] = useState(todayLabel);
  const [seedText, setSeedText] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [design, setDesign] = useState<NewsletterDesign>(() => createDefaultDesign("Organization"));
  const [copied, setCopied] = useState(false);

  const [generateStatus, setGenerateStatus] = useState<StatusAlert>({ kind: "idle", message: "" });
  const [pushStatus, setPushStatus] = useState<StatusAlert>({ kind: "idle", message: "" });

  const html = useMemo(() => {
    if (!markdown.trim()) return "";
    return buildBeehiivHtml(markdown, {
      ...design,
      pillarLabel: FOCUS_PILLARS.find((p) => p.id === focusPillar)?.label ?? design.pillarLabel,
    });
  }, [markdown, design, focusPillar]);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/auth");
      const data = (await res.json()) as { authorized?: boolean; env?: EnvStatus };
      setAuthorized(Boolean(data.authorized));
      setEnvStatus(data.env ?? null);
    } catch {
      setAuthorized(false);
      setEnvStatus(null);
    }
  }, []);

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!authorized) return;
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) {
        setSeedText(buildAngleSeed("organization"));
        return;
      }
      const saved = JSON.parse(raw) as {
        focusPillar?: FocusPillarId;
        issueDate?: string;
        seedText?: string;
        title?: string;
        subtitle?: string;
        markdown?: string;
        design?: NewsletterDesign;
        step?: StepId;
      };
      if (saved.focusPillar) setFocusPillar(saved.focusPillar);
      if (saved.issueDate) setIssueDate(saved.issueDate);
      if (saved.seedText) setSeedText(saved.seedText);
      if (saved.title) setTitle(saved.title);
      if (saved.subtitle) setSubtitle(saved.subtitle);
      if (saved.markdown) setMarkdown(saved.markdown);
      if (saved.design) setDesign(saved.design);
      if (saved.step) setStep(saved.step);
    } catch {
      setSeedText(buildAngleSeed("organization"));
    }
  }, [authorized]);

  useEffect(() => {
    if (!authorized) return;
    try {
      localStorage.setItem(
        LS_KEY,
        JSON.stringify({ focusPillar, issueDate, seedText, title, subtitle, markdown, design, step })
      );
    } catch {
      /* ignore */
    }
  }, [authorized, focusPillar, issueDate, seedText, title, subtitle, markdown, design, step]);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setLoginError(data.error ?? "Invalid username or password.");
        return;
      }
      setAuthorized(true);
      setPassword("");
      await checkAuth();
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
    setGenerateStatus({ kind: "loading", message: "Drafting today’s organizing issue…" });
    try {
      const res = await fetch("/api/admin/generate-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seedText: seedText.trim(),
          focusPillar,
          issueDate: issueDate.trim(),
        }),
      });
      const data = (await res.json()) as { markdown?: string; error?: string };
      if (!res.ok) {
        setGenerateStatus({ kind: "error", message: data.error ?? "Generation failed." });
        return;
      }
      const nextMarkdown = data.markdown ?? "";
      setMarkdown(nextMarkdown);
      setTitle(extractTitleFromMarkdown(nextMarkdown));
      setSubtitle(extractSubtitleFromMarkdown(nextMarkdown));
      setDesign((d) => ({
        ...d,
        pillarLabel: FOCUS_PILLARS.find((p) => p.id === focusPillar)?.label ?? d.pillarLabel,
      }));
      setGenerateStatus({
        kind: "success",
        message: "Draft ready — tailor the Parent note, then design & copy Beehiiv HTML.",
      });
      setStep("edit");
    } catch {
      setGenerateStatus({ kind: "error", message: "Network error while generating." });
    }
  }

  function loadSampleDraft() {
    setMarkdown(SAMPLE_DAILY_MARKDOWN);
    setTitle(extractTitleFromMarkdown(SAMPLE_DAILY_MARKDOWN));
    setSubtitle(extractSubtitleFromMarkdown(SAMPLE_DAILY_MARKDOWN));
    setFocusPillar("organization");
    setDesign(createDefaultDesign("Organization"));
    setGenerateStatus({ kind: "success", message: "Sample draft loaded so you can tailor & design without API keys." });
    setStep("edit");
  }

  async function handleCopyHtml() {
    if (!html) return;
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setPushStatus({ kind: "error", message: "Could not copy HTML — select the code box manually." });
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
          htmlContent: html,
        }),
      });
      const data = (await res.json()) as { postId?: string; error?: string };
      if (!res.ok) {
        setPushStatus({ kind: "error", message: data.error ?? "Beehiiv push failed." });
        return;
      }
      setPushStatus({
        kind: "success",
        message: `Draft saved in Beehiiv (post id: ${data.postId}). Open app.beehiiv.com to review & send.`,
      });
    } catch {
      setPushStatus({ kind: "error", message: "Network error while pushing to Beehiiv." });
    }
  }

  function applyPreset(presetId: string) {
    const preset = DESIGN_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setDesign((d) => ({
      ...preset.design,
      brandName: d.brandName,
      pillarLabel: FOCUS_PILLARS.find((p) => p.id === focusPillar)?.label ?? d.pillarLabel,
      footerNote: d.footerNote,
    }));
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
            Operator
          </div>
          <h1 className="text-3xl font-black text-white">Newsletter studio</h1>
          <p className="mt-3 text-sm font-medium text-slate-400">
            Sign in to draft today’s StudentStack Daily — AI for student organization.
          </p>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-black uppercase tracking-widest text-slate-500">
                Username
              </span>
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="test"
                className="w-full rounded-2xl border-2 border-slate-700 bg-slate-950 px-4 py-3 font-semibold text-white outline-none transition focus:border-sky-500"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-black uppercase tracking-widest text-slate-500">
                Password
              </span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full rounded-2xl border-2 border-slate-700 bg-slate-950 px-4 py-3 font-semibold text-white outline-none transition focus:border-sky-500"
              />
            </label>
            {loginError ? <StatusBanner kind="error" message={loginError} /> : null}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 text-sm font-black uppercase tracking-widest text-white shadow-[0_8px_0_0_#0369a1] transition hover:-translate-y-0.5 hover:bg-sky-400 active:translate-y-0.5"
            >
              <Lock className="h-4 w-4" />
              Sign in
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
    <main className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
        <header className="flex flex-wrap items-start justify-between gap-4 rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-sky-400">Operator portal · v4</p>
            <h1 className="mt-1 text-3xl font-black text-white">Daily newsletter studio</h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-slate-400">{NEWSLETTER_ANGLE.promise}</p>
            <p className="mt-1 max-w-2xl text-xs font-medium text-slate-500">{NEWSLETTER_ANGLE.discovery}</p>
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

        <nav className="flex flex-wrap gap-2" aria-label="Daily flow steps">
          {STEPS.map((s) => {
            const active = step === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(s.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition ${
                  active
                    ? "bg-sky-500 text-white"
                    : "border border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                }`}
              >
                <span className="opacity-70">{s.n}</span>
                {s.label}
              </button>
            );
          })}
        </nav>

        {envStatus && !envStatus.anthropicApiKey ? (
          <div className="rounded-[1.5rem] border border-amber-500/40 bg-amber-500/10 px-5 py-4 text-sm font-semibold text-amber-100">
            <strong className="font-black text-amber-50">ANTHROPIC_API_KEY not loaded.</strong> You can still load a
            sample draft, tailor copy, design the look, and copy Beehiiv HTML. Add the key to generate live drafts.
          </div>
        ) : null}

        {step === "brief" ? (
          <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-violet-400" />
              <h2 className="text-xl font-black text-white">1. Today’s brief</h2>
            </div>
            <p className="mb-5 text-sm font-medium text-slate-400">
              Pick the organizing pillar, paste research notes, generate a draft for free daily parents (community +
              Instagram discovery). Soft Elite inquiry only — never a portal upsell.
            </p>

            <label className="mb-4 block">
              <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-400">Issue date</span>
              <input
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full max-w-md rounded-2xl border-2 border-slate-700 bg-slate-950 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-sky-500"
              />
            </label>

            <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">Focus pillar</p>
            <div className="mb-5 grid gap-3 sm:grid-cols-3">
              {FOCUS_PILLARS.map((p) => {
                const active = focusPillar === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setFocusPillar(p.id);
                      setSeedText((prev) => {
                        if (!prev.trim() || prev.includes("Focus pillar:")) {
                          return buildAngleSeed(p.id, issueDate);
                        }
                        return prev;
                      });
                      setDesign((d) => ({ ...d, pillarLabel: p.label }));
                    }}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      active
                        ? "border-sky-400 bg-sky-500/15 text-white"
                        : "border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    <p className="text-sm font-black">{p.label}</p>
                    <p className="mt-1 text-xs font-medium leading-relaxed text-slate-400">{p.blurb}</p>
                  </button>
                );
              })}
            </div>

            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-400">
                Seed / research dump
              </span>
              <textarea
                value={seedText}
                onChange={(e) => setSeedText(e.target.value)}
                rows={8}
                placeholder="Links, headlines, tool notes, parent anecdotes…"
                className="w-full rounded-2xl border-2 border-slate-700 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-100 outline-none transition focus:border-violet-500"
              />
            </label>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void handleGenerate()}
                disabled={!seedText.trim() || generateStatus.kind === "loading"}
                className="inline-flex items-center gap-2 rounded-2xl bg-violet-500 px-6 py-3 text-sm font-black uppercase tracking-widest text-white shadow-[0_8px_0_0_#6d28d9] transition hover:-translate-y-0.5 hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {generateStatus.kind === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Newspaper className="h-4 w-4" />
                )}
                Generate draft
              </button>
              <button
                type="button"
                onClick={() => setSeedText(buildAngleSeed(focusPillar, issueDate))}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-600 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-300 hover:border-slate-400"
              >
                <Wand2 className="h-4 w-4" />
                Reset seed to angle
              </button>
              <button
                type="button"
                onClick={loadSampleDraft}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-600 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-300 hover:border-slate-400"
              >
                Load sample draft
              </button>
            </div>
            {generateStatus.kind !== "idle" ? (
              <div className="mt-4">
                <StatusBanner kind={generateStatus.kind} message={generateStatus.message} />
              </div>
            ) : null}
          </section>
        ) : null}

        {step === "edit" ? (
          <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-sky-400" />
              <h2 className="text-xl font-black text-white">2. Tailor the copy</h2>
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
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-400">
                  Subtitle / preheader
                </span>
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
                Markdown body (edit Parent note · keep organizing angle)
              </span>
              <textarea
                value={markdown}
                onChange={(e) => {
                  setMarkdown(e.target.value);
                  const t = extractTitleFromMarkdown(e.target.value);
                  if (t) setTitle(t);
                }}
                rows={20}
                placeholder="Generate a draft first, or load the sample…"
                className="w-full rounded-2xl border-2 border-slate-700 bg-slate-950 px-4 py-3 font-mono text-sm leading-relaxed text-slate-100 outline-none focus:border-sky-500"
              />
            </label>
            <button
              type="button"
              onClick={() => setStep("design")}
              disabled={!markdown.trim()}
              className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 text-sm font-black uppercase tracking-widest text-white shadow-[0_8px_0_0_#0369a1] disabled:opacity-50"
            >
              <Palette className="h-4 w-4" />
              Continue to design
            </button>
          </section>
        ) : null}

        {step === "design" ? (
          <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Palette className="h-5 w-5 text-amber-400" />
                <h2 className="text-xl font-black text-white">3. Design the look</h2>
              </div>
              <p className="mb-4 text-sm font-medium text-slate-400">
                Presets control the Beehiiv paste HTML. Preview updates live.
              </p>
              <div className="space-y-3">
                {DESIGN_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset.id)}
                    className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                      design.presetId === preset.id
                        ? "border-amber-400/70 bg-amber-500/10"
                        : "border-slate-700 bg-slate-950 hover:border-slate-500"
                    }`}
                  >
                    <span
                      className="mt-0.5 h-8 w-8 shrink-0 rounded-xl"
                      style={{ background: preset.design.accent }}
                      aria-hidden
                    />
                    <span>
                      <span className="block text-sm font-black text-white">{preset.label}</span>
                      <span className="mt-0.5 block text-xs font-medium text-slate-400">{preset.hint}</span>
                    </span>
                  </button>
                ))}
              </div>
              <label className="mt-5 block">
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-400">
                  Brand name in header
                </span>
                <input
                  value={design.brandName}
                  onChange={(e) => setDesign((d) => ({ ...d, brandName: e.target.value }))}
                  className="w-full rounded-2xl border-2 border-slate-700 bg-slate-950 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-amber-500"
                />
              </label>
              <label className="mt-4 block">
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-400">
                  Footer note
                </span>
                <textarea
                  value={design.footerNote}
                  onChange={(e) => setDesign((d) => ({ ...d, footerNote: e.target.value }))}
                  rows={3}
                  className="w-full rounded-2xl border-2 border-slate-700 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-100 outline-none focus:border-amber-500"
                />
              </label>
              <button
                type="button"
                onClick={() => setStep("export")}
                disabled={!markdown.trim()}
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 text-sm font-black uppercase tracking-widest text-white shadow-[0_8px_0_0_#0369a1] disabled:opacity-50"
              >
                <Eye className="h-4 w-4" />
                Review &amp; export HTML
              </button>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-white">
              <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-500">
                Live preview
              </div>
              <iframe title="Newsletter preview" className="h-[36rem] w-full bg-white" srcDoc={html || "<p style='padding:24px;font-family:sans-serif;color:#64748b'>Generate or load a draft to preview.</p>"} />
            </div>
          </section>
        ) : null}

        {step === "export" ? (
          <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Send className="h-5 w-5 text-emerald-400" />
              <h2 className="text-xl font-black text-white">4. Copy Beehiiv HTML</h2>
            </div>
            <p className="mb-4 text-sm font-medium text-slate-400">
              End of daily flow: copy this HTML into Beehiiv (or push a draft if keys are set). Title for Beehiiv:{" "}
              <span className="font-bold text-slate-200">{title || "—"}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void handleCopyHtml()}
                disabled={!html}
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black uppercase tracking-widest text-white shadow-[0_8px_0_0_#047857] disabled:opacity-50"
              >
                {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy HTML for Beehiiv"}
              </button>
              <button
                type="button"
                onClick={() => void handlePush()}
                disabled={!title.trim() || !html || pushStatus.kind === "loading"}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-600 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-200 hover:border-slate-400 disabled:opacity-50"
              >
                {pushStatus.kind === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Push draft to Beehiiv API
              </button>
            </div>
            {pushStatus.kind !== "idle" ? (
              <div className="mt-4">
                <StatusBanner kind={pushStatus.kind} message={pushStatus.message} />
              </div>
            ) : null}
            <pre className="mt-5 max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-2xl border border-slate-700 bg-slate-950 p-4 text-xs leading-relaxed text-slate-300">
              {html || "No HTML yet — generate or load a draft first."}
            </pre>
          </section>
        ) : null}

        <p className="pb-6 text-center text-xs text-slate-600">
          Flow: login → brief → generate → tailor → design → copy HTML into Beehiiv. Draft autosaves in this browser.
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
