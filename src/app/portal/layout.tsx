import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BrandWordmark } from "@/components/BrandWordmark";
import { jakartaSans } from "@/app/fonts";
import { PortalNav } from "@/components/portal/PortalNav";
import { PortalSignOutButton } from "@/components/portal/PortalSignOutButton";
import { portalShellBg } from "@/components/portal/portal-ui";
import { getPortalMember } from "@/lib/portal/session";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const member = await getPortalMember();

  if (!member) {
    redirect("/login?next=/portal");
  }

  return (
    <div className={`${portalShellBg} ${jakartaSans.className}`}>
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-[#f5f5f7]/80 backdrop-blur-2xl backdrop-saturate-150">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-3.5">
          <div className="flex min-w-0 items-center gap-5 sm:gap-8">
            <Link href="/portal" aria-label="Membership home" className="shrink-0">
              <BrandWordmark compact />
            </Link>
            <PortalNav />
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className={`hidden text-sm font-medium text-slate-600 sm:inline ${jakartaSans.className}`}>
              {member.displayName}
            </span>
            <PortalSignOutButton />
          </div>
        </div>
        <div className="border-t border-black/[0.04] px-4 py-2 lg:hidden">
          <PortalNav mobile />
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">{children}</main>

      <footer className="border-t border-black/[0.06] py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
          <p className={`text-sm font-medium text-slate-400 ${jakartaSans.className}`}>Membership</p>
          <Link
            href="/"
            className={`text-sm font-semibold text-sky-600 hover:text-sky-700 ${jakartaSans.className}`}
          >
            studentstack.info
          </Link>
        </div>
      </footer>
    </div>
  );
}
