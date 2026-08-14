import {
  SITE_URL,
  LAST_VERIFIED,
  PROJECT_NAME,
  disclaimer,
  faqs,
  introAnswer,
  metadataContent,
  publisher,
  sources,
} from "@/lib/site";

export function jsonLdGraph() {
  const publisherId = `${SITE_URL}/#publisher`;
  const websiteId = `${SITE_URL}/#website`;
  const webpageId = `${SITE_URL}/#webpage`;
  const projectId = `${SITE_URL}/#project`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": publisherId,
        name: publisher.legalName,
        url: SITE_URL,
        ...(publisher.email && !publisher.email.includes("[")
          ? { email: publisher.email }
          : {}),
        ...(publisher.phone && !publisher.phone.includes("[")
          ? { telephone: publisher.phone }
          : {}),
        description:
          "Independent publisher of project information for Windrose at Caledon Trails. Not the official builder website.",
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: PROJECT_NAME,
        description: metadataContent.description,
        publisher: { "@id": publisherId },
        inLanguage: "en-CA",
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: `${SITE_URL}/`,
        name: metadataContent.title,
        description: metadataContent.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": projectId },
        inLanguage: "en-CA",
        dateModified: "2026-08-14",
        primaryImageOfPage: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#hero-image`,
          url: `${SITE_URL}/images/hero-caledon-landscape.jpg`,
          contentUrl: `${SITE_URL}/images/hero-caledon-landscape.jpg`,
          caption:
            "Conceptual Caledon countryside photograph. Not an official project rendering.",
          width: 1536,
          height: 1024,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#direct-answer", "#project-snapshot"],
        },
      },
      {
        "@type": "Place",
        "@id": projectId,
        name: PROJECT_NAME,
        description: introAnswer,
        url: `${SITE_URL}/`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Caledon",
          addressRegion: "ON",
          addressCountry: "CA",
        },
        containedInPlace: {
          "@type": "Place",
          name: "Caledon Trails",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Mayfield Drive and McLaughlin Road",
            addressLocality: "Caledon",
            addressRegion: "ON",
            addressCountry: "CA",
          },
        },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Last verified",
            value: LAST_VERIFIED,
          },
          {
            "@type": "PropertyValue",
            name: "Official community source",
            value: sources.caledonTrails.href,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        url: `${SITE_URL}/#faq`,
        isPartOf: { "@id": webpageId },
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#conceptual-home`,
        url: `${SITE_URL}/images/conceptual-home-exterior.jpg`,
        caption:
          "Conceptual Ontario residential imagery. Not an official Windrose or Caledon Trails rendering.",
        creditText: disclaimer,
      },
    ],
  };
}
