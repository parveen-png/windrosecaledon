"use client";

import { track } from "@/components/Analytics";

export function ContactLink({
  type,
  value,
  children,
}: {
  type: "phone" | "email";
  value: string;
  children: React.ReactNode;
}) {
  const href = type === "phone" ? `tel:${value.replace(/[^\d+]/g, "")}` : `mailto:${value}`;
  return (
    <a
      href={href}
      className="underline underline-offset-2"
      onClick={() =>
        track(type === "phone" ? "phone_click" : "email_click", { location: "footer" })
      }
    >
      {children}
    </a>
  );
}
