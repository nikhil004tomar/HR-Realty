import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Mail,
  MapPin,
  Users,
} from "lucide-react";

const opportunities = [
  {
    icon: Building2,
    title: "Real Estate Sales",
    description:
      "Build relationships with clients and help them discover suitable real estate opportunities.",
    href: "/careers/real-estate-sales",
  },
  {
    icon: Users,
    title: "Channel Partners",
    description:
      "Work with our growing network of channel partners and create new business opportunities.",
    href: "/channel-partner",
  },
  {
    icon: BriefcaseBusiness,
    title: "Business Development",
    description:
      "Identify new opportunities, develop partnerships and contribute to our business growth.",
    href: "/careers/business-development",
  },
];

const benefits = [
  "Professional and collaborative work environment",
  "Opportunities to learn and grow",
  "Real estate industry exposure",
  "Performance-oriented career opportunities",
  "Supportive team and management",
  "Opportunity to work on Dholera real estate projects",
];

export default function CareersPage() {
  return (
    <main className="bg-white text-[#111111]">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#043927]">
        <div className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[540px]">

          <Image
            src="/images/bulk-land/bulk-land1.webp"
            alt="Careers at HR Realty"
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              transition-transform
              duration-700
              ease-out
              hover:scale-[1.02]
            "
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Green Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#043927]/95 via-[#043927]/65 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 mx-auto flex min-h-[420px] max-w-7xl items-center px-5 py-16 sm:min-h-[480px] sm:px-8 lg:min-h-[540px] lg:px-10">

            <div className="max-w-3xl">

              {/* Label */}
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#C9A45C]" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
                  Careers
                </span>
              </div>

              {/* Heading */}
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Build Your Career
                <span className="block text-[#C9A45C]">
                  With Us
                </span>
              </h1>

              {/* Gold Line */}
              <div className="mt-6 h-1 w-14 rounded-full bg-[#C9A45C]" />

              {/* Description */}
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
                Join a growing real estate team and be part of opportunities
                shaping the future of Dholera and its surrounding markets.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <Link
                  href="#openings"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-[#C9A45C]
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-[#111111]
                    transition-all
                    duration-300
                    hover:bg-white
                    hover:shadow-lg
                  "
                >
                  View Opportunities

                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="#apply"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    border
                    border-white/40
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:border-white
                    hover:bg-white
                    hover:text-[#043927]
                  "
                >
                  Apply Now
                </Link>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ===================================================== */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            {/* IMAGE */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 shadow-sm">

              <Image
                src="/images/bulk-land/bulkland2.webp"
                alt="Join our real estate team"
                width={1000}
                height={750}
                className="
                  h-[320px]
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-[1.03]
                  sm:h-[420px]
                  lg:h-[480px]
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              <div className="absolute bottom-5 left-5">

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
                  Join Our Team
                </p>

                <p className="mt-1 text-xl font-semibold text-white">
                  Grow With Us
                </p>

              </div>
            </div>

            {/* CONTENT */}
            <div>

              <div className="flex items-center gap-3">

                <span className="h-px w-8 bg-[#C9A45C]" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
                  Work With Us
                </span>

              </div>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-[#111111] sm:text-4xl lg:text-5xl">
                Be Part of Our
                <span className="block text-[#043927]">
                  Growing Team
                </span>
              </h2>

              <div className="mt-5 h-1 w-12 rounded-full bg-[#C9A45C]" />

              <p className="mt-6 text-base leading-7 text-gray-600">
                At HR Realty, we believe our people are an important part of
                our growth. We are building a team of motivated professionals
                who are passionate about real estate, client relationships and
                business development.
              </p>

              <p className="mt-4 text-base leading-7 text-gray-600">
                Whether you are experienced in real estate or looking to build
                your career in the industry, we welcome people who bring
                commitment, professionalism and a willingness to learn.
              </p>

              {/* Highlight */}
              <div className="mt-7 rounded-xl border border-[#C9A45C]/40 bg-[#C9A45C]/10 p-5">

                <p className="text-sm font-semibold text-[#043927]">
                  Looking for your next opportunity?
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Explore our current opportunities and connect with our team.
                </p>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OPPORTUNITIES
      ===================================================== */}
      <section
        id="openings"
        className="border-y border-gray-200 bg-gray-50 py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          {/* SECTION HEADING */}
          <div className="mx-auto max-w-3xl text-center">

            <div className="flex items-center justify-center gap-3">

              <span className="h-px w-8 bg-[#C9A45C]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
                Opportunities
              </span>

              <span className="h-px w-8 bg-[#C9A45C]" />

            </div>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#111111] sm:text-4xl lg:text-5xl">
              Find Your Place
              <span className="text-[#043927]">
                {" "}With Us
              </span>
            </h2>

            <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-[#C9A45C]" />

            <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg">
              We are always interested in connecting with talented,
              motivated and passionate people.
            </p>

          </div>

          {/* OPPORTUNITY CARDS */}
          <div className="mt-12 grid gap-5 md:grid-cols-3">

            {opportunities.map((opportunity) => {
              const Icon = opportunity.icon;

              return (
                <Link
                  key={opportunity.title}
                  href={opportunity.href}
                  className="
                    group
                    block
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-6
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#C9A45C]
                    hover:shadow-md
                  "
                >

                  {/* ICON */}
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#043927]
                      text-white
                      transition-all
                      duration-300
                      group-hover:bg-[#C9A45C]
                      group-hover:text-[#111111]
                    "
                  >
                    <Icon
                      className="h-6 w-6"
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* TITLE */}
                  <h3 className="mt-5 text-xl font-semibold text-[#111111]">
                    {opportunity.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {opportunity.description}
                  </p>

                  {/* LINK */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#043927]">

                    Explore Opportunity

                    <ArrowRight
                      className="
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />

                  </div>

                </Link>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================================
          WHY JOIN US
      ===================================================== */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">

            {/* LEFT CONTENT */}
            <div>

              <div className="flex items-center gap-3">

                <span className="h-px w-8 bg-[#C9A45C]" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
                  Why Join Us
                </span>

              </div>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-[#111111] sm:text-4xl">

                Grow Your Skills.

                <span className="block text-[#043927]">
                  Grow With Us.
                </span>

              </h2>

              <div className="mt-5 h-1 w-12 rounded-full bg-[#C9A45C]" />

              <p className="mt-6 text-base leading-7 text-gray-600">
                We aim to create a professional environment where our team
                members can develop their skills, take on new responsibilities
                and contribute to meaningful business growth.
              </p>

            </div>

            {/* BENEFITS */}
            <div className="grid gap-3 sm:grid-cols-2">

              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="
                    flex
                    items-start
                    gap-3
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    p-4
                    transition-all
                    duration-300
                    hover:border-[#C9A45C]
                    hover:shadow-sm
                  "
                >

                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#043927]"
                    strokeWidth={2}
                  />

                  <p className="text-sm leading-6 text-gray-700">
                    {benefit}
                  </p>

                </div>
              ))}

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          APPLICATION CTA
      ===================================================== */}
      <section
        id="apply"
        className="bg-gray-50 py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-5xl px-5 sm:px-8">

          <div className="rounded-2xl bg-[#043927] p-7 text-center sm:p-10 lg:p-14">

            {/* ICON */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A45C] text-[#111111]">
              <Mail className="h-6 w-6" />
            </div>

            {/* HEADING */}
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              Ready to Start Your Journey?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Send us your profile and let us know how you can contribute to
              our growing real estate team.
            </p>

            {/* EMAIL BUTTON */}
            <a
              href="mailto:hrrealtyinternational@gmail.com"
              className="
                mt-7
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-white
                px-6
                py-3.5
                text-sm
                font-semibold
                text-[#043927]
                transition-all
                duration-300
                hover:bg-[#C9A45C]
                hover:text-[#111111]
              "
            >
              Send Your Resume

              <ArrowUpRight className="h-4 w-4" />
            </a>

            {/* DETAILS */}
            <div className="mt-7 flex flex-col items-center justify-center gap-3 text-sm text-white/60 sm:flex-row">

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#C9A45C]" />

                <span>
                  Dholera / Ahmedabad, Gujarat
                </span>
              </div>

              <span className="hidden sm:block">
                •
              </span>

              <div className="flex items-center gap-2">

                <BriefcaseBusiness className="h-4 w-4 text-[#C9A45C]" />

                <span>
                  Real Estate Opportunities
                </span>

              </div>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
}