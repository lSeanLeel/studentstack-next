"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { OnboardingProvider } from "@/components/onboarding-context";
import { ContactProvider } from "@/components/contact-context";
import {
  AdmissionsSection,
  CurriculumSection,
  FinalCtaSection,
  MonthlyCycleSection,
  NewsletterSection,
  PartnersSection,
  ProgramHero,
  ThesisSection,
} from "@/components/program/ProgramSections";
import { ProgramFaq, ProgramFooter } from "@/components/program/ProgramFooterFaq";

export default function LandingPage() {
  return (
    <OnboardingProvider>
      <ContactProvider>
        <main className="min-h-screen bg-white text-ink selection:bg-[#D6E4F2]">
          <Navbar />
          <ProgramHero />
          <ThesisSection />
          <CurriculumSection />
          <MonthlyCycleSection />
          <PartnersSection />
          <AdmissionsSection />
          <NewsletterSection />
          <ProgramFaq />
          <FinalCtaSection />
          <ProgramFooter />
        </main>
      </ContactProvider>
    </OnboardingProvider>
  );
}
