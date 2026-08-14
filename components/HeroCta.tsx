"use client";

import { CTA_LABEL } from "@/lib/site";
import { track } from "@/components/Analytics";

export function HeroCta() {
  return (
    <a
      href="#register"
      className="inline-flex min-h-12 items-center rounded-sm bg-paper px-6 font-semibold text-forest hover:bg-cream"
      onClick={() => track("hero_cta_click", { location: "hero" })}
    >
      {CTA_LABEL}
    </a>
  );
}
