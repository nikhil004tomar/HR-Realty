"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Building2,
  Users,
  MessageSquare,
  Handshake,
  MapPinned,
  Network,
  LogOut,
  ArrowRight,
  RefreshCw,
  BriefcaseBusiness,
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

interface CareerApplication {
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

  const [careerApplicationCount, setCareerApplicationCount] =
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

        // ------------------------------------------------------
        // CAREER APPLICATIONS
        // ------------------------------------------------------

        const careerApplications =
          await apiRequest<CareerApplication[]>(
            "/api/career-applications/admin",
            {
              authenticated: true,
            }
          );

        setCareerApplicationCount(
          Array.isArray(careerApplications)
            ? careerApplications.length
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

          {/* BRAND */}

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

          {/* ADMIN / LOGOUT */}

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

        {/* ================================================== */}
        {/* WELCOME */}
        {/* ================================================== */}

        <div className="mb-10">

          <p className="text-sm font-medium text-[#b2965d]">
            Dashboard
          </p>

          <h2 className="mt-1 text-3xl font-bold text-gray-900 md:text-4xl">
            Welcome back, {admin?.name}
          </h2>

          <p className="mt-2 text-gray-600">
            Manage your real estate projects,
            leads, channel partners and career
            applications.
          </p>

        </div>

        {/* ================================================= */}
        {/* STAT CARDS */}
        {/* ================================================= */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">

          {/* ================================================= */}
          {/* PROJECTS */}
          {/* ================================================= */}

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

          {/* ================================================= */}
          {/* INQUIRIES */}
          {/* ================================================= */}

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

          {/* ================================================= */}
          {/* CHANNEL PARTNERS */}
          {/* ================================================= */}

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

          {/* ================================================= */}
          {/* CAREER APPLICATIONS */}
          {/* ================================================= */}

          <button
            onClick={() =>
              router.push(
                "/admin/career-applications"
              )
            }
            className="rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Career Applications
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {careerApplicationCount}
                </p>

              </div>

              <div className="rounded-xl bg-gray-100 p-3">

                <BriefcaseBusiness
                  size={24}
                  className="text-[#043927]"
                />

              </div>

            </div>

          </button>

          {/* ================================================= */}
          {/* ACCOUNT */}
          {/* ================================================= */}

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

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* ================================================= */}
            {/* PROJECTS */}
            {/* ================================================= */}

            <ManagementCard
              icon={
                <Building2
                  size={25}
                  className="text-[#043927]"
                />
              }
              title="Projects"
              description="Add, edit and manage your real estate projects."
              onClick={() =>
                router.push(
                  "/admin/projects"
                )
              }
            />

            {/* ================================================= */}
            {/* INQUIRIES */}
            {/* ================================================= */}

            <ManagementCard
              icon={
                <MessageSquare
                  size={25}
                  className="text-[#043927]"
                />
              }
              title="Inquiries"
              description="View and manage customer inquiries and leads."
              onClick={() =>
                router.push(
                  "/admin/dashboard/inquiries"
                )
              }
            />

            {/* ================================================= */}
            {/* CHANNEL PARTNERS */}
            {/* ================================================= */}

            <ManagementCard
              icon={
                <Handshake
                  size={25}
                  className="text-[#043927]"
                />
              }
              title="Channel Partners"
              description="Manage your channel partner applications."
              onClick={() =>
                router.push(
                  "/admin/channel-partners"
                )
              }
            />

            {/* ================================================= */}
            {/* CAREER APPLICATIONS */}
            {/* ================================================= */}

            <ManagementCard
              icon={
                <BriefcaseBusiness
                  size={25}
                  className="text-[#043927]"
                />
              }
              title="Career Applications"
              description="View applicants, resumes, statuses and notes."
              onClick={() =>
                router.push(
                  "/admin/career-applications"
                )
              }
            />

            {/* ================================================= */}
            {/* OUR TEAM */}
            {/* ================================================= */}

            <ManagementCard
              icon={
                <Users
                  size={25}
                  className="text-[#043927]"
                />
              }
              title="Our Team"
              description="Add, edit and manage your team members."
              onClick={() =>
                router.push(
                  "/admin/team"
                )
              }
            />

            {/* ================================================= */}
            {/* MAPS */}
            {/* ================================================= */}

            <ManagementCard
              icon={
                <MapPinned
                  size={25}
                  className="text-[#043927]"
                />
              }
              title="Maps"
              description="Add, edit and manage your Dholera maps."
              onClick={() =>
                router.push(
                  "/admin/maps"
                )
              }
            />

            {/* ================================================= */}
            {/* CONNECTIVITY */}
            {/* ================================================= */}

            <ManagementCard
              icon={
                <Network
                  size={25}
                  className="text-[#043927]"
                />
              }
              title="Connectivity"
              description="Manage Dholera SIR connectivity sections and images."
              onClick={() =>
                router.push(
                  "/admin/connectivity"
                )
              }
            />

          </div>

        </div>

      </section>

    </main>
  );
}


// ============================================================
// MANAGEMENT CARD
// ============================================================

function ManagementCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        group
        rounded-2xl
        bg-white
        p-6
        text-left
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-md
      "
    >

      <div className="flex items-center justify-between">

        <div className="rounded-xl bg-gray-100 p-3">
          {icon}
        </div>

        <ArrowRight
          size={20}
          className="text-gray-400 transition group-hover:translate-x-1"
        />

      </div>

      <h4 className="mt-5 text-lg font-bold text-gray-900">
        {title}
      </h4>

      <p className="mt-2 text-sm text-gray-500">
        {description}
      </p>

    </button>
  );
}


// ============================================================
// NOTE
// ============================================================
//
// Career Applications API:
//
// GET /api/career-applications/admin
//
// Requires:
//
// Authorization: Bearer <admin-token>
//
// ============================================================