import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { deliverLead, toStoredLead } from "@/lib/leads";
import { fieldErrorsFromZod, leadSchema } from "@/lib/validation";

export const runtime = "nodejs";

function originAllowed(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const allowed = [
    SITE_URL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    process.env.NEXT_PUBLIC_SITE_URL,
  ].filter(Boolean) as string[];
  return allowed.some((item) => origin === item);
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
    await deliverLead(lead);
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
