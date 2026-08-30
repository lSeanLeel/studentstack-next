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

export const PORTAL_PREVIEW_HEADLINE = "The student portal, at a glance";

/** Static snapshot matching demo login (test / test). */
export const PORTAL_PREVIEW_DEMO = {
  displayName: "Test",
  tipTitle: "Syllabus pass before you trust the calendar",
  tipBody:
    "Upload the real PDF, ask AI only for deadline extraction, then verify every date yourself.",
  dateLabel: "This week",
};

const pillarSurface: Record<PortalPillar["accent"], string> = {
  sky: "border-sky-200/80 bg-gradient-to-br from-sky-50 to-white shadow-[0_10px_0_0_rgba(14,165,233,0.12)]",
  emerald: "border-emerald-200/80 bg-gradient-to-br from-emerald-50 to-white shadow-[0_10px_0_0_rgba(16,185,129,0.1)]",
  amber: "border-amber-200/80 bg-gradient-to-br from-amber-50 to-white shadow-[0_10px_0_0_rgba(245,158,11,0.1)]",
  violet: "border-violet-200/80 bg-gradient-to-br from-violet-50 to-white shadow-[0_10px_0_0_rgba(139,92,246,0.1)]",
};

const pillarIcon: Record<PortalPillar["accent"], string> = {
  sky: "bg-sky-100 text-sky-700 ring-sky-200",
  emerald: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-100 text-amber-800 ring-amber-200",
  violet: "bg-violet-100 text-violet-700 ring-violet-200",
};

export function pillarCardClasses(accent: PortalPillar["accent"]) {
  return pillarSurface[accent];
}

export function pillarIconClasses(accent: PortalPillar["accent"]) {
  return pillarIcon[accent];
}
