"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    question: "What is Dholera Smart City?",
    answer: (
      <>
        <p>
          Dholera Smart City is India's first and largest Greenfield Smart
          City, strategically planned under the Delhi-Mumbai Industrial
          Corridor (DMIC) — India's most ambitious industrial infrastructure
          program.
        </p>

        <p>
          Spread across ~920 sq. km, Dholera SIR (Special Investment Region)
          is designed as a global manufacturing and economic hub, backed by the
          Government of India and Government of Gujarat.
        </p>

        <p className="font-semibold text-[#043927]">
          Key infrastructure includes:
        </p>

        <ul>
          <li>Dholera International Airport (DIACL)</li>
          <li>Ahmedabad-Dholera Expressway (~109 km)</li>
          <li>
            Industrial zones (Electronics, Semiconductor, EV, Renewables)
          </li>
          <li>Rail & multimodal logistics connectivity</li>
        </ul>

        <p>
          It is being developed as a self-sustainable smart city with global
          standards, making it one of the most strategically important regions
          in India.
        </p>
      </>
    ),
  },

  {
    question: "Is Dholera Smart City a good investment in 2026?",
    answer: (
      <>
        <p>
          Yes, Dholera is widely considered a high-conviction,
          infrastructure-led investment opportunity in 2026.
        </p>

        <p>
          With ₹1 lakh+ crore infrastructure investments, ongoing execution of
          airport, expressway, and industrial zones, and major players like Tata
          Electronics (Semiconductor Fab) entering the ecosystem — Dholera is
          transitioning from planning to execution phase.
        </p>

        <blockquote>
          “Maximum wealth creation happens during the infrastructure execution
          stage.”
        </blockquote>

        <p>
          This positions 2026 as a strategic entry window before full-scale
          habitation and price maturity.
        </p>
      </>
    ),
  },

  {
    question: "What is the price of residential plots in Dholera?",
    answer: (
      <>
        <p>Plot prices in Dholera vary depending on:</p>

        <ul>
          <li>Location (TP schemes, proximity to airport/expressway)</li>
          <li>Legal status (NA / Non-NA / Zoning)</li>
          <li>Development stage</li>
        </ul>

        <p>
          Currently, Dholera offers one of the lowest entry prices among
          upcoming smart cities globally, with strong appreciation potential as
          infrastructure progresses.
        </p>

        <p>
          Early-stage markets typically see multi-fold growth over 5–10 years,
          especially in government-backed zones.
        </p>
      </>
    ),
  },

  {
    question: "Is Dholera a government-approved project?",
    answer: (
      <>
        <p>
          Yes. Dholera SIR is a fully government-notified and planned project
          under:
        </p>

        <ul>
          <li>Government of Gujarat (DSIRDA authority)</li>
          <li>Government of India (DMICDC)</li>
        </ul>

        <p>
          It is one of the few regions in India with a dedicated development
          authority, ensuring structured planning, zoning, and infrastructure
          execution.
        </p>
      </>
    ),
  },

  {
    question: "What are the latest updates in Dholera Smart City?",
    answer: (
      <>
        <p className="font-semibold text-[#043927]">
          Recent developments include:
        </p>

        <ul>
          <li>
            ✈️ Dholera International Airport - under advanced construction
            phase
          </li>

          <li>
            🛣️ Ahmedabad-Dholera Expressway nearing completion phases
          </li>

          <li>
            🏭 Tata Semiconductor Fab Unit announced (₹90,000+ Cr investment)
          </li>

          <li>
            ⚡ Large-scale renewable energy parks operational
          </li>

          <li>
            🚧 Activation Area infrastructure (roads, drainage, utilities)
            already developed
          </li>
        </ul>

        <p>
          👉 These developments are direct demand drivers for residential,
          commercial, and rental markets.
        </p>
      </>
    ),
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#043927]
        py-16
        sm:py-20
        lg:py-24
      "
    >
      {/* Decorative background */}
      <div
        className="
          pointer-events-none
          absolute
          -right-40
          -top-40
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#d8c9a3]/5
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-40
          h-[450px]
          w-[450px]
          rounded-full
          bg-black/20
          blur-3xl
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-[1500px]
          px-5
          sm:px-8
          lg:px-12
        "
      >
        {/* Header */}
        <div
          className="
            mb-12
            flex
            flex-col
            justify-between
            gap-8
            lg:mb-16
            lg:flex-row
            lg:items-end
          "
        >
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#d8c9a3]" />

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.28em]
                  text-[#d8c9a3]
                  sm:text-xs
                "
              >
                Investor Guide
              </span>
            </div>

            {/* Heading */}
            <h2
              className="
                sfpro-bold
                text-4xl
                leading-[0.95]
                tracking-[-0.04em]
                text-[#d8c9a3]
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              Frequently{" "}
              <span className="canela-reg-font font-normal text-[#d8c9a3]">
                Asked Questions
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-2xl
                text-sm
                leading-7
                text-white/60
                sm:text-base
              "
            >
              Everything you need to know about Dholera Smart City investment.
            </p>
          </div>

          {/* Question Count */}
          <div
            className="
              flex
              items-center
              gap-4
              lg:pb-1
            "
          >
            <span
              className="
                text-4xl
                font-light
                tracking-tight
                text-[#d8c9a3]
              "
            >
              {String(faqs.length).padStart(2, "0")}
            </span>

            <div className="h-8 w-px bg-white/15" />

            <span
              className="
                max-w-[100px]
                text-[10px]
                uppercase
                leading-4
                tracking-[0.2em]
                text-white/40
              "
            >
              Investment
              <br />
              Questions
            </span>
          </div>
        </div>

        {/* FAQ Grid */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`
                  group
                  overflow-hidden
                  rounded-2xl
                  border
                  transition-all
                  duration-500
                  ${
                    isOpen
                      ? "border-[#d8c9a3]/40 bg-[#f7f4eb]"
                      : "border-white/10 bg-white/[0.045] hover:border-[#d8c9a3]/30 hover:bg-white/[0.07]"
                  }
                `}
              >
                {/* Question */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="
                    flex
                    w-full
                    items-center
                    gap-4
                    px-5
                    py-5
                    text-left
                    sm:px-6
                    sm:py-6
                  "
                >
                  {/* Number */}
                  <span
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      text-[10px]
                      font-medium
                      tracking-[0.12em]
                      transition-all
                      duration-500
                      ${
                        isOpen
                          ? "border-[#043927] bg-[#043927] text-[#d8c9a3]"
                          : "border-white/15 bg-transparent text-white/40 group-hover:border-[#d8c9a3]/40 group-hover:text-[#d8c9a3]"
                      }
                    `}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Question */}
                  <span
                    className={`
                      flex-1
                      text-sm
                      font-medium
                      leading-6
                      transition-colors
                      duration-300
                      sm:text-base
                      ${
                        isOpen
                          ? "text-[#043927]"
                          : "text-white group-hover:text-[#d8c9a3]"
                      }
                    `}
                  >
                    {faq.question}
                  </span>

                  {/* Icon */}
                  <span
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      transition-all
                      duration-500
                      ${
                        isOpen
                          ? "rotate-45 bg-[#043927] text-[#d8c9a3]"
                          : "bg-white/5 text-white/60 group-hover:bg-[#d8c9a3] group-hover:text-[#043927]"
                      }
                    `}
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 5V19M5 12H19"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                <div
                  id={`faq-answer-${index}`}
                  className={`
                    grid
                    transition-[grid-template-rows,opacity]
                    duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <div
                      className="
                        faq-answer-content
                        border-t
                        border-[#043927]/10
                        px-5
                        pb-6
                        pt-5
                        sm:px-6
                        sm:pb-7
                      "
                    >
                      <div
                        className="
                          max-w-3xl
                          text-sm
                          leading-7
                          text-[#043927]/70
                          sm:text-[15px]
                        "
                      >
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center lg:mt-12">
          
        </div>
      </div>
    </section>
  );
}