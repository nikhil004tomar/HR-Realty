import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Droplets,
  Factory,
  Globe2,
  MapPin,
  Route,
  TrainFront,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "Kalpasar Project & Dholera SIR Connectivity | HR Realty International",

  description:
    "Learn about the proposed Kalpasar Project, Gulf of Khambhat Development Project, and its planned connectivity relationship with Dholera SIR.",

  keywords: [
    "Kalpasar Project",
    "Kalpasar Dam",
    "Gulf of Khambhat Development Project",
    "Kalpasar Dholera",
    "Dholera SIR connectivity",
    "Dholera infrastructure",
    "Dholera Gujarat",
  ],

  alternates: {
    canonical:
      "https://www.thehrrealty.com/dholera-sir/kalpasar",
  },

  openGraph: {
    title: "Kalpasar Project & Dholera SIR Connectivity",
    description:
      "Explore the proposed Kalpasar Project and its planned infrastructure connection with the Dholera region.",
    url: "https://www.thehrrealty.com/dholera-sir/kalpasar",
    siteName: "HR Realty International",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const highlights = [
  {
    icon: Droplets,
    title: "Water Resource Development",
    text:
      "The Kalpasar concept is associated with development of a large freshwater reservoir in the Gulf of Khambhat by regulating river inflows.",
  },
  {
    icon: Route,
    title: "Road Connectivity",
    text:
      "The proposed infrastructure includes a road corridor across the Gulf that is intended to improve movement between Saurashtra and South Gujarat.",
  },
  {
    icon: TrainFront,
    title: "Rail Connectivity",
    text:
      "Government project studies have considered extending railway connectivity along the proposed Kalpasar dyke.",
  },
  {
    icon: Factory,
    title: "Industrial Connectivity",
    text:
      "Project studies identify Dholera SIR, port activity and industrial development among the wider development factors associated with the corridor.",
  },
];

const projectFeatures = [
  "Gulf of Khambhat Development Project",
  "Freshwater storage concept",
  "Proposed road connectivity across the Gulf",
  "Rail connectivity considered in project studies",
  "Connection between Saurashtra and South Gujarat",
  "Potential regional logistics benefits",
];

export default function KalpasarPage() {
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
        name: "Dholera SIR",
        item: "https://www.thehrrealty.com/dholera-sir/projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Kalpasar Project",
        item: "https://www.thehrrealty.com/dholera-sir/kalpasar",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white text-[#111827]">
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* =========================================================
          HERO
      ========================================================= */}
      <section
        aria-labelledby="kalpasar-title"
        className="relative flex min-h-[620px] items-center overflow-hidden bg-[#043927]"
      >
        {/* Full image without cropping */}
        <div className="absolute inset-0">
          <Image
            src="/images/dholera-sir/kalpasar.webp"
            alt="Kalpasar Project and Gulf of Khambhat infrastructure"
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>

        {/* Background color */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#043927]/55"
        />

        {/* Left gradient for text readability */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#043927]/95 via-[#043927]/65 to-transparent"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-4xl">
            <div
              aria-hidden="true"
              className="mb-6 h-1 w-20 bg-[#C9A45C]"
            />

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#C9A45C]">
              Dholera SIR Infrastructure
            </p>

            <h1
              id="kalpasar-title"
              className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Kalpasar Project &amp; Gulf of Khambhat
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl">
              Understanding the proposed Kalpasar Project, its water-resource
              concept, planned transportation corridor and its relationship
              with the wider Dholera SIR development region.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/dholera-sir/connectivity"
                className="inline-flex items-center gap-2 rounded-full bg-[#C9A45C] px-6 py-3 font-semibold text-[#043927] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Explore Connectivity

                <ArrowRight
                  size={18}
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-[#043927] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Contact HR Realty
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROJECT OVERVIEW
      ========================================================= */}
      <section
        aria-labelledby="overview-title"
        className="bg-white px-6 py-20 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
              Project Overview
            </p>

            <h2
              id="overview-title"
              className="text-3xl font-bold text-[#043927] sm:text-4xl"
            >
              What is the Kalpasar Project?
            </h2>

            <div className="mt-6 space-y-5 text-base leading-8 text-gray-700">
              <p>
                The Kalpasar Project, also referred to as the Gulf of Khambhat
                Development Project, is a long-term infrastructure concept
                involving the Gulf of Khambhat.
              </p>

              <p>
                Government studies have examined the possibility of creating a
                large freshwater reservoir by regulating river inflows into the
                Gulf. The project has also involved engineering, hydrodynamic,
                transportation, environmental and social studies.
              </p>

              <p>
                The proposed transportation infrastructure is significant for
                the wider region because project studies have considered road
                and rail connectivity across the Gulf, linking the Saurashtra
                side with South Gujarat.
              </p>
            </div>
          </div>

          {/* Map - no cropping */}
          <div className="relative min-h-[360px] overflow-hidden rounded-3xl bg-[#043927]">
            <Image
              src="/images/dholera-sir/kalpasar-map.webp"
              alt="Kalpasar Project regional connectivity map"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-4"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          KEY COMPONENTS
      ========================================================= */}
      <section
        aria-labelledby="highlights-title"
        className="bg-[#F7F7F4] px-6 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
              Key Components
            </p>

            <h2
              id="highlights-title"
              className="mt-3 text-3xl font-bold text-[#043927] sm:text-4xl"
            >
              Major aspects of the Kalpasar Project
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-colors hover:border-[#C9A45C]"
                >
                  <div
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#043927] text-[#C9A45C]"
                  >
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[#043927]">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          DHOLERA SIR CONNECTION
      ========================================================= */}
      <section
        aria-labelledby="dholera-connection-title"
        className="bg-[#043927] px-6 py-20 text-white lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
                Dholera SIR Connection
              </p>

              <h2
                id="dholera-connection-title"
                className="mt-3 text-3xl font-bold sm:text-4xl"
              >
                Why is Kalpasar relevant to the Dholera region?
              </h2>

              <div className="mt-6 space-y-5 leading-8 text-white/80">
                <p>
                  Dholera SIR is part of a wider industrial and infrastructure
                  network in Gujarat. Project studies for the Kalpasar corridor
                  have considered Dholera SIR projects, airport development and
                  port activities among the wider regional development
                  considerations.
                </p>

                <p>
                  The proposed crossing is intended to provide a shorter
                  regional connection between the Saurashtra side and South
                  Gujarat, subject to the project's approvals, studies and
                  eventual implementation.
                </p>

                <p>
                  This means the Kalpasar Project should be presented as a{" "}
                  <strong className="text-white">
                    proposed infrastructure project
                  </strong>
                  , rather than as an already operational connection.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <MapPin
                size={36}
                className="text-[#C9A45C]"
                aria-hidden="true"
              />

              <h3 className="mt-5 text-2xl font-bold">
                Regional Infrastructure
              </h3>

              <ul className="mt-6 space-y-4">
                {projectFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-white/80"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C9A45C]"
                    />

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          REGIONAL DEVELOPMENT
      ========================================================= */}
      <section
        aria-labelledby="regional-title"
        className="bg-white px-6 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Globe2
              className="mx-auto text-[#C9A45C]"
              size={38}
              aria-hidden="true"
            />

            <h2
              id="regional-title"
              className="mt-5 text-3xl font-bold text-[#043927] sm:text-4xl"
            >
              Part of Gujarat&apos;s wider infrastructure network
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              Kalpasar is one component within a broader set of water,
              transportation, industrial and port-development studies in
              Gujarat. Its potential relationship with Dholera should be
              understood in the context of the proposed infrastructure
              corridor rather than as a direct project inside Dholera SIR.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Connectivity */}
            <Link
              href="/dholera-sir/connectivity"
              className="group rounded-2xl border border-gray-200 p-7 transition-colors hover:border-[#C9A45C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A45C]"
            >
              <Route
                className="text-[#C9A45C]"
                size={28}
                aria-hidden="true"
              />

              <h3 className="mt-5 text-xl font-bold text-[#043927]">
                Dholera Connectivity
              </h3>

              <p className="mt-3 text-gray-600">
                Explore road, airport, rail and regional connectivity around
                Dholera SIR.
              </p>

              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[#043927]">
                View Connectivity

                <ArrowRight
                  size={17}
                  aria-hidden="true"
                />
              </span>
            </Link>

            {/* DMIC */}
            <Link
              href="/dholera-sir/dmic"
              className="group rounded-2xl border border-gray-200 p-7 transition-colors hover:border-[#C9A45C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A45C]"
            >
              <Factory
                className="text-[#C9A45C]"
                size={28}
                aria-hidden="true"
              />

              <h3 className="mt-5 text-xl font-bold text-[#043927]">
                DMIC
              </h3>

              <p className="mt-3 text-gray-600">
                Learn about Dholera&apos;s position within the Delhi-Mumbai
                Industrial Corridor.
              </p>

              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[#043927]">
                Explore DMIC

                <ArrowRight
                  size={17}
                  aria-hidden="true"
                />
              </span>
            </Link>

            {/* Dholera SIR */}
            <Link
              href="/dholera-sir/projects"
              className="group rounded-2xl border border-gray-200 p-7 transition-colors hover:border-[#C9A45C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A45C]"
            >
              <Globe2
                className="text-[#C9A45C]"
                size={28}
                aria-hidden="true"
              />

              <h3 className="mt-5 text-xl font-bold text-[#043927]">
                Dholera SIR
              </h3>

              <p className="mt-3 text-gray-600">
                Explore the Dholera SIR region, development framework and major
                infrastructure projects.
              </p>

              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[#043927]">
                Explore Dholera SIR

                <ArrowRight
                  size={17}
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section
        aria-labelledby="cta-title"
        className="bg-[#F7F7F4] px-6 py-16 lg:px-8"
      >
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#043927] px-6 py-12 text-center sm:px-10">
          <h2
            id="cta-title"
            className="text-3xl font-bold text-white sm:text-4xl"
          >
            Explore Dholera SIR Opportunities
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/80">
            Speak with HR Realty International about Dholera SIR projects,
            connectivity and available property opportunities.
          </p>

          <Link
            href="/#contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#C9A45C] px-7 py-3 font-semibold text-[#043927] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Contact Us

            <ArrowRight
              size={18}
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}