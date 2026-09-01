import { BookOpen, FlaskConical, PenLine, ShieldCheck } from "lucide-react";

/** Parent-facing clarity — what “AI for school” means at StudentStack. */
export const AI_FOR_SCHOOL_CLARITY = {
  headlineLead: "What we mean by",
  headlineEmphasis: "AI for school",
  subhead:
    "Not another chatbot tutorial. Literacy is knowing when AI helps in real schoolwork, and when it crosses the line.",
  cta: {
    primary: "Learn the AI Advantage",
    secondary: "and sign up my student",
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
    date: "March 12, 2025",
    dateTime: "2025-03-12",
    era: "The start",
    title: "Free AI literacy notes",
    detail:
      "We started posting short explainers: what changed in AI tools, what it meant for homework, and how to talk about it at the dinner table.",
  },
  {
    id: "masterminds",
    date: "April 19, 2025",
    dateTime: "2025-04-19",
    era: "Parents found us",
    title: "College admissions masterminds",
    detail:
      "Live sessions where families asked real questions about AI in school and admissions. That room is where StudentStack first took shape.",
  },
  {
    id: "briefings",
    date: "May 28, 2025",
    dateTime: "2025-05-28",
    era: "Staying current",
    title: "Weekly parent briefings",
    detail:
      "Plain-language updates on new tools, syllabus policies, and what other families were navigating, written by students still in class.",
  },
  {
    id: "instagram",
    date: "October 7, 2025",
    dateTime: "2025-10-07",
    era: "Word spread",
    title: "20,000 followers on Instagram",
    detail:
      "Parents started sharing our clips in group chats and parent newsletters. Discovery stayed organic: useful context, not ads.",
  },
  {
    id: "network",
    date: "January 14, 2026",
    dateTime: "2026-01-14",
    era: "Community opens",
    title: "Private membership for families",
    detail:
      "Parents could apply and students got gated access to our AI-for-school program: toolkit, guides, and direct access to our college team.",
  },
  {
    id: "community",
    date: "September 2026",
    dateTime: "2026-09-01",
    era: "Today",
    title: "Still updating every week",
    detail:
      "New tools, new syllabus rules, new workflows. We publish for parents and ship the full program inside the member portal.",
  },
] as const;

export const PARENT_ORIGIN_STORY = {
  eyebrow: "How we got here",
  headline: "From parent rooms to a student program",
  subhead:
    "StudentStack did not start as a product pitch. It grew out of parents asking the same question: how should my student use AI for school?",
  closing:
    "We still publish for parents. Members get the full program inside the portal.",
} as const;

export const SCHOOL_USE_AREAS = [
  { id: "writing", title: "Writing", detail: "Outlines, revision, integrity", icon: PenLine },
  { id: "studying", title: "Studying", detail: "Notes, practice, recall", icon: BookOpen },
  { id: "research", title: "Research", detail: "Sources, synthesis, citations", icon: FlaskConical },
  { id: "integrity", title: "Integrity", detail: "Policies, transparency, judgment", icon: ShieldCheck },
] as const;
