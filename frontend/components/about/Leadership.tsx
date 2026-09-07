import Image from "next/image";

const leaders = [
  {
    name: "Rupinder Singh",
    image: "/images/bulk-land/index5.webp",
    linkedin: "https://in.linkedin.com/in/rupindersingh2703",
    description:
      "A visionary alum of Manchester Business School, identified an opportunity and played a crucial role in the success story, contributing to the transformation of barren land into the promising Multi-Trillion Dollar City of Dholera. With a proven track record, he has overseen international mergers and acquisitions in the telecommunications sector.",
  },
  {
    name: "Meenakshi Khurana",
    image: "/images/bulk-land/index5.webp",
    linkedin: "https://www.linkedin.com/in/meenakshiwalikhurana/",
    description:
      "Meenakshi stands as a luminary within Gujarat's Dholera real estate landscape. She has been pivotal in elevating the brand Dholera onto the global stage, championing it as India's premier Greenfield Smart City. With an esteemed MBA from IMT Ghaziabad, her credentials complement her vision.",
  },
  {
    name: "Vijay Kumar Wali",
    image: "/images/bulk-land/index5.webp",
    linkedin: "https://www.linkedin.com/in/vijaykumarwali/",
    description:
      "A seasoned professional boasting over forty years of unparalleled expertise in roads and buildings, residential and commercial development, as well as renewable energy endeavors.",
  },
];

export default function Leadership() {
  return (
    <section className="bg-[#043927]  py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* Heading */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
            Our Leadership
          </p>

          <h2 className="mt-5 text-4xl font-medium leading-tight tracking-tight text-neutral-900 md:text-6xl">
            The dynamic{" "}
            <span className="text-neutral-400">
              minds powering us.
            </span>
          </h2>
        </div>

        {/* Team */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">

          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="group overflow-hidden rounded-3xl bg-white"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">

                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                {/* Bottom overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 pt-24">

                  <div className="flex items-end justify-between gap-4">
                    <h3 className="text-xl font-medium text-white">
                      {leader.name}
                    </h3>

                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black transition hover:scale-105"
                    >
                      in
                    </a>
                  </div>

                </div>
              </div>

              {/* Description */}
              <div className="p-6">
                <p className="text-sm leading-7 text-neutral-600">
                  {leader.description}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}