import type { Metadata, Viewport } from "next";
import { jakartaSans, fredokaHeadline } from "./fonts";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "StudentStack",
  description: "StudentStack Elite funnel and operations dashboard",
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