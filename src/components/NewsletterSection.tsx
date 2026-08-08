"use client";

import React from "react";
import { motion } from "motion/react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

const days = [
  {
    label: "The signal",
    body: "What changed in AI for school this week, filtered for parents who do not have time to scroll Twitter threads.",
  },
  {
    label: "The toolkit",
    body: "One concrete workflow we actually used in class: the tool, the prompt pattern, and when it helps a high schooler.",
  },
  {
    label: "The move",
    body: "A short action for the week. Something a parent can forward, or a student can try before the next deadline.",
  },
] as const;

export function NewsletterSection() {
  return (
    <section
      id="newsletter"
      className="relative overflow-hidden border-t border-sky-100/80 bg-transparent px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="newsletter-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_0%,rgba(125,211,252,0.16),transparent_55%),radial-gradient(ellipse_50%_40%_at_10%_90%,rgba(255,106,0,0.08),transparent_50%)]" />

      <div className="relative mx-auto w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-600 ${jakartaSans.className}`}>
            The daily newsletter
          </p>
          <h2
            id="newsletter-heading"
            className={`mt-3 text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.035em] text-slate-900 sm:text-4xl lg:text-[2.55rem] ${fredokaHeadline.className}`}
          >
            Free, daily, written by students still in class
          </h2>
          <p
            className={`mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg ${jakartaSans.className}`}
          >
            StudentStack starts as a free daily email for parents of high schoolers. Each drop is short on purpose: one
            clear signal, one tool we are using, and one move you can make. No fluff archive. No recycled tip sheet.
          </p>
        </motion.div>

        <ol className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-3 sm:gap-8">
          {days.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <p className={`text-[11px] font-black uppercase tracking-[0.18em] text-sky-500 ${jakartaSans.className}`}>
                0{index + 1}
              </p>
              <h3
                className={`mt-2 text-xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-2xl ${fredokaHeadline.className}`}
              >
                {item.label}
              </h3>
              <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-600 sm:text-[0.95rem] ${jakartaSans.className}`}>
                {item.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
