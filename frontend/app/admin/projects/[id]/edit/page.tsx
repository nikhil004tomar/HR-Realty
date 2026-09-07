"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
  Image,
  Save,
} from "lucide-react";

import API_URL from "@/lib/api";
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
}


export default function EditProjectPage() {

  const params = useParams();

  const router = useRouter();

  const projectId =
    params.id as string;


  const [title, setTitle] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [plotSize, setPlotSize] =
    useState("");

  const [propertyType, setPropertyType] =
    useState("");

  const [possession, setPossession] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [highlights, setHighlights] =
    useState("");

  const [amenities, setAmenities] =
    useState("");

  const [mapUrl, setMapUrl] =
    useState("");

  const [isPublished, setIsPublished] =
    useState(true);


  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  // ==========================================================
  // LOAD PROJECT
  // ==========================================================

  useEffect(() => {

    async function loadProject() {

      const token = getToken();

      if (!token) {

        router.replace(
          "/admin/login"
        );

        return;
      }


      try {

        const response =
          await fetch(
            `${API_URL}/api/projects/id/${projectId}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );


        if (!response.ok) {

          throw new Error(
            "Project not found."
          );
        }


        const project: Project =
          await response.json();


        setTitle(
          project.title || ""
        );

        setSlug(
          project.slug || ""
        );

        setStatus(
          project.status || ""
        );

        setLocation(
          project.location || ""
        );

        setPrice(
          project.price || ""
        );

        setPlotSize(
          project.plot_size || ""
        );

        setPropertyType(
          project.property_type || ""
        );

        setPossession(
          project.possession || ""
        );

        setDescription(
          project.description || ""
        );

        setHighlights(
          (project.highlights || [])
            .join("\n")
        );

        setAmenities(
          (project.amenities || [])
            .join("\n")
        );

        setMapUrl(
          project.map_url || ""
        );

        setIsPublished(
          project.is_published
        );


      } catch (error) {

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load project."
        );

      } finally {

        setLoading(false);
      }
    }


    loadProject();

  }, [projectId, router]);


  // ==========================================================
  // SAVE PROJECT
  // ==========================================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();

    setError("");

    setSuccess("");


    const token = getToken();

    if (!token) {

      router.replace(
        "/admin/login"
      );

      return;
    }


    setSaving(true);


    try {

      const response =
        await fetch(
          `${API_URL}/api/projects/${projectId}`,
          {
            method: "PUT",

            headers: {
              Authorization:
                `Bearer ${token}`,

              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              title: title.trim(),

              slug: slug.trim(),

              status: status.trim(),

              location: location.trim(),

              price: price.trim(),

              plot_size:
                plotSize.trim(),

              property_type:
                propertyType.trim(),

              possession:
                possession.trim(),

              description:
                description.trim(),

              highlights:
                highlights
                  .split("\n")
                  .map(
                    item =>
                      item.trim()
                  )
                  .filter(Boolean),

              amenities:
                amenities
                  .split("\n")
                  .map(
                    item =>
                      item.trim()
                  )
                  .filter(Boolean),

              map_url:
                mapUrl.trim() || null,

              is_published:
                isPublished,
            }),
          }
        );


      if (!response.ok) {

        let message =
          "Failed to update project.";

        try {

          const data =
            await response.json();

          message =
            data.detail ||
            message;

        } catch {
          // Ignore invalid JSON
        }


        throw new Error(
          message
        );
      }


      setSuccess(
        "Project updated successfully."
      );


      setTimeout(() => {

        router.push(
          "/admin/projects"
        );

      }, 700);


    } catch (error) {

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update project."
      );

    } finally {

      setSaving(false);
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
            Loading project...
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

        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-4">

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/admin/projects"
                )
              }
              className="rounded-lg border p-2 transition hover:bg-gray-100"
            >

              <ArrowLeft size={20} />

            </button>


            <div>

              <h1 className="text-2xl font-bold">
                Edit Project
              </h1>

              <p className="text-sm text-gray-500">
                Update project information
              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={() =>
              router.push(
                `/admin/projects/${projectId}/images`
              )
            }
            className="hidden items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-gray-100 sm:flex"
          >

            <Image size={17} />

            Manage Images

          </button>

        </div>

      </header>


      {/* FORM */}

      <section className="mx-auto max-w-5xl px-6 py-8">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >


          {/* ERROR */}

          {error && (

            <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">

              {error}

            </div>

          )}


          {/* SUCCESS */}

          {success && (

            <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">

              {success}

            </div>

          )}


          {/* BASIC INFORMATION */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold">
              Basic Information
            </h2>


            <div className="mt-6 grid gap-5 md:grid-cols-2">


              {/* TITLE */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-medium">
                  Project Title *
                </label>

                <input
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

              </div>


              {/* SLUG */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-medium">
                  Slug *
                </label>

                <input
                  value={slug}
                  onChange={(e) =>
                    setSlug(
                      e.target.value
                        .toLowerCase()
                        .replace(
                          /[^a-z0-9-]/g,
                          "-"
                        )
                    )
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

              </div>


              {/* STATUS */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Status
                </label>

                <input
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

              </div>


              {/* LOCATION */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Location
                </label>

                <input
                  value={location}
                  onChange={(e) =>
                    setLocation(
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

              </div>


              {/* PRICE */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Price
                </label>

                <input
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

              </div>


              {/* PLOT SIZE */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Plot Size
                </label>

                <input
                  value={plotSize}
                  onChange={(e) =>
                    setPlotSize(
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

              </div>


              {/* PROPERTY TYPE */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Property Type
                </label>

                <input
                  value={propertyType}
                  onChange={(e) =>
                    setPropertyType(
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

              </div>


              {/* POSSESSION */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Possession
                </label>

                <input
                  value={possession}
                  onChange={(e) =>
                    setPossession(
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

              </div>

            </div>

          </div>


          {/* DESCRIPTION */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold">
              Description
            </h2>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              rows={7}
              required
              className="mt-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />

          </div>


          {/* HIGHLIGHTS */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold">
              Highlights
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              One highlight per line.
            </p>

            <textarea
              value={highlights}
              onChange={(e) =>
                setHighlights(
                  e.target.value
                )
              }
              rows={6}
              className="mt-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />

          </div>


          {/* AMENITIES */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold">
              Amenities
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              One amenity per line.
            </p>

            <textarea
              value={amenities}
              onChange={(e) =>
                setAmenities(
                  e.target.value
                )
              }
              rows={6}
              className="mt-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />

          </div>


          {/* MAP */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold">
              Location Map
            </h2>

            <input
              type="url"
              value={mapUrl}
              onChange={(e) =>
                setMapUrl(
                  e.target.value
                )
              }
              placeholder="https://maps.google.com/..."
              className="mt-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />

          </div>


          {/* PUBLISH */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <label className="flex cursor-pointer items-center gap-3">

              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) =>
                  setIsPublished(
                    e.target.checked
                  )
                }
                className="h-5 w-5"
              />

              <div>

                <p className="font-semibold">
                  Published
                </p>

                <p className="text-sm text-gray-500">
                  Show this project on the public website.
                </p>

              </div>

            </label>

          </div>


          {/* ACTIONS */}

          <div className="flex flex-wrap justify-end gap-3">

            <button
              type="button"
              onClick={() =>
                router.push(
                  `/admin/projects/${projectId}/images`
                )
              }
              className="flex items-center gap-2 rounded-lg border bg-white px-5 py-3 font-medium transition hover:bg-gray-50"
            >

              <Image size={18} />

              Manage Images

            </button>


            <button
              type="button"
              onClick={() =>
                router.push(
                  "/admin/projects"
                )
              }
              disabled={saving}
              className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium transition hover:bg-gray-50"
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >

              <Save size={18} />

              {saving
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

        </form>

      </section>

    </main>
  );
}