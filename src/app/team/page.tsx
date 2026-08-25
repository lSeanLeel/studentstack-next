"use client";

import { Navbar } from "@/components/Navbar";
import { StudentShowcase } from "@/components/StudentShowcase";

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-transparent selection:bg-sky-100 selection:text-sky-900">
      <Navbar />
      <div className="pt-24 sm:pt-28">
        <StudentShowcase />
      </div>
    </main>
  );
}
