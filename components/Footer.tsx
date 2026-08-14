import { disclaimer } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-sand bg-ink pb-24 text-cream md:pb-10">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-2">
        <div>
          <p className="font-display text-2xl text-paper">
            Windrose at Caledon Trails
          </p>
          <p className="mt-3 max-w-md text-sm leading-6 text-sand">
            Independent project information and registration. Not the official
            website of Laurier Homes, Yorkwood Homes or Caledon Trails.
          </p>
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
        <p className="mt-4">© {year} Windrose at Caledon Trails.</p>
      </div>
    </footer>
  );
}
