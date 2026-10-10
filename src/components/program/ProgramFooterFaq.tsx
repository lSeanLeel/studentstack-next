"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { institutionalSerif, jakartaSans } from "@/app/fonts";
import { BrandWordmark } from "@/components/BrandWordmark";
import { useContact } from "@/components/contact-context";
import { CONTACT_EMAIL, FAQ } from "@/lib/program";

const serif = institutionalSerif.className;
const sans = jakartaSans.className;

export function ProgramFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-20 border-t border-rule bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[17rem_1fr] lg:gap-16">
        <div>
          <h2 className={`${serif} text-[1.9rem] font-semibold leading-[1.15] text-ink sm:text-[2.2rem]`}>Common questions</h2>
          <p className={`${sans} mt-3 max-w-xs text-[0.95rem] leading-relaxed text-muted`}>
            Anything else, write to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-accent underline underline-offset-4">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
        <div className="border-t border-rule">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-rule">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={`${sans} flex w-full items-center justify-between gap-6 py-5 text-left text-[1.02rem] font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
                  >
                    {item.q}
                    {isOpen ? <Minus className="h-4 w-4 shrink-0 text-muted" aria-hidden /> : <Plus className="h-4 w-4 shrink-0 text-muted" aria-hidden />}
                  </button>
                </h3>
                <div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!isOpen}>
                  <p className={`${sans} max-w-[64ch] pb-6 text-[0.98rem] leading-relaxed text-body`}>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProgramFooter() {
  const { openContact } = useContact();
  return (
    <footer className="border-t border-rule bg-white">
      <div className={`${sans} mx-auto grid max-w-6xl gap-10 px-5 py-12 text-[0.92rem] sm:px-8 md:grid-cols-[1fr_auto_auto] md:gap-16`}>
        <div>
          <BrandWordmark className="!text-[1.4rem]" />
          <p className="mt-3 max-w-sm leading-relaxed text-muted">
            A monthly AI program for high school students, run by undergraduates. Admission by application.
          </p>
        </div>
        <ul className="space-y-2.5">
          <li><Link href="/apply" className="text-body hover:text-ink">Apply</Link></li>
          <li><Link href="/team" className="text-body hover:text-ink">Team</Link></li>
          <li><a href="/#newsletter" className="text-body hover:text-ink">Newsletter</a></li>
        </ul>
        <ul className="space-y-2.5">
          <li><button type="button" onClick={openContact} className="text-body hover:text-ink">Contact</button></li>
          <li><a href="/privacy" className="text-body hover:text-ink">Privacy</a></li>
          <li><a href="/terms" className="text-body hover:text-ink">Terms</a></li>
        </ul>
      </div>
      <div className="border-t border-rule">
        <p className={`${sans} mx-auto max-w-6xl px-5 py-6 text-sm text-muted sm:px-8`}>
          &copy; {new Date().getFullYear()} StudentStack
        </p>
      </div>
    </footer>
  );
}
