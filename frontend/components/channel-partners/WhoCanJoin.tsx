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
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#b2965d]">
              Partnership Opportunity
            </p>

            <h2 className="text-3xl font-semibold text-[#043927] sm:text-4xl lg:text-5xl">
              Who Can{" "}
              <span className="text-[#b2965d]">
                Join?
              </span>
            </h2>

            <div className="mt-6 h-[2px] w-16 bg-[#b2965d]" />

            <p className="mt-6 max-w-lg leading-8 text-gray-600">
              Whether you're an individual professional or an established
              real estate organization, our channel partner program is built
              to help you grow.
            </p>
          </div>

          <div className="grid gap-4">
            {partners.map((partner) => {
              const Icon = partner.icon;

              return (
                <div
                  key={partner.title}
                  className="flex items-center gap-5 rounded-2xl border border-[#043927]/10 bg-[#f7f5ef] p-5 transition-all duration-300 hover:border-[#b2965d]"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#043927]">
                    <Icon
                      className="text-[#b2965d]"
                      size={24}
                      strokeWidth={1.7}
                    />
                  </div>

                  <p className="font-medium text-[#043927]">
                    {partner.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}