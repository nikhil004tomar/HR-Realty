"use client";

import {
  ArrowRight,
  Building2,
  Boxes,
  Factory,
  Globe2,
  MapPin,
  Package,
  Plane,
  Route,
  Ship,
  TrainFront,
  Truck,
  Warehouse,
  Zap,
} from "lucide-react";
import Link from "next/link";

const freightFlow = [
  {
    icon: Package,
    title: "Raw Materials",
  },
  {
    icon: Factory,
    title: "Dholera Industries",
  },
  {
    icon: Building2,
    title: "Manufacturing & Processing",
  },
  {
    icon: Warehouse,
    title: "Logistics & Warehousing",
  },
  {
    icon: Ship,
    title: "Markets & Ports",
  },
  {
    icon: Globe2,
    title: "Domestic & International Trade",
  },
];

const industrialAreas = [
  {
    icon: Factory,
    title: "Advanced Manufacturing",
    description:
      "Supporting large-scale industrial and manufacturing activities.",
  },
  {
    icon: Boxes,
    title: "Semiconductor & Electronics",
    description:
      "Infrastructure for technology-oriented and high-value industries.",
  },
  {
    icon: Route,
    title: "Aerospace & Defence",
    description:
      "Supporting specialized manufacturing and strategic industries.",
  },
  {
    icon: Zap,
    title: "Renewable Energy",
    description:
      "Supporting future-focused and sustainable industrial development.",
  },
  {
    icon: Building2,
    title: "Engineering & Industrial Manufacturing",
    description:
      "Supporting engineering, machinery and industrial production.",
  },
  {
    icon: Warehouse,
    title: "Logistics & Warehousing",
    description:
      "Integrated logistics infrastructure for modern supply chains.",
  },
];

const freightBenefits = [
  {
    icon: TrainFront,
    title: "Higher Freight Capacity",
    description:
      "Improved capability for large-scale movement of industrial goods.",
  },
  {
    icon: Truck,
    title: "Industrial Logistics",
    description:
      "Efficient transportation of raw materials and finished products.",
  },
  {
    icon: Ship,
    title: "Port Connectivity",
    description:
      "Better integration between industrial regions and maritime gateways.",
  },
  {
    icon: Route,
    title: "Supply-Chain Efficiency",
    description:
      "Supporting businesses that depend on reliable freight transportation.",
  },
  {
    icon: Globe2,
    title: "Market Access",
    description:
      "Connecting industrial production with regional, national and international markets.",
  },
];

const infrastructure = [
  {
    icon: TrainFront,
    title: "Freight Connectivity",
    description:
      "Integration with the wider DMIC and logistics network.",
  },
  {
    icon: Factory,
    title: "Industrial Infrastructure",
    description:
      "Planned zones for manufacturing and technology-oriented industries.",
  },
  {
    icon: Route,
    title: "Road Connectivity",
    description:
      "Connections to regional and national transportation networks.",
  },
  {
    icon: Plane,
    title: "Airport Connectivity",
    description:
      "Dholera International Airport supporting future air connectivity.",
  },
  {
    icon: Zap,
    title: "Utilities",
    description:
      "Planned power, water and other essential infrastructure.",
  },
  {
    icon: Globe2,
    title: "Smart Infrastructure",
    description:
      "Technology-enabled systems supporting modern industrial and urban development.",
  },
];

export default function DFC() {
  return (
    <main className="overflow-hidden bg-white text-[#111111]">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative bg-[#043927]">
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(4,57,39,1),rgba(4,57,39,0.94),rgba(4,57,39,0.82))]" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-12 bg-[#C9A45C]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A45C]">
                DFC & Dholera SIR
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Dedicated Freight Corridor{" "}
              <span className="text-[#C9A45C]">&amp;</span>
              <br />
              Dholera SIR
            </h1>

            <div className="mt-6 h-1 w-16 rounded-full bg-[#C9A45C]" />

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl">
              Connecting Industry, Logistics &amp; Markets
            </p>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/60 sm:text-base">
              The Dedicated Freight Corridor is a high-capacity railway
              network developed to enable faster and more efficient movement
              of freight across India. The Western Dedicated Freight Corridor
              is particularly significant to Gujarat&apos;s industrial and
              logistics ecosystem.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dmic"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#b58f4d]"
              >
                Explore DMIC
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/maps"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-[#C9A45C] hover:text-[#C9A45C]"
              >
                Explore Dholera
                <MapPin size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRODUCTION
      ========================================================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-[#C9A45C]" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#043927]">
                  Freight Connectivity
                </span>
              </div>

              <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Connecting{" "}
                <span className="text-[#043927]">
                  Industry, Logistics
                </span>{" "}
                &amp; Markets
              </h2>

              <div className="mt-5 h-1 w-14 rounded-full bg-[#C9A45C]" />
            </div>

            <div className="space-y-5 text-base leading-8 text-black/60">
              <p>
                The <strong className="text-[#111111]">Dedicated Freight Corridor (DFC)</strong>{" "}
                is a high-capacity railway network developed to enable faster
                and more efficient movement of freight across India.
              </p>

              <p>
                The <strong className="text-[#111111]">Western Dedicated Freight Corridor (WDFC)</strong>{" "}
                is particularly significant to Gujarat&apos;s industrial and
                logistics ecosystem, connecting major industrial regions with
                important markets and ports.
              </p>

              <p>
                Dholera SIR is a major industrial node within the
                <strong className="text-[#043927]">
                  {" "}Delhi–Mumbai Industrial Corridor (DMIC)
                </strong>
                . The wider DMIC ecosystem is supported by the Western DFC,
                creating an integrated framework for industrial development
                and freight connectivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          DFC + DHOLERA
      ========================================================= */}
      <section className="bg-[#f7f7f4] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#C9A45C]" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#043927]">
                DFC &amp; Dholera SIR
              </span>
              <span className="h-px w-10 bg-[#C9A45C]" />
            </div>

            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Supporting the{" "}
              <span className="text-[#043927]">
                Industrial Supply Chain
              </span>
            </h2>

            <p className="mt-5 text-base leading-7 text-black/60">
              Efficient freight transportation is important for moving raw
              materials, machinery and finished products between manufacturing
              facilities, logistics centres, markets and ports.
            </p>
          </div>

          {/* Flow */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {freightFlow.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="relative">
                  <div className="h-full rounded-2xl border border-black/10 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C] hover:shadow-md">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#043927]/5 text-[#043927]">
                      <Icon size={23} strokeWidth={1.8} />
                    </div>

                    <p className="mt-4 text-sm font-bold leading-6 text-[#111111]">
                      {item.title}
                    </p>
                  </div>

                  {index < freightFlow.length - 1 && (
                    <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-[#C9A45C] lg:block">
                      <ArrowRight size={18} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          DHOLERA INDUSTRIAL GROWTH
      ========================================================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          
          <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-[#C9A45C]" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#043927]">
                  Industrial Growth
                </span>
              </div>

              <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Dholera SIR &amp;{" "}
                <span className="text-[#043927]">
                  Industrial Development
                </span>
              </h2>

              <div className="mt-5 h-1 w-14 rounded-full bg-[#C9A45C]" />

              <p className="mt-7 text-base leading-8 text-black/60">
                Dholera SIR is being developed as a planned greenfield
                industrial region with modern infrastructure for
                manufacturing, technology and other high-value industries.
              </p>

              <div className="mt-8 rounded-2xl border-l-4 border-[#C9A45C] bg-[#f7f7f4] p-6">
                <p className="text-sm font-semibold leading-7 text-[#043927]">
                  Efficient freight and logistics connectivity can support
                  these industries by facilitating the movement of materials
                  and products.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {industrialAreas.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C] hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#043927]/5 text-[#043927] transition-colors duration-300 group-hover:bg-[#043927] group-hover:text-white">
                      <Icon size={21} strokeWidth={1.8} />
                    </div>

                    <h3 className="mt-5 text-base font-bold text-[#111111]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-black/55">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          DFC + DMIC + DHOLERA
      ========================================================= */}
      <section className="bg-[#043927] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A45C]">
                Integrated Ecosystem
              </span>

              <span className="h-px w-10 bg-[#C9A45C]" />
            </div>

            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              DFC + DMIC +{" "}
              <span className="text-[#C9A45C]">
                Dholera SIR
              </span>
            </h2>

            <p className="mt-5 text-base leading-7 text-white/65">
              An integrated industrial ecosystem connecting industrial
              production with transportation, logistics and markets.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7 text-center transition-all duration-300 hover:border-[#C9A45C]/50 hover:bg-white/10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C9A45C]/15 text-[#C9A45C]">
                <TrainFront size={28} />
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-[#C9A45C]">
                DFC
              </p>

              <h3 className="mt-2 text-xl font-bold text-white">
                Freight Connectivity
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/55">
                Dedicated infrastructure designed to support efficient freight
                movement.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-7 text-center transition-all duration-300 hover:border-[#C9A45C]/50 hover:bg-white/10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C9A45C]/15 text-[#C9A45C]">
                <Factory size={28} />
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-[#C9A45C]">
                DMIC
              </p>

              <h3 className="mt-2 text-xl font-bold text-white">
                Industrial Corridor
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/55">
                A major industrial-development framework connecting production,
                infrastructure and markets.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-7 text-center transition-all duration-300 hover:border-[#C9A45C]/50 hover:bg-white/10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C9A45C]/15 text-[#C9A45C]">
                <MapPin size={28} />
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-[#C9A45C]">
                Dholera SIR
              </p>

              <h3 className="mt-2 text-xl font-bold text-white">
                Planned Industrial Hub
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/55">
                A planned greenfield industrial region within the DMIC
                ecosystem.
              </p>
            </div>

          </div>

          <div className="mx-auto mt-10 max-w-4xl text-center">
            <p className="text-lg font-medium leading-8 text-white/80">
              Together, they create a broader ecosystem connecting{" "}
              <span className="text-[#C9A45C]">
                industrial production
              </span>{" "}
              with transportation, logistics and markets.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY FREIGHT CONNECTIVITY MATTERS
      ========================================================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#043927]">
                Key Benefits
              </span>

              <span className="h-px w-10 bg-[#C9A45C]" />
            </div>

            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Why Freight{" "}
              <span className="text-[#043927]">
                Connectivity Matters
              </span>
            </h2>

            <p className="mt-5 text-base leading-7 text-black/60">
              Modern industrial regions depend on efficient supply chains.
              Dedicated freight infrastructure can support multiple aspects of
              industrial logistics.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {freightBenefits.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C] hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#043927]/5 text-[#043927]">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 text-base font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-black/55">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          DHOLERA INFRASTRUCTURE ECOSYSTEM
      ========================================================= */}
      <section className="bg-[#f7f7f4] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          
          <div className="grid items-start gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-[#C9A45C]" />

                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#043927]">
                  Infrastructure
                </span>
              </div>

              <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Dholera&apos;s Strategic{" "}
                <span className="text-[#043927]">
                  Infrastructure Ecosystem
                </span>
              </h2>

              <div className="mt-5 h-1 w-14 rounded-full bg-[#C9A45C]" />

              <p className="mt-7 text-base leading-8 text-black/60">
                Dholera&apos;s development is supported by multiple
                infrastructure components designed to support industrial,
                logistics and urban development.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {infrastructure.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group flex gap-4 rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C] hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#043927] text-white transition-colors duration-300 group-hover:bg-[#C9A45C]">
                      <Icon size={20} />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-[#111111]">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 text-sm leading-6 text-black/55">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL STATEMENT
      ========================================================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#043927]/5 text-[#C9A45C]">
            <TrainFront size={28} />
          </div>

          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#C9A45C]" />

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#043927]">
              Building the Future
            </span>

            <span className="h-px w-10 bg-[#C9A45C]" />
          </div>

          <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            DFC &amp; Dholera SIR —{" "}
            <span className="text-[#043927]">
              Building the Future of Freight-Driven Industry
            </span>
          </h2>

          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-[#C9A45C]" />

          <blockquote className="mt-8 text-base leading-8 text-black/60 sm:text-lg sm:leading-9">
            “The Western Dedicated Freight Corridor strengthens India&apos;s
            freight transportation network, while Dholera SIR is being
            developed as a major industrial node within the DMIC ecosystem.
            Together, industrial development and improved freight connectivity
            can support manufacturing, logistics, supply chains and long-term
            economic activity.”
          </blockquote>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-black/10 bg-[#f7f7f4] px-5 py-5">
              <TrainFront
                className="mx-auto text-[#043927]"
                size={25}
              />
              <p className="mt-3 text-sm font-bold text-[#111111]">
                DFC — Freight Connectivity
              </p>
            </div>

            <div className="rounded-xl border border-black/10 bg-[#f7f7f4] px-5 py-5">
              <Factory
                className="mx-auto text-[#043927]"
                size={25}
              />
              <p className="mt-3 text-sm font-bold text-[#111111]">
                DMIC — Industrial Corridor
              </p>
            </div>

            <div className="rounded-xl border border-black/10 bg-[#f7f7f4] px-5 py-5">
              <Globe2
                className="mx-auto text-[#043927]"
                size={25}
              />
              <p className="mt-3 text-sm font-bold text-[#111111]">
                Dholera SIR — Planned Industrial Hub
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#043927] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#032d20]"
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