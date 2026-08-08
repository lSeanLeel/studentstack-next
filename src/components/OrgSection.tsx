"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

/**
 * Org framing only: free newsletter as the front door, deeper learning as the
 * longer arc. Avoids product SKUs / pricing grids while leaving room for
 * courses, credentials, and membership later.
 */
export function OrgSection() {
  return (
    <section
      id="organization"
      className="relative overflow-hidden border-t border-slate-100 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="organization-heading"
    >
      <div className="relative mx-auto grid w-full max-w-3xl gap-10 lg:max-w-5xl lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16 xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
            The organization
          </p>
          <h2
            id="organization-heading"
            className={`mt-3 text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.035em] text-slate-900 sm:text-4xl lg:text-[2.55rem] ${fredokaHeadline.className}`}
          >
            A student-run path from{" "}
            <span className="text-sky-500">curious</span> to{" "}
            <span className="text-[#ff6a00]">capable</span>
          </h2>
          <p
            className={`mt-4 max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg ${jakartaSans.className}`}
          >
            The free daily newsletter is how most families meet us. Behind it, StudentStack is building a fuller learning
            home: guided practice, proof of skill, and a private space for students who want to go further with us.
          </p>
          <p
            className={`mt-3 max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg ${jakartaSans.className}`}
          >
            Start free. When you are ready for deeper work, your account becomes the door into membership, courses, and
            certification inside the StudentStack portal.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="rounded-[2rem] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-orange-50/60 p-7 sm:p-8"
        >
          <p className={`text-[11px] font-black uppercase tracking-[0.18em] text-slate-500 ${jakartaSans.className}`}>
            How it fits together
          </p>
          <ul className={`mt-5 space-y-4 text-sm font-medium leading-relaxed text-slate-700 sm:text-[0.95rem] ${jakartaSans.className}`}>
            <li>
              <span className={`${fredokaHeadline.className} font-semibold text-slate-900`}>Read free</span>
              <span className="mt-1 block text-slate-600">Daily email for parents and high schoolers getting oriented.</span>
            </li>
            <li>
              <span className={`${fredokaHeadline.className} font-semibold text-slate-900`}>Practice deeper</span>
              <span className="mt-1 block text-slate-600">Structured learning when a student wants more than tips.</span>
            </li>
            <li>
              <span className={`${fredokaHeadline.className} font-semibold text-slate-900`}>Show the work</span>
              <span className="mt-1 block text-slate-600">Credentials and a logged-in home for progress over time.</span>
            </li>
          </ul>
          <Link
            href="/login"
            className={`mt-7 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-sky-700 transition-colors hover:text-sky-900 ${jakartaSans.className}`}
          >
            Student portal
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
