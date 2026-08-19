"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { BrandWordmark } from "./BrandWordmark";
import { useContact } from "./contact-context";
import { ArrowRight } from "lucide-react";

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
                <img src="/sean-lee.jpg" alt="Sean Lee" className="h-full w-full object-cover object-top" />
              </div>
              <p className={`text-sm font-black uppercase tracking-[0.22em] text-sky-200 ${jakartaSans.className}`}>
                Sean Lee
              </p>
              <p className={`text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 ${jakartaSans.className}`}>
                Founder · UCLA &apos;28 · CS + Statistics
              </p>
            </div>
            <p className={`max-w-2xl text-xl font-medium leading-[1.35] tracking-tight text-slate-100 sm:text-3xl ${jakartaSans.className}`}>
              <span className={`${fredokaHeadline.className} mr-1 text-3xl text-sky-300 sm:text-5xl`}>&ldquo;</span>
              Parents kept finding the AI work we were putting out for students. Then they asked how to get their kid
              inside the same loop. That is still how most families land here.
              <span className={`${fredokaHeadline.className} ml-1 text-3xl text-sky-300 sm:text-5xl`}>&rdquo;</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section id="register" className="relative overflow-hidden bg-transparent py-20 sm:py-28">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.75rem] border-2 border-slate-800 bg-slate-900 px-6 py-12 text-center sm:rounded-[3.5rem] sm:px-14 sm:py-16">
          <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-amber-400/15 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-md">
            <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-200 ${jakartaSans.className}`}>
              Membership
            </p>
            <h2 className={`mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl ${fredokaHeadline.className}`}>
              Register your student
            </h2>
            <p className={`mx-auto mt-3 max-w-sm text-sm font-medium leading-relaxed text-slate-300 ${jakartaSans.className}`}>
              Our campus desk assigns what each member gets inside. Parents register here. Students sign in after access
              is issued.
            </p>
            <Link
              href="/register"
              className={`${jakartaSans.className} mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-slate-900 shadow-[0_14px_28px_-18px_rgba(255,255,255,0.3)] transition hover:-translate-y-0.5 hover:bg-sky-100`}
            >
              Register your student
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
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
              A student-led membership program. Access shaped by college students for high schoolers.
            </p>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-900">Legal</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="/privacy" className="transition-colors hover:text-sky-500">Privacy Policy</a></li>
              <li><a href="/terms" className="transition-colors hover:text-sky-700">Terms of Service</a></li>
              <li>
                <button type="button" onClick={openContact} className="text-left font-medium text-slate-500 transition-colors hover:text-sky-500">
                  Contact Us
                </button>
              </li>
              <li><Link href="/login" className="transition-colors hover:text-sky-500">Student login</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-8">
          <p className="text-sm font-medium text-slate-400">&copy; {new Date().getFullYear()} StudentStack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
