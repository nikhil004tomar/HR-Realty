"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Dholera Forest Estate",
    slug: "dholera-forest-estate",
    image: "/images/projects/banner_web_1777900732_38.jpg",
  },
  {
    title: "Dholera Expressway City V",
    slug: "dholera-expressway-city-v",
    image: "/images/projects/banner_web_1747645267_89.jpg",
  },
  {
    title: "Dholera Expressway City I",
    slug: "dholera-expressway-city-i",
    image: "/images/projects/banner_web_1736245366_5.jpg",
  },
  {
    title: "Dholera Expressway City Township",
    slug: "dholera-expressway-city-township",
    image: "/images/projects/banner_web_1736245309_6.jpg",
  },
  {
    title: "Dholera Expressway Avenue I",
    slug: "dholera-expressway-avenue-i",
    image: "/images/projects/banner_web_1736247039_100.jpg",
  },
];

export default function BulkLandProjects() {
  return (
    <section className="bg-[#043927] text-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

        {/* Heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-16">
          <div className="max-w-3xl">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.22em] text-[#043927]">
              Our Developments
            </span>

            <h2 className="text-4xl font-medium leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              Ongoing{" "}
              <span className="text-[#043927]">Projects</span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
              Explore strategically located projects across Dholera SIR,
              developed for residential, commercial and long-term investment
              opportunities.
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#043927] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#065238]"
          >
            View All Projects
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        {/* Projects */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/project/${project.slug}`}
              className={`group relative overflow-hidden rounded-[24px] bg-neutral-100 ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden ${
                  index === 0
                    ? "aspect-[16/8]"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 1024px) 100vw, 66vw"
                      : "(max-width: 1024px) 50vw, 33vw"
                  }
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                {/* Number */}
                <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/20 text-sm font-medium text-white backdrop-blur-md">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Arrow */}
                <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#043927] opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={19} />
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-white/70">
                    Dholera SIR
                  </p>

                  <h3 className="max-w-xl text-2xl font-medium leading-tight text-white sm:text-3xl">
                    {project.title}
                  </h3>

                  <div className="mt-4 h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 overflow-hidden rounded-[28px] bg-[#043927] px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                Find Your Opportunity
              </p>

              <h3 className="text-3xl font-medium leading-tight text-white sm:text-4xl">
                Looking for the right land investment in Dholera?
              </h3>

              <p className="mt-4 text-sm leading-6 text-white/70 sm:text-base">
                Speak with our team to discover suitable residential,
                commercial and industrial land opportunities.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#043927] transition-all duration-300 hover:bg-neutral-100"
            >
              Inquire Now
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}