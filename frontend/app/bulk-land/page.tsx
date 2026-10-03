import type { Metadata } from "next";

import BulkLandHero from "@/components/bulk-land/BulkLandHero";
import BulkLandIntro from "@/components/bulk-land/BulkLandIntro";
import WhyChooseBulkLand from "@/components/bulk-land/WhyChooseBulkLand";
import PrimeLocations from "@/components/bulk-land/PrimeLocations";
import InquiryForm from "@/components/InquiryForm";

const SITE_URL = "https://www.thehrrealty.com";

export const metadata: Metadata = {
  title: "Bulk Land Opportunities in Dholera SIR | HR Realty International",
  description:
    "Explore bulk land opportunities in Dholera SIR, Gujarat with HR Realty International. Enquire about large land parcels, locations and property opportunities.",
  keywords: [
    "bulk land Dholera",
    "bulk land Dholera SIR",
    "Dholera bulk land",
    "large land parcels Dholera",
    "Dholera land",
    "Dholera SIR land",
    "Dholera real estate",
    "Dholera property opportunities",
  ],
  alternates: {
    canonical: `${SITE_URL}/bulk-land`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/bulk-land`,
    siteName: "HR Realty International",
    title: "Bulk Land Opportunities in Dholera SIR",
    description:
      "Explore bulk land opportunities and large land parcels in Dholera SIR, Gujarat with HR Realty International.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "HR Realty International",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk Land Opportunities in Dholera SIR",
    description:
      "Explore bulk land and property opportunities in Dholera SIR, Gujarat.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Bulk Land",
      item: `${SITE_URL}/bulk-land`,
    },
  ],
};

export default function BulkLandPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <main className="bg-[#043927] text-[#111827]">
        <section aria-label="Bulk land opportunities">
          <BulkLandHero />
        </section>

        <section aria-label="Bulk land information">
          <BulkLandIntro />
        </section>

        <section aria-label="Why choose bulk land">
          <WhyChooseBulkLand />
        </section>

        <section aria-label="Prime bulk land locations">
          <PrimeLocations />
        </section>

        <section aria-label="Bulk land inquiry">
          <InquiryForm />
        </section>
      </main>
    </>
  );
}