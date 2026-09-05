import type { ReactNode } from "react";

export type LandingFaqItem = {
  id: string;
  q: string;
  a: ReactNode;
};

export const LANDING_FAQ_ITEMS: LandingFaqItem[] = [
  {
    id: "what-is",
    q: "What is StudentStack?",
    a: "AI literacy for school: how to use tools responsibly in classes, labs, and writing. We are a student-led program maintained by college students who were in those classrooms last year.",
  },
  {
    id: "who-for",
    q: "Who is this for?",
    a: "K-12 families, especially parents of high schoolers navigating new AI policies. Students get gated portal access after a parent applies and completes checkout.",
  },
  {
    id: "ai-for-school",
    q: "What do you mean by AI for school?",
    a: "Not generic chatbot tips. We teach judgment: when AI helps with planning, notes, and revision, when it crosses the line, and how to verify work before submitting.",
  },
  {
    id: "monthly",
    q: "Why is membership monthly?",
    a: "The AI landscape changes every few weeks. New tools launch, schools update policies, and what worked in March may be outdated by fall. Monthly membership lets us keep the toolkit, guides, and team answers current without selling you a static course that goes stale.",
  },
  {
    id: "members-get",
    q: "What do members get?",
    a: "A gated student portal: weekly AI toolkit, school-specific workflows, member resources, optional guides, and direct access to our college team for policy and tool questions.",
  },
  {
    id: "join",
    q: "How do I join?",
    a: "Parents complete a short application, review mentor matching, create a portal password, and finish checkout. A welcome email with login details goes to the parent email. A mentor reaches out after.",
  },
  {
    id: "cancel",
    q: "Can we cancel?",
    a: "Yes. Membership is month to month. Cancel anytime from your account settings or by emailing us. Your student keeps access through the end of the paid period.",
  },
];
