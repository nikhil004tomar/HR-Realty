"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileCheck2,
  Landmark,
  Leaf,
  Map,
  Network,
  ShieldCheck,
  Wallet,
} from "lucide-react";

const keyFunctions = [
  {
    icon: Map,
    title: "Urban Planning",
    description:
      "Planning and guiding the development of land, urban areas, economic activities, amenities, and community infrastructure within the Special Investment Region.",
  },
  {
    icon: ShieldCheck,
    title: "Development Controls",
    description:
      "Regulating development activities and ensuring that land use, construction, and development follow applicable planning regulations and approved development frameworks.",
  },
  {
    icon: Network,
    title: "Infrastructure Management",
    description:
      "Managing and planning land resources and infrastructure to support coordinated roads, utilities, transportation, and essential regional infrastructure.",
  },
  {
    icon: Wallet,
    title: "Financial Authority",
    description:
      "Managing development-related financial functions, charges, assets, and other financial matters in accordance with the applicable legal and regulatory framework.",
  },
];

const responsibilities = [
  {
    icon: Map,
    title: "Master Planning",
    description:
      "Preparing and implementing structured development plans to guide the future growth of the region.",
  },
  {
    icon: Building2,
    title: "Land-Use Regulation",
    description:
      "Managing land-use planning for residential, commercial, industrial, institutional, and recreational purposes.",
  },
  {
    icon: Network,
    title: "Infrastructure Development",
    description:
      "Supporting coordinated development of roads, utilities, transportation networks, and essential civic infrastructure.",
  },
  {
    icon: ShieldCheck,
    title: "Development Control",
    description:
      "Ensuring that construction and development activities follow applicable planning standards and regulations.",
  },
  {
    icon: Leaf,
    title: "Sustainable Development",
    description:
      "Encouraging environmentally responsible, efficient, and long-term regional development.",
  },
  {
    icon: Landmark,
    title: "Government Coordination",
    description:
      "Working with relevant government departments and development agencies to facilitate planned growth and investment.",
  },
];

const planningPoints = [
  "Organized urban development",
  "Coordinated infrastructure planning",
  "Regulated land use",
  "Improved regional connectivity",
  "Structured environment for businesses and residents",
  "Greater clarity for developers and investors",
];

export default function DRDA() {
  return (
    <main className="bg-white text-[#111111]">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#043927]">
        <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#C9A45C]/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
          <div className="max-w-5xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C9A45C]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C] sm:text-sm">
                Dholera Regional Development Authority
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Driving Planned Growth in{" "}
              <span className="text-[#C9A45C]">Dholera</span>
            </h1>

            <div className="mt-6 h-1 w-16 rounded-full bg-[#C9A45C]" />

            <p className="mt-7 max-w-4xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8 lg:text-lg">
              The Dholera Regional Development Authority, officially referred
              to as the{" "}
              <strong className="font-semibold text-white">
                Dholera Special Investment Region Development Authority
                (DSIRDA)
              </strong>
              , is responsible for planning, regulating, and managing
              development within the Dholera Special Investment Region.
            </p>

            <p className="mt-4 max-w-4xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
              Through structured planning, development regulations,
              infrastructure management, and coordination with government
              agencies, the development authority framework supports the
              transformation of Dholera into a modern and future-ready
              investment destination.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#about-authority"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-6 py-3.5 text-sm font-bold text-[#111111] transition-all duration-300 hover:bg-[#d8b66f]"
              >
                Explore DRDA
                <ArrowRight size={17} />
              </Link>

              <Link
                href="#inquiry-form"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#043927]"
              >
                Talk to Our Team
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT THE AUTHORITY
      ====================================================== */}
      <section
        id="about-authority"
        className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.5fr] lg:gap-20">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#C9A45C]" />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                  About the Authority
                </p>
              </div>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#111111] sm:text-4xl lg:text-5xl">
                A Framework for{" "}
                <span className="text-[#043927]">
                  Planned Development
                </span>
              </h2>

              <div className="mt-5 h-1 w-12 rounded-full bg-[#C9A45C]" />
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C]/60 hover:shadow-md sm:p-8">
                <p className="text-base leading-8 text-gray-600 sm:text-lg">
                  The development framework for Dholera is designed to ensure
                  that urban growth, industrial development, residential
                  expansion, and infrastructure development take place in a
                  systematic and regulated manner.
                </p>
              </div>

              <div className="border-l-2 border-[#C9A45C] pl-5 sm:pl-7">
                <p className="text-base leading-8 text-gray-600 sm:text-lg">
                  The Dholera Special Investment Region Development Authority
                  (DSIRDA) has responsibility for planning and development of
                  Dholera SIR and for administering government land within the
                  region.
                </p>
              </div>

              <div className="border-l-2 border-[#043927]/20 pl-5 sm:pl-7">
                <p className="text-base leading-8 text-gray-600 sm:text-lg">
                  Its development framework covers land resources,
                  infrastructure, development planning, town planning, and
                  regulation of development activities within the designated
                  region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          KEY FUNCTIONS & POWERS
      ====================================================== */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                Key Functions &amp; Powers
              </span>

              <span className="h-px w-8 bg-[#C9A45C]" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl lg:text-5xl">
              Guiding the{" "}
              <span className="text-[#043927]">Development Framework</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-500 sm:text-base">
              The authority's role covers planning, development regulation,
              infrastructure, and financial functions within the applicable
              Special Investment Region framework.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {keyFunctions.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C] hover:shadow-lg sm:p-7"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#043927]/5 text-[#043927] transition-all duration-300 group-hover:bg-[#043927] group-hover:text-white">
                      <Icon size={22} />
                    </div>

                    <span className="text-sm font-bold text-[#C9A45C]">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-[#111111]">
                    {item.title}
                  </h3>

                  <div className="mt-3 h-0.5 w-8 bg-[#C9A45C] transition-all duration-300 group-hover:w-14" />

                  <p className="mt-4 text-sm leading-7 text-gray-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          KEY RESPONSIBILITIES
      ====================================================== */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                Key Responsibilities
              </span>

              <span className="h-px w-8 bg-[#C9A45C]" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl lg:text-5xl">
              Supporting{" "}
              <span className="text-[#043927]">Planned Growth</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {responsibilities.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C] hover:bg-white hover:shadow-lg sm:p-7"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#043927] shadow-sm transition-all duration-300 group-hover:bg-[#043927] group-hover:text-white">
                      <Icon size={22} />
                    </div>

                    <span className="text-sm font-bold text-[#C9A45C]">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-[#111111]">
                    {item.title}
                  </h3>

                  <div className="mt-3 h-0.5 w-8 bg-[#C9A45C] transition-all duration-300 group-hover:w-14" />

                  <p className="mt-4 text-sm leading-7 text-gray-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY DEVELOPMENT AUTHORITIES MATTER
      ====================================================== */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#C9A45C]" />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                  Why It Matters
                </p>
              </div>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#111111] sm:text-4xl lg:text-5xl">
                Why Development{" "}
                <span className="text-[#043927]">Authorities Matter</span>
              </h2>

              <div className="mt-5 h-1 w-12 rounded-full bg-[#C9A45C]" />

              <p className="mt-7 text-base leading-8 text-gray-600 sm:text-lg">
                A strong development authority provides the foundation for
                organized urbanization. It helps reduce unplanned growth,
                supports infrastructure coordination, improves connectivity,
                and creates a structured environment for businesses,
                residents, and investors.
              </p>

              <p className="mt-5 text-base leading-8 text-gray-600 sm:text-lg">
                For investors and developers, understanding the applicable
                development authority and planning framework is an important
                part of evaluating land and real-estate opportunities.
              </p>
            </div>

            <div className="rounded-2xl bg-[#043927] p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <FileCheck2 className="text-[#C9A45C]" size={24} />

                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  Planning Framework
                </h3>
              </div>

              <div className="mt-7 space-y-4">
                {planningPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                  >
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-[#C9A45C]"
                    />

                    <span className="text-sm leading-6 text-white/80 sm:text-base">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DHOLERA PLANNED FUTURE
      ====================================================== */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                Dholera
              </span>

              <span className="h-px w-8 bg-[#C9A45C]" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl lg:text-5xl">
              Dholera: A{" "}
              <span className="text-[#043927]">Planned Future</span>
            </h2>

            <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-[#C9A45C]" />

            <p className="mt-7 text-base leading-8 text-gray-600 sm:text-lg">
              Dholera is being developed with a long-term vision focused on
              modern infrastructure, industrial growth, smart-city planning,
              and improved regional connectivity. The development authority
              framework helps ensure that this growth takes place in accordance
              with approved plans and regulatory standards.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C] hover:bg-white hover:shadow-md sm:p-8">
              <Building2 className="mx-auto text-[#043927]" size={30} />

              <h3 className="mt-4 text-lg font-bold">
                Modern Infrastructure
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Supporting structured and future-oriented regional development.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C] hover:bg-white hover:shadow-md sm:p-8">
              <Map className="mx-auto text-[#043927]" size={30} />

              <h3 className="mt-4 text-lg font-bold">
                Planned Development
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Development guided by planning frameworks and applicable
                regulations.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C] hover:bg-white hover:shadow-md sm:p-8">
              <Network className="mx-auto text-[#043927]" size={30} />

              <h3 className="mt-4 text-lg font-bold">
                Regional Connectivity
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Infrastructure planning supporting better regional connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          IMPORTANT NOTE
      ====================================================== */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="rounded-2xl border-l-4 border-[#C9A45C] bg-[#043927]/5 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#043927] text-[#C9A45C]">
                <FileCheck2 size={23} />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  Important Note
                </h2>

                <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                  Development permissions, land-use classifications, zoning
                  regulations, and construction approvals may vary depending
                  on the specific location and applicable planning rules.
                  Buyers and investors should verify all property-related
                  information through the relevant government authorities and
                  official documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="bg-[#043927] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A45C]/40 bg-[#C9A45C]/10 text-[#C9A45C]">
            <Landmark size={26} />
          </div>

          <h2 className="mt-7 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Building Confidence Through{" "}
            <span className="text-[#C9A45C]">
              Planned Development
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
            With a structured planning framework and coordinated
            infrastructure vision, Dholera represents an emerging opportunity
            for future-oriented development and investment.
          </p>

          <p className="mx-auto mt-7 max-w-2xl text-lg font-semibold leading-8 text-white sm:text-xl">
            Explore Dholera. Understand the Planning. Invest with Information.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-7 py-3.5 text-sm font-bold text-[#111111] transition-all duration-300 hover:bg-[#d8b66f]"
            >
              Explore Projects
              <ArrowRight size={17} />
            </Link>

            <Link
              href="#inquiry-form"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#043927]"
            >
              Talk to Our Team
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}