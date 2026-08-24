export type ToolkitCategoryId =
  | "organization"
  | "notetaking"
  | "planning"
  | "studying"
  | "writing"
  | "research"
  | "applications";

export type ToolkitTool = {
  id: string;
  name: string;
  product: string;
  blurb: string;
  howWeUse: string;
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
 * AI Toolkit — tools we use and how we use them for school.
 * Presented as a team-maintained surface for monthly members (see toolkit-maintenance).
 */
export const ELITE_TOOLKIT_CATEGORIES: ToolkitCategory[] = [
  {
    id: "organization",
    label: "Organization",
    summary: "Keep classes, deadlines, and files from turning into chaos.",
    tools: [
      {
        id: "org-notion-ai",
        name: "Class OS in Notion",
        product: "Notion AI",
        blurb: "One workspace per semester: classes, deadlines, and reading links.",
        howWeUse:
          "Ask Notion AI to turn a syllabus PDF into a database of assignments with due dates, then review every row yourself before trusting it.",
        useCase: "New semester setup",
      },
      {
        id: "org-gemini-gems",
        name: "Syllabus Gem",
        product: "Gemini Gems",
        blurb: "A persistent Gem loaded with your syllabi for quick deadline questions.",
        howWeUse:
          "Upload syllabi once, then ask only factual calendar questions. Never let it invent school policies.",
        useCase: "Week-of deadline checks",
      },
    ],
  },
  {
    id: "notetaking",
    label: "Notetaking",
    summary: "Capture in class, then turn notes into something you can study from.",
    tools: [
      {
        id: "notes-claude",
        name: "Lecture compressor",
        product: "Claude",
        blurb: "Turn messy notes into key claims, examples, and open questions.",
        howWeUse:
          "Paste your own notes only. Ask for claims vs examples vs questions. Rewrite the summary in your voice before studying.",
        useCase: "After a dense STEM or history lecture",
      },
      {
        id: "notes-chatgpt",
        name: "Active-recall cards",
        product: "ChatGPT",
        blurb: "Question/answer pairs from your materials without inventing facts.",
        howWeUse:
          "Feed your notes or textbook excerpts. Reject any card that cites something you did not provide.",
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
        id: "plan-claude-projects",
        name: "Week block planner",
        product: "Claude Projects",
        blurb: "Translate syllabus deadlines into time blocks with buffers.",
        howWeUse:
          "Keep a Project with your calendar constraints. Ask for a draft week, then cut anything unrealistic.",
        useCase: "Sunday planning session",
      },
      {
        id: "plan-perplexity",
        name: "Priority triage",
        product: "Perplexity",
        blurb: "Quick research on assignment rubrics and exam formats when docs are unclear.",
        howWeUse:
          "Search school or course pages with citations on. Use it to clarify scope, not to do the work.",
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
        id: "study-chatgpt",
        name: "Practice-set builder",
        product: "ChatGPT",
        blurb: "Quiz-style questions from your materials, then check weak spots.",
        howWeUse:
          "Upload or paste unit notes. Answer without looking, then ask for feedback on reasoning.",
        useCase: "Unit exam prep",
      },
      {
        id: "study-claude",
        name: "Explain-it-back coach",
        product: "Claude",
        blurb: "Force a clear verbal explanation, then highlight gaps.",
        howWeUse:
          "You explain first. The model only probes gaps. You fill those gaps from class materials.",
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
        id: "write-claude",
        name: "Outline under pressure",
        product: "Claude",
        blurb: "Thesis, evidence map, and paragraph jobs before drafting.",
        howWeUse:
          "Brainstorm structure only. You draft every sentence. Ask for critique of clarity, not a rewrite.",
        useCase: "Timed essays and take-homes",
      },
      {
        id: "write-grammarly",
        name: "Voice + clarity pass",
        product: "Grammarly / native editor",
        blurb: "Flag vague claims while keeping your wording.",
        howWeUse:
          "Accept grammar fixes carefully. Reject tone rewrites that erase your voice.",
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
        id: "research-perplexity",
        name: "Source scout",
        product: "Perplexity",
        blurb: "Search angles and what good-enough evidence looks like.",
        howWeUse:
          "Collect 3–5 cited sources, open each yourself, then build your claim map in a research log.",
        useCase: "Papers and projects",
      },
      {
        id: "research-gemini",
        name: "Claim check",
        product: "Gemini",
        blurb: "Separate fact, opinion, and missing citation before you submit.",
        howWeUse:
          "Paste your draft claims. Require a citation check against your own source list.",
        useCase: "Final polish",
      },
    ],
  },
  {
    id: "applications",
    label: "College applications",
    summary: "Organize storytelling and process docs without outsourcing your voice.",
    tools: [
      {
        id: "apps-claude",
        name: "Activity blurb editor",
        product: "Claude",
        blurb: "Tighten Common App activity lines while keeping your facts.",
        howWeUse:
          "Paste your draft. Ask for compression and specificity feedback. You rewrite.",
        useCase: "Activities list",
      },
      {
        id: "apps-docs",
        name: "Essay process folder",
        product: "Google Docs + Claude",
        blurb: "Keep outline → draft → revise versions for counselors.",
        howWeUse:
          "Never paste a full final essay ask for a rewrite. Use AI for structure questions only.",
        useCase: "Personal statement process",
      },
    ],
  },
];
