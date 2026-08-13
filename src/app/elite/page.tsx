import Link from "next/link";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";
import { BrandWordmark } from "@/components/BrandWordmark";
import { EliteInquiryForm } from "@/components/EliteInquiryForm";

export default function ElitePage() {
  return (
    <main className={`min-h-screen bg-[#f1f5f9] ${jakartaSans.className}`}>
      <section className="border-b border-slate-200 bg-white px-4 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-12">
        <div className="mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          <div>
            <Link href="/" className="inline-flex" aria-label="StudentStack home">
              <BrandWordmark />
            </Link>
            <p className="mt-10 text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00]">
              StudentStack Elite
            </p>
            <h1
              className={`mt-3 max-w-xl text-3xl font-semibold tracking-[-0.035em] text-slate-900 sm:text-5xl ${fredokaHeadline.className}`}
            >
              Inquire about Elite for your student
            </h1>
            <p
              className={`ss-institutional mt-5 max-w-xl text-[1.1rem] leading-[1.7] text-slate-700 ${institutionalSerif.className}`}
            >
              StudentStack begins as a free daily newsletter for parents — how high schoolers use AI to stay organized
              for school.
            </p>
            <p
              className={`ss-institutional mt-3 max-w-xl text-[1.05rem] leading-[1.7] text-slate-600 ${institutionalSerif.className}`}
            >
              Elite is a separate conversation. Share your student’s information and we’ll follow up if it’s a fit. No
              checkout here.
            </p>
            <p className="mt-6 text-sm font-medium text-slate-500">
              Already invited?{" "}
              <Link href="/login" className="font-bold text-sky-700 hover:text-sky-900">
                Student login
              </Link>
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-[#f8fafc] p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.4)] sm:p-8">
            <EliteInquiryForm />
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="/"
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-slate-700 hover:border-sky-200 hover:text-sky-700"
          >
            Back to free newsletter
          </Link>
        </div>
      </section>
    </main>
  );
}
