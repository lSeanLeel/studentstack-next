import type { Metadata, Viewport } from "next";
import { jakartaSans, fredokaHeadline, institutionalSerif } from "./fonts";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "StudentStack | Membership for parents of high schoolers",
  description:
    "A student-led organization of college students helping parents of high schoolers stay current with how AI shows up in school. Apply your student for membership.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${jakartaSans.variable} ${fredokaHeadline.variable} ${institutionalSerif.variable} ${jakartaSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}