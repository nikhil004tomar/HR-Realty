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
    description: "Residential, Commercial & Industrial Parcels",
  },
  {
    icon: "/images/bulk-land/index6.webp",
    title: "10+ Years of Trust & Credibility",
    description: "Revenue Records, Plan Approvals & Valuations",
  },
  {
    icon: "/images/bulk-land/index7.webp",
    title: "End-to-End Legal & Regulatory Assistance",
    description: "Covering All Key Zones of Dholera SIR",
  },
  {
    icon: "/images/bulk-land/index5.webp",
    title: "Strategic & High-Growth Locations",
    description: "Leading Land Aggregator & Developer in Dholera",
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
    <section className="bg-[#043927] py-16 text-white sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#d6b46a]">
            Why SmartHomes
          </span>

          <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Why Choose{" "}
            <span className="text-[#d6b46a]">SmartHomes Infrastructure?</span>
          </h2>

          <p className="mt-6 text-base leading-8 text-white/75 sm:text-lg">
            Dholera is India&apos;s next economic powerhouse, and we ensure a
            legally secure and hassle-free land buying experience for
            investors, developers and business owners.
          </p>
        </div>

        {/* Feature Grid */}

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/[0.10]"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
              </div>

              <h3 className="mt-6 text-xl font-semibold leading-snug text-white">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-sm text-white/70">
                {feature.description}
              </p>

              <div className="mt-6 h-px w-full bg-white/10 transition group-hover:bg-[#d6b46a]/60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}