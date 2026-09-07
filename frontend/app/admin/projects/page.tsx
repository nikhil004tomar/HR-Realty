"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Building2,
  Edit,
  Eye,
  Plus,
  Trash2,
} from "lucide-react";

import { apiRequest } from "@/lib/api-client";
import { getToken } from "@/lib/auth";


interface Project {
  id: number;
  slug: string;
  title: string;
  status: string;
  location: string;
  price: string;
  plot_size: string;
  property_type: string;
  possession: string;
  description: string;
  highlights?: string[] | null;
  amenities?: string[] | null;
  map_url?: string | null;
  is_published: boolean;
  created_at: string;
}


export default function ProjectsPage() {

  const router = useRouter();

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ==========================================================
  // LOAD PROJECTS
  // ==========================================================

  async function loadProjects() {

    try {

      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {

        router.replace(
          "/admin/login"
        );

        return;
      }


      const data =
        await apiRequest<Project[]>(
          "/api/projects",
          {
            authenticated: true,
          }
        );


      setProjects(data);

    } catch (error) {

      console.error(
        "Failed to load projects:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load projects"
      );

    } finally {

      setLoading(false);
    }
  }


  useEffect(() => {

    loadProjects();

  }, []);


  // ==========================================================
  // DELETE PROJECT
  // ==========================================================

  async function deleteProject(
    project: Project
  ) {

    const confirmed =
      window.confirm(
        `Delete "${project.title}"?`
      );


    if (!confirmed) {
      return;
    }


    try {

      await apiRequest(
        `/api/projects/${project.id}`,
        {
          method: "DELETE",
          authenticated: true,
        }
      );


      setProjects(
        current =>
          current.filter(
            item =>
              item.id !== project.id
          )
      );

    } catch (error) {

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete project"
      );
    }
  }


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />

          <p className="mt-4 text-gray-600">
            Loading projects...
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

      {/* HEADER */}

      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                router.push("/admin")
              }
              className="rounded-lg border p-2 transition hover:bg-gray-100"
            >

              <ArrowLeft size={20} />

            </button>


            <div>

              <h1 className="text-2xl font-bold text-gray-900">
                Projects
              </h1>

              <p className="text-sm text-gray-500">
                Manage your real estate projects
              </p>

            </div>

          </div>


          <button
            onClick={() =>
              router.push(
                "/admin/projects/new"
              )
            }
            className="flex items-center gap-2 rounded-lg bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
          >

            <Plus size={19} />

            Add Project

          </button>

        </div>

      </header>


      {/* CONTENT */}

      <section className="mx-auto max-w-7xl px-6 py-8">


        {/* ERROR */}

        {error && (

          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">

            {error}

          </div>

        )}


        {/* EMPTY */}

        {projects.length === 0 ? (

          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">

              <Building2 size={30} />

            </div>

            <h2 className="mt-5 text-xl font-bold">
              No projects yet
            </h2>

            <p className="mt-2 text-gray-500">
              Create your first real estate project.
            </p>

            <button
              onClick={() =>
                router.push(
                  "/admin/projects/new"
                )
              }
              className="mt-6 rounded-lg bg-black px-5 py-3 font-semibold text-white"
            >
              Create Project
            </button>

          </div>

        ) : (

          <div className="space-y-4">

            {projects.map(
              project => (

                <div
                  key={project.id}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">


                    {/* PROJECT INFO */}

                    <div className="flex gap-4">

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100">

                        <Building2
                          size={25}
                        />

                      </div>


                      <div>

                        <div className="flex flex-wrap items-center gap-3">

                          <h2 className="text-lg font-bold text-gray-900">
                            {project.title}
                          </h2>


                          <span
                            className={
                              project.is_published
                                ? "rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
                                : "rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600"
                            }
                          >
                            {project.is_published
                              ? "Published"
                              : "Draft"}
                          </span>

                        </div>


                        <p className="mt-1 text-sm text-gray-500">
                          {project.location}
                        </p>


                        <div className="mt-3 flex flex-wrap gap-2 text-xs">

                          <span className="rounded-lg bg-gray-100 px-3 py-1">
                            {project.status}
                          </span>

                          <span className="rounded-lg bg-gray-100 px-3 py-1">
                            {project.property_type}
                          </span>

                          <span className="rounded-lg bg-gray-100 px-3 py-1">
                            {project.plot_size}
                          </span>

                        </div>

                      </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="flex flex-wrap gap-2">

                      {/* VIEW */}

                      <button
                        onClick={() =>
                          window.open(
                            `/projects/${project.slug}`,
                            "_blank"
                          )
                        }
                        className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
                      >

                        <Eye size={17} />

                        View

                      </button>


                      {/* EDIT */}

                      <button
                        onClick={() =>
                          router.push(
                            `/admin/projects/${project.id}/edit`
                          )
                        }
                        className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
                      >

                        <Edit size={17} />

                        Edit

                      </button>


                      {/* DELETE */}

                      <button
                        onClick={() =>
                          deleteProject(
                            project
                          )
                        }
                        className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >

                        <Trash2 size={17} />

                        Delete

                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </section>

    </main>
  );
}