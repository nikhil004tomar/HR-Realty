import type { Metadata } from "next";

import AboutHero from "@/components/about/AboutHero";
import FoundedSection from "@/components/about/FoundedSection";
import VisionMission from "@/components/about/VisionMission";
import DiscoverFuture from "@/components/about/DiscoverFuture";
import ValuesSection from "@/components/about/ValuesSection";
import ContactCTA from "@/components/about/ContactCTA";
import InquiryForm from "@/components/about/InquiryForm";
import OurTeam from "@/components/about/OurTeam";

// import Leadership from "@/components/about/Leadership";
// import OngoingProjects from "@/components/about/OngoingProjects";

const SITE_URL = "https://www.thehrrealty.com";

export const metadata: Metadata = {
  title: "About HR Realty International | Dholera SIR Real Estate",
  description:
    "Learn about HR Realty International and our focus on real estate, land, plotted developments and property opportunities in Dholera SIR, Gujarat.",
  keywords: [
    "HR Realty International",
    "about HR Realty",
    "Dholera SIR real estate company",
    "Dholera real estate",
    "Dholera property",
    "Dholera land",
    "Dholera plotted development",
    "Dholera SIR Gujarat",
    "Dholera property opportunities",
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/about`,
    siteName: "HR Realty International",
    title: "About HR Realty International | Dholera SIR Real Estate",
    description:
      "Discover HR Realty International, our vision and our focus on real estate and property opportunities in Dholera SIR, Gujarat.",
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
    title: "About HR Realty International | Dholera SIR Real Estate",
    description:
      "Learn about HR Realty International and our real estate focus in Dholera SIR, Gujarat.",
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
      name: "About",
      item: `${SITE_URL}/about`,
    },
  ],
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About HR Realty International",
  url: `${SITE_URL}/about`,
  description:
    "About HR Realty International and its real estate and property focus in Dholera SIR, Gujarat.",
  isPartOf: {
    "@type": "WebSite",
    name: "HR Realty International",
    url: SITE_URL,
  },
  about: {
    "@type": "Organization",
    name: "HR Realty International",
    url: SITE_URL,
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageSchema),
        }}
      />

      <main
        className="min-h-screen bg-[#043927]"
        aria-label="About HR Realty International"
      >
        <AboutHero />

        <section aria-label="About HR Realty International">
          <FoundedSection />
        </section>

        <section aria-label="Our Team">
          <OurTeam />
        </section>

        <section aria-label="Vision and Mission">
          <VisionMission />
        </section>

        <section aria-label="Discover the Future">
          <DiscoverFuture />
        </section>

        <section aria-label="Our Values">
          <ValuesSection />
        </section>

        <section aria-label="Contact HR Realty International">
          <ContactCTA />
        </section>

        <section
          id="contact"
          aria-label="Send an inquiry to HR Realty International"
        >
          <InquiryForm />
        </section>

        {/* Uncomment when these sections are ready */}
        {/* <Leadership /> */}
        {/* <OngoingProjects /> */}
      </main>
    </>
  );
}