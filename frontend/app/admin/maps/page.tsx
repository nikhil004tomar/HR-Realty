"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Upload,
  X,
  CheckCircle2,
  Eye,
  EyeOff,
  RefreshCw,
  MapPinned,
} from "lucide-react";

import { getToken } from "@/lib/auth";
import { apiRequest } from "@/lib/api-client";

interface SiteMap {
  id: number;
  title: string;
  description: string | null;
  image: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

interface MapForm {
  title: string;
  description: string;
  display_order: number;
  is_published: boolean;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

function getImageUrl(
  image?: string | null
): string {
  if (!image) {
    return "/Location_Map_DMC-3.jpg";
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${API_URL}${image}`;
}

export default function AdminMapsPage() {
  const router = useRouter();

  const [maps, setMaps] = useState<SiteMap[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [editingMap, setEditingMap] =
    useState<SiteMap | null>(null);

  const [form, setForm] =
    useState<MapForm>({
      title: "",
      description: "",
      display_order: 0,
      is_published: true,
    });

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const [saving, setSaving] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // ==========================================================
  // AUTH
  // ==========================================================

  function checkAuth() {
    const token = getToken();

    if (!token) {
      router.replace("/admin/login");
      return false;
    }

    return true;
  }

  // ==========================================================
  // LOAD MAPS
  // ==========================================================

  async function loadMaps() {
    if (!checkAuth()) return;

    try {
      setLoading(true);
      setError("");

      const data =
        await apiRequest<SiteMap[]>(
          "/api/maps/admin",
          {
            authenticated: true,
          }
        );

      setMaps(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {
      console.error(
        "Failed to load maps:",
        err
      );

      setError(
        "Failed to load maps. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMaps();
  }, []);

  // ==========================================================
  // RESET FORM
  // ==========================================================

  function resetForm() {
    setForm({
      title: "",
      description: "",
      display_order: 0,
      is_published: true,
    });

    setSelectedFile(null);
    setPreviewUrl(null);
    setEditingMap(null);
    setError("");
  }

  // ==========================================================
  // OPEN CREATE
  // ==========================================================

  function handleCreate() {
    resetForm();
    setShowModal(true);
  }

  // ==========================================================
  // OPEN EDIT
  // ==========================================================

  function handleEdit(map: SiteMap) {
    setEditingMap(map);

    setForm({
      title: map.title,
      description: map.description || "",
      display_order: map.display_order,
      is_published: map.is_published,
    });

    setSelectedFile(null);
    setPreviewUrl(
      map.image
        ? getImageUrl(map.image)
        : null
    );

    setError("");
    setShowModal(true);
  }

  // ==========================================================
  // CLOSE MODAL
  // ==========================================================

  function handleCloseModal() {
    if (saving || uploading) return;

    setShowModal(false);
    resetForm();
  }

  // ==========================================================
  // FILE SELECT
  // ==========================================================

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Only JPG, PNG, WEBP and AVIF images are allowed."
      );

      event.target.value = "";
      return;
    }

    const maxSize =
      15 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Map image must be smaller than 15MB."
      );

      event.target.value = "";
      return;
    }

    setError("");
    setSelectedFile(file);

    const objectUrl =
      URL.createObjectURL(file);

    setPreviewUrl(objectUrl);
  }

  // ==========================================================
  // CREATE / UPDATE
  // ==========================================================

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    if (!checkAuth()) return;

    if (!form.title.trim()) {
      setError("Map title is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      let savedMap: SiteMap;

      if (editingMap) {
        savedMap =
          await apiRequest<SiteMap>(
            `/api/maps/${editingMap.id}`,
            {
              method: "PATCH",
              authenticated: true,
              body: {
                title: form.title.trim(),
                description:
                  form.description.trim() ||
                  null,
                display_order:
                  Number(form.display_order) || 0,
                is_published:
                  form.is_published,
              },
            }
          );

      } else {
        savedMap =
          await apiRequest<SiteMap>(
            "/api/maps",
            {
              method: "POST",
              authenticated: true,
              body: {
                title: form.title.trim(),
                description:
                  form.description.trim() ||
                  null,
                display_order:
                  Number(form.display_order) || 0,
                is_published:
                  form.is_published,
              },
            }
          );
      }

      // ------------------------------------------------------
      // UPLOAD IMAGE
      // ------------------------------------------------------

      if (selectedFile) {
        setUploading(true);

        const formData =
          new FormData();

        formData.append(
          "file",
          selectedFile
        );

        const token = getToken();

        const response =
          await fetch(
            `${API_URL}/api/maps/${savedMap.id}/image`,
            {
              method: "POST",
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
              body: formData,
            }
          );

        if (!response.ok) {
          const text =
            await response.text();

          throw new Error(
            text ||
              "Failed to upload map image."
          );
        }
      }

      setSuccess(
        editingMap
          ? "Map updated successfully."
          : "Map created successfully."
      );

      setShowModal(false);
      resetForm();

      await loadMaps();

    } catch (err) {
      console.error(
        "Map save error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to save map."
      );

    } finally {
      setSaving(false);
      setUploading(false);
    }
  }

  // ==========================================================
  // TOGGLE PUBLISHED
  // ==========================================================

  async function togglePublished(
    map: SiteMap
  ) {
    if (!checkAuth()) return;

    try {
      setError("");
      setSuccess("");

      await apiRequest(
        `/api/maps/${map.id}`,
        {
          method: "PATCH",
          authenticated: true,
          body: {
            is_published:
              !map.is_published,
          },
        }
      );

      setSuccess(
        map.is_published
          ? "Map unpublished."
          : "Map published."
      );

      await loadMaps();

    } catch (err) {
      console.error(
        "Publish toggle error:",
        err
      );

      setError(
        "Failed to update map status."
      );
    }
  }

  // ==========================================================
  // DELETE MAP
  // ==========================================================

  async function handleDelete(
    map: SiteMap
  ) {
    if (!checkAuth()) return;

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${map.title}"?`
      );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await apiRequest(
        `/api/maps/${map.id}`,
        {
          method: "DELETE",
          authenticated: true,
        }
      );

      setSuccess(
        "Map deleted successfully."
      );

      await loadMaps();

    } catch (err) {
      console.error(
        "Delete map error:",
        err
      );

      setError(
        "Failed to delete map."
      );
    }
  }

  // ==========================================================
  // REMOVE IMAGE
  // ==========================================================

  async function removeImage(
    map: SiteMap
  ) {
    if (!checkAuth()) return;

    const confirmed =
      window.confirm(
        "Remove this map image?"
      );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await apiRequest(
        `/api/maps/${map.id}/image`,
        {
          method: "DELETE",
          authenticated: true,
        }
      );

      setSuccess(
        "Map image removed."
      );

      await loadMaps();

    } catch (err) {
      console.error(
        "Remove image error:",
        err
      );

      setError(
        "Failed to remove map image."
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

          <RefreshCw
            size={35}
            className="mx-auto animate-spin text-[#043927]"
          />

          <p className="mt-4 text-gray-600">
            Loading maps...
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

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                router.push("/admin")
              }
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-100"
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={19} />
            </button>

            <div>

              <h1 className="text-xl font-bold text-gray-900">
                Maps
              </h1>

              <p className="text-xs text-gray-500">
                Manage website maps
              </p>

            </div>

          </div>

          <button
            onClick={handleCreate}
            className="flex items-center gap-2 rounded-lg bg-[#043927] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#075238]"
          >
            <Plus size={18} />
            Add Map
          </button>

        </div>

      </header>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-8">

        {/* SUCCESS */}

        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">

            <CheckCircle2 size={19} />

            {success}

          </div>
        )}

        {/* ERROR */}

        {error && !showModal && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* EMPTY */}

        {maps.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#043927]/5">

              <MapPinned
                size={30}
                className="text-[#043927]"
              />

            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No Maps Available
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Add your first Dholera map to display it
              on the website.
            </p>

            <button
              onClick={handleCreate}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#043927] px-5 py-3 text-sm font-semibold text-white"
            >
              <Plus size={18} />
              Add First Map
            </button>

          </div>
        )}

        {/* MAP GRID */}

        {maps.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {maps.map((map) => (

              <div
                key={map.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >

                {/* IMAGE */}

                <div className="relative aspect-[16/10] bg-gray-100">

                  <Image
                    src={getImageUrl(map.image)}
                    alt={map.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />

                  {/* STATUS */}

                  <div className="absolute left-3 top-3">

                    {map.is_published ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                        <Eye size={13} />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-700 px-3 py-1 text-xs font-semibold text-white">
                        <EyeOff size={13} />
                        Hidden
                      </span>
                    )}

                  </div>

                </div>

                {/* CONTENT */}

                <div className="p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-wider text-[#C9A45C]">
                        Order {map.display_order}
                      </p>

                      <h2 className="mt-1 text-lg font-bold text-gray-900">
                        {map.title}
                      </h2>

                    </div>

                  </div>

                  {map.description && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                      {map.description}
                    </p>
                  )}

                  {/* ACTIONS */}

                  <div className="mt-5 flex flex-wrap gap-2">

                    <button
                      onClick={() =>
                        handleEdit(map)
                      }
                      className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                      <Pencil size={15} />
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        togglePublished(map)
                      }
                      className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                      {map.is_published ? (
                        <>
                          <EyeOff size={15} />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye size={15} />
                          Publish
                        </>
                      )}
                    </button>

                    {map.image && (
                      <button
                        onClick={() =>
                          removeImage(map)
                        }
                        className="flex items-center gap-2 rounded-lg border border-orange-200 px-3 py-2 text-sm font-medium text-orange-600 transition hover:bg-orange-50"
                      >
                        <Upload size={15} />
                        Remove Image
                      </button>
                    )}

                    <button
                      onClick={() =>
                        handleDelete(map)
                      }
                      className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </section>

      {/* =====================================================
          CREATE / EDIT MODAL
      ===================================================== */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  {editingMap
                    ? "Edit Map"
                    : "Add Map"}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Manage your Dholera map content.
                </p>

              </div>

              <button
                onClick={handleCloseModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100"
              >
                <X size={19} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-6"
            >

              {/* ERROR */}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* TITLE */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Map Title *
                </label>

                <input
                  type="text"
                  value={form.title}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      title: event.target.value,
                    })
                  }
                  placeholder="Dholera SIR Master Map"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#043927] focus:ring-2 focus:ring-[#043927]/10"
                  required
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Description
                </label>

                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description:
                        event.target.value,
                    })
                  }
                  placeholder="Explore the planned development landscape of Dholera SIR..."
                  rows={5}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#043927] focus:ring-2 focus:ring-[#043927]/10"
                />

              </div>

              {/* ORDER + PUBLISHED */}

              <div className="grid gap-5 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Display Order
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={form.display_order}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        display_order:
                          Number(
                            event.target.value
                          ),
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#043927] focus:ring-2 focus:ring-[#043927]/10"
                  />

                </div>

                <div className="flex items-end">

                  <label className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 px-4 py-3">

                    <div>

                      <p className="text-sm font-semibold text-gray-700">
                        Published
                      </p>

                      <p className="text-xs text-gray-500">
                        Show this map publicly
                      </p>

                    </div>

                    <input
                      type="checkbox"
                      checked={
                        form.is_published
                      }
                      onChange={(event) =>
                        setForm({
                          ...form,
                          is_published:
                            event.target.checked,
                        })
                      }
                      className="h-5 w-5 accent-[#043927]"
                    />

                  </label>

                </div>

              </div>

              {/* IMAGE */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Map Image
                </label>

                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.avif,image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleFileChange}
                  className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                />

                <p className="mt-2 text-xs text-gray-500">
                  JPG, PNG, WEBP or AVIF. Maximum 15MB.
                </p>

                {/* PREVIEW */}

                {previewUrl && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">

                    <div className="relative aspect-[16/10] bg-gray-100">

                      <Image
                        src={previewUrl}
                        alt="Map preview"
                        fill
                        unoptimized
                        className="object-contain"
                      />

                    </div>

                  </div>
                )}

              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 border-t pt-5">

                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={
                    saving || uploading
                  }
                  className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    saving || uploading
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-[#043927] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#075238] disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {saving || uploading ? (
                    <>
                      <RefreshCw
                        size={16}
                        className="animate-spin"
                      />

                      {uploading
                        ? "Uploading..."
                        : "Saving..."}
                    </>
                  ) : (
                    <>
                      {editingMap
                        ? "Update Map"
                        : "Create Map"}
                    </>
                  )}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </main>
  );
}