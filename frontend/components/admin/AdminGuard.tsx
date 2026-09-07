"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({
  children,
}: AdminGuardProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = getToken();

    console.log("================================");
    console.log("ADMIN GUARD");
    console.log("TOKEN:", token ? "FOUND" : "NOT FOUND");
    console.log("================================");

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    setChecking(false);
  }, [router]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#043927]" />

          <p className="mt-4 text-sm text-gray-500">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}