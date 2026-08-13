"use client";

import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { IntroAnimation } from "@/components/IntroAnimation";
import { HeroSection } from "@/components/HeroSection";
import { OnboardingProvider } from "@/components/onboarding-context";
import { ContactProvider } from "@/components/contact-context";

const sectionLoading = () => <div className="h-96" aria-hidden />;

const NewsletterPulseSection = dynamic(
  () => import("@/components/NewsletterPulseSection").then((m) => ({ default: m.NewsletterPulseSection })),
  { loading: sectionLoading }
);

const CertificationsSection = dynamic(
  () => import("@/components/CertificationsSection").then((m) => ({ default: m.CertificationsSection })),
  { loading: sectionLoading }
);

const PhilosophySection = dynamic(
  () => import("@/components/PhilosophySection").then((m) => ({ default: m.PhilosophySection })),
  { loading: sectionLoading }
);

const ReachOutSection = dynamic(
  () => import("@/components/ReachOutSection").then((m) => ({ default: m.ReachOutSection })),
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
          <NewsletterPulseSection />
          <CertificationsSection />
          <PhilosophySection />
          <ReachOutSection />
          <FaqSection />
          <FinalCTA />
          <Footer />
        </main>
      </ContactProvider>
    </OnboardingProvider>
  );
}
