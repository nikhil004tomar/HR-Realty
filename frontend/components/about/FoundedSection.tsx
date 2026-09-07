export default function FoundedSection() {
  return (
    <section className="relative overflow-hidden bg-[#043927] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.5fr] lg:gap-20">
          
          {/* Heading */}
          <div>
            <div className="sticky top-24">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#8b7650]">
                Our Story
              </p>

              <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                Founded in{" "}
                <span className="text-[#b2965d]">2015</span>
              </h2>

              <div className="mt-6 h-[2px] w-16 bg-[#b2965d]" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-7">
            <p className="text-lg leading-8 text-[#394b45] sm:text-xl sm:leading-9">
              SmartHomes Infrastructure Pvt. Ltd. has established itself as a
              leading real estate conglomerate in Dholera Smart City —
              India's first planned, futuristic smart city and one of the
              world's most dynamic markets.
            </p>

            <p className="text-base leading-8 text-[#68736f] sm:text-lg sm:leading-9">
              A vision to redefine the real estate industry, we take pride in
              being your trusted partner in creating a legacy in Dholera.
              Recognised as a pioneer in Commercial, Industrial, and
              Residential land development, we operate with a unique blend of
              expertise, education, &amp; international experience.
            </p>

            <p className="text-base leading-8 text-[#68736f] sm:text-lg sm:leading-9">
              Our efforts align with the Government’s vision to develop Dholera
              as a global centre for innovation, sustainability, and economic
              growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}