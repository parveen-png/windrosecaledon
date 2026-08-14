import {
  disclaimer,
  hasRealEmail,
  hasRealPhone,
  legalIdentityComplete,
  publisher,
} from "@/lib/site";
import { ContactLink } from "@/components/ContactLink";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-sand bg-ink pb-24 text-cream md:pb-10">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-paper">
            Windrose at Caledon Trails
          </p>
          <p className="mt-3 text-sm leading-6 text-sand">
            Independent project information and registration. Not the official
            website of Laurier Homes, Yorkwood Homes or Caledon Trails.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-paper uppercase">
            Legal identity
          </h2>
          <p className="mt-3 text-sm leading-6">
            Publisher: {publisher.legalName}
          </p>
          <p className="text-sm leading-6">Registrant: {publisher.registrant}</p>
          <p className="text-sm leading-6">{publisher.address}</p>
          {hasRealPhone ? (
            <p className="mt-2 text-sm">
              Phone:{" "}
              <ContactLink type="phone" value={publisher.phone}>
                {publisher.phone}
              </ContactLink>
            </p>
          ) : (
            <p className="mt-2 text-sm text-gold">
              Public phone: [INSERT] — launch blocker
            </p>
          )}
          {hasRealEmail ? (
            <p className="text-sm">
              Email:{" "}
              <ContactLink type="email" value={publisher.email}>
                {publisher.email}
              </ContactLink>
            </p>
          ) : (
            <p className="text-sm text-gold">
              Public email: [INSERT] — launch blocker
            </p>
          )}
          {!legalIdentityComplete ? (
            <p className="mt-3 text-sm text-gold">
              Legal publisher name is a launch blocker under Ontario advertising
              rules and must be inserted before public launch.
            </p>
          ) : null}
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-paper uppercase">
            Site
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a className="underline underline-offset-2" href="/privacy-policy">
                Privacy policy
              </a>
            </li>
            <li>
              <a className="underline underline-offset-2" href="/terms">
                Terms and disclaimer
              </a>
            </li>
            <li>
              <a className="underline underline-offset-2" href="#faq">
                FAQ
              </a>
            </li>
            <li>
              <a className="underline underline-offset-2" href="#register">
                Register
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="section-shell border-t border-white/10 py-8 text-sm leading-7 text-sand">
        <p>{disclaimer}</p>
        <p className="mt-4">
          This disclaimer is not legal advice. Have the publisher’s compliance
          officer and Canadian legal/privacy counsel review the site before
          launch.
        </p>
        <p className="mt-4">© {year} {publisher.legalName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
