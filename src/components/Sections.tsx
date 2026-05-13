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
    <section className="bg-white pt-10 pb-24 sm:pt-12 sm:pb-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-[10px] font-black uppercase tracking-[0.22em] text-sky-600">Testimonial</p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative p-12 sm:p-20 rounded-[4rem] bg-slate-900 text-white shadow-2xl overflow-hidden group"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-[1.75rem] border border-white/20 bg-gradient-to-br from-sky-400/25 to-violet-400/25 text-2xl font-black text-white shadow-[0_16px_30px_-18px_rgba(14,165,233,0.6)]">
                SL
              </div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-200">Sean Lee</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Founder • UCLA &apos;27</p>
            </div>
            <div className="flex-grow text-center relative">
              <p
                className={`relative z-10 max-w-2xl text-2xl font-medium leading-[1.3] tracking-tight text-slate-100 sm:text-4xl ${jakartaSans.className}`}
              >
                <span className="text-white font-serif text-3xl sm:text-5xl mr-1">&ldquo;</span>
                I founded StudentStack because I saw the disparity between students who use AI for school and those who don&apos;t. As college students, we&apos;re native to AI and we hear/use new tech every day, using this information to help build StudentStack, and bridge this gap.
                <span className="text-white font-serif text-3xl sm:text-5xl ml-1">&rdquo;</span>
              </p>
            </div>
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

export function FinalCTA({ scrollToSignup }: { scrollToSignup: () => void }) {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-slate-900 rounded-[4rem] p-12 sm:p-24 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-8 font-display leading-tight">
              Stay <span className="font-black">ahead</span> of <span className="text-sky-400 font-black">AI</span> for School
            </h2>
            <p className="text-slate-400 text-xl font-medium mb-12 leading-relaxed">
              Free weekly AI education for parents, college peers, and high schoolers: tools, prompts, and honest student takes.
              Drop your email once and you&apos;re in.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                onClick={scrollToSignup} 
                className="w-full sm:w-auto px-16 bg-sky-500 text-white hover:bg-sky-400 shadow-2xl shadow-sky-500/20 rounded-2xl h-20 font-bold uppercase tracking-widest text-sm transition-all hover:-translate-y-1"
              >
                  Join free <ArrowRight className="ml-3 h-5 w-5 text-white" />
              </Button>
              
              <div className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md h-20">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                <span className="text-[11px] font-bold text-white uppercase tracking-widest text-left">
                  No payment<br />Unsubscribe anytime
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
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
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
                <a href="#weekly-email-heading" className="transition-colors hover:text-sky-500">
                  What&apos;s in the email
                </a>
              </li>
              <li><a href="#mentors" className="hover:text-sky-500 transition-colors">Meet the team</a></li>
              <li>
                <a href="#faq" className="transition-colors hover:text-sky-500">
                  FAQ
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openOnboarding}
                  className="text-left font-medium text-slate-500 transition-colors hover:text-sky-500"
                >
                  Weekly email signup
                </button>
              </li>
              <li><a href="/admin" className="text-slate-300 hover:text-slate-500 text-[9px] font-black uppercase tracking-widest transition-colors opacity-40 hover:opacity-100">Admin</a></li>
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
