"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    number: "5,000+",
    label: "Residential Plots",
    short: "RESIDENTIAL",
  },
  {
    number: "350+",
    label: "Commercial Plots",
    short: "COMMERCIAL",
  },
  {
    number: "07",
    label: "Prime Location Townships",
    short: "TOWNSHIPS",
  },
  {
    number: "1K+",
    label: "Acres Under Management",
    short: "LAND",
  },
];

export default function ProjectSection() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        {
          threshold: 0.2,
        }
      );

    observer.observe(section);

    return () =>
      observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-white
        text-[#111111]
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Green glow */}

        <div
          className="
            absolute
            -left-32
            top-20
            h-72
            w-72
            rounded-full
            bg-[#043927]/[0.05]
            blur-3xl
          "
        />

        {/* Gold glow */}

        <div
          className="
            absolute
            -right-32
            bottom-20
            h-72
            w-72
            rounded-full
            bg-[#C9A45C]/[0.08]
            blur-3xl
          "
        />

        {/* Small decorative circle */}

        <div
          className="
            absolute
            right-[12%]
            top-[18%]
            h-20
            w-20
            rounded-full
            border
            border-[#C9A45C]/20
            animate-[float_5s_ease-in-out_infinite]
          "
        />

      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-5
          py-20
          sm:px-8
          sm:py-24
          lg:px-10
          lg:py-28
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className={`
            max-w-3xl
            transition-all
            duration-1000
            ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >

          {/* Label */}

          <div className="flex items-center gap-3">

            <span
              className="
                h-px
                w-10
                bg-[#C9A45C]
              "
            />

            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#043927]
              "
            >
              Our Journey
            </span>

          </div>

          {/* Heading */}

          <h2
            className="
              mt-6
              text-4xl
              font-semibold
              leading-tight
              tracking-tight
              text-[#111111]
              sm:text-5xl
              lg:text-6xl
          "
          >
            08 Years
            <span className="text-[#043927]">
              {" "}
              of Dedication
            </span>
            <br />

            <span className="text-gray-500">
              & Trust
            </span>
            <span className="text-[#C9A45C]">
              .
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mt-6
              max-w-2xl
              text-sm
              leading-7
              text-gray-600
              sm:text-base
              sm:leading-8
            "
          >
            A journey built on trust, strong
            relationships and a commitment to
            creating lasting value. With a clear
            vision for the future, we continue to
            grow and create meaningful
            opportunities.
          </p>

        </div>

        {/* =================================================
            FEATURE CARD
        ================================================= */}

        <div
          className={`
            relative
            mt-14
            overflow-hidden
            rounded-3xl
            bg-[#043927]
            transition-all
            duration-1000
            delay-200
            ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }
          `}
        >

          {/* Decorative gold line */}

          <div
            className="
              absolute
              left-0
              top-0
              h-1
              w-full
              bg-[#C9A45C]
            "
          />

          {/* Decorative circles */}

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-72
              w-72
              rounded-full
              border
              border-white/10
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -right-10
              -top-10
              h-44
              w-44
              rounded-full
              border
              border-[#C9A45C]/20
            "
          />

          <div
            className="
              relative
              grid
              items-center
              gap-10
              px-7
              py-10
              sm:px-10
              sm:py-12
              lg:grid-cols-[0.8fr_1.2fr]
              lg:px-14
              lg:py-14
            "
          >

            {/* =================================================
                LEFT
            ================================================= */}

            <div>

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-[#C9A45C]
                "
              >
                Since 2018
              </p>

              <div className="mt-5">

                <span
                  className="
                    block
                    text-7xl
                    font-bold
                    leading-none
                    tracking-[-0.06em]
                    text-white
                    sm:text-8xl
                  "
                >
                  08
                </span>

                <span
                  className="
                    mt-3
                    block
                    text-xs
                    font-medium
                    uppercase
                    tracking-[0.35em]
                    text-white/50
                  "
                >
                  Years of Excellence
                </span>

              </div>

              <div
                className="
                  mt-7
                  h-px
                  w-14
                  bg-[#C9A45C]
                "
              />

            </div>

            {/* =================================================
                RIGHT
            ================================================= */}

            <div
              className="
                border-t
                border-white/10
                pt-8
                lg:border-l
                lg:border-t-0
                lg:pl-12
                lg:pt-0
              "
            >

              <p
                className="
                  max-w-2xl
                  text-sm
                  leading-7
                  text-white/65
                  sm:text-base
                  sm:leading-8
                "
              >
                From our beginning to where we
                stand today, every milestone has
                been driven by dedication, trust
                and a long-term vision. We believe
                in building more than properties —
                we build relationships and
                opportunities for the future.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">

                {[
                  "Vision",
                  "Growth",
                  "Trust",
                ].map((item) => (
                  <span
                    key={item}
                    className="
                      rounded-full
                      border
                      border-white/15
                      px-4
                      py-2
                      text-xs
                      font-medium
                      text-white/70
                    "
                  >
                    {item}
                  </span>
                ))}

              </div>

            </div>

          </div>
        </div>

        {/* =================================================
            DIVIDER
        ================================================= */}

        <div
          className="
            my-14
            h-px
            bg-gray-200
            sm:my-16
          "
        />

        {/* =================================================
            STATS
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {stats.map(
            (stat, index) => (
              <div
                key={stat.label}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-6
                  transition-all
                  duration-700
                  hover:-translate-y-1
                  hover:border-[#C9A45C]/50
                  hover:shadow-xl
                  sm:p-7
                  ${
                    visible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }
                `}
                style={{
                  transitionDelay: `${
                    400 + index * 100
                  }ms`,
                }}
              >

                {/* Gold hover line */}

                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-0.5
                    w-0
                    bg-[#C9A45C]
                    transition-all
                    duration-500
                    group-hover:w-full
                  "
                />

                {/* Number */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >

                  <span
                    className="
                      text-[10px]
                      font-semibold
                      tracking-[0.25em]
                      text-[#043927]
                    "
                  >
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <span
                    className="
                      text-lg
                      text-[#C9A45C]
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    ↗
                  </span>

                </div>

                <h3
                  className="
                    mt-8
                    text-4xl
                    font-semibold
                    tracking-tight
                    text-[#111111]
                    sm:text-5xl
                  "
                >
                  {stat.number}
                </h3>

                <div
                  className="
                    mt-5
                    h-px
                    w-8
                    bg-[#C9A45C]
                    transition-all
                    duration-500
                    group-hover:w-14
                  "
                />

                <p
                  className="
                    mt-4
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#043927]
                  "
                >
                  {stat.short}
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-gray-500
                  "
                >
                  {stat.label}
                </p>

              </div>
            )
          )}

        </div>

        {/* =================================================
            BOTTOM MESSAGE
        ================================================= */}

        <div
          className={`
            mt-12
            flex
            flex-col
            gap-4
            border-t
            border-gray-200
            pt-7
            transition-all
            duration-1000
            delay-700
            sm:flex-row
            sm:items-center
            sm:justify-between
            ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }
          `}
        >

          <div className="flex items-center gap-3">

            <span
              className="
                h-2
                w-2
                rounded-full
                bg-[#043927]
              "
            />

            <span
              className="
                text-xs
                font-medium
                uppercase
                tracking-[0.2em]
                text-gray-500
              "
            >
              Building the future
            </span>

          </div>

          <span
            className="
              text-xs
              font-medium
              text-gray-400
            "
          >
            Vision • Growth • Trust
          </span>

        </div>

      </div>
    </section>
  );
}