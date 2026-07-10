import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Frame } from "@/components/Frame";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shiftd.design"),
  title: "shiftd.design — Shifin George",
  description:
    "Shifin George — part designer, part vibe coder, full-time problem untangler. Selected work, case studies, and a standing invitation to say hello.",
  openGraph: {
    title: "shiftd.design — Shifin George",
    description: "They call it design. I call it organized obsession.",
    url: "https://shiftd.design",
    siteName: "shiftd.design",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafaf8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        {children}
        <Frame />
      </body>
    </html>
  );
}
