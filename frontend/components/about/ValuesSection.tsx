const values = [
  {
    number: "01",
    title: "Honesty & Integrity",
    description:
      "We hold ourselves to the highest ethical standards in all that we do. At Smart Homes, our foundation is built on unwavering honesty and integrity.",
  },
  {
    number: "02",
    title: "Transparency",
    description:
      "Transparency is not just a promise; it's our way of doing business. We believe in openness and clarity in every transaction and decision.",
  },
  {
    number: "03",
    title: "Customer-Centric Approach",
    description:
      "Our clients are our most valuable assets. We are deeply committed to their satisfaction, tailoring our services to meet their unique desires and expectations.",
  },
  {
    number: "04",
    title: "Quality & Innovation",
    description:
      "Smart Homes leads with quality and innovation. We constantly embrace the latest technology to redefine our approach and set new industry standards.",
  },
];

export default function ValuesSection() {
  return (
    <section className="bg-[#043927] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* Heading */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b2965d]">
            Our Values
          </p>

          <h2 className="mt-5 text-4xl font-medium leading-tight tracking-tight text-white md:text-6xl">
            <span className="text-[#b2965d]">We Blend</span>{" "}
            excellence with creativity.
          </h2>
        </div>

        {/* Values */}
        <div className="mt-14 grid border-l border-t border-neutral-200 sm:grid-cols-2">

          {values.map((value) => (
            <div
              key={value.number}
              className="group border-b border-r border-neutral-200 p-7 transition-all duration-300 hover:bg-neutral-950 md:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400 group-hover:text-white/40">
                  {value.number}
                </span>

                <span className="text-lg text-neutral-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
                  ↗
                </span>
              </div>

              <h3 className="mt-12 text-xl font-medium text-[#b2965d] group-hover:text-white md:text-2xl">
                {value.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-neutral-500 group-hover:text-white/60">
                {value.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}