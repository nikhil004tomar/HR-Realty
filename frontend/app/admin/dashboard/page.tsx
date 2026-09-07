"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Building2,
  Image as ImageIcon,
  MessageSquare,
  Users,
  LayoutDashboard,
  LogOut,
  ArrowRight,
  FolderOpen,
  Mail,
  ChevronRight,
  Activity,
  Plus,
} from "lucide-react";

import API_URL from "@/lib/api";
import { getToken } from "@/lib/auth";


// ============================================================
// TYPES
// ============================================================

interface Project {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  location?: string | null;
  type?: string | null;
  image?: string | null;
  is_published?: boolean;
  created_at?: string;
}

interface DashboardStats {
  projects: number;
  publishedProjects: number;
  images: number;
  contacts: number;
}


// ============================================================
// COMPONENT
// ============================================================

export default function AdminDashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState<Project[]>([]);

  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    publishedProjects: 0,
    images: 0,
    contacts: 0,
  });

  const [error, setError] = useState("");

  // ==========================================================
  // LOAD DASHBOARD
  // ==========================================================

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    setError("");

    try {
      const token = getToken();

      if (!token) {
        router.replace("/admin/login");
        return;
      }

      // --------------------------------------------------------
      // LOAD PROJECTS
      // --------------------------------------------------------

      let loadedProjects: Project[] = [];

      try {
        const response = await fetch(
          `${API_URL}/api/projects/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (Array.isArray(data)) {
            loadedProjects = data;
          } else if (Array.isArray(data?.projects)) {
            loadedProjects = data.projects;
          }
        }
      } catch {
        // Projects endpoint may use another route.
      }

      setProjects(loadedProjects);

      // --------------------------------------------------------
      // PROJECT COUNTS
      // --------------------------------------------------------

      const publishedProjects =
        loadedProjects.filter(
          (project) =>
            project.is_published === true
        ).length;

      setStats({
        projects: loadedProjects.length,
        publishedProjects,
        images: 0,
        contacts: 0,
      });

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  }


  // ==========================================================
  // LOGOUT
  // ==========================================================

  function handleLogout() {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("access_token");
    } catch {
      // Ignore localStorage errors.
    }

    router.replace("/admin/login");
  }


  // ==========================================================
  // STAT CARD
  // ==========================================================

  function StatCard({
    title,
    value,
    icon,
    href,
    description,
  }: {
    title: string;
    value: number;
    icon: React.ReactNode;
    href: string;
    description: string;
  }) {
    return (
      <Link
        href={href}
        className="
          group
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-6
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        <div className="flex items-start justify-between">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-[#043927]
              text-white
              transition-transform
              duration-300
              group-hover:scale-110
            "
          >
            {icon}
          </div>

          <ChevronRight
            size={20}
            className="
              text-gray-300
              transition-all
              duration-300
              group-hover:translate-x-1
              group-hover:text-[#043927]
            "
          />
        </div>

        <div className="mt-6">

          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-1 text-3xl font-bold text-gray-900">
            {value}
          </p>

          <p className="mt-2 text-xs text-gray-400">
            {description}
          </p>

        </div>
      </Link>
    );
  }


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">

        <div className="text-center">

          <div
            className="
              mx-auto
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-gray-300
              border-t-[#043927]
            "
          />

          <p className="mt-4 text-sm text-gray-500">
            Loading dashboard...
          </p>

        </div>

      </main>
    );
  }


  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <main className="min-h-screen bg-gray-100">

      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className="
          fixed
          bottom-0
          left-0
          top-0
          z-40
          hidden
          w-64
          border-r
          border-white/10
          bg-[#043927]
          text-white
          lg:block
        "
      >

        {/* LOGO / BRAND */}

        <div className="border-b border-white/10 px-6 py-7">

          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3"
          >

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                bg-white
                p-1
              "
            >
              <img
                src="/images/logo.png"
                alt="HR Realty"
                className="h-full w-full object-contain"
              />
            </div>

            <div>

              <p className="text-sm font-bold tracking-wide">
                HR REALTY
              </p>

              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                Admin Panel
              </p>

            </div>

          </Link>

        </div>


        {/* NAVIGATION */}

        <nav className="px-4 py-6">

          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">
            Management
          </p>

          <div className="space-y-1">

            <Link
              href="/admin/dashboard"
              className="
                flex
                items-center
                gap-3
                rounded-xl
                bg-white/10
                px-4
                py-3
                text-sm
                font-medium
                text-white
              "
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>


            <Link
              href="/admin/projects"
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                text-white/60
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              <Building2 size={18} />
              Projects
            </Link>


            <Link
              href="/admin/testimonials"
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                text-white/60
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              <Users size={18} />
              Testimonials
            </Link>


            <Link
              href="/admin/contacts"
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                text-white/60
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              <MessageSquare size={18} />
              Inquiries
            </Link>

          </div>


          <p className="mb-3 mt-10 px-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">
            Website
          </p>

          <div className="space-y-1">

            <Link
              href="/"
              target="_blank"
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                text-white/60
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              <ArrowRight size={18} />
              View Website
            </Link>

          </div>

        </nav>


        {/* LOGOUT */}

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">

          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-sm
              font-medium
              text-white/60
              transition
              hover:bg-red-500/10
              hover:text-red-300
            "
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>


      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="lg:pl-64">

        {/* HEADER */}

        <header className="border-b border-gray-200 bg-white">

          <div className="flex items-center justify-between px-5 py-5 sm:px-8">

            <div>

              <div className="flex items-center gap-2 text-xs text-gray-400">

                <LayoutDashboard size={14} />

                <span>
                  Admin
                </span>

                <ChevronRight size={13} />

                <span>
                  Dashboard
                </span>

              </div>

              <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Dashboard
              </h1>

            </div>


            <div className="flex items-center gap-3">

              <Link
                href="/admin/projects"
                className="
                  hidden
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#043927]
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#075238]
                  sm:flex
                "
              >
                <Plus size={17} />
                New Project
              </Link>


              <button
                type="button"
                onClick={handleLogout}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  text-gray-500
                  transition
                  hover:border-red-200
                  hover:bg-red-50
                  hover:text-red-600
                  sm:hidden
                "
                aria-label="Logout"
              >
                <LogOut size={17} />
              </button>

            </div>

          </div>

        </header>


        {/* CONTENT */}

        <section className="px-5 py-8 sm:px-8">

          <div className="mx-auto max-w-7xl">

            {/* ERROR */}

            {error && (
              <div
                className="
                  mb-6
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-5
                  py-4
                  text-sm
                  text-red-700
                "
              >
                {error}
              </div>
            )}


            {/* WELCOME */}

            <div
              className="
                overflow-hidden
                rounded-2xl
                bg-[#043927]
                p-7
                text-white
                shadow-lg
                sm:p-9
              "
            >

              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

                <div>

                  <div className="mb-3 flex items-center gap-2">

                    <Activity
                      size={16}
                      className="text-emerald-300"
                    />

                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                      HR Realty International
                    </span>

                  </div>

                  <h2 className="text-2xl font-bold sm:text-3xl">
                    Welcome back 👋
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/55">
                    Manage your real estate projects,
                    images, testimonials and website
                    inquiries from one place.
                  </p>

                </div>


                <Link
                  href="/"
                  target="_blank"
                  className="
                    inline-flex
                    shrink-0
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/15
                    bg-white/10
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    backdrop-blur
                    transition
                    hover:bg-white/20
                  "
                >
                  Visit Website
                  <ArrowRight size={16} />
                </Link>

              </div>

            </div>


            {/* ==================================================
                STATISTICS
            ================================================== */}

            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

              <StatCard
                title="Total Projects"
                value={stats.projects}
                icon={<Building2 size={22} />}
                href="/admin/projects"
                description="All projects in your system"
              />

              <StatCard
                title="Published Projects"
                value={stats.publishedProjects}
                icon={<FolderOpen size={22} />}
                href="/admin/projects"
                description="Projects visible on website"
              />

              <StatCard
                title="Project Images"
                value={stats.images}
                icon={<ImageIcon size={22} />}
                href="/admin/projects"
                description="Images uploaded to projects"
              />

              <StatCard
                title="Inquiries"
                value={stats.contacts}
                icon={<Mail size={22} />}
                href="/admin/contacts"
                description="Website contact inquiries"
              />

            </div>


            {/* ==================================================
                PROJECTS
            ================================================== */}

            <div className="mt-8 grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">

              {/* RECENT PROJECTS */}

              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

                  <div>

                    <h2 className="text-lg font-bold text-gray-900">
                      Projects
                    </h2>

                    <p className="mt-1 text-xs text-gray-400">
                      Manage your real estate projects
                    </p>

                  </div>

                  <Link
                    href="/admin/projects"
                    className="
                      flex
                      items-center
                      gap-1
                      text-xs
                      font-semibold
                      text-[#043927]
                      hover:underline
                    "
                  >
                    View All
                    <ArrowRight size={14} />
                  </Link>

                </div>


                {projects.length === 0 ? (

                  <div className="px-6 py-16 text-center">

                    <div
                      className="
                        mx-auto
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gray-100
                        text-gray-400
                      "
                    >
                      <Building2 size={25} />
                    </div>

                    <h3 className="mt-4 font-semibold text-gray-900">
                      No projects found
                    </h3>

                    <p className="mx-auto mt-1 max-w-sm text-sm text-gray-400">
                      Create your first project to start
                      building your project portfolio.
                    </p>

                    <Link
                      href="/admin/projects"
                      className="
                        mt-5
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        bg-[#043927]
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-[#075238]
                      "
                    >
                      <Plus size={16} />
                      Add Project
                    </Link>

                  </div>

                ) : (

                  <div className="divide-y divide-gray-100">

                    {projects
                      .slice(0, 5)
                      .map((project) => (

                        <Link
                          key={project.id}
                          href={`/admin/projects/${project.id}`}
                          className="
                            group
                            flex
                            items-center
                            gap-4
                            px-6
                            py-4
                            transition
                            hover:bg-gray-50
                          "
                        >

                          {/* PROJECT ICON */}

                          <div
                            className="
                              flex
                              h-12
                              w-12
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-[#043927]/10
                              text-[#043927]
                            "
                          >
                            <Building2 size={21} />
                          </div>


                          {/* INFO */}

                          <div className="min-w-0 flex-1">

                            <h3 className="truncate text-sm font-semibold text-gray-900">
                              {project.title}
                            </h3>

                            <p className="mt-1 truncate text-xs text-gray-400">
                              {project.location ||
                                "Dholera, Gujarat"}
                            </p>

                          </div>


                          {/* STATUS */}

                          <div className="hidden sm:block">

                            {project.is_published ? (
                              <span
                                className="
                                  rounded-full
                                  bg-green-50
                                  px-3
                                  py-1
                                  text-[10px]
                                  font-semibold
                                  uppercase
                                  tracking-wide
                                  text-green-600
                                "
                              >
                                Published
                              </span>
                            ) : (
                              <span
                                className="
                                  rounded-full
                                  bg-gray-100
                                  px-3
                                  py-1
                                  text-[10px]
                                  font-semibold
                                  uppercase
                                  tracking-wide
                                  text-gray-500
                                "
                              >
                                Draft
                              </span>
                            )}

                          </div>


                          <ChevronRight
                            size={18}
                            className="
                              text-gray-300
                              transition
                              group-hover:translate-x-1
                              group-hover:text-[#043927]
                            "
                          />

                        </Link>

                      ))}

                  </div>

                )}

              </div>


              {/* QUICK ACTIONS */}

              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

                <div className="border-b border-gray-100 px-6 py-5">

                  <h2 className="text-lg font-bold text-gray-900">
                    Quick Actions
                  </h2>

                  <p className="mt-1 text-xs text-gray-400">
                    Common management tasks
                  </p>

                </div>


                <div className="space-y-2 p-4">

                  <Link
                    href="/admin/projects"
                    className="
                      group
                      flex
                      items-center
                      gap-4
                      rounded-xl
                      border
                      border-gray-100
                      p-4
                      transition
                      hover:border-[#043927]/20
                      hover:bg-[#043927]/5
                    "
                  >

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-lg
                        bg-[#043927]/10
                        text-[#043927]
                      "
                    >
                      <Building2 size={19} />
                    </div>

                    <div className="flex-1">

                      <p className="text-sm font-semibold text-gray-900">
                        Manage Projects
                      </p>

                      <p className="mt-0.5 text-xs text-gray-400">
                        Add, edit and publish projects
                      </p>

                    </div>

                    <ArrowRight
                      size={16}
                      className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#043927]"
                    />

                  </Link>


                  <Link
                    href="/admin/projects"
                    className="
                      group
                      flex
                      items-center
                      gap-4
                      rounded-xl
                      border
                      border-gray-100
                      p-4
                      transition
                      hover:border-[#043927]/20
                      hover:bg-[#043927]/5
                    "
                  >

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-lg
                        bg-[#043927]/10
                        text-[#043927]
                      "
                    >
                      <ImageIcon size={19} />
                    </div>

                    <div className="flex-1">

                      <p className="text-sm font-semibold text-gray-900">
                        Project Images
                      </p>

                      <p className="mt-0.5 text-xs text-gray-400">
                        Manage project galleries
                      </p>

                    </div>

                    <ArrowRight
                      size={16}
                      className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#043927]"
                    />

                  </Link>


                  <Link
                    href="/admin/testimonials"
                    className="
                      group
                      flex
                      items-center
                      gap-4
                      rounded-xl
                      border
                      border-gray-100
                      p-4
                      transition
                      hover:border-[#043927]/20
                      hover:bg-[#043927]/5
                    "
                  >

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-lg
                        bg-[#043927]/10
                        text-[#043927]
                      "
                    >
                      <Users size={19} />
                    </div>

                    <div className="flex-1">

                      <p className="text-sm font-semibold text-gray-900">
                        Testimonials
                      </p>

                      <p className="mt-0.5 text-xs text-gray-400">
                        Manage customer testimonials
                      </p>

                    </div>

                    <ArrowRight
                      size={16}
                      className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#043927]"
                    />

                  </Link>


                  <Link
                    href="/admin/contacts"
                    className="
                      group
                      flex
                      items-center
                      gap-4
                      rounded-xl
                      border
                      border-gray-100
                      p-4
                      transition
                      hover:border-[#043927]/20
                      hover:bg-[#043927]/5
                    "
                  >

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-lg
                        bg-[#043927]/10
                        text-[#043927]
                      "
                    >
                      <MessageSquare size={19} />
                    </div>

                    <div className="flex-1">

                      <p className="text-sm font-semibold text-gray-900">
                        Inquiries
                      </p>

                      <p className="mt-0.5 text-xs text-gray-400">
                        View website inquiries
                      </p>

                    </div>

                    <ArrowRight
                      size={16}
                      className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#043927]"
                    />

                  </Link>

                </div>

              </div>

            </div>


            {/* ==================================================
                FOOTER STATUS
            ================================================== */}

            <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-gray-200 py-6 sm:flex-row">

              <p className="text-xs text-gray-400">
                HR Realty International Admin Panel
              </p>

              <div className="flex items-center gap-2">

                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

                <span className="text-xs text-gray-400">
                  System Online
                </span>

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}