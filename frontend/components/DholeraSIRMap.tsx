"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  MapPin,
  TrendingUp,
} from "lucide-react";

export default function DholeraSIRMap() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">

      {/* Decorative background elements */}
      <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-[#043927]/5 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-full bg-[#C9A45C]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

        {/* =====================================================
            SECTION HEADING
        ====================================================== */}

        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#043927]/15 bg-[#043927]/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#C9A45C]" />

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#043927]">
              Dholera Smart City
            </span>
          </div>

          <h2 className="text-4xl font-black tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">
            Explore{" "}
            <span className="text-[#043927]">
              Dholera SIR
            </span>
          </h2>

          <div className="mx-auto mt-5 h-[2px] w-20 bg-[#C9A45C]" />

          <p className="mt-5 text-sm leading-7 text-[#111111]/60 sm:text-base">
            Discover the location, connectivity and future potential of
            Dholera Special Investment Region.
          </p>

        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">

          {/* =====================================================
              LEFT — FULL MAP
          ====================================================== */}

          <div className="relative w-full">

            <div className="relative aspect-[4/3] w-full">

              <Image
                src="/images/DHOLERAMAP2.png"
                alt="Dholera SIR location map"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />

            </div>

          </div>

          {/* =====================================================
              RIGHT — ABOUT DHOLERA
          ====================================================== */}

          <div className="pt-4 lg:pt-0">

            {/* Small label */}

            <div className="mb-5 flex items-center gap-3">

              <span className="h-[2px] w-10 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                About Dholera SIR
              </span>

            </div>

            {/* Heading */}

            <h2 className="max-w-xl text-3xl font-black leading-tight tracking-tight text-[#111111] sm:text-4xl lg:text-5xl">
              A City Built for the{" "}
              <span className="text-[#043927]">
                Future
              </span>
            </h2>

            {/* Description */}

            <div className="mt-6 space-y-4 text-sm leading-7 text-[#111111]/65 sm:text-base sm:leading-8">

              <p>
                Dholera Special Investment Region (SIR) is a planned
                industrial and smart city development in Gujarat, designed
                with modern infrastructure and future-ready facilities.
              </p>

              <p>
                Strategically positioned within the Delhi-Mumbai Industrial
                Corridor, Dholera is being developed as a major destination
                for industries, businesses, infrastructure and long-term
                investment.
              </p>

              <p>
                With planned roads, connectivity, industrial development and
                large-scale infrastructure, Dholera offers an opportunity to
                participate in the growth of one of India&apos;s emerging
                smart-city regions.
              </p>

            </div>

            {/* =================================================
                FEATURE CARDS
            ================================================== */}

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:gap-4">

              {/* Card 1 */}

              <div className="rounded-xl border border-[#111111]/10 bg-[#fafafa] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#043927]/25 hover:shadow-md">

                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#043927]/10">

                  <Building2
                    size={19}
                    className="text-[#043927]"
                    strokeWidth={2}
                  />

                </div>

                <h3 className="text-sm font-bold text-[#111111]">
                  Smart City
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#111111]/50">
                  Planned modern infrastructure
                </p>

              </div>

              {/* Card 2 */}

              <div className="rounded-xl border border-[#111111]/10 bg-[#fafafa] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C]/50 hover:shadow-md">

                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#C9A45C]/15">

                  <MapPin
                    size={19}
                    className="text-[#043927]"
                    strokeWidth={2}
                  />

                </div>

                <h3 className="text-sm font-bold text-[#111111]">
                  Strategic Location
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#111111]/50">
                  Strong regional connectivity
                </p>

              </div>

              {/* Card 3 */}

              <div className="rounded-xl border border-[#111111]/10 bg-[#fafafa] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#043927]/25 hover:shadow-md">

                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#043927]/10">

                  <TrendingUp
                    size={19}
                    className="text-[#043927]"
                    strokeWidth={2}
                  />

                </div>

                <h3 className="text-sm font-bold text-[#111111]">
                  Future Growth
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#111111]/50">
                  Designed for long-term growth
                </p>

              </div>

            </div>

            {/* =================================================
                CTA
            ================================================== */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/dholera-sir/maps"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#043927] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#111111] sm:w-auto"
              >

                <span>
                  Explore Dholera SIR
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C9A45C] text-[#111111] transition-transform duration-300 group-hover:translate-x-1">

                  <ArrowRight
                    size={16}
                    strokeWidth={2.5}
                  />

                </span>

              </Link>

              <Link
                href="/dholera-sir/maps"
                className="inline-flex w-full items-center justify-center rounded-full border border-[#111111]/15 px-6 py-3.5 text-sm font-bold text-[#111111] transition-all duration-300 hover:border-[#043927] hover:bg-[#043927] hover:text-white sm:w-auto"
              >
                View Detailed Map
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}