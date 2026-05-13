"use client";

import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { IntroAnimation } from "@/components/IntroAnimation";
import { HeroSection } from "@/components/HeroSection";
import { OnboardingProvider } from "@/components/onboarding-context";

const sectionLoading = () => <div className="h-96" aria-hidden />;

const PlaybookSection = dynamic(
  () => import("@/components/PlaybookSection").then((m) => ({ default: m.PlaybookSection })),
  { loading: sectionLoading }
);

const TestimonialSection = dynamic(
  () => import("@/components/Sections").then((m) => ({ default: m.TestimonialSection })),
  { loading: sectionLoading }
);

const StudentShowcase = dynamic(
  () => import("@/components/StudentShowcase").then((m) => ({ default: m.StudentShowcase })),
  { loading: sectionLoading }
);

const FaqSection = dynamic(
  () => import("@/components/FaqSection").then((m) => ({ default: m.FaqSection })),
  { loading: sectionLoading }
);

const Footer = dynamic(
  () => import("@/components/Sections").then((m) => ({ default: m.Footer })),
  { loading: sectionLoading }
);

export default function LandingPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [introSession, setIntroSession] = useState(0);
  const handleIntroComplete = useCallback(() => setShowIntro(false), []);
  const replayIntro = useCallback(() => {
    setIntroSession((n) => n + 1);
    setShowIntro(true);
        window.scrollTo(0, 0);
  }, []);

  return (
    <OnboardingProvider>
      <main className="min-h-screen bg-white selection:bg-sky-100 selection:text-sky-900">
        {showIntro && <IntroAnimation key={introSession} onComplete={handleIntroComplete} />}
        <Navbar onHomeLogoClick={replayIntro} />
        <HeroSection />

        <PlaybookSection />
        <TestimonialSection />
        <FaqSection />
        <StudentShowcase />
        <Footer />
      </main>
    </OnboardingProvider>
  );
}
