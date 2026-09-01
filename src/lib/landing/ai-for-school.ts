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

export const PARENT_ORIGIN_TIMELINE = [
  {
    id: "notes",
    era: "The start",
    title: "Free AI literacy notes",
    detail:
      "We started with short explainers — what changed in AI tools, what it meant for homework, and how to talk about it at the dinner table.",
  },
  {
    id: "masterminds",
    era: "Parents found us",
    title: "College admissions masterminds",
    detail:
      "Live sessions where families asked real questions about AI in school and admissions. That room is where StudentStack first took shape.",
  },
  {
    id: "briefings",
    era: "Staying current",
    title: "Weekly parent briefings",
    detail:
      "Plain-language updates on new tools, syllabus policies, and what other families were navigating — written by students still in class.",
  },
  {
    id: "network",
    era: "Word spread",
    title: "Parent newsletters & posts",
    detail:
      "Families shared our notes in group chats and parent newsletters. Discovery stayed organic — useful context, not ads.",
  },
  {
    id: "community",
    era: "Today",
    title: "Private community for families",
    detail:
      "Parents apply; students get gated access to our AI-for-school program — toolkit, guides, and direct access to our college team.",
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
