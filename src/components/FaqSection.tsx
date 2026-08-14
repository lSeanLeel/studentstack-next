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
        A student-led organization helping parents of high schoolers stay ahead on AI in school. Our core product is the
        StudentStack Daily membership, plus partner credential pathways for students.
      </>
    ),
  },
  {
    q: "What is the Daily membership?",
    a: (
      <>
        A paid membership for parents. You join with your email, then unlock the full daily desk for $40/mo. Each send
        includes a school AI signal, one toolkit move, and a forwardable note for your student.
      </>
    ),
  },
  {
    q: "What is in each daily email?",
    a: (
      <>
        The same tight format every day: a morning note from students still in class, one school AI signal, one
        Organization / Planning / Notetaking toolkit move, and a short forward-tonight message.
      </>
    ),
  },
  {
    q: "How do partner credentials work?",
    a: (
      <>
        Separate paid pathways with a clear price and timeline. Students complete modules with an issuing partner and
        earn a StudentStack credential (codes like SS-AAIP).
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
        Yes. Use Contact for student/family questions or enterprise partnerships. We respond ourselves.
      </>
    ),
  },
  {
    q: "How do I cancel?",
    a: "Membership is month to month. Cancel anytime from your billing email or by writing our team.",
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
