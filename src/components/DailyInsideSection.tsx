"use client";

import React from "react";
import { motion } from "motion/react";
import { BookOpen, FolderLock, Landmark, Sparkles } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

const items = [
  {
    icon: Sparkles,
    label: "Assigned access",
    title: "What your student should know right now",
    body: "Not a general overview. The specific tools, habits, and disclosure norms that matter for school this semester. Assigned by our desk because we are still taking classes.",
  },
  {
    icon: Landmark,
    label: "Programs + deadlines",
    title: "Where we tell members to apply",
    body: "Summer research, competitions, and college-readiness programs we vet. Members get the list. We tell them when to apply and what actually matters on the application.",
  },
  {
    icon: BookOpen,
    label: "Courses + credentials",
    title: "Work we push members to finish",
    body: "Courses and credentials that read well on a college application. We pick them. Members complete them. No public catalog.",
  },
  {
    icon: FolderLock,
    label: "Gated portal",
    title: "A member workspace run by college students",
    body: "The portal is where members work. Daily material from our desk, program recommendations, and the path we set for them. Access starts after a parent registers.",
  },
] as const;

export function DailyInsideSection() {
  return (
    <section
      id="membership"
      className="relative overflow-hidden border-t border-sky-100/80 bg-transparent px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="membership-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(14,165,233,0.12),transparent_55%),radial-gradient(ellipse_45%_40%_at_100%_80%,rgba(255,106,0,0.08),transparent_50%)]" />

      <div className="relative mx-auto w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
            Membership
          </p>
          <h2
            id="membership-heading"
            className={`mt-3 text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] text-slate-900 sm:text-4xl lg:text-[2.85rem] ${fredokaHeadline.className}`}
          >
            What your student <span className="text-sky-500">gets inside</span>
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                whileHover={{ y: -3 }}
                className="rounded-[1.75rem] border border-sky-100/90 bg-white/90 p-6 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.25)] transition-shadow hover:shadow-[0_24px_48px_-28px_rgba(15,23,42,0.4)]"
              >
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    <Icon className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                  </div>
                  <p className={`text-[10px] font-black uppercase tracking-[0.16em] text-sky-600 ${jakartaSans.className}`}>
                    {item.label}
                  </p>
                </div>
                <h3 className={`mt-4 text-lg font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
                  {item.title}
                </h3>
                <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                  {item.body}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
