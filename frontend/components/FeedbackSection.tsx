"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Quote,
  Star,
} from "lucide-react";

const feedbacks = [
  {
    id: 1,
    name: "Rajesh Sharma",
    role: "Property Investor",
    location: "Delhi, India",
    rating: 5,
    feedback:
      "The team provided excellent guidance throughout the investment process. They explained everything clearly and helped me understand the potential of Dholera SIR.",
    initials: "RS",
  },
  {
    id: 2,
    name: "Amit Patel",
    role: "Business Owner",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    feedback:
      "Very professional and transparent service. The site visit and project explanation were well organized. I am happy with the overall experience.",
    initials: "AP",
  },
  {
    id: 3,
    name: "Neha Verma",
    role: "Real Estate Investor",
    location: "Mumbai, India",
    rating: 5,
    feedback:
      "The team was supportive from the first conversation to the site visit. Their knowledge about Dholera and the surrounding development was impressive.",
    initials: "NV",
  },
  {
    id: 4,
    name: "Sanjay Mehta",
    role: "Investor",
    location: "Pune, Maharashtra",
    rating: 5,
    feedback:
      "A smooth and professional experience. The team answered all my questions and helped me make a well-informed property decision.",
    initials: "SM",
  },
];

// ============================================================
// COMPONENT
// ============================================================

export default function FeedbackSection() {
  const [active, setActive] = useState(0);

  const currentFeedback = feedbacks[active];

  // ==========================================================
  // NEXT
  // ==========================================================

  const nextFeedback = () => {
    setActive((previous) =>
      previous === feedbacks.length - 1
        ? 0
        : previous + 1
    );
  };

  // ==========================================================
  // PREVIOUS
  // ==========================================================

  const previousFeedback = () => {
    setActive((previous) =>
      previous === 0
        ? feedbacks.length - 1
        : previous - 1
    );
  };

  return (
    <section
      id="feedback"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* ======================================================
          BACKGROUND DECORATION
      ======================================================= */}

      <div className="pointer-events-none absolute left-0 top-0 h-48 w-48 rounded-full bg-[#043927]/5 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#C9A45C]/10 blur-3xl" />

      {/* ======================================================
          CONTAINER
      ======================================================= */}

      <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-12">
        {/* ====================================================
            HEADER
        ===================================================== */}

        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14 lg:mb-16">
          {/* Label */}

          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-10 bg-[#C9A45C]" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
              Client Feedback
            </span>

            <span className="h-[2px] w-10 bg-[#C9A45C]" />
          </div>

          {/* Heading */}

          <h2 className="text-4xl font-black tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">
            What Our{" "}
            <span className="text-[#043927]">
              Clients Say
            </span>
          </h2>

          <div className="mx-auto mt-5 h-[2px] w-16 bg-[#C9A45C]" />

          {/* Description */}

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#111111]/60 sm:text-base">
            Real experiences from clients who trusted us
            with their real estate journey.
          </p>
        </div>

        {/* ====================================================
            FEEDBACK CARD
        ===================================================== */}

        <div className="mx-auto max-w-5xl">
          <div
            key={currentFeedback.id}
            className="animate-[fadeIn_0.5s_ease-out] rounded-2xl border border-[#111111]/10 bg-[#fafafa] p-6 shadow-[0_20px_60px_rgba(17,17,17,0.06)] sm:rounded-3xl sm:p-8 md:p-10 lg:p-12"
          >
            <div className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-10 lg:gap-14">
              {/* ==================================================
                  LEFT PROFILE
              =================================================== */}

              <div className="flex items-center gap-4 md:block md:w-40">
                {/* Avatar */}

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#043927] text-lg font-bold text-white shadow-lg sm:h-20 sm:w-20 sm:text-xl">
                  {currentFeedback.initials}
                </div>

                {/* Name */}

                <div className="md:mt-5">
                  <h3 className="text-base font-bold text-[#111111] sm:text-lg">
                    {currentFeedback.name}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-[#043927]">
                    {currentFeedback.role}
                  </p>

                  <p className="mt-1 text-xs text-[#111111]/45">
                    {currentFeedback.location}
                  </p>
                </div>
              </div>

              {/* ==================================================
                  RIGHT CONTENT
              =================================================== */}

              <div className="relative">
                {/* Quote icon */}

                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#C9A45C]/15">
                  <Quote
                    size={20}
                    className="text-[#043927]"
                    strokeWidth={2.5}
                  />
                </div>

                {/* Stars */}

                <div className="mb-5 flex gap-1">
                  {Array.from({
                    length: currentFeedback.rating,
                  }).map((_, index) => (
                    <Star
                      key={index}
                      size={17}
                      fill="currentColor"
                      className="text-[#C9A45C]"
                    />
                  ))}
                </div>

                {/* Feedback */}

                <blockquote className="max-w-3xl text-xl font-medium leading-8 tracking-tight text-[#111111] sm:text-2xl sm:leading-9 lg:text-3xl lg:leading-10">
                  &ldquo;{currentFeedback.feedback}&rdquo;
                </blockquote>

                {/* Bottom line */}

                <div className="mt-7 flex items-center gap-3">
                  <span className="h-[2px] w-10 bg-[#043927]" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#111111]/40">
                    Verified Client Experience
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ====================================================
              CONTROLS
          ===================================================== */}

          <div className="mt-7 flex items-center justify-between">
            {/* Dots */}

            <div className="flex items-center gap-2">
              {feedbacks.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`View feedback from ${item.name}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active === index
                      ? "w-8 bg-[#043927]"
                      : "w-2 bg-[#111111]/15 hover:bg-[#C9A45C]"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={previousFeedback}
                aria-label="Previous feedback"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#111111]/15 bg-white text-[#111111] transition-all duration-300 hover:border-[#043927] hover:bg-[#043927] hover:text-white"
              >
                <ArrowLeft size={17} />
              </button>

              <button
                type="button"
                onClick={nextFeedback}
                aria-label="Next feedback"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#043927] text-white transition-all duration-300 hover:bg-[#C9A45C] hover:text-[#111111]"
              >
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* ====================================================
            BOTTOM TRUST ROW
        ===================================================== */}

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-3">
          <div className="rounded-xl border border-[#111111]/10 bg-white p-5 text-center">
            <p className="text-2xl font-black text-[#043927]">
              10K+
            </p>

            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#111111]/45">
              Happy Clients
            </p>
          </div>

          <div className="rounded-xl border border-[#111111]/10 bg-white p-5 text-center">
            <p className="text-2xl font-black text-[#043927]">
              12+
            </p>

            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#111111]/45">
              Years Experience
            </p>
          </div>

          <div className="rounded-xl border border-[#111111]/10 bg-white p-5 text-center">
            <p className="text-2xl font-black text-[#C9A45C]">
              5.0
            </p>

            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#111111]/45">
              Client Rating
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================
          SIMPLE ANIMATION
      ======================================================= */}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}