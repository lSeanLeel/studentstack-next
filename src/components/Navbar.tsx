"use client";

import React from "react";
import Link from "next/link";
import { jakartaSans } from "@/app/fonts";
import { BrandWordmark } from "./BrandWordmark";

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#program", label: "Program" },
  { href: "/#admissions", label: "Admissions" },
  { href: "/team", label: "Team" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar(_props: { onHomeLogoClick?: () => void } = {}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:h-[4.5rem] sm:px-8">
        <Link
          href="/"
          className="inline-flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          aria-label="StudentStack home"
        >
          <BrandWordmark className="!text-[1.5rem] sm:!text-[1.7rem]" />
        </Link>

        <div className={`flex items-center gap-1 ${jakartaSans.className}`}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hidden rounded-md px-3 py-2 text-[0.92rem] font-medium text-body transition-colors hover:text-ink lg:inline-flex"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/apply"
            className="ml-2 inline-flex items-center rounded-md bg-ink px-4 py-2.5 text-[0.92rem] font-semibold text-white transition-colors hover:bg-[#1d3359]"
          >
            Apply
          </Link>
        </div>
      </nav>
    </header>
  );
}
