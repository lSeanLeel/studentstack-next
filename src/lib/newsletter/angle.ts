/**
 * StudentStack daily newsletter angle — shared by operator generator.
 * Parents of high schoolers · AI for student organization.
 */

export const NEWSLETTER_ANGLE = {
  product: "StudentStack Daily",
  audience: "parents of high schoolers",
  promise:
    "A free daily email that teaches parents how their student can use AI to stay organized for school — practical moves from the college-student side of the same work.",
  notThis: [
    "Generic AI news dump",
    "Tool hype without a school use case",
    "Doing the student’s homework for them",
    "Paid upsell as the lead story",
  ],
  alwaysThis: [
    "Organization optic first (cleaner weeks, not flashier tools)",
    "One concrete student move a parent can forward",
    "Mentor-informed, calm, educational tone",
    "Clear arena: Organization, Planning, or Notetaking",
  ],
} as const;

export const FOCUS_PILLARS = [
  {
    id: "organization",
    label: "Organization",
    blurb: "Folders, inboxes, deadline hygiene — so the week does not collapse into catch-up.",
    parentValue: "Parents learn systems they can spot-check without micromanaging.",
  },
  {
    id: "planning",
    label: "Planning",
    blurb: "Syllabus → calendar: time blocks, buffers, and what actually gets finished.",
    parentValue: "Parents see the gap between “busy” and “prepared” — and how AI closes it.",
  },
  {
    id: "notetaking",
    label: "Notetaking",
    blurb: "Capture in class, then reshape notes into something a high schooler can study from.",
    parentValue: "A habit that compounds every unit, not a one-week tip.",
  },
] as const;

export type FocusPillarId = (typeof FOCUS_PILLARS)[number]["id"];

export function getFocusPillar(id: FocusPillarId | string | undefined) {
  return FOCUS_PILLARS.find((p) => p.id === id) ?? FOCUS_PILLARS[0];
}

export function buildAngleSeed(pillar: FocusPillarId, dateLabel?: string): string {
  const p = getFocusPillar(pillar);
  const day =
    dateLabel ??
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  return [
    `Date: ${day}`,
    `Focus pillar: ${p.label}`,
    `Angle: ${NEWSLETTER_ANGLE.promise}`,
    "",
    "Operator notes / research dump:",
    `- Keep today's issue centered on ${p.label.toLowerCase()}.`,
    `- ${p.blurb}`,
    "- Prefer one sharp workflow over a list of tools.",
    "- Parent can forward one move to their high schooler tonight.",
  ].join("\n");
}
