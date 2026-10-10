import type { Metadata, Viewport } from "next";
import { jakartaSans, fredokaHeadline, institutionalSerif } from "./fonts";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "StudentStack | The AI program for high schoolers, run by college students",
  description:
    "A monthly, application-only AI program for high schoolers, run by college students at top universities. Learn how top students use AI to organize, research and study, the right way.",
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