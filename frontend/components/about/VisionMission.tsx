export default function VisionMission() {
  return (
    <section className="bg-[#043927] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-6 md:grid-cols-2">

          {/* Vision */}
          <div className="group relative overflow-hidden rounded-3xl bg-neutral-950 p-8 text-white md:p-12">
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full border border-white/10 transition-transform duration-700 group-hover:scale-125" />

            <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-white/45">
              Vision
            </p>

            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
              Building the{" "}
              <span className="text-[#b2965d]">Future, Today</span>
            </h2>

            <div className="mt-6 h-px w-12 bg-white/30" />

            <p className="mt-6 max-w-xl text-base leading-8 text-white/65">
              
             A vision to create an economically and socially balanced, new-age Greenfield smart city with world 
             class Infrastructure leading to stable economic growth and sustainable high-quality life, &amp; international experience.
            </p>
          </div>

          {/* Mission */}
          <div className="group relative overflow-hidden rounded-3xl bg-neutral-100 p-8 md:p-12">
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full border border-black/5 transition-transform duration-700 group-hover:scale-125" />

            <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-black/40">
              Mission
            </p>

            <h2 className="text-3xl font-medium tracking-tight text-neutral-900 md:text-4xl">
              Revolutionizing{" "}
              <span className="text-[#b2965d]">Real Estate</span>
            </h2>

            <div className="mt-6 h-px w-12 bg-neutral-300" />

            <p className="mt-6 max-w-xl text-base leading-8 text-neutral-600">
             HR Realty is to adopt a futuristic and sustainability approach across key components to create a new-age Smart City.
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-neutral-600">
             To become a global high-tech manufacturing hub.
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-neutral-600">
             To create huge employment opportunities across sectors and contribute to the economic and social develpoment of the Gujarat and India.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}