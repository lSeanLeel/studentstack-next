import Link from "next/link";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";
import { BrandWordmark } from "@/components/BrandWordmark";
import { ContactForm } from "@/components/ContactForm";

/**
 * Soft reach-out page (legacy /elite URL). No product/pricing pitch, personal reply path.
 */
export default function ReachOutPage() {
  return (
    <main className={`min-h-screen bg-[#f1f5f9] ${jakartaSans.className}`}>
      <section className="border-b border-slate-200 bg-white px-4 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-12">
        <div className="mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          <div>
            <Link href="/" className="inline-flex" aria-label="StudentStack home">
              <BrandWordmark />
            </Link>
            <p className="mt-10 text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00]">Reach out</p>
            <h1
              className={`mt-3 max-w-xl text-3xl font-semibold tracking-[-0.035em] text-slate-900 sm:text-5xl ${fredokaHeadline.className}`}
            >
              A personal reply from a student-led team
            </h1>
            <p
              className={`ss-institutional mt-5 max-w-xl text-[1.1rem] leading-[1.7] text-slate-700 ${institutionalSerif.className}`}
            >
              Most families start with our free daily on AI for student organization. If you want a closer conversation
              about supporting your high schooler, send a note. We respond personally.
            </p>
            <p className="mt-6 text-sm font-medium text-slate-500">
              Prefer the newsletter first?{" "}
              <Link href="/#hero-cta" className="font-bold text-sky-700 hover:text-sky-900">
                Join free on the home page
              </Link>
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-[#f8fafc] p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.4)] sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
