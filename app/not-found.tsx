import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl">Page not found</h1>
        <p className="mt-4 text-ink-soft">
          That address is not part of the Windrose at Caledon Trails information
          page.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-sm bg-forest px-5 font-semibold text-paper"
        >
          Back to the project page
        </Link>
      </div>
    </main>
  );
}
