export type ToolkitCategoryId =
  | "organization"
  | "notetaking"
  | "planning"
  | "studying"
  | "writing"
  | "research";

export type ToolkitPrompt = {
  label: string;
  text: string;
};

export type ToolkitTool = {
  id: string;
  name: string;
  product: string;
  blurb: string;
  howWeUse: string;
  workflow: string[];
  prompts: ToolkitPrompt[];
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
 * Each entry includes step-by-step workflow and copy-paste prompts.
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
          "We turn syllabus PDFs into assignment databases, then manually verify every due date before trusting the calendar.",
        workflow: [
          "Create a Notion page called \"Fall 2026\" with a database named Assignments.",
          "Upload your syllabus PDF and ask Notion AI: \"Extract every assignment, project, and exam with due dates into a table.\"",
          "Open the original PDF side-by-side and fix any wrong dates — AI often misreads \"Thursday\" or skips reading quizzes.",
          "Add a Status column (Not started / In progress / Done) and link each row to your class folder.",
          "Every Sunday, filter by \"due this week\" and drag tasks into your weekly planner.",
        ],
        prompts: [
          {
            label: "Syllabus → assignment table",
            text: "Read this syllabus PDF. List every graded item with: assignment name, type (homework/quiz/exam/project), due date, and point value. Flag anything you're unsure about with [VERIFY].",
          },
          {
            label: "Weekly priority sort",
            text: "Here are my assignments due in the next 7 days with estimated hours: [paste table]. Sort by urgency × effort. Suggest which two I should finish first.",
          },
        ],
        useCase: "New semester setup",
      },
      {
        id: "org-gemini-gems",
        name: "Syllabus Gem",
        product: "Gemini Gems",
        blurb: "A persistent Gem loaded with your syllabi for quick deadline questions.",
        howWeUse:
          "Upload syllabi once into a Gem. Ask only factual calendar questions — never let it invent late-work or retake policies.",
        workflow: [
          "Create a Gemini Gem named \"My Syllabi\" and upload every class syllabus as a PDF.",
          "In the Gem instructions, paste: \"Only answer from uploaded files. If the answer isn't in the syllabus, say 'Not in syllabus — ask your teacher.'\"",
          "When checking deadlines, ask: \"When is [assignment name] due in [class]?\" — one question at a time.",
          "If the Gem cites a policy (late work, retakes), open the PDF yourself and confirm the quote.",
          "Never ask the Gem to interpret vague rules like \"participation counts\" without a rubric attached.",
        ],
        prompts: [
          {
            label: "Deadline lookup",
            text: "From my uploaded syllabi only: when is the Unit 3 test in AP Chemistry due, and what percent of the grade is it worth?",
          },
          {
            label: "Policy check",
            text: "From my English syllabus only: what is the late-work policy? Quote the exact sentence and page if possible.",
          },
        ],
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
          "Paste your own notes only. Split output into claims vs. examples vs. questions, then rewrite in your voice before studying.",
        workflow: [
          "After class, paste raw notes (don't clean them up first — typos are fine).",
          "Ask Claude to sort into three lists: Key claims · Examples/evidence · Questions I still have.",
          "Delete any claim that wasn't in your notes — Claude sometimes adds textbook filler.",
          "Rewrite the summary in your own words in a separate doc (5–10 min). This is the part you actually learn from.",
          "Star the \"Questions I still have\" list and bring those to office hours or the next lecture.",
        ],
        prompts: [
          {
            label: "Compress lecture notes",
            text: "Here are my messy notes from today's AP Bio lecture on cell respiration. Do NOT add facts I didn't write. Sort into: (1) key claims, (2) examples/evidence, (3) questions I still have.",
          },
        ],
        useCase: "After a dense STEM or history lecture",
      },
      {
        id: "notes-chatgpt",
        name: "Active-recall cards",
        product: "ChatGPT",
        blurb: "Question/answer pairs from your materials without inventing facts.",
        howWeUse:
          "Feed your notes or textbook excerpts. Reject any card that cites something you didn't provide.",
        workflow: [
          "Paste one unit's notes or a textbook section (not the whole book).",
          "Ask for 15–20 Q&A flashcards. Specify: \"Every answer must come only from the text I pasted.\"",
          "Read each card aloud. If you can't answer without peeking, mark it \"weak.\"",
          "Delete cards with vague questions like \"What is important about X?\" — rewrite them to be specific.",
          "Run weak cards through again the next day before adding new ones.",
        ],
        prompts: [
          {
            label: "Flashcards from notes",
            text: "Using ONLY the notes below, create 20 flashcards in Q&A format. Each answer must be a direct fact from my notes — no outside knowledge. Format: Q: ... A: ...\n\n[paste notes]",
          },
        ],
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
        workflow: [
          "In a Claude Project, upload your assignment database or weekly due list.",
          "Add standing constraints: \"I have soccer Mon/Wed 4–6pm, church Sunday morning, need 8 hrs sleep.\"",
          "Ask for a Mon–Sun block schedule with 30-min buffers between deep work sessions.",
          "Look at any day with 5+ hours of homework — that's a red flag. Move or split tasks.",
          "Screenshot the final plan and pin it. Adjust daily, don't replan from scratch.",
        ],
        prompts: [
          {
            label: "Draft weekly blocks",
            text: "Here's what's due this week with estimated hours: [paste]. My fixed commitments: [list]. Build a Mon–Sun hourly plan with 30-min buffers. Flag any day that looks impossible.",
          },
        ],
        useCase: "Sunday planning session",
      },
      {
        id: "plan-perplexity",
        name: "Priority triage",
        product: "Perplexity",
        blurb: "Quick research on assignment rubrics and exam formats when docs are unclear.",
        howWeUse:
          "Search school or course pages with citations on. Use it to clarify scope, not to do the work.",
        workflow: [
          "When an assignment prompt is vague, search: \"[your school] [class name] [assignment] rubric site:.edu OR site:[school domain]\"",
          "Open the cited links yourself — don't trust Perplexity's summary alone.",
          "Write down: What's graded? What's the page limit? What's explicitly banned?",
          "If nothing turns up, email the teacher one specific question instead of guessing.",
        ],
        prompts: [
          {
            label: "Rubric hunt",
            text: "Find the grading rubric or past examples for [assignment name] in [AP US History]. Prefer official school or College Board sources. List URLs.",
          },
        ],
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
        workflow: [
          "Paste unit notes and say: \"Write 10 short-answer questions in the style of my teacher's tests. No multiple choice.\"",
          "Set a timer. Answer on paper without the chat open.",
          "Paste your answers and ask: \"Grade against my notes only. Mark wrong reasoning, not just wrong facts.\"",
          "For every wrong answer, write a one-sentence correction in your own words.",
          "Redo only the questions you missed after 24 hours.",
        ],
        prompts: [
          {
            label: "Practice test",
            text: "From my notes below, write 10 short-answer questions that test understanding, not memorization. Do not use outside facts.\n\n[paste notes]",
          },
          {
            label: "Grade my answers",
            text: "Here are my answers to the practice questions. Grade using ONLY my original notes. For each wrong answer, explain what I misunderstood.\n\n[paste answers]",
          },
        ],
        useCase: "Unit exam prep",
      },
      {
        id: "study-claude",
        name: "Explain-it-back coach",
        product: "Claude",
        blurb: "Force a clear verbal explanation, then highlight gaps.",
        howWeUse:
          "You explain first. The model only probes gaps. You fill those gaps from class materials.",
        workflow: [
          "Pick one concept you think you understand (e.g., \"natural selection\" or \"implicit differentiation\").",
          "Explain it out loud for 60 seconds — record yourself or type stream-of-consciousness.",
          "Paste the explanation and ask Claude: \"Where is my explanation vague, wrong, or missing a step? Don't teach me — just point to gaps.\"",
          "Go back to your notes/textbook and fix each gap yourself.",
          "Explain again. Stop when Claude finds no new gaps.",
        ],
        prompts: [
          {
            label: "Gap finder",
            text: "I'm studying for a test. Here's my explanation of [concept]: \"[your explanation]\". Don't rewrite it for me. List specific gaps, vague phrases, or likely misconceptions. I'll fix them from my textbook.",
          },
        ],
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
        workflow: [
          "Paste the essay prompt and your raw brainstorm (bullet points, messy is fine).",
          "Ask for: one-sentence thesis, 3–4 body paragraph \"jobs\" (what each paragraph proves), and evidence slots.",
          "Draft the essay yourself — no AI sentences in the doc.",
          "After drafting, ask: \"Which paragraphs drift from their job? Where is evidence missing?\" — not \"rewrite paragraph 2.\"",
          "Fix structure yourself. Use Grammarly only for grammar, not tone rewrites.",
        ],
        prompts: [
          {
            label: "Outline only",
            text: "Essay prompt: [paste]. My brainstorm: [paste bullets]. Give me: (1) thesis, (2) paragraph jobs, (3) where I need quotes/evidence. Do NOT write any essay sentences.",
          },
          {
            label: "Structure critique",
            text: "Here's my draft. Critique structure and clarity only — don't rewrite. Flag paragraphs that don't support the thesis.\n\n[paste draft]",
          },
        ],
        useCase: "Timed essays and take-homes",
      },
      {
        id: "write-grammarly",
        name: "Voice + clarity pass",
        product: "Grammarly / native editor",
        blurb: "Flag vague claims while keeping your wording.",
        howWeUse:
          "Accept grammar fixes carefully. Reject tone rewrites that erase your voice.",
        workflow: [
          "Run Grammarly in \"Goals: academic, formal\" only after your draft is done.",
          "Accept spelling and comma fixes. Reject any suggestion that changes your word choice to sound \"smarter.\"",
          "Read the essay aloud — if a \"corrected\" sentence doesn't sound like you, undo it.",
          "For college essays specifically: zero AI-generated sentences in the body. Grammarly for typos only.",
        ],
        prompts: [],
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
        workflow: [
          "Start with your research question written as one sentence.",
          "Ask Perplexity: \"What are 5 credible sources (prefer .edu, .gov, peer-reviewed) on [question]?\"",
          "Open every URL. Skim abstracts or intros. Discard anything paywalled you can't access.",
          "In a research log, one row per source: claim you're using it for · quote/page · your note.",
          "Only after the log is filled do you start drafting.",
        ],
        prompts: [
          {
            label: "Source list",
            text: "Research question: [your question]. List 5 credible sources with URLs. Prefer academic, government, or established news. Note what each source would help me prove.",
          },
        ],
        useCase: "Papers and projects",
      },
      {
        id: "research-gemini",
        name: "Claim check",
        product: "Gemini",
        blurb: "Separate fact, opinion, and missing citation before you submit.",
        howWeUse:
          "Paste your draft claims. Require a citation check against your own source list.",
        workflow: [
          "Paste your draft and your source list (titles + URLs only).",
          "Ask: \"For each claim in my draft, tag it: SUPPORTED (matches a source), OPINION, or NEEDS CITATION.\"",
          "Fix every NEEDS CITATION row before submitting.",
          "If SUPPORTED but you didn't read the source — go read it. Tags lie when the model guesses.",
        ],
        prompts: [
          {
            label: "Claim audit",
            text: "Draft: [paste]. My sources: [list with URLs]. Tag every factual claim as SUPPORTED, OPINION, or NEEDS CITATION. Be strict — if no source clearly supports it, mark NEEDS CITATION.",
          },
        ],
        useCase: "Final polish",
      },
    ],
  },
];
