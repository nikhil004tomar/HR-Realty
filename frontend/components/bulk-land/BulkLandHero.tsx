import Image from "next/image";

export default function BulkLandHero() {
  return (
    <section
      aria-labelledby="bulk-land-heading"
      className="relative overflow-hidden bg-[#043927]"
    >
      <div className="relative h-[300px] sm:h-[350px] lg:h-[420px]">
        {/* Hero Image */}
        <Image
          src="/images/bulk-land/bulk-land1.webp"
          alt="Bulk land opportunities in Dholera SIR"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0 bg-black/45"
          aria-hidden="true"
        />

        {/* Brand overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-[#043927]/85
            via-[#043927]/40
            to-transparent
          "
          aria-hidden="true"
        />

        {/* Content */}
        <div
          className="
            relative z-10 mx-auto flex h-full max-w-7xl
            items-center px-5
            sm:px-8
            lg:px-10
          "
        >
          <div className="max-w-4xl">
            <p
              className="
                mb-4 inline-flex rounded-full
                border border-white/30
                bg-white/10 px-4 py-2
                text-[10px] font-semibold uppercase
                tracking-[0.2em] text-white
                backdrop-blur-md
                sm:text-xs sm:tracking-[0.22em]
              "
            >
              Premium Land Opportunities
            </p>

            <h1
              id="bulk-land-heading"
              className="
                text-4xl font-semibold
                leading-[1.08] tracking-tight text-white
                sm:text-5xl
                lg:text-6xl
              "
            >
              Bulk Land Opportunities in{" "}
              <span className="text-[#C9A45C]">
                Dholera SIR
              </span>
            </h1>

            <p
              className="
                mt-5 max-w-2xl
                text-sm leading-7 text-white/85
                sm:text-base
                lg:text-lg
              "
            >
              Explore residential, commercial and industrial land
              opportunities in Dholera SIR for investors, developers and
              businesses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}