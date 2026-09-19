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
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C9A45C]" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
              Strategic Locations
            </span>

            <span className="h-px w-8 bg-[#C9A45C]" />
          </div>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-[#111111] sm:text-4xl lg:text-5xl">
            Prime Locations Across{" "}
            <span className="text-[#043927]">
              Dholera Smart City
            </span>
          </h2>

          <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-[#C9A45C]" />

          <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg">
            We offer strategically located land parcels across key Town
            Planning (TP) Schemes of Dholera SIR, giving investors access to
            the region&apos;s promising growth corridors.
          </p>

        </div>

        {/* MAIN CONTENT */}
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">

          {/* LEFT — LOCATION LIST */}
          <div className="space-y-4">

            {locations.map((location, index) => {
              const Icon = location.icon;

              return (
                <div
                  key={location.title}
                  className="
                    group
                    flex
                    gap-4
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-4
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#C9A45C]
                    hover:shadow-md
                  "
                >

                  {/* NUMBER */}
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#043927]
                      text-xs
                      font-semibold
                      text-white
                      transition-colors
                      duration-300
                      group-hover:bg-[#C9A45C]
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* ICON */}
                  <div
                    className="
                      hidden
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#043927]/5
                      text-[#043927]
                      transition-all
                      duration-300
                      group-hover:bg-[#043927]
                      group-hover:text-[#C9A45C]
                      sm:flex
                    "
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* TEXT */}
                  <div className="min-w-0">
                    <h3
                      className="
                        text-base
                        font-semibold
                        leading-snug
                        text-[#111111]
                        transition-colors
                        duration-300
                        group-hover:text-[#043927]
                        sm:text-lg
                      "
                    >
                      {location.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {location.description}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>

          {/* RIGHT — IMAGE */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            <Image
              src="/images/bulk-land/prime-location3.webp"
              alt="Prime locations across Dholera Smart City"
              width={1000}
              height={1100}
              className="
                h-[450px]
                w-full
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.03]
                sm:h-[550px]
                lg:h-[650px]
              "
            />

            {/* IMAGE OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* IMAGE CONTENT */}
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
                Dholera SIR
              </span>

              <h3 className="mt-2 max-w-lg text-xl font-semibold leading-snug text-white sm:text-2xl">
                Positioned for the next phase of growth
              </h3>

              <div className="mt-4 h-1 w-10 rounded-full bg-[#C9A45C] transition-all duration-500 group-hover:w-16" />

            </div>

          </div>

        </div>

        {/* BOTTOM HIGHLIGHTS */}
        <div className="mt-12 grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm sm:grid-cols-3">

          {/* ITEM 1 */}
          <div className="p-6 sm:p-8">
            <p className="text-2xl font-bold text-[#043927] sm:text-3xl">
              Dholera SIR
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              India&apos;s emerging smart city destination
            </p>
          </div>

          {/* ITEM 2 */}
          <div className="border-t border-gray-200 p-6 sm:border-l sm:border-t-0 sm:p-8">
            <p className="text-2xl font-bold text-[#043927] sm:text-3xl">
              Strategic
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Locations across key development zones
            </p>
          </div>

          {/* ITEM 3 */}
          <div className="border-t border-gray-200 p-6 sm:border-l sm:border-t-0 sm:p-8">
            <p className="text-2xl font-bold text-[#C9A45C] sm:text-3xl">
              High Growth
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Opportunities for long-term investors
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}