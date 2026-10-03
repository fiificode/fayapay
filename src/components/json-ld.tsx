import { faqs, site } from "@/content/site";

const organization = "https://fayaworks.com/#organization";

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organization,
      name: site.maker.name,
      url: site.maker.url,
      email: site.supportEmail,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      inLanguage: "en-GH",
      publisher: { "@id": organization },
    },
    {
      "@type": "MobileApplication",
      "@id": `${site.url}/#app`,
      name: site.name,
      description: site.appDescription,
      operatingSystem: "Android 7.0 or later",
      applicationCategory: "FinanceApplication",
      url: `${site.url}/`,
      downloadUrl: `${site.url}/download`,
      installUrl: `${site.url}/download`,
      softwareVersion: site.appVersion,
      countriesSupported: "GH",
      inLanguage: "en",
      image: `${site.url}/og.png`,
      screenshot: ["home", "send-recipient", "send-amount", "send-confirm", "send-done"].map(
        (name) => `${site.url}/screens/${name}.webp`,
      ),
      offers: { "@type": "Offer", price: "0", priceCurrency: "GHS" },
      publisher: { "@id": organization },
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      // Built from the same list that renders the accordion.
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
};

export function JsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
