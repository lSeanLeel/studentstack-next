"use client";

import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { IntroAnimation } from "@/components/IntroAnimation";
import { HeroSection } from "@/components/HeroSection";
import { OnboardingProvider } from "@/components/onboarding-context";
import { ContactProvider } from "@/components/contact-context";
import {
  AdvantageSection,
  CohortSection,
  FinalCtaSection,
  MonthlyCycleSection,
  NewsletterSection,
  PartnersSection,
  ProgramSection,
  ThesisSection,
} from "@/components/program/ProgramSections";

const sectionLoading = () => <div className="h-96" aria-hidden />;

const TestimonialSection = dynamic(
  () => import("@/components/Sections").then((m) => ({ default: m.TestimonialSection })),
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
      <ContactProvider>
        <main className="min-h-screen bg-transparent selection:bg-sky-100 selection:text-sky-900">
          {showIntro && <IntroAnimation key={introSession} onComplete={handleIntroComplete} />}
          <Navbar onHomeLogoClick={replayIntro} />
          {/* 1. Hook: who we are + cohort open */}
          <HeroSection />
          {/* 2. Why: the thesis */}
          <ThesisSection />
          {/* 3. What: the program */}
          <ProgramSection />
          {/* 4. How it stays current */}
          <MonthlyCycleSection />
          {/* 5. Why us + founder */}
          <AdvantageSection />
          <TestimonialSection />
          {/* 6. Partners */}
          <PartnersSection />
          {/* 7. Scarcity + application flow */}
          <CohortSection />
          {/* 8. Not ready yet: newsletter */}
          <NewsletterSection />
          <FaqSection />
          <FinalCtaSection />
          <Footer />
        </main>
      </ContactProvider>
    </OnboardingProvider>
  );
}
