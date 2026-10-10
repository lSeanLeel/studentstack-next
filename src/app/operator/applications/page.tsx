import type { Metadata } from "next";
import { ApplicationsInbox } from "@/components/operator/ApplicationsInbox";

export const metadata: Metadata = {
  title: "Applications | StudentStack team",
  robots: { index: false, follow: false },
};

export default function ApplicationsPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <ApplicationsInbox />
    </main>
  );
}
