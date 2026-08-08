import type { Metadata, Viewport } from "next";
import { jakartaSans, fredokaHeadline } from "./fonts";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "StudentStack | Free weekly AI email for parents",
  description:
    "StudentStack is a free weekly AI education newsletter for parents of high schoolers, written by college students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${jakartaSans.variable} ${fredokaHeadline.variable} ${jakartaSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}