"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  Eye,
  FileText,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  User,
  X,
} from "lucide-react";

import { getToken } from "@/lib/auth";
import { apiRequest } from "@/lib/api-client";
import API_URL from "@/lib/api";


// ============================================================
// TYPES
// ============================================================

interface CareerApplication {
  id: number;
  position: string;
  full_name: string;
  email: string;
  phone: string;
  whatsapp: string | null;
  city: string | null;
  state: string | null;
  experience: string | null;
  current_company: string | null;
  designation: string | null;
  qualification: string | null;
  expected_salary: string | null;
  notice_period: string | null;
  linkedin: string | null;
  portfolio: string | null;
  source: string | null;
  why_join: string | null;
  cover_letter: string | null;
  resume_url: string;
  resume_original_name: string | null;
  status: string;
  admin_notes: string | null;
  consent: boolean;
  created_at: string;
  updated_at: string;
}

interface ApiErrorDetail {
  msg?: string;
  loc?: unknown[];
}


// ============================================================
// CONSTANTS
// ============================================================

const STATUS_OPTIONS = [
  "New",
  "Reviewing",
  "Shortlisted",
  "Interview",
  "Selected",
  "Rejected",
  "Closed",
];


// ============================================================
// PAGE
// ============================================================

export default function CareerApplicationsPage() {
  const router = useRouter();

  const [applications, setApplications] =
    useState<CareerApplication[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedApplication, setSelectedApplication] =
    useState<CareerApplication | null>(null);

  const [isUpdating, setIsUpdating] =
    useState(false);

  const [isDeleting, setIsDeleting] =
    useState(false);

  const [selectedStatus, setSelectedStatus] =
    useState("");

  const [adminNotes, setAdminNotes] =
    useState("");

  const [error, setError] =
    useState("");

  // ==========================================================
  // AUTH CHECK
  // ==========================================================

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace("/admin/login");
    }
  }, [router]);

  // ==========================================================
  // LOAD APPLICATIONS
  // ==========================================================

  const loadApplications = useCallback(
    async (showRefresh = false) => {
      try {
        setError("");

        if (showRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const token = getToken();

        if (!token) {
          router.replace("/admin/login");
          return;
        }

        const data =
          await apiRequest<CareerApplication[]>(
            "/api/career-applications/admin",
            {
              authenticated: true,
            }
          );

        setApplications(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (err) {
        console.error(
          "Career applications loading error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load career applications."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [router]
  );

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  // ==========================================================
  // FILTER APPLICATIONS
  // ==========================================================

  const filteredApplications =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return applications.filter(
        (application) => {
          const matchesStatus =
            statusFilter === "All" ||
            application.status ===
              statusFilter;

          if (!matchesStatus) {
            return false;
          }

          if (!query) {
            return true;
          }

          return [
            application.full_name,
            application.email,
            application.phone,
            application.position,
            application.city,
            application.state,
            application.experience,
            application.current_company,
            application.designation,
            application.qualification,
            application.status,
          ]
            .filter(Boolean)
            .some((value) =>
              String(value)
                .toLowerCase()
                .includes(query)
            );
        }
      );
    }, [
      applications,
      search,
      statusFilter,
    ]);

  // ==========================================================
  // OPEN APPLICATION
  // ==========================================================

  function openApplication(
    application: CareerApplication
  ) {
    setSelectedApplication(
      application
    );

    setSelectedStatus(
      application.status
    );

    setAdminNotes(
      application.admin_notes || ""
    );

    setError("");
  }

  // ==========================================================
  // CLOSE APPLICATION
  // ==========================================================

  function closeApplication() {
    if (isUpdating || isDeleting) {
      return;
    }

    setSelectedApplication(null);
    setSelectedStatus("");
    setAdminNotes("");
  }

  // ==========================================================
  // UPDATE APPLICATION
  // ==========================================================

  async function handleUpdate() {
    if (!selectedApplication) {
      return;
    }

    try {
      setIsUpdating(true);
      setError("");

      const updated =
        await apiRequest<CareerApplication>(
          `/api/career-applications/${selectedApplication.id}`,
          {
            method: "PATCH",
            authenticated: true,
            body: {
              status: selectedStatus,
              admin_notes:
                adminNotes.trim() || null,
            },
          }
        );

      setApplications((prev) =>
        prev.map((application) =>
          application.id ===
          updated.id
            ? updated
            : application
        )
      );

      setSelectedApplication(
        updated
      );

      setSelectedStatus(
        updated.status
      );

      setAdminNotes(
        updated.admin_notes || ""
      );
    } catch (err) {
      console.error(
        "Career application update error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update application."
      );
    } finally {
      setIsUpdating(false);
    }
  }

  // ==========================================================
  // DELETE APPLICATION
  // ==========================================================

  async function handleDelete() {
    if (!selectedApplication) {
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete the application from ${selectedApplication.full_name}? This action cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);
      setError("");

      await apiRequest<void>(
        `/api/career-applications/${selectedApplication.id}`,
        {
          method: "DELETE",
          authenticated: true,
        }
      );

      setApplications((prev) =>
        prev.filter(
          (application) =>
            application.id !==
            selectedApplication.id
        )
      );

      closeApplication();
    } catch (err) {
      console.error(
        "Career application delete error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete application."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  // ==========================================================
  // DOWNLOAD RESUME
  // ==========================================================

  async function handleDownloadResume(
    application: CareerApplication
  ) {
    try {
      setError("");

      const token = getToken();

      if (!token) {
        router.replace("/admin/login");
        return;
      }

      const response =
        await fetch(
          `${API_URL}/api/career-applications/admin/${application.id}/resume`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      if (!response.ok) {
        let message =
          "Unable to download resume.";

        try {
          const data =
            await response.json();

          if (
            typeof data?.detail ===
            "string"
          ) {
            message =
              data.detail;
          }
        } catch {
          // Ignore invalid response
        }

        throw new Error(
          message
        );
      }

      const blob =
        await response.blob();

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        application.resume_original_name ||
        `resume-${application.id}`;

      document.body.appendChild(
        link
      );

      link.click();

      link.remove();

      window.URL.revokeObjectURL(
        url
      );
    } catch (err) {
      console.error(
        "Resume download error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to download resume."
      );
    }
  }

  // ==========================================================
  // FORMAT DATE
  // ==========================================================

  function formatDate(
    date: string
  ) {
    try {
      return new Intl.DateTimeFormat(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      ).format(
        new Date(date)
      );
    } catch {
      return date;
    }
  }

  // ==========================================================
  // STATUS COLOR
  // ==========================================================

  function getStatusClasses(
    status: string
  ) {
    switch (status) {
      case "New":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Reviewing":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";

      case "Shortlisted":
        return "bg-purple-50 text-purple-700 border-purple-200";

      case "Interview":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";

      case "Selected":
        return "bg-green-50 text-green-700 border-green-200";

      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";

      case "Closed":
        return "bg-gray-100 text-gray-700 border-gray-200";

      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
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
            size={36}
            className="mx-auto animate-spin text-[#043927]"
          />

          <p className="mt-4 text-sm text-gray-600">
            Loading career applications...
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

      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-6">

          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                router.push("/admin")
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-gray-200
                bg-white
                text-gray-600
                transition
                hover:bg-gray-50
              "
              title="Back to dashboard"
            >
              <ArrowLeft
                size={19}
              />
            </button>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#043927] text-white">
                <BriefcaseBusiness
                  size={22}
                />
              </div>

              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Career Applications
                </h1>

                <p className="text-xs text-gray-500">
                  Business Development applicants
                </p>
              </div>

            </div>

          </div>

          <button
            onClick={() =>
              loadApplications(true)
            }
            disabled={refreshing}
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-gray-300
              bg-white
              px-4
              py-2
              text-sm
              font-medium
              text-gray-700
              transition
              hover:bg-gray-50
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <RefreshCw
              size={16}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>

        </div>

      </header>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6">

        {/* ====================================================
            TITLE
        ==================================================== */}

        <div className="mb-8">

          <p className="text-sm font-medium text-[#b2965d]">
            Recruitment
          </p>

          <div className="mt-1 flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>

              <h2 className="text-3xl font-bold text-gray-900">
                Career Applications
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Review applicants and manage their recruitment status.
              </p>

            </div>

            <div className="rounded-xl bg-white px-5 py-3 shadow-sm">

              <p className="text-xs text-gray-500">
                Total Applications
              </p>

              <p className="mt-1 text-2xl font-bold text-[#043927]">
                {applications.length}
              </p>

            </div>

          </div>

        </div>

        {/* ====================================================
            ERROR
        ==================================================== */}

        {error && (
          <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4">

            <div>
              <p className="text-sm font-semibold text-red-800">
                Something went wrong
              </p>

              <p className="mt-1 text-sm text-red-700">
                {error}
              </p>
            </div>

            <button
              onClick={() =>
                setError("")
              }
              className="text-red-500 hover:text-red-700"
            >
              <X size={18} />
            </button>

          </div>
        )}

        {/* ====================================================
            FILTERS
        ==================================================== */}

        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-4 md:flex-row">

            {/* SEARCH */}

            <div className="relative flex-1">

              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search by name, email, phone, city, company..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-[#043927]
                  focus:ring-2
                  focus:ring-[#043927]/10
                "
              />

            </div>

            {/* STATUS */}

            <div className="relative md:w-56">

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className="
                  w-full
                  appearance-none
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  pr-10
                  text-sm
                  text-gray-900
                  outline-none
                  transition
                  focus:border-[#043927]
                  focus:ring-2
                  focus:ring-[#043927]/10
                "
              >
                <option value="All">
                  All Statuses
                </option>

                {STATUS_OPTIONS.map(
                  (status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  )
                )}

              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

            </div>

          </div>

        </div>

        {/* ====================================================
            APPLICATIONS
        ==================================================== */}

        {filteredApplications.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
              <BriefcaseBusiness
                size={28}
              />
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-900">
              No applications found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {applications.length === 0
                ? "No career applications have been submitted yet."
                : "No applications match your current search or status filter."}
            </p>

          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* DESKTOP TABLE */}

            <div className="hidden overflow-x-auto lg:block">

              <table className="w-full min-w-[1050px]">

                <thead className="border-b bg-gray-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Applicant
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Position
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Contact
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Experience
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Applied
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-100">

                  {filteredApplications.map(
                    (application) => (
                      <tr
                        key={application.id}
                        className="transition hover:bg-gray-50"
                      >

                        {/* APPLICANT */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#043927]/10 text-[#043927]">
                              <User
                                size={18}
                              />
                            </div>

                            <div className="min-w-0">

                              <p className="truncate text-sm font-semibold text-gray-900">
                                {application.full_name}
                              </p>

                              <p className="mt-0.5 truncate text-xs text-gray-500">
                                {application.qualification ||
                                  "Qualification not provided"}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* POSITION */}

                        <td className="px-6 py-5">

                          <p className="text-sm font-medium text-gray-900">
                            {application.position}
                          </p>

                          {application.designation && (
                            <p className="mt-1 text-xs text-gray-500">
                              {application.designation}
                            </p>
                          )}

                        </td>

                        {/* CONTACT */}

                        <td className="px-6 py-5">

                          <p className="text-sm text-gray-700">
                            {application.email}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {application.phone}
                          </p>

                        </td>

                        {/* EXPERIENCE */}

                        <td className="px-6 py-5">

                          <p className="text-sm text-gray-700">
                            {application.experience ||
                              "—"}
                          </p>

                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-5">

                          <span
                            className={`
                              inline-flex
                              items-center
                              rounded-full
                              border
                              px-3
                              py-1
                              text-xs
                              font-semibold
                              ${getStatusClasses(
                                application.status
                              )}
                            `}
                          >
                            {application.status}
                          </span>

                        </td>

                        {/* APPLIED */}

                        <td className="px-6 py-5">

                          <p className="text-xs text-gray-500">
                            {formatDate(
                              application.created_at
                            )}
                          </p>

                        </td>

                        {/* ACTION */}

                        <td className="px-6 py-5 text-right">

                          <button
                            onClick={() =>
                              openApplication(
                                application
                              )
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              rounded-lg
                              bg-[#043927]
                              px-4
                              py-2
                              text-xs
                              font-semibold
                              text-white
                              transition
                              hover:bg-[#06543a]
                            "
                          >
                            <Eye
                              size={15}
                            />
                            View
                          </button>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

            {/* MOBILE CARDS */}

            <div className="divide-y divide-gray-100 lg:hidden">

              {filteredApplications.map(
                (application) => (
                  <div
                    key={application.id}
                    className="p-5"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#043927]/10 text-[#043927]">
                          <User
                            size={19}
                          />
                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-bold text-gray-900">
                            {application.full_name}
                          </p>

                          <p className="truncate text-xs text-gray-500">
                            {application.position}
                          </p>

                        </div>

                      </div>

                      <span
                        className={`
                          shrink-0
                          rounded-full
                          border
                          px-3
                          py-1
                          text-[11px]
                          font-semibold
                          ${getStatusClasses(
                            application.status
                          )}
                        `}
                      >
                        {application.status}
                      </span>

                    </div>

                    <div className="mt-5 grid gap-3 text-sm">

                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail
                          size={15}
                          className="text-[#043927]"
                        />
                        <span className="truncate">
                          {application.email}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone
                          size={15}
                          className="text-[#043927]"
                        />
                        <span>
                          {application.phone}
                        </span>
                      </div>

                      {application.city && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin
                            size={15}
                            className="text-[#043927]"
                          />
                          <span>
                            {application.city}
                            {application.state
                              ? `, ${application.state}`
                              : ""}
                          </span>
                        </div>
                      )}

                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3">

                      <span className="text-xs text-gray-400">
                        {formatDate(
                          application.created_at
                        )}
                      </span>

                      <button
                        onClick={() =>
                          openApplication(
                            application
                          )
                        }
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-lg
                          bg-[#043927]
                          px-4
                          py-2
                          text-xs
                          font-semibold
                          text-white
                        "
                      >
                        <Eye
                          size={15}
                        />
                        View Application
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>
        )}

      </section>

      {/* ======================================================
          APPLICATION DETAIL MODAL
      ====================================================== */}

      {selectedApplication && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            p-4
            backdrop-blur-sm
          "
          onMouseDown={(e) => {
            if (
              e.target ===
              e.currentTarget
            ) {
              closeApplication();
            }
          }}
        >

          <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* ==================================================
                MODAL HEADER
            ================================================== */}

            <div className="flex items-center justify-between border-b px-6 py-5">

              <div className="flex min-w-0 items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#043927] text-white">
                  <User
                    size={21}
                  />
                </div>

                <div className="min-w-0">

                  <h2 className="truncate text-lg font-bold text-gray-900 sm:text-xl">
                    {selectedApplication.full_name}
                  </h2>

                  <p className="truncate text-xs text-gray-500">
                    Application #{selectedApplication.id}
                  </p>

                </div>

              </div>

              <button
                onClick={closeApplication}
                disabled={
                  isUpdating ||
                  isDeleting
                }
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-gray-500
                  transition
                  hover:bg-gray-100
                  hover:text-gray-900
                "
              >
                <X
                  size={20}
                />
              </button>

            </div>

            {/* ==================================================
                MODAL BODY
            ================================================== */}

            <div className="overflow-y-auto">

              <div className="grid gap-0 lg:grid-cols-[1.35fr_0.65fr]">

                {/* =================================================
                    APPLICANT DETAILS
                ================================================= */}

                <div className="p-6 sm:p-8">

                  {/* POSITION */}

                  <div className="mb-7 rounded-xl border border-gray-200 bg-gray-50 p-5">

                    <div className="flex items-start gap-3">

                      <BriefcaseBusiness
                        size={19}
                        className="mt-0.5 shrink-0 text-[#043927]"
                      />

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Applied Position
                        </p>

                        <p className="mt-1 text-base font-bold text-gray-900">
                          {selectedApplication.position}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* PERSONAL */}

                  <DetailSection
                    title="Personal Details"
                  >

                    <DetailItem
                      icon={
                        <User size={16} />
                      }
                      label="Full Name"
                      value={
                        selectedApplication.full_name
                      }
                    />

                    <DetailItem
                      icon={
                        <Mail size={16} />
                      }
                      label="Email"
                      value={
                        selectedApplication.email
                      }
                    />

                    <DetailItem
                      icon={
                        <Phone size={16} />
                      }
                      label="Phone"
                      value={
                        selectedApplication.phone
                      }
                    />

                    <DetailItem
                      icon={
                        <Phone size={16} />
                      }
                      label="WhatsApp"
                      value={
                        selectedApplication.whatsapp
                      }
                    />

                    <DetailItem
                      icon={
                        <MapPin size={16} />
                      }
                      label="Location"
                      value={[
                        selectedApplication.city,
                        selectedApplication.state,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    />

                  </DetailSection>

                  {/* PROFESSIONAL */}

                  <DetailSection
                    title="Professional Details"
                  >

                    <DetailItem
                      label="Experience"
                      value={
                        selectedApplication.experience
                      }
                    />

                    <DetailItem
                      label="Current / Previous Company"
                      value={
                        selectedApplication.current_company
                      }
                    />

                    <DetailItem
                      label="Designation"
                      value={
                        selectedApplication.designation
                      }
                    />

                    <DetailItem
                      label="Qualification"
                      value={
                        selectedApplication.qualification
                      }
                    />

                    <DetailItem
                      label="Expected Salary"
                      value={
                        selectedApplication.expected_salary
                      }
                    />

                    <DetailItem
                      label="Notice Period"
                      value={
                        selectedApplication.notice_period
                      }
                    />

                  </DetailSection>

                  {/* PROFILES */}

                  <DetailSection
                    title="Professional Profiles"
                  >

                    <DetailItem
                      label="LinkedIn"
                      value={
                        selectedApplication.linkedin
                      }
                    />

                    <DetailItem
                      label="Portfolio / Website"
                      value={
                        selectedApplication.portfolio
                      }
                    />

                    <DetailItem
                      label="Source"
                      value={
                        selectedApplication.source
                      }
                    />

                  </DetailSection>

                  {/* ABOUT */}

                  <DetailSection
                    title="About Applicant"
                  >

                    <LongDetail
                      label="Why do you want to join us?"
                      value={
                        selectedApplication.why_join
                      }
                    />

                    <LongDetail
                      label="Cover Letter"
                      value={
                        selectedApplication.cover_letter
                      }
                    />

                  </DetailSection>

                  {/* APPLICATION INFO */}

                  <DetailSection
                    title="Application Information"
                  >

                    <DetailItem
                      label="Application ID"
                      value={`#${selectedApplication.id}`}
                    />

                    <DetailItem
                      icon={
                        <Clock3 size={16} />
                      }
                      label="Applied"
                      value={formatDate(
                        selectedApplication.created_at
                      )}
                    />

                    <DetailItem
                      label="Last Updated"
                      value={formatDate(
                        selectedApplication.updated_at
                      )}
                    />

                    <DetailItem
                      label="Consent"
                      value={
                        selectedApplication.consent
                          ? "Confirmed"
                          : "Not confirmed"
                      }
                    />

                  </DetailSection>

                </div>

                {/* =================================================
                    ADMIN PANEL
                ================================================= */}

                <aside className="border-t bg-gray-50 p-6 lg:border-l lg:border-t-0 sm:p-8">

                  <h3 className="text-lg font-bold text-gray-900">
                    Manage Application
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Update the recruitment status and add internal notes.
                  </p>

                  {/* STATUS */}

                  <div className="mt-7">

                    <label
                      htmlFor="application-status"
                      className="mb-2 block text-sm font-semibold text-gray-900"
                    >
                      Application Status
                    </label>

                    <div className="relative">

                      <select
                        id="application-status"
                        value={selectedStatus}
                        onChange={(e) =>
                          setSelectedStatus(
                            e.target.value
                          )
                        }
                        disabled={
                          isUpdating ||
                          isDeleting
                        }
                        className="
                          w-full
                          appearance-none
                          rounded-xl
                          border
                          border-gray-300
                          bg-white
                          px-4
                          py-3
                          pr-10
                          text-sm
                          text-gray-900
                          outline-none
                          transition
                          focus:border-[#043927]
                          focus:ring-2
                          focus:ring-[#043927]/10
                        "
                      >

                        {STATUS_OPTIONS.map(
                          (status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          )
                        )}

                      </select>

                      <ChevronDown
                        size={17}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                    </div>

                  </div>

                  {/* STATUS PREVIEW */}

                  <div className="mt-4">

                    <span
                      className={`
                        inline-flex
                        items-center
                        rounded-full
                        border
                        px-3
                        py-1.5
                        text-xs
                        font-semibold
                        ${getStatusClasses(
                          selectedStatus
                        )}
                      `}
                    >
                      {selectedStatus}
                    </span>

                  </div>

                  {/* NOTES */}

                  <div className="mt-7">

                    <label
                      htmlFor="admin-notes"
                      className="mb-2 block text-sm font-semibold text-gray-900"
                    >
                      Admin Notes
                    </label>

                    <textarea
                      id="admin-notes"
                      value={adminNotes}
                      onChange={(e) =>
                        setAdminNotes(
                          e.target.value
                        )
                      }
                      disabled={
                        isUpdating ||
                        isDeleting
                      }
                      rows={7}
                      placeholder="Add internal notes about this applicant..."
                      className="
                        w-full
                        resize-y
                        rounded-xl
                        border
                        border-gray-300
                        bg-white
                        px-4
                        py-3
                        text-sm
                        leading-6
                        text-gray-900
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-[#043927]
                        focus:ring-2
                        focus:ring-[#043927]/10
                      "
                    />

                  </div>

                  {/* RESUME */}

                  <div className="mt-7 rounded-xl border border-gray-200 bg-white p-4">

                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#043927]/10 text-[#043927]">
                        <FileText
                          size={19}
                        />
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="text-sm font-semibold text-gray-900">
                          Resume / CV
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {selectedApplication.resume_original_name ||
                            "Resume"}
                        </p>

                      </div>

                    </div>

                    <button
                      onClick={() =>
                        handleDownloadResume(
                          selectedApplication
                        )
                      }
                      disabled={
                        isUpdating ||
                        isDeleting
                      }
                      className="
                        mt-4
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        text-gray-700
                        transition
                        hover:bg-gray-50
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      <Download
                        size={16}
                      />

                      Download Resume
                    </button>

                  </div>

                  {/* UPDATE */}

                  <button
                    onClick={
                      handleUpdate
                    }
                    disabled={
                      isUpdating ||
                      isDeleting
                    }
                    className="
                      mt-7
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#043927]
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      transition
                      hover:bg-[#06543a]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >

                    {isUpdating ? (
                      <>
                        <RefreshCw
                          size={16}
                          className="animate-spin"
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircle2
                          size={16}
                        />
                        Save Changes
                      </>
                    )}

                  </button>

                  {/* DELETE */}

                  <button
                    onClick={
                      handleDelete
                    }
                    disabled={
                      isUpdating ||
                      isDeleting
                    }
                    className="
                      mt-3
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-red-200
                      bg-red-50
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-red-700
                      transition
                      hover:bg-red-100
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >

                    {isDeleting ? (
                      <>
                        <RefreshCw
                          size={16}
                          className="animate-spin"
                        />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2
                          size={16}
                        />
                        Delete Application
                      </>
                    )}

                  </button>

                </aside>

              </div>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}


// ============================================================
// DETAIL SECTION
// ============================================================

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">

      <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-[#043927]">
        {title}
      </h3>

      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
        {children}
      </div>

    </section>
  );
}


// ============================================================
// DETAIL ITEM
// ============================================================

function DetailItem({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string | null;
  icon?: React.ReactNode;
}) {
  return (
    <div>

      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <div className="mt-1 flex items-start gap-2">

        {icon && (
          <span className="mt-0.5 shrink-0 text-[#043927]">
            {icon}
          </span>
        )}

        <p className="break-words text-sm font-medium text-gray-800">
          {value || "—"}
        </p>

      </div>

    </div>
  );
}


// ============================================================
// LONG DETAIL
// ============================================================

function LongDetail({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="sm:col-span-2">

      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-2 whitespace-pre-wrap rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700">
        {value || "—"}
      </p>

    </div>
  );
}