"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

import { apiRequest } from "@/lib/api-client";
import { getToken } from "@/lib/auth";

interface ProjectResponse {
  id: number;
  slug: string;
  title: string;
}

export default function NewProjectPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const [status, setStatus] =
    useState("Booking Open");

  const [location, setLocation] =
    useState("Dholera SIR, Gujarat");

  const [price, setPrice] =
    useState("Price on Request");

  const [plotSize, setPlotSize] =
    useState("1000 Sq. Ft.");

  const [propertyType, setPropertyType] =
    useState("Residential Plot");

  const [possession, setPossession] =
    useState("Ready");

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
    useState(false);

  const [error, setError] =
    useState("");

  // ==========================================================
  // CREATE SLUG
  // ==========================================================

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // ==========================================================
  // TITLE CHANGE
  // ==========================================================

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slug) {
      setSlug(generateSlug(value));
    }
  }

  // ==========================================================
  // SUBMIT
  // ==========================================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const token = getToken();

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    if (!title.trim()) {
      setError("Project title is required.");
      return;
    }

    if (!slug.trim()) {
      setError("Project slug is required.");
      return;
    }

    if (!description.trim()) {
      setError("Project description is required.");
      return;
    }

    setLoading(true);

    try {
      const data = await apiRequest<ProjectResponse>(
        "/api/projects",
        {
          method: "POST",

          authenticated: true,

          body: JSON.stringify({
            title: title.trim(),
            slug: slug.trim(),
            status: status.trim(),
            location: location.trim(),
            price: price.trim(),
            plot_size: plotSize.trim(),
            property_type: propertyType.trim(),
            possession: possession.trim(),
            description: description.trim(),
            highlights: highlights
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean),
            amenities: amenities
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean),
            map_url: mapUrl.trim() || null,
            is_published: isPublished,
          }),
        }
      );

      router.push(
        `/admin/projects/${data.id}/images`
      );

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create project."
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <main className="min-h-screen bg-gray-100">

      {/* HEADER */}

      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-5">

          <button
            type="button"
            onClick={() =>
              router.push("/admin/projects")
            }
            className="rounded-lg border p-2 transition hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Add Project
            </h1>

            <p className="text-sm text-gray-500">
              Create a new real estate project
            </p>
          </div>

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


          {/* BASIC INFORMATION */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Main information displayed on your property listing.
            </p>


            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {/* TITLE */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-medium">
                  Project Title *
                </label>

                <input
                  value={title}
                  onChange={(e) =>
                    handleTitleChange(e.target.value)
                  }
                  placeholder="Dholera Metro City 5017"
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
                      generateSlug(e.target.value)
                    )
                  }
                  placeholder="dholera-metro-city-5017"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Used in the project URL.
                </p>

              </div>


              {/* STATUS */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Status
                </label>

                <input
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                  placeholder="Booking Open"
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
                    setLocation(e.target.value)
                  }
                  placeholder="Dholera SIR, Gujarat"
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
                    setPrice(e.target.value)
                  }
                  placeholder="₹25 Lakhs onwards"
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
                    setPlotSize(e.target.value)
                  }
                  placeholder="1000 Sq. Ft."
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
                    setPropertyType(e.target.value)
                  }
                  placeholder="Residential Plot"
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
                    setPossession(e.target.value)
                  }
                  placeholder="Ready"
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
                setDescription(e.target.value)
              }
              rows={7}
              placeholder="Premium residential plotted development in Dholera SIR, Gujarat..."
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
              Enter one highlight per line.
            </p>

            <textarea
              value={highlights}
              onChange={(e) =>
                setHighlights(e.target.value)
              }
              rows={6}
              placeholder={`Near Dholera International Airport
Prime location
Gated township
Excellent connectivity`}
              className="mt-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />

          </div>


          {/* AMENITIES */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold">
              Amenities
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter one amenity per line.
            </p>

            <textarea
              value={amenities}
              onChange={(e) =>
                setAmenities(e.target.value)
              }
              rows={6}
              placeholder={`Internal Roads
Street Lights
Green Park
Security
Water Connection`}
              className="mt-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />

          </div>


          {/* MAP */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold">
              Location Map
            </h2>

            <label className="mt-5 mb-2 block text-sm font-medium">
              Google Maps URL
            </label>

            <input
              type="url"
              value={mapUrl}
              onChange={(e) =>
                setMapUrl(e.target.value)
              }
              placeholder="https://maps.google.com/..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
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
                  Publish project
                </p>

                <p className="text-sm text-gray-500">
                  Published projects are visible on the public website.
                </p>

              </div>

            </label>

          </div>


          {/* ACTIONS */}

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/admin/projects"
                )
              }
              disabled={loading}
              className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium transition hover:bg-gray-50"
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >

              <Save size={18} />

              {loading
                ? "Creating..."
                : "Create Project"}

            </button>

          </div>

        </form>

      </section>

    </main>
  );
}