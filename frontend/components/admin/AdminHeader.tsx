"use client";

import {
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import { useRouter } from "next/navigation";

import {
  removeToken,
} from "@/lib/auth";

export default function AdminHeader() {
  const router = useRouter();

  function logout() {
    removeToken();

    router.replace("/admin/login");
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* =====================================================
            BRAND
        ===================================================== */}

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#043927] text-white">
            <LayoutDashboard size={20} />
          </div>

          <div>
            <p className="font-semibold text-[#043927]">
              HR Realty International
            </p>

            <p className="text-xs text-gray-400">
              Admin Panel
            </p>
          </div>

        </div>

        {/* =====================================================
            LOGOUT
        ===================================================== */}

        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={17} />

          Logout
        </button>

      </div>
    </header>
  );
}