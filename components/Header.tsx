"use client";

import { useEffect, useState } from "react";
import { CTA_LABEL, nav } from "@/lib/site";
import { track } from "@/components/Analytics";
import { SiteLogo } from "@/components/SiteLogo";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-sand bg-white">
      <div className="section-shell flex min-h-[5.25rem] items-center justify-between gap-4 py-2">
        <a href="#top" className="flex shrink-0 items-center" aria-label="Windrose at Caledon Trails">
          <SiteLogo />
        </a>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Page">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#register"
            className="inline-flex min-h-11 items-center rounded-sm bg-forest px-4 text-sm font-semibold text-paper hover:bg-forest-deep"
            onClick={() => track("hero_cta_click", { location: "header" })}
          >
            {CTA_LABEL}
          </a>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-sand lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="block h-0.5 w-5 bg-ink" />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-sand bg-white px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="min-h-11 py-2 text-base text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sand bg-cream/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <a
        href="#register"
        className="flex min-h-12 items-center justify-center rounded-sm bg-forest text-sm font-semibold text-paper"
        onClick={() => track("hero_cta_click", { location: "mobile_sticky" })}
      >
        {CTA_LABEL}
      </a>
    </div>
  );
}
