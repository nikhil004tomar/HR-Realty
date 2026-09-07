import Image from "next/image";

export default function ChannelPartnerHero() {
  return (
    <section className="relative bg-[#043927] h-[380px] w-full overflow-hidden">
      <Image
        src="/images/channel-partners-hands.webp"
        alt="Channel Partner"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#043927]/55" />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="px-6 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Channel{" "}
            <span className="text-[#b2965d]">
              Partners
            </span>
          </h1>

          <div className="mx-auto mt-5 h-[2px] w-16 bg-[#b2965d]" />
        </div>
      </div>
    </section>
  );
}