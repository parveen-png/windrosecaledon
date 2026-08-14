import { z } from "zod";

export const brokerOptions = ["Yes", "No"] as const;

const phone = z
  .string()
  .trim()
  .transform((value) => value.replace(/[^\d+()\-\s.]/g, ""))
  .refine(
    (value) => value.replace(/\D/g, "").length >= 10,
    "Enter a 10-digit phone number, including area code.",
  );

export const leadSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Enter your first name.")
    .max(80, "First name is too long."),
  lastName: z
    .string()
    .trim()
    .min(1, "Enter your last name.")
    .max(80, "Last name is too long."),
  email: z
    .email("Enter a valid email address.")
    .max(254, "Email address is too long."),
  phone,
  isBroker: z.enum(brokerOptions, {
    error: "Please choose yes or no.",
  }),
  consent: z.literal(true, {
    error: "Please confirm consent to receive project updates.",
  }),
  honeypot: z.string().max(0).optional().or(z.literal("")),
  pageUrl: z.string().max(500).optional(),
  pageVersion: z.string().max(40).optional(),
  referrer: z.string().max(500).optional(),
  utmSource: z.string().max(120).optional(),
  utmMedium: z.string().max(120).optional(),
  utmCampaign: z.string().max(120).optional(),
  utmTerm: z.string().max(120).optional(),
  utmContent: z.string().max(120).optional(),
  gclid: z.string().max(200).optional(),
  gbraid: z.string().max(200).optional(),
  wbraid: z.string().max(200).optional(),
  msclkid: z.string().max(200).optional(),
  fbclid: z.string().max(200).optional(),
  formVersion: z.string().max(40).optional(),
  consentText: z.string().max(1000).optional(),
  consentTextVersion: z.string().max(40).optional(),
  timezone: z.string().max(80).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type FieldErrors = Partial<Record<keyof LeadInput, string>>;

export function fieldErrorsFromZod(error: z.ZodError): FieldErrors {
  const next: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !next[key as keyof LeadInput]) {
      next[key as keyof LeadInput] = issue.message;
    }
  }
  return next;
}
