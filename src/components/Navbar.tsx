import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Users, MailOpen } from "lucide-react";
import { jakartaSans } from "@/app/fonts";
import { BrandWordmark } from "./BrandWordmark";
import { useOnboarding } from "./onboarding-context";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openOnboarding } = useOnboarding();

  const navItems = [
    { label: "The email", href: "#weekly-email", icon: MailOpen },
    { label: "Team", href: "#mentors", icon: Users },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav className="pointer-events-auto mx-auto w-full max-w-6xl rounded-[2rem] border border-sky-200/70 bg-white/85 px-4 py-3 shadow-[0_14px_36px_-20px_rgba(14,165,233,0.5)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-22px_rgba(14,165,233,0.55)] sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
            aria-label="StudentStack home"
          >
            <BrandWordmark />
          </Link>

          <div className={`hidden items-center gap-1 md:flex ${jakartaSans.className}`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-600 transition-all hover:-translate-y-0.5 hover:bg-sky-50 hover:text-sky-700"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="hidden items-center md:flex">
            <button
              type="button"
              onClick={openOnboarding}
              className={`rounded-2xl border border-slate-900 bg-slate-900 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-white shadow-[0_12px_24px_-16px_rgba(15,23,42,0.5)] transition-all hover:-translate-y-0.5 hover:bg-slate-800 ${jakartaSans.className}`}
            >
              Join free
            </button>
          </div>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-700 md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className={`mt-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_16px_34px_-20px_rgba(15,23,42,0.35)] md:hidden ${jakartaSans.className}`}>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-slate-700 transition-colors hover:border-sky-100 hover:bg-sky-50 hover:text-sky-700"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.label}
                  </a>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => {
                closeMenu();
                openOnboarding();
              }}
              className="mt-2 w-full rounded-xl border border-slate-900 bg-slate-900 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-slate-800"
            >
              Join free
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}
