import Link from "next/link";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

export function EliteGate() {
  return (
    <div className="rounded-[2rem] border border-slate-100 bg-white p-8 sm:p-10">
      <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
        Elite access needed
      </p>
      <h1 className={`mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl ${fredokaHeadline.className}`}>
        Ask a parent to unlock the portal
      </h1>
      <p className={`mt-3 max-w-xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base ${jakartaSans.className}`}>
        StudentStack Elite is purchased by a parent and tied to your student email. Once they complete checkout, this
        toolkit and the exclusive resources unlock here.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-2xl border border-slate-200 px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.12em] text-slate-700 hover:border-sky-200 hover:text-sky-700"
      >
        Back to StudentStack
      </Link>
    </div>
  );
}
