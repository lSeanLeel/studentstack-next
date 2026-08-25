import Link from "next/link";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { BrandWordmark } from "@/components/BrandWordmark";

/** Open signup is closed. Member credentials follow the parent registration path. */
export default function SignupPage() {
  return (
    <main className={`min-h-screen bg-[#f8fafc] px-4 py-10 sm:px-6 ${jakartaSans.className}`}>
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="inline-flex" aria-label="StudentStack home">
          <BrandWordmark compact />
        </Link>

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)] sm:p-8">
          <h1 className={`text-2xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}>
            Membership access is invite-only
          </h1>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
            Student accounts are created after a parent registers and access is assigned. You will receive login
            credentials. Sign in here after that.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-slate-800"
            >
              Student login
            </Link>
            <Link
              href="/join"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
            >
              Join our Community
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
