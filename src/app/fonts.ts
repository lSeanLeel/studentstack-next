import { Plus_Jakarta_Sans, Fredoka, Source_Serif_4 } from "next/font/google";

export const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const fredokaHeadline = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-headline",
});

/** Institutional serif for Elite / portal marketing copy (not hero brand type). */
export const institutionalSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-institutional",
});
