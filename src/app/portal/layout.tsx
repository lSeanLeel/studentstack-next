import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BrandWordmark } from "@/components/BrandWordmark";
import { jakartaSans } from "@/app/fonts";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PortalSignOutButton } from "@/components/portal/PortalSignOutButton";

const nav = [
  { href: "/portal", label: "Home" },
  { href: "/portal/toolkit", label: "AI Toolkit" },
  { href: "/portal/vault", label: "Vault" },
  { href: "/portal/certifications", label: "Certifications" },
  { href: "/portal/resources", label: "Resources" },
] as const;

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/portal");
  }

  return (
    <div className={`min-h-screen bg-[#f8fafc] ${jakartaSans.className}`}>
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
          <div className="flex items-center gap-3">
            <span className="hidden text-xs font-medium text-slate-500 md:inline">{user.email}</span>
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
