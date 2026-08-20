import type { Metadata } from "next";
import { Header, MobileStickyCta } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LAST_VERIFIED, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How the independent Windrose at Caledon Trails website collects, uses and retains registration information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main id="main" className="bg-paper">
        <article className="section-shell max-w-3xl py-12 md:py-24">
          <p className="text-sm font-semibold tracking-[0.16em] uppercase text-gold">
            Legal
          </p>
          <h1 className="mt-3 font-display text-3xl md:text-4xl">Privacy policy</h1>
          <p className="mt-4 text-sm text-ink-soft">
            Last updated: {LAST_VERIFIED}. This policy applies to {SITE_URL}.
          </p>
          <div className="prose-calm mt-10 space-y-6 text-[1.05rem] leading-8">
            <p>
              This independent website collects information so we can send
              verified Windrose at Caledon Trails updates to people who ask for
              them. It is not the official website of Laurier Homes, Yorkwood
              Homes or the Caledon Trails community.
            </p>
            <h2 className="font-display text-2xl text-ink">Who publishes this site</h2>
            <p>
              This is an independent information and registration website for
              Windrose at Caledon Trails. It is not the official website of the
              builders or the project.
            </p>
            <h2 className="font-display text-2xl text-ink">What we collect and why</h2>
            <p>
              The registration form collects first name, last name, email address,
              phone number, whether you are a broker, marketing consent, the consent
              wording and version, the page URL, page version, referrer, advertising
              click identifiers when present, form version, and the time and timezone
              of submission. We use this to send the project updates you requested,
              to prevent spam, and to understand which campaigns brought a
              registration. We do not sell personal information.
            </p>
            <h2 className="font-display text-2xl text-ink">Consent</h2>
            <p>
              The marketing-consent box is unchecked by default. We send
              electronic messages about Windrose only if you check that box.
              Consent text, version and timestamp are stored with the lead. You
              may withdraw consent by using the unsubscribe method in our emails
              or by writing to the publisher.
            </p>
            <h2 className="font-display text-2xl text-ink">Analytics cookies</h2>
            <p>
              Optional analytics load only after you accept them. Analytics events
              never include names, email addresses, phone numbers or form field
              values. You can use the site, including the form, if you choose
              necessary cookies only.
            </p>
            <h2 className="font-display text-2xl text-ink">Retention and security</h2>
            <p>
              Registrations are stored on the server and, if configured, sent to
              the publisher’s email or CRM webhook. Access should be limited to
              people who need to follow up on Windrose enquiries. Do not keep
              leads longer than needed for that purpose and for legal record
              keeping.
            </p>
            <h2 className="font-display text-2xl text-ink">Your choices</h2>
            <p>
              You may request access to, correction of, or deletion of your
              registration information, subject to legal exceptions. This policy
              should be reviewed by Canadian privacy counsel before launch.
            </p>
          </div>
        </article>
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
