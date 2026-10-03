import Image from "next/image";
import { Building2, Factory, Home } from "lucide-react";

export default function BulkLandIntro() {
  return (
    <section
      aria-labelledby="bulk-land-intro-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* IMAGE */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <Image
              src="/images/bulk-land/bulkland2.webp"
              alt="Bulk land opportunities in Dholera SIR"
              width={900}
              height={700}
              sizes="
                (max-width: 1024px) 100vw,
                50vw
              "
              className="
                h-[320px] w-full object-cover
                sm:h-[420px]
                lg:h-[500px]
              "
            />

            <div
              className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
              aria-hidden="true"
            />

            <div className="absolute bottom-5 left-5 rounded-xl border border-white/20 bg-[#043927]/95 px-5 py-3 text-white shadow-lg">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#C9A45C]">
                Investment Destination
              </p>

              <p className="mt-1 text-lg font-semibold">
                Dholera SIR
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div>
            <div className="flex items-center gap-3">
              <span
                className="h-px w-8 bg-[#C9A45C]"
                aria-hidden="true"
              />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#043927]">
                Bulk Land Investment
              </span>
            </div>

            <h2
              id="bulk-land-intro-heading"
              className="mt-4 text-3xl font-bold leading-tight text-[#111111] sm:text-4xl lg:text-5xl"
            >
              Bulk Land Investment in{" "}
              <span className="text-[#043927]">
                Dholera
              </span>
            </h2>

            <div
              className="mt-5 h-1 w-12 rounded-full bg-[#C9A45C]"
              aria-hidden="true"
            />

            <p className="mt-6 text-base leading-7 text-gray-600">
              Dholera, India&apos;s first greenfield smart city, is rapidly
              emerging as a major investment destination with strategic
              connectivity, planned infrastructure and long-term growth
              potential.
            </p>

            <p className="mt-4 text-base leading-7 text-gray-600">
              Whether you are looking for residential land for plotted
              development, commercial land for hotels, schools and offices, or
              large industrial parcels, we provide structured solutions for
              informed land acquisition.
            </p>

            {/* LAND TYPES */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-200 hover:border-[#C9A45C]">
                <Home
                  className="h-6 w-6 text-[#043927]"
                  aria-hidden="true"
                />

                <p className="mt-3 text-sm font-semibold text-[#111111]">
                  Residential
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Plotted development
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-200 hover:border-[#C9A45C]">
                <Building2
                  className="h-6 w-6 text-[#043927]"
                  aria-hidden="true"
                />

                <p className="mt-3 text-sm font-semibold text-[#111111]">
                  Commercial
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Business opportunities
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-200 hover:border-[#C9A45C]">
                <Factory
                  className="h-6 w-6 text-[#043927]"
                  aria-hidden="true"
                />

                <p className="mt-3 text-sm font-semibold text-[#111111]">
                  Industrial
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Large land parcels
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}