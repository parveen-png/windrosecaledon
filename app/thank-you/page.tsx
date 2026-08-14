import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration received",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <main id="main" className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="max-w-lg rounded-sm border border-sand bg-paper p-8">
        <h1 className="font-display text-3xl">Registration received</h1>
        <p className="mt-4 leading-7 text-ink-soft">
          Thank you—your registration has been received. We’ll send verified
          Windrose at Caledon Trails updates as project information becomes
          available.
        </p>
        <Link className="mt-6 inline-flex min-h-12 items-center text-forest underline underline-offset-2" href="/">
          Return to the project page
        </Link>
      </div>
    </main>
  );
}
