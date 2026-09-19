import Image from "next/image";

export default function DiscoverFuture() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        <div className="grid overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:grid-cols-2">

          {/* =====================================================
              IMAGE — FULL MAP
          ====================================================== */}
          <div className="relative min-h-[360px] overflow-hidden bg-[#f8f8f6] sm:min-h-[450px] md:min-h-[600px] lg:min-h-[650px]">

            <Image
              src="/images/bulk-land/Dholera-City-Map.png"
              alt="Dholera Smart City master plan map"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />

          </div>


          {/* =====================================================
              CONTENT
          ====================================================== */}
          <div className="flex flex-col justify-center p-7 sm:p-10 md:p-12 lg:p-16">

            {/* LABEL */}
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#C9A45C]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
                Discover the Future
              </span>
            </div>


            {/* HEADING */}
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-[#111111] sm:text-4xl md:text-5xl">
              Discover the Future with{" "}
              <span className="text-[#043927]">
                HR Realty International Pvt. Ltd.
              </span>
            </h2>


            {/* GOLD LINE */}
            <div className="mt-6 h-1 w-14 rounded-full bg-[#C9A45C]" />


            {/* DESCRIPTION */}
            <p className="mt-7 text-base leading-8 text-black/60">
              We Don&apos;t Just Sell Properties...
              We Build Entrepreneurs.
              Our company is dedicated to helping thousands of real estate
              professionals establish successful businesses through a
              structured Channel Partner Program. Whether you are an
              individual consultant, broker, influencer, or established
              real estate advisor, HR Realty International provides the
              platform, training, support, and opportunities needed to grow.
            </p>


            {/* SECOND DESCRIPTION */}
            <p className="mt-5 text-base leading-8 text-black/60">
              We create spaces that combine modern living with
              sustainability, technology, and unmatched quality.
            </p>


            {/* =====================================================
                HIGHLIGHTS
            ====================================================== */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">

              {/* Innovation */}
              <div className="border-l-2 border-[#C9A45C] pl-4">
                <p className="text-sm font-semibold text-[#043927]">
                  Innovation
                </p>

                <p className="mt-1 text-xs text-black/50">
                  Future-ready development
                </p>
              </div>


              {/* Sustainability */}
              <div className="border-l-2 border-[#C9A45C] pl-4">
                <p className="text-sm font-semibold text-[#043927]">
                  Sustainability
                </p>

                <p className="mt-1 text-xs text-black/50">
                  Responsible urban living
                </p>
              </div>


              {/* Quality */}
              <div className="border-l-2 border-[#C9A45C] pl-4">
                <p className="text-sm font-semibold text-[#043927]">
                  Quality
                </p>

                <p className="mt-1 text-xs text-black/50">
                  Built for long-term value
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}