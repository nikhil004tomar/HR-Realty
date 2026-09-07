"use client";

import {
  ChangeEvent,
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
  ImagePlus,
  Trash2,
  Upload,
} from "lucide-react";

import API_URL from "@/lib/api";
import { getToken } from "@/lib/auth";


// ============================================================
// TYPES
// ============================================================

interface ProjectImage {
  id: number;
  project_id?: number;

  // Backend returns image_url
  image_url: string;

  alt_text?: string | null;
  title?: string | null;
  description?: string | null;
  sort_order?: number;
  is_published?: boolean;
  created_at?: string;
}

interface Project {
  id: number;
  title: string;
  slug: string;
}


// ============================================================
// PAGE
// ============================================================

export default function ProjectImagesPage() {
  const params = useParams();
  const router = useRouter();

  const projectId = params.id as string;


  // ==========================================================
  // STATE
  // ==========================================================

  const [project, setProject] =
    useState<Project | null>(null);

  const [images, setImages] =
    useState<ProjectImage[]>([]);

  const [selectedFiles, setSelectedFiles] =
    useState<File[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  // ==========================================================
  // LOAD PROJECT
  // ==========================================================

  async function loadProject() {
    try {
      const response = await fetch(
        `${API_URL}/api/projects/id/${projectId}`
      );

      if (!response.ok) {
        throw new Error("Project not found");
      }

      const data = await response.json();

      setProject(data);

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load project"
      );
    }
  }


  // ==========================================================
  // LOAD IMAGES
  // ==========================================================

  async function loadImages() {
    try {
      const token = getToken();

      if (!token) {
        router.replace("/admin/login");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/projects/${projectId}/images`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to load images");
      }

      const data = await response.json();

      setImages(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load images"
      );
    }
  }


  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    async function load() {
      setLoading(true);

      await Promise.all([
        loadProject(),
        loadImages(),
      ]);

      setLoading(false);
    }

    load();
  }, [projectId]);


  // ==========================================================
  // SELECT FILES
  // ==========================================================

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    if (!event.target.files) {
      return;
    }

    const files =
      Array.from(event.target.files);


    const validFiles =
      files.filter((file) => {
        const validType =
          [
            "image/jpeg",
            "image/png",
            "image/webp",
          ].includes(file.type);

        const maxSize =
          10 * 1024 * 1024;

        return (
          validType &&
          file.size <= maxSize
        );
      });


    if (validFiles.length !== files.length) {
      setError(
        "Some files were skipped. Only JPG, PNG and WebP images up to 10MB are allowed."
      );
    } else {
      setError("");
    }

    setSelectedFiles(validFiles);

    setSuccess("");
  }


  // ==========================================================
  // UPLOAD IMAGES
  // ==========================================================

  async function uploadImages() {
    if (selectedFiles.length === 0) {
      setError(
        "Please select at least one image."
      );
      return;
    }

    const token = getToken();

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      for (const file of selectedFiles) {
        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );


        const response =
          await fetch(
            `${API_URL}/api/projects/${projectId}/images`,
            {
              method: "POST",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },

              body: formData,
            }
          );


        if (response.status === 401) {
          router.replace("/admin/login");
          return;
        }


        if (!response.ok) {
          let message =
            "Image upload failed.";

          try {
            const data =
              await response.json();

            message =
              data.detail ||
              message;

          } catch {
            // Ignore invalid response
          }

          throw new Error(message);
        }
      }


      setSelectedFiles([]);

      setSuccess(
        "Images uploaded successfully."
      );

      await loadImages();

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Image upload failed."
      );

    } finally {
      setUploading(false);
    }
  }


  // ==========================================================
  // DELETE IMAGE
  // ==========================================================

  async function deleteImage(
    image: ProjectImage
  ) {
    const confirmed =
      window.confirm(
        "Delete this image?"
      );

    if (!confirmed) {
      return;
    }


    const token = getToken();

    if (!token) {
      router.replace("/admin/login");
      return;
    }


    try {
      const response =
        await fetch(
          `${API_URL}/api/projects/images/${image.id}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );


      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }


      if (!response.ok) {
        let message =
          "Failed to delete image.";

        try {
          const data =
            await response.json();

          message =
            data.detail ||
            message;

        } catch {
          // Ignore
        }

        throw new Error(message);
      }


      setImages((current) =>
        current.filter(
          (item) =>
            item.id !== image.id
        )
      );


      setSuccess(
        "Image deleted successfully."
      );

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete image."
      );
    }
  }


  // ==========================================================
  // IMAGE URL
  // ==========================================================

  function getImageUrl(
    image: ProjectImage
  ): string {

    /*
     * IMPORTANT:
     *
     * Backend returns:
     *
     * image_url
     *
     * NOT:
     *
     * image
     */

    const imagePath =
      image?.image_url;


    // No image path
    if (!imagePath) {
      return "/images/placeholder.jpg";
    }


    // Full URL
    if (
      imagePath.startsWith(
        "http://"
      ) ||
      imagePath.startsWith(
        "https://"
      )
    ) {
      return imagePath;
    }


    // Backend relative path
    if (
      imagePath.startsWith("/")
    ) {
      return `${API_URL}${imagePath}`;
    }


    // Backend path without /
    return `${API_URL}/${imagePath}`;
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
            Loading images...
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


      {/* ================================================== */}
      {/* HEADER */}
      {/* ================================================== */}

      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-5">

          <button
            type="button"
            onClick={() =>
              router.push(
                "/admin/projects"
              )
            }
            className="rounded-lg border p-2 transition hover:bg-gray-100"
          >

            <ArrowLeft
              size={20}
            />

          </button>


          <div>

            <h1 className="text-2xl font-bold">
              Project Images
            </h1>

            <p className="text-sm text-gray-500">
              {project?.title ||
                "Project"}
            </p>

          </div>

        </div>

      </header>


      {/* ================================================== */}
      {/* CONTENT */}
      {/* ================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-8">


        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">

            {error}

          </div>
        )}


        {/* ================================================= */}
        {/* SUCCESS */}
        {/* ================================================= */}

        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">

            {success}

          </div>
        )}


        {/* ================================================= */}
        {/* UPLOAD BOX */}
        {/* ================================================= */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-gray-100 p-3">

              <ImagePlus
                size={24}
              />

            </div>


            <div>

              <h2 className="text-lg font-bold">
                Upload Images
              </h2>

              <p className="text-sm text-gray-500">
                JPG, PNG or WebP — maximum
                10MB per image.
              </p>

            </div>

          </div>


          {/* ================================================= */}
          {/* FILE INPUT */}
          {/* ================================================= */}

          <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-12 text-center transition hover:border-gray-500 hover:bg-gray-50">

            <Upload
              size={32}
              className="text-gray-400"
            />

            <p className="mt-4 font-semibold">
              Choose project images
            </p>

            <p className="mt-1 text-sm text-gray-500">
              You can select multiple images.
            </p>


            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={
                handleFileChange
              }
              className="hidden"
            />

          </label>


          {/* ================================================= */}
          {/* SELECTED FILES */}
          {/* ================================================= */}

          {selectedFiles.length > 0 && (
            <div className="mt-6">

              <h3 className="font-semibold">
                Selected Images
              </h3>


              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                {selectedFiles.map(
                  (file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="rounded-xl border bg-gray-50 p-3"
                    >

                      <p className="truncate text-sm font-medium">
                        {file.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {(
                          file.size /
                          1024 /
                          1024
                        ).toFixed(2)}{" "}
                        MB
                      </p>

                    </div>
                  )
                )}

              </div>


              <button
                type="button"
                onClick={
                  uploadImages
                }
                disabled={uploading}
                className="mt-5 flex items-center gap-2 rounded-lg bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >

                <Upload
                  size={18}
                />

                {uploading
                  ? "Uploading..."
                  : `Upload ${
                      selectedFiles.length
                    } Image${
                      selectedFiles.length >
                      1
                        ? "s"
                        : ""
                    }`}

              </button>

            </div>
          )}

        </div>


        {/* ================================================= */}
        {/* EXISTING IMAGES */}
        {/* ================================================= */}

        <div className="mt-8">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold">
                Gallery
              </h2>

              <p className="text-sm text-gray-500">
                {images.length} image
                {images.length !== 1
                  ? "s"
                  : ""}
              </p>

            </div>

          </div>


          {/* ================================================= */}
          {/* EMPTY */}
          {/* ================================================= */}

          {images.length === 0 ? (

            <div className="mt-5 rounded-2xl bg-white p-12 text-center shadow-sm">

              <ImagePlus
                size={40}
                className="mx-auto text-gray-300"
              />

              <p className="mt-4 font-semibold">
                No images uploaded
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Upload images above to
                create your project gallery.
              </p>

            </div>

          ) : (

            /* ================================================= */
            /* IMAGE GRID */
            /* ================================================= */

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {images.map(
                (image) => (

                  <div
                    key={image.id}
                    className="overflow-hidden rounded-2xl bg-white shadow-sm"
                  >

                    {/* IMAGE */}

                    <div className="aspect-[4/3] bg-gray-100">

                      <img
                        src={getImageUrl(
                          image
                        )}
                        alt={
                          image.alt_text ||
                          image.title ||
                          project?.title ||
                          "Project image"
                        }
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.src =
                            "/images/placeholder.jpg";
                        }}
                      />

                    </div>


                    {/* DETAILS */}

                    <div className="p-4">

                      <p className="truncate text-sm font-medium">

                        {image.title ||
                          `Image ${
                            image.sort_order ??
                            ""
                          }`}

                      </p>


                      {image.description && (
                        <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                          {
                            image.description
                          }
                        </p>
                      )}


                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() =>
                          deleteImage(
                            image
                          )
                        }
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >

                        <Trash2
                          size={16}
                        />

                        Delete

                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </section>

    </main>
  );
}