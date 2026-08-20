"use client";

import React from "react";
import { motion } from "motion/react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";
import { ParentInquiryForm } from "./ParentInquiryForm";

const deskCredentials = [
  "USACO Platinum",
  "Amazon AWS interns",
  "Google SWE interns",
  "Goldman Sachs IB",
  "MIT Media Lab research",
  "Intel STS finalists",
  "Kleiner Perkins fellows",
  "Point72 quant research",
  "CERN researchers",
  "Harvard pre-med research",
] as const;

export function WriteUsSection() {
  return (
    <section
      id="write-us"
      className="relative overflow-hidden bg-transparent py-20 sm:py-28"
      aria-labelledby="write-us-heading"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.75rem] border-2 border-slate-800 bg-slate-900 sm:rounded-[3.5rem]">
          <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative z-10 grid gap-10 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14 lg:px-14 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-200 ${jakartaSans.className}`}>
                Write us
              </p>
              <h2
                id="write-us-heading"
                className={`mt-3 text-2xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-3xl lg:text-[2.35rem] ${fredokaHeadline.className}`}
              >
                Parents can ask for tailored advice
              </h2>
              <p
                className={`ss-institutional mt-4 max-w-xl text-[1.02rem] font-normal leading-[1.7] text-slate-300 sm:text-lg ${institutionalSerif.className}`}
              >
                Not sure where your student stands, or whether membership is the right fit? Write us. We route inquiries
                to the teammate on our desk who actually has the background for your question.
              </p>

              <div className="mt-8">
                <p className={`text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 ${jakartaSans.className}`}>
                  Routed among teammates including
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {deskCredentials.map((credential) => (
                    <li
                      key={credential}
                      className={`rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-300 ${jakartaSans.className}`}
                    >
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>

              <p className={`mt-6 text-xs font-medium leading-relaxed text-slate-400 ${jakartaSans.className}`}>
                We read every inquiry ourselves. Typical response within one business day.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="rounded-[1.75rem] border border-white/10 bg-slate-950/40 p-5 backdrop-blur-sm sm:p-6"
            >
              <ParentInquiryForm dark />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
