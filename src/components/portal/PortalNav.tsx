"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { jakartaSans } from "@/app/fonts";

const nav = [
  { href: "/portal", label: "Home", match: (p: string) => p === "/portal" },
  { href: "/portal/toolkit", label: "Toolkit", match: (p: string) => p.startsWith("/portal/toolkit") },
  { href: "/portal/resources", label: "Resources", match: (p: string) => p.startsWith("/portal/resources") || p.startsWith("/portal/vault") },
  { href: "/portal/guides", label: "Guides", match: (p: string) => p.startsWith("/portal/guide") || p.startsWith("/portal/certification") },
  { href: "/portal/message", label: "Team", match: (p: string) => p.startsWith("/portal/message") },
] as const;

export function PortalNav({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname() || "/portal";

  return (
    <nav
      className={
        mobile
          ? "flex gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          : "hidden items-center gap-0.5 rounded-full bg-black/[0.04] p-1 lg:flex"
      }
    >
      {nav.map((item) => {
        const active = item.match(pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${jakartaSans.className} ${
              active
                ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/[0.06]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
