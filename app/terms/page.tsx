import type { Metadata } from "next";
import { Header, MobileStickyCta } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LAST_VERIFIED, disclaimer } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms and disclaimer",
  description:
    "Independent-site terms and real-estate disclaimer for Windrose at Caledon Trails.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main" className="bg-paper">
        <article className="section-shell max-w-3xl py-12 md:py-24">
          <p className="text-sm font-semibold tracking-[0.16em] uppercase text-gold">
            Legal
          </p>
          <h1 className="mt-3 font-display text-3xl md:text-4xl">Terms and disclaimer</h1>
          <p className="mt-4 text-sm text-ink-soft">Last updated: {LAST_VERIFIED}.</p>
          <div className="prose-calm mt-10 space-y-6 text-[1.05rem] leading-8">
            <p>
              This website is an independent information and registration page
              for Windrose at Caledon Trails. It is not affiliated with, or
              authorized by, the builders unless a written authorization is later
              added to this page.
            </p>
            <p>{disclaimer}</p>
            <p>
              Project facts are dated on the landing page. Prices, incentives,
              specifications and availability are subject to change without notice.
              Renderings are artists’ concepts.
            </p>
          </div>
        </article>
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
