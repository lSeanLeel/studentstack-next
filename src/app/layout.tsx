import type { Metadata, Viewport } from "next";
import { jakartaSans, fredokaHeadline, institutionalSerif } from "./fonts";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "StudentStack | Free daily from a student-led organization",
  description:
    "Free daily for parents of high schoolers on how students use AI to stay organized for school. Student-led. Join with your email, or reach out for a personal reply.",
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