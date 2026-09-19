export default function FoundedSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.5fr] lg:gap-20">

          {/* =================================================
              LEFT — HEADING
          ================================================= */}
          <div
            className="
              transition-all
              duration-500
              ease-out
            "
          >
            {/* Label */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C9A45C]" />

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
                Our Story
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-[#111111] sm:text-5xl">
              Founded in{" "}
              <span className="text-[#043927]">
                2018
              </span>
            </h2>

            {/* Gold Line */}
            <div className="mt-5 h-1 w-12 rounded-full bg-[#C9A45C]" />

            {/* Small Supporting Text */}
            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-500">
              Building trust through real estate and creating opportunities
              for the future.
            </p>
          </div>

          {/* =================================================
              RIGHT — CONTENT
          ================================================= */}
          <div className="space-y-6">

            {/* Main Paragraph */}
            <div
              className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#C9A45C]
                hover:shadow-md
                sm:p-8
              "
            >
              <p className="text-lg font-medium leading-8 text-[#043927] sm:text-xl sm:leading-9">
                HR Realty International is a modern real estate organization established with a clear purpose—to transform the way real estate is marketed and sold by building a powerful, transparent, and technology-enabled Channel Partner ecosystem.
We specialize in premium land investments, residential and commercial projects, project marketing, investment advisory, and developer partnerships. Our business model is designed to create growth opportunities for channel partners while delivering trusted investment solutions to customers.
At HR Realty International, we believe that our success is built on the success of our partners.
{/*
 Dholera SIR — India&apos;s
 first Greenfield Smart City planned.
 */}
              </p>
            </div>

            {/* Vision Paragraph */}
            <div
              className="
                border-l-2
                border-[#C9A45C]
                pl-5
                sm:pl-7
              "
            >
              <p className="text-base leading-8 text-gray-600 sm:text-lg sm:leading-9">
                A vision to create an economically and socially balanced,
                new-age Greenfield smart city with world-class infrastructure
                leading to stable economic growth and sustainable high-quality
                life, &amp; international experience.
              </p>
            </div>

            {/* Government Vision */}
            <div
              className="
                border-l-2
                border-[#043927]/20
                pl-5
                sm:pl-7
              "
            >
              <p className="text-base leading-8 text-gray-600 sm:text-lg sm:leading-9">
                Our efforts align with the Government&apos;s vision to develop
                Dholera as a global centre for innovation, sustainability, and
                economic growth.
              </p>
            </div>

          </div>
        </div>

        {/* =================================================
            BOTTOM HIGHLIGHT
        ================================================= */}
        <div className="mt-12 border-t border-gray-200 pt-8 sm:mt-16">

          <div className="grid gap-6 sm:grid-cols-3">

            {/* 2018 */}
            <div className="group">
              <p className="text-3xl font-bold text-[#043927] transition-colors duration-300 group-hover:text-[#C9A45C]">
                2018
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Founded
              </p>
            </div>

            {/* Dholera */}
            <div className="group sm:border-l sm:border-gray-200 sm:pl-8">
              <p className="text-3xl font-bold text-[#043927] transition-colors duration-300 group-hover:text-[#C9A45C]">
                Dholera SIR
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Our key real estate market
              </p>
            </div>

            {/* Future */}
            <div className="group sm:border-l sm:border-gray-200 sm:pl-8">
              <p className="text-3xl font-bold text-[#043927] transition-colors duration-300 group-hover:text-[#C9A45C]">
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