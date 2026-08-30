"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { PortalBadge, PortalEyebrow, portalCard } from "@/components/portal/portal-ui";
import { MEMBERSHIP_INCLUDES } from "@/lib/portal/membership";

export function PortalWhatsIncluded() {
  return (
    <section className={`${portalCard} p-5 sm:p-6`}>
      <PortalEyebrow>What membership includes</PortalEyebrow>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {MEMBERSHIP_INCLUDES.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className={`group flex h-full flex-col rounded-2xl bg-[#f5f5f7]/60 p-4 ring-1 ring-black/[0.04] transition duration-300 hover:bg-white hover:shadow-[0_2px_4px_rgba(0,0,0,0.04),0_12px_32px_rgba(0,0,0,0.08)] hover:ring-sky-200/60`}
            >
              <div className="flex items-center gap-2">
                <p className={`font-semibold text-slate-900 ${fredokaHeadline.className}`}>{item.title}</p>
                {item.optional ? <PortalBadge accent="amber">Optional</PortalBadge> : null}
              </div>
              <p className={`mt-1.5 flex-1 text-sm font-medium leading-relaxed text-slate-500 ${jakartaSans.className}`}>
                {item.detail}
              </p>
              <span className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sky-600 ${jakartaSans.className}`}>
                Open
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
