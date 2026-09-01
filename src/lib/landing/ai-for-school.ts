import { BookOpen, FlaskConical, PenLine, ShieldCheck } from "lucide-react";

/** Parent-facing clarity — what “AI for school” means at StudentStack. */
export const AI_FOR_SCHOOL_CLARITY = {
  headlineLead: "What we mean by",
  headlineEmphasis: "AI for school",
  subhead:
    "Not another chatbot tutorial. Literacy is knowing when AI helps in real schoolwork, and when it crosses the line.",
  cta: {
    primary: "Learn the AI Advantage",
  },
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

export const PARENT_ORIGIN_TIMELINE = [
  {
    id: "notes",
    date: "Mar 12, 2025",
    dateTime: "2025-03-12",
    title: "Free AI literacy notes",
  },
  {
    id: "masterminds",
    date: "Apr 19, 2025",
    dateTime: "2025-04-19",
    title: "College admissions masterminds",
  },
  {
    id: "briefings",
    date: "May 28, 2025",
    dateTime: "2025-05-28",
    title: "Weekly parent briefings",
  },
  {
    id: "instagram",
    date: "Oct 7, 2025",
    dateTime: "2025-10-07",
    title: "20K followers on Instagram",
  },
  {
    id: "network",
    date: "Jan 14, 2026",
    dateTime: "2026-01-14",
    title: "Private membership opens",
  },
  {
    id: "community",
    date: "Sep 2026",
    dateTime: "2026-09-01",
    title: "Still updating every week",
  },
] as const;

export const SCHOOL_USE_AREAS = [
  { id: "writing", title: "Writing", detail: "Outlines, revision, integrity", icon: PenLine },
  { id: "studying", title: "Studying", detail: "Notes, practice, recall", icon: BookOpen },
  { id: "research", title: "Research", detail: "Sources, synthesis, citations", icon: FlaskConical },
  { id: "integrity", title: "Integrity", detail: "Policies, transparency, judgment", icon: ShieldCheck },
] as const;
