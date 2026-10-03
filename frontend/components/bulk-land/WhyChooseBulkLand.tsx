import Image from "next/image";

const features = [
  {
    icon: "/images/bulk-land/4.webp",
    title: "Legally Verified Land",
    description: "Clear Title, NA/NOC (CLU) Approved",
  },
  {
    icon: "/images/bulk-land/index5.webp",
    title: "Comprehensive Land Solutions",
    description:
      "Residential, Commercial & Industrial Parcels",
  },
  {
    icon: "/images/bulk-land/index6.webp",
    title: "10+ Years of Trust & Credibility",
    description:
      "Revenue Records, Plan Approvals & Valuations",
  },
  {
    icon: "/images/bulk-land/index7.webp",
    title: "End-to-End Legal & Regulatory Assistance",
    description:
      "Covering All Key Zones of Dholera SIR",
  },
  {
    icon: "/images/bulk-land/index5.webp",
    title: "Strategic & High-Growth Locations",
    description:
      "Leading Land Aggregator & Developer in Dholera",
  },
  {
    icon: "/images/bulk-land/index5.webp",
    title: "Trusted Developer in Dholera SIR",
    description:
      "SmartHomes leading name with a proven track record in Dholera Smart City projects.",
  },
];

export default function WhyChooseBulkLand() {
  return (
    <section
      aria-labelledby="why-hr-realty-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* SECTION HEADING */}
        <header className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span
              className="h-px w-8 bg-[#C9A45C]"
              aria-hidden="true"
            />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
              Why HR Realty
            </span>

            <span
              className="h-px w-8 bg-[#C9A45C]"
              aria-hidden="true"
            />
          </div>

          <h2
            id="why-hr-realty-heading"
            className="mt-4 text-3xl font-bold leading-tight text-[#111111] sm:text-4xl lg:text-5xl"
          >
            Why Choose{" "}
            <span className="text-[#043927]">
              HR Realty International Private Limited
            </span>
          </h2>

          <div
            className="mx-auto mt-5 h-1 w-12 rounded-full bg-[#C9A45C]"
            aria-hidden="true"
          />

          <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg">
            Dholera is India&apos;s next economic powerhouse, and we focus on
            providing structured land solutions for investors, developers and
            business owners.
          </p>
        </header>

        {/* FEATURE GRID */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="
                rounded-2xl border border-gray-200
                bg-white p-6 shadow-sm
                transition-colors duration-200
                hover:border-[#C9A45C]
              "
            >
              {/* ICON */}
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
                <Image
                  src={feature.icon}
                  alt=""
                  width={36}
                  height={36}
                  className="h-8 w-8 object-contain"
                />
              </div>

              {/* TITLE */}
              <h3 className="mt-5 text-lg font-semibold leading-snug text-[#111111] sm:text-xl">
                {feature.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {feature.description}
              </p>

              <div
                className="mt-5 h-px w-full bg-[#C9A45C]"
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}