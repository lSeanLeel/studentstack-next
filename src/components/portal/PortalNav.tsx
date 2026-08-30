"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { jakartaSans } from "@/app/fonts";

const nav = [
  { href: "/portal", label: "Home", match: (p: string) => p === "/portal" },
  { href: "/portal/toolkit", label: "Toolkit", match: (p: string) => p.startsWith("/portal/toolkit") },
  { href: "/portal/resources", label: "Resources", match: (p: string) => p.startsWith("/portal/resources") || p.startsWith("/portal/vault") },
  { href: "/portal/certifications", label: "Pathways", match: (p: string) => p.startsWith("/portal/certification") },
  { href: "/portal/message", label: "Team", match: (p: string) => p.startsWith("/portal/message") },
] as const;

export function PortalNav({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname() || "/portal";

  return (
    <nav className={mobile ? "flex gap-1.5 overflow-x-auto pb-0.5" : "hidden items-center gap-1 lg:flex"}>
      {nav.map((item) => {
        const active = item.match(pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`shrink-0 rounded-2xl px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.1em] transition ${jakartaSans.className} ${
              active
                ? "bg-slate-900 text-white shadow-[0_6px_0_0_rgba(15,23,42,0.25)]"
                : "text-slate-600 hover:bg-sky-50 hover:text-sky-800"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
