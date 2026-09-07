"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import API_URL from "@/lib/api";


// ============================================================
// TYPES
// ============================================================

interface ProjectImage {
  id: number;
  project_id: number;
  image: string | null;
  title?: string | null;
  description?: string | null;
  sort_order?: number;
  is_published?: boolean;
}

interface Project {
  id: number;
  title: string;
  slug: string;

  location?: string | null;

  property_type?: string | null;

  description?: string | null;

  is_published?: boolean;

  images?: ProjectImage[];
}


// ============================================================
// FALLBACK IMAGE
// ============================================================

const FALLBACK_IMAGE =
  "/images/bulk-land/index5.webp";


// ============================================================
// COMPONENT
// ============================================================

export default function OurProjects() {

  const sectionRef =
    useRef<HTMLElement>(null);


  // ==========================================================
  // STATE
  // ==========================================================

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [active, setActive] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [mouse, setMouse] =
    useState({
      x: 0,
      y: 0,
    });


  // ==========================================================
  // LOAD PROJECTS
  // ==========================================================

  useEffect(() => {

    async function loadProjects() {

      try {

        setLoading(true);

        const response =
          await fetch(
            `${API_URL}/api/projects`,
            {
              cache: "no-store",
            }
          );


        if (!response.ok) {

          throw new Error(
            "Failed to load projects"
          );
        }


        const data =
          await response.json();


        if (!Array.isArray(data)) {

          setProjects([]);

          return;
        }


        /*
         * Only published projects.
         *
         * Homepage intentionally shows
         * maximum 4 projects.
         */

        const publishedProjects =
          data
            .filter(
              (project: Project) =>
                project.is_published === true
            )
            .slice(0, 4);


        setProjects(
          publishedProjects
        );


        /*
         * Reset active project
         * after loading new data.
         */

        setActive(0);


      } catch (error) {

        console.error(
          "OurProjects load error:",
          error
        );

        setProjects([]);

      } finally {

        setLoading(false);
      }
    }


    loadProjects();

  }, []);


  // ==========================================================
  // ACTIVE PROJECT
  // ==========================================================

  const project =
    projects[active];


  // ==========================================================
  // MOUSE MOVE
  // ==========================================================

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {

    const rect =
      e.currentTarget.getBoundingClientRect();


    const x =
      (
        (e.clientX - rect.left) /
          rect.width -
        0.5
      ) * 2;


    const y =
      (
        (e.clientY - rect.top) /
          rect.height -
        0.5
      ) * 2;


    setMouse({
      x,
      y,
    });
  };


  // ==========================================================
  // MOUSE LEAVE
  // ==========================================================

  const handleMouseLeave = () => {

    setMouse({
      x: 0,
      y: 0,
    });
  };


  // ==========================================================
  // NEXT PROJECT
  // ==========================================================

  const nextProject = () => {

    if (projects.length === 0) {
      return;
    }


    setActive((prev) =>
      prev === projects.length - 1
        ? 0
        : prev + 1
    );
  };


  // ==========================================================
  // PREVIOUS PROJECT
  // ==========================================================

  const previousProject = () => {

    if (projects.length === 0) {
      return;
    }


    setActive((prev) =>
      prev === 0
        ? projects.length - 1
        : prev - 1
    );
  };


  // ==========================================================
  // IMAGE URL
  // ==========================================================

  function getProjectImage(
    project: Project
  ) {

    const image =
      project.images?.find(
        (item) => item.image
      )?.image;


    if (!image) {

      return FALLBACK_IMAGE;
    }


    /*
     * Already absolute URL
     */

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {

      return image;
    }


    /*
     * Backend relative upload path
     *
     * Example:
     * /uploads/projects/abc/image.jpg
     */

    if (image.startsWith("/")) {

      return `${API_URL}${image}`;
    }


    /*
     * Safety fallback for malformed
     * database values.
     */

    return FALLBACK_IMAGE;
  }


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (
      <section
        ref={sectionRef}
        className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-[#043927] text-white"
      >

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-emerald-300" />

          <p className="mt-5 text-sm text-white/40">
            Loading projects...
          </p>

        </div>

      </section>
    );
  }


  // ==========================================================
  // NO PROJECTS
  // ==========================================================

  if (projects.length === 0) {

    return null;
  }


  // ==========================================================
  // MAIN
  // ==========================================================

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#043927] text-white"
    >

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Large glow */}

        <div
          className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-emerald-300/[0.07] blur-[150px]"
          style={{
            transform: `translate(
              ${mouse.x * 30}px,
              ${mouse.y * 20}px
            )`,
            transition:
              "transform .5s ease-out",
          }}
        />


        <div
          className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-teal-300/[0.06] blur-[170px]"
          style={{
            transform: `translate(
              ${mouse.x * -20}px,
              ${mouse.y * -15}px
            )`,
            transition:
              "transform .6s ease-out",
          }}
        />


        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,.7) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,.7) 1px,
                transparent 1px
              )
            `,
            backgroundSize:
              "80px 80px",
          }}
        />


        {/* Giant PROJECTS text */}

        <div
          className="absolute left-1/2 top-[30%] -translate-x-1/2 select-none whitespace-nowrap text-[17vw] font-black uppercase tracking-[-0.09em] text-white/[0.025]"
          style={{
            transform: `
              translateX(-50%)
              perspective(1000px)
              rotateX(${mouse.y * -2}deg)
              rotateY(${mouse.x * 4}deg)
            `,
            transition:
              "transform .5s ease-out",
          }}
        >
          PROJECTS
        </div>

      </div>


      {/* =====================================================
          OUTER FRAME
      ====================================================== */}

      <div className="pointer-events-none absolute inset-4 rounded-[2rem] border border-white/[0.09] sm:inset-6 lg:inset-10 lg:rounded-[3rem]" />


      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-[1500px] px-8 py-28 sm:px-12 lg:px-20 lg:py-36">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end lg:mb-20">

          <div>

            {/* Label */}

            <div className="mb-6 flex items-center gap-4">

              <span className="relative flex h-2.5 w-2.5">

                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-300/50" />

                <span className="relative block h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_20px_rgba(110,231,183,.8)]" />

              </span>


              <span className="text-[10px] uppercase tracking-[0.4em] text-white/45 sm:text-xs">
                Our Portfolio
              </span>

            </div>


            <h2 className="max-w-4xl text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.85] tracking-[-0.07em]">

              <span className="block text-white">
                Our
              </span>


              <span className="block text-white/[0.35]">

                Projects

                <span className="text-emerald-300">
                  .
                </span>

              </span>

            </h2>

          </div>


          <div className="max-w-sm">

            <p className="text-sm leading-7 text-white/40 sm:text-base">
              A CITY DESIGNED FOR TOMORROW, TAKING SHAPE TODAY.
            </p>

          </div>

        </div>


        {/* =================================================
            MAIN PROJECT SHOWCASE
        ================================================= */}

        <div className="grid gap-8 lg:grid-cols-[1.45fr_0.55fr]">


          {/* =================================================
              3D PROJECT CARD
          ================================================= */}

          <div
            onMouseMove={
              handleMouseMove
            }
            onMouseLeave={
              handleMouseLeave
            }
            className="group relative min-h-[500px] cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-[0_30px_100px_rgba(0,0,0,.25)] sm:min-h-[600px] lg:min-h-[680px]"
            style={{
              perspective:
                "1200px",
            }}
          >


            {/* IMAGE */}

            <div
              className="absolute inset-0"
              style={{
                transform: `
                  perspective(1200px)
                  rotateX(${mouse.y * -2.5}deg)
                  rotateY(${mouse.x * 4}deg)
                  scale(1.02)
                `,
                transition:
                  "transform .15s ease-out",
                transformStyle:
                  "preserve-3d",
              }}
            >

              <Image
                src={getProjectImage(
                  project
                )}
                alt={
                  project.title ||
                  "Project"
                }
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />

            </div>


            {/* Dark overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />


            {/* Green atmospheric overlay */}

            <div className="absolute inset-0 bg-gradient-to-br from-[#043927]/40 via-transparent to-emerald-950/40 mix-blend-multiply" />


            {/* =================================================
                3D FLOATING NUMBER
            ================================================= */}

            <div
              className="absolute right-7 top-7 select-none text-[7rem] font-black leading-none tracking-[-0.12em] text-white/[0.12] sm:right-10 sm:top-10 sm:text-[10rem]"
              style={{
                transform: `
                  translateZ(80px)
                  translate(
                    ${mouse.x * -8}px,
                    ${mouse.y * -8}px
                  )
                `,
                transition:
                  "transform .2s ease-out",
              }}
            >

              {String(
                active + 1
              ).padStart(2, "0")}

            </div>


            {/* =================================================
                TOP BADGE
            ================================================= */}

            <div
              className="absolute left-6 top-6 flex items-center gap-3 rounded-full border border-white/15 bg-black/20 px-4 py-2 backdrop-blur-xl sm:left-8 sm:top-8"
              style={{
                transform: `
                  translate(
                    ${mouse.x * 5}px,
                    ${mouse.y * 5}px
                  )
                `,
                transition:
                  "transform .25s ease-out",
              }}
            >

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_15px_rgba(110,231,183,.9)]" />

              <span className="text-[9px] uppercase tracking-[0.25em] text-white/70">
                Featured Project
              </span>

            </div>


            {/* =================================================
                PROJECT INFORMATION
            ================================================= */}

            <div
              className="absolute bottom-0 left-0 right-0 p-7 sm:p-10 lg:p-12"
              style={{
                transform: `
                  translate(
                    ${mouse.x * -3}px,
                    ${mouse.y * -3}px
                  )
                `,
                transition:
                  "transform .25s ease-out",
              }}
            >

              <div className="mb-4 flex items-center gap-3">

                <span className="text-[9px] uppercase tracking-[0.3em] text-emerald-200/70">
                  {project.property_type ||
                    "Real Estate"}
                </span>


                <span className="h-px w-8 bg-white/30" />


                <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                  {project.location ||
                    "Dholera, Gujarat"}
                </span>

              </div>


              <h3 className="max-w-3xl text-4xl font-medium tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                {project.title}
              </h3>


              <p className="mt-4 max-w-xl text-sm leading-6 text-white/55 sm:text-base">
                {project.description ||
                  "A thoughtfully planned destination designed for modern living, investment and long-term growth."}
              </p>


              

            </div>


            {/* CARD CORNER */}

            <div className="absolute bottom-7 right-7 hidden h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-black/20 backdrop-blur-xl sm:flex">

              <span className="text-xl text-white/70">
                ↗
              </span>

            </div>

          </div>


          {/* =================================================
              PROJECT LIST
          ================================================= */}

          <div className="flex flex-col">


            <div className="mb-5 flex items-center justify-between">

              <span className="text-[9px] uppercase tracking-[0.35em] text-white/30">
                Select Project
              </span>


              <span className="text-[9px] tracking-[0.3em] text-white/20">

                {String(
                  active + 1
                ).padStart(2, "0")}

                {" / "}

                {String(
                  projects.length
                ).padStart(2, "0")}

              </span>

            </div>


            {/* Project buttons */}

            <div className="flex flex-col">

              {projects.map(
                (
                  item,
                  index
                ) => {

                  const isActive =
                    active === index;


                  return (

                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setActive(
                          index
                        )
                      }
                      className={`group relative overflow-hidden border-b border-white/10 py-6 text-left transition-all duration-500 sm:py-8 ${
                        isActive
                          ? "text-white"
                          : "text-white/30 hover:text-white/70"
                      }`}
                    >

                      {/* Active glow */}

                      {isActive && (

                        <div className="absolute left-0 top-0 h-full w-1 bg-emerald-300 shadow-[0_0_25px_rgba(110,231,183,.8)]" />

                      )}


                      <div className="flex items-start gap-5 pl-4 sm:pl-6">

                        <span className="pt-1 text-[9px] tracking-[0.3em]">

                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}

                        </span>


                        <div className="flex-1">

                          <h4 className="text-xl font-medium tracking-[-0.03em] sm:text-2xl">
                            {item.title}
                          </h4>


                          <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/25">
                            {item.location ||
                              "Dholera, Gujarat"}
                          </p>

                        </div>


                        <span
                          className={`text-xl transition-all duration-500 ${
                            isActive
                              ? "translate-x-0 text-emerald-300 opacity-100"
                              : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          }`}
                        >
                          ↗
                        </span>

                      </div>

                    </button>

                  );
                }
              )}

            </div>


            {/* =================================================
                NAVIGATION
            ================================================= */}

            <div className="mt-auto flex gap-3 pt-8">

              <button
                type="button"
                onClick={
                  previousProject
                }
                aria-label="Previous project"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/50 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                ←
              </button>


              <button
                type="button"
                onClick={
                  nextProject
                }
                aria-label="Next project"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/50 transition-all duration-300 hover:border-emerald-300/40 hover:bg-emerald-300 hover:text-[#043927]"
              >
                →
              </button>


              <div className="ml-auto flex items-center gap-3">

                <span className="h-px w-10 bg-white/15" />

                <Link
                  href="/projects"
                  className="text-[9px] uppercase tracking-[0.3em] text-white/20 transition hover:text-white/60"
                >
                  View All
                </Link>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            BOTTOM LINE
        ================================================= */}

        <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-6 lg:mt-20">

          <div className="flex items-center gap-3">

            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-white/25">
              Creating destinations
            </span>

          </div>


          <span className="hidden text-[9px] uppercase tracking-[0.35em] text-white/20 sm:block">
            Vision • Design • Growth
          </span>

        </div>

      </div>

    </section>
  );
}