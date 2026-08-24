import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BrandWordmark } from "@/components/BrandWordmark";
import { jakartaSans } from "@/app/fonts";
import { PortalSignOutButton } from "@/components/portal/PortalSignOutButton";
import { getPortalMember } from "@/lib/portal/session";
import { PORTAL_PROGRESS } from "@/lib/portal/quests";
import { Flame, Trophy } from "lucide-react";

const nav = [
  { href: "/portal", label: "Home" },
  { href: "/portal/toolkit", label: "AI Toolkit" },
  { href: "/portal/vault", label: "Vault" },
  { href: "/portal/certifications", label: "Certifications" },
  { href: "/portal/resources", label: "Resources" },
] as const;

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const member = await getPortalMember();

  if (!member) {
    redirect("/login?next=/portal");
  }

  return (
    <div
      className={`min-h-screen bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,#bae6fd_0%,transparent_55%),radial-gradient(ellipse_50%_40%_at_100%_0%,#a7f3d0_0%,transparent_45%),linear-gradient(180deg,#f0f9ff_0%,#f8fafc_40%,#ecfdf5_100%)] ${jakartaSans.className}`}
    >
      <header className="border-b border-sky-100/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/portal" aria-label="Portal home">
              <BrandWordmark compact />
            </Link>
            <nav className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-slate-600 transition hover:bg-sky-50 hover:text-sky-700"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden items-center gap-1.5 rounded-2xl bg-slate-900 px-2.5 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-white sm:inline-flex">
              <Trophy className="h-3 w-3 text-amber-300" aria-hidden />
              Lv {PORTAL_PROGRESS.level}
            </span>
            <span className="hidden items-center gap-1.5 rounded-2xl bg-orange-50 px-2.5 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-orange-700 md:inline-flex">
              <Flame className="h-3 w-3" aria-hidden />
              {PORTAL_PROGRESS.streakDays}d
            </span>
            <span className="hidden max-w-[10rem] truncate text-xs font-medium text-slate-500 md:inline">
              {member.email}
            </span>
            <PortalSignOutButton />
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-slate-600 hover:bg-sky-50 hover:text-sky-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
    </div>
  );
}
