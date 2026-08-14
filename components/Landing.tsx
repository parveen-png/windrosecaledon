import Image from "next/image";
import { RegisterForm } from "@/components/RegisterForm";
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
    <section
      className="relative isolate flex min-h-[36rem] items-center overflow-hidden md:min-h-[42rem] lg:min-h-[min(48rem,calc(100dvh-5.5rem))]"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-windrose-streetscape.jpg"
          alt="Artist’s concept of freehold homes at Windrose at Caledon Trails in Caledon."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_bottom]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,16,24,0.72)_0%,rgba(10,16,24,0.42)_48%,rgba(10,16,24,0.18)_100%)]" />
      </div>
      <div className="section-shell grid w-full items-center gap-10 py-16 md:grid-cols-[minmax(0,1fr)_minmax(22rem,26rem)] md:py-20 lg:gap-16">
        <div className="text-paper">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-sand">
            Freehold Towns, Semis &amp; Singles
          </p>
          <h1
            id="hero-heading"
            className="mt-4 font-display text-5xl font-light leading-[1.1] md:text-[4rem]"
          >
            Windrose at Caledon Trails
          </h1>
          <p className="mt-6 font-display text-2xl font-light tracking-tight text-cream md:text-3xl">
            Starting from the high $600s*
          </p>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream md:text-xl">
            New freehold homes at Mayfield Drive and McLaughlin Road, Caledon.
          </p>
          <p className="mt-8 max-w-lg text-xs leading-relaxed text-sand/80">
            *Prices are subject to change without notice. Artist’s concept.
            Independent informational website — not the official website of the
            builders or the project.
          </p>
        </div>
        <div id="register" className="scroll-mt-32">
          <div className="bg-white p-6 shadow-2xl shadow-black/10 md:p-10">
            <RegisterForm id="hero-register-form" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function DirectAnswer() {
  return (
    <section id="overview" className="bg-paper py-24 md:py-32">
      <div className="section-shell max-w-4xl text-center">
        <h2 className="font-display text-4xl font-light md:text-5xl">
          What is Windrose at Caledon Trails?
        </h2>
        <p id="direct-answer" className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-ink-soft md:text-2xl">
          {introAnswer}
        </p>
        <p className="mt-8 text-sm tracking-wide text-ink-soft">
          Source:{" "}
          <a className="text-forest underline underline-offset-4 hover:text-forest-deep" href={sources.caledonTrails.href}>
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
    <section className="bg-cream py-24 md:py-32">
      <div className="section-shell max-w-4xl">
        <h2 className="font-display text-4xl font-light md:text-5xl">Verified project snapshot</h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Snapshot facts below reflect campaign information for Windrose together
          with sourced community and builder details. Prices and specifications
          can change without notice.
        </p>
        <div id="project-snapshot" className="mt-12 overflow-hidden bg-white px-6 py-8 shadow-2xl shadow-ink/5 md:px-12 md:py-10">
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
        <p className="mt-6 text-sm tracking-wide text-ink-soft">
          Last verified: {LAST_VERIFIED}. Primary source:{" "}
          <a className="text-forest underline underline-offset-4 hover:text-forest-deep" href={sources.caledonTrails.href}>
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
    <section className="bg-paper py-24 md:py-32">
      <div className="section-shell grid gap-16 md:grid-cols-2 lg:gap-20 md:items-center">
        <div>
          <h2 className="font-display text-4xl font-light md:text-5xl">
            Why register on this page
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-ink-soft">
            Official Windrose documents are not available to send today. The
            form is for useful updates, not a wall in front of the page. You
            keep reading everything below whether or not you register.
          </p>
          <ul className="mt-8 space-y-4">
            {items.map((item) => (
              <li key={item} className="flex gap-4 text-ink">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm tracking-wide text-ink-soft">
            We will not claim instant access, VIP status or builder authorization.
            If a document cannot be delivered, we will not tell you that it was sent.
          </p>
        </div>
        <figure className="relative aspect-[4/3] overflow-hidden bg-cream shadow-2xl shadow-ink/10">
          <Image
            src="/images/hero-windrose-streetscape.jpg"
            alt="Artist’s concept of homes at Windrose at Caledon Trails."
            fill
            sizes="(max-width: 768px) 100vw, 36rem"
            className="object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-ink/80 px-6 py-3 text-xs tracking-wide text-cream backdrop-blur-sm">
            Artist’s concept. Homes may not be exactly as shown.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function HomeTypes() {
  return (
    <section id="homes" className="bg-cream py-24 md:py-32">
      <div className="section-shell">
        <h2 className="text-center font-display text-4xl font-light md:text-5xl">
          Freehold towns, semis and singles
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-ink-soft">
          Windrose is presented as a mix of freehold townhomes, semi-detached
          homes and detached singles in Caledon. Floor-plan names, sizes,
          bedrooms and parking are still to be announced in official builder
          documents.
        </p>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Towns",
              body: "Freehold townhomes for buyers who want a Caledon address with a more compact footprint. Detailed layouts and specifications are pending.",
            },
            {
              title: "Semis",
              body: "Semi-detached homes intended for households looking for more width and outdoor space than a townhome, without a fully detached lot.",
            },
            {
              title: "Singles",
              body: "Detached singles for buyers comparing a full freehold house in the Caledon Trails community. Lot widths and elevations are to be announced.",
            },
          ].map((card) => (
            <article key={card.title} className="bg-white p-8 shadow-xl shadow-ink/5 md:p-10">
              <h3 className="font-display text-3xl font-light">{card.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-soft">{card.body}</p>
              <p className="mt-8 text-sm font-medium tracking-wide text-forest">
                Request plans when released.{" "}
                <a className="underline underline-offset-4 hover:text-forest-deep" href="#register">
                  Get Project Updates
                </a>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section className="bg-forest-deep py-24 text-cream md:py-32">
      <div className="section-shell max-w-4xl text-center">
        <h2 className="font-display text-4xl font-light text-paper md:text-5xl">
          Windrose pricing and incentives
        </h2>
        <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed md:text-2xl">
          Homes are presented from the high $600s. That starting range can change
          without notice and is not a guaranteed purchase price. A current price
          list, deposit schedule and incentive sheet should be confirmed in
          official builder documents.
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/80">
          Builder pricing and availability can change without notice. A purchase
          can be made only through the builders’ official documents and an
          Agreement of Purchase and Sale.
        </p>
        <a
          href="#register"
          className="mt-12 inline-flex min-h-14 items-center justify-center bg-paper px-10 text-sm font-medium tracking-widest uppercase text-forest transition-colors hover:bg-cream"
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
    <section id="location" className="bg-paper py-24 md:py-32">
      <div className="section-shell grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="font-display text-4xl font-light md:text-5xl">
            Location and lifestyle
          </h2>
          <div className="prose-calm mt-8 space-y-6 text-lg leading-relaxed">
            <p>
              Caledon Trails is presented at the intersection of Mayfield Drive
              and McLaughlin Road in the Town of Caledon. Mayfield Road is the
              municipal edge with Brampton, and the Town of Caledon’s Mayfield
              West secondary plan describes this part of Caledon as a growing
              mixed-use community with parks, school sites, trails and local
              services.
            </p>
            <p>
              The official community website notes shops, restaurants and transit
              access, together with parks, trails and conservation lands. Named
              nearby destinations include the Cheltenham Badlands, Forks of the
              Credit Provincial Park and Belfountain Conservation Area. School
              boundaries and admission are not stated here; buyers should confirm
              current catchments with the relevant school boards.
            </p>
            <p>
              Highway 410 is identified in Town of Caledon planning materials as
              the eastern reference for Mayfield West Phase 2 Stage 2. Travel
              times to GO stations, Pearson Airport or employment centres are not
              listed because they were not independently timed for this page.
            </p>
          </div>
          <ul className="mt-8 space-y-3 text-sm tracking-wide text-ink-soft">
            <li>
              Community location source:{" "}
              <a className="text-forest underline underline-offset-4 hover:text-forest-deep" href={sources.caledonTrails.href}>
                caledontrails.ca
              </a>
            </li>
            <li>
              Planning context:{" "}
              <a className="text-forest underline underline-offset-4 hover:text-forest-deep" href={sources.caledon.href}>
                Town of Caledon
              </a>
            </li>
            <li>
              Parks:{" "}
              <a className="text-forest underline underline-offset-4 hover:text-forest-deep" href={sources.forks.href}>
                Ontario Parks
              </a>
              ,{" "}
              <a className="text-forest underline underline-offset-4 hover:text-forest-deep" href={sources.belfountain.href}>
                Credit Valley Conservation
              </a>
              ,{" "}
              <a className="text-forest underline underline-offset-4 hover:text-forest-deep" href={sources.badlands.href}>
                Ontario Heritage Trust
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-6">
          <figure className="relative aspect-[4/3] overflow-hidden bg-cream shadow-2xl shadow-ink/10">
            <Image
              src="/images/caledon-nature-trail.jpg"
              alt="Conceptual southern Ontario forest trail. Not a photograph of the Windrose site."
              fill
              sizes="(max-width: 1024px) 100vw, 36rem"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-ink/80 px-6 py-3 text-xs tracking-wide text-cream backdrop-blur-sm">
              Conceptual landscape imagery — not the project site.
            </figcaption>
          </figure>
          <div className="overflow-hidden bg-white shadow-xl shadow-ink/5">
            <iframe
              title="Map of Mayfield Drive and McLaughlin Road, Caledon"
              src={mapSrc}
              className="h-[20rem] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <p className="bg-cream px-6 py-4 text-sm tracking-wide text-ink-soft">
              Approximate community intersection.{" "}
              <a
                className="text-forest underline underline-offset-4 hover:text-forest-deep"
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
