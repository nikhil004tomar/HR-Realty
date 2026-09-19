import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Plane,
  Cpu,
  Route,
  TrainFront,
  Sun,
  Building2,
  Factory,
  Ship,
  CheckCircle2,
  MapPin,
} from "lucide-react";

type StatusType = "yellow" | "green" | "blue";

type Project = {
  number: string;
  title: string;
  status: string;
  statusType: StatusType;
  sector: string;
  description: string;
  details: string;
  meta: {
    label: string;
    value: string;
  }[];
  features?: string[];
  benefits?: string[];
  icon: React.ElementType;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Dholera International Airport",
    status: "Under Construction / Near Completion",
    statusType: "yellow",
    sector: "Aviation & Logistics",
    icon: Plane,
    description:
      "Dholera International Airport is being developed as a major aviation gateway for Dholera SIR. The airport is being integrated with the region's manufacturing ecosystem and planned multimodal connectivity.",
    details:
      "As of July 2026, approximately 80% of overall construction was reported complete. The primary runway, taxiway and ATC tower had reached 100% completion, while construction of the passenger terminal and cargo facilities was continuing. The passenger terminal is planned with an annual capacity of approximately 2 million passengers, alongside a dedicated cargo terminal.",
    meta: [
      {
        label: "Developer",
        value: "Dholera International Airport Company Limited",
      },
    ],
    features: [
      "International airport infrastructure",
      "Passenger terminal",
      "Dedicated cargo terminal",
      "Direct road connectivity",
      "Planned connection with the semi-high-speed rail corridor",
      "Designed to support Dholera's industrial and semiconductor ecosystem",
    ],
  },

  {
    number: "02",
    title: "Tata Electronics Semiconductor Fab",
    status: "Under Construction",
    statusType: "yellow",
    sector: "Semiconductor Manufacturing",
    icon: Cpu,
    description:
      "Tata Electronics' semiconductor fabrication facility is one of the flagship industrial developments in Dholera.",
    details:
      "The project is being developed as India's first commercial semiconductor fabrication facility, with a planned manufacturing capacity of approximately 50,000 wafers per month. The project is expected to create significant direct and indirect employment and support semiconductor applications across automotive, computing, communications and other technology sectors.",
    meta: [
      {
        label: "Investment",
        value: "Approximately ₹91,526 crore",
      },
      {
        label: "Manufacturing",
        value: "300mm Semiconductor Fab",
      },
    ],
    features: [
      "300mm wafer manufacturing",
      "Advanced semiconductor fabrication",
      "Automotive semiconductor applications",
      "Computing and communications",
      "Semiconductor ecosystem development",
      "Supporting technology and supplier industries",
    ],
  },

  {
    number: "03",
    title: "Ahmedabad–Dholera Expressway",
    status: "Opened / Operational Readiness Phase",
    statusType: "green",
    sector: "Road Infrastructure",
    icon: Route,
    description:
      "The Ahmedabad–Dholera Greenfield Expressway provides high-speed road connectivity between Ahmedabad and Dholera SIR.",
    details:
      "The Government reported in February 2026 that the expressway had been opened to the public for testing while final operational readiness was being assessed. The corridor also provides connectivity toward Dholera International Airport.",
    meta: [
      {
        label: "Length",
        value: "Approximately 109 km",
      },
      {
        label: "Project Cost",
        value: "Approximately ₹5,800 crore",
      },
    ],
    features: [
      "Approximately 109 km corridor",
      "Six-lane greenfield expressway",
      "Direct Dholera connectivity",
      "Airport interchange",
      "Multiple interchanges and underpasses",
      "Designed to reduce travel time between Ahmedabad and Dholera",
    ],
  },

  {
    number: "04",
    title: "Ahmedabad–Dholera Semi High-Speed Rail",
    status: "Approved / Upcoming",
    statusType: "blue",
    sector: "Rail & Public Transportation",
    icon: TrainFront,
    description:
      "The Ahmedabad (Sarkhej)–Dholera Semi High-Speed Double Line project has been approved by the Government of India.",
    details:
      "The railway corridor is planned to connect Ahmedabad, Dholera SIR, Dholera International Airport and the Lothal National Maritime Heritage Complex, providing faster passenger connectivity to the region.",
    meta: [
      {
        label: "Length",
        value: "Approximately 134 km",
      },
      {
        label: "Approved Cost",
        value: "Approximately ₹20,667 crore",
      },
      {
        label: "Target Completion",
        value: "2030–31",
      },
    ],
    features: [
      "Approximately 134 km rail corridor",
      "Double-line semi-high-speed railway",
      "Ahmedabad–Dholera connectivity",
      "Airport connectivity",
      "Connection toward Lothal",
      "Improved commuting and industrial mobility",
    ],
  },

  {
    number: "05",
    title: "Dholera Solar Park",
    status: "Partially Operational / Further Development",
    statusType: "green",
    sector: "Renewable Energy",
    icon: Sun,
    description:
      "Renewable energy is an important component of Dholera's industrial infrastructure.",
    details:
      "The Dholera development plan includes a 1,000 MW solar park, of which 300 MW had been commissioned according to NICDC's project reporting.",
    meta: [
      {
        label: "Planned Capacity",
        value: "1,000 MW",
      },
      {
        label: "Commissioned",
        value: "300 MW",
      },
    ],
    features: [
      "Large-scale solar generation",
      "Renewable energy supply",
      "Support for industrial development",
      "Potential for further capacity expansion",
    ],
  },

  {
    number: "06",
    title: "Dholera Activation Area Infrastructure",
    status: "Ongoing Development",
    statusType: "yellow",
    sector: "Urban & Industrial Infrastructure",
    icon: Building2,
    description:
      "The Activation Area forms the initial developed zone within Dholera SIR.",
    details:
      "Infrastructure development includes roads, utilities, water supply, drainage, power infrastructure and other trunk infrastructure required to support industrial and urban development. NICDC has reported approved infrastructure packages for the Activation Area and development of the core infrastructure network.",
    meta: [
      {
        label: "Development",
        value: "Activation Area",
      },
      {
        label: "Sector",
        value: "Urban & Industrial Infrastructure",
      },
    ],
    features: [
      "Roads",
      "Water supply",
      "Storm-water drainage",
      "Underground utilities",
      "Power infrastructure",
      "Industrial infrastructure",
      "Urban services",
      "Green spaces and public infrastructure",
    ],
  },

  {
    number: "07",
    title: "Semiconductor Ecosystem & Supporting Industries",
    status: "Approved / Emerging",
    statusType: "blue",
    sector: "Semiconductor & Electronics",
    icon: Cpu,
    description:
      "Dholera's semiconductor ecosystem is expanding beyond the main Tata fab.",
    details:
      "In May 2026, the Government approved a project by Crystal Matrix Limited for an integrated compound-semiconductor fabrication and ATMP facility in Dholera, focused on Mini/Micro-LED display modules. The two newly approved Gujarat semiconductor projects announced at that time represented cumulative investment of approximately ₹3,936 crore.",
    meta: [
      {
        label: "Focus",
        value: "Compound Semiconductor & ATMP",
      },
      {
        label: "Sector",
        value: "Semiconductor & Electronics",
      },
    ],
    features: [
      "Compound-semiconductor fabrication",
      "ATMP facility",
      "Mini/Micro-LED display modules",
      "Technology partnerships",
      "Supporting semiconductor industries",
    ],
  },

  {
    number: "08",
    title: "Industrial Manufacturing Development",
    status: "Ongoing / Upcoming",
    statusType: "yellow",
    sector: "Industrial Manufacturing",
    icon: Factory,
    description:
      "Dholera SIR is planned as a major manufacturing destination with industrial land and supporting infrastructure for large-scale businesses.",
    details:
      "The industrial ecosystem is intended to support sectors such as semiconductors, electronics, renewable energy, engineering, automotive, aerospace & defence, advanced manufacturing, chemicals, logistics and technology industries.",
    meta: [
      {
        label: "Development",
        value: "Industrial Ecosystem",
      },
      {
        label: "Sector",
        value: "Industrial Manufacturing",
      },
    ],
    features: [
      "Semiconductors",
      "Electronics",
      "Renewable energy",
      "Engineering",
      "Automotive",
      "Aerospace & defence",
      "Advanced manufacturing",
      "Chemicals",
      "Logistics",
      "Technology industries",
    ],
  },

  {
    number: "09",
    title: "Bhimnath–Dholera Freight Rail Connectivity",
    status: "Planned / Development Stage",
    statusType: "blue",
    sector: "Freight & Logistics",
    icon: Ship,
    description:
      "The Bhimnath–Dholera rail connection is intended to strengthen freight connectivity for Dholera SIR and connect the industrial region with the broader railway and freight network.",
    details:
      "NICDC project documentation identifies the Bhimnath–Dholera Rail Line as an approved component of Dholera's external connectivity planning.",
    meta: [
      {
        label: "Development",
        value: "External Connectivity",
      },
      {
        label: "Sector",
        value: "Freight & Logistics",
      },
    ],
    benefits: [
      "Industrial freight movement",
      "Better logistics connectivity",
      "Support for manufacturing industries",
      "Improved connection with national rail networks",
    ],
  },
];

const statusStyles: Record<
  StatusType,
  {
    dot: string;
    text: string;
    background: string;
    border: string;
  }
> = {
  yellow: {
    dot: "bg-[#C9A45C]",
    text: "text-[#8a6b20]",
    background: "bg-[#C9A45C]/10",
    border: "border-[#C9A45C]/30",
  },
  green: {
    dot: "bg-green-600",
    text: "text-green-700",
    background: "bg-green-50",
    border: "border-green-200",
  },
  blue: {
    dot: "bg-blue-600",
    text: "text-blue-700",
    background: "bg-blue-50",
    border: "border-blue-200",
  },
};

export default function RunningCompletedProjectsPage() {
  return (
    <main className="bg-white text-[#111111]">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#043927]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(201,164,92,0.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="max-w-4xl">

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A45C]">
                Dholera SIR Development
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Running & Upcoming
              <span className="block text-[#C9A45C]">
                Projects in Dholera SIR
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
              Dholera Special Investment Region (DSIR) is being developed as
              a large-scale industrial and smart-city destination with
              integrated infrastructure for manufacturing, semiconductors,
              aviation, logistics, renewable energy and urban development.
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/60 sm:text-base">
              The region is supported by major investments in transportation,
              industrial infrastructure, energy and advanced manufacturing.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-[#C9A45C] px-6 py-3.5 text-sm font-bold text-[#111111] transition hover:bg-white"
              >
                Explore Projects
                <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                href="/#inquiry-form"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition hover:border-[#C9A45C] hover:bg-[#C9A45C] hover:text-[#111111]"
              >
                Book Site Visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}
      <section className="bg-white py-14 sm:py-18 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                Major Development
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                Infrastructure shaping the{" "}
                <span className="text-[#043927]">
                  future of Dholera
                </span>
              </h2>

              <div className="mt-5 h-1 w-14 rounded-full bg-[#C9A45C]" />
            </div>

            <p className="text-base leading-8 text-black/60 sm:text-lg">
              From aviation and high-speed road connectivity to
              semiconductor manufacturing, renewable energy and industrial
              infrastructure, major projects are being developed across
              Dholera SIR.
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECTS
      ====================================================== */}
      <section
        id="projects"
        className="scroll-mt-24 bg-[#fafaf8] py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          {/* SECTION HEADER */}
          <div className="mb-12 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                Projects
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
              Running & Upcoming{" "}
              <span className="text-[#043927]">
                Developments
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-black/55 sm:text-base">
              Explore the major infrastructure, industrial, transportation
              and energy projects supporting the development of Dholera SIR.
            </p>
          </div>

          {/* PROJECT LIST */}
          <div className="space-y-8">

            {projects.map((project) => {
              const Icon = project.icon;
              const status = statusStyles[project.statusType];

              return (
                <article
                  key={project.number}
                  className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#C9A45C]/60 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
                >
                  {/* TOP GREEN BAR */}
                  <div className="h-1 bg-[#043927]" />

                  <div className="p-6 sm:p-8 lg:p-10">

                    {/* HEADER */}
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                      <div className="flex gap-4">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#043927]/5 text-[#043927]">
                          <Icon className="h-7 w-7" />
                        </div>

                        <div>

                          <div className="mb-2 flex items-center gap-3">
                            <span className="text-xs font-bold tracking-[0.18em] text-[#C9A45C]">
                              {project.number}
                            </span>

                            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#043927]">
                              {project.sector}
                            </span>
                          </div>

                          <h3 className="text-2xl font-bold leading-tight sm:text-3xl">
                            {project.title}
                          </h3>

                        </div>
                      </div>

                      {/* STATUS */}
                      <div
                        className={`flex w-fit items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold ${status.background} ${status.border} ${status.text}`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${status.dot}`}
                        />

                        {project.status}
                      </div>

                    </div>

                    {/* BODY */}
                    <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">

                      {/* DESCRIPTION */}
                      <div>

                        <p className="text-base font-medium leading-8 text-[#043927]">
                          {project.description}
                        </p>

                        <p className="mt-5 text-sm leading-7 text-black/60 sm:text-base">
                          {project.details}
                        </p>

                        {/* META */}
                        {project.meta.length > 0 && (
                          <div className="mt-7 grid gap-3 sm:grid-cols-2">
                            {project.meta.map((item) => (
                              <div
                                key={`${item.label}-${item.value}`}
                                className="rounded-xl border border-black/10 bg-[#fafaf8] px-4 py-4"
                              >
                                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/40">
                                  {item.label}
                                </p>

                                <p className="mt-1 text-sm font-semibold leading-6 text-[#111111]">
                                  {item.value}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                      </div>

                      {/* FEATURES / BENEFITS */}
                      <div className="rounded-2xl border border-[#043927]/10 bg-[#043927]/[0.025] p-6">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C9A45C]/15 text-[#043927]">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>

                          <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[#043927]">
                            {project.benefits
                              ? "Expected Benefits"
                              : "Key Features"}
                          </h4>

                        </div>

                        <ul className="mt-5 space-y-3">

                          {(project.features || project.benefits || []).map(
                            (item) => (
                              <li
                                key={item}
                                className="flex items-start gap-3 text-sm leading-6 text-black/65"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A45C]" />

                                <span>{item}</span>
                              </li>
                            ),
                          )}

                        </ul>

                      </div>

                    </div>
                  </div>
                </article>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK OVERVIEW
      ====================================================== */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="mx-auto mb-10 max-w-3xl text-center">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
              At a Glance
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Major Projects Overview
            </h2>

            <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-[#C9A45C]" />

          </div>

          <div className="overflow-hidden rounded-2xl border border-black/10">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[760px] border-collapse text-left">

                <thead>
                  <tr className="bg-[#043927] text-white">
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider">
                      Project
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider">
                      Status
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider">
                      Sector
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map((project, index) => {
                    const status =
                      statusStyles[project.statusType];

                    return (
                      <tr
                        key={project.number}
                        className={`border-t border-black/5 ${
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-[#fafaf8]"
                        }`}
                      >

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">

                            <span className="text-xs font-bold text-[#C9A45C]">
                              {project.number}
                            </span>

                            <span className="font-semibold">
                              {project.title}
                            </span>

                          </div>
                        </td>

                        <td className="px-5 py-4">

                          <span
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.background} ${status.border} ${status.text}`}
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${status.dot}`}
                            />

                            {project.status}
                          </span>

                        </td>

                        <td className="px-5 py-4 text-sm text-black/60">
                          {project.sector}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>

              </table>

            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          INDUSTRIAL ECOSYSTEM
      ====================================================== */}
      <section className="bg-[#043927] py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

            {/* CONTENT */}
            <div>

              <div className="flex items-center gap-3">

                <span className="h-px w-10 bg-[#C9A45C]" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A45C]">
                  Dholera's Emerging Industrial Ecosystem
                </span>

              </div>

              <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                An integrated ecosystem for{" "}
                <span className="text-[#C9A45C]">
                  future industries
                </span>
              </h2>

              <p className="mt-6 text-base leading-8 text-white/70">
                Together, these projects are creating an integrated ecosystem
                around manufacturing + semiconductors + aviation + logistics +
                renewable energy + smart urban infrastructure.
              </p>

              <p className="mt-5 text-sm leading-7 text-white/55">
                The combination of the semiconductor fab, airport, expressway,
                rail connectivity and industrial infrastructure is intended
                to strengthen Dholera's position as a major manufacturing and
                investment region.
              </p>

            </div>

            {/* ECOSYSTEM CARDS */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

              {[
                {
                  icon: Factory,
                  title: "Manufacturing",
                },
                {
                  icon: Cpu,
                  title: "Semiconductors",
                },
                {
                  icon: Plane,
                  title: "Aviation",
                },
                {
                  icon: Ship,
                  title: "Logistics",
                },
                {
                  icon: Sun,
                  title: "Renewable Energy",
                },
                {
                  icon: Building2,
                  title: "Smart Infrastructure",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#C9A45C]/60 hover:bg-white/[0.08]"
                  >
                    <Icon className="h-6 w-6 text-[#C9A45C]" />

                    <p className="mt-4 text-sm font-semibold text-white">
                      {item.title}
                    </p>
                  </div>
                );
              })}

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">

          <div className="rounded-3xl bg-[#f7f5ef] p-8 text-center sm:p-12 lg:p-16">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#043927] text-[#C9A45C]">
              <MapPin className="h-5 w-5" />
            </div>

            <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
              Explore Opportunities in Dholera SIR
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
              Discover projects, infrastructure and land opportunities
              developing across the Dholera Special Investment Region.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-[#043927] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#C9A45C] hover:text-[#111111]"
              >
                Explore Our Projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/#inquiry-form"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3.5 text-sm font-bold transition hover:border-[#043927] hover:bg-[#043927] hover:text-white"
              >
                Book Your Site Visit
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
}