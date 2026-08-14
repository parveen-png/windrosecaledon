# Windrose at Caledon Trails

Independent Next.js landing page for **Windrose at Caledon Trails** at `https://windrosecaledontrails.ca/`.

This is not the official builder website. Official Caledon Trails facts come from [caledontrails.ca](https://caledontrails.ca/). Windrose-specific prices, floor plans, deposits, incentives, launch dates and occupancy are marked **to be announced** until official documents exist.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Launch blockers

Do not advertise this site until these are replaced with real values in `.env.local`:

- `NEXT_PUBLIC_LEGAL_PUBLISHER`
- `NEXT_PUBLIC_REGISTRANT_NAME` (if an Ontario registrant is advertising)
- `NEXT_PUBLIC_PUBLIC_PHONE` and/or `NEXT_PUBLIC_PUBLIC_EMAIL`
- `NEXT_PUBLIC_BUSINESS_ADDRESS`
- A lead destination: `LEAD_WEBHOOK_URL` and/or `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` + `LEAD_FROM_EMAIL`

Have compliance and Canadian legal/privacy counsel review copy, consent language and the independent-site disclaimer before launch.

## Lead routing

Registrations POST to `/api/leads`. Valid leads are:

1. Appended to `data/leads.jsonl`
2. Posted to `LEAD_WEBHOOK_URL` when set
3. Emailed via Resend when `RESEND_API_KEY` is set

The visitor is told the registration was received only after the server saves the lead. Analytics `generate_lead` fires only after that success response. Personal information is never sent to analytics.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS
- Server-rendered copy for SEO/AEO
- JSON-LD, sitemap, robots, Open Graph
- Accessible registration form with honeypot and rate limiting

## Search Console

After DNS is live, verify:

- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
