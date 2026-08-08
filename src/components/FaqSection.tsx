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
        We are a group of college students building a free online community to share how students are using AI to stay
        ahead of school. We have grown a community of parents and high schoolers looking to learn from us students who
        actually know how to use AI best for school.
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
    id: "faq-who-writes",
    q: "Who writes it?",
    a: (
      <>
        Our team of top-performing college students keeps our AI resources updated, shapes what goes out each week, and
        answers when you email us. If something needs a specific background (Pre-Med, Coding, Physics, Music), we try to
        hand it to whoever on the team actually has the relevant experience and depth to provide their valuable
        &ldquo;student&rdquo; perspective.
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
    <div
      id={item.id}
      className="scroll-mt-36 border-b border-sky-100/90 last:border-b-0"
    >
      <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
        <button
          type="button"
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setOpenIndex(isOpen ? null : index)}
          className={`flex w-full items-center justify-between gap-4 py-5 text-left outline-none transition-colors hover:text-sky-700 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 sm:py-6 ${jakartaSans.className}`}
        >
          <span className="font-bold tracking-tight text-slate-900">{item.q}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600"
            aria-hidden
          >
            <ChevronDown className="h-4 w-4" strokeWidth={2.25} />
          </motion.span>
        </button>
      </h3>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div id={panelId} role="region" aria-labelledby={headerId} className="min-h-0 overflow-hidden">
          <p
            className={`pb-5 text-sm font-medium leading-relaxed text-slate-600 sm:pb-6 sm:text-[15px] ${jakartaSans.className}`}
          >
            {item.a}
          </p>
        </div>
      </div>
    </div>
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
      className="relative scroll-mt-28 px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl border-t border-sky-100/90 pt-10 sm:pt-12"
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-600 ${jakartaSans.className}`}>
            FAQ
          </p>
          <h2
            id="faq-heading"
            className={`mt-3 text-[1.75rem] font-semibold tracking-[-0.03em] text-slate-900 sm:text-[2.35rem] ${fredokaHeadline.className}`}
          >
            Questions parents ask us
          </h2>
        </motion.div>

        <div className="mt-4 sm:mt-6">
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
