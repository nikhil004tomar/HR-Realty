"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";

import {
  Edit3,
  ImagePlus,
  Loader2,
  Mail,
  Phone,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import API_URL from "@/lib/api";
import { getToken } from "@/lib/auth";

/* ============================================================
   TYPES
============================================================ */

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  bio: string | null;
  profile_image: string | null;
  phone: string | null;
  email: string | null;
  linkedin_url: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

interface TeamForm {
  name: string;
  designation: string;
  bio: string;
  phone: string;
  email: string;
  linkedin_url: string;
  display_order: number;
  is_published: boolean;
}

const EMPTY_FORM: TeamForm = {
  name: "",
  designation: "",
  bio: "",
  phone: "",
  email: "",
  linkedin_url: "",
  display_order: 0,
  is_published: true,
};

/* ============================================================
   IMAGE URL
============================================================ */

function getTeamImageUrl(
  imageUrl?: string | null
): string | null {
  if (!imageUrl) {
    return null;
  }

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://")
  ) {
    return imageUrl;
  }

  return `${API_URL}${imageUrl}`;
}

/* ============================================================
   PAGE
============================================================ */

export default function TeamAdminPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const [showForm, setShowForm] = useState(false);

  const [editingMember, setEditingMember] =
    useState<TeamMember | null>(null);

  const [form, setForm] = useState<TeamForm>(
    EMPTY_FORM
  );

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const [message, setMessage] =
    useState<string>("");

  const [error, setError] =
    useState<string>("");

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  /* ==========================================================
     AUTH HEADERS
  ========================================================== */

  function getAuthHeaders(): HeadersInit {
    const token = getToken();

    if (!token) {
      throw new Error(
        "Your admin session has expired. Please login again."
      );
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  }

  /* ==========================================================
     LOAD TEAM
  ========================================================== */

  async function loadMembers() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/team/admin`,
        {
          method: "GET",
          headers: getAuthHeaders(),
          cache: "no-store",
        }
      );

      if (response.status === 401) {
        throw new Error(
          "Unauthorized. Please login again."
        );
      }

      if (!response.ok) {
        throw new Error(
          `Failed to load team members: ${response.status}`
        );
      }

      const data: TeamMember[] =
        await response.json();

      setMembers(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(
        "Load team members error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load team members."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMembers();
  }, []);

  /* ==========================================================
     OPEN ADD FORM
  ========================================================== */

  function openAddForm() {
    setEditingMember(null);
    setForm(EMPTY_FORM);
    setSelectedFile(null);
    setPreviewUrl(null);
    setMessage("");
    setError("");
    setShowForm(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  /* ==========================================================
     OPEN EDIT FORM
  ========================================================== */

  function openEditForm(
    member: TeamMember
  ) {
    setEditingMember(member);

    setForm({
      name: member.name,
      designation: member.designation,
      bio: member.bio || "",
      phone: member.phone || "",
      email: member.email || "",
      linkedin_url:
        member.linkedin_url || "",
      display_order:
        member.display_order,
      is_published:
        member.is_published,
    });

    setSelectedFile(null);
    setPreviewUrl(
      getTeamImageUrl(
        member.profile_image
      )
    );

    setMessage("");
    setError("");
    setShowForm(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  /* ==========================================================
     CLOSE FORM
  ========================================================== */

  function closeForm() {
    setShowForm(false);
    setEditingMember(null);
    setForm(EMPTY_FORM);
    setSelectedFile(null);
    setPreviewUrl(null);
    setMessage("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  /* ==========================================================
     FORM INPUT
  ========================================================== */

  function updateField(
    field: keyof TeamForm,
    value: string | number | boolean
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  /* ==========================================================
     FILE SELECT
  ========================================================== */

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
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
      "image/avif",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Only JPG, PNG, WEBP and AVIF images are allowed."
      );

      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(
        "Image must be smaller than 10MB."
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

  /* ==========================================================
     CREATE / UPDATE MEMBER
  ========================================================== */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const headers = getAuthHeaders();

      const payload = {
        name: form.name.trim(),
        designation:
          form.designation.trim(),
        bio:
          form.bio.trim() || null,
        phone:
          form.phone.trim() || null,
        email:
          form.email.trim() || null,
        linkedin_url:
          form.linkedin_url.trim() || null,
        display_order:
          Number(form.display_order) || 0,
        is_published:
          form.is_published,
      };

      if (!payload.name) {
        throw new Error(
          "Please enter the team member name."
        );
      }

      if (!payload.designation) {
        throw new Error(
          "Please enter the designation."
        );
      }

      let member: TeamMember;

      if (editingMember) {
        /* ============================
           UPDATE
        ============================ */

        const response = await fetch(
          `${API_URL}/api/team/${editingMember.id}`,
          {
            method: "PATCH",
            headers: {
              ...headers,
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.status === 401) {
          throw new Error(
            "Unauthorized. Please login again."
          );
        }

        if (!response.ok) {
          const data =
            await response.json().catch(
              () => null
            );

          throw new Error(
            data?.detail ||
              `Failed to update team member: ${response.status}`
          );
        }

        member =
          await response.json();
      } else {
        /* ============================
           CREATE
        ============================ */

        const response = await fetch(
          `${API_URL}/api/team`,
          {
            method: "POST",
            headers: {
              ...headers,
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.status === 401) {
          throw new Error(
            "Unauthorized. Please login again."
          );
        }

        if (!response.ok) {
          const data =
            await response.json().catch(
              () => null
            );

          throw new Error(
            data?.detail ||
              `Failed to create team member: ${response.status}`
          );
        }

        member =
          await response.json();
      }

      /* ============================
         UPLOAD IMAGE
      ============================ */

      if (selectedFile) {
        await uploadImage(
          member.id,
          selectedFile
        );
      }

      setMessage(
        editingMember
          ? "Team member updated successfully."
          : "Team member added successfully."
      );

      await loadMembers();

      setTimeout(() => {
        closeForm();
      }, 700);
    } catch (err) {
      console.error(
        "Save team member error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to save team member."
      );
    } finally {
      setSaving(false);
    }
  }

  /* ==========================================================
     UPLOAD IMAGE
  ========================================================== */

  async function uploadImage(
    memberId: number,
    file: File
  ) {
    try {
      setUploading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const response = await fetch(
        `${API_URL}/api/team/${memberId}/image`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: formData,
        }
      );

      if (response.status === 401) {
        throw new Error(
          "Unauthorized. Please login again."
        );
      }

      if (!response.ok) {
        const data =
          await response.json().catch(
            () => null
          );

        throw new Error(
          data?.detail ||
            `Failed to upload image: ${response.status}`
        );
      }

      return await response.json();
    } finally {
      setUploading(false);
    }
  }

  /* ==========================================================
     REMOVE IMAGE
  ========================================================== */

  async function removeImage(
    member: TeamMember
  ) {
    if (!member.profile_image) {
      return;
    }

    const confirmed =
      window.confirm(
        `Remove profile image for ${member.name}?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_URL}/api/team/${member.id}/image`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        }
      );

      if (response.status === 401) {
        throw new Error(
          "Unauthorized. Please login again."
        );
      }

      if (!response.ok) {
        const data =
          await response.json().catch(
            () => null
          );

        throw new Error(
          data?.detail ||
            `Failed to remove image: ${response.status}`
        );
      }

      setMessage(
        "Profile image removed successfully."
      );

      await loadMembers();

      if (
        editingMember?.id === member.id
      ) {
        setPreviewUrl(null);
        setSelectedFile(null);
      }
    } catch (err) {
      console.error(
        "Remove image error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to remove image."
      );
    }
  }

  /* ==========================================================
     DELETE MEMBER
  ========================================================== */

  async function deleteMember(
    member: TeamMember
  ) {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${member.name}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(member.id);
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_URL}/api/team/${member.id}`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        }
      );

      if (response.status === 401) {
        throw new Error(
          "Unauthorized. Please login again."
        );
      }

      if (!response.ok) {
        const data =
          await response.json().catch(
            () => null
          );

        throw new Error(
          data?.detail ||
            `Failed to delete team member: ${response.status}`
        );
      }

      setMembers((previous) =>
        previous.filter(
          (item) =>
            item.id !== member.id
        )
      );

      setMessage(
        "Team member deleted successfully."
      );
    } catch (err) {
      console.error(
        "Delete team member error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete team member."
      );
    } finally {
      setDeleting(null);
    }
  }

  /* ==========================================================
     TOGGLE PUBLISHED
  ========================================================== */

  async function togglePublished(
    member: TeamMember
  ) {
    try {
      setError("");

      const response = await fetch(
        `${API_URL}/api/team/${member.id}`,
        {
          method: "PATCH",
          headers: {
            ...getAuthHeaders(),
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            is_published:
              !member.is_published,
          }),
        }
      );

      if (response.status === 401) {
        throw new Error(
          "Unauthorized. Please login again."
        );
      }

      if (!response.ok) {
        const data =
          await response.json().catch(
            () => null
          );

        throw new Error(
          data?.detail ||
            `Failed to update status: ${response.status}`
        );
      }

      const updatedMember =
        await response.json();

      setMembers((previous) =>
        previous.map((item) =>
          item.id === member.id
            ? updatedMember
            : item
        )
      );
    } catch (err) {
      console.error(
        "Toggle published error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update status."
      );
    }
  }

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div className="min-h-screen bg-[#f7f7f5] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
              Administration
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#043927]">
              Our Team
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage the team members displayed on
              the About page.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#043927] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#032d20]"
          >
            <Plus size={18} />
            Add Team Member
          </button>

        </div>

        {/* ==================================================
            ALERTS
        ================================================== */}

        {message && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* ==================================================
            LOADING
        ================================================== */}

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-gray-200 bg-white">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Loader2
                size={20}
                className="animate-spin"
              />
              Loading team members...
            </div>
          </div>
        ) : members.length === 0 ? (

          /* ==================================================
             EMPTY
          ================================================== */

          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#043927]/5 text-[#043927]">
              <ImagePlus size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#043927]">
              No Team Members
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Add your first team member to display
              them on the About page.
            </p>

            <button
              type="button"
              onClick={openAddForm}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#043927] px-5 py-3 text-sm font-semibold text-white"
            >
              <Plus size={18} />
              Add Team Member
            </button>

          </div>

        ) : (

          /* ==================================================
             TEAM LIST
          ================================================== */

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            {members.map((member) => {
              const imageUrl =
                getTeamImageUrl(
                  member.profile_image
                );

              return (
                <div
                  key={member.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* IMAGE */}

                  <div className="relative aspect-[4/4.5] overflow-hidden bg-[#043927]/5">

                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={member.name}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                          <ImagePlus
                            size={36}
                            className="mx-auto text-[#043927]/30"
                          />

                          <p className="mt-2 text-xs text-gray-400">
                            No image
                          </p>
                        </div>
                      </div>
                    )}

                    {/* STATUS */}

                    <div className="absolute left-3 top-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
                          member.is_published
                            ? "bg-green-600 text-white"
                            : "bg-gray-700 text-white"
                        }`}
                      >
                        {member.is_published
                          ? "Published"
                          : "Hidden"}
                      </span>
                    </div>

                    {/* ORDER */}

                    <div className="absolute right-3 top-3">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#043927] backdrop-blur">
                        #{member.display_order}
                      </span>
                    </div>

                  </div>

                  {/* CONTENT */}

                  <div className="p-5">

                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C9A45C]">
                      {member.designation}
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-[#111111]">
                      {member.name}
                    </h2>

                    {member.bio && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                        {member.bio}
                      </p>
                    )}

                    <div className="mt-4 space-y-2">

                      {member.email && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Mail
                            size={14}
                            className="shrink-0 text-[#043927]"
                          />
                          <span className="truncate">
                            {member.email}
                          </span>
                        </div>
                      )}

                      {member.phone && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Phone
                            size={14}
                            className="shrink-0 text-[#043927]"
                          />
                          <span>
                            {member.phone}
                          </span>
                        </div>
                      )}

                    </div>

                    {/* ACTIONS */}

                    <div className="mt-5 flex gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          openEditForm(member)
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-semibold text-[#043927] transition hover:border-[#C9A45C] hover:bg-[#C9A45C]/10"
                      >
                        <Edit3 size={15} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteMember(member)
                        }
                        disabled={
                          deleting === member.id
                        }
                        className="flex items-center justify-center rounded-lg border border-red-200 px-3 py-2.5 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label={`Delete ${member.name}`}
                      >
                        {deleting ===
                        member.id ? (
                          <Loader2
                            size={16}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>

                    </div>

                    {/* PUBLISH TOGGLE */}

                    <button
                      type="button"
                      onClick={() =>
                        togglePublished(member)
                      }
                      className={`mt-3 w-full rounded-lg px-3 py-2 text-xs font-semibold transition ${
                        member.is_published
                          ? "bg-green-50 text-green-700 hover:bg-green-100"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {member.is_published
                        ? "Published on website"
                        : "Hidden from website"}
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

      {/* ======================================================
          ADD / EDIT MODAL
      ====================================================== */}

      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4 backdrop-blur-sm">

          <div className="flex min-h-full items-center justify-center py-8">

            <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">

              {/* MODAL HEADER */}

              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">
                    Team Management
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-[#043927]">
                    {editingMember
                      ? "Edit Team Member"
                      : "Add Team Member"}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={closeForm}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

              </div>

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="p-6"
              >

                <div className="grid gap-6 md:grid-cols-[220px_1fr]">

                  {/* IMAGE */}

                  <div>

                    <p className="mb-3 text-sm font-semibold text-[#043927]">
                      Profile Image
                    </p>

                    <div className="relative aspect-[4/4.5] overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50">

                      {previewUrl ? (
                        <Image
                          src={previewUrl}
                          alt="Profile preview"
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="220px"
                        />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                          <ImagePlus
                            size={34}
                            className="text-[#043927]/30"
                          />

                          <p className="mt-3 text-xs text-gray-400">
                            JPG, PNG, WEBP or AVIF
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            Maximum 10MB
                          </p>
                        </div>
                      )}

                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,.avif,image/jpeg,image/png,image/webp,image/avif"
                      onChange={
                        handleFileChange
                      }
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-semibold text-[#043927] transition hover:border-[#C9A45C] hover:bg-[#C9A45C]/10"
                    >
                      <Upload size={16} />
                      {selectedFile
                        ? "Change Image"
                        : "Choose Image"}
                    </button>

                    {editingMember &&
                      editingMember.profile_image && (
                        <button
                          type="button"
                          onClick={() =>
                            removeImage(
                              editingMember
                            )
                          }
                          className="mt-2 w-full rounded-lg px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          Remove Current Image
                        </button>
                      )}

                  </div>

                  {/* FIELDS */}

                  <div className="space-y-5">

                    {/* NAME */}

                    <div>
                      <label
                        htmlFor="team-name"
                        className="mb-2 block text-sm font-semibold text-[#043927]"
                      >
                        Name *
                      </label>

                      <input
                        id="team-name"
                        type="text"
                        value={form.name}
                        onChange={(event) =>
                          updateField(
                            "name",
                            event.target.value
                          )
                        }
                        placeholder="Rajesh Sharma"
                        required
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/20"
                      />
                    </div>

                    {/* DESIGNATION */}

                    <div>
                      <label
                        htmlFor="team-designation"
                        className="mb-2 block text-sm font-semibold text-[#043927]"
                      >
                        Designation *
                      </label>

                      <input
                        id="team-designation"
                        type="text"
                        value={form.designation}
                        onChange={(event) =>
                          updateField(
                            "designation",
                            event.target.value
                          )
                        }
                        placeholder="Founder & Managing Director"
                        required
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/20"
                      />
                    </div>

                    {/* BIO */}

                    <div>
                      <label
                        htmlFor="team-bio"
                        className="mb-2 block text-sm font-semibold text-[#043927]"
                      >
                        Description
                      </label>

                      <textarea
                        id="team-bio"
                        rows={4}
                        value={form.bio}
                        onChange={(event) =>
                          updateField(
                            "bio",
                            event.target.value
                          )
                        }
                        placeholder="Write a short description about this team member..."
                        className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/20"
                      />
                    </div>

                    {/* CONTACT */}

                    <div className="grid gap-5 sm:grid-cols-2">

                      <div>
                        <label
                          htmlFor="team-email"
                          className="mb-2 block text-sm font-semibold text-[#043927]"
                        >
                          Email
                        </label>

                        <input
                          id="team-email"
                          type="email"
                          value={form.email}
                          onChange={(event) =>
                            updateField(
                              "email",
                              event.target.value
                            )
                          }
                          placeholder="info@thehrrealty.com"
                          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/20"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="team-phone"
                          className="mb-2 block text-sm font-semibold text-[#043927]"
                        >
                          Phone
                        </label>

                        <input
                          id="team-phone"
                          type="tel"
                          value={form.phone}
                          onChange={(event) =>
                            updateField(
                              "phone",
                              event.target.value
                            )
                          }
                          placeholder="+91 99999 99999"
                          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/20"
                        />
                      </div>

                    </div>

                    {/* LINKEDIN */}

                    <div>
                      <label
                        htmlFor="team-linkedin"
                        className="mb-2 block text-sm font-semibold text-[#043927]"
                      >
                        LinkedIn URL
                      </label>

                      <input
                        id="team-linkedin"
                        type="url"
                        value={form.linkedin_url}
                        onChange={(event) =>
                          updateField(
                            "linkedin_url",
                            event.target.value
                          )
                        }
                        placeholder="https://www.linkedin.com/in/username"
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/20"
                      />
                    </div>

                    {/* ORDER + PUBLISHED */}

                    <div className="grid gap-5 sm:grid-cols-2">

                      <div>
                        <label
                          htmlFor="team-order"
                          className="mb-2 block text-sm font-semibold text-[#043927]"
                        >
                          Display Order
                        </label>

                        <input
                          id="team-order"
                          type="number"
                          min={0}
                          value={
                            form.display_order
                          }
                          onChange={(event) =>
                            updateField(
                              "display_order",
                              Number(
                                event.target.value
                              )
                            )
                          }
                          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/20"
                        />

                        <p className="mt-1 text-xs text-gray-400">
                          Lower numbers appear first.
                        </p>
                      </div>

                      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 px-4 py-3">

                        <input
                          type="checkbox"
                          checked={
                            form.is_published
                          }
                          onChange={(event) =>
                            updateField(
                              "is_published",
                              event.target.checked
                            )
                          }
                          className="h-4 w-4 accent-[#043927]"
                        />

                        <span>
                          <span className="block text-sm font-semibold text-[#043927]">
                            Publish Member
                          </span>

                          <span className="block text-xs text-gray-400">
                            Show this member on the website.
                          </span>
                        </span>

                      </label>

                    </div>

                  </div>

                </div>

                {/* FORM ERROR */}

                {error && (
                  <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* FORM SUCCESS */}

                {message && (
                  <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {message}
                  </div>
                )}

                {/* ACTIONS */}

                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">

                  <button
                    type="button"
                    onClick={closeForm}
                    disabled={saving}
                    className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      saving || uploading
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#043927] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#032d20] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ||
                    uploading ? (
                      <>
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />

                        {uploading
                          ? "Uploading..."
                          : "Saving..."}
                      </>
                    ) : (
                      <>
                        <Save size={17} />

                        {editingMember
                          ? "Update Member"
                          : "Add Member"}
                      </>
                    )}
                  </button>

                </div>

              </form>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}