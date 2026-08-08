"use client";

import React, { useEffect, useId, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";

type FaqItem = { id?: string; q: string; a: ReactNode };

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is StudentStack?",
    a: (
      <>
        StudentStack is a student-led way to help high schoolers stay ahead with AI. Parents start with our free daily
        newsletter. When a family wants more, StudentStack Elite gives the student a private portal with our AI toolkit
        and exclusive resources.
      </>
    ),
  },
  {
    q: "What is in the daily newsletter?",
    a: (
      <>
        Each email is short on purpose: a signal on what changed, a toolkit workflow we actually used, and one concrete
        move for the week. Written from the perspective of college students still in class.
      </>
    ),
  },
  {
    q: "Is the newsletter free?",
    a: (
      <>
        Yes. The daily email is 100% free. Elite is separate and optional: parents purchase access so their student can
        use the portal.
      </>
    ),
  },
  {
    q: "What is StudentStack Elite?",
    a: (
      <>
        A parent-purchased portal for the student. It includes full access to our AI toolkit (organization, notetaking,
        planning, studying, writing, research) plus exclusive resources like summer program lists and opportunity
        shortlists.
      </>
    ),
  },
  {
    id: "faq-who-writes",
    q: "Who writes it?",
    a: (
      <>
        StudentStack is built around how college students use AI for school. We keep the work practical and current, and
        we answer when you email us.
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
  const isOpen = openIndex === index;
  const panelId = `${baseId}-panel-${index}`;
  const headerId = `${baseId}-header-${index}`;

  return (
    <motion.div
      id={item.id}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="scroll-mt-36 rounded-[1.75rem] border-2 border-slate-100 bg-white shadow-[0_12px_36px_-24px_rgba(15,23,42,0.18)] transition-shadow hover:border-sky-100 hover:shadow-[0_16px_44px_-22px_rgba(14,165,233,0.22)]"
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

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;
      const idx = FAQ_ITEMS.findIndex((item) => item.id === hash);
      if (idx >= 0) {
        setOpenIndex(idx);
        // Let layout settle, then scroll the FAQ card into view.
        requestAnimationFrame(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <section
      id="faq"
      className="relative overflow-hidden border-t border-sky-100/80 bg-transparent px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="faq-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(14,165,233,0.07),transparent)]" />

      <div className="relative mx-auto w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl">
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
            className={`mt-2.5 text-[1.65rem] font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl lg:text-[2.15rem] ${fredokaHeadline.className}`}
          >
            Questions parents ask us
          </h2>
        </motion.div>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:gap-4">
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
