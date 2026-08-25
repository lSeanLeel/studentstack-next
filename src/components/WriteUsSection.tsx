"use client";

import React from "react";
import { motion } from "motion/react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { ParentInquiryForm } from "./ParentInquiryForm";

export function WriteUsSection() {
  return (
    <section id="write-us" className="relative overflow-hidden bg-transparent py-20 sm:py-28" aria-labelledby="write-us-heading">
      <div className="relative z-10 mx-auto max-w-md px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.75rem] border-2 border-slate-800 bg-slate-900 px-6 py-10 sm:rounded-[3.5rem] sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-sky-500/20 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            <h2
              id="write-us-heading"
              className={`mb-6 text-center text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl ${fredokaHeadline.className}`}
            >
              Write us
            </h2>
            <ParentInquiryForm dark />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
