"use client";

import { FormEvent, useState } from "react";

import { useRouter } from "next/navigation";

import API_URL from "@/lib/api";

import { saveToken } from "@/lib/auth";


export default function AdminLoginForm() {

  const router = useRouter();


  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();

    setError("");

    setLoading(true);


    try {

      const response =
        await fetch(
          `${API_URL}/api/auth/login`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email,
              password,
            }),
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.detail ||
          "Invalid email or password"
        );
      }


      saveToken(
        data.access_token
      );


      router.push(
        "/admin/dashboard"
      );


    } catch (error) {

      if (
        error instanceof Error
      ) {

        setError(
          error.message
        );

      } else {

        setError(
          "Login failed"
        );
      }


    } finally {

      setLoading(false);
    }
  }


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <div>

        <label
          className="mb-2 block text-sm font-medium"
        >
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(
              event.target.value
            )
          }
          placeholder="admin@example.com"
          required
          className="w-full rounded-lg border px-4 py-3"
        />

      </div>


      <div>

        <label
          className="mb-2 block text-sm font-medium"
        >
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(
              event.target.value
            )
          }
          placeholder="••••••••"
          required
          className="w-full rounded-lg border px-4 py-3"
        />

      </div>


      {error && (

        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>

      )}


      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white disabled:opacity-50"
      >

        {loading
          ? "Signing in..."
          : "Sign In"}

      </button>

    </form>
  );
}