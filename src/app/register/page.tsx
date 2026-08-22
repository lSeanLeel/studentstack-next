import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { BrandWordmark } from "@/components/BrandWordmark";
import { RegisterForm } from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className={`min-h-screen bg-[#f8fafc] px-4 py-10 sm:px-8 sm:py-14 ${jakartaSans.className}`}>
      <div className="mx-auto w-full max-w-lg">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500 transition-colors hover:text-sky-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back
        </Link>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_48px_-32px_rgba(15,23,42,0.2)] sm:p-9">
          <BrandWordmark />
          <p className={`mt-6 text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
            Community
          </p>
          <h1
            className={`mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl ${fredokaHeadline.className}`}
          >
            Join our Community
          </h1>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
            Parents enroll their student into a community led by college students. Tell us about your student and we
            will prepare their access path.
          </p>

          <div className="mt-8">
            <RegisterForm />
          </div>

          <p className="mt-5 text-center text-xs font-medium text-slate-400">
            Your student does not need to be present to join.
          </p>
        </div>
      </div>
    </main>
  );
}
