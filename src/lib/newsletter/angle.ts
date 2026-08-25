/**
 * StudentStack Daily membership angle + focus pillars.
 * Public product: paid parent daily ($40/mo after join) + partner certifications.
 */

export const NEWSLETTER_ANGLE = {
  product: "StudentStack Daily",
  audience: "parents of high schoolers (paid membership)",
  discovery:
    "Parents usually find StudentStack on Nextdoor, Facebook parent groups, or Instagram educational videos, then join the daily with a parent email.",
  promise:
    "A daily membership email that keeps parents ahead on AI in school: one school signal, one toolkit move, and one forwardable note from a student-led desk.",
  eliteNote:
    "Membership is the product. Do not pitch free forever. Soft reminders that the desk is for members only are fine. No portal product tour as the lead.",
  notThis: [
    "Generic AI news dump with no school lens",
    "Tool hype without a high-school use case",
    "Doing the student’s homework for them",
    "Revealing internal generation tooling or model names",
    "Course catalog pitches",
  ],
  alwaysThis: [
    "Sound like a student-led desk still in campus work",
    "School-climate signal parents can skim in under two minutes",
    "Organization optic: cleaner weeks, not louder tech",
    "One concrete student move a parent can forward",
    "Clear arena: Organization, Planning, or Notetaking",
  ],
} as const;

export const FOCUS_PILLARS = [
  {
    id: "organization",
    label: "Organization",
    blurb: "Folders, inboxes, deadline hygiene, so the week does not collapse into catch-up.",
    parentValue: "Parents learn systems they can spot-check without micromanaging.",
  },
  {
    id: "planning",
    label: "Planning",
    blurb: "Syllabus to calendar: time blocks, buffers, and what actually gets finished.",
    parentValue: "Parents see the gap between busy and prepared, and how AI closes it.",
  },
  {
    id: "notetaking",
    label: "Notetaking",
    blurb: "Capture in class, then reshape notes into something a high schooler can study from.",
    parentValue: "A habit that compounds every unit, not a one-week tip.",
  },
] as const;

export type FocusPillarId = (typeof FOCUS_PILLARS)[number]["id"];

/** Mon/Thu organization, Tue/Fri planning, Wed/Sat notetaking, Sun organization. */
const PILLAR_BY_DOW: FocusPillarId[] = [
  "organization",
  "organization",
  "planning",
  "notetaking",
  "organization",
  "planning",
  "notetaking",
];

export function getFocusPillar(id: FocusPillarId | string | undefined) {
  return FOCUS_PILLARS.find((p) => p.id === id) ?? FOCUS_PILLARS[0];
}

export function pillarForDate(date = new Date()): FocusPillarId {
  return PILLAR_BY_DOW[date.getDay()] ?? "organization";
}

export function issueDateLabel(date = new Date()): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function buildAngleSeed(pillar: FocusPillarId, dateLabel?: string): string {
  const p = getFocusPillar(pillar);
  const day = dateLabel ?? issueDateLabel();
  return [
    `Date: ${day}`,
    `Focus pillar: ${p.label}`,
    `Angle: ${NEWSLETTER_ANGLE.promise}`,
    `Discovery context: ${NEWSLETTER_ANGLE.discovery}`,
    `Membership: ${NEWSLETTER_ANGLE.eliteNote}`,
    "",
    "Operator notes / research dump:",
    `- Keep today's issue centered on ${p.label.toLowerCase()}.`,
    `- ${p.blurb}`,
    "- Open with one school-climate AI signal worth noticing.",
    "- Prefer one sharp workflow over a list of tools.",
    "- Parent can forward one move to their high schooler tonight.",
    "- Voice: student-led desk. Never mention model names or internal generation.",
  ].join("\n");
}

export function buildNewsletterSystemPrompt(focusId: string): string {
  const pillar = getFocusPillar(focusId);
  const pillars = FOCUS_PILLARS.map((p) => `- ${p.label}: ${p.blurb}`).join("\n");

  return `You are writing StudentStack Daily, ${NEWSLETTER_ANGLE.promise}

AUDIENCE: ${NEWSLETTER_ANGLE.audience}. Busy. Want credibility, not hype.
HOW THEY FIND US: ${NEWSLETTER_ANGLE.discovery}
MEMBERSHIP RULE: ${NEWSLETTER_ANGLE.eliteNote}

TODAY'S REQUIRED FOCUS PILLAR: ${pillar.label}
Pillar detail: ${pillar.blurb}
Parent value: ${pillar.parentValue}

THE THREE ARENAS (always stay inside this optic):
${pillars}

NEVER:
${NEWSLETTER_ANGLE.notThis.map((x) => `- ${x}`).join("\n")}

ALWAYS:
${NEWSLETTER_ANGLE.alwaysThis.map((x) => `- ${x}`).join("\n")}

OUTPUT: structured Markdown only (no preamble, no code fences), sections in this exact order:

1. A single # H1 title, concrete, parent-readable, organization-forward
2. One short lede paragraph under the title (1-2 sentences) from the student desk
3. ## Today's organizing angle · ${pillar.label}
   - 2-4 sentences tying the issue to ${pillar.label.toLowerCase()}
4. ## Signal
   - What is worth noticing in AI/education through an organizing lens (2-4 sentences)
5. ## Parent note
   - Warm, practical. Include the exact placeholder [EDIT PARENT NOTE HERE] on its own line near the top of this section
6. ## The toolkit move
   - One featured workflow: Name, what it does, one concrete high-school use case for ${pillar.label.toLowerCase()}
7. ## Forward this
   - One short message a parent can copy/text to their student tonight

Optional only if seed research clearly supports it:
8. ## Opportunity radar
   - 1-3 high-school-relevant deadlines with dates when known

Tone: clear, trustworthy, energetic but not hypey. College-student informed. Never reveal that draft generation is automated.`;
}
