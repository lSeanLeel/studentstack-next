"use client";

import React, { useId, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";

type FaqItem = { q: string; a: ReactNode };

const teamLinkClass =
  "font-semibold text-sky-700 underline decoration-sky-200 underline-offset-[0.18em] transition-colors hover:text-sky-600 hover:decoration-sky-300";

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is StudentStack?",
    a: (
      <>
        We are a group of college students building a free online community to share how students are using AI to stay
        ahead of school. We have grown a community of parents and high schoolers looking to learn from the students and
        people who TRULY know how to optimize work using AI.
      </>
    ),
  },
  {
    q: "Is it really free?",
    a: (
      <>
        Yes. There are no paid tiers or hidden fees. We are all college students volunteering and working around our
        schedules to build our community.
      </>
    ),
  },
  {
    q: "Who writes it?",
    a: (
      <>
        <a href="#mentors" className={teamLinkClass}>
          Our team
        </a>{" "}
        of top-performing college students keeps our AI resources updated, shapes what goes out each week, and answers
        when you email us. If something needs a specific background—research, coding, writing, pre-med—we hand it to
        whoever on the team actually has that depth so you get a grounded reply, not a generic script.
      </>
    ),
  },
  {
    q: "How often will I hear from you?",
    a: "Once a week on Sunday. No spam, ever.",
  },
  {
    q: "How do I unsubscribe?",
    a: "Every email includes an unsubscribe link. One click and you are off the list.",
  },
];

function FaqAccordionItem({
  item,
  index,
  openIndex,
  setOpenIndex,
  baseId,
}: {
  item: FaqItem;
  index: number;
  openIndex: number | null;
  setOpenIndex: (i: number | null) => void;
  baseId: string;
}) {
  const isOpen = openIndex === index;
  const panelId = `${baseId}-panel-${index}`;
  const headerId = `${baseId}-header-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="rounded-[1.75rem] border-2 border-slate-100 bg-white shadow-[0_12px_36px_-24px_rgba(15,23,42,0.18)] transition-shadow hover:border-sky-100 hover:shadow-[0_16px_44px_-22px_rgba(14,165,233,0.22)]"
    >
      <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
        <button
          type="button"
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setOpenIndex(isOpen ? null : index)}
          className={`flex w-full items-center justify-between gap-4 rounded-[1.65rem] px-5 py-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 sm:px-6 sm:py-5 ${jakartaSans.className}`}
        >
          <span className="font-bold tracking-tight text-slate-900">{item.q}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-sky-600"
            aria-hidden
          >
            <ChevronDown className="h-5 w-5" strokeWidth={2.25} />
          </motion.span>
        </button>
      </h3>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div id={panelId} role="region" aria-labelledby={headerId} className="min-h-0 overflow-hidden">
          <p
            className={`px-5 pb-5 text-sm font-medium leading-relaxed text-slate-600 sm:px-6 sm:pb-6 sm:text-[15px] ${jakartaSans.className}`}
          >
            {item.a}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section
      id="faq"
      className="relative overflow-hidden border-t border-sky-100/80 bg-gradient-to-b from-violet-50/30 via-white to-sky-50/25 px-4 py-20 sm:px-6 sm:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(14,165,233,0.07),transparent)]" />

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center"
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-600 ${jakartaSans.className}`}>
            FAQ
          </p>
          <h2
            id="faq-heading"
            className={`mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-[2.75rem] ${fredokaHeadline.className}`}
          >
            Questions parents ask us
          </h2>
          <p className={`mx-auto mt-4 max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg ${jakartaSans.className}`}>
            Straight answers—no jargon wall. Tap a question to expand.
          </p>
        </motion.div>

        <div className="mt-12 flex flex-col gap-3 sm:gap-4">
          {FAQ_ITEMS.map((item, index) => (
            <FaqAccordionItem
              key={item.q}
              item={item}
              index={index}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              baseId={baseId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
