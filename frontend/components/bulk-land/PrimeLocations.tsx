import Image from "next/image";
import {
  Plane,
  Route,
  Landmark,
  Trees,
  Building2,
} from "lucide-react";

const locations = [
  {
    icon: Plane,
    title: "Near Dholera International Airport",
    description:
      "Ideal for logistics hubs, commercial establishments, and hospitality projects.",
  },
  {
    icon: Route,
    title: "Along Dholera Expressway",
    description:
      "Excellent connectivity with major transportation corridors and emerging development zones.",
  },
  {
    icon: Landmark,
    title: "Close to NMHC, Lothal",
    description:
      "Strategically positioned near the National Maritime Heritage Complex and Lothal.",
  },
  {
    icon: Trees,
    title: "Near Velavadar National Park",
    description:
      "A strategically connected location offering access to established regional destinations.",
  },
  {
    icon: Building2,
    title: "Key Dholera Development Zones",
    description:
      "Dholera Activation Area, Residential Zone, High Access Corridor Zone, Knowledge & IT Zone and City Center.",
  },
];

export default function PrimeLocations() {
  return (
    <section className="overflow-hidden bg-[#043927] text-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

        {/* Header */}

        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

          {/* Left Content */}

          <div>
            <span className="inline-flex items-center rounded-full border border-[#043927]/15 bg-[#043927]/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
              Strategic Locations
            </span>

            <h2 className="mt-5 text-4xl font-medium leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              <span className="text-[#043927]">
                Prime Location
              </span>{" "}
              Across Dholera Smart City
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-neutral-600 sm:text-lg">
              We offer strategically located land parcels across key Town
              Planning (TP) Schemes of Dholera SIR, giving investors access to
              the region&apos;s most promising growth corridors.
            </p>

            {/* Location List */}

            <div className="mt-10 space-y-4">
              {locations.map((location, index) => {
                const Icon = location.icon;

                return (
                  <div
                    key={location.title}
                    className="group flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#043927]/20 hover:shadow-lg"
                  >
                    {/* Number */}

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#043927] text-xs font-semibold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Icon */}

                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#043927]/5 text-[#043927] sm:flex">
                      <Icon size={20} strokeWidth={1.7} />
                    </div>

                    {/* Text */}

                    <div>
                      <h3 className="text-base font-semibold text-neutral-900 sm:text-lg">
                        {location.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-neutral-500">
                        {location.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image */}

          <div className="relative">
            <div className="relative overflow-hidden rounded-[32px]">
              <Image
                src="/images/bulk-land/prime-location3.webp"
                alt="Prime locations across Dholera Smart City"
                width={1000}
                height={1100}
                className="h-auto w-full object-cover"
              />

              {/* Overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-[#043927]/70 via-transparent to-transparent" />

              {/* Image Label */}

              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-[#043927]/90 p-5 backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d6b46a]">
                  Dholera SIR
                </p>

                <p className="mt-2 text-xl font-medium text-white sm:text-2xl">
                  Positioned for the next phase of growth
                </p>
              </div>
            </div>

            {/* Decorative Element */}

            <div className="absolute -bottom-6 -right-4 -z-10 h-32 w-32 rounded-full bg-[#043927]/10 blur-2xl sm:-right-8" />
          </div>
        </div>

        {/* Bottom Highlight */}

        <div className="mt-16 rounded-[28px] bg-[#043927] px-6 py-8 sm:px-10 sm:py-10 lg:mt-20">
          <div className="grid gap-8 sm:grid-cols-3 sm:items-center">

            <div>
              <p className="text-3xl font-semibold text-white">
                Dholera SIR
              </p>

              <p className="mt-1 text-sm text-white/60">
                India&apos;s emerging smart city destination
              </p>
            </div>

            <div className="border-white/10 sm:border-l sm:pl-8">
              <p className="text-3xl font-semibold text-white">
                Strategic
              </p>

              <p className="mt-1 text-sm text-white/60">
                Locations across key development zones
              </p>
            </div>

            <div className="border-white/10 sm:border-l sm:pl-8">
              <p className="text-3xl font-semibold text-[#d6b46a]">
                High Growth
              </p>

              <p className="mt-1 text-sm text-white/60">
                Opportunities for long-term investors
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}