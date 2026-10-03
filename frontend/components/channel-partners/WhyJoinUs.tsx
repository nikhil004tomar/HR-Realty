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
    <section
      aria-labelledby="why-join-us-heading"
      className="bg-[#043927] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* HEADER */}
        <header className="mb-12 text-center">
          <h2
            id="why-join-us-heading"
            className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl"
          >
            Why{" "}
            <span className="text-[#C9A45C]">Join Us?</span>
          </h2>

          <div
            aria-hidden="true"
            className="mx-auto mt-5 h-[2px] w-16 bg-[#C9A45C]"
          />
        </header>

        {/* BENEFITS */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.title}
                className="
                  group
                  rounded-2xl
                  border
                  border-white/10
                  bg-white
                  p-7
                  transition-colors
                  duration-300
                  hover:border-[#C9A45C]/50
                  hover:shadow-xl
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    mb-5
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-[#043927]
                  "
                >
                  <Icon
                    size={23}
                    strokeWidth={1.7}
                    className="text-[#C9A45C]"
                  />
                </div>

                <h3 className="text-lg font-semibold text-[#043927]">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {benefit.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}