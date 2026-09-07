import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative h-[380px] w-full overflow-hidden md:h-[430px]">
      {/* Background Image */}
      <Image
        src="/images/bulk-land/4.webp"
        alt="About Us"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark luxury overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-black/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-14 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-white/75">
              SmartHomes Infrastructure
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              About <span className="font-normal">Us</span>
            </h1>

            <div className="mt-5 h-[2px] w-16 bg-[#c9b27c]" />
          </div>
        </div>
      </div>
    </section>
  );
}