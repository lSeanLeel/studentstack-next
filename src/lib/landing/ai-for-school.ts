import type { LucideIcon } from "lucide-react";
import { BookOpen, FlaskConical, PenLine, ShieldCheck } from "lucide-react";

/** Parent-facing clarity — what “AI for school” means at StudentStack. */
export const AI_FOR_SCHOOL_CLARITY = {
  headline: "What we mean by AI for school",
  subhead:
    "Not another chatbot tutorial. Literacy is knowing when AI helps in real schoolwork — and when it crosses the line.",
  contrasts: [
    {
      id: "is",
      label: "What it is",
      points: [
        "Responsible use in classes, labs, and writing",
        "Workflows students actually use to plan and study",
        "Judgment: verify, cite, and ask before you submit",
      ],
      accent: "sky" as const,
    },
    {
      id: "isnt",
      label: "What it isn't",
      points: [
        "AI writing the final draft for you",
        "A replacement for teachers or tutors",
        "Generic “prompt engineering” with no school context",
      ],
      accent: "slate" as const,
    },
    {
      id: "why",
      label: "Why parents care now",
      points: [
        "Every syllabus is adding an AI policy",
        "Students who use it well pull ahead quietly",
        "Most families have no one to ask when rules change",
      ],
      accent: "emerald" as const,
    },
  ],
};

export const PARENT_REACH_SIGNALS = [
  {
    id: "masterminds",
    stat: "Parent masterminds",
    detail: "Live sessions on AI in school and admissions — where families first found us.",
  },
  {
    id: "briefings",
    stat: "AI literacy briefings",
    detail: "Plain-language updates for parents on what changed in AI tools this week.",
  },
  {
    id: "k12",
    stat: "K-12 family network",
    detail: "Families across grades navigating the same question: how should my student use AI?",
  },
  {
    id: "campuses",
    stat: "Campus-led team",
    detail: "Maintained by students from UCLA, Princeton, Stanford, Columbia, and Berkeley.",
  },
] as const;

export type PartnerCategory = {
  id: string;
  title: string;
  detail: string;
  examples: string;
  icon: LucideIcon;
  accent: "sky" | "violet" | "amber";
};

/** Partner ecosystem — tools & courses integrated into member curriculum. */
export const PARTNER_CATEGORIES: PartnerCategory[] = [
  {
    id: "notetaking",
    title: "AI notetaking",
    detail: "Lecture capture and study notes — vetted workflows, not app store roulette.",
    examples: "Leading AI notetaking & capture tools",
    icon: PenLine,
    accent: "sky",
  },
  {
    id: "study",
    title: "AI study tools",
    detail: "Flashcards, practice, and planning — integrated where they fit real homework nights.",
    examples: "AI study guides & practice platforms",
    icon: BookOpen,
    accent: "violet",
  },
  {
    id: "courses",
    title: "AI literacy courses",
    detail: "Structured coursework from providers we partner with — woven into member guides.",
    examples: "Partner course providers",
    icon: FlaskConical,
    accent: "amber",
  },
];

export const PARTNER_INTEGRATION_STEPS = [
  { step: "01", title: "Vet with founders", body: "We work directly with AI tool and course founders — not affiliate lists." },
  { step: "02", title: "Build school workflows", body: "Each partner gets step-by-step guides for classes, labs, and writing." },
  { step: "03", title: "Ship inside membership", body: "Members access the full stack — tools, coursework, and our team — in one place." },
] as const;

export const SCHOOL_USE_AREAS = [
  { id: "writing", title: "Writing", detail: "Outlines, revision, integrity", icon: PenLine },
  { id: "studying", title: "Studying", detail: "Notes, practice, recall", icon: BookOpen },
  { id: "research", title: "Research", detail: "Sources, synthesis, citations", icon: FlaskConical },
  { id: "integrity", title: "Integrity", detail: "Policies, transparency, judgment", icon: ShieldCheck },
] as const;
