export type ToolkitCategoryId =
  | "organization"
  | "notetaking"
  | "planning"
  | "studying"
  | "writing"
  | "research";

export type ToolkitTool = {
  id: string;
  name: string;
  blurb: string;
  useCase: string;
  href?: string;
};

export type ToolkitCategory = {
  id: ToolkitCategoryId;
  label: string;
  summary: string;
  tools: ToolkitTool[];
};

/**
 * Elite AI toolkit lanes for school. Seed content for the portal;
 * later these rows can be regenerated / updated autonomously.
 */
export const ELITE_TOOLKIT_CATEGORIES: ToolkitCategory[] = [
  {
    id: "organization",
    label: "Organization",
    summary: "Keep classes, deadlines, and files from turning into chaos.",
    tools: [
      {
        id: "org-inbox-zero-week",
        name: "Weekly inbox reset",
        blurb: "A prompt stack to clear school email and flag what actually needs a reply.",
        useCase: "Sunday reset before a heavy week",
      },
      {
        id: "org-folder-map",
        name: "Drive / folder map",
        blurb: "Name conventions and a one-page map so every class has a home.",
        useCase: "New semester setup",
      },
    ],
  },
  {
    id: "notetaking",
    label: "Notetaking",
    summary: "Capture in class, then turn notes into something you can study from.",
    tools: [
      {
        id: "notes-lecture-compress",
        name: "Lecture compressor",
        blurb: "Turn messy notes into key claims, examples, and open questions.",
        useCase: "After a dense STEM or history lecture",
      },
      {
        id: "notes-active-recall",
        name: "Active-recall cards",
        blurb: "Generate question/answer pairs from your notes without inventing facts.",
        useCase: "Night-before review",
      },
    ],
  },
  {
    id: "planning",
    label: "Planning",
    summary: "Build a week that fits real homework load, not a fantasy schedule.",
    tools: [
      {
        id: "plan-week-block",
        name: "Week block planner",
        blurb: "Translate syllabus deadlines into time blocks with buffers.",
        useCase: "Sunday planning session",
      },
      {
        id: "plan-priority-triage",
        name: "Priority triage",
        blurb: "Sort tasks by urgency, effort, and grade impact.",
        useCase: "When everything feels due at once",
      },
    ],
  },
  {
    id: "studying",
    label: "Studying",
    summary: "Practice that matches how tests actually feel.",
    tools: [
      {
        id: "study-practice-set",
        name: "Practice-set builder",
        blurb: "Create quiz-style questions from your materials, then check weak spots.",
        useCase: "Unit exam prep",
      },
      {
        id: "study-explain-aloud",
        name: "Explain-it-back coach",
        blurb: "Force a clear verbal explanation, then highlight gaps.",
        useCase: "Concept-heavy classes",
      },
    ],
  },
  {
    id: "writing",
    label: "Writing",
    summary: "Clarity and structure help, without handing the essay to a model.",
    tools: [
      {
        id: "write-outline-pressure",
        name: "Outline under pressure",
        blurb: "Thesis, evidence map, and paragraph jobs before drafting.",
        useCase: "Timed essays and take-homes",
      },
      {
        id: "write-voice-pass",
        name: "Voice + clarity pass",
        blurb: "Flag vague claims and generic phrasing while keeping your wording.",
        useCase: "Application essays and papers",
      },
    ],
  },
  {
    id: "research",
    label: "Research",
    summary: "Find sources faster, then sanity-check what you cite.",
    tools: [
      {
        id: "research-source-scout",
        name: "Source scout",
        blurb: "Search angles, keywords, and what “good enough” evidence looks like.",
        useCase: "Papers and projects",
      },
      {
        id: "research-claim-check",
        name: "Claim check",
        blurb: "Separate fact, opinion, and missing citation before you submit.",
        useCase: "Final polish",
      },
    ],
  },
];
