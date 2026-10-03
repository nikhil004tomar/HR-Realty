export default function FoundedSection() {
  return (
    <section
      aria-labelledby="our-story-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.5fr] lg:gap-20">
          {/* LEFT — HEADING */}
          <div>
            {/* Section Label */}
            <div className="flex items-center gap-3">
              <span
                className="h-px w-8 bg-[#C9A45C]"
                aria-hidden="true"
              />

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
                Our Story
              </p>
            </div>

            {/* Main Heading */}
            <h2
              id="our-story-heading"
              className="
                mt-4 text-4xl font-bold leading-tight
                tracking-tight text-[#111111]
                sm:text-5xl
              "
            >
              Founded in{" "}
              <span className="text-[#043927]">2018</span>
            </h2>

            {/* Gold Accent */}
            <div
              className="mt-5 h-1 w-12 rounded-full bg-[#C9A45C]"
              aria-hidden="true"
            />

            {/* Supporting Text */}
            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-500">
              Building trust through real estate and creating opportunities
              for the future.
            </p>
          </div>

          {/* RIGHT — CONTENT */}
          <div className="space-y-6">
            {/* Company Introduction */}
            <article
              className="
                rounded-2xl border border-gray-200
                bg-white p-6 shadow-sm
                sm:p-8
              "
            >
              <div className="space-y-5 text-base leading-8 text-[#043927] sm:text-lg sm:leading-9">
                <p className="font-medium">
                  HR Realty International is a modern real estate organization
                  established with a clear purpose—to transform the way real
                  estate is marketed and sold by building a powerful,
                  transparent, and technology-enabled Channel Partner
                  ecosystem.
                </p>

                <p>
                  We specialize in premium land investments, residential and
                  commercial projects, project marketing, investment advisory,
                  and developer partnerships.
                </p>

                <p>
                  Our business model is designed to create growth
                  opportunities for channel partners while delivering trusted
                  investment solutions to customers.
                </p>

                <p>
                  At HR Realty International, we believe that our success is
                  built on the success of our partners.
                </p>
              </div>
            </article>

            {/* Dholera Vision */}
            <div className="border-l-2 border-[#C9A45C] pl-5 sm:pl-7">
              <h3 className="text-lg font-semibold text-[#043927] sm:text-xl">
                Our Vision for the Future
              </h3>

              <p className="mt-3 text-base leading-8 text-gray-600 sm:text-lg sm:leading-9">
                A vision to create an economically and socially balanced,
                new-age Greenfield smart city with world-class infrastructure
                leading to stable economic growth and sustainable high-quality
                life, &amp; international experience.
              </p>
            </div>

            {/* Government Vision */}
            <div className="border-l-2 border-[#043927]/20 pl-5 sm:pl-7">
              <h3 className="text-lg font-semibold text-[#043927] sm:text-xl">
                Supporting Dholera&apos;s Development Vision
              </h3>

              <p className="mt-3 text-base leading-8 text-gray-600 sm:text-lg sm:leading-9">
                Our efforts align with the Government&apos;s vision to develop
                Dholera as a global centre for innovation, sustainability, and
                economic growth.
              </p>
            </div>
          </div>
        </div>

        {/* KEY HIGHLIGHTS */}
        <div className="mt-12 border-t border-gray-200 pt-8 sm:mt-16">
          <div className="grid gap-6 sm:grid-cols-3">
            {/* Founded */}
            <div>
              <p className="text-3xl font-bold text-[#043927]">2018</p>

              <p className="mt-1 text-sm text-gray-500">
                Founded
              </p>
            </div>

            {/* Dholera SIR */}
            <div className="sm:border-l sm:border-gray-200 sm:pl-8">
              <p className="text-3xl font-bold text-[#043927]">
                Dholera SIR
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Our key real estate market
              </p>
            </div>

            {/* Future */}
            <div className="sm:border-l sm:border-gray-200 sm:pl-8">
              <p className="text-3xl font-bold text-[#043927]">
                Future
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Building opportunities for tomorrow
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}