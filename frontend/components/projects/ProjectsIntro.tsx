export default function ProjectsIntro() {
  return (
    <section className="bg-[#f7f5ef] py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#b2965d]">
          Dholera SIR
        </p>

        <h2 className="text-3xl font-semibold text-[#043927] md:text-5xl">
          Building Opportunities for{" "}
          <span className="text-[#b2965d]">Tomorrow</span>
        </h2>

        <div className="mt-8 space-y-5 text-base leading-8 text-gray-600 md:text-lg">
          <p>
            Dholera Metro City is an active developer of{" "}
            <span className="font-semibold text-[#043927]">
              residential projects at Dholera SIR
            </span>
            , offering NA/NOC/title-clear residential plots at competitive
            prices in strategically selected locations.
          </p>

          <p>
            With multiple projects across Dholera SIR, our developments are
            positioned to benefit from the city's expanding infrastructure,
            connectivity and economic potential.
          </p>

          <p>
            Several projects have already been successfully sold out, with
            more than 1,000 plots sold across Dholera Metro City projects. Our
            focus remains on providing transparent opportunities and
            investment-oriented residential developments.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#projects"
            className="rounded-full bg-[#043927] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#075c3e]"
          >
            Explore Projects
          </a>

          
        </div>
      </div>
    </section>
  );
}