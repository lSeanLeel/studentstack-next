"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Download, Loader2, Lock, Mail, RefreshCw } from "lucide-react";
import { APPLICATION_STATUSES, type ApplicationStatus, outreachEmail } from "@/lib/program";

type Application = {
  id: string;
  cohort: string;
  parent_name: string;
  parent_email: string;
  parent_phone: string | null;
  student_name: string;
  student_grade: string;
  school: string | null;
  goals: string;
  ai_use: string;
  heard_from: string | null;
  utm: string | null;
  newsletter_opt_in: boolean;
  status: ApplicationStatus;
  notes: string | null;
  contacted_at: string | null;
  created_at: string;
};

const STATUS_STYLE: Record<ApplicationStatus, string> = {
  new: "bg-sky-500/15 text-sky-300",
  contacted: "bg-amber-500/15 text-amber-300",
  accepted: "bg-violet-500/15 text-violet-300",
  enrolled: "bg-emerald-500/15 text-emerald-300",
  waitlisted: "bg-slate-500/20 text-slate-300",
  declined: "bg-rose-500/15 text-rose-300",
};

function LoginCard({ onDone }: { onDone: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) onDone();
    else setError(((await res.json().catch(() => ({}))) as { error?: string }).error ?? "Sign in failed.");
  }
  return (
    <form onSubmit={submit} className="mx-auto mt-24 w-full max-w-sm space-y-3 rounded-3xl border border-slate-800 bg-slate-900 p-7">
      <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-sky-300">
        <Lock className="h-4 w-4" /> Team only
      </p>
      <h1 className="text-2xl font-black text-white">Applications</h1>
      <input className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-semibold text-white outline-none focus:border-sky-500" placeholder="Username" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-semibold text-white outline-none focus:border-sky-500" placeholder="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error ? <p className="text-sm font-bold text-rose-400">{error}</p> : null}
      <button className="w-full rounded-xl bg-sky-500 py-3 text-sm font-black uppercase tracking-widest text-white hover:bg-sky-400">Sign in</button>
    </form>
  );
}

export function ApplicationsInbox() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<ApplicationStatus | "all">("new");
  const [openId, setOpenId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/applications", { cache: "no-store" });
    const data = (await res.json().catch(() => ({}))) as { applications?: Application[]; error?: string };
    if (res.status === 401) setAuthorized(false);
    else if (!res.ok) setError(data.error ?? "Could not load applications.");
    else {
      setAuthorized(true);
      setApps(data.applications ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function update(id: string, patch: { status?: ApplicationStatus; notes?: string }) {
    setApps((list) => list.map((a) => (a.id === id ? { ...a, ...patch } : a)));
    const res = await fetch("/api/admin/applications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    if (!res.ok) setError("Update failed. Refresh and try again.");
  }

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: apps.length };
    for (const s of APPLICATION_STATUSES) c[s] = apps.filter((a) => a.status === s).length;
    return c;
  }, [apps]);

  const shown = filter === "all" ? apps : apps.filter((a) => a.status === filter);

  if (authorized === false) return <LoginCard onDone={load} />;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-sky-400">StudentStack team</p>
          <h1 className="mt-1 text-3xl font-black text-white">Applications</h1>
          <p className="mt-1 text-sm font-medium text-slate-400">
            Review, reach out from the StudentStack email, then mark each family as they move to enrolled.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-300 hover:bg-slate-800">
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
          <a href="/api/admin/applications?format=csv" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-300 hover:bg-slate-800">
            <Download className="h-4 w-4" /> CSV
          </a>
        </div>
      </header>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["all", ...APPLICATION_STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest ${
              filter === s ? "bg-white text-slate-900" : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {s} · {counts[s] ?? 0}
          </button>
        ))}
      </div>

      {error ? <p className="mt-4 rounded-xl bg-rose-500/10 px-4 py-3 text-sm font-bold text-rose-300">{error}</p> : null}
      {loading && !apps.length ? <Loader2 className="mx-auto mt-16 h-8 w-8 animate-spin text-sky-400" /> : null}
      {!loading && authorized && !shown.length ? (
        <p className="mt-16 text-center text-sm font-semibold text-slate-500">No applications here yet.</p>
      ) : null}

      <ul className="mt-6 space-y-3">
        {shown.map((a) => {
          const mail = outreachEmail({ parentName: a.parent_name, studentName: a.student_name, cohort: a.cohort });
          const href = `mailto:${a.parent_email}?subject=${encodeURIComponent(mail.subject)}&body=${encodeURIComponent(mail.body)}`;
          const open = openId === a.id;
          return (
            <li key={a.id} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <button onClick={() => setOpenId(open ? null : a.id)} className="text-left">
                  <p className="text-lg font-black text-white">
                    {a.student_name} <span className="font-semibold text-slate-400">· {a.student_grade}</span>
                  </p>
                  <p className="text-sm font-semibold text-slate-400">
                    {a.parent_name} · {a.parent_email}
                    {a.parent_phone ? ` · ${a.parent_phone}` : ""}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    {new Date(a.created_at).toLocaleString()} · {a.cohort}
                    {a.heard_from ? ` · via ${a.heard_from}` : ""}
                    {a.utm ? ` · ${a.utm}` : ""}
                  </p>
                </button>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-widest ${STATUS_STYLE[a.status]}`}>{a.status}</span>
                  <a
                    href={href}
                    onClick={() => a.status === "new" && update(a.id, { status: "contacted" })}
                    className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-xs font-black uppercase tracking-widest text-white hover:bg-sky-400"
                  >
                    <Mail className="h-4 w-4" /> Reach out
                  </a>
                  <select
                    value={a.status}
                    onChange={(e) => update(a.id, { status: e.target.value as ApplicationStatus })}
                    className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-bold text-slate-200"
                    aria-label="Status"
                  >
                    {APPLICATION_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {open ? (
                <div className="mt-4 grid gap-4 border-t border-slate-800 pt-4 text-sm text-slate-300 md:grid-cols-2">
                  <div className="space-y-2">
                    <p><span className="font-black text-slate-500">School:</span> {a.school || "—"}</p>
                    <p><span className="font-black text-slate-500">AI use today:</span> {a.ai_use}</p>
                    <p><span className="font-black text-slate-500">Newsletter:</span> {a.newsletter_opt_in ? "Yes" : "No"}</p>
                    <p className="whitespace-pre-wrap"><span className="font-black text-slate-500">Goals:</span> {a.goals}</p>
                  </div>
                  <label className="block">
                    <span className="mb-1 block text-xs font-black uppercase tracking-widest text-slate-500">Team notes</span>
                    <textarea
                      defaultValue={a.notes ?? ""}
                      onBlur={(e) => e.target.value !== (a.notes ?? "") && update(a.id, { notes: e.target.value })}
                      className="min-h-[120px] w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white outline-none focus:border-sky-500"
                    />
                  </label>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
