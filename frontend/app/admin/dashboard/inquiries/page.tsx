"use client";

import { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Trash2,
  RefreshCw,
  User,
  Clock,
} from "lucide-react";

import { getToken, removeToken } from "@/lib/auth";

// ============================================================
// INQUIRY TYPE
// ============================================================

interface Inquiry {
  id: number;
  project_id: number | null;
  name: string;
  email: string | null;
  phone: string;
  city: string | null;
  message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

// ============================================================
// API URL
// ============================================================

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

// ============================================================
// PAGE
// ============================================================

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================================
  // LOAD INQUIRIES
  // ==========================================================

  const loadInquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      console.log(
        "INQUIRIES TOKEN:",
        token ? "FOUND" : "NOT FOUND"
      );

      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const response = await fetch(
        `${API_URL}/api/inquiries`,
        {
          method: "GET",

          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },

          cache: "no-store",
        }
      );

      console.log(
        "INQUIRIES API STATUS:",
        response.status
      );

      // ========================================================
      // UNAUTHORIZED
      // ========================================================

      if (response.status === 401) {
        removeToken();
        window.location.href = "/admin/login";
        return;
      }

      // ========================================================
      // OTHER ERRORS
      // ========================================================

      if (!response.ok) {
        const text = await response.text();

        console.error(
          "Inquiry API error:",
          response.status,
          text
        );

        throw new Error(
          `Failed to load inquiries (${response.status})`
        );
      }

      // ========================================================
      // RESPONSE
      // ========================================================

      const data = await response.json();

      console.log(
        "INQUIRIES DATA:",
        data
      );

      if (!Array.isArray(data)) {
        throw new Error(
          "Invalid inquiry response from backend"
        );
      }

      setInquiries(data);
    } catch (error) {
      console.error(
        "Load inquiries error:",
        error
      );

      setError(
        "Unable to load inquiries. Please check the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // LOAD WHEN PAGE OPENS
  // ==========================================================

  useEffect(() => {
    loadInquiries();
  }, []);

  // ==========================================================
  // UPDATE STATUS
  // ==========================================================

  const updateStatus = async (
    id: number,
    status: string
  ) => {
    try {
      const token = getToken();

      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const response = await fetch(
        `${API_URL}/api/inquiries/${id}`,
        {
          method: "PATCH",

          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

      // ========================================================
      // UNAUTHORIZED
      // ========================================================

      if (response.status === 401) {
        removeToken();
        window.location.href = "/admin/login";
        return;
      }

      // ========================================================
      // ERROR
      // ========================================================

      if (!response.ok) {
        const text = await response.text();

        console.error(
          "Update inquiry error:",
          response.status,
          text
        );

        throw new Error(
          "Failed to update inquiry status"
        );
      }

      // ========================================================
      // UPDATED DATA
      // ========================================================

      const updatedInquiry =
        await response.json();

      setInquiries((previous) =>
        previous.map((inquiry) =>
          inquiry.id === id
            ? updatedInquiry
            : inquiry
        )
      );
    } catch (error) {
      console.error(
        "Update status error:",
        error
      );

      alert(
        "Unable to update inquiry status."
      );
    }
  };

  // ==========================================================
  // DELETE INQUIRY
  // ==========================================================

  const deleteInquiry = async (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this enquiry?"
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

      const response = await fetch(
        `${API_URL}/api/inquiries/${id}`,
        {
          method: "DELETE",

          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ========================================================
      // UNAUTHORIZED
      // ========================================================

      if (response.status === 401) {
        removeToken();
        window.location.href =
          "/admin/login";
        return;
      }

      // ========================================================
      // ERROR
      // ========================================================

      if (!response.ok) {
        const text = await response.text();

        console.error(
          "Delete inquiry error:",
          response.status,
          text
        );

        throw new Error(
          "Failed to delete inquiry"
        );
      }

      // ========================================================
      // REMOVE FROM UI
      // ========================================================

      setInquiries((previous) =>
        previous.filter(
          (inquiry) =>
            inquiry.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete inquiry error:",
        error
      );

      alert(
        "Unable to delete inquiry."
      );
    }
  };

  // ==========================================================
  // STATUS COLOR
  // ==========================================================

  const getStatusClass = (
    status: string
  ) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700";

      case "contacted":
        return "bg-yellow-100 text-yellow-700";

      case "qualified":
        return "bg-green-100 text-green-700";

      case "closed":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b2965d]">
              Admin
            </p>

            <h1 className="mt-2 text-3xl font-semibold text-[#043927] md:text-4xl">
              Inquiries
            </h1>

            <p className="mt-2 text-gray-500">
              Manage leads submitted from your real estate projects.
            </p>
          </div>

          <button
            type="button"
            onClick={loadInquiries}
            disabled={loading}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-full
              bg-[#043927]
              px-5
              py-3
              font-medium
              text-white
              transition
              hover:bg-[#b2965d]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
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
        </div>

        {/* ================================================== */}
        {/* ERROR */}
        {/* ================================================== */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
            <p className="font-semibold">
              Error
            </p>

            <p className="mt-1 text-sm">
              {error}
            </p>
          </div>
        )}

        {/* ================================================== */}
        {/* LOADING */}
        {/* ================================================== */}

        {loading && (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

            <RefreshCw
              size={30}
              className="mx-auto animate-spin text-[#b2965d]"
            />

            <p className="mt-4 text-gray-500">
              Loading inquiries...
            </p>

          </div>
        )}

        {/* ================================================== */}
        {/* EMPTY */}
        {/* ================================================== */}

        {!loading &&
          inquiries.length === 0 &&
          !error && (
            <div className="rounded-3xl bg-white p-16 text-center shadow-sm">

              <User
                size={42}
                className="mx-auto text-gray-300"
              />

              <h2 className="mt-5 text-xl font-semibold text-[#043927]">
                No inquiries yet
              </h2>

              <p className="mt-2 text-gray-500">
                New project enquiries will appear here.
              </p>

            </div>
          )}

        {/* ================================================== */}
        {/* INQUIRIES */}
        {/* ================================================== */}

        {!loading &&
          inquiries.length > 0 && (
            <div className="space-y-5">

              {inquiries.map(
                (inquiry) => (
                  <div
                    key={inquiry.id}
                    className="
                      rounded-3xl
                      border
                      border-gray-100
                      bg-white
                      p-6
                      shadow-sm
                      transition
                      hover:shadow-md
                    "
                  >

                    {/* ======================================== */}
                    {/* TOP */}
                    {/* ======================================== */}

                    <div className="flex flex-col justify-between gap-4 md:flex-row">

                      <div>
                        <div className="flex flex-wrap items-center gap-3">

                          <h2 className="text-xl font-semibold text-[#043927]">
                            {inquiry.name}
                          </h2>

                          <span
                            className={`
                              rounded-full
                              px-3
                              py-1
                              text-xs
                              font-semibold
                              capitalize
                              ${getStatusClass(
                                inquiry.status
                              )}
                            `}
                          >
                            {inquiry.status}
                          </span>

                        </div>

                        <p className="mt-2 text-sm text-gray-400">
                          Inquiry #{inquiry.id}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-400">

                        <Clock size={16} />

                        {new Date(
                          inquiry.created_at
                        ).toLocaleString()}

                      </div>

                    </div>

                    {/* ======================================== */}
                    {/* CONTACT INFORMATION */}
                    {/* ======================================== */}

                    <div className="mt-6 grid gap-3 md:grid-cols-3">

                      {/* ====================================== */}
                      {/* PHONE */}
                      {/* ====================================== */}

                      <a
                        href={`tel:${inquiry.phone}`}
                        className="
                          flex
                          items-center
                          gap-3
                          rounded-xl
                          bg-gray-50
                          p-4
                          transition
                          hover:bg-[#043927]/5
                        "
                      >

                        <Phone
                          size={18}
                          className="text-[#b2965d]"
                        />

                        <div>
                          <p className="text-xs text-gray-400">
                            Phone
                          </p>

                          <p className="font-medium text-[#043927]">
                            {inquiry.phone}
                          </p>
                        </div>

                      </a>

                      {/* ====================================== */}
                      {/* EMAIL */}
                      {/* ====================================== */}

                      <a
                        href={
                          inquiry.email
                            ? `mailto:${inquiry.email}`
                            : undefined
                        }
                        className="
                          flex
                          items-center
                          gap-3
                          rounded-xl
                          bg-gray-50
                          p-4
                          transition
                          hover:bg-[#043927]/5
                        "
                      >

                        <Mail
                          size={18}
                          className="text-[#b2965d]"
                        />

                        <div>
                          <p className="text-xs text-gray-400">
                            Email
                          </p>

                          <p className="break-all font-medium text-[#043927]">
                            {inquiry.email ||
                              "Not provided"}
                          </p>
                        </div>

                      </a>

                      {/* ====================================== */}
                      {/* CITY */}
                      {/* ====================================== */}

                      <div className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        bg-gray-50
                        p-4
                      ">

                        <MapPin
                          size={18}
                          className="text-[#b2965d]"
                        />

                        <div>
                          <p className="text-xs text-gray-400">
                            City
                          </p>

                          <p className="font-medium text-[#043927]">
                            {inquiry.city?.trim() ||
                              "Not provided"}
                          </p>
                        </div>

                      </div>

                    </div>

                    {/* ======================================== */}
                    {/* PROJECT */}
                    {/* ======================================== */}

                    <div className="
                      mt-5
                      rounded-2xl
                      border
                      border-gray-100
                      p-5
                    ">

                      <p className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wide
                        text-gray-400
                      ">
                        Project
                      </p>

                      <p className="
                        mt-2
                        font-medium
                        text-[#043927]
                      ">
                        {inquiry.project_id
                          ? `Project #${inquiry.project_id}`
                          : "General Inquiry"}
                      </p>

                    </div>

                    {/* ======================================== */}
                    {/* MESSAGE */}
                    {/* ======================================== */}

                    {inquiry.message && (
                      <div className="
                        mt-5
                        rounded-2xl
                        border
                        border-gray-100
                        p-5
                      ">

                        <p className="
                          text-xs
                          font-semibold
                          uppercase
                          tracking-wide
                          text-gray-400
                        ">
                          Message
                        </p>

                        <p className="
                          mt-2
                          whitespace-pre-line
                          leading-7
                          text-gray-600
                        ">
                          {inquiry.message}
                        </p>

                      </div>
                    )}

                    {/* ======================================== */}
                    {/* ACTIONS */}
                    {/* ======================================== */}

                    <div className="
                      mt-6
                      flex
                      flex-col
                      gap-3
                      border-t
                      border-gray-100
                      pt-5
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    ">

                      {/* STATUS */}

                      <select
                        value={inquiry.status}
                        onChange={(event) =>
                          updateStatus(
                            inquiry.id,
                            event.target.value
                          )
                        }
                        className="
                          rounded-xl
                          border
                          border-gray-200
                          bg-white
                          px-4
                          py-3
                          text-sm
                          font-medium
                          text-[#043927]
                          outline-none
                          focus:border-[#b2965d]
                        "
                      >

                        <option value="new">
                          New
                        </option>

                        <option value="contacted">
                          Contacted
                        </option>

                        <option value="qualified">
                          Qualified
                        </option>

                        <option value="closed">
                          Closed
                        </option>

                      </select>

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() =>
                          deleteInquiry(
                            inquiry.id
                          )
                        }
                        className="
                          inline-flex
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          border-red-200
                          px-4
                          py-3
                          text-sm
                          font-medium
                          text-red-600
                          transition
                          hover:bg-red-50
                        "
                      >

                        <Trash2 size={17} />

                        Delete

                      </button>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

      </div>
    </main>
  );
}