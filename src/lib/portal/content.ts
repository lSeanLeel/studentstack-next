import type { Course } from "./types";

/** Static course stubs until CMS / Supabase course rows are live. */
export const PORTAL_COURSE_STUBS: Course[] = [
  {
    id: "stub-ai-foundations",
    slug: "ai-foundations",
    title: "AI Foundations for School",
    summary: "Core habits for using AI responsibly in lectures, labs, and writing.",
    status: "published",
    estimated_hours: 4,
  },
  {
    id: "stub-research-workflows",
    slug: "research-workflows",
    title: "Research Workflows",
    summary: "Source-finding, note systems, and citation-safe drafting with AI.",
    status: "published",
    estimated_hours: 5,
  },
  {
    id: "stub-application-edge",
    slug: "application-edge",
    title: "Application Edge",
    summary: "Essays, activities, and opportunity tracking without generic AI voice.",
    status: "draft",
    estimated_hours: 6,
  },
];

export function getCourseStub(slug: string): Course | undefined {
  return PORTAL_COURSE_STUBS.find((course) => course.slug === slug);
}
