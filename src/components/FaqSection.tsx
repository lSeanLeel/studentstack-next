"use client";

import React, { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";

type FaqItem = { id?: string; q: string; a: ReactNode };

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is StudentStack?",
    a: "A student-led membership program run by college students at well-known universities. Each member gets a path we assign: portal access, programs we push, and work we expect them to finish for college admissions.",
  },
  {
    q: "Who runs this?",
    a: "Current college students. Sean Lee (UCLA '28, CS + Statistics) started the organization. The team spans campuses parents already take seriously.",
  },
  {
    q: "What do members actually get?",
    a: "Gated portal access. AI education that tracks what tools are actually in use this semester. Program and deadline recommendations we vet. Courses and credentials we tell them to finish. Nothing is pulled from a public catalog.",
  },
  {
    q: "How do I join?",
    a: "Parents complete a short application, review how mentorship is matched to their student, create a portal password, and finish secure checkout. After payment, a welcome email with login details goes to the parent email, and a mentor reaches out.",
  },
  {
    id: "faq-why-young",
    q: "Why a student-run org?",
    a: "School and admissions move faster than any curriculum can track. A student-native team sees the shift while it is happening, not after a committee reports on it.",
  },
];

function FaqAccordionItem({
  item, index, openIndex, setOpenIndex, baseId,
}: {
  item: FaqItem; index: number; openIndex: number | null;
  setOpenIndex: (i: number | null) => void; baseId: string;
}) {
  const open = openIndex === index;
  const panelId = `${baseId}-panel-${item.id ?? index}`;
  const buttonId = `${baseId}-button-${item.id ?? index}`;

  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <h3>
        <button
          type="button" id={buttonId} aria-expanded={open} aria-controls={panelId}
          onClick={() => setOpenIndex(open ? null : index)}
          className={`flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold tracking-[-0.02em] text-slate-900 sm:text-lg ${fredokaHeadline.className}`}
        >
          {item.q}
          <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}
        className={`pb-5 text-sm font-medium leading-relaxed text-slate-600 sm:text-[0.95rem] ${jakartaSans.className}`}
      >
        {open ? item.a : null}
      </div>
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="faq" className="relative overflow-hidden border-t border-slate-100 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24" aria-labelledby="faq-heading">
      <div className="relative mx-auto w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <motion.h2
          id="faq-heading" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className={`text-[2rem] font-semibold tracking-[-0.035em] text-slate-900 sm:text-4xl ${fredokaHeadline.className}`}
        >
          Questions <span className="text-sky-500">parents</span> ask
        </motion.h2>
        <div className="mt-8 rounded-[1.75rem] border border-slate-100 bg-[#f8fafc] px-5 sm:px-7">
          {mounted
            ? FAQ_ITEMS.map((item, index) => (
                <FaqAccordionItem key={item.id ?? item.q} item={item} index={index} openIndex={openIndex} setOpenIndex={setOpenIndex} baseId="faq" />
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
