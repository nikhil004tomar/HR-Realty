"use client";

import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "What is Dholera Smart City?",
    answer: (
      <>
        <p>
          Dholera Smart City is India&apos;s first and largest Greenfield
          Smart City, strategically planned under the Delhi-Mumbai
          Industrial Corridor (DMIC).
        </p>

        <p>
          Spread across approximately 920 sq. km, Dholera SIR
          (Special Investment Region) is designed as a global
          manufacturing and economic hub.
        </p>

        <p className="font-semibold text-[#043927]">
          Key infrastructure includes:
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>Dholera International Airport</li>
          <li>Ahmedabad-Dholera Expressway</li>
          <li>
            Industrial zones including Electronics, Semiconductor,
            EV and Renewable Energy
          </li>
          <li>Rail and multimodal logistics connectivity</li>
        </ul>

        <p>
          It is being developed as a planned smart city with modern
          infrastructure and global standards.
        </p>
      </>
    ),
  },

  {
    question: "Is Dholera Smart City a good investment in 2026?",
    answer: (
      <>
        <p>
          Dholera is considered an infrastructure-led development
          opportunity, with major investments and projects being
          developed across the region.
        </p>

        <p>
          The development of the airport, expressway, industrial
          zones and other infrastructure is expected to influence
          the region&apos;s future growth.
        </p>

        <blockquote className="my-5 border-l-2 border-[#C9A45C] pl-4 font-medium italic text-[#043927]">
          &ldquo;Maximum wealth creation happens during the
          infrastructure execution stage.&rdquo;
        </blockquote>

        <p>
          Investors should evaluate individual projects, locations,
          legal documentation and development status before making
          an investment decision.
        </p>
      </>
    ),
  },

  {
    question: "What is the price of residential plots in Dholera?",
    answer: (
      <>
        <p>
          Plot prices in Dholera vary depending on several factors,
          including:
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>Location and connectivity</li>
          <li>Proximity to major infrastructure</li>
          <li>Legal status and zoning</li>
          <li>Development stage</li>
          <li>Plot size and project specifications</li>
        </ul>

        <p>
          For current pricing, it is important to evaluate the
          specific project, documentation and location rather than
          relying on a general market price.
        </p>
      </>
    ),
  },

  {
    question: "Is Dholera a government-approved project?",
    answer: (
      <>
        <p>
          Dholera SIR is a government-notified and planned
          development in Gujarat.
        </p>

        <p>
          The region is supported by government planning and
          development authorities associated with the Dholera SIR
          and Delhi-Mumbai Industrial Corridor.
        </p>

        <p>
          Individual land parcels and real estate projects should
          still be independently verified for title, approvals,
          zoning and other applicable documentation before purchase.
        </p>
      </>
    ),
  },

  {
    question: "What are the latest updates in Dholera Smart City?",
    answer: (
      <>
        <p className="font-semibold text-[#043927]">
          Major areas of development include:
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>
            Dholera International Airport development
          </li>

          <li>
            Ahmedabad-Dholera Expressway development
          </li>

          <li>
            Semiconductor and electronics ecosystem
          </li>

          <li>
            Renewable energy development
          </li>

          <li>
            Activation Area infrastructure including roads,
            drainage and utilities
          </li>
        </ul>

        <p>
          These infrastructure developments are expected to
          contribute to the long-term development of residential,
          commercial and industrial opportunities in the region.
        </p>
      </>
    ),
  },
];

// ============================================================
// COMPONENT
// ============================================================

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // ==========================================================
  // TOGGLE
  // ==========================================================

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* ======================================================
          TOP BORDER
      ======================================================= */}

      <div className="absolute left-0 top-0 h-[2px] w-full bg-[#043927]" />

      {/* ======================================================
          CONTAINER
      ======================================================= */}

      <div className="relative mx-auto max-w-[1250px] px-5 sm:px-8 lg:px-12">
        {/* ====================================================
            HEADER
        ===================================================== */}

        <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          {/* LEFT */}

          <div className="max-w-3xl">
            {/* Label */}

            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#C9A45C]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
                Investor Guide
              </span>
            </div>

            {/* Heading */}

            <h2 className="text-4xl font-black leading-[1] tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">
              Frequently Asked{" "}
              <span className="text-[#043927]">
                Questions
              </span>
              <span className="text-[#C9A45C]">
                .
              </span>
            </h2>

            {/* Gold line */}

            <div className="mt-5 h-[2px] w-16 bg-[#C9A45C]" />

            {/* Description */}

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#111111]/60 sm:text-base">
              Everything you need to know about Dholera Smart City,
              real estate opportunities and the investment process.
            </p>
          </div>

          {/* ==================================================
              QUESTION COUNT
          =================================================== */}

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#043927]/5">
              <HelpCircle
                size={22}
                className="text-[#043927]"
              />
            </div>

            <div>
              <p className="text-2xl font-black text-[#043927]">
                {String(faqs.length).padStart(2, "0")}
              </p>

              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#111111]/40">
                Questions
              </p>
            </div>
          </div>
        </div>

        {/* ====================================================
            FAQ LIST
        ===================================================== */}

        <div className="mx-auto max-w-5xl">
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-xl border transition-all duration-300 sm:rounded-2xl ${
                    isOpen
                      ? "border-[#043927]/20 bg-[#f9faf9] shadow-[0_10px_30px_rgba(4,57,39,0.05)]"
                      : "border-[#111111]/10 bg-white hover:border-[#C9A45C]/50"
                  }`}
                >
                  {/* =================================================
                      QUESTION BUTTON
                  ================================================== */}

                  <button
                    type="button"
                    onClick={() =>
                      toggleFAQ(index)
                    }
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="flex w-full items-center gap-4 px-4 py-5 text-left sm:px-6 sm:py-6"
                  >
                    {/* Number */}

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold tracking-wider transition-all duration-300 ${
                        isOpen
                          ? "border-[#043927] bg-[#043927] text-white"
                          : "border-[#111111]/10 bg-[#fafafa] text-[#111111]/40"
                      }`}
                    >
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    {/* Question */}

                    <span
                      className={`flex-1 text-sm font-semibold leading-6 transition-colors duration-300 sm:text-base ${
                        isOpen
                          ? "text-[#043927]"
                          : "text-[#111111]"
                      }`}
                    >
                      {faq.question}
                    </span>

                    {/* Chevron */}

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "bg-[#C9A45C] text-[#111111]"
                          : "bg-[#043927]/5 text-[#043927]"
                      }`}
                    >
                      <ChevronDown
                        size={17}
                        className={`transition-transform duration-300 ${
                          isOpen
                            ? "rotate-180"
                            : "rotate-0"
                        }`}
                      />
                    </span>
                  </button>

                  {/* =================================================
                      ANSWER
                  ================================================== */}

                  <div
                    id={`faq-answer-${index}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-[#043927]/10 px-4 pb-6 pt-5 sm:px-6 sm:pb-7">
                        <div className="max-w-4xl space-y-4 text-sm leading-7 text-[#111111]/65 sm:text-[15px]">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ====================================================
            BOTTOM CTA
        ===================================================== */}

        <div className="mx-auto mt-10 max-w-5xl border-t border-[#111111]/10 pt-7 sm:mt-12 sm:pt-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-base font-bold text-[#111111] sm:text-lg">
                Still have questions?
              </p>

              <p className="mt-1 text-sm text-[#111111]/50">
                Our team is happy to help you understand the
                opportunities.
              </p>
            </div>

            <Link
              href="#contact"
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#043927] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#111111]"
            >
              <span>Talk to Our Team</span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C9A45C] text-[#111111] transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>

        {/* ====================================================
            BOTTOM BRAND LINE
        ===================================================== */}

        <div className="mt-10 flex items-center justify-center gap-3 sm:mt-12">
          <span className="h-px w-10 bg-[#111111]/10" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#111111]/30">
            Dholera SIR • Gujarat
          </span>

          <span className="h-px w-10 bg-[#111111]/10" />
        </div>
      </div>
    </section>
  );
}