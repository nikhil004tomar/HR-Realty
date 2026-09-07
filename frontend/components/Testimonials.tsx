"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  location: string | null;
  message: string;
  image: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  // ============================================================
  // LOAD PUBLIC TESTIMONIALS
  // ============================================================

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const response = await fetch(
          `${API_URL}/api/testimonials/public`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load testimonials (${response.status})`
          );
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setTestimonials(data);
        } else {
          setTestimonials([]);
        }
      } catch (error) {
        console.error(
          "Testimonials loading error:",
          error
        );

        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    }

    loadTestimonials();
  }, []);

  // ============================================================
  // AUTO RESET CURRENT INDEX
  // ============================================================

  useEffect(() => {
    if (
      testimonials.length > 0 &&
      current >= testimonials.length
    ) {
      setCurrent(0);
    }
  }, [testimonials.length, current]);

  // ============================================================
  // NEXT
  // ============================================================

  const next = () => {
    if (testimonials.length === 0) {
      return;
    }

    setCurrent(
      (prev) =>
        (prev + 1) % testimonials.length
    );
  };

  // ============================================================
  // PREVIOUS
  // ============================================================

  const previous = () => {
    if (testimonials.length === 0) {
      return;
    }

    setCurrent(
      (prev) =>
        (prev - 1 + testimonials.length) %
        testimonials.length
    );
  };

  // ============================================================
  // AUTO PLAY
  // ============================================================

  useEffect(() => {
    if (testimonials.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrent(
        (prev) =>
          (prev + 1) % testimonials.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <section
        id="testimonials"
        className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto flex min-h-[500px] max-w-7xl items-center justify-center px-5">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#043927]" />

            <p className="mt-4 text-sm text-gray-500">
              Loading testimonials...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ============================================================
  // NO TESTIMONIALS
  // ============================================================

  if (testimonials.length === 0) {
    return (
      <section
        id="testimonials"
        className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto flex min-h-[400px] max-w-7xl items-center justify-center px-5">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b2965d]">
              Testimonials
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-[#043927]">
              What Our Clients Say
            </h2>

            <p className="mt-4 text-gray-500">
              No testimonials available yet.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const testimonial = testimonials[current];

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* CAROUSEL */}

        <div className="relative mx-auto max-w-5xl">

          {/* TESTIMONIAL */}

          <div
            key={current}
            className="flex min-h-[500px] flex-col items-center justify-center text-center transition-all duration-700 ease-out sm:min-h-[520px] lg:min-h-[540px]"
          >

            {/* CLIENT IMAGE */}

            <div className="relative mb-8 h-[120px] w-[120px] overflow-hidden rounded-full border-4 border-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] sm:h-[140px] sm:w-[140px]">

              {testimonial.image ? (
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  sizes="140px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#043927] text-3xl font-semibold text-[#b2965d]">
                  {testimonial.name
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}

            </div>

            {/* QUOTE */}

            <div className="relative max-w-3xl px-8 sm:px-12">

              <span className="absolute -left-1 -top-8 text-6xl font-serif leading-none text-[#043927]/10 sm:-left-4">
                “
              </span>

              <p className="whitespace-pre-line text-base font-medium leading-8 text-gray-700 sm:text-lg sm:leading-9 lg:text-xl">
                {testimonial.message}
              </p>

              <span className="absolute -bottom-10 -right-1 text-6xl font-serif leading-none text-[#043927]/10 sm:-right-4">
                ”
              </span>

            </div>

            {/* NAME */}

            <p className="mt-10 text-sm font-semibold text-[#043927] sm:text-base">
              {testimonial.name}

              {testimonial.location && (
                <span>
                  , {testimonial.location}
                </span>
              )}
            </p>

          </div>

          {/* PREVIOUS */}

          {testimonials.length > 1 && (
            <button
              type="button"
              onClick={previous}
              aria-label="Previous testimonial"
              className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#043927]/15 text-xl text-[#043927] transition-all duration-300 hover:bg-[#043927] hover:text-white sm:left-2 sm:h-12 sm:w-12"
            >
              ←
            </button>
          )}

          {/* NEXT */}

          {testimonials.length > 1 && (
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#043927]/15 text-xl text-[#043927] transition-all duration-300 hover:bg-[#043927] hover:text-white sm:right-2 sm:h-12 sm:w-12"
            >
              →
            </button>
          )}

          {/* INDICATORS */}

          {testimonials.length > 1 && (
            <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2">
              {testimonials.map(
                (_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to testimonial ${
                      index + 1
                    }`}
                    onClick={() =>
                      setCurrent(index)
                    }
                    className={`h-2 rounded-full transition-all duration-300 ${
                      current === index
                        ? "w-8 bg-[#043927]"
                        : "w-2 bg-[#043927]/20"
                    }`}
                  />
                )
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}