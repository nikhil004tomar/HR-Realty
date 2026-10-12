import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Factory,
  Globe2,
  MapPin,
  MonitorCog,
  ShieldCheck,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "ABCD Building Dholera SIR | Administrative & Business Centre | HR Realty",

  description:
    "Learn about the ABCD Building in Dholera SIR, its administrative functions, Integrated Command and Control Centre, Knowledge & IT Zone location and role in Dholera's smart-city infrastructure.",

  keywords: [
    "ABCD Building Dholera",
    "ABCD Building Dholera SIR",
    "Administrative Business Centre Dholera",
    "Dholera ABCD Building",
    "Dholera ICCC",
    "Dholera Knowledge IT Zone",
    "Dholera SIR infrastructure",
    "Dholera smart city",
    "Dholera Gujarat",
  ],

  alternates: {
    canonical:
      "https://www.thehrrealty.com/dholera-sir/abcd-building",
  },

  openGraph: {
    title: "ABCD Building Dholera SIR | HR Realty International",
    description:
      "Explore the ABCD Building, its administrative role, command and control functions and location within Dholera SIR.",
    url: "https://www.thehrrealty.com/dholera-sir/abcd-building",
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
    icon: Building2,
    title: "Administrative Centre",
    text:
      "The ABCD Building serves as an important administrative facility associated with the planning and development of Dholera SIR.",
  },
  {
    icon: MonitorCog,
    title: "Integrated Command & Control Centre",
    text:
      "The building houses the Integrated Command and Control Centre, associated with monitoring and managing smart-city infrastructure and services.",
  },
  {
    icon: Workflow,
    title: "Single-Window Facilitation",
    text:
      "The ABCD complex is associated with investor-facing administrative and single-window facilitation for businesses operating within the Dholera development framework.",
  },
  {
    icon: Factory,
    title: "Business & Industrial Support",
    text:
      "Its location within the Knowledge & IT Zone places the facility within Dholera's broader business, technology and industrial development framework.",
  },
];

const facilities = [
  "Administrative offices",
  "Integrated Command & Control Centre",
  "Investor facilitation",
  "Single-window administrative services",
  "Smart-city monitoring systems",
  "Business and development support",
];

export default function ABCDBuildingPage() {
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
        name: "ABCD Building",
        item: "https://www.thehrrealty.com/dholera-sir/abcd-building",
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
        aria-labelledby="abcd-title"
        className="relative flex min-h-[620px] items-center overflow-hidden bg-[#043927]"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/dholera-sir/abcd-building.webp"
            alt="ABCD Building in Dholera SIR"
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>

        {/* Dark Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#043927]/60"
        />

        {/* Gradient */}
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
              id="abcd-title"
              className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              ABCD Building
              <span className="block text-[#C9A45C]">
                Administrative &amp; Business Centre
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl">
              Explore the Administrative cum Business Centre for Dholera,
              its smart-city command functions, investor facilitation role and
              strategic location within the Knowledge &amp; IT Zone of Dholera
              SIR.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/dholera-sir/connectivity"
                className="inline-flex items-center gap-2 rounded-full bg-[#C9A45C] px-6 py-3 font-semibold text-[#043927] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Explore Dholera Connectivity

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
          OVERVIEW
      ========================================================= */}
      <section
        aria-labelledby="overview-title"
        className="bg-white px-6 py-20 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
              ABCD Building
            </p>

            <h2
              id="overview-title"
              className="text-3xl font-bold text-[#043927] sm:text-4xl"
            >
              What is the ABCD Building?
            </h2>

            <div className="mt-6 space-y-5 text-base leading-8 text-gray-700">
              <p>
                ABCD stands for{" "}
                <strong>
                  Administrative cum Business Centre for Dholera
                </strong>
                . The facility is located in the Knowledge &amp; IT Zone of
                Town Planning Scheme 2 within Dholera SIR.
              </p>

              <p>
                The building brings together administrative functions and
                smart-city infrastructure. It is associated with authority
                offices, investor facilitation and the Integrated Command and
                Control Centre.
              </p>

              <p>
                The facility forms part of the wider infrastructure framework
                being developed for Dholera SIR and supports the region's
                planned industrial and smart-city ecosystem.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative min-h-[380px] overflow-hidden rounded-3xl bg-[#043927]">
            <Image
              src="/images/dholera-sir/abcd-building.webp"
              alt="ABCD Building administrative centre in Dholera SIR"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-4"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          KEY FEATURES
      ========================================================= */}
      <section
        aria-labelledby="features-title"
        className="bg-[#F7F7F4] px-6 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
              Key Functions
            </p>

            <h2
              id="features-title"
              className="mt-3 text-3xl font-bold text-[#043927] sm:text-4xl"
            >
              Major functions of the ABCD Building
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              The ABCD Building combines administrative, technological and
              business-support functions within Dholera SIR.
            </p>
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
          ICCC
      ========================================================= */}
      <section
        aria-labelledby="iccc-title"
        className="bg-[#043927] px-6 py-20 text-white lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
                Smart City Technology
              </p>

              <h2
                id="iccc-title"
                className="mt-3 text-3xl font-bold sm:text-4xl"
              >
                Integrated Command &amp; Control Centre
              </h2>

              <div className="mt-6 space-y-5 leading-8 text-white/80">
                <p>
                  One of the key functions associated with the ABCD Building is
                  the Integrated Command and Control Centre, commonly referred
                  to as the ICCC.
                </p>

                <p>
                  The command-and-control infrastructure is designed to bring
                  information from smart-city systems together for monitoring
                  and coordinated management of urban services.
                </p>

                <p>
                  Areas associated with smart-city monitoring can include
                  utilities, mobility, surveillance, lighting and other
                  infrastructure systems.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <MonitorCog
                size={42}
                className="text-[#C9A45C]"
                aria-hidden="true"
              />

              <h3 className="mt-5 text-2xl font-bold">
                Smart Infrastructure
              </h3>

              <ul className="mt-6 space-y-4">
                {[
                  "Centralized infrastructure monitoring",
                  "Smart-city command systems",
                  "Utility monitoring",
                  "Traffic and mobility systems",
                  "Security and surveillance systems",
                  "Digital urban management",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-white/80"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C9A45C]"
                    />

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          LOCATION
      ========================================================= */}
      <section
        aria-labelledby="location-title"
        className="bg-white px-6 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <MapPin
                size={40}
                className="text-[#C9A45C]"
                aria-hidden="true"
              />

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
                Strategic Location
              </p>

              <h2
                id="location-title"
                className="mt-3 text-3xl font-bold text-[#043927] sm:text-4xl"
              >
                Located in Dholera&apos;s Knowledge &amp; IT Zone
              </h2>

              <div className="mt-6 space-y-5 leading-8 text-gray-600">
                <p>
                  The ABCD Building is located within Town Planning Scheme 2,
                  in the Knowledge &amp; IT Zone of Dholera SIR.
                </p>

                <p>
                  Its location places the administrative facility within the
                  wider planned development framework of Dholera's activation
                  and industrial areas.
                </p>

                <p>
                  The facility is therefore connected to the broader
                  infrastructure network being developed across Dholera SIR.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-[#F7F7F4] p-8">
              <Globe2
                size={42}
                className="text-[#C9A45C]"
                aria-hidden="true"
              />

              <h3 className="mt-5 text-2xl font-bold text-[#043927]">
                Dholera SIR Development
              </h3>

              <p className="mt-4 leading-8 text-gray-600">
                Dholera SIR is being developed as a planned industrial region
                with integrated infrastructure, technology systems and
                business-support facilities.
              </p>

              <div className="mt-6 rounded-2xl bg-[#043927] p-6 text-white">
                <p className="text-sm uppercase tracking-[0.15em] text-[#C9A45C]">
                  Location
                </p>

                <p className="mt-2 text-lg font-semibold">
                  TP Scheme 2 · Knowledge &amp; IT Zone
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FACILITIES
      ========================================================= */}
      <section
        aria-labelledby="facilities-title"
        className="bg-[#F7F7F4] px-6 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <ShieldCheck
              size={40}
              className="mx-auto text-[#C9A45C]"
              aria-hidden="true"
            />

            <h2
              id="facilities-title"
              className="mt-5 text-3xl font-bold text-[#043927] sm:text-4xl"
            >
              Facilities &amp; Functions
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              The ABCD complex brings together multiple functions that support
              Dholera&apos;s administrative and smart-city development.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => (
              <div
                key={facility}
                className="rounded-2xl border border-gray-200 bg-white p-6"
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#C9A45C]"
                  />

                  <span className="font-semibold text-[#043927]">
                    {facility}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          RELATED PAGES
      ========================================================= */}
      <section
        aria-labelledby="related-title"
        className="bg-white px-6 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
              Explore More
            </p>

            <h2
              id="related-title"
              className="mt-3 text-3xl font-bold text-[#043927] sm:text-4xl"
            >
              Explore Dholera SIR infrastructure
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Link
              href="/dholera-sir/connectivity"
              className="group rounded-2xl border border-gray-200 p-7 transition-colors hover:border-[#C9A45C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A45C]"
            >
              <MapPin
                size={28}
                className="text-[#C9A45C]"
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
                <ArrowRight size={17} aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/dholera-sir/dmic"
              className="group rounded-2xl border border-gray-200 p-7 transition-colors hover:border-[#C9A45C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A45C]"
            >
              <Factory
                size={28}
                className="text-[#C9A45C]"
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
                <ArrowRight size={17} aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/dholera-sir/kalpasar"
              className="group rounded-2xl border border-gray-200 p-7 transition-colors hover:border-[#C9A45C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A45C]"
            >
              <Globe2
                size={28}
                className="text-[#C9A45C]"
                aria-hidden="true"
              />

              <h3 className="mt-5 text-xl font-bold text-[#043927]">
                Kalpasar Project
              </h3>

              <p className="mt-3 text-gray-600">
                Learn about the proposed Kalpasar Project and its regional
                infrastructure relationship with Dholera.
              </p>

              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[#043927]">
                Explore Kalpasar
                <ArrowRight size={17} aria-hidden="true" />
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
            Learn more about Dholera SIR infrastructure, projects,
            connectivity and property opportunities with HR Realty
            International.
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