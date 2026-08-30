import Link from "next/link";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { PortalEyebrow, PortalPrimaryButton, portalCard } from "@/components/portal/portal-ui";

export function MemberGate() {
  return (
    <div className={`${portalCard} p-8 sm:p-10`}>
      <PortalEyebrow className="text-orange-600">Membership required</PortalEyebrow>
      <h1 className={`mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl ${fredokaHeadline.className}`}>
        This portal is for members
      </h1>
      <p className={`mt-3 max-w-xl text-sm font-medium leading-relaxed text-slate-500 sm:text-base ${jakartaSans.className}`}>
        StudentStack is a private membership for AI literacy at school. Once your family joins and you have login
        credentials, sign in here.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <PortalPrimaryButton href="/login">Student login</PortalPrimaryButton>
        <Link
          href="/join"
          className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-black/[0.08] transition hover:bg-black/[0.03] ${jakartaSans.className}`}
        >
          Join membership
        </Link>
      </div>
    </div>
  );
}
