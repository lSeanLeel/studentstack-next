import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { ApplicationForm } from "@/components/program/ApplicationForm";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { COHORT } from "@/lib/program";

export const metadata: Metadata = {
  title: `Apply · ${COHORT.name} | StudentStack`,
  description: "Apply for StudentStack's monthly AI program for high schoolers. Limited seats each month.",
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-transparent px-4 pb-24 pt-28 selection:bg-sky-100 selection:text-sky-900 sm:px-6 sm:pt-36">
      <Navbar />
      <header className="mx-auto mb-10 max-w-2xl text-center">
        <p className={`${jakartaSans.className} inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/90 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-700`}>
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
          {COHORT.name} · {COHORT.seats} families
        </p>
        <h1 className={`${fredokaHeadline.className} mt-5 text-[2.5rem] font-semibold leading-[1] tracking-[-0.035em] text-slate-900 sm:text-6xl`}>
          Apply to <span className="text-sky-500">StudentStack</span>
        </h1>
        <p className={`${jakartaSans.className} mx-auto mt-4 max-w-lg text-base font-medium leading-relaxed text-slate-600 sm:text-lg`}>
          About two minutes. Our team reads every application and replies to each family personally.
        </p>
      </header>
      <ApplicationForm />
    </main>
  );
}
