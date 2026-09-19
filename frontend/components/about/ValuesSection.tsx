const services = [
  {
    number: "01",
    title: "Land Investment",
    items: [
      "Premium NA, NOC & Title Clear Land",
    ],
  },
  {
    number: "02",
    title: "Residential Projects",
    items: [
      "Plots",
      "Apartments",
      "Villas",
      "Farm Houses",
    ],
  },
  {
    number: "03",
    title: "Commercial Projects",
    items: [
      "Retail",
      "Office Spaces",
      "Commercial Investment",
    ],
  },
  {
    number: "04",
    title: "Project Marketing",
    items: [
      "Exclusive Sales Mandates",
      "Sales Strategy",
      "Launch Planning",
      "Digital Marketing",
    ],
  },
  {
    number: "05",
    title: "Investment Advisory",
    items: [
      "Professional Investment Guidance",
      "Portfolio Planning",
    ],
  },
  {
    number: "06",
    title: "Developer Solutions",
    items: [
      "Project Sales",
      "Branding",
      "Marketing",
      "CRM Support",
    ],
  },
];

export default function ValuesSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* HEADER */}
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#C9A45C]" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
              Our Services
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#111111] sm:text-4xl md:text-5xl">
            Complete{" "}
            <span className="text-[#043927]">
              Real Estate Solutions
            </span>
          </h2>

          <div className="mt-5 h-1 w-14 rounded-full bg-[#C9A45C]" />
        </div>

        {/* SERVICES GRID */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {services.map((service) => (
            <div
              key={service.number}
              className="
                group
                rounded-2xl
                border
                border-black/10
                bg-white
                p-6
                shadow-[0_6px_25px_rgba(0,0,0,0.05)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#C9A45C]/60
                hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]
              "
            >
              {/* NUMBER */}
              <span className="text-sm font-semibold text-[#C9A45C]">
                {service.number}
              </span>

              {/* TITLE */}
              <h3 className="mt-5 text-xl font-bold text-[#043927]">
                {service.title}
              </h3>

              {/* GOLD LINE */}
              <div className="mt-3 h-1 w-10 rounded-full bg-[#C9A45C] transition-all duration-300 group-hover:w-14" />

              {/* SERVICE ITEMS */}
              <ul className="mt-5 space-y-2.5">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-6 text-black/60"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A45C]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}