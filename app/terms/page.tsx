import type { Metadata } from "next";
import { Header, MobileStickyCta } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LAST_VERIFIED, disclaimer, publisher } from "@/lib/site";

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
        <article className="section-shell max-w-3xl py-16 md:py-24">
          <p className="text-sm font-semibold tracking-[0.16em] uppercase text-gold">
            Legal
          </p>
          <h1 className="mt-3 font-display text-4xl">Terms and disclaimer</h1>
          <p className="mt-4 text-sm text-ink-soft">Last updated: {LAST_VERIFIED}.</p>
          <div className="prose-calm mt-10 space-y-6 text-[1.05rem] leading-8">
            <p>
              This website is published by {publisher.legalName} as an independent
              information and registration page. It is not affiliated with, or
              authorized by, the builders unless a written authorization is later
              added to this page.
            </p>
            <p>{disclaimer}</p>
            <p>
              Project facts are verified against official community, builder and
              government sources and dated on the landing page. Unconfirmed
              commercial details are marked to be announced. Conceptual photographs
              are not official renderings.
            </p>
            <p>
              If this page advertises real-estate services of an Ontario
              registrant, the brokerage and registrant must be identified before
              launch, as required by current RECO/TRESA advertising rules.
            </p>
            <p>
              These terms are not legal advice. Have Canadian counsel review them
              before the site is advertised to the public.
            </p>
          </div>
        </article>
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
