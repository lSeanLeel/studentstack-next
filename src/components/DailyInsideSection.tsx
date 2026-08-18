"use client";

import React from "react";
import { motion } from "motion/react";
import { FolderLock, Landmark, Route, Sparkles } from "lucide-react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";

const accessParts = [
  {
    icon: Sparkles,
    label: "AI, as it is used",
    title: "Stay current with the tools that actually show up in school",
    body: "Members get the same kind of AI-use intel our campus desk is already watching: what students reach for, how they keep it honest, and what is noise. We keep this moving on purpose. The stack changes. The thesis does not.",
  },
  {
    icon: Landmark,
    label: "Where we send people",
    title: "Apply to the programs we are actually pushing",
    body: "Our team points high school members toward summer work, research, and deadlines that fit how college-bound students build a real record. It reads like a list we use, not a directory anyone could Google.",
  },
  {
    icon: Route,
    label: "Work we push",
    title: "Courses and AI credentials, because we tell them to finish them",
    body: "Members complete AI-related courses and certifications for college admissions when our desk sends them there. We recommend that path because we understand which work reads as judgment, not a shopping cart of badges. You will not find a public catalog of those picks here.",
  },
  {
    icon: FolderLock,
    label: "Membership home",
    title: "A gated portal for the students whose parents asked us in",
    body: "That is the membership. Access to the portal our organization keeps for high schoolers. Daily material still comes from the same student desk. The portal is where members go when it is time to act.",
  },
] as const;

/**
 * Membership as access. Deliverables stay intentionally underspecified.
 */
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
            StudentStack membership
          </p>
          <h2
            id="membership-heading"
            className={`mt-3 text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] text-slate-900 sm:text-4xl lg:text-[2.85rem] ${fredokaHeadline.className}`}
          >
            What members{" "}
            <span className="text-sky-500">get access to</span>
          </h2>
          <p
            className={`ss-institutional mt-4 max-w-2xl text-[1.05rem] font-normal leading-[1.7] text-slate-600 sm:text-lg ${institutionalSerif.className}`}
          >
            Membership is how a high schooler gets inside the gated side of our organization. We keep it current because
            we are still in school. Families who found our public work already understand the shape of this. They apply
            their student for the access, not for a brochure of modules.
          </p>
        </motion.div>

        <ol className="mt-10 space-y-4 sm:mt-12">
          {accessParts.map((part, index) => {
            const Icon = part.icon;
            return (
              <motion.li
                key={part.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                className="flex flex-col gap-4 rounded-[1.75rem] border border-sky-100/90 bg-white/90 p-5 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.3)] sm:flex-row sm:items-start sm:gap-6 sm:p-6"
              >
                <div className="flex items-center gap-3 sm:w-44 sm:shrink-0 sm:flex-col sm:items-start sm:gap-2">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    <Icon className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                  </div>
                  <p className={`text-[10px] font-black uppercase tracking-[0.16em] text-sky-600 ${jakartaSans.className}`}>
                    {String(index + 1).padStart(2, "0")} · {part.label}
                  </p>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className={`text-xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
                    {part.title}
                  </h3>
                  <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-600 sm:text-[0.95rem] ${jakartaSans.className}`}>
                    {part.body}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
