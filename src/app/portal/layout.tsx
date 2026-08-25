import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BrandWordmark } from "@/components/BrandWordmark";
import { jakartaSans } from "@/app/fonts";
import { PortalNav } from "@/components/portal/PortalNav";
import { PortalSignOutButton } from "@/components/portal/PortalSignOutButton";
import { getPortalMember } from "@/lib/portal/session";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const member = await getPortalMember();

  if (!member) {
    redirect("/login?next=/portal");
  }

  return (
    <div
      className={`min-h-screen bg-[#eef8ff] ${jakartaSans.className}`}
      style={{
        backgroundImage:
          "radial-gradient(ellipse 90% 60% at 50% -15%, rgba(125,211,252,0.45), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 0%, rgba(167,243,208,0.35), transparent 45%), linear-gradient(180deg, #e0f2fe 0%, #f8fafc 35%, #f0fdf4 100%)",
      }}
    >
      <header className="sticky top-0 z-40 border-b-2 border-sky-100/80 bg-white/95 shadow-[0_4px_0_0_rgba(14,165,233,0.08)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/portal" aria-label="Portal home" className="shrink-0">
              <BrandWordmark compact />
            </Link>
            <PortalNav />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden text-right sm:block">
              <p className={`text-[10px] font-black uppercase tracking-[0.12em] text-sky-600 ${jakartaSans.className}`}>
                Member
              </p>
              <p className={`max-w-[10rem] truncate text-xs font-semibold text-slate-700 ${jakartaSans.className}`}>
                {member.displayName}
              </p>
            </div>
            <span
              className={`hidden rounded-2xl bg-emerald-50 px-2.5 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-emerald-700 ring-1 ring-emerald-200 md:inline ${jakartaSans.className}`}
            >
              Active
            </span>
            <PortalSignOutButton />
          </div>
        </div>
        <div className="border-t border-sky-50 px-4 py-2.5 lg:hidden">
          <PortalNav mobile />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>

      <footer className="border-t-2 border-sky-100 bg-white/80 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6">
          <p className={`text-xs font-medium text-slate-500 ${jakartaSans.className}`}>
            StudentStack member portal · Built by college students
          </p>
          <Link
            href="/"
            className={`text-xs font-bold text-sky-700 hover:text-sky-900 ${jakartaSans.className}`}
          >
            studentstack.info
          </Link>
        </div>
      </footer>
    </div>
  );
}
