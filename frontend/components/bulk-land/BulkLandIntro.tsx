import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Factory,
  Home,
} from "lucide-react";

export default function BulkLandIntro() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* IMAGE */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <Image
              src="/images/bulk-land/bulkland2.webp"
              alt="Bulk land investment in Dholera"
              width={900}
              height={700}
              className="
                h-[320px]
                w-full
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.03]
                sm:h-[420px]
                lg:h-[500px]
              "
            />

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

            {/* Image Badge */}
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
          <div className="animate-[fadeIn_0.7s_ease-out]">

            {/* Small Heading */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C9A45C]" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#043927]">
                Bulk Land Investment
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#111111] sm:text-4xl lg:text-5xl">
              Bulk Land Investment in{" "}
              <span className="text-[#043927]">
                Dholera
              </span>
            </h2>

            {/* Gold underline */}
            <div className="mt-5 h-1 w-12 rounded-full bg-[#C9A45C]" />

            {/* Description */}
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

              {/* Residential */}
              <div
                className="
                  group rounded-xl border border-gray-200
                  bg-white p-4
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#C9A45C]
                  hover:shadow-md
                "
              >
                <Home className="h-6 w-6 text-[#043927] transition-colors duration-300 group-hover:text-[#C9A45C]" />

                <p className="mt-3 text-sm font-semibold text-[#111111]">
                  Residential
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Plotted development
                </p>
              </div>

              {/* Commercial */}
              <div
                className="
                  group rounded-xl border border-gray-200
                  bg-white p-4
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#C9A45C]
                  hover:shadow-md
                "
              >
                <Building2 className="h-6 w-6 text-[#043927] transition-colors duration-300 group-hover:text-[#C9A45C]" />

                <p className="mt-3 text-sm font-semibold text-[#111111]">
                  Commercial
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Business opportunities
                </p>
              </div>

              {/* Industrial */}
              <div
                className="
                  group rounded-xl border border-gray-200
                  bg-white p-4
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#C9A45C]
                  hover:shadow-md
                "
              >
                <Factory className="h-6 w-6 text-[#043927] transition-colors duration-300 group-hover:text-[#C9A45C]" />

                <p className="mt-3 text-sm font-semibold text-[#111111]">
                  Industrial
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Large land parcels
                </p>
              </div>

            </div>

            {/* CTA */}
            {/* 
            <div className="mt-8">
              <Link
                href="#InquiryForm"
                className="
                  group inline-flex items-center gap-3
                  rounded-full
                  bg-[#043927]
                  px-6 py-3
                  text-sm font-semibold
                  text-white
                  transition-all duration-300
                  hover:bg-[#06543a]
                  hover:shadow-md
                "
              >
                Inquire Now

                <span
                  className="
                    flex h-8 w-8 items-center justify-center
                    rounded-full
                    bg-white/10
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
              */}    

          </div>
        </div>
      </div>
    </section>
  );
}