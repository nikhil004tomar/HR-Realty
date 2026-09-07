import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Dholera Forest Estate",
    image: "/images/bulk-land/index5.webp",
    href: "/project/dholera-forest-estate",
  },
  {
    title: "Dholera Expressway City V",
    image: "/images/bulk-land/index5.webp",
    href: "/project/Dholera-Expressway-City-V",
  },
  {
    title: "Dholera Expressway City 1",
    image: "/images/bulk-land/index5.webp",
    href: "/project/dholera-expressway-city-I",
  },
  {
    title: "Dholera Expressway City Township",
    image: "/images/bulk-land/index5.webp",
    href: "/project/dholera-expressway-city-township",
  },
  {
    title: "Dholera Expressway Avenue 1",
    image: "/images/bulk-land/index5.webp",
    href: "/project/dholera-expressway-avenue-I",
  },
];

export default function OngoingProjects() {
  return (
    <section className="bg-[#043927] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* Heading */}
        <div className="flex items-end justify-between">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
              Our Portfolio
            </p>

            <h2 className="mt-5 text-4xl font-medium tracking-tight text-neutral-900 md:text-5xl">
              <span className="text-neutral-400">
                Ongoing
              </span>{" "}
              Projects
            </h2>
          </div>

          <Link
            href="/projects"
            className="hidden text-sm font-medium text-neutral-600 transition hover:text-black md:block"
          >
            View All →
          </Link>

        </div>

        {/* Projects */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-200">

                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-sm font-medium leading-6 text-white">
                    {project.title}
                  </h3>
                </div>

              </div>
            </Link>
          ))}

        </div>

        {/* Mobile */}
        <Link
          href="/projects"
          className="mt-8 inline-flex text-sm font-medium text-neutral-600 md:hidden"
        >
          View All Projects →
        </Link>

      </div>
    </section>
  );
}