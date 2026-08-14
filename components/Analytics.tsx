"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";

type ConsentState = {
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "windrose-consent-v1";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    __windroseConsent?: ConsentState;
  }
}

export function track(
  event: string,
  params: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === "undefined") return;
  const payload = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  );
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
  if (typeof window.gtag === "function" && window.__windroseConsent?.analytics) {
    window.gtag("event", event, payload);
  }
}

function loadGtag(id: string) {
  if (document.getElementById("ga4-src")) return;
  const script = document.createElement("script");
  script.id = "ga4-src";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args as unknown as Record<string, unknown>);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, { anonymize_ip: true });
}

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;

  useEffect(() => {
    window.dataLayer = window.dataLayer ?? [];
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as ConsentState;
      window.__windroseConsent = parsed;
      if (parsed.analytics && gaId) loadGtag(gaId);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [gaId]);

  return null;
}

export function ConsentBanner() {
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;
  const needsConsent = useSyncExternalStore(
    () => () => {},
    () => Boolean(gaId && !window.localStorage.getItem(STORAGE_KEY)),
    () => false,
  );
  const [dismissed, setDismissed] = useState(false);

  if (!gaId || !needsConsent || dismissed) return null;

  function save(next: ConsentState) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.__windroseConsent = next;
    if (next.analytics && gaId) loadGtag(gaId);
    setDismissed(true);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie and analytics consent"
      className="fixed inset-x-0 bottom-20 z-40 mx-auto w-[min(40rem,calc(100%-1.5rem))] rounded-sm border border-sand bg-paper p-4 shadow-[0_10px_40px_rgba(28,26,22,0.16)] md:bottom-6"
    >
      <p className="text-sm leading-6 text-ink">
        We use optional analytics only after you agree. Registration data is never
        sent to analytics. See the{" "}
        <Link className="underline underline-offset-2" href="/privacy-policy">
          privacy policy
        </Link>
        .
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="min-h-11 rounded-sm bg-forest px-4 text-sm font-semibold text-paper"
          onClick={() => save({ analytics: true, marketing: false })}
        >
          Accept analytics
        </button>
        <button
          type="button"
          className="min-h-11 rounded-sm border border-sand px-4 text-sm font-semibold text-ink"
          onClick={() => save({ analytics: false, marketing: false })}
        >
          Necessary only
        </button>
      </div>
    </div>
  );
}
