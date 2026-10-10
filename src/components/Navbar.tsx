"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { jakartaSans } from "@/app/fonts";
import { BrandWordmark } from "./BrandWordmark";

const LINKS = [
  { href: "/#thesis", label: "Why AI" },
  { href: "/#program", label: "Program" },
  { href: "/#partners", label: "Partners" },
  { href: "/team", label: "Team" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar({ onHomeLogoClick }: { onHomeLogoClick?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav className="pointer-events-auto mx-auto flex w-full max-w-6xl items-center justify-between gap-3 rounded-[1.75rem] border border-sky-200/70 bg-white/90 px-3 py-2.5 shadow-[0_14px_0_0_rgba(14,165,233,0.12)] backdrop-blur-xl sm:rounded-[2rem] sm:px-6 sm:py-3 xl:max-w-7xl">
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/" && onHomeLogoClick) {
              e.preventDefault();
              onHomeLogoClick();
            }
          }}
          className="inline-flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
          aria-label="StudentStack home"
        >
          <BrandWordmark compact />
        </Link>

        <div className={`flex shrink-0 items-center gap-1 sm:gap-2 ${jakartaSans.className}`}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hidden rounded-2xl px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-slate-600 transition-colors hover:bg-sky-50 hover:text-sky-700 lg:inline-flex"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/apply"
            className="rounded-2xl border border-slate-900 bg-slate-900 px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-white shadow-[0_12px_24px_-16px_rgba(15,23,42,0.5)] transition-all hover:-translate-y-0.5 hover:bg-slate-800 sm:px-5 sm:py-2.5 sm:text-xs"
          >
            Apply
          </Link>
        </div>
      </nav>
    </div>
  );
}
