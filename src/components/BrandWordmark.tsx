import { fredokaHeadline } from "@/app/fonts";

/**
 * Live wordmark: same Fredoka 600 + colors as next/font/google (matches browser, not Resvg PNG).
 * Default sizes align with former navbar <img className="h-8 md:h-10"> (~32px / ~40px cap height).
 * Pass `compact` to shrink the mobile size (for tight nav rows where Sign up + nav items need room).
 */
export function BrandWordmark({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const sizeClasses = compact
    ? "text-[1.35rem] md:text-[2.5rem]"
    : "text-[2rem] md:text-[2.5rem]";

  return (
    <span
      className={`${fredokaHeadline.className} inline-flex items-center ${sizeClasses} leading-none font-semibold tracking-[-0.04em] antialiased md:leading-none ${className}`}
    >
      <span className="text-slate-900">Student</span>
      <span className="inline-block text-sky-500">Stack</span>
    </span>
  );
}
