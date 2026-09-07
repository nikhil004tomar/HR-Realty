"use client";

import { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Building2,
  BriefcaseBusiness,
  Trash2,
  RefreshCw,
  User,
  Clock,
} from "lucide-react";

interface ChannelPartner {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  city: string | null;
  company: string | null;
  experience: string | null;
  message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

const TOKEN_KEY = "hr_realty_admin_token";

export default function ChannelPartnersAdminPage() {
  const [partners, setPartners] = useState<ChannelPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function getToken() {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(TOKEN_KEY);
  }

  async function loadPartners() {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const response = await fetch(
        `${API_URL}/api/channel-partners`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      if (response.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        const text = await response.text();

        console.error(
          "Channel partner API error:",
          response.status,
          text
        );

        throw new Error(
          `Failed to load channel partners (${response.status})`
        );
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error(
          "Invalid response from channel partner API"
        );
      }

      setPartners(data);
    } catch (error) {
      console.error(
        "Load channel partners error:",
        error
      );

      setError(
        "Unable to load channel partners. Please check the backend."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPartners();
  }, []);

  async function updateStatus(
    id: number,
    status: string
  ) {
    try {
      const token = getToken();

      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const response = await fetch(
        `${API_URL}/api/channel-partners/${id}`,
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

      if (response.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error(
          "Failed to update partner status"
        );
      }

      const updated =
        await response.json();

      setPartners((previous) =>
        previous.map((partner) =>
          partner.id === id
            ? updated
            : partner
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        "Unable to update partner status."
      );
    }
  }

  async function deletePartner(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this channel partner?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = getToken();

      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const response = await fetch(
        `${API_URL}/api/channel-partners/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error(
          "Failed to delete channel partner"
        );
      }

      setPartners((previous) =>
        previous.filter(
          (partner) => partner.id !== id
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        "Unable to delete channel partner."
      );
    }
  }

  function statusClass(status: string) {
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
  }

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
              Channel Partners
            </h1>

            <p className="mt-2 text-gray-500">
              Manage channel partner applications and leads.
            </p>
          </div>

          <button
            type="button"
            onClick={loadPartners}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#043927] px-5 py-3 font-medium text-white transition hover:bg-[#b2965d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={
                loading ? "animate-spin" : ""
              }
            />

            Refresh
          </button>

        </div>

        {/* ERROR */}

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

        {/* LOADING */}

        {loading && (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

            <RefreshCw
              size={30}
              className="mx-auto animate-spin text-[#b2965d]"
            />

            <p className="mt-4 text-gray-500">
              Loading channel partners...
            </p>

          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          partners.length === 0 &&
          !error && (
            <div className="rounded-3xl bg-white p-16 text-center shadow-sm">

              <User
                size={42}
                className="mx-auto text-gray-300"
              />

              <h2 className="mt-5 text-xl font-semibold text-[#043927]">
                No channel partners yet
              </h2>

              <p className="mt-2 text-gray-500">
                New channel partner applications will appear here.
              </p>

            </div>
          )}

        {/* PARTNERS */}

        {!loading &&
          partners.length > 0 && (
            <div className="space-y-5">

              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                >

                  {/* TOP */}

                  <div className="flex flex-col justify-between gap-4 md:flex-row">

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <h2 className="text-xl font-semibold text-[#043927]">
                          {partner.name}
                        </h2>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClass(
                            partner.status
                          )}`}
                        >
                          {partner.status}
                        </span>

                      </div>

                      <p className="mt-2 text-sm text-gray-400">
                        Partner #{partner.id}
                      </p>

                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock size={16} />

                      {new Date(
                        partner.created_at
                      ).toLocaleString()}
                    </div>

                  </div>

                  {/* CONTACT */}

                  <div className="mt-6 grid gap-3 md:grid-cols-3">

                    {/* PHONE */}

                    <a
                      href={`tel:${partner.phone}`}
                      className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 transition hover:bg-[#043927]/5"
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
                          {partner.phone}
                        </p>
                      </div>
                    </a>

                    {/* EMAIL */}

                    <a
                      href={
                        partner.email
                          ? `mailto:${partner.email}`
                          : undefined
                      }
                      className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 transition hover:bg-[#043927]/5"
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
                          {partner.email ||
                            "Not provided"}
                        </p>
                      </div>
                    </a>

                    {/* CITY */}

                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">

                      <MapPin
                        size={18}
                        className="text-[#b2965d]"
                      />

                      <div>
                        <p className="text-xs text-gray-400">
                          City
                        </p>

                        <p className="font-medium text-[#043927]">
                          {partner.city ||
                            "Not provided"}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* COMPANY */}

                  <div className="mt-5 grid gap-4 md:grid-cols-2">

                    <div className="rounded-2xl border border-gray-100 p-5">

                      <div className="flex items-center gap-3">

                        <Building2
                          size={20}
                          className="text-[#b2965d]"
                        />

                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-400">
                            Company
                          </p>

                          <p className="mt-1 font-medium text-[#043927]">
                            {partner.company ||
                              "Not provided"}
                          </p>
                        </div>

                      </div>

                    </div>

                    <div className="rounded-2xl border border-gray-100 p-5">

                      <div className="flex items-center gap-3">

                        <BriefcaseBusiness
                          size={20}
                          className="text-[#b2965d]"
                        />

                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-400">
                            Experience
                          </p>

                          <p className="mt-1 font-medium text-[#043927]">
                            {partner.experience ||
                              "Not provided"}
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* MESSAGE */}

                  {partner.message && (
                    <div className="mt-5 rounded-2xl border border-gray-100 p-5">

                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Application Details
                      </p>

                      <p className="mt-3 whitespace-pre-line leading-7 text-gray-600">
                        {partner.message}
                      </p>

                    </div>
                  )}

                  {/* ACTIONS */}

                  <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                    <select
                      value={partner.status}
                      onChange={(event) =>
                        updateStatus(
                          partner.id,
                          event.target.value
                        )
                      }
                      className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-[#043927] outline-none focus:border-[#b2965d]"
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

                    <button
                      type="button"
                      onClick={() =>
                        deletePartner(partner.id)
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={17} />

                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

      </div>
    </main>
  );
}