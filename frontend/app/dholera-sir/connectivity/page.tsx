"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Plane,
  TrainFront,
  Route,
  Ship,
  MapPin,
  Building2,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";

import InquiryForm from "@/components/InquiryForm";
import {
  getAllConnectivity,
  type Connectivity,
} from "@/lib/connectivity";

/* =========================================================
   ICON MAP
========================================================= */

const iconMap = {
  "dholera-international-airport": Plane,
  "road-connectivity": Route,
  "dedicated-freight-corridor": TrainFront,
  "port-connectivity": Ship,
  "ahmedabad-connectivity": Building2,
  "dholera-sir-network": MapPin,
} as const;

/* =========================================================
   FALLBACK DESCRIPTIONS
========================================================= */

const fallbackDescriptions: Record<string, string> = {
  "dholera-international-airport":
    "The planned Dholera International Airport is an important part of the region's future air connectivity, supporting passenger travel, business movement and logistics.",

  "road-connectivity":
    "Dholera is being connected through major road infrastructure, improving accessibility to Ahmedabad, Bhavnagar and other important regional destinations.",

  "dedicated-freight-corridor":
    "The Dedicated Freight Corridor strengthens freight movement and provides an important logistics connection for industries and businesses in the Dholera region.",

  "port-connectivity":
    "Strategic connectivity with Gujarat's port network supports industrial, manufacturing and logistics opportunities around Dholera.",

  "ahmedabad-connectivity":
    "Dholera's position within Gujarat's developing infrastructure network provides connectivity towards Ahmedabad and other major economic centres.",

  "dholera-sir-network":
    "Planned internal infrastructure connects industrial, residential, commercial and institutional areas within the Dholera Special Investment Region.",
};

/* =========================================================
   HIGHLIGHTS
========================================================= */

const highlights = [
  {
    number: "01",
    title: "Air",
    text: "Future international air connectivity",
  },
  {
    number: "02",
    title: "Road",
    text: "Major regional road corridors",
  },
  {
    number: "03",
    title: "Rail",
    text: "Freight connectivity through DFC",
  },
  {
    number: "04",
    title: "Port",
    text: "Access to Gujarat's port network",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function ConnectivityPage() {
  const [connectivity, setConnectivity] = useState<
    Connectivity[]
  >([]);

  const [loading, setLoading] = useState(true);

  /* =======================================================
     LOAD CONNECTIVITY
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    async function loadConnectivity() {
      try {
        const data = await getAllConnectivity();

        if (mounted) {
          setConnectivity(data);
        }
      } catch (error) {
        console.error(
          "Failed to load connectivity:",
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadConnectivity();

    return () => {
      mounted = false;
    };
  }, []);

  /* =======================================================
     HERO IMAGE
  ======================================================= */

  const airport =
    connectivity.find(
      (item) =>
        item.slug ===
        "dholera-international-airport"
    );

  const heroImage =
    airport?.images?.[0]?.image_url || null;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="bg-white text-[#111111]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="bg-white">
        <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6 lg:px-8 lg:py-7">

          <div className="grid overflow-hidden rounded-[28px] bg-[#043927] shadow-[0_20px_60px_rgba(4,57,39,0.15)] lg:grid-cols-[0.78fr_1.22fr]">

            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="relative flex items-center overflow-hidden px-7 py-14 sm:px-10 lg:px-12 xl:px-16">

              {/* Decorative circles */}

              <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full border border-[#C9A45C]/15" />

              <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full border border-white/5" />

              <div className="pointer-events-none absolute right-10 top-10 h-24 w-24 rounded-full border border-[#C9A45C]/10" />

              <div className="relative z-10 max-w-xl">

                {/* Label */}

                <div className="mb-6 flex items-center gap-3">

                  <span className="h-px w-10 bg-[#C9A45C]" />

                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A45C]">
                    Dholera SIR Connectivity
                  </span>

                </div>

                {/* Heading */}

                <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl xl:text-6xl">
                  Connected to the

                  <span className="mt-2 block text-[#C9A45C]">
                    Future of Gujarat
                  </span>
                </h1>

                {/* Gold line */}

                <div className="mt-7 h-1 w-16 rounded-full bg-[#C9A45C]" />

                {/* Description */}

                <p className="mt-7 max-w-lg text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
                  Dholera SIR is being developed as a major
                  industrial and economic destination with
                  planned road, rail, air and port
                  connectivity connecting the region with
                  important domestic and international
                  markets.
                </p>

                {/* Buttons */}

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                  <Link
                    href="#connectivity"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-6 py-3.5 text-sm font-bold text-[#111111] transition-all duration-300 hover:bg-white"
                  >
                    Explore Connectivity

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#C9A45C] hover:text-[#C9A45C]"
                  >
                    Talk to Our Team
                  </Link>

                </div>

                {/* Hero highlights */}

                <div className="mt-10 grid grid-cols-3 border-t border-white/10 pt-7">

                  <div>
                    <p className="text-xl font-bold text-white">
                      AIR
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-wider text-white/45">
                      Connectivity
                    </p>
                  </div>

                  <div className="border-l border-white/10 pl-5">
                    <p className="text-xl font-bold text-white">
                      ROAD
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-wider text-white/45">
                      Infrastructure
                    </p>
                  </div>

                  <div className="border-l border-white/10 pl-5">
                    <p className="text-xl font-bold text-white">
                      RAIL
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-wider text-white/45">
                      Freight
                    </p>
                  </div>

                </div>

              </div>
            </div>

            {/* =================================================
                RIGHT IMAGE
            ================================================= */}

            <div className="relative flex items-center justify-center overflow-hidden bg-[#f3f0e8]">

              <div className="relative aspect-[2/1] w-full">

                {loading ? (

                  <div className="flex h-full min-h-[280px] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#043927]" />
                  </div>

                ) : heroImage ? (

                  <Image
                    src={heroImage}
                    alt="Dholera International Airport Smart City"
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-contain object-center"
                  />

                ) : (

                  <div className="flex h-full min-h-[280px] items-center justify-center px-6 text-center">

                    <div>
                      <p className="text-sm font-semibold text-[#043927]">
                        Dholera International Airport
                      </p>

                      <p className="mt-2 text-xs text-gray-500">
                        Image coming soon
                      </p>
                    </div>

                  </div>

                )}

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            {/* Image */}

            <div className="group relative overflow-hidden rounded-[24px] bg-gray-50">

              <Image
                src="/images/bulk-land/bulkland2.webp"
                alt="Dholera infrastructure and connectivity"
                width={1000}
                height={750}
                className="h-[320px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:h-[420px] lg:h-[500px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              <div className="absolute bottom-5 left-5">

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
                  Dholera SIR
                </p>

                <p className="mt-1 text-xl font-semibold text-white">
                  Strategic Connectivity
                </p>

              </div>

            </div>

            {/* Content */}

            <div>

              <div className="flex items-center gap-3">

                <span className="h-px w-8 bg-[#C9A45C]" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
                  Why Connectivity Matters
                </span>

              </div>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-[#111111] sm:text-4xl lg:text-5xl">
                A Strategic Location for

                <span className="block text-[#043927]">
                  Business &amp; Investment
                </span>
              </h2>

              <div className="mt-5 h-1 w-12 rounded-full bg-[#C9A45C]" />

              <p className="mt-6 text-base leading-7 text-gray-600">
                Connectivity is one of the important
                factors behind the development of Dholera
                SIR. Its infrastructure planning is focused
                on connecting industrial areas, residential
                zones, commercial districts and logistics
                facilities with major transportation
                networks.
              </p>

              <p className="mt-4 text-base leading-7 text-gray-600">
                Better connectivity can support the movement
                of people, goods and services while
                strengthening Dholera&apos;s role as an
                emerging industrial and economic destination.
              </p>

              {/* Points */}

              <div className="mt-7 space-y-3">

                <div className="flex items-start gap-3">

                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#043927] text-white">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>

                  <p className="text-sm leading-6 text-gray-600">
                    Planned multi-modal connectivity
                  </p>

                </div>

                <div className="flex items-start gap-3">

                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#043927] text-white">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>

                  <p className="text-sm leading-6 text-gray-600">
                    Access to important regional
                    infrastructure
                  </p>

                </div>

                <div className="flex items-start gap-3">

                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#043927] text-white">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>

                  <p className="text-sm leading-6 text-gray-600">
                    Strong potential for industrial and
                    logistics development
                  </p>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CONNECTIVITY TYPES
      ===================================================== */}

      <section
        id="connectivity"
        className="bg-[#f7f7f4] py-16 sm:py-20 lg:py-24"
      >

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          {/* Section Heading */}

          <div className="mx-auto max-w-3xl text-center">

            <div className="flex items-center justify-center gap-3">

              <span className="h-px w-10 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                Multi-Modal Connectivity
              </span>

              <span className="h-px w-10 bg-[#C9A45C]" />

            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl lg:text-5xl">
              Multiple Ways to

              <span className="text-[#043927]">
                {" "}Stay Connected
              </span>
            </h2>

            <div className="mx-auto mt-5 h-1 w-14 rounded-full bg-[#C9A45C]" />

            <p className="mt-6 text-sm leading-7 text-black/55 sm:text-base">
              Dholera&apos;s planned infrastructure network
              brings together road, rail, air and port
              connectivity to support the region&apos;s
              long-term development.
            </p>

          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {Array.from({ length: 6 }).map(
                (_, index) => (

                  <div
                    key={index}
                    className="overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-sm"
                  >

                    <div className="h-56 animate-pulse bg-gray-200" />

                    <div className="p-6">

                      <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />

                      <div className="mt-4 h-16 animate-pulse rounded bg-gray-100" />

                    </div>

                  </div>

                )
              )}

            </div>

          ) : connectivity.length === 0 ? (

            /* =================================================
                EMPTY STATE
            ================================================= */

            <div className="mt-14 rounded-[22px] border border-dashed border-gray-300 bg-white px-6 py-16 text-center">

              <h3 className="text-xl font-bold text-[#043927]">
                Connectivity Information Coming Soon
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
                Connectivity sections will appear here once
                they are added from the admin panel.
              </p>

            </div>

          ) : (

            /* =================================================
                CARDS
            ================================================= */

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {connectivity.map(
                (item, index) => {

                  const Icon =
                    iconMap[
                      item.slug as keyof typeof iconMap
                    ] || MapPin;

                  const image =
                    item.images?.[0]?.image_url ||
                    null;

                  const description =
                    item.description ||
                    fallbackDescriptions[
                      item.slug
                    ] ||
                    "Explore connectivity infrastructure and development around Dholera SIR.";

                  return (
                    <div
                      key={item.id}
                      className="group overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A45C]/60 hover:shadow-[0_18px_45px_rgba(0,0,0,0.09)]"
                    >

                      {/* Card Image */}

                      <div className="relative h-56 overflow-hidden bg-[#f3f0e8]">

                        {image ? (

                          <Image
                            src={image}
                            alt={item.title}
                            fill
                            unoptimized
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />

                        ) : (

                          <div className="flex h-full items-center justify-center">

                            <Icon
                              className="h-14 w-14 text-[#043927]/20"
                              strokeWidth={1.2}
                            />

                          </div>

                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                        {/* Number */}

                        <div className="absolute right-5 top-5">

                          <span className="text-xs font-bold tracking-[0.15em] text-white/80">
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>

                        </div>

                        {/* Icon */}

                        <div className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C9A45C] text-[#111111] shadow-lg transition-all duration-300 group-hover:bg-[#043927] group-hover:text-white">

                          <Icon
                            className="h-6 w-6"
                            strokeWidth={1.8}
                          />

                        </div>

                      </div>

                      {/* Card Content */}

                      <div className="p-6">

                        <h3 className="text-xl font-bold tracking-tight text-[#111111]">
                          {item.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-black/55">
                          {description}
                        </p>

                        {/* Bottom */}

                        <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">

                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#043927]">
                            Connectivity
                          </span>

                          {/* ONLY ARROW IS CLICKABLE */}

                          <Link
                            href={`/dholera-sir/connectivity/${item.slug}`}
                            aria-label={`View ${item.title}`}
                            className="group/arrow flex h-9 w-9 items-center justify-center rounded-full bg-[#043927]/5 text-[#043927] transition-all duration-300 hover:bg-[#043927] hover:text-white"
                          >

                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5" />

                          </Link>

                        </div>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          )}

        </div>
      </section>

      {/* =====================================================
          CONNECTIVITY HIGHLIGHTS
      ===================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="overflow-hidden rounded-[24px] bg-[#043927]">

            <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">

              {highlights.map(
                (item, index) => (

                  <div
                    key={item.number}
                    className={`
                      p-7 sm:p-9
                      ${
                        index > 0
                          ? "border-t border-white/10 sm:border-t-0 sm:border-l"
                          : ""
                      }
                    `}
                  >

                    <span className="text-xs font-bold tracking-[0.15em] text-[#C9A45C]">
                      {item.number}
                    </span>

                    <h3 className="mt-3 text-2xl font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/60">
                      {item.text}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          INVESTMENT CONNECTION
      ===================================================== */}

      <section className="bg-[#f7f7f4] py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">

          <div className="flex items-center justify-center gap-3">

            <span className="h-px w-8 bg-[#C9A45C]" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
              Investment Perspective
            </span>

            <span className="h-px w-8 bg-[#C9A45C]" />

          </div>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-[#111111] sm:text-4xl lg:text-5xl">
            Connectivity That Supports

            <span className="block text-[#043927]">
              Long-Term Development
            </span>
          </h2>

          <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-[#C9A45C]" />

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            For investors and businesses, infrastructure
            connectivity is an important consideration when
            evaluating a developing destination. Dholera&apos;s
            planned transportation network is designed to
            support the movement of people, materials and
            products as the region grows.
          </p>

          <div className="mt-8">

            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 rounded-full bg-[#043927] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#06543a] hover:shadow-md"
            >

              Explore Our Projects

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-1">

                <ArrowUpRight className="h-4 w-4" />

              </span>

            </Link>

          </div>

        </div>
      </section>

      {/* =====================================================
          INQUIRY FORM
      ===================================================== */}

      <section id="contact">
        <InquiryForm />
      </section>

    </main>
  );
}