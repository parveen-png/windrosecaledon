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
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md shadow-ink/5">
      <div className="section-shell flex min-h-16 items-center justify-between gap-3 py-2 md:min-h-24">
        <a
          href="/#top"
          className="flex min-w-0 shrink items-center"
          aria-label="Windrose at Caledon Trails"
        >
          <SiteLogo />
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Page">
          {nav.map((item) => (
            <a
              key={item.href}
              href={`/${item.href}`}
              className="text-sm tracking-wide text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <a
            href="/#register"
            className="hidden min-h-11 items-center bg-forest px-4 text-xs font-medium tracking-[0.14em] uppercase text-paper transition-colors hover:bg-forest-deep sm:inline-flex md:min-h-12 md:px-6"
            onClick={() => track("hero_cta_click", { location: "header" })}
          >
            {CTA_LABEL}
          </a>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-sand lg:hidden"
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
          className="border-t border-sand bg-white px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={`/${item.href}`}
                className="flex min-h-12 items-center text-base text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/#register"
              className="mt-2 flex min-h-12 items-center justify-center bg-forest text-sm font-medium tracking-[0.14em] uppercase text-paper sm:hidden"
              onClick={() => {
                setOpen(false);
                track("hero_cta_click", { location: "mobile_nav" });
              }}
            >
              {CTA_LABEL}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export function MobileStickyCta() {
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const targets = [
      document.getElementById("register"),
      document.getElementById("final-register-form"),
    ].filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        setFormInView(visible.size > 0);
      },
      { threshold: 0.15, rootMargin: "-72px 0px 0px 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-sand bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-200 md:hidden ${
        formInView ? "pointer-events-none translate-y-full" : ""
      }`}
    >
      <a
        href="/#register"
        className="flex min-h-12 items-center justify-center bg-forest text-sm font-medium tracking-[0.14em] uppercase text-paper transition-colors hover:bg-forest-deep"
        onClick={() => track("hero_cta_click", { location: "mobile_sticky" })}
      >
        {CTA_LABEL}
      </a>
    </div>
  );
}
