import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { deliverLead, toStoredLead } from "@/lib/leads";
import { fieldErrorsFromZod, leadSchema } from "@/lib/validation";

export const runtime = "nodejs";

function hostFromUrl(value: string) {
  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    return url.host;
  } catch {
    return "";
  }
}

function originAllowed(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const originHost = hostFromUrl(origin);
  if (!originHost) return false;

  const requestHost =
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    request.headers.get("host") ||
    "";

  if (requestHost && originHost === requestHost) return true;

  const allowedHosts = new Set<string>();
  for (const value of [
    SITE_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ]) {
    if (!value) continue;
    const host = hostFromUrl(value);
    if (!host) continue;
    allowedHosts.add(host);
    if (host.startsWith("www.")) allowedHosts.add(host.slice(4));
    else allowedHosts.add(`www.${host}`);
  }

  if (originHost.endsWith(".vercel.app") && originHost.includes("windrose")) {
    return true;
  }

  return allowedHosts.has(originHost);
}

export async function POST(request: Request) {
  if (!originAllowed(request)) {
    return NextResponse.json(
      { ok: false, message: "This registration could not be verified." },
      { status: 403 },
    );
  }

  const key = clientKey(request);
  const limit = rateLimit(key);
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Too many registration attempts. Please wait a few minutes and try again.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSec) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "The form could not be read. Please try again." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { ok: false, message: "The form could not be read. Please try again." },
      { status: 400 },
    );
  }

  const record = body as Record<string, unknown>;
  if (typeof record.honeypot === "string" && record.honeypot.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = leadSchema.safeParse(record);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        errors: fieldErrorsFromZod(parsed.error),
        message: "Please correct the highlighted fields.",
      },
      { status: 400 },
    );
  }

  try {
    const lead = toStoredLead(parsed.data, key);
    const result = await deliverLead(lead);
    if (process.env.GOOGLE_SHEETS_SPREADSHEET_ID && !result.routed) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Your registration could not be saved. Please try again or email the site publisher.",
        },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, id: lead.id });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Your registration could not be saved. Please try again or email the site publisher.",
      },
      { status: 500 },
    );
  }
}
