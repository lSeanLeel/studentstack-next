"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { MEMBERSHIP_INCLUDES } from "@/lib/portal/membership";

export function PortalWhatsIncluded() {
  return (
    <section className="rounded-[1.75rem] border-2 border-slate-200 bg-white p-5 sm:p-6">
      <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ${jakartaSans.className}`}>
        What membership includes
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {MEMBERSHIP_INCLUDES.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="group flex h-full flex-col rounded-2xl border-2 border-slate-100 bg-[#f8fafc] p-4 transition hover:border-sky-200 hover:bg-white"
            >
              <div className="flex items-center gap-2">
                <p className={`font-semibold text-slate-900 ${fredokaHeadline.className}`}>{item.title}</p>
                {item.optional ? (
                  <span className={`rounded-lg bg-amber-50 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-[0.08em] text-amber-800 ${jakartaSans.className}`}>
                    Optional
                  </span>
                ) : null}
              </div>
              <p className={`mt-1.5 flex-1 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                {item.detail}
              </p>
              <span className={`mt-3 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.1em] text-sky-700 ${jakartaSans.className}`}>
                Open
                <ArrowRight className="h-3 w-3" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
