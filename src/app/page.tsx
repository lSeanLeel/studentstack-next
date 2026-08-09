"use client";

import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { IntroAnimation } from "@/components/IntroAnimation";
import { HeroSection } from "@/components/HeroSection";
import { OnboardingProvider } from "@/components/onboarding-context";
import { ContactProvider } from "@/components/contact-context";

const sectionLoading = () => <div className="h-96" aria-hidden />;

const AiAdvantageSection = dynamic(
  () => import("@/components/AiAdvantageSection").then((m) => ({ default: m.AiAdvantageSection })),
  { loading: sectionLoading }
);

const DifferenceSection = dynamic(
  () => import("@/components/DifferenceSection").then((m) => ({ default: m.DifferenceSection })),
  { loading: sectionLoading }
);

const EliteSection = dynamic(
  () => import("@/components/EliteSection").then((m) => ({ default: m.EliteSection })),
  { loading: sectionLoading }
);

const FaqSection = dynamic(
  () => import("@/components/FaqSection").then((m) => ({ default: m.FaqSection })),
  { loading: sectionLoading }
);

const FinalCTA = dynamic(
  () => import("@/components/Sections").then((m) => ({ default: m.FinalCTA })),
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
      <ContactProvider>
        <main className="min-h-screen bg-transparent selection:bg-sky-100 selection:text-sky-900">
          {showIntro && <IntroAnimation key={introSession} onComplete={handleIntroComplete} />}
          <Navbar onHomeLogoClick={replayIntro} />
          <HeroSection />
          <AiAdvantageSection />
          <DifferenceSection />
          <EliteSection />
          <FaqSection />
          <FinalCTA />
          <Footer />
        </main>
      </ContactProvider>
    </OnboardingProvider>
  );
}
