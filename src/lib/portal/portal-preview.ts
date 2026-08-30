import { BookOpen, CheckSquare, MessageSquare, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type PortalPillar = {
  id: string;
  title: string;
  detail: string;
  icon: LucideIcon;
  accent: "sky" | "emerald" | "amber" | "violet";
};

/** Landing #member-portal — four blocks, no long subhead. */
export const PORTAL_PREVIEW_PILLARS: PortalPillar[] = [
  {
    id: "toolkit",
    title: "AI Toolkit",
    detail: "The AI tools and systems we actually use to organize, plan, and study more efficiently.",
    icon: Wrench,
    accent: "sky",
  },
  {
    id: "team",
    title: "Ask the team",
    detail: "The questions you can't ask AI — answered by students still in school.",
    icon: MessageSquare,
    accent: "emerald",
  },
  {
    id: "resources",
    title: "Resources",
    detail: "Opportunities and deadlines with facts upfront.",
    icon: BookOpen,
    accent: "violet",
  },
  {
    id: "guides",
    title: "Guides (optional)",
    detail: "Self-paced checklists for integrity and applications.",
    icon: CheckSquare,
    accent: "amber",
  },
];

export const PORTAL_PREVIEW_HEADLINE = "The ultimate membership for your high schooler";

/** Abstract landing mock content — not tied to demo login. */
export const PORTAL_PREVIEW_SNAPSHOT = {
  tipTitle: "Syllabus pass before you trust the calendar",
  tipBody: "Upload the real PDF, ask AI only for deadline extraction, then verify every date yourself.",
  dateLabel: "This week",
};

const pillarSurface: Record<PortalPillar["accent"], string> = {
  sky: "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04]",
  emerald: "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04]",
  amber: "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04]",
  violet: "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04]",
};

const pillarIcon: Record<PortalPillar["accent"], string> = {
  sky: "bg-sky-500/10 text-sky-700 ring-sky-500/20",
  emerald: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-800 ring-amber-500/20",
  violet: "bg-violet-500/10 text-violet-700 ring-violet-500/20",
};

export function pillarCardClasses(accent: PortalPillar["accent"]) {
  return pillarSurface[accent];
}

export function pillarIconClasses(accent: PortalPillar["accent"]) {
  return pillarIcon[accent];
}
