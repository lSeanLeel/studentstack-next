import Link from "next/link";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { BrandWordmark } from "@/components/BrandWordmark";
import { ElitePurchaseForm } from "@/components/ElitePurchaseForm";

export default function ElitePage() {
  return (
    <main className={`min-h-screen bg-[#f8fafc] px-4 py-10 sm:px-8 sm:py-14 ${jakartaSans.className}`}>
      <div className="mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
        <div>
          <Link href="/" className="inline-flex" aria-label="StudentStack home">
            <BrandWordmark />
          </Link>
          <p className="mt-10 text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00]">
            StudentStack Elite
          </p>
          <h1
            className={`mt-3 text-3xl font-semibold tracking-[-0.035em] text-slate-900 sm:text-5xl ${fredokaHeadline.className}`}
          >
            Subscribe your student to the Edge
          </h1>
          <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
            Parents start with our free daily newsletter to learn how their student can use AI to stay organized for
            school. Elite is the direct subscription: your student logs into a private portal to check postings for the
            tools we use across school categories.
          </p>

          <ul className="mt-8 space-y-4 text-sm font-medium text-slate-700">
            <li className="rounded-[1.5rem] border border-slate-100 bg-white px-5 py-4">
              <span className={`${fredokaHeadline.className} text-lg font-semibold text-slate-900`}>
                School-category postings
              </span>
              <p className="mt-1 text-slate-600">
                Organization, notetaking, planning, studying, writing, and research: living updates from the
                college-student side of the same work.
              </p>
            </li>
            <li className="rounded-[1.5rem] border border-slate-100 bg-white px-5 py-4">
              <span className={`${fredokaHeadline.className} text-lg font-semibold text-slate-900`}>
                A gamified, intricate portal
              </span>
              <p className="mt-1 text-slate-600">
                Built as their Edge: progress-oriented, continually refreshed, and designed for high schoolers who want
                more than a tip email.
              </p>
            </li>
            <li className="rounded-[1.5rem] border border-slate-100 bg-white px-5 py-4">
              <span className={`${fredokaHeadline.className} text-lg font-semibold text-slate-900`}>
                Already used by other parents
              </span>
              <p className="mt-1 text-slate-600">
                You subscribe. Your student signs in. Quiet, credible support that stays educational.
              </p>
            </li>
          </ul>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.3)] sm:p-8">
          <h2 className={`text-xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
            Start the subscription
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-600">
            Billing goes to the parent email. Portal access goes to the student email.
          </p>
          <div className="mt-6">
            <ElitePurchaseForm />
          </div>
          <p className="mt-5 text-center text-xs font-medium text-slate-500">
            Already have access?{" "}
            <Link href="/login" className="font-bold text-sky-700 hover:text-sky-900">
              Student portal login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
