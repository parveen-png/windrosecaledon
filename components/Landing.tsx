import Image from "next/image";
import { RegisterForm } from "@/components/RegisterForm";
import { HeroCta } from "@/components/HeroCta";
import {
  LAST_VERIFIED,
  disclaimer,
  faqs,
  introAnswer,
  snapshotRows,
  sources,
} from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-caledon-landscape.jpg"
          alt="Conceptual Caledon countryside landscape at golden hour. Not an official project rendering."
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,26,22,0.72)_0%,rgba(28,26,22,0.42)_48%,rgba(28,26,22,0.28)_100%)]" />
      </div>
      <div className="section-shell grid items-start gap-8 py-16 md:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] md:py-24">
        <div className="text-paper">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-sand">
            New homes in Caledon
          </p>
          <h1
            id="hero-heading"
            className="mt-4 font-display text-4xl leading-[1.1] md:text-6xl"
          >
            Windrose at Caledon Trails
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-cream">
            An independent information page for a new-home opportunity connected
            to the Caledon Trails community at Mayfield Drive and McLaughlin
            Road. Laurier Homes and Yorkwood Homes are the builders named on the
            official community website.
          </p>
          <p className="mt-4 max-w-xl text-lg leading-8 text-cream">
            Pricing, floor plans and launch timing for Windrose are still to be
            announced. Register for verified updates when official documents are
            released.
          </p>
          <ul className="mt-8 grid gap-3 text-sm md:grid-cols-3">
            {[
              "Mayfield Drive & McLaughlin Road, Caledon",
              "Broader community by Laurier Homes and Yorkwood Homes",
              "Prices & floor plans: to be announced",
            ].map((item) => (
              <li
                key={item}
                className="border border-white/20 bg-white/8 px-4 py-3 leading-6"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 hidden md:block">
            <HeroCta />
          </div>
          <p className="mt-5 text-sm text-sand">
            Free project updates. No obligation.
          </p>
          <p className="mt-2 max-w-xl text-xs leading-5 text-sand">
            Independent informational website — not the official website of the
            builders or the project.
          </p>
        </div>
        <div id="register" className="scroll-mt-28">
          <RegisterForm id="hero-register-form" />
        </div>
      </div>
    </section>
  );
}

export function DirectAnswer() {
  return (
    <section id="overview" className="bg-paper py-16 md:py-20">
      <div className="section-shell max-w-4xl">
        <h2 className="font-display text-3xl md:text-4xl">
          What is Windrose at Caledon Trails?
        </h2>
        <p id="direct-answer" className="mt-5 max-w-3xl text-lg leading-8 text-ink-soft">
          {introAnswer}
        </p>
        <p className="mt-4 text-sm text-ink-soft">
          Source:{" "}
          <a className="underline underline-offset-2" href={sources.caledonTrails.href}>
            {sources.caledonTrails.label}
          </a>
          . Last verified: {LAST_VERIFIED}.
        </p>
      </div>
    </section>
  );
}

export function Snapshot() {
  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="section-shell max-w-4xl">
        <h2 className="font-display text-3xl md:text-4xl">Verified project snapshot</h2>
        <p className="mt-4 max-w-2xl text-ink-soft">
          Only facts confirmed on official community, builder or government
          sources are stated as facts. Everything else is marked to be announced.
        </p>
        <div id="project-snapshot" className="mt-8 overflow-hidden rounded-sm border border-sand bg-paper px-5 md:px-8">
          <table className="snapshot-table">
            <caption className="sr-only">
              Windrose at Caledon Trails verified project facts as of {LAST_VERIFIED}
            </caption>
            <tbody>
              {snapshotRows.map((row) => (
                <tr key={row.field}>
                  <th scope="row">{row.field}</th>
                  <td className="text-ink-soft">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-ink-soft">
          Last verified: {LAST_VERIFIED}. Primary source:{" "}
          <a className="underline underline-offset-2" href={sources.caledonTrails.href}>
            caledontrails.ca
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export function WhyRegister() {
  const items = [
    "Notice when a verified price list is released",
    "Notice when an official floor-plan package is available",
    "Launch, registration and release timing updates",
    "Builder incentive or change notices, if published",
  ];
  return (
    <section className="bg-paper py-16 md:py-20">
      <div className="section-shell grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-display text-3xl md:text-4xl">
            Why register on this page
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink-soft">
            Official Windrose documents are not available to send today. The
            form is for useful updates, not a wall in front of the page. You
            keep reading everything below whether or not you register.
          </p>
          <ul className="mt-6 space-y-3">
            {items.map((item) => (
              <li key={item} className="flex gap-3 text-ink">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-soft">
            We will not claim instant access, VIP status or builder authorization.
            If a document cannot be delivered, we will not tell you that it was sent.
          </p>
        </div>
        <figure className="relative aspect-[4/3] overflow-hidden rounded-sm">
          <Image
            src="/images/conceptual-home-exterior.jpg"
            alt="Conceptual Ontario detached home at dusk. Not an official Windrose rendering."
            fill
            sizes="(max-width: 768px) 100vw, 36rem"
            className="object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-ink/70 px-4 py-2 text-xs text-cream">
            Conceptual imagery — not an official project rendering.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function HomeTypes() {
  return (
    <section id="homes" className="bg-cream py-16 md:py-20">
      <div className="section-shell">
        <h2 className="font-display text-3xl md:text-4xl">Home types</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-soft">
          Windrose-specific home types, sizes, bedrooms and parking are to be
          announced. Third-party pages that list towns, 36-foot or 42-foot
          detached homes, square footage or bedroom counts for Windrose are not
          used as authority here.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Towns",
              body: "The official Caledon Trails website describes towns as part of the broader community. Whether Windrose includes townhomes, and at what specification, is still to be announced.",
            },
            {
              title: "Semis",
              body: "Semi-detached homes are named in the official Caledon Trails product mix. That does not confirm a Windrose semi-detached release.",
            },
            {
              title: "Singles",
              body: "The official community website currently highlights a singles release on 30-, 36- and 42-foot lots. Those lot widths have not been confirmed as Windrose inventory.",
            },
          ].map((card) => (
            <article key={card.title} className="rounded-sm border border-sand bg-paper p-6">
              <h3 className="font-display text-2xl">{card.title}</h3>
              <p className="mt-3 leading-7 text-ink-soft">{card.body}</p>
              <p className="mt-5 text-sm font-medium text-forest">
                Specifications pending.{" "}
                <a className="underline underline-offset-2" href="#register">
                  Get Project Updates
                </a>
              </p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-soft">
          Broader-community source:{" "}
          <a className="underline underline-offset-2" href={sources.caledonTrails.href}>
            caledontrails.ca
          </a>
          . Last verified: {LAST_VERIFIED}.
        </p>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section className="bg-forest-deep py-16 text-cream md:py-20">
      <div className="section-shell max-w-4xl">
        <h2 className="font-display text-3xl text-paper md:text-4xl">
          Pricing details coming soon
        </h2>
        <p className="mt-5 text-lg leading-8">
          No official Windrose price list, deposit schedule or incentive sheet
          was published on the Caledon Trails, Laurier Homes or Yorkwood Homes
          websites as of {LAST_VERIFIED}. Starting prices shown on third-party
          portals are not repeated here.
        </p>
        <p className="mt-4 leading-8">
          Builder pricing and availability can change without notice. A purchase
          can be made only through the builders’ official documents and an
          Agreement of Purchase and Sale.
        </p>
        <a
          href="#register"
          className="mt-8 inline-flex min-h-12 items-center rounded-sm bg-paper px-6 font-semibold text-forest hover:bg-cream"
        >
          Get Project Updates
        </a>
      </div>
    </section>
  );
}

export function Location() {
  const mapSrc =
    "https://www.openstreetmap.org/export/embed.html?bbox=-79.90%2C43.73%2C-79.82%2C43.79&layer=mapnik&marker=43.761%2C-79.860";
  return (
    <section id="location" className="bg-paper py-16 md:py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl md:text-4xl">
            Location and lifestyle
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink-soft">
            Caledon Trails is presented at the intersection of Mayfield Drive
            and McLaughlin Road in the Town of Caledon. Mayfield Road is the
            municipal edge with Brampton, and the Town of Caledon’s Mayfield
            West secondary plan describes this part of Caledon as a growing
            mixed-use community with parks, school sites, trails and local
            services.
          </p>
          <p className="mt-4 leading-8 text-ink-soft">
            The official community website notes shops, restaurants and transit
            access, together with parks, trails and conservation lands. Named
            nearby destinations include the Cheltenham Badlands, Forks of the
            Credit Provincial Park and Belfountain Conservation Area. School
            boundaries and admission are not stated here; buyers should confirm
            current catchments with the relevant school boards.
          </p>
          <p className="mt-4 leading-8 text-ink-soft">
            Highway 410 is identified in Town of Caledon planning materials as
            the eastern reference for Mayfield West Phase 2 Stage 2. Travel
            times to GO stations, Pearson Airport or employment centres are not
            listed because they were not independently timed for this page.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-ink-soft">
            <li>
              Community location source:{" "}
              <a className="underline" href={sources.caledonTrails.href}>
                caledontrails.ca
              </a>
            </li>
            <li>
              Planning context:{" "}
              <a className="underline" href={sources.caledon.href}>
                Town of Caledon
              </a>
            </li>
            <li>
              Parks:{" "}
              <a className="underline" href={sources.forks.href}>
                Ontario Parks
              </a>
              ,{" "}
              <a className="underline" href={sources.belfountain.href}>
                Credit Valley Conservation
              </a>
              ,{" "}
              <a className="underline" href={sources.badlands.href}>
                Ontario Heritage Trust
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src="/images/caledon-nature-trail.jpg"
              alt="Conceptual southern Ontario forest trail. Not a photograph of the Windrose site."
              fill
              sizes="(max-width: 1024px) 100vw, 36rem"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-ink/70 px-4 py-2 text-xs text-cream">
              Conceptual landscape imagery — not the project site.
            </figcaption>
          </figure>
          <div className="overflow-hidden rounded-sm border border-sand">
            <iframe
              title="Map of Mayfield Drive and McLaughlin Road, Caledon"
              src={mapSrc}
              className="h-64 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <p className="bg-cream px-4 py-3 text-sm text-ink-soft">
              Approximate community intersection.{" "}
              <a
                className="underline"
                href="https://www.openstreetmap.org/?mlat=43.761&mlon=-79.860#map=14/43.761/-79.860"
              >
                Open a larger map
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Builders() {
  return (
    <section id="builders" className="bg-cream py-16 md:py-20">
      <div className="section-shell">
        <h2 className="font-display text-3xl md:text-4xl">The builders</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-soft">
          The official Caledon Trails website identifies a partnership of
          Laurier Homes and Yorkwood Homes. Profiles below use only those
          companies’ own published facts.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-sm border border-sand bg-paper p-7">
            <h3 className="font-display text-2xl">Laurier Homes</h3>
            <p className="mt-4 leading-7 text-ink-soft">
              Laurier Homes states that it has been building in Greater Toronto
              Area communities since 1976, including Oakville, Mississauga,
              Milton, Richmond Hill, Scarborough and Markham. The company
              describes a hands-on process that combines contemporary features
              with architectural detail and streetscape design, and notes a
              pattern of repeat purchasers.
            </p>
            <p className="mt-4 text-sm text-ink-soft">
              Source:{" "}
              <a className="underline" href={sources.laurier.href}>
                laurierhomes.com
              </a>{" "}
              and{" "}
              <a className="underline" href={sources.caledonTrails.href}>
                caledontrails.ca
              </a>
              .
            </p>
          </article>
          <article className="rounded-sm border border-sand bg-paper p-7">
            <h3 className="font-display text-2xl">Yorkwood Homes</h3>
            <p className="mt-4 leading-7 text-ink-soft">
              Yorkwood Homes describes itself as a family business founded by
              Joe Godfrey, who began building in Toronto in the early 1950s.
              The company says it has delivered more than 10,000 homes across
              three generations. The Caledon Trails website names Norman and
              Myer Godfrey as the current operators and lists Caledon Trails
              among Yorkwood’s upcoming communities.
            </p>
            <p className="mt-4 text-sm text-ink-soft">
              Source:{" "}
              <a className="underline" href={sources.yorkwood.href}>
                yorkwoodhomes.com
              </a>{" "}
              and{" "}
              <a className="underline" href={sources.yorkwoodCommunities.href}>
                Yorkwood communities
              </a>
              .
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export function BuyerSupport() {
  return (
    <section className="bg-paper py-16 md:py-20">
      <div className="section-shell max-w-4xl">
        <h2 className="font-display text-3xl md:text-4xl">
          Who may want to evaluate Windrose
        </h2>
        <p className="mt-5 text-lg leading-8 text-ink-soft">
          Buyers comparing new freehold homes in south Caledon, including
          households looking at townhomes or detached houses near Mayfield and
          McLaughlin, may want to follow this release. This is not personal
          financial, legal or investment advice.
        </p>
        <p className="mt-4 leading-8 text-ink-soft">
          Before purchasing, review the home type and specifications, deposit
          timing, closing costs, your commute, current school-board boundaries,
          and the Agreement of Purchase and Sale with independent legal advice.
          Confirm every commercial term in official builder documents rather
          than on this page or on third-party listing sites.
        </p>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="bg-cream py-16 md:py-20">
      <div className="section-shell max-w-4xl">
        <h2 className="font-display text-3xl md:text-4xl">
          Frequently asked questions
        </h2>
        <div className="mt-8 divide-y divide-sand border-y border-sand">
          {faqs.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="cursor-pointer list-none font-semibold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.question}
                  <span className="text-gold group-open:hidden" aria-hidden>
                    +
                  </span>
                  <span className="hidden text-gold group-open:inline" aria-hidden>
                    −
                  </span>
                </span>
              </summary>
              <p className="mt-3 leading-7 text-ink-soft">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="section-shell grid items-start gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl md:text-4xl">
            Register for verified Windrose updates
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink-soft">
            When official pricing, floor plans, incentives or launch details are
            released, we will email the people who asked to be notified. There
            is no fee and no obligation to purchase.
          </p>
          <p className="mt-4 text-sm leading-6 text-ink-soft">{disclaimer}</p>
        </div>
        <RegisterForm id="final-register-form" />
      </div>
    </section>
  );
}
