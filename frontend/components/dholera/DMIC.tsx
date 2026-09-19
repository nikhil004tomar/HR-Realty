"use client";

import {
  ArrowDown,
  Building2,
  Factory,
  Globe2,
  HardHat,
  Plane,
  Route,
  Ship,
  Truck,
  Zap,
} from "lucide-react";

const dmicFocusAreas = [
  {
    icon: Factory,
    title: "Industrial & Manufacturing",
    description:
      "Supporting industrial and manufacturing development across the DMIC ecosystem.",
  },
  {
    icon: Truck,
    title: "Multimodal Transportation",
    description:
      "Connecting industrial destinations through integrated transportation networks.",
  },
  {
    icon: Route,
    title: "Logistics & Supply Chain",
    description:
      "Supporting efficient movement of goods through modern logistics infrastructure.",
  },
  {
    icon: Building2,
    title: "Investment & Business",
    description:
      "Creating opportunities for investment, business activity and industrial growth.",
  },
  {
    icon: Globe2,
    title: "Modern Urban Infrastructure",
    description:
      "Developing planned urban infrastructure to support industrial and economic activity.",
  },
  {
    icon: HardHat,
    title: "Employment & Economic Growth",
    description:
      "Supporting employment generation and long-term regional economic development.",
  },
];

const dholeraFocusAreas = [
  {
    icon: Factory,
    title: "Advanced Manufacturing",
    description:
      "Development of large-scale manufacturing and industrial activities.",
  },
  {
    icon: Zap,
    title: "Semiconductors & Technology",
    description:
      "Positioning Dholera for advanced technology and semiconductor-related investments.",
  },
  {
    icon: Plane,
    title: "Aerospace & Defence",
    description:
      "Supporting strategic manufacturing and engineering industries.",
  },
  {
    icon: Zap,
    title: "Renewable & Green Energy",
    description:
      "Opportunities associated with renewable energy and emerging green technologies.",
  },
  {
    icon: Building2,
    title: "Pharmaceuticals & Biotechnology",
    description:
      "Supporting high-value manufacturing and technology-driven industries.",
  },
  {
    icon: HardHat,
    title: "Engineering & Manufacturing",
    description:
      "Developing an ecosystem for heavy engineering and industrial production.",
  },
];

const developmentFlow = [
  "DMIC",
  "Industrial Development Framework",
  "Dholera SIR",
  "Planned Industrial Infrastructure",
  "Manufacturing & Technology",
  "Business & Employment",
  "Long-Term Economic Growth",
];

export default function DMIC() {
  return (
    <main className="bg-white text-[#111111]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#043927]">

        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#C9A45C]/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">

          <div className="max-w-5xl">

            {/* Label */}

            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A45C]">
                Delhi–Mumbai Industrial Corridor
              </span>
            </div>

            {/* Heading */}

            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Connecting India&apos;s{" "}
              <span className="text-[#C9A45C]">
                Industrial Future
              </span>
            </h1>

            <div className="mt-7 h-1 w-16 rounded-full bg-[#C9A45C]" />

            {/* Description */}

            <p className="mt-7 max-w-4xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8 lg:text-lg">
              The Delhi–Mumbai Industrial Corridor (DMIC) is a major
              Government of India industrial-development initiative designed
              to create globally competitive manufacturing and investment
              destinations through integrated infrastructure, connectivity
              and industrial development.
            </p>

            <p className="mt-5 max-w-4xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
              Dholera Special Investment Region (Dholera SIR) in Gujarat is
              one of the major industrial nodes of the DMIC and is being
              developed as a large-scale greenfield industrial and smart-city
              region.
            </p>

            {/* Tags */}

            <div className="mt-8 flex flex-wrap gap-3">

              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
                DMIC
              </span>

              <span className="rounded-full border border-[#C9A45C]/40 bg-[#C9A45C]/10 px-4 py-2 text-xs font-semibold text-[#C9A45C]">
                Dholera SIR
              </span>

              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
                Industrial Development
              </span>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          DMIC OVERVIEW
      ====================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="grid items-start gap-10 lg:grid-cols-[0.75fr_1.5fr] lg:gap-20">

            {/* Left */}

            <div>

              <div className="flex items-center gap-3">

                <span className="h-[2px] w-10 bg-[#C9A45C]" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                  DMIC
                </span>

              </div>

              <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                A Major Industrial{" "}
                <span className="text-[#043927]">
                  Development Corridor
                </span>
              </h2>

              <div className="mt-5 h-1 w-14 rounded-full bg-[#C9A45C]" />

            </div>


            {/* Right */}

            <div className="space-y-5 text-sm leading-8 text-[#111111]/65 sm:text-base">

              <p>
                The Delhi–Mumbai Industrial Corridor extends approximately
                1,504 km between the Delhi-NCR region and Jawaharlal Nehru
                Port (JNPT) near Mumbai.
              </p>

              <p>
                The corridor is designed to support industrial and
                manufacturing development, multimodal transportation,
                logistics and supply-chain infrastructure, investment and
                business activity, modern urban infrastructure, employment
                and economic growth.
              </p>

              <p>
                DMIC is closely aligned with the Western Dedicated Freight
                Corridor, providing an important freight-transport backbone
                for industrial development.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          DMIC FOCUS AREAS
      ====================================================== */}

      <section className="bg-[#fafafa] py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-5 flex items-center justify-center gap-3">

              <span className="h-[2px] w-10 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                DMIC Focus
              </span>

              <span className="h-[2px] w-10 bg-[#C9A45C]" />

            </div>

            <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">
              Building the{" "}
              <span className="text-[#043927]">
                Industrial Ecosystem
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#111111]/60 sm:text-base">
              DMIC is designed to bring infrastructure, industry,
              transportation and economic activity together.
            </p>

          </div>


          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {dmicFocusAreas.map((item) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-black/10 bg-white p-6 shadow-[0_6px_25px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C]/60 hover:shadow-[0_12px_35px_rgba(0,0,0,0.07)] sm:p-7"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#043927]/10 transition-colors duration-300 group-hover:bg-[#C9A45C]/15">

                    <Icon
                      size={21}
                      className="text-[#043927]"
                      strokeWidth={2}
                    />

                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#043927]">
                    {item.title}
                  </h3>

                  <div className="mt-3 h-[2px] w-10 bg-[#C9A45C] transition-all duration-300 group-hover:w-14" />

                  <p className="mt-4 text-sm leading-7 text-[#111111]/55">
                    {item.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>
      </section>


      {/* =====================================================
          DHOLERA SIR
      ====================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">

            {/* Content */}

            <div>

              <div className="mb-5 flex items-center gap-3">

                <span className="h-[2px] w-10 bg-[#C9A45C]" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                  Dholera SIR
                </span>

              </div>

              <h2 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                A Major Greenfield{" "}
                <span className="text-[#043927]">
                  Industrial Node
                </span>{" "}
                of DMIC
              </h2>

              <div className="mt-5 h-1 w-14 rounded-full bg-[#C9A45C]" />

              <div className="mt-7 space-y-5 text-sm leading-8 text-[#111111]/65 sm:text-base">

                <p>
                  Dholera Special Investment Region (SIR) is being developed
                  in Gujarat as a planned industrial city within the DMIC
                  ecosystem.
                </p>

                <p>
                  Dholera SIR covers approximately 920 sq. km, including a
                  22.54 sq. km Activation Area where major trunk
                  infrastructure has been developed.
                </p>

                <p>
                  The region is planned to accommodate large-scale
                  industrial, commercial and urban development supported by
                  modern infrastructure.
                </p>

              </div>

            </div>


            {/* Stats */}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">

              <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-6">

                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black/40">
                  Dholera SIR Area
                </p>

                <p className="mt-3 text-4xl font-black text-[#043927]">
                  920
                  <span className="ml-2 text-lg font-semibold text-black/50">
                    sq. km
                  </span>
                </p>

                <div className="mt-4 h-1 w-12 bg-[#C9A45C]" />

              </div>


              <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-6">

                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black/40">
                  Activation Area
                </p>

                <p className="mt-3 text-4xl font-black text-[#043927]">
                  22.54
                  <span className="ml-2 text-lg font-semibold text-black/50">
                    sq. km
                  </span>
                </p>

                <div className="mt-4 h-1 w-12 bg-[#C9A45C]" />

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          DHOLERA KEY FOCUS AREAS
      ====================================================== */}

      <section className="bg-[#fafafa] py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="max-w-3xl">

            <div className="mb-5 flex items-center gap-3">

              <span className="h-[2px] w-10 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                Industrial Sectors
              </span>

            </div>

            <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">
              Dholera&apos;s{" "}
              <span className="text-[#043927]">
                Key Focus Areas
              </span>
            </h2>

            <div className="mt-5 h-1 w-14 rounded-full bg-[#C9A45C]" />

          </div>


          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {dholeraFocusAreas.map((item) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-black/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C]/60 hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] sm:p-7"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#043927]/10">

                    <Icon
                      size={21}
                      className="text-[#043927]"
                    />

                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#043927]">
                    {item.title}
                  </h3>

                  <div className="mt-3 h-[2px] w-10 bg-[#C9A45C] transition-all duration-300 group-hover:w-14" />

                  <p className="mt-4 text-sm leading-7 text-[#111111]/55">
                    {item.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>
      </section>


      {/* =====================================================
          DEVELOPMENT FLOW
      ====================================================== */}

      <section className="bg-[#043927] py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-5 flex items-center justify-center gap-3">

              <span className="h-[2px] w-10 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A45C]">
                DMIC → Dholera SIR
              </span>

              <span className="h-[2px] w-10 bg-[#C9A45C]" />

            </div>

            <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
              From Industrial Corridor to{" "}
              <span className="text-[#C9A45C]">
                Industrial City
              </span>
            </h2>

          </div>


          <div className="mx-auto mt-12 flex max-w-md flex-col items-center">

            {developmentFlow.map((item, index) => (

              <div
                key={item}
                className="flex w-full flex-col items-center"
              >

                <div
                  className={`w-full rounded-xl border px-5 py-4 text-center ${
                    index === 0
                      ? "border-[#C9A45C] bg-[#C9A45C] text-[#111111]"
                      : index === developmentFlow.length - 1
                      ? "border-[#C9A45C]/50 bg-white/10 text-[#C9A45C]"
                      : "border-white/15 bg-white/5 text-white"
                  }`}
                >
                  <span className="text-sm font-bold sm:text-base">
                    {item}
                  </span>
                </div>

                {index !== developmentFlow.length - 1 && (
                  <div className="flex h-8 items-center">
                    <ArrowDown
                      size={17}
                      className="text-[#C9A45C]"
                    />
                  </div>
                )}

              </div>

            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          WHY DHOLERA IS IMPORTANT
      ====================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">

          <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-[0_10px_40px_rgba(0,0,0,0.05)] sm:p-10 lg:p-12">

            <div className="mb-6 flex items-center gap-3">

              <span className="h-[2px] w-10 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                Strategic Importance
              </span>

            </div>

            <h2 className="text-3xl font-black sm:text-4xl">
              Why{" "}
              <span className="text-[#043927]">
                Dholera SIR
              </span>{" "}
              is Important
            </h2>

            <div className="mt-5 h-1 w-14 rounded-full bg-[#C9A45C]" />

            <p className="mt-7 text-sm leading-8 text-[#111111]/65 sm:text-base">
              Dholera&apos;s significance comes from its combination of
              large-scale planned development, industrial infrastructure and
              strategic connectivity within the DMIC framework.
            </p>

            <p className="mt-5 text-sm leading-8 text-[#111111]/65 sm:text-base">
              The development aims to create an integrated ecosystem where
              industry, infrastructure, technology, logistics and urban
              development come together in a planned environment.
            </p>

            {/* Ecosystem */}

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

              {[
                "Industry",
                "Infrastructure",
                "Technology",
                "Logistics",
                "Urban Development",
              ].map((item) => (

                <div
                  key={item}
                  className="rounded-xl border border-[#043927]/10 bg-[#fafafa] px-4 py-4 text-center"
                >
                  <p className="text-sm font-bold text-[#043927]">
                    {item}
                  </p>
                </div>

              ))}

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          FINAL STATEMENT
      ====================================================== */}

      <section className="bg-[#043927] py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">

          <div className="mb-5 flex items-center justify-center gap-3">

            <span className="h-[2px] w-10 bg-[#C9A45C]" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A45C]">
              DMIC &amp; Dholera
            </span>

            <span className="h-[2px] w-10 bg-[#C9A45C]" />

          </div>

          <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            A Strategic Industrial Destination{" "}
            <span className="text-[#C9A45C]">
              within DMIC
            </span>
          </h2>

          <div className="mx-auto mt-6 h-1 w-14 bg-[#C9A45C]" />

          <blockquote className="mt-7 text-base font-medium leading-8 text-white/70 sm:text-lg sm:leading-9">
            “Dholera SIR represents Gujarat&apos;s major greenfield
            industrial development within the Delhi–Mumbai Industrial
            Corridor, designed to support advanced manufacturing, technology,
            logistics and future-oriented economic growth.”
          </blockquote>

        </div>

      </section>

    </main>
  );
}