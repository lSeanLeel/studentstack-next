import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, MailOpen, HelpCircle } from "lucide-react";
import { jakartaSans } from "@/app/fonts";
import { BrandWordmark } from "./BrandWordmark";
import { useOnboarding } from "./onboarding-context";

export function Navbar({ onHomeLogoClick }: { onHomeLogoClick?: () => void }) {
  const pathname = usePathname();
  const { openOnboarding } = useOnboarding();

  const navItems = [
    { label: "The email", href: "#weekly-email", icon: MailOpen },
    { label: "Team", href: "#mentors", icon: Users },
    { label: "FAQ", href: "#faq", icon: HelpCircle },
  ];

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav className="pointer-events-auto mx-auto w-full max-w-6xl rounded-[1.75rem] border border-sky-200/70 bg-white/85 px-3 py-2.5 shadow-[0_14px_36px_-20px_rgba(14,165,233,0.5)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-22px_rgba(14,165,233,0.55)] sm:rounded-[2rem] sm:px-6 sm:py-3 xl:max-w-7xl">
        {/* Top row: logo + (desktop nav) + Sign up — always visible at every breakpoint */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                onHomeLogoClick?.();
              }
            }}
            className="inline-flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
            aria-label="StudentStack home"
          >
            <BrandWordmark compact />
          </Link>

          <div className={`hidden flex-1 items-center justify-center gap-0.5 md:flex lg:gap-1 ${jakartaSans.className}`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 rounded-2xl px-2.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600 transition-all hover:-translate-y-0.5 hover:bg-sky-50 hover:text-sky-700 lg:px-3.5 lg:py-2.5 lg:text-xs lg:tracking-[0.14em] xl:px-4 xl:text-[0.8125rem]"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 lg:h-4 lg:w-4" />
                  {item.label}
                </a>
              );
            })}
          </div>

          <button
            type="button"
            onClick={openOnboarding}
            className={`shrink-0 rounded-2xl border border-slate-900 bg-slate-900 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-[0_12px_24px_-16px_rgba(15,23,42,0.5)] transition-all hover:-translate-y-0.5 hover:bg-slate-800 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.16em] md:text-xs lg:px-5 lg:py-2.5 lg:text-[0.8125rem] xl:px-6 ${jakartaSans.className}`}
          >
            Sign up
          </button>
        </div>

        {/* Mobile-only second row: 3 icon nav items, always visible below 768px */}
        <div className={`mt-2 grid grid-cols-3 gap-1.5 md:hidden ${jakartaSans.className}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50/80 px-2 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-slate-700 transition-colors hover:border-sky-100 hover:bg-sky-50 hover:text-sky-700"
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="whitespace-nowrap">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
