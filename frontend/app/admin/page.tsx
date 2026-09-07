"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Building2,
  Users,
  MessageSquare,
  Handshake,
  LogOut,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

import {
  getToken,
  removeToken,
} from "@/lib/auth";

import {
  apiRequest,
} from "@/lib/api-client";

interface Admin {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

interface Inquiry {
  id: number;
}

interface Project {
  id: number;
}

interface ChannelPartner {
  id: number;
}

export default function AdminDashboard() {
  const router = useRouter();

  const [admin, setAdmin] =
    useState<Admin | null>(null);

  const [projectCount, setProjectCount] =
    useState(0);

  const [inquiryCount, setInquiryCount] =
    useState(0);

  const [channelPartnerCount, setChannelPartnerCount] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  // ==========================================================
  // LOAD DASHBOARD
  // ==========================================================

  useEffect(() => {
    async function loadDashboard() {
      const token = getToken();

      if (!token) {
        router.replace("/admin/login");
        return;
      }

      try {
        setLoading(true);

        // ------------------------------------------------------
        // ADMIN
        // ------------------------------------------------------

        const adminData =
          await apiRequest<Admin>(
            "/api/auth/me",
            {
              authenticated: true,
            }
          );

        setAdmin(adminData);

        // ------------------------------------------------------
        // PROJECTS
        // ------------------------------------------------------

        const projects =
          await apiRequest<Project[]>(
            "/api/projects",
            {
              authenticated: true,
            }
          );

        setProjectCount(
          Array.isArray(projects)
            ? projects.length
            : 0
        );

        // ------------------------------------------------------
        // INQUIRIES
        // ------------------------------------------------------

        const inquiries =
          await apiRequest<Inquiry[]>(
            "/api/inquiries",
            {
              authenticated: true,
            }
          );

        setInquiryCount(
          Array.isArray(inquiries)
            ? inquiries.length
            : 0
        );

        // ------------------------------------------------------
        // CHANNEL PARTNERS
        // ------------------------------------------------------

        const channelPartners =
          await apiRequest<ChannelPartner[]>(
            "/api/channel-partners",
            {
              authenticated: true,
            }
          );

        setChannelPartnerCount(
          Array.isArray(channelPartners)
            ? channelPartners.length
            : 0
        );

      } catch (error) {
        console.error(
          "Dashboard loading error:",
          error
        );

        removeToken();

        router.replace(
          "/admin/login"
        );

      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  // ==========================================================
  // LOGOUT
  // ==========================================================

  function handleLogout() {
    removeToken();

    router.replace(
      "/admin/login"
    );
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
            Loading dashboard...
          </p>

        </div>

      </main>
    );
  }

  // ==========================================================
  // DASHBOARD
  // ==========================================================

  return (
    <main className="min-h-screen bg-gray-100">

      {/* ================================================== */}
      {/* HEADER */}
      {/* ================================================== */}

      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#043927] text-white">

              <Building2 size={22} />

            </div>

            <div>

              <h1 className="text-xl font-bold text-gray-900">
                HR Realty
              </h1>

              <p className="text-xs text-gray-500">
                Admin Panel
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <div className="hidden text-right sm:block">

              <p className="text-sm font-semibold text-gray-900">
                {admin?.name}
              </p>

              <p className="text-xs text-gray-500">
                {admin?.email}
              </p>

            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >

              <LogOut size={17} />

              Logout

            </button>

          </div>

        </div>

      </header>

      {/* ================================================== */}
      {/* MAIN */}
      {/* ================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        {/* WELCOME */}

        <div className="mb-10">

          <p className="text-sm font-medium text-[#b2965d]">
            Dashboard
          </p>

          <h2 className="mt-1 text-3xl font-bold text-gray-900 md:text-4xl">
            Welcome back, {admin?.name}
          </h2>

          <p className="mt-2 text-gray-600">
            Manage your real estate projects,
            leads and channel partners.
          </p>

        </div>

        {/* ================================================= */}
        {/* STAT CARDS */}
        {/* ================================================= */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {/* PROJECTS */}

          <button
            onClick={() =>
              router.push(
                "/admin/projects"
              )
            }
            className="rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Projects
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {projectCount}
                </p>

              </div>

              <div className="rounded-xl bg-gray-100 p-3">

                <Building2
                  size={24}
                  className="text-[#043927]"
                />

              </div>

            </div>

          </button>

          {/* INQUIRIES */}

          <button
            onClick={() =>
              router.push(
                "/admin/dashboard/inquiries"
              )
            }
            className="rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Inquiries
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {inquiryCount}
                </p>

              </div>

              <div className="rounded-xl bg-gray-100 p-3">

                <MessageSquare
                  size={24}
                  className="text-[#043927]"
                />

              </div>

            </div>

          </button>

          {/* CHANNEL PARTNERS */}

          <button
            onClick={() =>
              router.push(
                "/admin/channel-partners"
              )
            }
            className="rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Channel Partners
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {channelPartnerCount}
                </p>

              </div>

              <div className="rounded-xl bg-gray-100 p-3">

                <Handshake
                  size={24}
                  className="text-[#043927]"
                />

              </div>

            </div>

          </button>

          {/* ACCOUNT */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Account
                </p>

                <p className="mt-2 text-lg font-bold text-green-700">
                  {admin?.is_active
                    ? "Active"
                    : "Inactive"}
                </p>

              </div>

              <div className="rounded-xl bg-gray-100 p-3">

                <Users
                  size={24}
                  className="text-[#043927]"
                />

              </div>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* MANAGEMENT */}
        {/* ================================================= */}

        <div className="mt-10">

          <h3 className="text-xl font-bold text-gray-900">
            Management
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Manage your real estate website.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">

            {/* PROJECTS */}

            <button
              onClick={() =>
                router.push(
                  "/admin/projects"
                )
              }
              className="group rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <div className="flex items-center justify-between">

                <div className="rounded-xl bg-gray-100 p-3">

                  <Building2 size={25} />

                </div>

                <ArrowRight
                  size={20}
                  className="text-gray-400 transition group-hover:translate-x-1"
                />

              </div>

              <h4 className="mt-5 text-lg font-bold">
                Projects
              </h4>

              <p className="mt-2 text-sm text-gray-500">
                Add, edit and manage your
                real estate projects.
              </p>

            </button>

            {/* INQUIRIES */}

            <button
              onClick={() =>
                router.push(
                  "/admin/dashboard/inquiries"
                )
              }
              className="group rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <div className="flex items-center justify-between">

                <div className="rounded-xl bg-gray-100 p-3">

                  <MessageSquare size={25} />

                </div>

                <ArrowRight
                  size={20}
                  className="text-gray-400 transition group-hover:translate-x-1"
                />

              </div>

              <h4 className="mt-5 text-lg font-bold">
                Inquiries
              </h4>

              <p className="mt-2 text-sm text-gray-500">
                View and manage customer
                inquiries and leads.
              </p>

            </button>

            {/* CHANNEL PARTNERS */}

            <button
              onClick={() =>
                router.push(
                  "/admin/channel-partners"
                )
              }
              className="group rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <div className="flex items-center justify-between">

                <div className="rounded-xl bg-gray-100 p-3">

                  <Handshake size={25} />

                </div>

                <ArrowRight
                  size={20}
                  className="text-gray-400 transition group-hover:translate-x-1"
                />

              </div>

              <h4 className="mt-5 text-lg font-bold">
                Channel Partners
              </h4>

              <p className="mt-2 text-sm text-gray-500">
                Manage your channel partner
                applications.
              </p>

            </button>

          </div>

        </div>

      </section>

    </main>
  );
}