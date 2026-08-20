import { disclaimer } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink pb-[max(6.5rem,calc(5.5rem+env(safe-area-inset-bottom)))] text-cream md:pb-10">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-2 md:gap-12 md:py-16 lg:py-20">
        <div>
          <p className="font-display text-3xl font-light text-paper">
            Windrose at Caledon Trails
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-sand/80">
            Independent project information and registration. Not the official
            website of Laurier Homes, Yorkwood Homes or Caledon Trails.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-medium tracking-widest text-paper uppercase">
            Site Links
          </h2>
          <ul className="mt-6 space-y-3 text-sm tracking-wide text-sand/80">
            <li>
              <a className="transition-colors hover:text-white" href="/privacy-policy">
                Privacy policy
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-white" href="/terms">
                Terms and disclaimer
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-white" href="/#faq">
                FAQ
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-white" href="/#register">
                Register
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="section-shell border-t border-white/10 py-8 text-xs leading-relaxed tracking-wide text-sand/60">
        <p>{disclaimer}</p>
        <p className="mt-6">© {year} Windrose at Caledon Trails.</p>
      </div>
    </footer>
  );
}
