import Image from "next/image";

export default function BulkLandHero() {
  return (
    <section className="relative overflow-hidden bg-[#043927]">
      <div className="relative h-[300px] sm:h-[350px] lg:h-[420px]">
        {/* Desktop image */}
        <Image
          src="/images/bulk-land/bulk-land1.webp"
          alt="Buy Bulk Land in Dholera"
          fill
          priority
          className="hidden object-cover md:block"
          sizes="100vw"
        />

        {/* Mobile image */}
        <Image
          src="/images/logo.jpeg"
          alt="Buy Bulk Land in Dholera"
          fill
          priority
          className="object-cover md:hidden"
          sizes="100vw"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Theme overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#043927]/80 via-[#043927]/35 to-transparent" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <span className="mb-4 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-white backdrop-blur-md">
              Premium Land Opportunities
            </span>

            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Buy Bulk Land in{" "}
              <span className="text-[#d6b46a]">Dholera</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/85 sm:text-base lg:text-lg">
              Strategically located residential, commercial and industrial
              land parcels for investors, developers and businesses in Dholera
              SIR.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}