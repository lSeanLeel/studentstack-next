"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Check } from "lucide-react";
import { institutionalSerif, jakartaSans } from "@/app/fonts";
import { HERO, USE_CASES } from "@/lib/program";

const ROTATE_MS = 2800;

/**
 * Headline with a rotating use case. It cycles on its own until the visitor
 * hovers, focuses or picks a use case from the menu; then it stays put.
 */
export function HeroHeadline() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const listId = useId();

  const rotating = !pinned && !paused && !open && !reduce;

  useEffect(() => {
    if (!rotating) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % USE_CASES.length), ROTATE_MS);
    return () => clearInterval(t);
  }, [rotating]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = USE_CASES[index];

  function choose(i: number) {
    setIndex(i);
    setPinned(true);
    setOpen(false);
  }

  return (
    <div>
      <h1
        className={`${institutionalSerif.className} text-[2.2rem] font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[3rem] lg:text-[3.35rem]`}
      >
        <span className="block max-w-[22ch]">{HERO.lead}</span>
        <span
          ref={wrapRef}
          className="relative inline-block"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listId}
            onClick={() => setOpen((o) => !o)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="group inline-flex items-baseline gap-2 rounded-sm text-left text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
          >
            <span className="relative inline-flex overflow-hidden border-b-2 border-accent/30 pb-1 transition-colors group-hover:border-accent">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={current.id}
                  initial={reduce ? false : { y: "70%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduce ? undefined : { y: "-70%", opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block sm:whitespace-nowrap"
                >
                  {current.phrase}
                </motion.span>
              </AnimatePresence>
            </span>
            <ChevronDown
              aria-hidden
              className={`h-[0.5em] w-[0.5em] shrink-0 self-center transition-transform ${open ? "rotate-180" : ""}`}
            />
            <span className="sr-only">, choose a use case</span>
          </button>

          {open ? (
            <ul
              id={listId}
              role="listbox"
              aria-label="Use cases"
              className={`${jakartaSans.className} absolute left-0 top-full z-20 mt-3 w-[min(20rem,calc(100vw-2.5rem))] overflow-hidden rounded-md border border-rule bg-white py-1 text-base font-medium tracking-normal shadow-[0_12px_32px_-12px_rgba(19,35,63,0.25)]`}
            >
              {USE_CASES.map((u, i) => (
                <li key={u.id} role="option" aria-selected={i === index}>
                  <button
                    type="button"
                    onClick={() => choose(i)}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors hover:bg-wash focus-visible:bg-wash focus-visible:outline-none ${
                      i === index ? "text-ink" : "text-body"
                    }`}
                  >
                    {u.phrase}
                    {i === index ? <Check className="h-4 w-4 text-accent" aria-hidden /> : null}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </span>
      </h1>

      <p className={`${jakartaSans.className} mt-5 min-h-[3em] max-w-[52ch] text-[0.98rem] leading-relaxed text-muted`}>
        <span className="font-semibold text-body">For example: </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current.id}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {current.example}
          </motion.span>
        </AnimatePresence>
      </p>
    </div>
  );
}
