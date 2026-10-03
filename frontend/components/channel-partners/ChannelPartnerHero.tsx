import Image from "next/image";

export default function ChannelPartnerHero() {
  return (
    <section
      aria-labelledby="channel-partner-heading"
      className="relative h-[380px] w-full overflow-hidden bg-[#043927] sm:h-[420px] lg:h-[460px]"
    >
      <Image
        src="/images/channel-partners-hands.webp"
        alt="HR Realty International channel partner opportunity"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#043927]/55"
      />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="px-6 text-center">
          <h1
            id="channel-partner-heading"
            className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Channel{" "}
            <span className="text-[#C9A45C]">Partners</span>
          </h1>

          <div
            aria-hidden="true"
            className="mx-auto mt-5 h-[2px] w-16 bg-[#C9A45C]"
          />
        </div>
      </div>
    </section>
  );
}