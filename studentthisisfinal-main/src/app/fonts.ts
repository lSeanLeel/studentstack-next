import { Plus_Jakarta_Sans, Fredoka } from "next/font/google";

export const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const fredokaHeadline = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-headline",
});
