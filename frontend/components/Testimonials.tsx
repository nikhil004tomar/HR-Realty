"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Quote,
  Star,
} from "lucide-react";

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
  // LOAD TESTIMONIALS
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
  // AUTO SLIDE
  // ============================================================

  useEffect(() => {
    if (testimonials.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrent((previous) =>
        previous === testimonials.length - 1
          ? 0
          : previous + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  // ============================================================
  // NEXT
  // ============================================================

  const next = () => {
    if (testimonials.length === 0) return;

    setCurrent((previous) =>
      previous === testimonials.length - 1
        ? 0
        : previous + 1
    );
  };

  // ============================================================
  // PREVIOUS
  // ============================================================

  const previous = () => {
    if (testimonials.length === 0) return;

    setCurrent((previous) =>
      previous === 0
        ? testimonials.length - 1
        : previous - 1
    );
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <section
        id="testimonials"
        className="bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto flex min-h-[400px] max-w-7xl items-center justify-center px-5">
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
  // EMPTY
  // ============================================================

  if (testimonials.length === 0) {
    return (
      <section
        id="testimonials"
        className="bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-10 bg-[#C9A45C]" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
              Client Feedback
            </span>

            <span className="h-[2px] w-10 bg-[#C9A45C]" />
          </div>

          <h2 className="text-3xl font-bold text-[#111111] sm:text-4xl">
            What Our{" "}
            <span className="text-[#043927]">
              Clients Say
            </span>
          </h2>

          <p className="mt-4 text-sm text-gray-500">
            No testimonials available yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* Background Decoration */}

      <div className="pointer-events-none absolute left-0 top-0 h-48 w-48 rounded-full bg-[#043927]/5 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#C9A45C]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-12">

        {/* ====================================================
            HEADER
        ===================================================== */}

        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14 lg:mb-16">

          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-10 bg-[#C9A45C]" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
              Client Feedback
            </span>

            <span className="h-[2px] w-10 bg-[#C9A45C]" />
          </div>

          <h2 className="text-4xl font-black tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">
            What Our{" "}
            <span className="text-[#043927]">
              Clients Say
            </span>
          </h2>

          <div className="mx-auto mt-5 h-[2px] w-16 bg-[#C9A45C]" />

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#111111]/60 sm:text-base">
            Real experiences from clients who trusted us
            with their real estate journey.
          </p>
        </div>

        {/* ====================================================
            SLIDER
        ===================================================== */}

        <div className="mx-auto max-w-5xl overflow-hidden">

          {/* TRACK */}

          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >

            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full shrink-0 px-1"
              >

                {/* CARD */}

                <div className="rounded-2xl border border-[#111111]/10 bg-[#fafafa] p-6 shadow-[0_20px_60px_rgba(17,17,17,0.06)] sm:rounded-3xl sm:p-8 md:p-10 lg:p-12">

                  <div className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-10 lg:gap-14">

                    {/* ==================================================
                        PROFILE
                    =================================================== */}

                    <div className="flex items-center gap-4 md:block md:w-40">

                      {/* IMAGE / INITIAL */}

                      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#043927] text-lg font-bold text-white shadow-lg sm:h-20 sm:w-20 sm:text-xl">

                        {testimonial.image ? (
                          <img
                            src={
                              testimonial.image.startsWith(
                                "http"
                              )
                                ? testimonial.image
                                : `${API_URL}${testimonial.image}`
                            }
                            alt={testimonial.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          testimonial.name
                            .split(" ")
                            .map((name) =>
                              name.charAt(0)
                            )
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()
                        )}

                      </div>

                      {/* NAME */}

                      <div className="md:mt-5">

                        <h3 className="text-base font-bold text-[#111111] sm:text-lg">
                          {testimonial.name}
                        </h3>

                        {testimonial.location && (
                          <p className="mt-1 text-xs text-[#111111]/45">
                            {testimonial.location}
                          </p>
                        )}

                      </div>

                    </div>

                    {/* ==================================================
                        CONTENT
                    =================================================== */}

                    <div className="relative">

                      {/* QUOTE */}

                      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#C9A45C]/15">
                        <Quote
                          size={20}
                          className="text-[#043927]"
                          strokeWidth={2.5}
                        />
                      </div>

                      {/* STARS */}

                      <div className="mb-5 flex gap-1">
                        {[1, 2, 3, 4, 5].map(
                          (star) => (
                            <Star
                              key={star}
                              size={17}
                              fill="currentColor"
                              className="text-[#C9A45C]"
                            />
                          )
                        )}
                      </div>

                      {/* FEEDBACK */}

                      <blockquote className="max-w-3xl text-xl font-medium leading-8 tracking-tight text-[#111111] sm:text-2xl sm:leading-9 lg:text-3xl lg:leading-10">
                        &ldquo;
                        {testimonial.message}
                        &rdquo;
                      </blockquote>

                      {/* BOTTOM */}

                      <div className="mt-7 flex items-center gap-3">
                        <span className="h-[2px] w-10 bg-[#043927]" />

                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#111111]/40">
                          Client Experience
                        </span>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* ====================================================
            CONTROLS
        ===================================================== */}

        <div className="mx-auto mt-7 flex max-w-5xl items-center justify-between">

          {/* DOTS */}

          <div className="flex items-center gap-2">

            {testimonials.map(
              (testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-label={`View testimonial from ${testimonial.name}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === index
                      ? "w-8 bg-[#043927]"
                      : "w-2 bg-[#111111]/15 hover:bg-[#C9A45C]"
                  }`}
                />
              )
            )}

          </div>

          {/* ARROWS */}

          <div className="flex gap-2">

            <button
              type="button"
              onClick={previous}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#111111]/15 bg-white text-[#111111] transition-all duration-300 hover:border-[#043927] hover:bg-[#043927] hover:text-white"
            >
              <ArrowLeft size={17} />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#043927] text-white transition-all duration-300 hover:bg-[#C9A45C] hover:text-[#111111]"
            >
              <ArrowRight size={17} />
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}