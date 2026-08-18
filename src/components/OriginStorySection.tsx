"use client";

import React from "react";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";

/**
 * Origin story for parents: student org → public work → membership.
 * Daily content remains intentionally unlocated.
 */
export function OriginStorySection() {
  return (
    <section
      id="story"
      className="relative overflow-hidden border-t border-slate-100 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="story-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_0%,rgba(14,165,233,0.08),transparent_55%),radial-gradient(ellipse_40%_40%_at_100%_80%,rgba(255,106,0,0.07),transparent_50%)]" />

      <div className="relative mx-auto w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
            How families found us
          </p>
          <h2
            id="story-heading"
            className={`mt-3 text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] text-slate-900 sm:text-4xl lg:text-[2.85rem] ${fredokaHeadline.className}`}
          >
            We started as a{" "}
            <span className="text-sky-500">student organization</span>
          </h2>
        </motion.div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`space-y-5 text-[1.05rem] font-normal leading-[1.7] text-slate-700 sm:text-lg ${institutionalSerif.className}`}
          >
            <p className="ss-institutional">
              Sean Lee, a UCLA junior, started StudentStack in Irvine. The first work was a student organization paying
              attention to something parents were already feeling at the dinner table: the high schoolers who stay ahead
              are using AI the way college students use it, quietly, inside real schoolwork.
            </p>
            <p className="ss-institutional">
              Parents in the community kept finding that material. A note passed along. A page someone saved. An
              explanation that sounded like school as it actually is, not a panic headline. That is still how most
              families arrive.
            </p>
            <p className="ss-institutional">
              Then the questions got closer to home. Parents wanted their own student inside the same loop, not only a
              piece of writing they could forward. Membership grew from that ask. Same organization. Same campus desk.
              Now with a gated portal for the high schoolers whose parents asked us to go further.
            </p>
            <p className="ss-institutional">
              We still operate that way. Daily AI-related work for families around us, kept current because we are still
              in class. Members get the access our team uses when we push high schoolers toward the next right move.
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-[1.75rem] border border-sky-100 bg-[#f8fafc] p-6 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.28)] sm:p-7"
          >
            <p className={`text-[10px] font-black uppercase tracking-[0.18em] text-sky-600 ${jakartaSans.className}`}>
              Still the same desk
            </p>
            <ul className={`mt-4 space-y-4 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
              <li>
                <span className="font-semibold text-slate-900">Student-led.</span> Current college students, including
                campuses parents already recognize.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Found in the community.</span> Parents meet the work
                first, then ask about membership for their student.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Daily, on purpose.</span> The org keeps putting out AI-in-school
                material. Membership is how a high schooler gets inside the gated side of that work.
              </li>
            </ul>
            <p className={`mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500 ${jakartaSans.className}`}>
              <MapPin className="h-3.5 w-3.5 text-[#ff6a00]" aria-hidden />
              Irvine roots · campus desk now
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
