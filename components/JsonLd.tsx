import { jsonLdGraph } from "@/lib/jsonld";

export function JsonLd() {
  const json = JSON.stringify(jsonLdGraph()).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
