import type { Metadata } from "next";

import Hero from "@/components/Hero";
import DholeraSIRMap from "@/components/DholeraSIRMap";
import ProjectSection from "@/components/ProjectSection";
import OurProjects from "@/components/OurProjects";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Dholera SIR Real Estate & Property Opportunities",

  description:
    "Explore Dholera SIR real estate, land, plotted developments, bulk land opportunities and channel partner opportunities with HR Realty International.",

  keywords: [
    "Dholera SIR",
    "Dholera SIR real estate",
    "Dholera property",
    "Dholera land",
    "Dholera plots",
    "Dholera investment",
    "Dholera SIR Gujarat",
    "Dholera real estate",
    "Dholera plotted development",
    "Dholera bulk land",
    "Dholera channel partner",
    "DMIC Dholera",
    "Dholera infrastructure",
  ],

  alternates: {
    canonical: "https://www.thehrrealty.com/",
  },

  openGraph: {
    title: "Dholera SIR Real Estate & Property Opportunities",
    description:
      "Explore land, plotted developments, bulk land and channel partner opportunities in Dholera SIR, Gujarat.",
    url: "https://www.thehrrealty.com/",
    siteName: "HR Realty International",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "HR Realty International - Dholera SIR Real Estate",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Dholera SIR Real Estate | HR Realty International",
    description:
      "Explore real estate and property opportunities in Dholera SIR, Gujarat.",
    images: ["/images/logo.png"],
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#043927]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section aria-label="Dholera SIR real estate">
        <Hero />
      </section>

      {/* =====================================================
          DHOLERA SIR MAP
      ===================================================== */}

      <section
        aria-labelledby="dholera-location-heading"
        className="bg-[#043927]"
      >
        <h2 id="dholera-location-heading" className="sr-only">
          Dholera SIR Location and Connectivity
        </h2>

        <DholeraSIRMap />
      </section>

      {/* =====================================================
          REAL ESTATE PROJECTS
      ===================================================== */}

      <section
        aria-labelledby="real-estate-projects-heading"
        className="bg-[#043927]"
      >
        <h2 id="real-estate-projects-heading" className="sr-only">
          Dholera SIR Real Estate Projects
        </h2>

        <OurProjects />
      </section>

      {/* =====================================================
          PROJECT INFORMATION
      ===================================================== */}

      <section
        aria-labelledby="project-opportunities-heading"
        className="bg-[#043927]"
      >
        <h2 id="project-opportunities-heading" className="sr-only">
          Property Opportunities in Dholera SIR
        </h2>

        <ProjectSection />
      </section>

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      <section
        aria-labelledby="testimonials-heading"
        className="bg-[#043927]"
      >
        <h2 id="testimonials-heading" className="sr-only">
          Client Testimonials
        </h2>

        <Testimonials />
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section
        aria-labelledby="faq-heading"
        className="bg-[#043927]"
      >
        <h2 id="faq-heading" className="sr-only">
          Frequently Asked Questions About Dholera SIR
        </h2>

        <FAQSection />
      </section>

      {/* =====================================================
          PROPERTY INQUIRY
      ===================================================== */}

      <section
        aria-labelledby="property-inquiry-heading"
        className="bg-[#043927]"
      >
        <h2 id="property-inquiry-heading" className="sr-only">
          Dholera SIR Property Inquiry
        </h2>

        <InquiryForm />
      </section>
    </main>
  );
}