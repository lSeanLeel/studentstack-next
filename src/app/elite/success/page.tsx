import Link from "next/link";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { BrandWordmark } from "@/components/BrandWordmark";

export default function EliteSuccessPage() {
  return (
    <main className={`min-h-screen bg-[#f8fafc] px-4 py-12 sm:px-8 ${jakartaSans.className}`}>
      <div className="mx-auto w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 sm:p-10">
        <BrandWordmark />
        <h1 className={`mt-8 text-3xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}>
          Subscription confirmed
        </h1>
        <p className="mt-3 text-base font-medium leading-relaxed text-slate-600">
          Thanks for unlocking StudentStack Elite. We generate a unique student login and temporary password for the
          student email you entered. Our team delivers those credentials to the parent email on file (usually within
          minutes of checkout).
        </p>
        <p className="mt-3 text-sm font-medium text-slate-500">
          Your student should sign in at Student login, then change the temporary password after the first visit.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-2xl bg-slate-900 px-5 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-white hover:bg-slate-800"
          >
            Back home
          </Link>
          <Link
            href="/login"
            className="rounded-2xl border border-slate-200 px-5 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-slate-700 hover:border-sky-200 hover:text-sky-700"
          >
            Student sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
