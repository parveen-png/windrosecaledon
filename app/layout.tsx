import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { Analytics, ConsentBanner } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, metadataContent } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2C4A3E",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: metadataContent.title,
    template: "%s | Windrose at Caledon Trails",
  },
  description: metadataContent.description,
  applicationName: "Windrose at Caledon Trails",
  authors: [{ name: "Independent project information site" }],
  keywords: [
    "Windrose at Caledon Trails",
    "Windrose Caledon Trails",
    "Windrose Caledon",
    "new homes in Caledon",
    "Caledon Trails",
    "Laurier Homes",
    "Yorkwood Homes",
    "Mayfield Drive McLaughlin Road",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: "Windrose at Caledon Trails",
    title: metadataContent.title,
    description: metadataContent.description,
    images: [
      {
        url: "/images/og-caledon-landscape.jpg",
        width: 1200,
        height: 630,
        alt: "Conceptual Caledon countryside landscape. Not an official project rendering.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: metadataContent.title,
    description: metadataContent.description,
    images: ["/images/og-caledon-landscape.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-CA"
      className={`${fraunces.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream font-sans text-ink">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <JsonLd />
        <Analytics />
        {children}
        <ConsentBanner />
      </body>
    </html>
  );
}
