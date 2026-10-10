import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { ApplicationForm } from "@/components/program/ApplicationForm";
import { institutionalSerif, jakartaSans } from "@/app/fonts";
import { COHORT } from "@/lib/program";

export const metadata: Metadata = {
  title: `Apply for the ${COHORT.monthLabel} cohort | StudentStack`,
  description: "Apply to StudentStack, a monthly AI program for high school students. Enrollment is limited each month.",
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-white px-5 pb-24 pt-28 text-ink sm:px-8 sm:pt-36">
      <Navbar />
      <header className="mx-auto mb-12 max-w-2xl">
        <p className={`${jakartaSans.className} text-sm font-semibold text-accent`}>
          {COHORT.monthLabel} cohort, {COHORT.seats} families
        </p>
        <h1 className={`${institutionalSerif.className} mt-2 text-[2.4rem] font-semibold leading-[1.1] tracking-[-0.01em] sm:text-5xl`}>
          Application for admission
        </h1>
        <p className={`${jakartaSans.className} mt-4 max-w-[60ch] text-[1.05rem] leading-relaxed text-body`}>
          The application takes about five minutes. Our team reads each one and replies to every family by email.
        </p>
      </header>
      <ApplicationForm />
    </main>
  );
}
