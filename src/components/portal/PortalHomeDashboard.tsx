"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Flame, Sparkles, Trophy } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import {
  PATH_TRACKS,
  PORTAL_PROGRESS,
  TODAY_QUESTS,
  type PortalQuest,
  type PortalTrack,
} from "@/lib/portal/quests";
import { PortalDailyUpdateDesk } from "@/components/portal/PortalDailyUpdateDesk";

function kindLabel(kind: PortalQuest["kind"] | PortalTrack["kind"]) {
  return kind === "ai-literacy" ? "AI literacy" : "High school";
}

function kindTone(kind: PortalQuest["kind"] | PortalTrack["kind"]) {
  return kind === "ai-literacy" ? "text-sky-600 bg-sky-50" : "text-emerald-700 bg-emerald-50";
}

function trackBar(accent: string) {
  if (accent === "emerald") return "bg-emerald-400";
  if (accent === "amber") return "bg-amber-400";
  return "bg-sky-400";
}

export function PortalHomeDashboard({ displayName }: { displayName: string }) {
  const xpPct = Math.min(100, Math.round((PORTAL_PROGRESS.xp / PORTAL_PROGRESS.xpToNext) * 100));

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border-2 border-slate-800 bg-slate-900 px-6 py-8 text-white shadow-[0_18px_0_0_rgba(15,23,42,0.18)] sm:rounded-[2.5rem] sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-emerald-400/15 blur-3xl" />

        <div className="relative z-10">
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-200 ${jakartaSans.className}`}>
            Member path
          </p>
          <h1 className={`mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl ${fredokaHeadline.className}`}>
            Welcome back, {displayName}
          </h1>
          <p className={`mt-3 max-w-xl text-sm font-medium leading-relaxed text-slate-300 sm:text-base ${jakartaSans.className}`}>
            StudentStack is AI for school, plus high school advice from students ahead of you. Level up literacy and
            judgment together.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-white">
              <Trophy className="h-3.5 w-3.5 text-amber-300" aria-hidden />
              Level {PORTAL_PROGRESS.level} · {PORTAL_PROGRESS.title}
            </span>
            <span className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-white">
              <Flame className="h-3.5 w-3.5 text-orange-300" aria-hidden />
              {PORTAL_PROGRESS.streakDays}-day streak
            </span>
          </div>

          <div className="mt-6 max-w-md">
            <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-slate-300">
              <span>XP to next level</span>
              <span>
                {PORTAL_PROGRESS.xp}/{PORTAL_PROGRESS.xpToNext}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-300"
                initial={{ width: 0 }}
                animate={{ width: `${xpPct}%` }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 ${jakartaSans.className}`}>
              Today&apos;s quests
            </p>
            <h2 className={`mt-1 text-2xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
              Earn XP with real school habits
            </h2>
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-3">
          {TODAY_QUESTS.map((quest, i) => (
            <motion.li
              key={quest.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.4 }}
            >
              <Link
                href={quest.href}
                className="group flex h-full flex-col rounded-[1.75rem] border-2 border-slate-200 bg-white p-5 shadow-[0_10px_0_0_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-[0_12px_0_0_rgba(14,165,233,0.12)]"
              >
                <span
                  className={`inline-flex w-fit rounded-xl px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${kindTone(quest.kind)}`}
                >
                  {kindLabel(quest.kind)}
                </span>
                <p className={`mt-3 text-lg font-semibold leading-snug text-slate-900 ${fredokaHeadline.className}`}>
                  {quest.title}
                </p>
                <p className={`mt-2 flex-1 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                  {quest.blurb}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.12em] text-amber-600">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden />+{quest.xp} XP
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-sky-600" aria-hidden />
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </section>

      <section>
        <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 ${jakartaSans.className}`}>
          Your tracks
        </p>
        <h2 className={`mt-1 text-2xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
          AI literacy + high school resources
        </h2>

        <ul className="mt-4 grid gap-4 lg:grid-cols-3">
          {PATH_TRACKS.map((track) => {
            const pct = Math.round((track.completed / track.total) * 100);
            return (
              <li key={track.id}>
                <Link
                  href={track.href}
                  className="block h-full rounded-[1.75rem] border border-slate-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-sky-100"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-slate-500" aria-hidden />
                    <span
                      className={`rounded-xl px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.12em] ${kindTone(track.kind)}`}
                    >
                      {kindLabel(track.kind)}
                    </span>
                  </div>
                  <p className={`mt-3 text-xl font-semibold text-slate-900 ${fredokaHeadline.className}`}>
                    {track.label}
                  </p>
                  <p className={`mt-1.5 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                    {track.summary}
                  </p>
                  <div className="mt-4">
                    <div className="mb-1.5 flex justify-between text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                      <span>
                        {track.completed}/{track.total} complete
                      </span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div className={`h-full rounded-full ${trackBar(track.accent)}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <PortalDailyUpdateDesk />
    </div>
  );
}
