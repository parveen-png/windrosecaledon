"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  CONSENT_TEXT_VERSION,
  FORM_VERSION,
  PAGE_VERSION,
  SITE_URL,
  consentText,
} from "@/lib/site";
import {
  interestOptions,
  timingOptions,
  type FieldErrors,
} from "@/lib/validation";
import { track } from "@/components/Analytics";

type Status =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success" }
  | { type: "error"; message: string };

const empty = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  interestedIn: "",
  buyerTiming: "",
  consent: false,
  companyWebsite: "",
};

function readParam(params: URLSearchParams, key: string) {
  return params.get(key) ?? "";
}

export function RegisterForm({ id = "register-form" }: { id?: string }) {
  const headingId = useId();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [started, setStarted] = useState(false);

  const attribution = useMemo(() => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    return {
      pageUrl: window.location.href,
      pageVersion: PAGE_VERSION,
      referrer: document.referrer,
      utmSource: readParam(params, "utm_source"),
      utmMedium: readParam(params, "utm_medium"),
      utmCampaign: readParam(params, "utm_campaign"),
      utmTerm: readParam(params, "utm_term"),
      utmContent: readParam(params, "utm_content"),
      gclid: readParam(params, "gclid"),
      gbraid: readParam(params, "gbraid"),
      wbraid: readParam(params, "wbraid"),
      msclkid: readParam(params, "msclkid"),
      fbclid: readParam(params, "fbclid"),
      formVersion: FORM_VERSION,
      consentText,
      consentTextVersion: CONSENT_TEXT_VERSION,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }, []);

  useEffect(() => {
    if (status.type === "success") {
      const el = document.getElementById(`${id}-success`);
      el?.focus();
    }
  }, [status, id]);

  function markStart() {
    if (!started) {
      setStarted(true);
      track("form_start", { form_id: id, page_version: PAGE_VERSION });
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.type === "submitting") return;
    setStatus({ type: "submitting" });
    track("form_submit_attempt", { form_id: id, page_version: PAGE_VERSION });

    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      interestedIn: values.interestedIn,
      buyerTiming: values.buyerTiming,
      consent: values.consent,
      honeypot: values.companyWebsite,
      ...attribution,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        errors?: FieldErrors;
        message?: string;
      };

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
          const firstKey = Object.keys(data.errors)[0];
          track("form_field_error", {
            form_id: id,
            field_count: Object.keys(data.errors).length,
            first_field: firstKey,
          });
        }
        setStatus({
          type: "error",
          message:
            data.message ??
            "We could not send your registration. Please check the form and try again.",
        });
        return;
      }

      setErrors({});
      setStatus({ type: "success" });
      track("generate_lead", {
        form_id: id,
        page_version: PAGE_VERSION,
        method: "form",
      });
    } catch {
      setStatus({
        type: "error",
        message:
          "A network error stopped this registration. Please try again in a moment.",
      });
    }
  }

  if (status.type === "success") {
    return (
      <div
        id={`${id}-success`}
        tabIndex={-1}
        className="rounded-sm border border-sand bg-paper p-6 md:p-8"
        role="status"
      >
        <p className="font-display text-2xl text-ink">Registration received</p>
        <p className="mt-3 text-[1.05rem] leading-7 text-ink-soft">
          Thank you—your registration has been received. We’ll send verified
          Windrose at Caledon Trails updates as project information becomes
          available.
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      noValidate
      onSubmit={onSubmit}
      onFocus={markStart}
      aria-labelledby={headingId}
      className="rounded-sm border border-sand bg-paper p-5 shadow-[0_12px_40px_rgba(28,26,22,0.08)] md:p-7"
    >
      <p id={headingId} className="font-display text-2xl text-ink">
        Request verified updates
      </p>
      <p className="mt-2 text-sm leading-6 text-ink-soft">
        We will email launch, pricing, floor-plan and incentive notices when
        they are confirmed. Nothing is sent instantly.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field
          idPrefix={id}
          label="First name"
          name="firstName"
          autoComplete="given-name"
          required
          value={values.firstName}
          error={errors.firstName}
          onChange={(firstName) => setValues((v) => ({ ...v, firstName }))}
        />
        <Field
          idPrefix={id}
          label="Last name"
          name="lastName"
          autoComplete="family-name"
          required
          value={values.lastName}
          error={errors.lastName}
          onChange={(lastName) => setValues((v) => ({ ...v, lastName }))}
        />
      </div>

      <div className="mt-4">
        <Field
          idPrefix={id}
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={values.email}
          error={errors.email}
          onChange={(email) => setValues((v) => ({ ...v, email }))}
        />
      </div>

      <div className="mt-4">
        <Field
          idPrefix={id}
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={values.phone}
          error={errors.phone}
          hint="Optional. Include only if you would like a callback when details are confirmed."
          onChange={(phone) => setValues((v) => ({ ...v, phone }))}
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-semibold text-ink" htmlFor={`${id}-interest`}>
          Interested in
        </label>
        <p className="mt-1 text-sm text-ink-soft">
          Tell us which home type you want updates about: townhome, semi-detached
          or detached single.
        </p>
        <select
          id={`${id}-interest`}
          name="interestedIn"
          required
          value={values.interestedIn}
          aria-invalid={Boolean(errors.interestedIn)}
          aria-describedby={errors.interestedIn ? `${id}-interest-error` : undefined}
          className="mt-2 min-h-12 w-full rounded-sm border border-sand bg-cream px-3 text-base text-ink"
          onChange={(event) =>
            setValues((v) => ({ ...v, interestedIn: event.target.value }))
          }
        >
          <option value="">Select one</option>
          {interestOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.interestedIn ? (
          <p id={`${id}-interest-error`} className="mt-1 text-sm text-error" role="alert">
            {errors.interestedIn}
          </p>
        ) : null}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-semibold text-ink" htmlFor={`${id}-timing`}>
          Buyer timing
        </label>
        <select
          id={`${id}-timing`}
          name="buyerTiming"
          value={values.buyerTiming}
          className="mt-2 min-h-12 w-full rounded-sm border border-sand bg-cream px-3 text-base text-ink"
          onChange={(event) =>
            setValues((v) => ({ ...v, buyerTiming: event.target.value }))
          }
        >
          <option value="">Optional</option>
          {timingOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-company`}>Company website</label>
        <input
          id={`${id}-company`}
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite}
          onChange={(event) =>
            setValues((v) => ({ ...v, companyWebsite: event.target.value }))
          }
        />
      </div>

      <div className="mt-5 flex gap-3">
        <input
          id={`${id}-consent`}
          name="consent"
          type="checkbox"
          checked={values.consent}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={`${id}-consent-help${errors.consent ? ` ${id}-consent-error` : ""}`}
          className="mt-1 h-5 w-5 shrink-0 accent-forest"
          onChange={(event) =>
            setValues((v) => ({ ...v, consent: event.target.checked }))
          }
        />
        <label htmlFor={`${id}-consent`} className="text-sm leading-6 text-ink-soft">
          {consentText}{" "}
          <a className="text-forest underline underline-offset-2" href="/privacy-policy">
            Privacy policy
          </a>
          .
        </label>
      </div>
      <p id={`${id}-consent-help`} className="sr-only">
        Marketing consent is optional until checked. The box is unchecked by default.
      </p>
      {errors.consent ? (
        <p id={`${id}-consent-error`} className="mt-1 text-sm text-error" role="alert">
          {errors.consent}
        </p>
      ) : null}

      {status.type === "error" ? (
        <p className="mt-4 text-sm text-error" role="alert">
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status.type === "submitting"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-forest px-5 text-base font-semibold tracking-wide text-paper transition-colors hover:bg-forest-deep disabled:cursor-wait disabled:opacity-70"
      >
        {status.type === "submitting" ? "Sending registration…" : "Get Project Updates"}
      </button>
      <p className="mt-3 text-center text-sm text-ink-soft">
        Free project updates. No obligation.
      </p>
      <p className="mt-1 text-center text-xs leading-5 text-ink-soft">
        Independent information page. Not the builders’ website. Submissions stay
        with {SITE_URL.replace("https://", "")}.
      </p>
    </form>
  );
}

function Field({
  idPrefix,
  label,
  name,
  value,
  onChange,
  error,
  hint,
  required,
  type = "text",
  autoComplete,
  inputMode,
}: {
  idPrefix: string;
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const fieldId = `${idPrefix}-${name}`;
  const describedBy = [
    hint ? `${fieldId}-hint` : null,
    error ? `${fieldId}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <label className="block text-sm font-semibold text-ink" htmlFor={fieldId}>
        {label}
        {required ? (
          <span className="font-normal text-ink-soft"> (required)</span>
        ) : (
          <span className="font-normal text-ink-soft"> (optional)</span>
        )}
      </label>
      <input
        id={fieldId}
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined}
        className="mt-2 min-h-12 w-full rounded-sm border border-sand bg-cream px-3 text-base text-ink"
        onChange={(event) => onChange(event.target.value)}
      />
      {hint ? (
        <p id={`${fieldId}-hint`} className="mt-1 text-sm text-ink-soft">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${fieldId}-error`} className="mt-1 text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
