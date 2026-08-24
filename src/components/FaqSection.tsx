"use client";

import React, { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";

type FaqItem = { id?: string; q: string; a: ReactNode };

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is StudentStack?",
    a: "A private membership for high school students, built by college students. Our main angle is AI for school: literacy and judgment so students use AI to learn harder, not to skip the work. High school advice and resources ride alongside that.",
  },
  {
    q: 'What does "AI for school" mean here?',
    a: "Prompts, workflows, and habits for classes, studying, writing, and planning that keep the student in charge. We teach how college students actually use AI without outsourcing thinking or integrity.",
  },
  {
    q: "Who runs this?",
    a: "Current college students. Sean Lee (UCLA '28, CS + Statistics) started the team. Campuses parents already recognize.",
  },
  {
    q: "How is this different from tutors or admissions counselors?",
    a: "We are still in the classrooms and admissions cycles that shape what high schoolers need now. The core product is AI literacy for school, with high school guidance from peers ahead of your student, not a recycled counseling playbook.",
  },
  {
    q: "What do members get?",
    a: "A gated student portal: AI toolkit and certifications, plus opportunity vault and high school resources. Inside, progress feels gamified so literacy and advice reinforce each other. We stay light on public catalogs on purpose.",
  },
  {
    q: "How do I join?",
    a: "Parents complete a short application, review mentorship matching, create a portal password, and finish checkout. A welcome email with login details goes to the parent email. A mentor reaches out after.",
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
          Questions <span className="text-sky-500">parents</span> ask us
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
