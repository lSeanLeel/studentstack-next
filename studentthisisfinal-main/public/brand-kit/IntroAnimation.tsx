import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { fredokaHeadline } from "@/app/fonts";

export const IntroAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<"idle" | "show" | "exit">("idle");

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setPhase("show"), 200));
    t.push(setTimeout(() => setPhase("exit"), 2200));
    t.push(setTimeout(() => onComplete(), 3000));
    return () => t.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-violet-50 select-none"
        >
          <div
            className={`${fredokaHeadline.className} flex items-center text-5xl font-semibold tracking-[-0.04em] antialiased md:text-8xl`}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-slate-900"
            >
              Student
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: -64, rotate: -8, scale: 0.82 }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: [ -8, 5, -2.5, 0 ],
                scale: [ 0.82, 1.12, 0.97, 1 ],
              }}
              transition={{
                opacity: { duration: 0.35, delay: 0.08 },
                y: {
                  type: "spring",
                  stiffness: 520,
                  damping: 11,
                  mass: 0.45,
                  delay: 0.08,
                },
                rotate: { duration: 0.85, ease: [0.34, 1.56, 0.64, 1], delay: 0.06 },
                scale: { duration: 0.85, ease: [0.34, 1.56, 0.64, 1], delay: 0.06 },
              }}
              className="inline-block text-sky-500"
            >
              Stack
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
