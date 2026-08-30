"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
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
              I founded StudentStack because I noticed the disparity between students who use AI for school and those who
              don&apos;t. As college students, we&apos;re native to AI — we hear about and use new tools every day, and we
              use that insight to build StudentStack and bridge the gap.
              <span className={`${fredokaHeadline.className} ml-1 text-3xl text-sky-300 sm:text-5xl`}>&rdquo;</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  const { openContact } = useContact();

  return (
    <footer className="border-t border-slate-100 bg-white/80 pt-16 pb-12 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
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
        <div className="mt-12 border-t border-slate-100 pt-8">
          <p className="text-sm font-medium text-slate-400">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
