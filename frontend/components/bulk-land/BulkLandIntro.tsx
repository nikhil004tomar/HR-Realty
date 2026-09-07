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
    <section className="bg-[#043927] text-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* Image */}
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-28 w-28 rounded-full bg-[#043927]/8" />

            <div className="relative overflow-hidden rounded-[28px]">
              <Image
                src="/images/bulk-land/bulkland2.webp"
                alt="Bulk land investment in Dholera"
                width={900}
                height={700}
                className="h-[380px] w-full object-cover sm:h-[480px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#043927]/60 via-transparent to-transparent" />

              {/* Image badge */}
              <div className="absolute bottom-5 left-5 rounded-2xl border border-white/20 bg-[#043927]/90 px-5 py-4 text-white backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Investment Destination
                </p>

                <p className="mt-1 text-lg font-semibold">
                  Dholera SIR
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#043927]/60">
              Bulk Land Investment
            </span>

            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#043927] sm:text-4xl lg:text-5xl">
              Bulk Land Investment in{" "}
              <span className="text-[#b18a45]">Dholera</span>
            </h2>

            <p className="mt-6 text-base leading-8 text-gray-600">
              Dholera, India&apos;s first greenfield smart city, is rapidly
              emerging as a major investment destination with strategic
              connectivity, planned infrastructure and long-term growth
              potential.
            </p>

            <p className="mt-4 text-base leading-8 text-gray-600">
              Whether you are looking for residential land for plotted
              development, commercial land for hotels, schools and offices, or
              large industrial parcels, we provide structured solutions for
              secure and informed land acquisition.
            </p>

            {/* Opportunity cards */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 transition hover:border-[#043927]/30 hover:bg-[#043927]/5">
                <Home className="h-6 w-6 text-[#043927]" />

                <p className="mt-3 text-sm font-semibold text-gray-900">
                  Residential
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 transition hover:border-[#043927]/30 hover:bg-[#043927]/5">
                <Building2 className="h-6 w-6 text-[#043927]" />

                <p className="mt-3 text-sm font-semibold text-gray-900">
                  Commercial
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 transition hover:border-[#043927]/30 hover:bg-[#043927]/5">
                <Factory className="h-6 w-6 text-[#043927]" />

                <p className="mt-3 text-sm font-semibold text-gray-900">
                  Industrial
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-9">
              <Link
                href="#bulk-land-inquiry"
                className="group inline-flex items-center gap-3 rounded-full bg-[#043927] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#06543a]"
              >
                Inquire Now

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}