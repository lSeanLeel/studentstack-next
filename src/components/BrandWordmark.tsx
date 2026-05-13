import { fredokaHeadline } from "@/app/fonts";

/**
 * Live wordmark: same Fredoka 600 + colors as next/font/google (matches browser, not Resvg PNG).
 * Sizes align with former navbar <img className="h-8 md:h-10"> (~32px / ~40px cap height).
 */
export function BrandWordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`${fredokaHeadline.className} inline-flex items-center text-[2rem] leading-none font-semibold tracking-[-0.04em] antialiased md:text-[2.5rem] md:leading-none ${className}`}
    >
      <span className="text-slate-900">Student</span>
      <span className="inline-block text-sky-500">Stack</span>
    </span>
  );
}
