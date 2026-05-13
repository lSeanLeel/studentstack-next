"use client";

import React, { Suspense, lazy, useCallback, useState } from "react";
import { Navbar } from "../components/Navbar";
import { IntroAnimation } from "../components/IntroAnimation";
import { HeroSection } from "../components/HeroSection";
import { OnboardingProvider } from "../components/onboarding-context";
const StudentShowcase = lazy(() =>
  import("../components/StudentShowcase").then((mod) => ({ default: mod.StudentShowcase }))
);
const PlaybookSection = lazy(() =>
  import("../components/PlaybookSection").then((mod) => ({ default: mod.PlaybookSection }))
);
const loadSections = () => import("../components/Sections");

const TestimonialSection = lazy(() =>
  loadSections().then((mod) => ({ default: mod.TestimonialSection }))
);
const FaqSection = lazy(() =>
  import("../components/FaqSection").then((mod) => ({ default: mod.FaqSection }))
);
const Footer = lazy(() => loadSections().then((mod) => ({ default: mod.Footer })));

export default function LandingPage() {
  const [showIntro, setShowIntro] = useState(true);
  const handleIntroComplete = useCallback(() => setShowIntro(false), []);

  return (
    <OnboardingProvider>
      <main className="min-h-screen bg-white selection:bg-sky-100 selection:text-sky-900">
        {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
        <Navbar />
        <HeroSection />

        <Suspense fallback={<div className="h-96" />}>
          <PlaybookSection />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <TestimonialSection />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <StudentShowcase />
        </Suspense>

        <Suspense fallback={<div className="h-96" />}>
          <FaqSection />
        </Suspense>

        <Suspense fallback={<div className="h-96" />}>
          <Footer />
        </Suspense>
      </main>
    </OnboardingProvider>
  );
}
