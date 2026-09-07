import {
  BadgeIndianRupee,
  GraduationCap,
  ChartNoAxesCombined,
  MapPinned,
  Presentation,
  Video,
  Handshake,
} from "lucide-react";

const benefits = [
  {
    title: "High & Consistent Payouts",
    description:
      "Industry-best commissions with timely disbursements.",
    icon: BadgeIndianRupee,
  },
  {
    title: "Full Training & Support",
    description:
      "Get equipped with the right knowledge to close deals confidently.",
    icon: GraduationCap,
  },
  {
    title: "Live Lead Tracking",
    description:
      "Track your leads in real time and stay updated on their progress.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Site Visit Assistance",
    description:
      "We provide seamless site visit arrangements for your clients.",
    icon: MapPinned,
  },
  {
    title: "Joint Events & Webinars",
    description:
      "Engage large audiences through exclusive real estate events & webinars.",
    icon: Presentation,
  },
  {
    title: "Zoom Sessions for Clients",
    description:
      "Schedule online meetings with clients for faster conversions.",
    icon: Video,
  },
  {
    title: "End-to-End Sales & Marketing Support",
    description:
      "From lead nurturing to deal closure, we've got your back!",
    icon: Handshake,
  },
];

export default function WhyJoinUs() {
  return (
    <section className="bg-[#043927] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Why{" "}
            <span className="text-[#b2965d]">
              Join Us?
            </span>
          </h2>

          <div className="mx-auto mt-5 h-[2px] w-16 bg-[#b2965d]" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="group rounded-2xl border border-[#043927]/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#b2965d]/50 hover:shadow-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#043927]">
                  <Icon
                    size={23}
                    strokeWidth={1.7}
                    className="text-[#b2965d]"
                  />
                </div>

                <h3 className="text-lg font-semibold text-[#043927]">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}