export default function VisionMission() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* SECTION HEADER */}
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#C9A45C]" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
              Our Purpose
            </span>

            <span className="h-px w-10 bg-[#C9A45C]" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl md:text-5xl">
            Vision &{" "}
            <span className="text-[#043927]">
              Mission
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-black/55 sm:text-base">
            To become India's most trusted real estate company by building the nation's largest and most successful Channel Partner-driven network.
            Our vision and mission guide our commitment to
            building a sustainable, future-ready and
            progressive real estate ecosystem.
          </p>
        </div>


        {/* VISION + MISSION */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* =========================
              VISION
          ========================== */}
          <div
            className="
              group
              rounded-2xl
              border
              border-black/10
              bg-white
              p-7
              shadow-[0_8px_30px_rgba(0,0,0,0.06)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-[#C9A45C]/60
              hover:shadow-[0_12px_35px_rgba(0,0,0,0.09)]
              md:p-10
            "
          >

            {/* Label */}
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#043927] text-sm font-semibold text-white">
                01
              </span>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
                Vision
              </p>
            </div>


            {/* Heading */}
            <h2 className="mt-7 text-3xl font-bold leading-tight tracking-tight text-[#111111] md:text-4xl">
              Building the{" "}
              <span className="text-[#C9A45C]">
                Future, Today
              </span>
            </h2>


            {/* Gold line */}
            <div className="mt-5 h-1 w-12 rounded-full bg-[#C9A45C] transition-all duration-300 group-hover:w-20" />


            {/* Content */}
            <p className="mt-6 text-base leading-8 text-black/60">
              As we grow, we aspire to set new benchmarks in the Indian real estate industry through innovation, operational excellence, customer-centric solutions, and a strong partner-first approach. We believe that when our partners succeed, our customers benefit—and when our customers trust us, our entire ecosystem grows stronger.

              Our ultimate vision is to build a nationwide real estate network that not only leads the market but also creates opportunities, builds trust, empowers people, and contributes to the long-term growth of India’s real estate sector.
            </p>

          </div>


          {/* =========================
              MISSION
          ========================== */}
          <div
            className="
              group
              rounded-2xl
              border
              border-black/10
              bg-[#043927]
              p-7
              shadow-[0_8px_30px_rgba(0,0,0,0.08)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_12px_35px_rgba(0,0,0,0.12)]
              md:p-10
            "
          >

            {/* Label */}
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A45C] text-sm font-semibold text-[#043927]">
                02
              </span>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Mission
              </p>
            </div>


            {/* Heading */}
            <h2 className="mt-7 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
              Revolutionizing{" "}
              <span className="text-[#C9A45C]">
                Real Estate
              </span>
            </h2>


            {/* Gold line */}
            <div className="mt-5 h-1 w-12 rounded-full bg-[#C9A45C] transition-all duration-300 group-hover:w-20" />


            {/* Mission points */}
            <div className="mt-7 space-y-5">

              {/* Point 1 */}
              <div className="flex gap-4">

                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#C9A45C]/60 text-xs text-[#C9A45C]">
                  ✓
                </span>

                <p className="text-sm leading-7 text-white/70 sm:text-base">
                  To build India's largest, most trusted, and high-performing Channel Partner network by empowering our associates with transparent business practices, quality real estate opportunities, continuous training, innovative marketing support, and rewarding growth opportunities.
                </p>

              </div>


              {/* Point 2 */}
              <div className="flex gap-4">

                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#C9A45C]/60 text-xs text-[#C9A45C]">
                  ✓
                </span>

                <p className="text-sm leading-7 text-white/70 sm:text-base">
                  Core Values                </p>

              </div>


              {/* Point 3 */}
              <div className="flex gap-4">

                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#C9A45C]/60 text-xs text-[#C9A45C]">
                  ✓
                </span>

                <p className="text-sm leading-7 text-white/70 sm:text-base">
                  •	Integrity
                  •	Transparency
                  •	Partnership
                  •	Innovation
                  •	Excellence
                  •	Customer First
                  •	Long-Term Relationships

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}