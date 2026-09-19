"use client";

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Check,
  ChevronDown,
  ChevronUp,
  Edit3,
  Eye,
  EyeOff,
  ImagePlus,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { apiRequest } from "@/lib/api-client";


// ============================================================
// TYPES
// ============================================================

interface ConnectivityImage {
  id: number;
  connectivity_id: number;
  image_url: string;
  original_name: string | null;
  display_order: number;
  created_at: string;
}

interface Connectivity {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  images: ConnectivityImage[];
}


// ============================================================
// INITIAL SECTIONS
// ============================================================

const defaultConnectivitySections = [
  {
    slug: "dholera-international-airport",
    title: "Dholera International Airport",
  },
  {
    slug: "road-connectivity",
    title: "Road Connectivity",
  },
  {
    slug: "dedicated-freight-corridor",
    title: "Dedicated Freight Corridor",
  },
  {
    slug: "port-connectivity",
    title: "Port Connectivity",
  },
  {
    slug: "ahmedabad-connectivity",
    title: "Ahmedabad Connectivity",
  },
  {
    slug: "dholera-sir-network",
    title: "Dholera SIR Network",
  },
];


// ============================================================
// HELPERS
// ============================================================

function getImageUrl(url: string) {
  if (!url) return "";

  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  if (typeof window !== "undefined") {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "http://127.0.0.1:8000";

    return `${apiUrl}${url}`;
  }

  return url;
}


function formatDate(date: string) {
  if (!date) return "";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}


// ============================================================
// PAGE
// ============================================================

export default function AdminConnectivityPage() {

  const [connectivity, setConnectivity] =
    useState<Connectivity[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [uploadingId, setUploadingId] =
    useState<number | null>(null);

  const [deletingImageId, setDeletingImageId] =
    useState<number | null>(null);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [expandedId, setExpandedId] =
    useState<number | null>(null);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [showCreate, setShowCreate] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  // ==========================================================
  // CREATE FORM
  // ==========================================================

  const [createForm, setCreateForm] = useState({
    slug: "",
    title: "",
    description: "",
    display_order: 0,
    is_published: true,
  });


  // ==========================================================
  // EDIT FORM
  // ==========================================================

  const [editForm, setEditForm] = useState({
    slug: "",
    title: "",
    description: "",
    display_order: 0,
    is_published: true,
  });


  // ==========================================================
  // LOAD CONNECTIVITY
  // ==========================================================

  const loadConnectivity = useCallback(
    async (showRefresh = false) => {

      try {

        if (showRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const data =
          await apiRequest<Connectivity[]>(
            "/api/connectivity/admin"
          );

        setConnectivity(data || []);

      } catch (err) {

        console.error(
          "Failed to load connectivity:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load connectivity sections."
        );

      } finally {

        setLoading(false);
        setRefreshing(false);
      }

    },
    []
  );


  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    loadConnectivity();
  }, [loadConnectivity]);


  // ==========================================================
  // CREATE SECTION
  // ==========================================================

  async function handleCreate(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();

    if (!createForm.slug.trim()) {
      setError("Slug is required.");
      return;
    }

    if (!createForm.title.trim()) {
      setError("Title is required.");
      return;
    }

    try {

      setSaving(true);
      setError("");
      setMessage("");

      const created =
        await apiRequest<Connectivity>(
          "/api/connectivity",
          {
            method: "POST",
            body: {
              slug: createForm.slug
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-"),

              title: createForm.title.trim(),

              description:
                createForm.description.trim() ||
                null,

              display_order:
                Number(
                  createForm.display_order
                ),

              is_published:
                createForm.is_published,
            },
          }
        );

      setConnectivity((current) => [
        ...current,
        created,
      ]);

      setCreateForm({
        slug: "",
        title: "",
        description: "",
        display_order: 0,
        is_published: true,
      });

      setShowCreate(false);

      setMessage(
        "Connectivity section created successfully."
      );

      setExpandedId(created.id);

    } catch (err) {

      console.error(
        "Create connectivity error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to create connectivity section."
      );

    } finally {

      setSaving(false);
    }
  }


  // ==========================================================
  // START EDIT
  // ==========================================================

  function startEdit(item: Connectivity) {

    setEditingId(item.id);

    setEditForm({
      slug: item.slug,
      title: item.title,
      description: item.description || "",
      display_order: item.display_order,
      is_published: item.is_published,
    });

    setError("");
    setMessage("");
  }


  // ==========================================================
  // UPDATE SECTION
  // ==========================================================

  async function handleUpdate(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();

    if (editingId === null) return;

    if (!editForm.slug.trim()) {
      setError("Slug is required.");
      return;
    }

    if (!editForm.title.trim()) {
      setError("Title is required.");
      return;
    }

    try {

      setSaving(true);
      setError("");
      setMessage("");

      const updated =
        await apiRequest<Connectivity>(
          `/api/connectivity/${editingId}`,
          {
            method: "PATCH",
            body: {
              slug: editForm.slug
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-"),

              title: editForm.title.trim(),

              description:
                editForm.description.trim() ||
                null,

              display_order:
                Number(
                  editForm.display_order
                ),

              is_published:
                editForm.is_published,
            },
          }
        );

      setConnectivity((current) =>
        current.map((item) =>
          item.id === updated.id
            ? updated
            : item
        )
      );

      setEditingId(null);

      setMessage(
        "Connectivity section updated successfully."
      );

    } catch (err) {

      console.error(
        "Update connectivity error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update connectivity section."
      );

    } finally {

      setSaving(false);
    }
  }


  // ==========================================================
  // DELETE SECTION
  // ==========================================================

  async function handleDelete(
    item: Connectivity
  ) {

    const confirmed = window.confirm(
      `Delete "${item.title}"?\n\nThis will also delete all images belonging to this section.`
    );

    if (!confirmed) return;

    try {

      setDeletingId(item.id);

      setError("");
      setMessage("");

      await apiRequest(
        `/api/connectivity/${item.id}`,
        {
          method: "DELETE",
        }
      );

      setConnectivity((current) =>
        current.filter(
          (entry) =>
            entry.id !== item.id
        )
      );

      if (expandedId === item.id) {
        setExpandedId(null);
      }

      setMessage(
        "Connectivity section deleted successfully."
      );

    } catch (err) {

      console.error(
        "Delete connectivity error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete connectivity section."
      );

    } finally {

      setDeletingId(null);
    }
  }


  // ==========================================================
  // UPLOAD IMAGE
  // ==========================================================

  async function handleImageUpload(
    event: ChangeEvent<HTMLInputElement>,
    item: Connectivity
  ) {

    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;


    // --------------------------------------------------------
    // Validate type
    // --------------------------------------------------------

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

      return;
    }


    // --------------------------------------------------------
    // Validate size
    // --------------------------------------------------------

    if (file.size > 15 * 1024 * 1024) {

      setError(
        "Image must be smaller than 15MB."
      );

      return;
    }


    try {

      setUploadingId(item.id);

      setError("");
      setMessage("");

      const formData = new FormData();

      formData.append(
        "file",
        file
      );

      const nextOrder =
        item.images.length + 1;

      formData.append(
        "display_order",
        String(nextOrder)
      );


      const uploaded =
        await apiRequest<ConnectivityImage>(
          `/api/connectivity/${item.id}/images`,
          {
            method: "POST",
            body: formData,
          }
        );


      setConnectivity((current) =>
        current.map((entry) => {

          if (entry.id !== item.id) {
            return entry;
          }

          return {
            ...entry,
            images: [
              ...entry.images,
              uploaded,
            ].sort(
              (a, b) =>
                a.display_order -
                b.display_order
            ),
          };
        })
      );

      setMessage(
        "Image uploaded successfully."
      );

    } catch (err) {

      console.error(
        "Upload connectivity image error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to upload image."
      );

    } finally {

      setUploadingId(null);
    }
  }


  // ==========================================================
  // DELETE IMAGE
  // ==========================================================

  async function handleDeleteImage(
    image: ConnectivityImage
  ) {

    const confirmed = window.confirm(
      "Delete this image?"
    );

    if (!confirmed) return;

    try {

      setDeletingImageId(image.id);

      setError("");
      setMessage("");

      await apiRequest(
        `/api/connectivity/images/${image.id}`,
        {
          method: "DELETE",
        }
      );

      setConnectivity((current) =>
        current.map((item) => {

          if (
            item.id !==
            image.connectivity_id
          ) {
            return item;
          }

          return {
            ...item,
            images: item.images
              .filter(
                (entry) =>
                  entry.id !== image.id
              )
              .map(
                (entry, index) => ({
                  ...entry,
                  display_order:
                    index + 1,
                })
              ),
          };
        })
      );

      setMessage(
        "Image deleted successfully."
      );

    } catch (err) {

      console.error(
        "Delete image error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete image."
      );

    } finally {

      setDeletingImageId(null);
    }
  }


  // ==========================================================
  // TOGGLE PUBLISHED
  // ==========================================================

  async function togglePublished(
    item: Connectivity
  ) {

    try {

      setError("");
      setMessage("");

      const updated =
        await apiRequest<Connectivity>(
          `/api/connectivity/${item.id}`,
          {
            method: "PATCH",
            body: {
              is_published:
                !item.is_published,
            },
          }
        );

      setConnectivity((current) =>
        current.map((entry) =>
          entry.id === updated.id
            ? updated
            : entry
        )
      );

      setMessage(
        updated.is_published
          ? "Section published."
          : "Section unpublished."
      );

    } catch (err) {

      console.error(
        "Toggle publish error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to change publish status."
      );
    }
  }


  // ==========================================================
  // MOVE IMAGE UP/DOWN
  // ==========================================================

  async function moveImage(
    item: Connectivity,
    index: number,
    direction: "up" | "down"
  ) {

    const images = [...item.images];

    const targetIndex =
      direction === "up"
        ? index - 1
        : index + 1;

    if (
      targetIndex < 0 ||
      targetIndex >= images.length
    ) {
      return;
    }

    const currentImage =
      images[index];

    const targetImage =
      images[targetIndex];

    try {

      setError("");

      await Promise.all([
        apiRequest(
          `/api/connectivity/images/${currentImage.id}`,
          {
            method: "PATCH",
            body: {
              display_order:
                targetImage.display_order,
            },
          }
        ),

        apiRequest(
          `/api/connectivity/images/${targetImage.id}`,
          {
            method: "PATCH",
            body: {
              display_order:
                currentImage.display_order,
            },
          }
        ),
      ]);

      images[index] = targetImage;
      images[targetIndex] = currentImage;

      const updatedImages =
        images.map(
          (image, imageIndex) => ({
            ...image,
            display_order:
              imageIndex + 1,
          })
        );

      setConnectivity((current) =>
        current.map((entry) =>
          entry.id === item.id
            ? {
                ...entry,
                images: updatedImages,
              }
            : entry
        )
      );

      setMessage(
        "Image order updated."
      );

    } catch (err) {

      console.error(
        "Move image error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update image order."
      );
    }
  }


  // ==========================================================
  // SEED DEFAULT SIX SECTIONS
  // ==========================================================

  async function createDefaultSections() {

    const existingSlugs = new Set(
      connectivity.map(
        (item) => item.slug
      )
    );

    const missing =
      defaultConnectivitySections.filter(
        (item) =>
          !existingSlugs.has(item.slug)
      );

    if (missing.length === 0) {

      setMessage(
        "All default connectivity sections already exist."
      );

      return;
    }

    const confirmed = window.confirm(
      `Create ${missing.length} missing default connectivity sections?`
    );

    if (!confirmed) return;

    try {

      setSaving(true);
      setError("");
      setMessage("");

      for (
        let index = 0;
        index < missing.length;
        index++
      ) {

        const section =
          missing[index];

        await apiRequest<Connectivity>(
          "/api/connectivity",
          {
            method: "POST",
            body: {
              slug: section.slug,
              title: section.title,
              description: null,
              display_order:
                index + 1,
              is_published: true,
            },
          }
        );
      }

      await loadConnectivity();

      setMessage(
        "Default connectivity sections created successfully."
      );

    } catch (err) {

      console.error(
        "Create default sections error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to create default sections."
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
      <main className="min-h-screen bg-[#f7f7f4] px-5 py-10">

        <div className="mx-auto flex max-w-7xl items-center justify-center py-32">

          <div className="text-center">

            <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#043927]" />

            <p className="mt-4 text-sm text-gray-500">
              Loading connectivity...
            </p>

          </div>

        </div>

      </main>
    );
  }


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#111111]">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <section className="border-b border-black/10 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <span className="h-px w-10 bg-[#C9A45C]" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                  Admin Management
                </span>

              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Connectivity
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Manage Dholera SIR connectivity sections
                and upload their images.
              </p>

            </div>


            <div className="flex flex-wrap gap-3">

              <button
                type="button"
                onClick={() =>
                  loadConnectivity(true)
                }
                disabled={refreshing}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-[#111111] transition hover:border-[#C9A45C] disabled:opacity-50"
              >

                <RefreshCw
                  className={`h-4 w-4 ${
                    refreshing
                      ? "animate-spin"
                      : ""
                  }`}
                />

                Refresh

              </button>


              <button
                type="button"
                onClick={
                  createDefaultSections
                }
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl border border-[#043927] bg-white px-4 py-3 text-sm font-semibold text-[#043927] transition hover:bg-[#043927] hover:text-white disabled:opacity-50"
              >

                <Check className="h-4 w-4" />

                Create Default Sections

              </button>


              <button
                type="button"
                onClick={() =>
                  setShowCreate(
                    !showCreate
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl bg-[#043927] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#032d20]"
              >

                {showCreate ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}

                {showCreate
                  ? "Close"
                  : "Add Connectivity"}

              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          MESSAGES
      ====================================================== */}

      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8 lg:px-10">

        {message && (

          <div className="mb-4 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">

            <Check className="h-5 w-5" />

            {message}

            <button
              type="button"
              onClick={() =>
                setMessage("")
              }
              className="ml-auto"
            >
              <X className="h-4 w-4" />
            </button>

          </div>

        )}


        {error && (

          <div className="mb-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">

            <X className="h-5 w-5" />

            <span>{error}</span>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
              className="ml-auto"
            >
              <X className="h-4 w-4" />
            </button>

          </div>

        )}

      </div>


      {/* ======================================================
          CREATE FORM
      ====================================================== */}

      {showCreate && (

        <section className="mx-auto max-w-7xl px-5 pt-2 sm:px-8 lg:px-10">

          <form
            onSubmit={handleCreate}
            className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
          >

            <div className="mb-6">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A45C]">
                New Section
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#043927]">
                Add Connectivity Section
              </h2>

            </div>


            <div className="grid gap-5 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Title
                </label>

                <input
                  value={createForm.title}
                  onChange={(event) =>
                    setCreateForm(
                      (current) => ({
                        ...current,
                        title:
                          event.target.value,
                      })
                    )
                  }
                  placeholder="Dholera International Airport"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/20"
                />

              </div>


              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Slug
                </label>

                <input
                  value={createForm.slug}
                  onChange={(event) =>
                    setCreateForm(
                      (current) => ({
                        ...current,
                        slug:
                          event.target.value,
                      })
                    )
                  }
                  placeholder="dholera-international-airport"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/20"
                />

              </div>


              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-semibold">
                  Description
                </label>

                <textarea
                  value={
                    createForm.description
                  }
                  onChange={(event) =>
                    setCreateForm(
                      (current) => ({
                        ...current,
                        description:
                          event.target.value,
                      })
                    )
                  }
                  rows={4}
                  placeholder="Optional description..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/20"
                />

              </div>


              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Display Order
                </label>

                <input
                  type="number"
                  value={
                    createForm.display_order
                  }
                  onChange={(event) =>
                    setCreateForm(
                      (current) => ({
                        ...current,
                        display_order:
                          Number(
                            event.target.value
                          ),
                      })
                    )
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#C9A45C]"
                />

              </div>


              <label className="flex cursor-pointer items-center gap-3 self-end pb-3">

                <input
                  type="checkbox"
                  checked={
                    createForm.is_published
                  }
                  onChange={(event) =>
                    setCreateForm(
                      (current) => ({
                        ...current,
                        is_published:
                          event.target.checked,
                      })
                    )
                  }
                  className="h-4 w-4 accent-[#043927]"
                />

                <span className="text-sm font-semibold">
                  Publish immediately
                </span>

              </label>

            </div>


            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                onClick={() =>
                  setShowCreate(false)
                }
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-[#043927] px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
              >

                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}

                Create Section

              </button>

            </div>

          </form>

        </section>
      )}


      {/* ======================================================
          CONTENT
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">

        {connectivity.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#043927] text-white">

              <ImagePlus className="h-7 w-7" />

            </div>

            <h2 className="mt-5 text-xl font-bold">
              No Connectivity Sections
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Create your six Dholera SIR connectivity
              sections to start uploading images.
            </p>

            <button
              type="button"
              onClick={
                createDefaultSections
              }
              className="mt-6 rounded-xl bg-[#043927] px-6 py-3 text-sm font-semibold text-white"
            >
              Create Default Sections
            </button>

          </div>

        ) : (

          <div className="space-y-5">

            {connectivity.map(
              (item, itemIndex) => {

                const isExpanded =
                  expandedId === item.id;

                const isEditing =
                  editingId === item.id;

                return (

                  <article
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
                  >

                    {/* =================================================
                        SECTION HEADER
                    ================================================= */}

                    <div className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">

                      <div className="flex min-w-0 items-start gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#043927] text-sm font-bold text-white">
                          {String(
                            itemIndex + 1
                          ).padStart(2, "0")}
                        </div>


                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-3">

                            <h2 className="text-lg font-bold text-[#111111]">
                              {item.title}
                            </h2>

                            <span
                              className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                                item.is_published
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {item.is_published
                                ? "Published"
                                : "Hidden"}
                            </span>

                          </div>

                          <p className="mt-1 break-all text-xs text-gray-400">
                            /{item.slug}
                          </p>

                          <p className="mt-2 text-sm text-gray-500">
                            {item.images.length}{" "}
                            {item.images.length === 1
                              ? "image"
                              : "images"}
                            {" • "}
                            Order{" "}
                            {item.display_order}
                            {" • "}
                            Updated{" "}
                            {formatDate(
                              item.updated_at
                            )}
                          </p>

                        </div>

                      </div>


                      <div className="flex flex-wrap items-center gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            togglePublished(item)
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold transition hover:border-[#C9A45C]"
                        >

                          {item.is_published ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}

                          {item.is_published
                            ? "Hide"
                            : "Publish"}

                        </button>


                        <button
                          type="button"
                          onClick={() =>
                            startEdit(item)
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold transition hover:border-[#C9A45C]"
                        >

                          <Edit3 className="h-4 w-4" />

                          Edit

                        </button>


                        <button
                          type="button"
                          onClick={() =>
                            setExpandedId(
                              isExpanded
                                ? null
                                : item.id
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-lg bg-[#043927] px-3 py-2 text-xs font-semibold text-white"
                        >

                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}

                          {isExpanded
                            ? "Close"
                            : "Manage"}

                        </button>


                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(item)
                          }
                          disabled={
                            deletingId === item.id
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >

                          {deletingId ===
                          item.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}

                          Delete

                        </button>

                      </div>

                    </div>


                    {/* =================================================
                        EDIT FORM
                    ================================================= */}

                    {isEditing && (

                      <div className="border-t border-gray-100 bg-[#fafaf8] p-5 sm:p-6">

                        <form
                          onSubmit={
                            handleUpdate
                          }
                        >

                          <div className="mb-5 flex items-center justify-between">

                            <div>

                              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#C9A45C]">
                                Edit Section
                              </p>

                              <h3 className="mt-1 text-lg font-bold text-[#043927]">
                                {item.title}
                              </h3>

                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                setEditingId(
                                  null
                                )
                              }
                              className="rounded-lg p-2 hover:bg-gray-100"
                            >
                              <X className="h-5 w-5" />
                            </button>

                          </div>


                          <div className="grid gap-4 md:grid-cols-2">

                            <div>

                              <label className="mb-2 block text-sm font-semibold">
                                Title
                              </label>

                              <input
                                value={
                                  editForm.title
                                }
                                onChange={(
                                  event
                                ) =>
                                  setEditForm(
                                    (
                                      current
                                    ) => ({
                                      ...current,
                                      title:
                                        event
                                          .target
                                          .value,
                                    })
                                  )
                                }
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#C9A45C]"
                              />

                            </div>


                            <div>

                              <label className="mb-2 block text-sm font-semibold">
                                Slug
                              </label>

                              <input
                                value={
                                  editForm.slug
                                }
                                onChange={(
                                  event
                                ) =>
                                  setEditForm(
                                    (
                                      current
                                    ) => ({
                                      ...current,
                                      slug:
                                        event
                                          .target
                                          .value,
                                    })
                                  )
                                }
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#C9A45C]"
                              />

                            </div>


                            <div className="md:col-span-2">

                              <label className="mb-2 block text-sm font-semibold">
                                Description
                              </label>

                              <textarea
                                value={
                                  editForm.description
                                }
                                onChange={(
                                  event
                                ) =>
                                  setEditForm(
                                    (
                                      current
                                    ) => ({
                                      ...current,
                                      description:
                                        event
                                          .target
                                          .value,
                                    })
                                  )
                                }
                                rows={4}
                                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#C9A45C]"
                              />

                            </div>


                            <div>

                              <label className="mb-2 block text-sm font-semibold">
                                Display Order
                              </label>

                              <input
                                type="number"
                                value={
                                  editForm.display_order
                                }
                                onChange={(
                                  event
                                ) =>
                                  setEditForm(
                                    (
                                      current
                                    ) => ({
                                      ...current,
                                      display_order:
                                        Number(
                                          event
                                            .target
                                            .value
                                        ),
                                    })
                                  )
                                }
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#C9A45C]"
                              />

                            </div>


                            <label className="flex items-center gap-3 self-end pb-3">

                              <input
                                type="checkbox"
                                checked={
                                  editForm.is_published
                                }
                                onChange={(
                                  event
                                ) =>
                                  setEditForm(
                                    (
                                      current
                                    ) => ({
                                      ...current,
                                      is_published:
                                        event
                                          .target
                                          .checked,
                                    })
                                  )
                                }
                                className="h-4 w-4 accent-[#043927]"
                              />

                              <span className="text-sm font-semibold">
                                Published
                              </span>

                            </label>

                          </div>


                          <div className="mt-5 flex justify-end gap-3">

                            <button
                              type="button"
                              onClick={() =>
                                setEditingId(
                                  null
                                )
                              }
                              className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold"
                            >
                              Cancel
                            </button>

                            <button
                              type="submit"
                              disabled={saving}
                              className="inline-flex items-center gap-2 rounded-xl bg-[#043927] px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
                            >

                              {saving ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Save className="h-4 w-4" />
                              )}

                              Save Changes

                            </button>

                          </div>

                        </form>

                      </div>
                    )}


                    {/* =================================================
                        IMAGE MANAGEMENT
                    ================================================= */}

                    {isExpanded && (

                      <div className="border-t border-gray-100 bg-[#fafaf8] p-5 sm:p-6">

                        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                          <div>

                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#C9A45C]">
                              Image Gallery
                            </p>

                            <h3 className="mt-1 text-xl font-bold text-[#043927]">
                              {item.title}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                              Upload images in the order
                              you want them displayed.
                            </p>

                          </div>


                          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#043927] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#032d20]">

                            {uploadingId ===
                            item.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Upload className="h-4 w-4" />
                            )}

                            {uploadingId ===
                            item.id
                              ? "Uploading..."
                              : "Upload Image"}

                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/avif"
                              className="hidden"
                              disabled={
                                uploadingId ===
                                item.id
                              }
                              onChange={(
                                event
                              ) =>
                                handleImageUpload(
                                  event,
                                  item
                                )
                              }
                            />

                          </label>

                        </div>


                        {/* =================================================
                            IMAGES
                        ================================================= */}

                        {item.images.length === 0 ? (

                          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">

                            <ImagePlus className="mx-auto h-10 w-10 text-gray-300" />

                            <h4 className="mt-4 font-semibold text-[#111111]">
                              No images uploaded
                            </h4>

                            <p className="mt-1 text-sm text-gray-500">
                              Upload the first image
                              for this connectivity
                              section.
                            </p>

                          </div>

                        ) : (

                          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                            {item.images
                              .sort(
                                (
                                  a,
                                  b
                                ) =>
                                  a.display_order -
                                  b.display_order
                              )
                              .map(
                                (
                                  image,
                                  index
                                ) => (

                                  <div
                                    key={
                                      image.id
                                    }
                                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                                  >

                                    {/* IMAGE */}

                                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">

                                      <img
                                        src={getImageUrl(
                                          image.image_url
                                        )}
                                        alt={
                                          image.original_name ||
                                          `${item.title} image ${
                                            index +
                                            1
                                          }`
                                        }
                                        className="h-full w-full object-contain"
                                      />

                                      <div className="absolute left-3 top-3 rounded-full bg-[#043927] px-3 py-1 text-xs font-bold text-white">
                                        #{index + 1}
                                      </div>

                                    </div>


                                    {/* DETAILS */}

                                    <div className="p-4">

                                      <p className="truncate text-sm font-semibold">
                                        {image.original_name ||
                                          "Connectivity image"}
                                      </p>

                                      <p className="mt-1 text-xs text-gray-400">
                                        Order{" "}
                                        {image.display_order}
                                      </p>


                                      {/* CONTROLS */}

                                      <div className="mt-4 flex items-center gap-2">

                                        <button
                                          type="button"
                                          disabled={
                                            index ===
                                            0
                                          }
                                          onClick={() =>
                                            moveImage(
                                              item,
                                              index,
                                              "up"
                                            )
                                          }
                                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 transition hover:border-[#C9A45C] disabled:cursor-not-allowed disabled:opacity-30"
                                          title="Move up"
                                        >
                                          <ChevronUp className="h-4 w-4" />
                                        </button>


                                        <button
                                          type="button"
                                          disabled={
                                            index ===
                                            item
                                              .images
                                              .length -
                                              1
                                          }
                                          onClick={() =>
                                            moveImage(
                                              item,
                                              index,
                                              "down"
                                            )
                                          }
                                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 transition hover:border-[#C9A45C] disabled:cursor-not-allowed disabled:opacity-30"
                                          title="Move down"
                                        >
                                          <ChevronDown className="h-4 w-4" />
                                        </button>


                                        <button
                                          type="button"
                                          disabled={
                                            deletingImageId ===
                                            image.id
                                          }
                                          onClick={() =>
                                            handleDeleteImage(
                                              image
                                            )
                                          }
                                          className="ml-auto flex h-9 items-center gap-2 rounded-lg border border-red-200 px-3 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                                        >

                                          {deletingImageId ===
                                          image.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                          ) : (
                                            <Trash2 className="h-4 w-4" />
                                          )}

                                          Delete

                                        </button>

                                      </div>

                                    </div>

                                  </div>

                                )
                              )}

                          </div>
                        )}

                      </div>
                    )}

                  </article>
                );
              }
            )}

          </div>
        )}

      </section>

    </main>
  );
}