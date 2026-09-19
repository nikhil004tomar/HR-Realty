"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  Globe2,
  Home,
  Landmark,
  Map,
  MapPin,
  Network,
  Plane,
  Route,
  ShieldCheck,
  TreePine,
  Users,
} from "lucide-react";

const whyDholera = [
  {
    number: "01",
    title: "Greenfield Development",
    icon: Building2,
    description:
      "Dholera is being developed as a greenfield city, allowing infrastructure and land-use planning to be designed from the beginning rather than retrofitting an old urban area.",
  },
  {
    number: "02",
    title: "DMIC Connectivity",
    icon: Network,
    description:
      "Dholera is one of the major industrial nodes associated with the Delhi–Mumbai Industrial Corridor, connecting the region to a larger national industrial and logistics network.",
  },
  {
    number: "03",
    title: "Planned Infrastructure",
    icon: Route,
    description:
      "The development framework includes planned roads, utilities, industrial areas, residential areas, commercial areas, public facilities, green spaces and other urban infrastructure.",
  },
  {
    number: "04",
    title: "Industrial Development",
    icon: Factory,
    description:
      "A central objective of Dholera SIR is to create an environment suitable for large-scale manufacturing and other industrial activities, supported by modern infrastructure.",
  },
  {
    number: "05",
    title: "Town Planning",
    icon: Map,
    description:
      "The region is organized through Town Planning Schemes rather than unplanned development, with different areas planned for different combinations of uses.",
  },
  {
    number: "06",
    title: "Strategic Location",
    icon: MapPin,
    description:
      "Dholera is located in Gujarat and is planned as an important industrial and logistics destination with connectivity to major regional and national infrastructure.",
  },
  {
    number: "07",
    title: "Future Urban Ecosystem",
    icon: Globe2,
    description:
      "The planning concept brings together industry, residential communities, commercial areas, logistics, public facilities, green areas, recreation and transportation infrastructure.",
  },
];

const ecosystem = [
  {
    icon: Factory,
    title: "Industrial Development",
  },
  {
    icon: Home,
    title: "Residential Communities",
  },
  {
    icon: Building2,
    title: "Commercial Areas",
  },
  {
    icon: Network,
    title: "Logistics",
  },
  {
    icon: Users,
    title: "Knowledge & IT",
  },
  {
    icon: Landmark,
    title: "Public Facilities",
  },
  {
    icon: TreePine,
    title: "Green Areas",
  },
  {
    icon: ShieldCheck,
    title: "Sports & Recreation",
  },
  {
    icon: Globe2,
    title: "Renewable Energy",
  },
  {
    icon: Route,
    title: "Transportation",
  },
];

const villages = [
  {
    number: 1,
    name: "Ambli",
    area: "—",
    tp: "TP-1",
    description:
      "One of the notified villages within Dholera SIR. It forms part of the northern side of the planned SIR area and is associated with Town Planning Scheme TP-1.",
  },
  {
    number: 2,
    name: "Bavaliyari",
    area: "111.27 sq. km.",
    tp: "TP-5 & TP-6",
    description:
      "One of the larger villages within the notified SIR area. It is associated with later-stage planning areas, particularly TP-5 and TP-6.",
  },
  {
    number: 3,
    name: "Bhadiyad",
    area: "—",
    tp: "TP-1 & TP-2",
    description:
      "An important revenue village associated with TP-1 and TP-2 within the planned town-planning network.",
  },
  {
    number: 4,
    name: "Bhangadh",
    area: "83.08 sq. km.",
    tp: "TP-4 & TP-6",
    description:
      "A large notified village associated with TP-4 and TP-6, forming part of the eastern and later planning areas.",
  },
  {
    number: 5,
    name: "Bhimtalav",
    area: "7.40 sq. km.",
    tp: "TP-2",
    description:
      "The smallest of the 22 notified villages by area. It is associated with TP-2 and is located close to the core development area.",
  },
  {
    number: 6,
    name: "Cher",
    area: "16.24 sq. km.",
    tp: "TP-3",
    description:
      "A smaller notified village associated with TP-3 and forming part of the planned expansion area of the SIR.",
  },
  {
    number: 7,
    name: "Dholera",
    area: "45.81 sq. km.",
    tp: "TP-2, TP-3 & TP-4",
    description:
      "The village from which the larger Dholera region takes its name. Parts of Dholera village fall within the Activation Area.",
  },
  {
    number: 8,
    name: "Gogla",
    area: "55.44 sq. km.",
    tp: "TP-1",
    description:
      "A notified village associated primarily with TP-1 and the planned development framework in the northern portion of the SIR.",
  },
  {
    number: 9,
    name: "Gorasu",
    area: "31.18 sq. km.",
    tp: "TP-2",
    description:
      "A notified village associated with TP-2 and the central planning framework around the Dholera development area.",
  },
  {
    number: 10,
    name: "Hebatpur",
    area: "72.66 sq. km.",
    tp: "TP-4, TP-5 & TP-6",
    description:
      "A relatively large village associated with multiple town-planning areas and the wider future development framework.",
  },
  {
    number: 11,
    name: "Kadipur",
    area: "27.35 sq. km.",
    tp: "TP-1 & TP-2",
    description:
      "Its association with two town-planning schemes places it within the broader planned urban and infrastructure network.",
  },
  {
    number: 12,
    name: "Khun",
    area: "38.30 sq. km.",
    tp: "TP-2",
    description:
      "A village forming part of the central Dholera planning framework. Parcel-level verification is necessary when determining specific land classifications.",
  },
  {
    number: 13,
    name: "Mahadevpura",
    area: "22.54 sq. km.",
    tp: "TP-4",
    description:
      "A notified village associated with TP-4 and the broader planned development area of Dholera SIR.",
  },
  {
    number: 14,
    name: "Mingalpur",
    area: "33.08 sq. km.",
    tp: "TP-6",
    description:
      "A village associated with TP-6 and the later town-planning framework of Dholera SIR.",
  },
  {
    number: 15,
    name: "Mundi",
    area: "17.81 sq. km.",
    tp: "TP-2, TP-3 & TP-4",
    description:
      "Associated with three town-planning schemes. Parts of Mundi are connected with the Activation Area framework.",
  },
  {
    number: 16,
    name: "Otariya",
    area: "18.10 sq. km.",
    tp: "TP-2 & TP-3",
    description:
      "A village within the central-to-expansion planning framework of Dholera SIR.",
  },
  {
    number: 17,
    name: "Panchi",
    area: "13.96 sq. km.",
    tp: "TP-3, TP-4 & TP-5",
    description:
      "One of the smaller notified villages, associated with multiple stages of the wider town-planning framework.",
  },
  {
    number: 18,
    name: "Rahatalav",
    area: "63.45 sq. km.",
    tp: "TP-2",
    description:
      "One of the larger notified villages, forming part of the broader central planning framework.",
  },
  {
    number: 19,
    name: "Sandhida",
    area: "18.64 sq. km.",
    tp: "TP-2, TP-3 & TP-4",
    description:
      "Associated with several town-planning areas and connected to the broader planned development framework.",
  },
  {
    number: 20,
    name: "Sangasar",
    area: "35.49 sq. km.",
    tp: "TP-3 & TP-5",
    description:
      "A notified village forming part of the planned expansion and development framework of the SIR.",
  },
  {
    number: 21,
    name: "Sodhi",
    area: "40.50 sq. km.",
    tp: "TP-3 & TP-5",
    description:
      "Associated with the wider TP-3 and TP-5 planning framework and the long-term planned development area.",
  },
  {
    number: 22,
    name: "Zankhi",
    area: "22.09 sq. km.",
    tp: "TP-4 & TP-6",
    description:
      "Associated with TP-4 and TP-6, placing it within the eastern and later-stage planning framework.",
  },
];

export default function DholeraSIR() {
  return (
    <main className="overflow-hidden bg-white text-[#111111]">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#043927]">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#C9A45C]/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            {/* Hero Content */}
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[#C9A45C]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A45C] sm:text-xs">
                  Dholera Special Investment Region
                </span>
              </div>

              <h1 className="text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Dholera{" "}
                <span className="text-[#C9A45C]">SIR</span>
              </h1>

              <div className="mt-6 flex items-center gap-2">
                <span className="h-[3px] w-14 rounded-full bg-[#C9A45C]" />
                <span className="h-[3px] w-7 rounded-full bg-white/60" />
              </div>

              <p className="mt-7 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                A large-scale, planned industrial and urban development region
                in Gujarat, designed around integrated infrastructure,
                manufacturing, business, residential development, logistics
                and supporting services.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#about-dholera"
                  className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-6 py-3.5 text-sm font-bold text-[#111111] transition-all duration-300 hover:bg-white"
                >
                  Explore Dholera SIR
                  <ArrowRight size={17} />
                </Link>

                <Link
                  href="#villages"
                  className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#043927]"
                >
                  Explore 22 Villages
                  <Map size={17} />
                </Link>
              </div>
            </div>

            {/* Hero Map */}
            <div className="relative mx-auto w-full max-w-[650px]">
              <div className="absolute -right-3 -top-3 h-full w-[94%] rounded-[2rem] border border-[#C9A45C]/30 sm:-right-5 sm:-top-5" />

              <div className="relative overflow-hidden rounded-[1.75rem] bg-white p-2 shadow-[0_25px_70px_rgba(0,0,0,0.18)] sm:p-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-[#f5f5f2]">
                  <Image
                    src="/images/DHOLERAMAP2.png"
                    alt="Dholera SIR location map"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-3 sm:p-5"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 px-3 py-3 sm:px-5 sm:py-4">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/40">
                      Region
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#043927]">
                      Dholera SIR
                    </p>
                  </div>

                  <div className="h-8 w-px bg-black/10" />

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/40">
                      Villages
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#111111]">
                      22 Revenue Villages
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 left-5 rounded-xl border border-[#C9A45C]/30 bg-white px-4 py-2.5 shadow-lg sm:left-8">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#C9A45C]" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#043927] sm:text-[10px]">
                    Planned Industrial City
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT IS DHOLERA SIR
      ====================================================== */}
      <section
        id="about-dholera"
        className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid items-start gap-10 lg:grid-cols-[0.75fr_1.5fr] lg:gap-20">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#C9A45C]" />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                  About Dholera SIR
                </p>
              </div>

              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                What is{" "}
                <span className="text-[#043927]">Dholera SIR?</span>
              </h2>

              <div className="mt-5 h-1 w-12 rounded-full bg-[#C9A45C]" />
            </div>

            <div className="space-y-6">
              <p className="text-base leading-8 text-black/60 sm:text-lg">
                Dholera Special Investment Region (Dholera SIR) is a
                large-scale, planned industrial and urban development region
                in Gujarat, being developed as a greenfield industrial city
                with integrated infrastructure for manufacturing, business,
                residential development, logistics and supporting services.
              </p>

              <p className="text-base leading-8 text-black/60 sm:text-lg">
                Dholera SIR forms an important part of the Delhi–Mumbai
                Industrial Corridor (DMIC) and is planned around modern
                infrastructure, multimodal connectivity, industrial
                development and sustainable urban planning.
              </p>

              <div className="rounded-2xl border border-[#C9A45C]/30 bg-[#043927]/[0.035] p-6 sm:p-8">
                <p className="text-base font-semibold leading-8 text-[#043927] sm:text-lg">
                  In simple words, Dholera SIR is being planned as a
                  new-generation industrial city where industry,
                  infrastructure, business, housing and urban amenities are
                  developed together through a planned framework.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          KEY FACTS
      ====================================================== */}
      <section className="bg-[#f7f7f5] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
              Dholera SIR at a Glance
            </span>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              A Region Built Around{" "}
              <span className="text-[#043927]">
                Planned Development
              </span>
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FactCard
              value="22"
              label="Revenue Villages"
              icon={<Map size={22} />}
            />

            <FactCard
              value="~879.34"
              label="Sq. Km. Original Notification"
              icon={<Landmark size={22} />}
            />

            <FactCard
              value="~920"
              label="Sq. Km. Broader Development Figure"
              icon={<Globe2 size={22} />}
            />

            <FactCard
              value="DMIC"
              label="Industrial Corridor"
              icon={<Network size={22} />}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          IMPORTANT DISTINCTION
      ====================================================== */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-3xl border border-[#043927]/10 bg-white shadow-[0_15px_50px_rgba(17,17,17,0.07)]">
            <div className="bg-[#043927] px-6 py-7 sm:px-10 sm:py-9">
              <div className="flex items-center gap-3">
                <MapPin className="text-[#C9A45C]" size={25} />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A45C]">
                  Important Distinction
                </p>
              </div>

              <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl">
                Dholera SIR ≠ Dholera Village
              </h2>
            </div>

            <div className="grid gap-0 md:grid-cols-2">
              <div className="border-b border-black/10 p-6 sm:p-8 md:border-b-0 md:border-r">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">
                  Dholera SIR
                </p>

                <p className="mt-3 text-lg font-bold text-[#043927]">
                  Large notified regional development area
                </p>

                <p className="mt-3 text-sm leading-7 text-black/55">
                  The SIR is a large government-notified region comprising 22
                  revenue villages and planned for integrated industrial,
                  urban, infrastructure and economic development.
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">
                  Dholera Village
                </p>

                <p className="mt-3 text-lg font-bold text-[#043927]">
                  One of the 22 villages
                </p>

                <p className="mt-3 text-sm leading-7 text-black/55">
                  Dholera village is one individual revenue village within the
                  wider Dholera SIR boundary. It is not synonymous with the
                  entire SIR.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY DHOLERA
      ====================================================== */}
      <section className="bg-[#f7f7f5] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                Why Dholera SIR?
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Why{" "}
              <span className="text-[#043927]">
                Dholera SIR?
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-black/55 sm:text-base">
              The development framework combines industrial planning,
              infrastructure, town planning, connectivity and future urban
              services within one integrated regional vision.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyDholera.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C] hover:shadow-lg sm:p-7"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#043927]/5 text-[#043927] transition-colors duration-300 group-hover:bg-[#043927] group-hover:text-white">
                      <Icon size={21} />
                    </div>

                    <span className="text-sm font-black text-[#C9A45C]">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {item.title}
                  </h3>

                  <div className="mt-3 h-[2px] w-8 bg-[#C9A45C] transition-all duration-300 group-hover:w-14" />

                  <p className="mt-4 text-sm leading-7 text-black/55">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          URBAN ECOSYSTEM
      ====================================================== */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                Future Urban Ecosystem
              </span>

              <span className="h-px w-8 bg-[#C9A45C]" />
            </div>

            <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">
              Industry, Infrastructure &{" "}
              <span className="text-[#043927]">
                Urban Life
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-black/55 sm:text-base">
              The planning concept brings together multiple components to
              create an integrated environment for working, living, learning
              and recreation.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {ecosystem.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group flex min-h-[130px] flex-col items-center justify-center rounded-2xl border border-black/10 bg-[#fafafa] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C] hover:bg-white hover:shadow-md"
                >
                  <Icon
                    size={25}
                    className="text-[#043927] transition-colors duration-300 group-hover:text-[#C9A45C]"
                  />

                  <p className="mt-4 text-xs font-bold leading-5 text-[#111111] sm:text-sm">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          22 VILLAGES
      ====================================================== */}
      <section
        id="villages"
        className="scroll-mt-24 bg-[#f7f7f5] py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Heading */}
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                Notified Villages
              </span>

              <span className="h-px w-8 bg-[#C9A45C]" />
            </div>

            <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">
              22 Villages of{" "}
              <span className="text-[#043927]">
                Dholera SIR
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-black/55 sm:text-base">
              The notified Dholera SIR region consists of 22 revenue villages.
              The 2009 notification identified 19 villages that were then in
              Dhandhuka Taluka and 3 in Barwala Taluka.
            </p>
          </div>

          {/* Village grid */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {villages.map((village) => (
              <article
                key={village.number}
                className="group rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C] hover:shadow-lg sm:p-6"
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#043927] text-xs font-bold text-white">
                      {String(village.number).padStart(2, "0")}
                    </span>

                    <h3 className="text-lg font-bold text-[#111111]">
                      {village.name}
                    </h3>
                  </div>

                  <MapPin
                    size={17}
                    className="shrink-0 text-[#C9A45C]"
                  />
                </div>

                {/* Meta */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#f7f7f5] p-3">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/35">
                      Area
                    </p>

                    <p className="mt-1 text-xs font-bold text-[#043927]">
                      {village.area}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#f7f7f5] p-3">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/35">
                      TP Scheme
                    </p>

                    <p className="mt-1 text-xs font-bold text-[#043927]">
                      {village.tp}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-5 text-sm leading-7 text-black/55">
                  {village.description}
                </p>

                <div className="mt-5 h-[2px] w-8 bg-[#C9A45C] transition-all duration-300 group-hover:w-14" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TOWN PLANNING
      ====================================================== */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#C9A45C]" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                  Town Planning
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                Planned Through{" "}
                <span className="text-[#043927]">
                  TP Schemes
                </span>
              </h2>

              <div className="mt-5 h-1 w-12 rounded-full bg-[#C9A45C]" />

              <p className="mt-7 text-base leading-8 text-black/60 sm:text-lg">
                The region is organized through Town Planning Schemes rather
                than unplanned development. Different parts of the SIR are
                planned for different combinations of industrial, residential,
                commercial, institutional, logistics, green and recreational
                uses.
              </p>

              <p className="mt-5 text-base leading-8 text-black/60 sm:text-lg">
                Town Planning Schemes provide a structured framework for
                organizing land and infrastructure as the region develops.
              </p>
            </div>

            <div className="rounded-3xl bg-[#043927] p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A45C]">
                Planning Framework
              </p>

              <div className="mt-7 space-y-4">
                {[
                  "Industrial areas",
                  "Residential areas",
                  "Commercial areas",
                  "Institutional uses",
                  "Logistics",
                  "Green and recreational areas",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 border-b border-white/10 pb-4 last:border-0"
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-[#C9A45C]"
                    />

                    <span className="text-sm font-medium text-white/80 sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ACTIVATION AREA
      ====================================================== */}
      <section className="bg-[#f7f7f5] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="rounded-3xl border border-[#043927]/10 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#043927] text-[#C9A45C]">
                <Map size={26} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                  Activation Area
                </p>

                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Understanding the Initial Development Area
                </h2>

                <p className="mt-5 text-sm leading-7 text-black/55 sm:text-base sm:leading-8">
                  The Activation Area is a first-phase development area
                  associated with TP-2A and TP-4A. It should not be treated as
                  synonymous with the entire Dholera SIR.
                </p>

                <div className="mt-6 rounded-2xl bg-[#043927]/[0.04] p-5">
                  <p className="text-sm font-semibold leading-7 text-[#043927]">
                    Parcel-level verification is important when evaluating a
                    specific property, its planning status, land use, zoning,
                    approvals or location within a particular planning area.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          IMPORTANT NOTE
      ====================================================== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="rounded-2xl border-l-4 border-[#C9A45C] bg-[#043927]/[0.04] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <ShieldCheck
                size={24}
                className="mt-1 shrink-0 text-[#043927]"
              />

              <div>
                <h2 className="text-xl font-bold sm:text-2xl">
                  Important Note
                </h2>

                <p className="mt-4 text-sm leading-7 text-black/55 sm:text-base sm:leading-8">
                  The 22-village list corresponds to the notified SIR boundary.
                  Planning schemes, land-use classifications, development
                  permissions, zoning regulations and property status can vary
                  by location and parcel. Buyers and investors should verify
                  property-related information through the relevant government
                  authorities and official documentation before making a
                  decision.
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
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A45C]">
            Explore Dholera
          </span>

          <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            Understand the Region.
            <br />
            <span className="text-[#C9A45C]">
              Understand the Opportunity.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
            Explore Dholera SIR, understand its planning framework, and
            discover real-estate opportunities across the region.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-7 py-3.5 text-sm font-bold text-[#111111] transition-all duration-300 hover:bg-white"
            >
              Explore Projects
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/#inquiry-form"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#043927]"
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

/* =========================================================
   FACT CARD
========================================================= */

function FactCard({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C] hover:shadow-md sm:p-7">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#043927]/5 text-[#043927] transition-all duration-300 group-hover:bg-[#043927] group-hover:text-white">
        {icon}
      </div>

      <p className="mt-6 text-3xl font-black tracking-tight text-[#043927] sm:text-4xl">
        {value}
      </p>

      <p className="mt-2 text-xs font-bold uppercase leading-5 tracking-[0.12em] text-black/45">
        {label}
      </p>
    </div>
  );
}