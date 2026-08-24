import Link from "next/link";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { getPortalMember } from "@/lib/portal/session";

/** Students don't buy here. Parents purchase via /join. */
export default async function PortalMembershipPage() {
  const member = await getPortalMember();
  if (!member) return null;

  const active = member.elite;
  const access = member.access;

  return (
    <div className="max-w-2xl">
      <h1 className={`text-3xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}>
        Membership
      </h1>
      <p className={`mt-2 text-sm font-medium text-slate-600 sm:text-base ${jakartaSans.className}`}>
        Membership is purchased by a parent and unlocked on your student login.
      </p>

      <div className="mt-8 rounded-[1.75rem] border-2 border-slate-100 bg-white p-6 shadow-[0_10px_0_0_rgba(15,23,42,0.05)]">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Your access</p>
        <p className={`mt-2 text-2xl font-semibold text-slate-900 ${fredokaHeadline.className}`}>
          {active ? "StudentStack member" : "Not unlocked yet"}
        </p>
        <p className="mt-1 text-sm font-medium text-slate-500">Status: {access.status}</p>
        {access.parentEmail ? (
          <p className="mt-2 text-sm font-medium text-slate-500">Gifted by {access.parentEmail}</p>
        ) : null}

        {!active ? (
          <p className={`mt-6 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>
            Ask a parent to complete{" "}
            <Link href="/join" className="font-bold text-sky-700 hover:text-sky-900">
              Join our Community
            </Link>{" "}
            using this student login.
          </p>
        ) : (
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/portal/toolkit"
              className="rounded-2xl bg-slate-900 px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.12em] text-white hover:bg-slate-800"
            >
              Open AI toolkit
            </Link>
            <Link
              href="/portal/resources"
              className="rounded-2xl border border-slate-200 px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.12em] text-slate-700 hover:border-sky-200 hover:text-sky-700"
            >
              Open resources
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
