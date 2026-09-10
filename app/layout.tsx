import type { Metadata } from "next";
import { fontClassNames } from "./fonts";
import "./globals.css";

const siteUrl = "https://www.woosterprep.com";
// Copied from the live site. The live title uses an em dash; replaced with a colon per house style.
const title = "Wooster SAT Prep: Personalized prep that moves your score";
const description =
  "Start with a smart SAT diagnostic, get a personalized study plan, and improve faster with targeted practice.";
const socialDescription =
  "Smart diagnostic, personalized roadmap, and measurable SAT score improvement.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description: socialDescription,
    url: "/",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Wooster SAT Prep",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: socialDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Wooster SAT Prep",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontClassNames} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
