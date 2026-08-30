import React from "react";
import Link from "next/link";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

/** Shared portal shell — clean, proprietary StudentStack membership UI. */
export const portalShellBg =
  "min-h-screen bg-[#f5f5f7] text-slate-900 antialiased";

export const portalCard =
  "rounded-3xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04]";

export const portalCardHover =
  "transition duration-300 hover:shadow-[0_2px_4px_rgba(0,0,0,0.04),0_12px_32px_rgba(0,0,0,0.08)] hover:ring-sky-200/60";

export const portalLabel =
  `text-xs font-semibold tracking-wide text-slate-500 ${jakartaSans.className}`;

export function PortalEyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`${portalLabel} uppercase tracking-[0.16em] text-sky-600 ${className}`}>
      {children}
    </p>
  );
}

export function PortalPageTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h1
      className={`text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-[2.35rem] ${fredokaHeadline.className} ${className}`}
    >
      {children}
    </h1>
  );
}

export function PortalLead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`mt-2 max-w-2xl text-[15px] font-medium leading-relaxed text-slate-500 sm:text-base ${jakartaSans.className} ${className}`}
    >
      {children}
    </p>
  );
}

const accentMap = {
  sky: "bg-sky-500/10 text-sky-700 ring-sky-500/20",
  emerald: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-800 ring-amber-500/20",
  violet: "bg-violet-500/10 text-violet-700 ring-violet-500/20",
  slate: "bg-slate-500/10 text-slate-600 ring-slate-500/15",
  orange: "bg-orange-500/10 text-orange-700 ring-orange-500/20",
} as const;

export function PortalBadge({
  children,
  accent = "sky",
}: {
  children: React.ReactNode;
  accent?: keyof typeof accentMap;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${accentMap[accent]} ${jakartaSans.className}`}
    >
      {children}
    </span>
  );
}

export function PortalCard({
  children,
  className = "",
  href,
  hover = false,
  padding = "p-5 sm:p-6",
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  hover?: boolean;
  padding?: string;
}) {
  const base = `${portalCard} ${padding} ${hover ? portalCardHover : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={`block ${base}`}>
        {children}
      </Link>
    );
  }
  return <div className={base}>{children}</div>;
}

export function PortalPanel({
  children,
  className = "",
  tinted = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** @deprecated dark panels removed — use tinted for subtle brand wash */
  dark?: boolean;
  tinted?: boolean;
}) {
  return (
    <section
      className={`${portalCard} p-5 sm:p-6 ${
        tinted ? "bg-gradient-to-br from-white via-sky-50/30 to-white" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

export function PortalPrimaryButton({
  children,
  className = "",
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const base = `inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98] ${jakartaSans.className} ${className}`;

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }
  return <span className={base}>{children}</span>;
}

export function PortalSectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-2xl ${fredokaHeadline.className} ${className}`}>
      {children}
    </h2>
  );
}

export function PortalProgressBar({ value, accent = "sky" }: { value: number; accent?: "sky" | "emerald" | "amber" }) {
  const bar =
    accent === "emerald" ? "bg-emerald-500" : accent === "amber" ? "bg-amber-500" : "bg-sky-500";
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full rounded-full ${bar} transition-all duration-700`} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}
