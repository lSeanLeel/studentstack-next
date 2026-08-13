export type ResourceItem = {
  id: string;
  title: string;
  blurb: string;
  tags: string[];
  href?: string;
  exclusivity: "elite";
};

export type ResourceCollection = {
  id: string;
  label: string;
  summary: string;
  items: ResourceItem[];
};

/**
 * Exclusive Elite resources. Seed lists for the portal;
 * summer programs / opportunities can be refreshed continuously later.
 */
export const ELITE_RESOURCE_COLLECTIONS: ResourceCollection[] = [
  {
    id: "summer-programs",
    label: "Summer programs",
    summary: "Curated programs high schoolers actually apply to, with notes from our student team.",
    items: [
      {
        id: "summer-research-starter",
        title: "Research-oriented summer tracks",
        blurb: "Programs that reward curiosity and writing, not just prestige chasing.",
        tags: ["research", "rising juniors", "rising seniors"],
        exclusivity: "elite",
      },
      {
        id: "summer-stem-immersive",
        title: "STEM immersives worth the time",
        blurb: "Shortlist filtered for learning density and realistic admissions signal.",
        tags: ["STEM", "selective"],
        exclusivity: "elite",
      },
      {
        id: "summer-local-high-signal",
        title: "Local / low-cost high-signal options",
        blurb: "Community college, lab volunteering, and structured projects that still move the needle.",
        tags: ["accessible", "projects"],
        exclusivity: "elite",
      },
    ],
  },
  {
    id: "opportunities",
    label: "Exclusive opportunities",
    summary: "Competitions, fellowships, and sourced openings we keep updated for Elite students.",
    items: [
      {
        id: "opp-writing-comps",
        title: "Writing & journalism competitions",
        blurb: "Deadlines and fit notes for students who write well under guidance.",
        tags: ["writing", "deadlines"],
        exclusivity: "elite",
      },
      {
        id: "opp-cs-build",
        title: "Build-in-public / CS project lanes",
        blurb: "Ways to show work without needing a brand-name internship first.",
        tags: ["CS", "portfolio"],
        exclusivity: "elite",
      },
      {
        id: "opp-service-leadership",
        title: "Service + leadership with proof",
        blurb: "Roles where impact is measurable, not resume filler.",
        tags: ["leadership"],
        exclusivity: "elite",
      },
    ],
  },
];
