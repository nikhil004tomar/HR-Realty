import Image from "next/image";

export default function AboutHero() {
  return (
    <section
      aria-labelledby="about-page-heading"
      className="
        relative w-full overflow-hidden
        min-h-[380px]
        sm:min-h-[410px]
        md:min-h-[460px]
      "
    >
      {/* Background Image */}
      <Image
        src="/images/home/about.png"
        alt="HR Realty International real estate and Dholera SIR"
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

      {/* Gradient for text readability */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-black/65
          via-black/30
          to-black/45
        "
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-[380px] items-end sm:min-h-[410px] md:min-h-[460px]">
        <div
          className="
            mx-auto w-full max-w-7xl
            px-5 pb-12
            sm:px-8 sm:pb-14
            md:px-10 md:pb-16
            lg:px-12
          "
        >
          <div className="max-w-4xl">
            <p
              className="
                mb-3
                text-[10px] font-semibold uppercase
                tracking-[0.2em] text-white/75
                sm:text-xs sm:tracking-[0.24em]
                md:text-sm md:tracking-[0.28em]
              "
            >
              HR Realty International Pvt. Ltd.
            </p>

            <h1
              id="about-page-heading"
              className="
                text-4xl font-semibold
                leading-tight tracking-tight text-white
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              About{" "}
              <span className="font-normal text-[#C9A45C]">
                HR Realty International
              </span>
            </h1>

            <p
              className="
                mt-4 max-w-2xl
                text-sm leading-6 text-white/80
                sm:text-base sm:leading-7
                md:text-lg md:leading-8
              "
            >
              Discover HR Realty International and our focus on real estate
              and property opportunities in Dholera SIR, Gujarat.
            </p>

            <div
              className="mt-5 h-[2px] w-16 bg-[#C9A45C] sm:mt-6 sm:w-20"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}