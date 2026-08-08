"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Users, ShieldCheck, Calendar } from "lucide-react";
import Link from "next/link";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { BrandWordmark } from "./BrandWordmark";
import { Button } from "./ui/Button";
import { useOnboarding } from "./onboarding-context";
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
              We built StudentStack because we saw the gap between students who use AI for school and those who don&apos;t.
              College students learn new tools every week — we turn that into a free Sunday email families can actually use.
              <span className={`${fredokaHeadline.className} ml-1 text-3xl text-sky-300 sm:text-5xl`}>&rdquo;</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function NewsletterBenefitsSection() {
  const perks = [
    { title: "Sunday drop", desc: "One focused email so families aren’t drowning in tabs.", icon: Calendar },
    { title: "Student-written", desc: "Tool picks explained the way we use them in lectures and labs.", icon: Users },
    { title: "100% free", desc: "No tiers, no upsell: just the weekly email and occasional bonus links.", icon: ShieldCheck },
  ];

  return (
    <section id="why-newsletter" className="overflow-hidden bg-white py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center sm:text-left">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-sky-600">Why StudentStack</p>
          <h2
            className={`mb-6 mt-3 text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-slate-900 sm:text-5xl lg:text-6xl ${fredokaHeadline.className}`}
          >
            A weekly email <br />
            <span className="text-sky-500">parents actually read</span>
          </h2>
          <p
            className={`mb-10 max-w-xl text-lg font-medium leading-relaxed text-slate-500 mx-auto sm:mx-0 ${jakartaSans.className}`}
          >
            StudentStack is a free Sunday email with AI tools, study workflows, and research ideas for high schoolers,
            explained by college students who live in both worlds.
          </p>
          <div className="grid gap-4 max-w-xl mx-auto sm:mx-0">
            {perks.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-5 rounded-[1.75rem] bg-white border border-slate-100 shadow-[0_14px_40px_-24px_rgba(15,23,42,0.25)] hover:-translate-y-1 transition-transform"
              >
                <div className="h-12 w-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const { openOnboarding } = useOnboarding();

  return (
    <section className="relative overflow-hidden bg-transparent py-20 sm:py-28">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.75rem] border-2 border-sky-200 bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-8 py-14 text-center sm:rounded-[3.5rem] sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-sky-300/30 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-amber-200/40 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2
              className={`text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-slate-900 sm:text-6xl ${fredokaHeadline.className}`}
            >
              One Sunday email.{" "}
              <span className="text-sky-500">Zero fluff.</span>
            </h2>
            <p className={`mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg ${jakartaSans.className}`}>
              Free AI education for parents of high schoolers — tools, prompts, and honest student takes. Drop your email
              once and you&apos;re in.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
              <Button
                onClick={() => openOnboarding()}
                className="h-16 w-full rounded-2xl bg-slate-900 px-10 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_14px_0_0_rgba(15,23,42,0.12)] transition-all hover:-translate-y-1 hover:bg-slate-800 sm:w-auto"
              >
                Get tomorrow&apos;s free email
                <ArrowRight className="ml-3 h-5 w-5 text-white" />
              </Button>

              <div className="flex h-16 items-center gap-3 rounded-2xl border-2 border-emerald-200 bg-white/80 px-6">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span className={`text-left text-[11px] font-bold uppercase tracking-[0.14em] text-slate-700 ${jakartaSans.className}`}>
                  100% free
                  <br />
                  Unsubscribe anytime
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { openOnboarding } = useOnboarding();

  return (
    <footer className="border-t border-slate-100 bg-white/80 pt-24 pb-12 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
              aria-label="StudentStack home"
            >
              <BrandWordmark />
            </Link>
            <p className="mt-6 max-w-sm font-medium leading-relaxed text-slate-500">
              Free weekly email from university students: AI tools for school, exclusive research opportunities for high
              schoolers, + more!
            </p>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-900">Explore</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li>
                <a href="#faq" className="transition-colors hover:text-sky-500">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#faq-who-writes" className="transition-colors hover:text-sky-500">
                  Who writes it
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openOnboarding}
                  className="text-left font-medium text-slate-500 transition-colors hover:text-sky-500"
                >
                  Sign Up
                </button>
              </li>
              <li>
                <Link href="/admin" className="text-slate-500 text-xs transition-colors hover:text-slate-700">
                  Operator Portal
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-900">Legal</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="/privacy" className="hover:text-sky-500 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-sky-700 transition-colors">Terms of Service</a></li>
              <li><a href="mailto:advising@studentstack.info" className="hover:text-sky-500 transition-colors">Contact Us</a></li>
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
