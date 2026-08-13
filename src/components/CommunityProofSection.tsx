"use client";

import React from "react";
import { motion } from "motion/react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

const notes = [
  {
    where: "Parent group",
    quote:
      "A mom in our class chat forwarded one tip. I joined the free daily the same night — finally something I can hand to my ninth grader.",
  },
  {
    where: "Nextdoor",
    quote:
      "Saw a neighbor ask how kids should use AI for school. Someone linked StudentStack. Short, practical, not hype.",
  },
  {
    where: "Instagram",
    quote:
      "Watched a quick organizing video, then subscribed. The emails match what they showed: systems for the week, not more apps.",
  },
] as const;

/**
 * Soft discovery / social proof — lives below the fold so the hero can lead with the product promise.
 */
export function CommunityProofSection() {
  return (
    <section
      id="from-parents"
      className="relative overflow-hidden border-t border-slate-100 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="from-parents-heading"
    >
      <div className="relative mx-auto w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl"
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-600 ${jakartaSans.className}`}>
            How parents find us
          </p>
          <h2
            id="from-parents-heading"
            className={`mt-3 text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.035em] text-slate-900 sm:text-4xl ${fredokaHeadline.className}`}
          >
            Shared in parent circles. Built for the school week.
          </h2>
          <p className={`mt-4 text-base font-medium leading-relaxed text-slate-600 sm:text-lg ${jakartaSans.className}`}>
            Most families hear about StudentStack the same way: a forward from a parent group, a Nextdoor thread, or a
            short Instagram explainer on AI for organization — then they join the free daily with just an email.
          </p>
        </motion.div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-3 sm:gap-6">
          {notes.map((note, index) => (
            <motion.li
              key={note.where}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="rounded-[1.75rem] border border-slate-100 bg-[#f8fafc] px-5 py-5"
            >
              <p className={`text-[10px] font-black uppercase tracking-[0.16em] text-[#ff6a00] ${jakartaSans.className}`}>
                {note.where}
              </p>
              <p className={`mt-3 text-sm font-medium leading-relaxed text-slate-700 sm:text-[0.95rem] ${jakartaSans.className}`}>
                “{note.quote}”
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
