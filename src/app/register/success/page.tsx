import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { BrandWordmark } from "@/components/BrandWordmark";

type Props = {
  searchParams: Promise<{ student?: string; email?: string }>;
};

export default async function RegisterSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const studentName = params.student?.trim();
  const parentEmail = params.email?.trim();

  return (
    <main className={`min-h-screen bg-[#f8fafc] px-4 py-10 sm:px-8 sm:py-14 ${jakartaSans.className}`}>
      <div className="mx-auto w-full max-w-lg">
        <div className="rounded-[2rem] border border-emerald-200 bg-white p-6 shadow-[0_24px_48px_-32px_rgba(15,23,42,0.15)] sm:p-9">
          <BrandWordmark />

          <div className="mt-8 flex flex-col items-center text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" aria-hidden />
            </div>

            <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-emerald-600 ${jakartaSans.className}`}>
              You are in
            </p>
            <h1
              className={`mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl ${fredokaHeadline.className}`}
            >
              {studentName ? `${studentName} joined the community` : "Your student joined the community"}
            </h1>
          </div>

          <div className="mt-8 space-y-4 text-sm font-medium leading-relaxed text-slate-600">
            <p>
              Our campus desk reviews each enrollment and assigns a member path: portal access, programs we push, and
              the work we expect them to complete. Nothing is pulled from a public catalog.
            </p>
            <p>
              Portal credentials are issued once access is assigned.{" "}
              {parentEmail ? (
                <>
                  Watch <span className="font-bold text-slate-800">{parentEmail}</span> for enrollment details.
                </>
              ) : (
                <>Watch the parent email you provided for enrollment details.</>
              )}
            </p>
            <p className="text-slate-500">
              Typical turnaround is within 24 hours. Your student does not need to take any action until credentials
              arrive.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-slate-800"
            >
              Back home
            </Link>
            <Link
              href="/login"
              className="inline-flex rounded-2xl border border-slate-200 px-5 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
            >
              Student login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
