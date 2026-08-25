import Link from "next/link";
import { jakartaSans } from "@/app/fonts";
import { BrandWordmark } from "@/components/BrandWordmark";
import { JoinSuccessPanel } from "@/components/JoinFlow";

type Props = {
  searchParams: Promise<{ student?: string; email?: string; session_id?: string; demo?: string }>;
};

export default async function JoinSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const studentName = params.student?.trim();
  const parentEmail = params.email?.trim();

  return (
    <main className={`min-h-screen bg-[#f8fafc] px-4 py-10 sm:px-8 sm:py-14 ${jakartaSans.className}`}>
      <div className="mx-auto w-full max-w-lg">
        <div className="rounded-[2rem] border border-emerald-200 bg-white p-6 shadow-[0_24px_48px_-32px_rgba(15,23,42,0.15)] sm:p-9">
          <BrandWordmark />
          <div className="mt-8">
            <JoinSuccessPanel studentName={studentName} parentEmail={parentEmail} />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
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
