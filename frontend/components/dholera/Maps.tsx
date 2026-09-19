"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  MapPinned,
  Plane,
  TrainFront,
  Route,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  getMapImageUrl,
  getMaps,
  SiteMap,
} from "@/lib/maps";

export default function MapsPage() {
  const [maps, setMaps] = useState<SiteMap[]>([]);
  const [loading, setLoading] = useState(true);

  // ==========================================================
  // LOAD ALL MAPS
  // ==========================================================

  useEffect(() => {
    async function loadMaps() {
      try {
        setLoading(true);

        const data = await getMaps();

        setMaps(
          Array.isArray(data)
            ? data.filter(
                (map) => map.is_published
              )
            : []
        );
      } catch (error) {
        console.error(
          "Failed to load maps:",
          error
        );

        setMaps([]);
      } finally {
        setLoading(false);
      }
    }

    loadMaps();
  }, []);

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-white">

        {/* HERO */}

        <section className="relative overflow-hidden bg-[#043927] py-24 md:py-32">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,164,92,0.18),transparent_35%)]" />

          <div className="relative mx-auto max-w-7xl px-5 text-center sm:px-8 lg:px-12">

            <div className="mb-5 flex items-center justify-center gap-3">

              <span className="h-px w-10 bg-[#C9A45C]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
                Dholera SIR
              </span>

              <span className="h-px w-10 bg-[#C9A45C]" />

            </div>

            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Dholera SIR Maps
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Explore the location, connectivity,
              infrastructure and development maps
              of Dholera Smart City.
            </p>

          </div>

        </section>

        {/* LOADING */}

        <section className="flex min-h-[400px] items-center justify-center">

          <div className="text-center">

            <RefreshCw
              size={35}
              className="mx-auto animate-spin text-[#043927]"
            />

            <p className="mt-4 text-sm text-gray-500">
              Loading maps...
            </p>

          </div>

        </section>

      </main>
    );
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <main className="min-h-screen bg-white">

      {/* ================================================== */}
      {/* HERO */}
      {/* ================================================== */}

      <section className="relative overflow-hidden bg-[#043927] py-24 md:py-32">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,164,92,0.18),transparent_35%)]" />

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-[#C9A45C]/20" />

        <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full border border-white/5" />

        <div className="relative mx-auto max-w-7xl px-5 text-center sm:px-8 lg:px-12">

          <div className="mb-5 flex items-center justify-center gap-3">

            <span className="h-px w-10 bg-[#C9A45C]" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
              Dholera SIR
            </span>

            <span className="h-px w-10 bg-[#C9A45C]" />

          </div>

          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            Dholera SIR
            <span className="text-[#C9A45C]">
              {" "}Maps
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/70 sm:text-base md:text-lg">
            Explore detailed maps of Dholera Smart
            City, including location, connectivity,
            infrastructure and project development.
          </p>

          <div className="mx-auto mt-8 h-1 w-16 rounded-full bg-[#C9A45C]" />

        </div>

      </section>

      {/* ================================================== */}
      {/* INTRO */}
      {/* ================================================== */}

      <section className="bg-white py-16 md:py-24">

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">

          {/* TEXT */}

          <div>

            <div className="mb-5 flex items-center gap-3">

              <span className="h-px w-10 bg-[#C9A45C]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
                Explore Dholera
              </span>

            </div>

            <h2 className="text-3xl font-bold leading-tight text-[#111111] sm:text-4xl md:text-5xl">

              Discover the
              <span className="text-[#043927]">
                {" "}Future
              </span>

            </h2>

            <div className="mt-5 h-1 w-14 rounded-full bg-[#C9A45C]" />

            <p className="mt-6 text-sm leading-7 text-black/60 sm:text-base">
              Dholera SIR is one of India's most
              ambitious greenfield smart city
              developments. Explore our collection of
              maps to understand its location,
              connectivity, infrastructure and
              development zones.
            </p>

            <p className="mt-4 text-sm leading-7 text-black/60 sm:text-base">
              Use the maps below to get a better
              understanding of Dholera SIR and its
              surrounding infrastructure.
            </p>

          </div>

          {/* DEFAULT LOCATION MAP */}

          <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-gray-100 shadow-[0_15px_50px_rgba(0,0,0,0.08)]">

            <div className="relative aspect-[16/10]">

              <Image
                src="/Location_Map_DMC-3.jpg"
                alt="Dholera SIR Location Map"
                fill
                priority
                className="object-cover"
              />

            </div>

          </div>

        </div>

      </section>

      {/* ================================================== */}
      {/* ALL MAPS */}
      {/* ================================================== */}

      <section className="bg-gray-50 py-16 md:py-24">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          {/* SECTION HEADER */}

          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-5 flex items-center justify-center gap-3">

              <span className="h-px w-10 bg-[#C9A45C]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
                Map Collection
              </span>

              <span className="h-px w-10 bg-[#C9A45C]" />

            </div>

            <h2 className="text-3xl font-bold text-[#111111] sm:text-4xl md:text-5xl">

              Explore All
              <span className="text-[#043927]">
                {" "}Maps
              </span>

            </h2>

            <div className="mx-auto mt-5 h-1 w-14 rounded-full bg-[#C9A45C]" />

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-black/55 sm:text-base">
              Browse all available maps published
              by HR Realty to understand Dholera SIR
              and its development landscape.
            </p>

          </div>

          {/* ================================================= */}
          {/* NO MAPS */}
          {/* ================================================= */}

          {maps.length === 0 && (

            <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-black/10 bg-white px-6 py-16 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#043927]/5">

                <MapPinned
                  size={30}
                  className="text-[#043927]"
                />

              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Maps Coming Soon
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Detailed Dholera SIR maps will be
                available here soon.
              </p>

            </div>

          )}

          {/* ================================================= */}
          {/* ALL MAP CARDS */}
          {/* ================================================= */}

          {maps.length > 0 && (

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              {maps.map((map) => (

                <article
                  key={map.id}
                  className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C]/60 hover:shadow-[0_15px_40px_rgba(0,0,0,0.10)]"
                >

                  {/* IMAGE */}

                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">

                    <Image
                      src={getMapImageUrl(
                        map.image
                      )}
                      alt={map.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />

                    {/* ORDER */}

                    <div className="absolute left-4 top-4">

                      <span className="rounded-full bg-[#043927] px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                        Map {map.display_order + 1}
                      </span>

                    </div>

                  </div>

                  {/* CONTENT */}

                  <div className="p-6">

                    <div className="flex items-start gap-3">

                      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#043927]/5">

                        <MapPinned
                          size={20}
                          className="text-[#043927]"
                        />

                      </div>

                      <div>

                        <h3 className="text-xl font-bold leading-tight text-gray-900">
                          {map.title}
                        </h3>

                      </div>

                    </div>

                    {map.description && (

                      <p className="mt-4 line-clamp-4 text-sm leading-6 text-gray-500">
                        {map.description}
                      </p>

                    )}

                    {/* VIEW */}

                    <div className="mt-6">

                      <a
                        href={getMapImageUrl(
                          map.image
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#043927] transition-colors hover:text-[#C9A45C]"
                      >

                        View Full Map

                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />

                      </a>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>

      </section>

      {/* ================================================== */}
      {/* MAP FEATURES */}
      {/* ================================================== */}

      <section className="bg-white py-16 md:py-24">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-5 flex items-center justify-center gap-3">

              <span className="h-px w-10 bg-[#C9A45C]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
                Connectivity
              </span>

              <span className="h-px w-10 bg-[#C9A45C]" />

            </div>

            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Strategic Connectivity
            </h2>

            <div className="mx-auto mt-5 h-1 w-14 rounded-full bg-[#C9A45C]" />

          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Dholera SIR */}

            <div className="rounded-2xl border border-black/10 bg-gray-50 p-6">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#043927] text-white">

                <Building2 size={23} />

              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Dholera SIR Location
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Strategically located in Gujarat with
                excellent regional connectivity.
              </p>

            </div>

            {/* ROAD */}

            <div className="rounded-2xl border border-black/10 bg-gray-50 p-6">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#043927] text-white">

                <Route size={23} />

              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Road Connectivity
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Connected through major highways and
                planned road infrastructure.
              </p>

            </div>

            {/* AIRPORT */}

            <div className="rounded-2xl border border-black/10 bg-gray-50 p-6">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#043927] text-white">

                <Plane size={23} />

              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Airport Connectivity
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Close connectivity to Dholera
                International Airport.
              </p>

            </div>

            {/* RAIL */}

            <div className="rounded-2xl border border-black/10 bg-gray-50 p-6">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#043927] text-white">

                <TrainFront size={23} />

              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Rail Connectivity
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Planned rail connectivity supporting
                future regional growth.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================================================== */}
      {/* NAVIGATION */}
      {/* ================================================== */}

      <section className="bg-gray-50 py-16">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="grid gap-5 md:grid-cols-3">

            <Link
              href="/dholera-sir/maps"
              className="group rounded-2xl border border-black/10 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#C9A45C]/60 hover:shadow-lg"
            >

              <div className="flex items-center justify-between">

                <MapPinned
                  size={25}
                  className="text-[#043927]"
                />

                <ArrowRight
                  size={19}
                  className="text-gray-400 transition-transform group-hover:translate-x-1"
                />

              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Dholera SIR Maps
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Explore all available Dholera maps.
              </p>

            </Link>

            <Link
              href="/dholera-sir/connectivity"
              className="group rounded-2xl border border-black/10 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#C9A45C]/60 hover:shadow-lg"
            >

              <div className="flex items-center justify-between">

                <Route
                  size={25}
                  className="text-[#043927]"
                />

                <ArrowRight
                  size={19}
                  className="text-gray-400 transition-transform group-hover:translate-x-1"
                />

              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Connectivity Map
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Discover Dholera's major connectivity
                routes.
              </p>

            </Link>

            <Link
              href="/projects"
              className="group rounded-2xl border border-black/10 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#C9A45C]/60 hover:shadow-lg"
            >

              <div className="flex items-center justify-between">

                <Building2
                  size={25}
                  className="text-[#043927]"
                />

                <ArrowRight
                  size={19}
                  className="text-gray-400 transition-transform group-hover:translate-x-1"
                />

              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Project Locations
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Explore our real estate projects.
              </p>

            </Link>

          </div>

        </div>

      </section>

      {/* ================================================== */}
      {/* CTA */}
      {/* ================================================== */}

      <section className="bg-[#043927] py-16 md:py-20">

        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A45C]/15">

            <MapPinned
              size={27}
              className="text-[#C9A45C]"
            />

          </div>

          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
            Explore Dholera SIR
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
            Want to understand the location and
            investment potential of Dholera SIR?
            Explore our maps or connect with our team
            for more information.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[#C9A45C] px-6 py-3 text-sm font-semibold text-[#043927] transition hover:bg-[#d8b875]"
            >
              Contact Us

              <ArrowRight size={17} />

            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Projects

              <ArrowRight size={17} />

            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}