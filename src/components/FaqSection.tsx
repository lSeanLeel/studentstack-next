"use client";

import React, { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";

type FaqItem = { id?: string; q: string; a: ReactNode };

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is StudentStack?",
    a: (
      <>
        A student-led organization. Parents get a daily newsletter on AI in school. Students can pursue certifications
        for concrete academic AI use cases.
      </>
    ),
  },
  {
    q: "What is in the daily?",
    a: (
      <>
        A short pulse so you stay current with other parents: what is moving in the school AI climate, and one practical
        move you can forward. Longer credentialed learning lives in certifications.
      </>
    ),
  },
  {
    q: "How do certifications work?",
    a: (
      <>
        Paid pathways with a clear price, timeline, and issuing partner. Students complete modules, meet the
        requirements, and earn a StudentStack credential (codes like SS-AAIP).
      </>
    ),
  },
  {
    id: "faq-who-writes",
    q: "Why student-led?",
    a: (
      <>
        Campus tools and classroom norms change fast. Working with students who are still in that environment keeps the
        guidance current for parents and learners.
      </>
    ),
  },
  {
    q: "Can I talk with your team?",
    a: (
      <>
        Yes. Use Reach out anytime. For a certification, use Enroll on that listing and we will follow up to complete
        payment and rostering.
      </>
    ),
  },
  {
    q: "How do I unsubscribe?",
    a: "Every email includes an unsubscribe link. One click and you are off the list. No reply needed.",
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
  const open = openIndex === index;
  const panelId = `${baseId}-panel-${item.id ?? index}`;
  const buttonId = `${baseId}-button-${item.id ?? index}`;

  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpenIndex(open ? null : index)}
          className={`flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold tracking-[-0.02em] text-slate-900 sm:text-lg ${fredokaHeadline.className}`}
        >
          {item.q}
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
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
    <section
      id="faq"
      className="relative overflow-hidden border-t border-slate-100 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="relative mx-auto w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <motion.h2
          id="faq-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-[2rem] font-semibold tracking-[-0.035em] text-slate-900 sm:text-4xl ${fredokaHeadline.className}`}
        >
          Questions <span className="text-sky-500">parents</span> ask
        </motion.h2>
        <div className="mt-8 rounded-[1.75rem] border border-slate-100 bg-[#f8fafc] px-5 sm:px-7">
          {mounted
            ? FAQ_ITEMS.map((item, index) => (
                <FaqAccordionItem
                  key={item.id ?? item.q}
                  item={item}
                  index={index}
                  openIndex={openIndex}
                  setOpenIndex={setOpenIndex}
                  baseId="faq"
                />
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
