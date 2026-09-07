import Image from "next/image";

export default function ProjectsHero() {
  return (
    <section className="relative h-[300px] overflow-hidden bg-[#043927] md:h-[380px]">

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-[#b2965d]">
            SmartHomes Infrastructure
          </p>

          <h1 className="text-4xl font-semibold text-white md:text-6xl">
            Our <span className="text-[#b2965d]">Projects</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">
            Explore our residential projects and investment opportunities
            across Dholera Smart City.
          </p>
        </div>
      </div>
    </section>
  );
}