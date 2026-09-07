import Image from "next/image";
import Link from "next/link";

import {
  getProjects,
  getImageUrl,
} from "@/lib/projects";


export default async function ProjectsGrid() {

  const projects = await getProjects();

  const publishedProjects =
    projects.filter(
      (project) => project.is_published
    );


  return (
    <section className="bg-white py-16 md:py-24">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}

        <div className="mb-12 max-w-3xl">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#b2965d]">
            Residential Projects
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-[#043927] md:text-5xl">

            Our Projects at{" "}

            <span className="text-[#b2965d]">
              Dholera Smart City
            </span>

          </h2>

          <p className="mt-5 text-base leading-8 text-gray-600 md:text-lg">
            Discover our residential plotted development projects
            strategically located across Dholera SIR, designed for
            long-term investment and future growth.
          </p>

        </div>


        {/* Empty State */}

        {publishedProjects.length === 0 ? (

          <div className="rounded-3xl border border-gray-200 bg-gray-50 px-6 py-16 text-center">

            <h3 className="text-2xl font-semibold text-[#043927]">
              No Projects Available
            </h3>

            <p className="mt-3 text-gray-500">
              New projects will appear here soon.
            </p>

          </div>

        ) : (


          /* Projects Grid */

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {publishedProjects.map((project) => (

              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >

                {/* Image */}

                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">

                  {project.images &&
                  project.images.length > 0 ? (

                    <Image
                      src={getImageUrl(
                        project.images[0].image_url
                      )}
                      alt={
                        project.images[0].alt_text ||
                        project.title
                      }
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                  ) : (

                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                      No Image Available
                    </div>

                  )}


                  {/* Image Overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />


                  {/* Status */}

                  <div className="absolute right-4 top-4">

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md ${
                        project.status === "Sold Out"
                          ? "bg-black/70 text-white"
                          : "bg-[#043927]/90 text-white"
                      }`}
                    >
                      {project.status}
                    </span>

                  </div>


                  {/* Project Number */}

                  <div className="absolute bottom-4 left-4">

                    <span className="text-sm font-medium text-white/80">
                      Project {project.id}
                    </span>

                  </div>

                </div>


                {/* Card Content */}

                <div className="flex items-center justify-between gap-4 p-5">

                  <div>

                    <h3 className="text-lg font-semibold text-[#043927] transition-colors duration-300 group-hover:text-[#b2965d]">
                      {project.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {project.location}
                    </p>

                  </div>


                  {/* Arrow */}

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-[#043927] transition-all duration-300 group-hover:border-[#b2965d] group-hover:bg-[#b2965d] group-hover:text-white">
                    →
                  </span>

                </div>

              </Link>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}