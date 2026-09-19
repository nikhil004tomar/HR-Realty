"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  Factory,
  GitBranch,
  Globe2,
  Landmark,
  Network,
  Route,
  Truck,
} from "lucide-react";

const gidbRoles = [
  {
    icon: Landmark,
    title: "Special Investment Regions",
    description:
      "Providing the apex-level framework for the planned development of Gujarat’s Special Investment Regions.",
  },
  {
    icon: Network,
    title: "Infrastructure Planning",
    description:
      "Supporting strategic planning and coordination of major infrastructure projects across multiple sectors.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Public-Private Partnerships",
    description:
      "Facilitating infrastructure projects involving government and private-sector participation.",
  },
  {
    icon: GitBranch,
    title: "Project Facilitation",
    description:
      "Supporting project preparation, feasibility, structuring, implementation and coordination.",
  },
  {
    icon: Factory,
    title: "Industrial Development",
    description:
      "Contributing to the infrastructure ecosystem required for large-scale industrial and economic activity.",
  },
  {
    icon: Truck,
    title: "Connectivity & Logistics",
    description:
      "Supporting coordination around major connectivity, transportation and logistics initiatives.",
  },
];

const ecosystem = [
  {
    icon: Route,
    title: "DMIC",
    description: "Delhi–Mumbai Industrial Corridor",
  },
  {
    icon: Truck,
    title: "DFC",
    description: "Dedicated Freight Corridor",
  },
  {
    icon: Globe2,
    title: "Dholera International Airport",
    description: "Air connectivity",
  },
  {
    icon: Route,
    title: "Road Infrastructure",
    description: "Regional and national connectivity",
  },
  {
    icon: Network,
    title: "Smart Infrastructure",
    description: "ICT-enabled urban services",
  },
  {
    icon: Factory,
    title: "Industrial Infrastructure",
    description: "Manufacturing and investment ecosystem",
  },
  {
    icon: Truck,
    title: "Logistics Infrastructure",
    description: "Movement of goods and materials",
  },
];

const developmentFlow = [
  "GIDB",
  "Special Investment Region Framework",
  "Dholera SIR",
  "Integrated Infrastructure",
  "Industry & Manufacturing",
  "Business & Employment",
  "Economic Development",
];

export default function GIDB() {
  return (
    <main className="bg-white text-[#111111]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#043927]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C9A45C]/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="max-w-4xl">

            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A45C]">
                Gujarat Infrastructure Development Board
              </span>
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Driving Gujarat&apos;s{" "}
              <span className="text-[#C9A45C]">
                Infrastructure
              </span>{" "}
              &amp; Investment Ecosystem
            </h1>

            <div className="mt-7 h-1 w-16 rounded-full bg-[#C9A45C]" />

            <p className="mt-7 max-w-3xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8 lg:text-lg">
              The Gujarat Infrastructure Development Board (GIDB) is a
              statutory body of the Government of Gujarat established under
              the Gujarat Infrastructure Development Act, 1999. It plays a
              strategic role in infrastructure planning, project
              facilitation, public-private partnerships, and coordination
              of major infrastructure initiatives across Gujarat.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
                Established 1999
              </span>

              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
                Government of Gujarat
              </span>

              <span className="rounded-full border border-[#C9A45C]/40 bg-[#C9A45C]/10 px-4 py-2 text-xs font-semibold text-[#C9A45C]">
                SIR Apex Authority
              </span>
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="grid items-start gap-10 lg:grid-cols-[0.75fr_1.5fr] lg:gap-20">

            <div>
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-10 bg-[#C9A45C]" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                  GIDB
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
                Institutional Framework for{" "}
                <span className="text-[#043927]">
                  Infrastructure
                </span>
              </h2>

              <div className="mt-5 h-1 w-14 rounded-full bg-[#C9A45C]" />
            </div>

            <div className="space-y-5 text-sm leading-8 text-[#111111]/65 sm:text-base">

              <p>
                The Gujarat Infrastructure Development Board (GIDB) is a
                statutory body of the Government of Gujarat established under
                the Gujarat Infrastructure Development Act, 1999.
              </p>

              <p>
                It plays a strategic role in infrastructure planning, project
                facilitation, public-private partnerships, and coordination
                of major infrastructure initiatives across Gujarat.
              </p>

              <p>
                Under the Gujarat Special Investment Region Act, 2009, GIDB
                serves as the Apex Authority for Special Investment Regions
                (SIRs), supporting the framework for planned industrial and
                economic development.
              </p>

            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          GIDB & DHOLERA SIR
      ====================================================== */}

      <section className="bg-[#fafafa] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-[2px] w-10 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                GIDB &amp; Dholera SIR
              </span>

              <span className="h-[2px] w-10 bg-[#C9A45C]" />
            </div>

            <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">
              Supporting{" "}
              <span className="text-[#043927]">
                Planned Development
              </span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-[#111111]/60 sm:text-base sm:leading-8">
              Dholera SIR is part of Gujarat&apos;s long-term vision for
              planned industrial and economic development. GIDB&apos;s role
              as the Apex Authority for SIRs provides an institutional
              framework for development planning, land-use planning,
              development regulations, infrastructure coordination, and
              economic activities within the region.
            </p>

          </div>
        </div>
      </section>


      {/* =====================================================
          KEY AREAS OF GIDB ROLE
      ====================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="max-w-3xl">

            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                Key Areas
              </span>
            </div>

            <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">
              Key Areas of{" "}
              <span className="text-[#043927]">
                GIDB&apos;s Role
              </span>
            </h2>

            <div className="mt-5 h-1 w-14 rounded-full bg-[#C9A45C]" />
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {gidbRoles.map((role) => {
              const Icon = role.icon;

              return (
                <div
                  key={role.title}
                  className="group rounded-2xl border border-black/10 bg-white p-6 shadow-[0_6px_25px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C]/60 hover:shadow-[0_12px_35px_rgba(0,0,0,0.07)] sm:p-7"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#043927]/10">
                    <Icon
                      size={21}
                      className="text-[#043927]"
                      strokeWidth={2}
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#043927]">
                    {role.title}
                  </h3>

                  <div className="mt-3 h-[2px] w-10 bg-[#C9A45C] transition-all duration-300 group-hover:w-14" />

                  <p className="mt-4 text-sm leading-7 text-[#111111]/55">
                    {role.description}
                  </p>

                </div>
              );
            })}

          </div>
        </div>
      </section>


      {/* =====================================================
          GIDB & DHOLERA DEVELOPMENT FLOW
      ====================================================== */}

      <section className="bg-[#043927] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-[2px] w-10 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A45C]">
                GIDB &amp; Dholera
              </span>

              <span className="h-[2px] w-10 bg-[#C9A45C]" />
            </div>

            <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
              Building the Foundation for{" "}
              <span className="text-[#C9A45C]">
                Economic Development
              </span>
            </h2>

          </div>

          <div className="mt-12 flex flex-col items-center">

            {developmentFlow.map((item, index) => (
              <div
                key={item}
                className="flex w-full max-w-md flex-col items-center"
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
                    <ArrowRight
                      size={17}
                      className="rotate-90 text-[#C9A45C]"
                    />
                  </div>
                )}

              </div>
            ))}

          </div>
        </div>
      </section>


      {/* =====================================================
          INFRASTRUCTURE ECOSYSTEM
      ====================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-[2px] w-10 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                Infrastructure Ecosystem
              </span>

              <span className="h-[2px] w-10 bg-[#C9A45C]" />
            </div>

            <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">
              Connecting the{" "}
              <span className="text-[#043927]">
                Infrastructure Ecosystem
              </span>
            </h2>

            <div className="mx-auto mt-5 h-1 w-14 rounded-full bg-[#C9A45C]" />

            <p className="mt-5 text-sm leading-7 text-[#111111]/60 sm:text-base">
              Dholera&apos;s development is supported by a broader
              infrastructure ecosystem involving:
            </p>

          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {ecosystem.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-xl border border-black/10 bg-[#fafafa] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C]/60 hover:bg-white hover:shadow-md"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#043927]/10">
                    <Icon
                      size={19}
                      className="text-[#043927]"
                    />
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-[#043927]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#111111]/50">
                    {item.description}
                  </p>

                </div>
              );
            })}

          </div>
        </div>
      </section>


      {/* =====================================================
          INSTITUTIONAL FRAMEWORK
      ====================================================== */}

      <section className="bg-[#fafafa] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">

            <div>

              <div className="flex items-center gap-3">
                <span className="h-[2px] w-10 bg-[#C9A45C]" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                  Planned Development
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
                Institutional Framework for{" "}
                <span className="text-[#043927]">
                  Planned Development
                </span>
              </h2>

              <div className="mt-5 h-1 w-14 rounded-full bg-[#C9A45C]" />

            </div>

            <div className="space-y-5 text-sm leading-8 text-[#111111]/65 sm:text-base">

              <p>
                GIDB&apos;s role demonstrates the importance of coordinated
                planning in developing large-scale investment regions.
              </p>

              <p>
                Through the SIR framework, infrastructure, land use, town
                planning, economic activities and development regulations can
                be coordinated to support an integrated industrial and urban
                ecosystem.
              </p>

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          GIDB IN BRIEF
      ====================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">

          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)] sm:p-8 lg:p-10">

            <div className="mb-8">

              <div className="flex items-center gap-3">
                <span className="h-[2px] w-10 bg-[#C9A45C]" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                  Quick Overview
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                GIDB —{" "}
                <span className="text-[#043927]">
                  In Brief
                </span>
              </h2>

            </div>

            <div className="grid sm:grid-cols-2">

              <div className="border-b border-black/10 py-5 sm:pr-8">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">
                  Established
                </p>

                <p className="mt-2 text-lg font-bold text-[#043927]">
                  1999
                </p>
              </div>

              <div className="border-b border-black/10 py-5 sm:pl-8">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">
                  Government
                </p>

                <p className="mt-2 text-lg font-bold text-[#043927]">
                  Government of Gujarat
                </p>
              </div>

              <div className="border-b border-black/10 py-5 sm:border-b-0 sm:pr-8">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">
                  Primary Focus
                </p>

                <p className="mt-2 text-lg font-bold text-[#043927]">
                  Infrastructure &amp; investment development
                </p>
              </div>

              <div className="border-b border-black/10 py-5 sm:border-b-0 sm:border-l sm:pl-8">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">
                  SIR Role
                </p>

                <p className="mt-2 text-lg font-bold text-[#043927]">
                  Apex Authority for Special Investment Regions
                </p>
              </div>

              <div className="border-t border-black/10 py-5 sm:col-span-2">

                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">
                  Key Areas
                </p>

                <p className="mt-2 text-sm font-semibold leading-7 text-[#111111]/70">
                  Infrastructure planning, PPP, project facilitation,
                  coordination and SIR development
                </p>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          FINAL SECTION
      ====================================================== */}

      <section className="bg-[#043927] py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">

          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-[2px] w-10 bg-[#C9A45C]" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A45C]">
              GIDB &amp; Dholera
            </span>

            <span className="h-[2px] w-10 bg-[#C9A45C]" />
          </div>

          <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            Building the Foundation for{" "}
            <span className="text-[#C9A45C]">
              Tomorrow
            </span>
          </h2>

          <p className="mt-6 text-base font-medium leading-8 text-white/70 sm:text-lg">
            Strategic Planning. Integrated Infrastructure.
            Industrial Growth.
          </p>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
            GIDB forms an important part of Gujarat&apos;s institutional
            framework for developing future-ready investment regions such as
            Dholera SIR, bringing together planning, infrastructure,
            connectivity and economic development within a coordinated
            framework.
          </p>

        </div>

      </section>

    </main>
  );
}