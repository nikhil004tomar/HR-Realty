"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  MapPin,
} from "lucide-react";

import API_URL from "@/lib/api";

// ============================================================
// TYPES
// ============================================================

interface ProjectImage {
  id: number;
  project_id: number;
  image_url: string | null;
  alt_text?: string | null;
  sort_order?: number;
  created_at?: string | null;
}

interface Project {
  id: number;
  title: string;
  slug: string;
  location?: string | null;
  property_type?: string | null;
  description?: string | null;
  is_published?: boolean;
  updated_at?: string | null;
  images?: ProjectImage[];
}

interface ProjectsResponse {
  value?: Project[];
  Count?: number;
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  // ==========================================================
  // LOAD PROJECTS
  // ==========================================================

  useEffect(() => {
    let mounted = true;

    async function loadProjects() {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/projects`,
          {
            cache: "no-store",
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load projects: ${response.status}`
          );
        }

        const result:
          | Project[]
          | ProjectsResponse =
          await response.json();

        // Support both API formats
        const data: Project[] =
          Array.isArray(result)
            ? result
            : Array.isArray(result.value)
              ? result.value
              : [];

        // Only published projects
        const publishedProjects = data
          .filter(
            (item) =>
              item.is_published === true
          )
          .slice(0, 4);

        if (!mounted) {
          return;
        }

        setProjects(publishedProjects);
        setActive(0);
      } catch (error) {
        console.error(
          "OurProjects load error:",
          error
        );

        if (mounted) {
          setProjects([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      mounted = false;
    };
  }, []);

  // ==========================================================
  // ACTIVE PROJECT
  // ==========================================================

  const project = projects[active];

  // ==========================================================
  // NEXT PROJECT
  // ==========================================================

  const nextProject = () => {
    if (projects.length === 0) {
      return;
    }

    setActive((previous) =>
      previous === projects.length - 1
        ? 0
        : previous + 1
    );
  };

  // ==========================================================
  // PREVIOUS PROJECT
  // ==========================================================

  const previousProject = () => {
    if (projects.length === 0) {
      return;
    }

    setActive((previous) =>
      previous === 0
        ? projects.length - 1
        : previous - 1
    );
  };

  // ==========================================================
  // GET PROJECT IMAGE
  // ==========================================================

  function getProjectImage(
    currentProject: Project
  ): string {
    const image =
      currentProject.images
        ?.filter(
          (item) =>
            typeof item.image_url ===
              "string" &&
            item.image_url.trim()
              .length > 0
        )
        .sort(
          (a, b) =>
            (a.sort_order ?? 0) -
            (b.sort_order ?? 0)
        )[0]?.image_url;

    // No image
    if (!image) {
      return FALLBACK_IMAGE;
    }

    // Absolute URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    // Backend relative image
    if (image.startsWith("/")) {
      return `${API_URL}${image}`;
    }

    return FALLBACK_IMAGE;
  }

  // ==========================================================
  // CACHE BUST IMAGE
  // ==========================================================

  function getProjectImageWithCacheBust(
    currentProject: Project
  ): string {
    const image =
      getProjectImage(currentProject);

    if (image === FALLBACK_IMAGE) {
      return image;
    }

    const version =
      currentProject.updated_at
        ? encodeURIComponent(
            currentProject.updated_at
          )
        : Date.now();

    return `${image}${
      image.includes("?")
        ? "&"
        : "?"
    }v=${version}`;
  }

  // ==========================================================
  // CURRENT IMAGE
  // ==========================================================

  const projectImage = project
    ? getProjectImageWithCacheBust(
        project
      )
    : FALLBACK_IMAGE;

  // ==========================================================
  // LOADING STATE
  // ==========================================================

  if (loading) {
    return (
      <section className="flex min-h-[500px] items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#043927]/15 border-t-[#C9A45C]" />

          <p className="mt-4 text-sm font-medium text-[#111111]/50">
            Loading projects...
          </p>
        </div>
      </section>
    );
  }

  // ==========================================================
  // NO PROJECTS
  // ==========================================================

  if (
    projects.length === 0 ||
    !project
  ) {
    return null;
  }

  // ==========================================================
  // MAIN SECTION
  // ==========================================================

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* ======================================================
          SMALL DECORATIVE ACCENT
      ======================================================= */}

      <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-[#043927]/5 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[#C9A45C]/10 blur-3xl" />

      {/* ======================================================
          CONTAINER
      ======================================================= */}

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        {/* ====================================================
            HEADER
        ===================================================== */}

        <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          {/* LEFT */}

          <div className="max-w-3xl">
            {/* Label */}

            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                Our Portfolio
              </span>
            </div>

            {/* Heading */}

            <h2 className="text-4xl font-black tracking-tight text-[#111111] sm:text-5xl lg:text-6xl xl:text-7xl">
              Our{" "}
              <span className="text-[#043927]">
                Projects
              </span>
              <span className="text-[#C9A45C]">
                .
              </span>
            </h2>

            {/* Description */}

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#111111]/60 sm:text-base">
              Explore our thoughtfully planned real
              estate projects designed for modern
              living, investment and long-term growth
              in Dholera and beyond.
            </p>
          </div>

          {/* RIGHT */}

          <Link
            href="/projects"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-[#111111]/15 px-5 py-3 text-sm font-semibold text-[#111111] transition-all duration-300 hover:border-[#043927] hover:bg-[#043927] hover:text-white"
          >
            <span>
              View All Projects
            </span>

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* ====================================================
            MAIN GRID
        ===================================================== */}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.5fr)] lg:gap-10">
          {/* ==================================================
              PROJECT IMAGE
          =================================================== */}

          <Link
            href={`/projects/${project.slug}`}
            className="group relative block overflow-hidden rounded-2xl border border-[#111111]/10 bg-[#043927] shadow-[0_20px_50px_rgba(17,17,17,0.08)] sm:rounded-3xl"
          >
            {/* Image */}

            <div className="relative aspect-[16/10] min-h-[350px] overflow-hidden sm:min-h-[450px] lg:min-h-[560px]">
              <Image
                key={`${project.id}-${projectImage}`}
                src={projectImage}
                alt={
                  project.title ||
                  "Real estate project"
                }
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              {/* Simple overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

              {/* Top badge */}

              <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-[#C9A45C]" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#043927]">
                    Featured Project
                  </span>
                </div>
              </div>

              {/* Project number */}

              <div className="absolute right-5 top-5 sm:right-7 sm:top-7">
                <span className="text-5xl font-black leading-none text-white/30 sm:text-7xl">
                  {String(
                    active + 1
                  ).padStart(2, "0")}
                </span>
              </div>

              {/* Project content */}

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                {/* Meta */}

                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">
                    <Building2
                      size={13}
                    />

                    {project.property_type ||
                      "Real Estate"}
                  </span>

                  <span className="h-3 w-px bg-white/30" />

                  <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/65">
                    <MapPin
                      size={13}
                    />

                    {project.location ||
                      "Dholera, Gujarat"}
                  </span>
                </div>

                {/* Title */}

                <h3 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {project.title}
                </h3>

                {/* Description */}

                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
                  {project.description ||
                    "A thoughtfully planned destination designed for modern living, investment and long-term growth."}
                </p>

                {/* Explore */}

                <div className="mt-5 inline-flex items-center gap-3 text-sm font-bold text-white">
                  <span>
                    Explore Project
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C9A45C] text-[#111111] transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight
                      size={16}
                    />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* ==================================================
              PROJECT LIST
          =================================================== */}

          <div className="flex flex-col rounded-2xl border border-[#111111]/10 bg-[#fafafa] p-5 sm:p-7 lg:rounded-3xl lg:p-8">
            {/* Header */}

            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#043927]">
                  Select Project
                </p>

                <div className="mt-2 h-[2px] w-8 bg-[#C9A45C]" />
              </div>

              <span className="text-xs font-semibold text-[#111111]/40">
                {String(
                  active + 1
                ).padStart(2, "0")}{" "}
                /{" "}
                {String(
                  projects.length
                ).padStart(2, "0")}
              </span>
            </div>

            {/* Project buttons */}

            <div className="flex flex-col">
              {projects.map(
                (item, index) => {
                  const isActive =
                    active === index;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setActive(index)
                      }
                      className={`group relative border-b border-[#111111]/10 py-5 text-left transition-all duration-300 sm:py-6 ${
                        isActive
                          ? "text-[#043927]"
                          : "text-[#111111]/45 hover:text-[#111111]"
                      }`}
                    >
                      {/* Active indicator */}

                      <span
                        className={`absolute left-0 top-0 h-full w-[3px] transition-all duration-300 ${
                          isActive
                            ? "bg-[#C9A45C]"
                            : "bg-transparent"
                        }`}
                      />

                      <div className="flex items-start gap-4 pl-4">
                        {/* Number */}

                        <span
                          className={`pt-1 text-[10px] font-bold tracking-[0.15em] ${
                            isActive
                              ? "text-[#C9A45C]"
                              : "text-[#111111]/30"
                          }`}
                        >
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        {/* Content */}

                        <div className="min-w-0 flex-1">
                          <h4
                            className={`text-base font-bold leading-snug sm:text-lg ${
                              isActive
                                ? "text-[#043927]"
                                : ""
                            }`}
                          >
                            {item.title}
                          </h4>

                          <p className="mt-1 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#111111]/40">
                            <MapPin
                              size={11}
                            />

                            {item.location ||
                              "Dholera, Gujarat"}
                          </p>
                        </div>

                        {/* Arrow */}

                        <ArrowRight
                          size={17}
                          className={`mt-1 shrink-0 transition-all duration-300 ${
                            isActive
                              ? "translate-x-0 text-[#C9A45C] opacity-100"
                              : "-translate-x-2 text-[#043927] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          }`}
                        />
                      </div>
                    </button>
                  );
                }
              )}
            </div>

            {/* ==================================================
                NAVIGATION
            =================================================== */}

            <div className="mt-auto pt-7">
              <div className="flex items-center gap-3">
                {/* Previous */}

                <button
                  type="button"
                  onClick={
                    previousProject
                  }
                  aria-label="Previous project"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#111111]/15 bg-white text-[#111111] transition-all duration-300 hover:border-[#043927] hover:bg-[#043927] hover:text-white"
                >
                  <ArrowLeft
                    size={17}
                  />
                </button>

                {/* Next */}

                <button
                  type="button"
                  onClick={
                    nextProject
                  }
                  aria-label="Next project"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#043927] text-white transition-all duration-300 hover:bg-[#C9A45C] hover:text-[#111111]"
                >
                  <ArrowRight
                    size={17}
                  />
                </button>

                {/* Divider */}

                <div className="ml-auto flex items-center gap-3">
                  <span className="hidden h-px w-8 bg-[#111111]/10 sm:block" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#111111]/35">
                    Vision • Growth
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
            BOTTOM INFORMATION
        ===================================================== */}

        <div className="mt-10 flex flex-col gap-3 border-t border-[#111111]/10 pt-5 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#C9A45C]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#111111]/45">
              Creating destinations for tomorrow
            </span>
          </div>

          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#043927]/50">
            Dholera SIR • Gujarat
          </span>
        </div>
      </div>
    </section>
  );
}