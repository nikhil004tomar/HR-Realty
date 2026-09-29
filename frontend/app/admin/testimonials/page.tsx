"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Edit,
  Image as ImageIcon,
  Plus,
  Save,
  Trash2,
  X,
  Eye,
  EyeOff,
  MessageSquareQuote,
} from "lucide-react";

import API_URL from "@/lib/api";
import { getToken } from "@/lib/auth";

interface Testimonial {
  id: number;
  name: string;
  location: string | null;
  message: string;
  image: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

interface FormData {
  name: string;
  location: string;
  message: string;
  image: string;
  is_published: boolean;
}

const emptyForm: FormData = {
  name: "",
  location: "",
  message: "",
  image: "",
  is_published: true,
};

function getImageUrl(image?: string | null) {
  if (!image) {
    return "";
  }

  const cleanImage = image.trim();

  if (!cleanImage) {
    return "";
  }

  if (
    cleanImage.startsWith("http://127.0.0.1:8000")
  ) {
    return cleanImage.replace(
      "http://127.0.0.1:8000",
      API_URL
    );
  }

  if (
    cleanImage.startsWith("http://localhost:8000")
  ) {
    return cleanImage.replace(
      "http://localhost:8000",
      API_URL
    );
  }

  if (
    cleanImage.startsWith("http://backend:8000")
  ) {
    return cleanImage.replace(
      "http://backend:8000",
      API_URL
    );
  }

  if (
    cleanImage.startsWith("https://") ||
    cleanImage.startsWith("http://")
  ) {
    return cleanImage;
  }

  return `${API_URL}${
    cleanImage.startsWith("/")
      ? cleanImage
      : `/${cleanImage}`
  }`;
}

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<
    Testimonial[]
  >([]);

  const [form, setForm] =
    useState<FormData>(emptyForm);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // ============================================================
  // AUTH HEADERS
  // ============================================================

  const getAuthHeaders = () => {
    const token = getToken();

    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  };

  // ============================================================
  // LOAD TESTIMONIALS
  // ============================================================

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/testimonials`,
        {
          method: "GET",
          headers: getAuthHeaders(),
          cache: "no-store",
        }
      );

      if (response.status === 401) {
        throw new Error(
          "Your login session has expired. Please login again."
        );
      }

      if (!response.ok) {
        const data = await response
          .json()
          .catch(() => null);

        throw new Error(
          data?.detail ||
            `Failed to load testimonials (${response.status})`
        );
      }

      const data = await response.json();

      setTestimonials(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(
        "Testimonials loading error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load testimonials."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  // ============================================================
  // FORM CHANGE
  // ============================================================

  const updateField = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // ============================================================
  // RESET FORM
  // ============================================================

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
  };

  // ============================================================
  // EDIT
  // ============================================================

  const handleEdit = (
    testimonial: Testimonial
  ) => {
    setEditingId(testimonial.id);

    setForm({
      name: testimonial.name,
      location: testimonial.location || "",
      message: testimonial.message,
      image: testimonial.image || "",
      is_published: testimonial.is_published,
    });

    setSuccess("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // UPLOAD IMAGE
  // ============================================================

  const handleImageUpload = async (
    file: File
  ) => {
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Only JPG, PNG and WEBP images are allowed."
      );
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Image size must be less than 5 MB."
      );
      return;
    }

    try {
      setUploading(true);
      setError("");
      setSuccess("");

      const token = getToken();

      const uploadFormData = new FormData();

      uploadFormData.append("file", file);

      const response = await fetch(
        `${API_URL}/api/testimonials/upload-image`,
        {
          method: "POST",
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
          body: uploadFormData,
        }
      );

      if (response.status === 401) {
        throw new Error(
          "Your login session has expired. Please login again."
        );
      }

      if (!response.ok) {
        const data = await response
          .json()
          .catch(() => null);

        throw new Error(
          data?.detail ||
            `Image upload failed (${response.status})`
        );
      }

      const data = await response.json();

      if (!data.image) {
        throw new Error(
          "Image uploaded but no image path was returned."
        );
      }

      setForm((previous) => ({
        ...previous,
        image: data.image,
      }));

      setSuccess(
        "Image uploaded successfully."
      );
    } catch (err) {
      console.error(
        "Testimonial image upload error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to upload image."
      );
    } finally {
      setUploading(false);
    }
  };

  // ============================================================
  // SAVE
  // ============================================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Please enter the client name.");
      return;
    }

    if (!form.message.trim()) {
      setError(
        "Please enter the testimonial message."
      );
      return;
    }

    try {
      setSaving(true);

      const token = getToken();

      const payload = {
        name: form.name.trim(),
        location:
          form.location.trim() || null,
        message: form.message.trim(),
        image: form.image || null,
        is_published: form.is_published,
      };

      const url = editingId
        ? `${API_URL}/api/testimonials/${editingId}`
        : `${API_URL}/api/testimonials`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        throw new Error(
          "Your login session has expired. Please login again."
        );
      }

      if (!response.ok) {
        const data = await response
          .json()
          .catch(() => null);

        throw new Error(
          data?.detail ||
            `Failed to save testimonial (${response.status})`
        );
      }

      const savedTestimonial =
        await response.json();

      if (editingId) {
        setTestimonials((previous) =>
          previous.map((item) =>
            item.id === editingId
              ? savedTestimonial
              : item
          )
        );

        setSuccess(
          "Testimonial updated successfully."
        );
      } else {
        setTestimonials((previous) => [
          savedTestimonial,
          ...previous,
        ]);

        setSuccess(
          "Testimonial added successfully."
        );
      }

      resetForm();
    } catch (err) {
      console.error(
        "Save testimonial error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to save testimonial."
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // DELETE
  // ============================================================

  const handleDelete = async (
    id: number
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      const token = getToken();

      const response = await fetch(
        `${API_URL}/api/testimonials/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
        }
      );

      if (response.status === 401) {
        throw new Error(
          "Your login session has expired. Please login again."
        );
      }

      if (!response.ok) {
        const data = await response
          .json()
          .catch(() => null);

        throw new Error(
          data?.detail ||
            `Failed to delete testimonial (${response.status})`
        );
      }

      setTestimonials((previous) =>
        previous.filter(
          (item) => item.id !== id
        )
      );

      if (editingId === id) {
        resetForm();
      }

      setSuccess(
        "Testimonial deleted successfully."
      );
    } catch (err) {
      console.error(
        "Delete testimonial error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete testimonial."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ============================================================
  // TOGGLE PUBLISH
  // ============================================================

  const togglePublished = async (
    testimonial: Testimonial
  ) => {
    try {
      setError("");
      setSuccess("");

      const token = getToken();

      const payload = {
        name: testimonial.name,
        location: testimonial.location,
        message: testimonial.message,
        image: testimonial.image,
        is_published:
          !testimonial.is_published,
      };

      const response = await fetch(
        `${API_URL}/api/testimonials/${testimonial.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.status === 401) {
        throw new Error(
          "Your login session has expired. Please login again."
        );
      }

      if (!response.ok) {
        const data = await response
          .json()
          .catch(() => null);

        throw new Error(
          data?.detail ||
            `Failed to update testimonial (${response.status})`
        );
      }

      const updated =
        await response.json();

      setTestimonials((previous) =>
        previous.map((item) =>
          item.id === updated.id
            ? updated
            : item
        )
      );

      setSuccess(
        updated.is_published
          ? "Testimonial published."
          : "Testimonial unpublished."
      );
    } catch (err) {
      console.error(
        "Publish toggle error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update testimonial."
      );
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-[#f7f8f6] p-5 sm:p-8 lg:p-10">

      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                Admin Panel
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-[#111111] sm:text-4xl">
              Testimonials
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Add and manage client testimonials
              displayed on your website.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              resetForm();

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#043927] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#C9A45C] hover:text-[#111111]"
          >
            <Plus size={18} />
            Add Testimonial
          </button>

        </div>

        {/* ======================================================
            ALERTS
        ====================================================== */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* ======================================================
            FORM
        ====================================================== */}

        <div className="mb-10 rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-7 flex items-center justify-between gap-4 border-b border-black/10 pb-5">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#043927]/10">
                {editingId ? (
                  <Edit
                    size={20}
                    className="text-[#043927]"
                  />
                ) : (
                  <MessageSquareQuote
                    size={20}
                    className="text-[#043927]"
                  />
                )}
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#111111]">
                  {editingId
                    ? "Edit Testimonial"
                    : "Add New Testimonial"}
                </h2>

                <p className="text-xs text-gray-500">
                  {editingId
                    ? "Update client feedback"
                    : "Add a new client experience"}
                </p>
              </div>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                aria-label="Cancel editing"
              >
                <X size={18} />
              </button>
            )}

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* NAME + LOCATION */}

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#111111]">
                  Client Name
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    updateField(
                      "name",
                      event.target.value
                    )
                  }
                  placeholder="Enter client name"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#043927] focus:ring-2 focus:ring-[#043927]/10"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#111111]">
                  Location
                </label>

                <input
                  type="text"
                  value={form.location}
                  onChange={(event) =>
                    updateField(
                      "location",
                      event.target.value
                    )
                  }
                  placeholder="e.g. Ahmedabad, Gujarat"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#043927] focus:ring-2 focus:ring-[#043927]/10"
                />
              </div>

            </div>

            {/* MESSAGE */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#111111]">
                Testimonial Message
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <textarea
                value={form.message}
                onChange={(event) =>
                  updateField(
                    "message",
                    event.target.value
                  )
                }
                placeholder="Write the client's testimonial..."
                rows={6}
                className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-[#043927] focus:ring-2 focus:ring-[#043927]/10"
                required
              />
            </div>

            {/* IMAGE */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#111111]">
                Client Image
              </label>

              <div className="grid gap-5 md:grid-cols-[1fr_auto]">

                <label className="flex min-h-[130px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-black/10 bg-[#fafafa] px-5 text-center transition hover:border-[#043927]/40 hover:bg-[#043927]/5">

                  <ImageIcon
                    size={28}
                    className="mb-2 text-[#043927]"
                  />

                  <span className="text-sm font-semibold text-[#111111]">
                    {uploading
                      ? "Uploading..."
                      : "Upload Client Image"}
                  </span>

                  <span className="mt-1 text-xs text-gray-500">
                    JPG, PNG or WEBP • Max 5 MB
                  </span>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    disabled={uploading}
                    onChange={(event) => {
                      const file =
                        event.target.files?.[0];

                      if (file) {
                        handleImageUpload(file);
                      }

                      event.target.value = "";
                    }}
                  />

                </label>

                {/* IMAGE PREVIEW */}

                <div className="flex min-h-[130px] min-w-[130px] items-center justify-center rounded-xl border border-black/10 bg-[#fafafa] p-3">

                  {form.image ? (
                    <img
                      src={getImageUrl(form.image)}
                      alt="Client preview"
                      className="h-28 w-28 rounded-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-gray-400">
                      <ImageIcon
                        size={25}
                        className="mx-auto mb-2"
                      />

                      <span className="text-xs">
                        No image
                      </span>
                    </div>
                  )}

                </div>

              </div>
            </div>

            {/* PUBLISH */}

            <div className="flex items-center justify-between rounded-xl border border-black/10 bg-[#fafafa] p-4">

              <div>
                <p className="text-sm font-bold text-[#111111]">
                  Publish Testimonial
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Published testimonials appear
                  on the public website.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  updateField(
                    "is_published",
                    !form.is_published
                  )
                }
                className={`relative h-7 w-12 rounded-full transition ${
                  form.is_published
                    ? "bg-[#043927]"
                    : "bg-gray-300"
                }`}
                aria-label="Toggle published status"
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                    form.is_published
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>

            </div>

            {/* BUTTONS */}

            <div className="flex flex-col gap-3 border-t border-black/10 pt-6 sm:flex-row sm:justify-end">

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-bold text-[#111111] transition hover:border-[#043927] hover:text-[#043927]"
                >
                  <X size={17} />
                  Cancel
                </button>
              )}

              <button
                type="submit"
                disabled={saving || uploading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#043927] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#C9A45C] hover:text-[#111111] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {editingId ? (
                  <Save size={17} />
                ) : (
                  <Plus size={17} />
                )}

                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Testimonial"
                  : "Add Testimonial"}
              </button>

            </div>

          </form>
        </div>

        {/* ======================================================
            TESTIMONIAL LIST
        ====================================================== */}

        <div className="mb-4 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-[#111111]">
              All Testimonials
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {testimonials.length}{" "}
              {testimonials.length === 1
                ? "testimonial"
                : "testimonials"}
            </p>
          </div>

        </div>

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-black/10 bg-white">
            <div className="text-center">

              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-[#043927]" />

              <p className="mt-4 text-sm text-gray-500">
                Loading testimonials...
              </p>

            </div>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/15 bg-white px-6 py-16 text-center">

            <MessageSquareQuote
              size={40}
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-4 text-lg font-bold text-[#111111]">
              No testimonials yet
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Add your first client testimonial
              using the form above.
            </p>

          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">

            {testimonials.map(
              (testimonial) => (
                <div
                  key={testimonial.id}
                  className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:shadow-md"
                >

                  <div className="p-5 sm:p-6">

                    {/* TOP */}

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-center gap-4">

                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#043927]">

                          {testimonial.image ? (
                            <img
                              src={getImageUrl(
                                testimonial.image
                              )}
                              alt={
                                testimonial.name
                              }
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white">
                              {testimonial.name
                                .split(" ")
                                .map(
                                  (part) =>
                                    part.charAt(
                                      0
                                    )
                                )
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>
                          )}

                        </div>

                        <div>
                          <h3 className="font-bold text-[#111111]">
                            {testimonial.name}
                          </h3>

                          {testimonial.location && (
                            <p className="mt-1 text-xs text-gray-500">
                              {
                                testimonial.location
                              }
                            </p>
                          )}

                          <div className="mt-2 flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map(
                              (star) => (
                                <span
                                  key={star}
                                  className="text-sm text-[#C9A45C]"
                                >
                                  ★
                                </span>
                              )
                            )}
                          </div>
                        </div>

                      </div>

                      {/* STATUS */}

                      <span
                        className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          testimonial.is_published
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {testimonial.is_published ? (
                          <>
                            <Eye size={12} />
                            Published
                          </>
                        ) : (
                          <>
                            <EyeOff size={12} />
                            Hidden
                          </>
                        )}
                      </span>

                    </div>

                    {/* MESSAGE */}

                    <div className="mt-5 rounded-xl bg-[#f8f9f7] p-4">

                      <p className="line-clamp-4 text-sm leading-6 text-[#111111]/70">
                        “{testimonial.message}”
                      </p>

                    </div>

                    {/* ACTIONS */}

                    <div className="mt-5 flex flex-wrap gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          togglePublished(
                            testimonial
                          )
                        }
                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition ${
                          testimonial.is_published
                            ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            : "bg-[#043927]/10 text-[#043927] hover:bg-[#043927]/20"
                        }`}
                      >
                        {testimonial.is_published ? (
                          <>
                            <EyeOff size={14} />
                            Hide
                          </>
                        ) : (
                          <>
                            <Eye size={14} />
                            Publish
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(
                            testimonial
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-[#043927]/10 px-3 py-2 text-xs font-bold text-[#043927] transition hover:bg-[#043927]/20"
                      >
                        <Edit size={14} />
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={
                          deletingId ===
                          testimonial.id
                        }
                        onClick={() =>
                          handleDelete(
                            testimonial.id
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                        {deletingId ===
                        testimonial.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>
    </div>
  );
}