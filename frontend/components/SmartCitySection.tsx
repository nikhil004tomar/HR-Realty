import Image from "next/image";

const highlights = [
  {
    title: "Ahmedabad-Dholera Expressway",
    image: "/images/bulk-land/index5.webp",
    href: "/blogs/ahmedabad--dholera-expressway",
  },
  {
    title: "Dholera International Airport",
    image: "/images/bulk-land/index5.webp",
    href: "/blogs/dholera-international-airport",
  },
  {
    title: "National Maritime Heritage Museum",
    image: "/images/bulk-land/index5.webp",
    href: "/blogs/national-maritime-heritage-complex-nmhc-lothal-transforming-indias-maritime-legacy-boosting-dholera-smart-city-growth",
  },
];

export default function SmartCitySection() {
  return (
    <section className="relative overflow-hidden bg-[#043927] py-16 text-white sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* TOP CONTENT */}
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

          {/* IMAGE */}
          <div className="group relative overflow-hidden rounded-[2rem]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem]">
              <Image
                src="/images/home/Section7_web.webp"
                alt="Dholera Smart City"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* small label */}
              <div className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.25em] backdrop-blur-md">
                Dholera SIR
              </div>
            </div>
          </div>

          {/* TEXT */}
          <div className="max-w-3xl">

            <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-white/50 sm:text-sm">
              Future • Infrastructure • Growth
            </p>

            <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
              Dholera{" "}
              <span className="font-light italic text-white/65">
                Smart City
              </span>
            </h2>

            <div className="mt-7 h-px w-20 bg-white/40" />

            <p className="mt-7 text-sm leading-7 text-white/65 sm:text-base sm:leading-8 lg:text-lg">
              Dholera Smart City is India's first greenfield smart city and
              part of the revolutionary{" "}
              <strong className="font-semibold text-white">
                Dholera SIR
              </strong>{" "}
              (Special Investment Region), meticulously planned under the
              Delhi-Mumbai Industrial Corridor (DMIC).
            </p>

            <p className="mt-5 text-sm leading-7 text-white/65 sm:text-base sm:leading-8 lg:text-lg">
              Supported by the Government of India and Gujarat,{" "}
              <strong className="font-semibold text-white">
                Dholera Smart City
              </strong>{" "}
              is envisioned as a world-class destination for industrial,
              residential, and commercial development.
            </p>

            <p className="mt-5 text-sm leading-7 text-white/65 sm:text-base sm:leading-8 lg:text-lg">
              Dholera SIR is backed by the Government of India and designed
              for world-class infrastructure, global industries, and smart
              urban planning. Now is the time to secure NA NOC approved land
              and{" "}
              <strong className="font-semibold text-white">
                residential plots in Dholera
              </strong>{" "}
              at attractive pre-launch prices.
            </p>

            <p className="mt-5 text-sm leading-7 text-white/65 sm:text-base sm:leading-8 lg:text-lg">
              With high appreciation potential, plug-and-play infrastructure,
              and smart utilities, it is the ultimate smart city investment
              for long-term high ROI.
            </p>

          </div>
        </div>

        {/* CARDS */}
        <div className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-2 lg:mt-24 lg:grid-cols-3">

          {highlights.map((item, index) => (
            <a
              key={item.title}
              href={item.href}
              className="group relative block overflow-hidden rounded-[1.5rem] bg-white/5"
            >
              {/* IMAGE */}
              <div className="relative aspect-[430/300] overflow-hidden">

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                {/* number */}
                <div className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/20 text-xs backdrop-blur-md">
                  0{index + 1}
                </div>

                {/* title */}
                <div className="absolute inset-x-5 bottom-5">
                  <h3 className="max-w-[320px] text-lg font-medium leading-snug text-white transition-transform duration-500 group-hover:-translate-y-1 sm:text-xl">
                    {item.title}
                  </h3>

                  <div className="mt-3 h-px w-0 bg-white transition-all duration-500 group-hover:w-16" />
                </div>
              </div>
            </a>
          ))}

        </div>

      </div>
    </section>
  );
}