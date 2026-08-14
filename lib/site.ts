export const SITE_URL = "https://windrosecaledontrails.ca";
export const PAGE_VERSION = "2026-08-14.1";
export const FORM_VERSION = "1.0.0";
export const CONSENT_TEXT_VERSION = "1.0.0";
export const LAST_VERIFIED = "14 August 2026";
export const CTA_LABEL = "Get Project Updates";
export const PROJECT_NAME = "Windrose at Caledon Trails";

export const publisher = {
  legalName:
    process.env.NEXT_PUBLIC_LEGAL_PUBLISHER ?? "[LEGAL PUBLISHER NAME]",
  registrant:
    process.env.NEXT_PUBLIC_REGISTRANT_NAME ??
    "[REGISTRANT NAME AND PERMITTED TITLE]",
  phone: process.env.NEXT_PUBLIC_PUBLIC_PHONE ?? "",
  email: process.env.NEXT_PUBLIC_PUBLIC_EMAIL ?? "",
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ?? "[BUSINESS ADDRESS]",
};

export const hasRealPhone = Boolean(
  publisher.phone && !publisher.phone.includes("["),
);
export const hasRealEmail = Boolean(
  publisher.email && !publisher.email.includes("[") && publisher.email.includes("@"),
);
export const legalIdentityComplete = Boolean(
  process.env.NEXT_PUBLIC_LEGAL_PUBLISHER &&
    !process.env.NEXT_PUBLIC_LEGAL_PUBLISHER.includes("["),
);

export const consentText =
  "I consent to receive electronic messages about Windrose at Caledon Trails, including verified pricing, floor-plan, incentive and launch updates, from the publisher of this independent website. I understand I can unsubscribe at any time.";

export const nav = [
  { href: "#overview", label: "Overview" },
  { href: "#homes", label: "Homes" },
  { href: "#location", label: "Location" },
  { href: "#builders", label: "Builders" },
  { href: "#faq", label: "FAQ" },
  { href: "#register", label: "Register" },
] as const;

export const sources = {
  caledonTrails: {
    label: "Caledon Trails official website",
    href: "https://caledontrails.ca/",
  },
  laurier: {
    label: "Laurier Homes",
    href: "https://www.laurierhomes.com/about_us.php",
  },
  yorkwood: {
    label: "Yorkwood Homes",
    href: "https://www.yorkwoodhomes.com/aboutus.html",
  },
  yorkwoodCommunities: {
    label: "Yorkwood Homes communities",
    href: "https://www.yorkwoodhomes.com/communitiesmain.html",
  },
  caledon: {
    label: "Town of Caledon — Mayfield West Secondary Plan",
    href: "https://www.caledon.ca/en/government/mayfield-west-secondary-plan.aspx",
  },
  forks: {
    label: "Ontario Parks — Forks of the Credit",
    href: "https://www.ontarioparks.ca/park/forksofthecredit",
  },
  belfountain: {
    label: "Credit Valley Conservation — Belfountain Conservation Area",
    href: "https://cvc.ca/parks-faq/",
  },
  badlands: {
    label: "Ontario Heritage Trust — Cheltenham Badlands",
    href: "https://www.heritagetrust.on.ca/properties/cheltenham-badlands",
  },
} as const;

export const snapshotRows = [
  { field: "Project", value: "Windrose at Caledon Trails" },
  {
    field: "Community",
    value:
      "Associated with the Caledon Trails community. The official community website does not currently name Windrose as a distinct release.",
  },
  {
    field: "Builders",
    value:
      "Laurier Homes and Yorkwood Homes are identified on the official Caledon Trails website as the community builders.",
  },
  {
    field: "Location",
    value:
      "Caledon Trails is described at Mayfield Drive and McLaughlin Road, Caledon, Ontario. The community sales centre listed on the official site is 2068 Mayfield Road. A Windrose-specific civic address is to be announced.",
  },
  {
    field: "Home types",
    value:
      "To be announced for Windrose. The broader Caledon Trails community is officially described as towns, semis and singles.",
  },
  { field: "Ownership", value: "To be announced" },
  { field: "Size range", value: "To be announced" },
  { field: "Bedrooms", value: "To be announced" },
  { field: "Starting price", value: "To be announced" },
  { field: "Deposit structure", value: "To be announced" },
  {
    field: "Sales / launch status",
    value: `Request the latest verified update. Not confirmed on the official community website as of ${LAST_VERIFIED}.`,
  },
  { field: "Occupancy", value: "To be announced" },
] as const;

export const faqs = [
  {
    question: "What is Windrose at Caledon Trails?",
    answer:
      "Windrose at Caledon Trails is a new-home project name associated with the Caledon Trails community in Caledon, Ontario. This independent page collects registrations for verified project updates. The official Caledon Trails website does not currently use the Windrose name, so product details specific to Windrose remain to be announced.",
  },
  {
    question: "Where is Windrose at Caledon Trails located?",
    answer:
      "The official Caledon Trails website locates the broader community at Mayfield Drive and McLaughlin Road in Caledon. The same site lists a community sales centre at 2068 Mayfield Road. A Windrose-specific lot or civic address has not been confirmed on that site.",
  },
  {
    question: "Who is building Windrose at Caledon Trails?",
    answer:
      "Laurier Homes and Yorkwood Homes are named as the builders of Caledon Trails on the official community website. Yorkwood also lists Caledon Trails among its upcoming communities. Treat any Windrose-only builder claim as unconfirmed until it appears in official builder documents.",
  },
  {
    question: "What home types will Windrose offer?",
    answer:
      "Windrose home types are to be announced. Do not rely on third-party portals for the product mix. The official Caledon Trails website describes the broader community as towns, semis and singles, including a current singles release on 30-, 36- and 42-foot lots. That description has not been confirmed as the Windrose offering.",
  },
  {
    question: "What is the starting price for Windrose?",
    answer:
      "A verified starting price is to be announced. No official price list for Windrose was available on the Caledon Trails, Laurier Homes or Yorkwood Homes websites as of 14 August 2026. Figures published on third-party listing sites should not be treated as current builder pricing.",
  },
  {
    question: "What is the deposit structure?",
    answer:
      "The deposit schedule is to be announced. Any deposit amounts, instalment dates or occupancy adjustments must come from current builder documents or an Agreement of Purchase and Sale. This website will share a verified summary only when an official schedule is available.",
  },
  {
    question: "Are there incentives or upgrades at Windrose?",
    answer:
      "Windrose incentives are to be announced. The official Caledon Trails website has advertised upgrades and incentives for the broader community; that offer should not be assumed to apply to Windrose unless the builders confirm it in writing.",
  },
  {
    question: "When does Windrose launch, and is it selling now?",
    answer:
      "Launch timing is not confirmed on the official community or builder websites. Request the latest verified update. This page does not treat third-party “coming soon” or VIP-launch dates as official.",
  },
  {
    question: "When is occupancy?",
    answer:
      "Occupancy and closing timing are to be announced. Construction and occupancy dates can change and should be confirmed only in official builder documents.",
  },
  {
    question: "What do I receive when I register on this website?",
    answer:
      "You receive free, no-obligation email updates from this independent website when verified Windrose information becomes available. That may include launch status, pricing, floor plans and incentive notices if and when official documents are released. Documents are not sent instantly, and this is not the builders’ registration system.",
  },
] as const;

export const introAnswer =
  "Windrose at Caledon Trails is a new-home opportunity associated with the Caledon Trails community in Caledon, Ontario. The official community website places Caledon Trails at Mayfield Drive and McLaughlin Road and names Laurier Homes and Yorkwood Homes as builders of towns, semis and singles. Windrose-specific prices, floor plans, home types and occupancy have not been confirmed on that site as of 14 August 2026.";

export const disclaimer =
  "This is an independent informational website and is not the official website of the builders or the project. Project details, prices, incentives, specifications and availability are subject to change without notice. Renderings are artists' concepts. This is not an offering for sale. Any offering may be made only through the builders' official documents and Agreement of Purchase and Sale. E.&O.E.";

export const metadataContent = {
  title:
    "Windrose at Caledon Trails | New Homes in Caledon — Prices & Floor Plans Updates",
  description:
    "Independent information for Windrose at Caledon Trails at Mayfield Drive and McLaughlin Road, Caledon. Register for verified pricing, floor-plan and launch updates from Laurier Homes and Yorkwood Homes’ Caledon Trails community.",
};
