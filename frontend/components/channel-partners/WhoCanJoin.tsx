import {
  UserRound,
  Building2,
  BriefcaseBusiness,
} from "lucide-react";

const partners = [
  {
    title: "Individuals",
    icon: UserRound,
  },
  {
    title: "Real Estate Agents & Brokers",
    icon: Building2,
  },
  {
    title: "Institutional Channel Partners",
    icon: BriefcaseBusiness,
  },
];

export default function WhoCanJoin() {
  return (
    <section
      aria-labelledby="who-can-join-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">

          {/* INTRO */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
              Partnership Opportunity
            </p>

            <h2
              id="who-can-join-heading"
              className="text-3xl font-semibold text-[#043927] sm:text-4xl lg:text-5xl"
            >
              Who Can{" "}
              <span className="text-[#C9A45C]">Join?</span>
            </h2>

            <div
              aria-hidden="true"
              className="mt-6 h-[2px] w-16 bg-[#C9A45C]"
            />

            <p className="mt-6 max-w-lg leading-8 text-gray-600">
              Whether you&apos;re an individual professional or an established
              real estate organization, our channel partner program is built
              to help you grow.
            </p>
          </div>

          {/* PARTNER TYPES */}
          <div className="grid gap-4">
            {partners.map((partner) => {
              const Icon = partner.icon;

              return (
                <article
                  key={partner.title}
                  className="
                    flex
                    items-center
                    gap-5
                    rounded-2xl
                    border
                    border-[#043927]/10
                    bg-[#f7f5ef]
                    p-5
                    transition-colors
                    duration-300
                    hover:border-[#C9A45C]
                  "
                >
                  <div
                    aria-hidden="true"
                    className="
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#043927]
                    "
                  >
                    <Icon
                      className="text-[#C9A45C]"
                      size={24}
                      strokeWidth={1.7}
                    />
                  </div>

                  <h3 className="font-medium text-[#043927]">
                    {partner.title}
                  </h3>
                </article>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}