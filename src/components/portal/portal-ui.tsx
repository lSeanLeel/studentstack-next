import React from "react";
import Link from "next/link";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

export function PortalEyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-600 ${jakartaSans.className} ${className}`}
    >
      {children}
    </p>
  );
}

export function PortalPageTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h1
      className={`text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl ${fredokaHeadline.className} ${className}`}
    >
      {children}
    </h1>
  );
}

export function PortalLead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base ${jakartaSans.className} ${className}`}
    >
      {children}
    </p>
  );
}

const accentMap = {
  sky: "border-sky-200 bg-sky-50 text-sky-800",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-800",
  amber: "border-amber-200 bg-amber-50 text-amber-900",
  violet: "border-violet-200 bg-violet-50 text-violet-800",
  slate: "border-slate-200 bg-slate-50 text-slate-700",
  orange: "border-orange-200 bg-orange-50 text-orange-800",
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
      className={`inline-flex rounded-xl border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${accentMap[accent]} ${jakartaSans.className}`}
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
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  hover?: boolean;
}) {
  const base = `rounded-[1.75rem] border-2 border-slate-200 bg-white p-5 sm:p-6 ${
    hover ? "transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_16px_0_0_rgba(14,165,233,0.1)]" : ""
  } shadow-[0_10px_0_0_rgba(15,23,42,0.06)] ${className}`;

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
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  if (dark) {
    return (
      <section
        className={`relative overflow-hidden rounded-[2rem] border-2 border-slate-800 bg-slate-900 px-6 py-7 text-white shadow-[0_18px_0_0_rgba(15,23,42,0.2)] sm:rounded-[2.25rem] sm:px-8 sm:py-8 ${className}`}
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="relative z-10">{children}</div>
      </section>
    );
  }
  return (
    <section
      className={`overflow-hidden rounded-[2rem] border-2 border-slate-100 bg-gradient-to-br from-white via-sky-50/40 to-emerald-50/30 p-6 shadow-[0_12px_0_0_rgba(14,165,233,0.08)] sm:p-8 ${className}`}
    >
      {children}
    </section>
  );
}

export function PortalProgressBar({ value, accent = "sky" }: { value: number; accent?: "sky" | "emerald" | "amber" }) {
  const bar =
    accent === "emerald" ? "bg-emerald-400" : accent === "amber" ? "bg-amber-400" : "bg-sky-400";
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full rounded-full ${bar} transition-all duration-700`} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}
