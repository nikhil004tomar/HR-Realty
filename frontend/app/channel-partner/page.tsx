import type { Metadata } from "next";
import ChannelPartnerPage from "@/components/channel-partners/ChannelPartnerPage";

export const metadata: Metadata = {
  title: "Become a Channel Partner | Dholera SIR Real Estate",
  description:
    "Partner with HR Realty International for real estate opportunities in Dholera SIR. Explore channel partner opportunities and connect with our team.",
  keywords: [
    "Dholera SIR channel partner",
    "Dholera real estate channel partner",
    "Dholera property channel partner",
    "HR Realty International channel partner",
    "Dholera SIR real estate",
  ],
  alternates: {
    canonical: "/channel-partner",
  },
  openGraph: {
    title: "Become a Channel Partner | HR Realty International",
    description:
      "Explore channel partner opportunities with HR Realty International in Dholera SIR.",
    url: "/channel-partner",
    siteName: "HR Realty International",
    type: "website",
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
    title: "Become a Channel Partner | HR Realty International",
    description:
      "Explore channel partner opportunities with HR Realty International in Dholera SIR.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ChannelPartnersPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.thehrrealty.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Become a Channel Partner",
        item: "https://www.thehrrealty.com/channel-partner",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <main>
        <ChannelPartnerPage />
      </main>
    </>
  );
}