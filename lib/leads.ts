import { createHash, randomUUID } from "node:crypto";
import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import {
  CONSENT_TEXT_VERSION,
  FORM_VERSION,
  PAGE_VERSION,
  consentText,
} from "@/lib/site";
import type { LeadInput } from "@/lib/validation";
import { appendWindroseLeadToGoogleSheet } from "@/lib/google/sheets";

export type StoredLead = {
  id: string;
  submittedAt: string;
  pageVersion: string;
  formVersion: string;
  consentTextVersion: string;
  consentText: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isBroker: string;
  consent: true;
  pageUrl: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  gbraid: string;
  wbraid: string;
  msclkid: string;
  fbclid: string;
  timezone: string;
  ipHash: string;
};

function value(input?: string) {
  return input?.trim() ?? "";
}

export function toStoredLead(input: LeadInput, ip: string): StoredLead {
  return {
    id: randomUUID(),
    submittedAt: new Date().toISOString(),
    pageVersion: value(input.pageVersion) || PAGE_VERSION,
    formVersion: value(input.formVersion) || FORM_VERSION,
    consentTextVersion: value(input.consentTextVersion) || CONSENT_TEXT_VERSION,
    consentText: value(input.consentText) || consentText,
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email.toLowerCase(),
    phone: input.phone,
    isBroker: input.isBroker,
    consent: true,
    pageUrl: value(input.pageUrl),
    referrer: value(input.referrer),
    utmSource: value(input.utmSource),
    utmMedium: value(input.utmMedium),
    utmCampaign: value(input.utmCampaign),
    utmTerm: value(input.utmTerm),
    utmContent: value(input.utmContent),
    gclid: value(input.gclid),
    gbraid: value(input.gbraid),
    wbraid: value(input.wbraid),
    msclkid: value(input.msclkid),
    fbclid: value(input.fbclid),
    timezone: value(input.timezone),
    ipHash: createHash("sha256").update(ip).digest("hex").slice(0, 16),
  };
}

export async function persistLead(lead: StoredLead) {
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(
    path.join(dir, "leads.jsonl"),
    `${JSON.stringify(lead)}\n`,
    "utf8",
  );
}

export async function deliverLead(lead: StoredLead): Promise<{
  captured: true;
  routed: boolean;
  routingError?: string;
}> {
  try {
    await persistLead(lead);
  } catch (error) {
    console.warn("Local lead persist failed", error);
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  const errors: string[] = [];
  let sheetsOk = false;

  if (process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
    const sheetsResult = await appendWindroseLeadToGoogleSheet(lead);
    if (!sheetsResult.ok) {
      errors.push(sheetsResult.error);
    } else {
      sheetsOk = true;
    }
  }

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.LEAD_WEBHOOK_SECRET
            ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` }
            : {}),
        },
        body: JSON.stringify(lead),
      });
      if (!response.ok) {
        errors.push(`Webhook responded ${response.status}`);
      }
    } catch {
      errors.push("Webhook request failed");
    }
  }

  const emailError = await sendLeadEmails(lead);
  if (emailError) errors.push(emailError);

  if (errors.length > 0) {
    try {
      await appendFile(
        path.join(process.cwd(), "data", "lead-failures.jsonl"),
        `${JSON.stringify({ id: lead.id, at: new Date().toISOString(), errors })}\n`,
        "utf8",
      );
    } catch (error) {
      console.warn("Lead failure log write failed", error);
    }
  }

  const routed =
    sheetsOk ||
    (errors.length === 0 && Boolean(webhook || process.env.RESEND_API_KEY));

  return {
    captured: true,
    routed,
    routingError: errors[0],
  };
}

async function sendLeadEmails(lead: StoredLead): Promise<string | undefined> {
  const apiKey = process.env.RESEND_API_KEY;
  const notify = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!apiKey || !notify || !from) return undefined;

  const acknowledgement = {
    from,
    to: [lead.email],
    subject: "Your Windrose at Caledon Trails registration",
    text: acknowledgementCopy(lead),
  };
  const internal = {
    from,
    to: [notify],
    subject: `New Windrose lead: ${lead.firstName} ${lead.lastName}`,
    text: internalCopy(lead),
  };

  try {
    const [ackRes, intRes] = await Promise.all([
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(acknowledgement),
      }),
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(internal),
      }),
    ]);
    if (!ackRes.ok || !intRes.ok) {
      return `Email provider responded ${ackRes.status}/${intRes.status}`;
    }
  } catch {
    return "Email delivery failed";
  }
}

export function acknowledgementCopy(lead: StoredLead) {
  return [
    `Hello ${lead.firstName},`,
    "",
    "Thank you—your registration has been received. We’ll send verified Windrose at Caledon Trails updates as project information becomes available.",
    "",
    "This independent website is not the official builder site. Updates will reflect confirmed pricing, floor-plan, incentive and launch information when official documents are released.",
    "",
    "If you no longer wish to receive these messages, reply with “unsubscribe” or use the unsubscribe link in future emails.",
    "",
    "Windrose at Caledon Trails",
    "https://www.windrosecaledontrails.ca/",
  ].join("\n");
}

export function internalCopy(lead: StoredLead) {
  return [
    "A new registration was captured on windrosecaledontrails.ca.",
    "",
    `Name: ${lead.firstName} ${lead.lastName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Broker: ${lead.isBroker}`,
    `Consent: yes (${lead.consentTextVersion}) at ${lead.submittedAt}`,
    `Timezone: ${lead.timezone || "Unknown"}`,
    `Page: ${lead.pageUrl || "https://www.windrosecaledontrails.ca/"}`,
    `Referrer: ${lead.referrer || "Direct"}`,
    `UTM: ${lead.utmSource || "-"} / ${lead.utmMedium || "-"} / ${lead.utmCampaign || "-"}`,
    `Click IDs: gclid=${lead.gclid || "-"} fbclid=${lead.fbclid || "-"}`,
    `Lead ID: ${lead.id}`,
    `Page version: ${lead.pageVersion}`,
    `Form version: ${lead.formVersion}`,
  ].join("\n");
}
