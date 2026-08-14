"use client";

import React from "react";
import { motion } from "motion/react";
import { BadgeCheck, Database, Sparkles } from "lucide-react";
import Link from "next/link";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { BrandWordmark } from "./BrandWordmark";
import { useContact } from "./contact-context";

export function TestimonialSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-transparent pt-6 pb-20 sm:pt-8 sm:pb-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2.75rem] border-2 border-slate-800 bg-slate-900 px-8 py-12 text-white sm:rounded-[3.5rem] sm:px-16 sm:py-16"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="mb-4 h-24 w-24 overflow-hidden rounded-[1.75rem] border-2 border-white/20 shadow-[0_16px_0_0_rgba(0,0,0,0.25)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/sean-lee.jpg"
                  alt="Sean Lee"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <p className={`text-sm font-black uppercase tracking-[0.22em] text-sky-200 ${jakartaSans.className}`}>
                Sean Lee
              </p>
              <p className={`text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 ${jakartaSans.className}`}>
                Founder · UCLA &apos;27
              </p>
            </div>
            <p
              className={`max-w-2xl text-xl font-medium leading-[1.35] tracking-tight text-slate-100 sm:text-3xl ${jakartaSans.className}`}
            >
              <span className={`${fredokaHeadline.className} mr-1 text-3xl text-sky-300 sm:text-5xl`}>&ldquo;</span>
              We built StudentStack Elite so high schoolers get the same AI toolkit edge college students use, plus
              credentials and opportunity intel they can put on applications.
              <span className={`${fredokaHeadline.className} ml-1 text-3xl text-sky-300 sm:text-5xl`}>&rdquo;</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const beats = [
    { icon: Sparkles, title: "AI Toolkit", line: "Tools we use and how we use them." },
    { icon: Database, title: "Admissions Vault", line: "Programs, research, deadlines." },
    { icon: BadgeCheck, title: "AI certifications", line: "SS-AIS and SS-ACR for applications." },
  ] as const;

  return (
    <section id="join" className="relative overflow-hidden bg-transparent py-20 sm:py-28">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.75rem] border-2 border-sky-200 bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-6 py-12 text-center sm:rounded-[3.5rem] sm:px-14 sm:py-16">
          <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-sky-300/30 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-amber-200/40 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
              StudentStack Elite
            </p>
            <h2
              className={`mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-slate-900 sm:text-6xl ${fredokaHeadline.className}`}
            >
              Apply for Elite.{" "}
              <span className="text-sky-500">Unlock the portal.</span>
            </h2>
            <p className={`mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg ${jakartaSans.className}`}>
              Parents apply. Students get a unique login after subscription. The portal stays current through the AI
              daily desk.
            </p>

            <ul className="mx-auto mt-8 grid max-w-2xl gap-3 text-left sm:grid-cols-3 sm:gap-4">
              {beats.map((beat) => {
                const Icon = beat.icon;
                return (
                  <li
                    key={beat.title}
                    className="rounded-[1.35rem] border border-sky-100/90 bg-white/80 px-4 py-3.5 shadow-[0_12px_28px_-24px_rgba(14,165,233,0.45)]"
                  >
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                      <Icon className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                    </div>
                    <p className={`mt-2 text-sm font-semibold text-slate-900 ${fredokaHeadline.className}`}>
                      {beat.title}
                    </p>
                    <p className={`mt-0.5 text-xs font-medium leading-snug text-slate-500 ${jakartaSans.className}`}>
                      {beat.line}
                    </p>
                  </li>
                );
              })}
            </ul>

            <a
              href="#apply-elite"
              className={`mt-8 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-8 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-slate-800 ${jakartaSans.className}`}
            >
              Apply for Elite
            </a>

            <a
              href="#inside-daily"
              className={`mt-4 inline-block text-[12px] font-bold text-slate-600 underline decoration-sky-300/80 underline-offset-[0.18em] transition-colors hover:text-sky-700 sm:text-[13px] ${jakartaSans.className}`}
            >
              See what members get every day
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { openContact } = useContact();

  return (
    <footer className="border-t border-slate-100 bg-white/80 pt-24 pb-12 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
              aria-label="StudentStack home"
            >
              <BrandWordmark />
            </Link>
            <p className={`mt-4 max-w-md text-sm font-medium text-slate-500 ${jakartaSans.className}`}>
              StudentStack Elite: the paid student portal for AI toolkit, admissions vault, and organization-issued AI
              certifications.
            </p>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-900">Legal</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li>
                <a href="/privacy" className="transition-colors hover:text-sky-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="transition-colors hover:text-sky-700">
                  Terms of Service
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openContact}
                  className="text-left font-medium text-slate-500 transition-colors hover:text-sky-500"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <Link href="/login" className="transition-colors hover:text-sky-500">
                  Student login
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-8">
          <p className="text-sm font-medium text-slate-400">
            &copy; {new Date().getFullYear()} StudentStack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
