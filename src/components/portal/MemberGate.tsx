import Link from "next/link";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

export function MemberGate() {
  return (
    <div className="rounded-[2rem] border border-slate-100 bg-white p-8 sm:p-10">
      <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
        Membership required
      </p>
      <h1 className={`mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl ${fredokaHeadline.className}`}>
        This portal is for members
      </h1>
      <p className={`mt-3 max-w-xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base ${jakartaSans.className}`}>
        StudentStack is a private membership for AI literacy at school. Once your family joins and you have login
        credentials, sign in here.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/login"
          className="inline-flex rounded-2xl bg-slate-900 px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.12em] text-white hover:bg-slate-800"
        >
          Student login
        </Link>
        <Link
          href="/join"
          className="inline-flex rounded-2xl border border-slate-200 px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.12em] text-slate-700 hover:border-sky-200 hover:text-sky-700"
        >
          Join membership
        </Link>
      </div>
    </div>
  );
}
