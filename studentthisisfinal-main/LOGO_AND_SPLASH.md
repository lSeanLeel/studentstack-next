# Logo + loading screen (source of truth)

## Brand files for Canva / uploads (PNGs + splash)

**Everything lives in one folder (no zip, no extra steps):**

`studentthisisfinal-main/public/brand-kit/`

Open that folder in File Explorer. You should see `logo-transparent.png`, `logo-on-background.png`, `splash-animation.html`, `IntroAnimation.tsx`, and `README.txt`.

PNG logos are built with **`npm run brand-kit`**: the **navbar wordmark is live text** (`BrandWordmark.tsx` + `next/font/google` Fredoka). The script uses **Playwright (Chromium)** to screenshot the same Google Fonts Fredoka 600 + CSS, so **`public/logo-transparent.png`** matches what you see in the header (not Resvg). One-time: **`npx playwright install chromium`**.

**Optional:** refresh those PNGs after you change the logo in code. You can run this from **either** folder:

- **Outer zip folder** (`studentthisisfinal-main` next to `package.json` that only forwards scripts): **`npm run brand-kit`**
- **Inner app folder** (`studentthisisfinal-main/studentthisisfinal-main`): **`npm run brand-kit`**

With `npm run dev` running, you can also open **`http://localhost:3000/brand-kit/splash-animation.html`** in the browser.

---

The live site navbar shows **live Fredoka text** (not `<img>`). **`public/logo-transparent.png`** is for downloads / social / email and is regenerated to match that text via Playwright.

## Where the logo lives (exact paths)

Open these from your project folder `studentthisisfinal-main/`:

| What | Path on disk |
|------|----------------|
| **Navbar / clickable logo** | `src\components\Navbar.tsx` + `src\components\BrandWordmark.tsx` |
| **Fredoka font (Google Fonts wiring)** | `src\app\fonts.ts` |

**For Canva or print:** use **`public/brand-kit/logo-transparent.png`** and **`logo-on-background.png`** (no terminal needed unless you want to regenerate them).

---

## Loading / splash animation (exact path + copy-paste code)

**Canonical file:** `src\components\IntroAnimation.tsx`

Used from `src\app\page.tsx` as `<IntroAnimation onComplete={...} />`.

Full contents:

```tsx
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
                rotate: [-8, 5, -2.5, 0],
                scale: [0.82, 1.12, 0.97, 1],
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
```

Dependencies: `motion` package, Tailwind gradient classes, `@/app/fonts` Fredoka export.
