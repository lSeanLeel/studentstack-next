"use client";

import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { IntroAnimation } from "@/components/IntroAnimation";
import { HeroSection } from "@/components/HeroSection";
import { OnboardingProvider } from "@/components/onboarding-context";
import { ContactProvider } from "@/components/contact-context";
import { JoinProvider } from "@/components/join-context";

const sectionLoading = () => <div className="h-96" aria-hidden />;

const AiForSchoolSection = dynamic(
  () => import("@/components/AiForSchoolSection").then((m) => ({ default: m.AiForSchoolSection })),
  { loading: sectionLoading, ssr: false }
);

const ParentReachSection = dynamic(
  () => import("@/components/ParentReachSection").then((m) => ({ default: m.ParentReachSection })),
  { loading: sectionLoading, ssr: false }
);

const TestimonialSection = dynamic(
  () => import("@/components/Sections").then((m) => ({ default: m.TestimonialSection })),
  { loading: sectionLoading, ssr: false }
);

const PortalPreviewSection = dynamic(
  () => import("@/components/PortalPreviewSection").then((m) => ({ default: m.PortalPreviewSection })),
  { loading: sectionLoading, ssr: false }
);

const FaqSection = dynamic(
  () => import("@/components/FaqSection").then((m) => ({ default: m.FaqSection })),
  { loading: sectionLoading, ssr: false }
);

const WriteUsSection = dynamic(
  () => import("@/components/WriteUsSection").then((m) => ({ default: m.WriteUsSection })),
  { loading: sectionLoading, ssr: false }
);

const Footer = dynamic(
  () => import("@/components/Sections").then((m) => ({ default: m.Footer })),
  { loading: sectionLoading, ssr: false }
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
        <JoinProvider>
          <main className="min-h-screen bg-transparent selection:bg-sky-100 selection:text-sky-900">
            {showIntro && <IntroAnimation key={introSession} onComplete={handleIntroComplete} />}
            <Navbar onHomeLogoClick={replayIntro} />
            <HeroSection />
            <AiForSchoolSection />
            <ParentReachSection />
            <TestimonialSection />
            <PortalPreviewSection />
            <FaqSection />
            <WriteUsSection />
            <Footer />
          </main>
        </JoinProvider>
      </ContactProvider>
    </OnboardingProvider>
  );
}
