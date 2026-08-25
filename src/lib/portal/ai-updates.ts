export type PortalDailyUpdate = {
  dateKey: string;
  generatedAt: string;
  headline: string;
  briefing: string;
  toolkitTip: string;
  vaultHighlight: string;
  certificationNudge: string;
  applicationMoves: string[];
};

export function formatPortalDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function buildFallbackPortalUpdate(dateKey = formatPortalDateKey()): PortalDailyUpdate {
  return {
    dateKey,
    generatedAt: new Date().toISOString(),
    headline: "Today in Elite: tighten applications with AI that stays honest",
    briefing:
      "Use the portal like a daily ops board. Check one vault deadline, run one toolkit workflow on real schoolwork, and log progress on an AI Safety or College Readiness module. Admissions readers notice students who can explain tools without hiding them.",
    toolkitTip:
      "Open Claude Projects or Gemini Gems with your syllabus and a single assignment. Ask for a critique of your draft, then rewrite the weak section yourself before submitting.",
    vaultHighlight:
      "Scan Research & Labs and Competitive Deadlines first. Add one program to your shortlist with a reminder date, then note the essay or recommender you still need.",
    certificationNudge:
      "Students who complete SS-AIS Module 2 (Disclosure & Citation) or SS-ACR Module 1 (Application Narrative) can attach a StudentStack credential summary to Common App Additional Information.",
    applicationMoves: [
      "Export one certification progress note for your counselor.",
      "Draft a one-paragraph disclosure sentence for any AI-assisted essay work.",
      "Pick one summer or research opportunity and list the eligibility constraints in your own words.",
    ],
  };
}

export function parsePortalDailyUpdate(raw: string, dateKey: string): PortalDailyUpdate {
  const fallback = buildFallbackPortalUpdate(dateKey);
  try {
    const parsed = JSON.parse(raw) as Partial<PortalDailyUpdate>;
    return {
      dateKey,
      generatedAt: new Date().toISOString(),
      headline: typeof parsed.headline === "string" ? parsed.headline : fallback.headline,
      briefing: typeof parsed.briefing === "string" ? parsed.briefing : fallback.briefing,
      toolkitTip: typeof parsed.toolkitTip === "string" ? parsed.toolkitTip : fallback.toolkitTip,
      vaultHighlight:
        typeof parsed.vaultHighlight === "string" ? parsed.vaultHighlight : fallback.vaultHighlight,
      certificationNudge:
        typeof parsed.certificationNudge === "string"
          ? parsed.certificationNudge
          : fallback.certificationNudge,
      applicationMoves: Array.isArray(parsed.applicationMoves)
        ? parsed.applicationMoves.filter((item): item is string => typeof item === "string").slice(0, 5)
        : fallback.applicationMoves,
    };
  } catch {
    return fallback;
  }
}
