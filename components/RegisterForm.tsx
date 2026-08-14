"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  CONSENT_TEXT_VERSION,
  FORM_VERSION,
  PAGE_VERSION,
  consentText,
} from "@/lib/site";
import { brokerOptions, type FieldErrors } from "@/lib/validation";
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
  isBroker: "",
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
      isBroker: values.isBroker,
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
        className="rounded-sm border border-sand bg-paper p-5"
        role="status"
      >
        <p className="font-display text-xl text-ink">Registration received</p>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
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
      className="rounded-sm border border-sand bg-paper p-4 shadow-[0_12px_40px_rgba(28,26,22,0.08)]"
    >
      <p id={headingId} className="font-display text-xl text-ink">
        Get Project Updates
      </p>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
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
        <Field
          idPrefix={id}
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          required
          value={values.phone}
          error={errors.phone}
          onChange={(phone) => setValues((v) => ({ ...v, phone }))}
        />
      </div>

      <fieldset className="mt-3">
        <legend className="text-sm font-semibold text-ink">
          Are you a broker?
        </legend>
        <div className="mt-2 flex gap-4">
          {brokerOptions.map((option) => (
            <label key={option} className="flex min-h-10 items-center gap-2 text-sm text-ink">
              <input
                type="radio"
                name={`${id}-isBroker`}
                value={option}
                checked={values.isBroker === option}
                className="h-4 w-4 accent-forest"
                onChange={() => setValues((v) => ({ ...v, isBroker: option }))}
              />
              {option}
            </label>
          ))}
        </div>
        {errors.isBroker ? (
          <p className="mt-1 text-sm text-error" role="alert">
            {errors.isBroker}
          </p>
        ) : null}
      </fieldset>

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

      <div className="mt-3 flex gap-2">
        <input
          id={`${id}-consent`}
          name="consent"
          type="checkbox"
          checked={values.consent}
          aria-invalid={Boolean(errors.consent)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-forest"
          onChange={(event) =>
            setValues((v) => ({ ...v, consent: event.target.checked }))
          }
        />
        <label htmlFor={`${id}-consent`} className="text-xs leading-5 text-ink-soft">
          {consentText}{" "}
          <a className="text-forest underline underline-offset-2" href="/privacy-policy">
            Privacy policy
          </a>
          .
        </label>
      </div>
      {errors.consent ? (
        <p className="mt-1 text-sm text-error" role="alert">
          {errors.consent}
        </p>
      ) : null}

      {status.type === "error" ? (
        <p className="mt-2 text-sm text-error" role="alert">
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status.type === "submitting"}
        className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-forest px-5 text-sm font-semibold tracking-wide text-paper transition-colors hover:bg-forest-deep disabled:cursor-wait disabled:opacity-70"
      >
        {status.type === "submitting" ? "Sending…" : "Get Project Updates"}
      </button>
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
  required?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const fieldId = `${idPrefix}-${name}`;

  return (
    <div>
      <label className="block text-sm font-semibold text-ink" htmlFor={fieldId}>
        {label}
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
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className="mt-1 min-h-10 w-full rounded-sm border border-sand bg-cream px-3 text-base text-ink"
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p id={`${fieldId}-error`} className="mt-1 text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
