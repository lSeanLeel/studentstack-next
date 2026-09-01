"use client";

import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { IntroAnimation } from "@/components/IntroAnimation";
import { HeroSection } from "@/components/HeroSection";
import { OnboardingProvider } from "@/components/onboarding-context";
import { ContactProvider } from "@/components/contact-context";

const sectionLoading = () => <div className="h-96" aria-hidden />;

const clientOnly = { loading: sectionLoading, ssr: false } as const;

const AiForSchoolSection = dynamic(
  () => import("@/components/AiForSchoolSection").then((m) => ({ default: m.AiForSchoolSection })),
  clientOnly
);

const ParentReachSection = dynamic(
  () => import("@/components/ParentReachSection").then((m) => ({ default: m.ParentReachSection })),
  clientOnly
);

const PartnerEcosystemSection = dynamic(
  () => import("@/components/PartnerEcosystemSection").then((m) => ({ default: m.PartnerEcosystemSection })),
  clientOnly
);

const TestimonialSection = dynamic(
  () => import("@/components/Sections").then((m) => ({ default: m.TestimonialSection })),
  clientOnly
);

const PortalPreviewSection = dynamic(
  () => import("@/components/PortalPreviewSection").then((m) => ({ default: m.PortalPreviewSection })),
  clientOnly
);

const FaqSection = dynamic(
  () => import("@/components/FaqSection").then((m) => ({ default: m.FaqSection })),
  clientOnly
);

const WriteUsSection = dynamic(
  () => import("@/components/WriteUsSection").then((m) => ({ default: m.WriteUsSection })),
  clientOnly
);

const Footer = dynamic(
  () => import("@/components/Sections").then((m) => ({ default: m.Footer })),
  clientOnly
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
          <AiForSchoolSection />
          <ParentReachSection />
          <PartnerEcosystemSection />
          <TestimonialSection />
          <PortalPreviewSection />
          <FaqSection />
          <WriteUsSection />
          <Footer />
        </main>
      </ContactProvider>
    </OnboardingProvider>
  );
}
