import type { Metadata, Viewport } from "next";
import { jakartaSans, fredokaHeadline, institutionalSerif } from "./fonts";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "StudentStack | Free daily AI organization newsletter for parents",
  description:
    "Parents start with StudentStack’s free daily newsletter to learn how their high schooler can use AI to stay organized for school. Optional Elite student portal subscription available.",
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