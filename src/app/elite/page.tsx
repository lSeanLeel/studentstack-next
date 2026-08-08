import Link from "next/link";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { BrandWordmark } from "@/components/BrandWordmark";

/** Soft landing for legacy /elite URLs while membership lives in the portal. */
export default function ElitePage() {
  return (
    <main className={`min-h-screen bg-[#f8fafc] px-4 py-12 sm:px-8 ${jakartaSans.className}`}>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <Link href="/" className="inline-flex" aria-label="StudentStack home">
          <BrandWordmark />
        </Link>
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 sm:p-10">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00]">Membership</p>
          <h1 className={`mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl ${fredokaHeadline.className}`}>
            Go further inside the student portal
          </h1>
          <p className="mt-4 text-base font-medium leading-relaxed text-slate-600">
            The free daily newsletter is the front door. Paid membership, courses, and certification live behind a student
            login so progress stays in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/portal/membership"
              className="inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-white hover:bg-slate-800"
            >
              Open membership
            </Link>
            <Link
              href="/"
              className="inline-flex rounded-2xl border border-slate-200 px-5 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-slate-700 hover:border-sky-200 hover:text-sky-700"
            >
              Back home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
