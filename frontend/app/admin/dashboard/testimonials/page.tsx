"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  X,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

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

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [isPublished, setIsPublished] =
    useState(true);

  // ============================================================
  // TOKEN
  // ============================================================

  function getToken() {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(
      "hr_realty_admin_token"
    );
  }

  // ============================================================
  // LOAD
  // ============================================================

  async function loadTestimonials() {
    try {
      setLoading(true);

      const token = getToken();

      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const response = await fetch(
        `${API_URL}/api/testimonials`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      if (response.status === 401) {
        localStorage.removeItem(
          "hr_realty_admin_token"
        );

        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error(
          "Failed to load testimonials"
        );
      }

      const data = await response.json();

      setTestimonials(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Load testimonials error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTestimonials();
  }, []);

  // ============================================================
  // RESET FORM
  // ============================================================

  function resetForm() {
    setEditingId(null);
    setName("");
    setLocation("");
    setMessage("");
    setImage("");
    setImageFile(null);
    setImagePreview("");
    setIsPublished(true);
  }

  // ============================================================
  // OPEN ADD
  // ============================================================

  function openAddForm() {
    resetForm();
    setShowForm(true);
  }

  // ============================================================
  // OPEN EDIT
  // ============================================================

  function openEditForm(
    testimonial: Testimonial
  ) {
    setEditingId(testimonial.id);

    setName(testimonial.name);

    setLocation(
      testimonial.location || ""
    );

    setMessage(testimonial.message);

    setImage(
      testimonial.image || ""
    );

    setImageFile(null);

    setImagePreview(
      testimonial.image
        ? `${API_URL}${testimonial.image}`
        : ""
    );

    setIsPublished(
      testimonial.is_published
    );

    setShowForm(true);
  }

  // ============================================================
  // IMAGE SELECT
  // ============================================================

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Only JPG, PNG and WEBP images are allowed."
      );

      event.target.value = "";
      return;
    }

    setImageFile(file);

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);
  }

  // ============================================================
  // UPLOAD IMAGE
  // ============================================================

  async function uploadImage(
    file: File
  ): Promise<string> {
    const token = getToken();

    if (!token) {
      window.location.href =
        "/admin/login";

      throw new Error(
        "Authentication required."
      );
    }

    setUploading(true);

    try {
      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const response =
        await fetch(
          `${API_URL}/api/testimonials/upload-image`,
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },

            body: formData,
          }
        );

      if (
        response.status === 401
      ) {
        localStorage.removeItem(
          "hr_realty_admin_token"
        );

        window.location.href =
          "/admin/login";

        throw new Error(
          "Authentication expired."
        );
      }

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "Unable to upload image."
        );
      }

      return data.image;
    } finally {
      setUploading(false);
    }
  }

  // ============================================================
  // SAVE
  // ============================================================

  async function saveTestimonial() {
    if (!name.trim()) {
      alert(
        "Please enter client name."
      );
      return;
    }

    if (!message.trim()) {
      alert(
        "Please enter testimonial."
      );
      return;
    }

    try {
      setSaving(true);

      const token = getToken();

      if (!token) {
        window.location.href =
          "/admin/login";
        return;
      }

      // --------------------------------------------------------
      // Upload new image if selected
      // --------------------------------------------------------

      let finalImage = image.trim()
        ? image.trim()
        : null;

      if (imageFile) {
        finalImage =
          await uploadImage(
            imageFile
          );
      }

      // --------------------------------------------------------
      // Payload
      // --------------------------------------------------------

      const payload = {
        name: name.trim(),

        location:
          location.trim() || null,

        message:
          message.trim(),

        image: finalImage,

        is_published:
          isPublished,
      };

      // --------------------------------------------------------
      // CREATE / UPDATE
      // --------------------------------------------------------

      const url = editingId
        ? `${API_URL}/api/testimonials/${editingId}`
        : `${API_URL}/api/testimonials`;

      const response =
        await fetch(url, {
          method: editingId
            ? "PUT"
            : "POST",

          headers: {
            Accept:
              "application/json",

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify(
            payload
          ),
        });

      if (
        response.status === 401
      ) {
        localStorage.removeItem(
          "hr_realty_admin_token"
        );

        window.location.href =
          "/admin/login";

        return;
      }

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "Unable to save testimonial."
        );
      }

      setShowForm(false);

      resetForm();

      await loadTestimonials();

    } catch (error) {
      console.error(
        "Save testimonial error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Unable to save testimonial."
      );

    } finally {
      setSaving(false);
    }
  }

  // ============================================================
  // DELETE
  // ============================================================

  async function deleteTestimonial(
    id: number
  ) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this testimonial?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const token = getToken();

      if (!token) {
        window.location.href =
          "/admin/login";
        return;
      }

      const response =
        await fetch(
          `${API_URL}/api/testimonials/${id}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      if (
        response.status === 401
      ) {
        localStorage.removeItem(
          "hr_realty_admin_token"
        );

        window.location.href =
          "/admin/login";

        return;
      }

      if (!response.ok) {
        throw new Error(
          "Unable to delete testimonial."
        );
      }

      setTestimonials(
        (previous) =>
          previous.filter(
            (item) =>
              item.id !== id
          )
      );

    } catch (error) {
      console.error(
        "Delete testimonial error:",
        error
      );

      alert(
        "Unable to delete testimonial."
      );
    }
  }

  // ============================================================
  // TOGGLE PUBLISH
  // ============================================================

  async function togglePublished(
    testimonial: Testimonial
  ) {
    try {
      const token = getToken();

      if (!token) {
        window.location.href =
          "/admin/login";
        return;
      }

      const response =
        await fetch(
          `${API_URL}/api/testimonials/${testimonial.id}`,
          {
            method: "PUT",

            headers: {
              Accept:
                "application/json",

              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              name:
                testimonial.name,

              location:
                testimonial.location,

              message:
                testimonial.message,

              image:
                testimonial.image,

              is_published:
                !testimonial.is_published,
            }),
          }
        );

      if (
        response.status === 401
      ) {
        localStorage.removeItem(
          "hr_realty_admin_token"
        );

        window.location.href =
          "/admin/login";

        return;
      }

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "Unable to update testimonial."
        );
      }

      setTestimonials(
        (previous) =>
          previous.map(
            (item) =>
              item.id === data.id
                ? data
                : item
          )
      );

    } catch (error) {
      console.error(
        "Toggle testimonial error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Unable to update testimonial."
      );
    }
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b2965d]">
              Admin
            </p>

            <h1 className="mt-2 text-3xl font-semibold text-[#043927] md:text-4xl">
              Testimonials
            </h1>

            <p className="mt-2 text-gray-500">
              Manage client testimonials displayed
              on your website.
            </p>

          </div>

          <div className="flex gap-3">

            <button
              type="button"
              onClick={
                loadTestimonials
              }
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 font-medium text-[#043927] transition hover:bg-gray-50 disabled:opacity-60"
            >
              <RefreshCw
                size={17}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh
            </button>

            <button
              type="button"
              onClick={
                openAddForm
              }
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#043927] px-5 py-3 font-medium text-white transition hover:bg-[#b2965d]"
            >
              <Plus size={18} />

              Add Testimonial
            </button>

          </div>
        </div>

        {/* LOADING */}

        {loading && (
          <div className="rounded-3xl bg-white p-16 text-center shadow-sm">

            <RefreshCw
              size={30}
              className="mx-auto animate-spin text-[#b2965d]"
            />

            <p className="mt-4 text-gray-500">
              Loading testimonials...
            </p>

          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          testimonials.length === 0 && (
            <div className="rounded-3xl bg-white p-16 text-center shadow-sm">

              <h2 className="text-xl font-semibold text-[#043927]">
                No testimonials yet
              </h2>

              <p className="mt-2 text-gray-500">
                Add your first client testimonial.
              </p>

              <button
                type="button"
                onClick={
                  openAddForm
                }
                className="mt-6 rounded-full bg-[#043927] px-6 py-3 font-medium text-white hover:bg-[#b2965d]"
              >
                Add Testimonial
              </button>

            </div>
          )}

        {/* LIST */}

        {!loading &&
          testimonials.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">

              {testimonials.map(
                (testimonial) => (
                  <div
                    key={
                      testimonial.id
                    }
                    className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-center gap-4">

                        {testimonial.image ? (
                          <img
                            src={
                              testimonial.image.startsWith(
                                "http"
                              )
                                ? testimonial.image
                                : `${API_URL}${testimonial.image}`
                            }
                            alt={
                              testimonial.name
                            }
                            className="h-16 w-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#043927] text-xl font-semibold text-[#b2965d]">
                            {testimonial.name
                              .charAt(
                                0
                              )
                              .toUpperCase()}
                          </div>
                        )}

                        <div>

                          <h2 className="font-semibold text-[#043927]">
                            {
                              testimonial.name
                            }
                          </h2>

                          {testimonial.location && (
                            <p className="text-sm text-gray-500">
                              {
                                testimonial.location
                              }
                            </p>
                          )}

                        </div>

                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          testimonial.is_published
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {testimonial.is_published
                          ? "Published"
                          : "Hidden"}
                      </span>

                    </div>

                    <div className="mt-6 rounded-2xl bg-gray-50 p-5">

                      <p className="whitespace-pre-line leading-7 text-gray-600">
                        "{testimonial.message}"
                      </p>

                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          openEditForm(
                            testimonial
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-[#043927] hover:bg-gray-50"
                      >
                        <Pencil
                          size={16}
                        />

                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          togglePublished(
                            testimonial
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-[#043927] hover:bg-gray-50"
                      >
                        {testimonial.is_published ? (
                          <>
                            <EyeOff
                              size={16}
                            />
                            Hide
                          </>
                        ) : (
                          <>
                            <Eye
                              size={16}
                            />
                            Publish
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteTestimonial(
                            testimonial.id
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
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

      {/* FORM MODAL */}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-gray-100 p-6">

              <div>

                <h2 className="text-xl font-semibold text-[#043927]">
                  {editingId
                    ? "Edit Testimonial"
                    : "Add Testimonial"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add the client's testimonial information.
                </p>

              </div>

              <button
                type="button"
                onClick={() => {
                  setShowForm(
                    false
                  );
                  resetForm();
                }}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}

            <div className="space-y-5 p-6">

              {/* NAME */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#043927]">
                  Client Name
                </label>

                <input
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  placeholder="Mr. Bharat Gaur"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#b2965d]"
                />

              </div>

              {/* LOCATION */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#043927]">
                  Location
                </label>

                <input
                  value={location}
                  onChange={(e) =>
                    setLocation(
                      e.target.value
                    )
                  }
                  placeholder="Haryana"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#b2965d]"
                />

              </div>

              {/* MESSAGE */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#043927]">
                  Testimonial
                </label>

                <textarea
                  value={message}
                  onChange={(e) =>
                    setMessage(
                      e.target.value
                    )
                  }
                  rows={7}
                  placeholder="Enter client testimonial..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#b2965d]"
                />

              </div>

              {/* IMAGE UPLOAD */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#043927]">
                  Client Image
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 transition hover:border-[#b2965d]">

                  {imagePreview ? (
                    <img
                      src={
                        imagePreview.startsWith(
                          "blob:"
                        )
                          ? imagePreview
                          : imagePreview
                      }
                      alt="Client preview"
                      className="mb-4 h-28 w-28 rounded-full object-cover"
                    />
                  ) : (
                    <ImageIcon
                      size={42}
                      className="mb-3 text-gray-300"
                    />
                  )}

                  <div className="flex items-center gap-2 rounded-full bg-[#043927] px-5 py-2.5 text-sm font-medium text-white">
                    <Upload
                      size={17}
                    />

                    Choose Image
                  </div>

                  <p className="mt-3 text-xs text-gray-400">
                    JPG, PNG or WEBP
                  </p>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={
                      handleImageChange
                    }
                    className="hidden"
                  />

                </label>

                {uploading && (
                  <p className="mt-2 text-sm text-[#b2965d]">
                    Uploading image...
                  </p>
                )}

              </div>

              {/* PUBLISH */}

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  checked={
                    isPublished
                  }
                  onChange={(e) =>
                    setIsPublished(
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 accent-[#043927]"
                />

                <span className="text-sm font-medium text-gray-700">
                  Publish on website
                </span>

              </label>

            </div>

            {/* ACTIONS */}

            <div className="flex justify-end gap-3 border-t border-gray-100 p-6">

              <button
                type="button"
                onClick={() => {
                  setShowForm(
                    false
                  );
                  resetForm();
                }}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  saveTestimonial
                }
                disabled={
                  saving ||
                  uploading
                }
                className="rounded-xl bg-[#043927] px-6 py-3 text-sm font-semibold text-white hover:bg-[#b2965d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Testimonial"
                    : "Add Testimonial"}
              </button>

            </div>

          </div>
        </div>
      )}
    </main>
  );
}