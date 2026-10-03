"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="
        relative
        min-h-[680px]
        w-full
        overflow-hidden
        bg-[#043927]
        text-white
        sm:min-h-[720px]
        md:min-h-[760px]
        lg:min-h-[800px]
        xl:min-h-[820px]
      "
    >
      {/* =====================================================
          BACKGROUND VIDEO
      ====================================================== */}

      <div
        className="absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <video
          className="
            absolute
            left-1/2
            top-1/2
            h-full
            w-full
            min-h-full
            min-w-full
            -translate-x-1/2
            -translate-y-1/2
            object-cover
            object-center
            brightness-110
          "
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source
            src="/videos/dholera-hero.mp4"
            type="video/mp4"
          />

          Your browser does not support the video element.
        </video>
      </div>

      {/* =====================================================
          VIDEO OVERLAY
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-black/10
        "
        aria-hidden="true"
      />

      {/* =====================================================
          BRAND TINT
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          bg-[#043927]/10
        "
        aria-hidden="true"
      />

      {/* =====================================================
          DESKTOP TEXT READABILITY GRADIENT
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[3]
          bg-gradient-to-r
          from-black/45
          via-black/15
          to-transparent
        "
        aria-hidden="true"
      />

      {/* =====================================================
          MOBILE READABILITY
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[3]
          bg-gradient-to-b
          from-black/10
          via-transparent
          to-black/20
          md:hidden
        "
        aria-hidden="true"
      />

      {/* =====================================================
          TOP GOLD LINE
      ====================================================== */}

      <div
        className="
          absolute
          left-0
          top-0
          z-20
          h-1
          w-full
          bg-[#C9A45C]
        "
        aria-hidden="true"
      />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[680px]
          w-full
          max-w-[1550px]
          items-center
          px-5
          py-24
          sm:min-h-[720px]
          sm:px-8
          sm:py-28
          md:min-h-[760px]
          md:py-32
          lg:min-h-[800px]
          lg:px-12
          lg:py-32
          xl:min-h-[820px]
        "
      >
        <div className="w-full max-w-4xl">

          {/* =================================================
              BRAND BADGE
          ================================================== */}

          <div
            className="
              mb-6
              inline-flex
              max-w-full
              items-center
              gap-2.5
              rounded-full
              border
              border-white/25
              bg-black/15
              px-3.5
              py-2
              backdrop-blur-md
              sm:mb-7
              sm:gap-3
              sm:px-4
              motion-reduce:transition-none
            "
          >
            <span
              className="
                relative
                flex
                h-2.5
                w-2.5
                shrink-0
              "
            >
              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  bg-[#C9A45C]
                  opacity-50
                  motion-reduce:animate-none
                "
                aria-hidden="true"
              />

              <span
                className="
                  relative
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-[#C9A45C]
                "
                aria-hidden="true"
              />
            </span>

            <span
              className="
                truncate
                text-[9px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-white
                sm:text-[10px]
                sm:tracking-[0.2em]
                md:text-xs
              "
            >
              HR REALTY INTERNATIONAL
            </span>
          </div>

          {/* =================================================
              MAIN SEO HEADING
          ================================================== */}

          <h1
            id="hero-heading"
            className="
              max-w-5xl
              text-[clamp(2.25rem,9vw,5.75rem)]
              font-black
              uppercase
              leading-[0.94]
              tracking-[-0.045em]
              sm:text-[clamp(2.75rem,7vw,5.75rem)]
              md:text-[clamp(3.25rem,6vw,5.75rem)]
            "
          >
            <span className="block text-white">
              Dholera SIR
            </span>

            <span className="mt-2 block text-[#C9A45C]">
              Real Estate
            </span>

            <span className="mt-2 block text-white">
              &amp; Property Opportunities
            </span>
          </h1>

          {/* =================================================
              ACCENT
          ================================================== */}

          <div
            className="
              mt-6
              flex
              items-center
              gap-2
              sm:mt-7
            "
            aria-hidden="true"
          >
            <span
              className="
                h-[3px]
                w-12
                rounded-full
                bg-[#C9A45C]
                sm:w-16
              "
            />

            <span
              className="
                h-[3px]
                w-7
                rounded-full
                bg-white
                sm:w-8
              "
            />

            <span
              className="
                h-[3px]
                w-3
                rounded-full
                bg-white/30
              "
            />
          </div>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <p
            className="
              mt-6
              max-w-2xl
              text-sm
              leading-6
              text-white/85
              sm:mt-7
              sm:text-base
              sm:leading-8
              lg:text-lg
            "
          >
            Explore land, plotted developments, bulk land
            opportunities and channel partner opportunities in
            Dholera SIR, Gujarat.
          </p>

          {/* =================================================
              SUPPORTING BRAND MESSAGE
          ================================================== */}

          <p
            className="
              mt-4
              max-w-2xl
              text-xs
              font-semibold
              uppercase
              tracking-[0.12em]
              text-white/70
              sm:text-sm
              sm:tracking-[0.16em]
            "
          >
            Building India&apos;s Real Estate Channel Partner Network
          </p>

          {/* =================================================
              BUTTONS
          ================================================== */}

          <div
            className="
              mt-7
              flex
              w-full
              flex-col
              gap-3
              sm:mt-8
              sm:w-auto
              sm:flex-row
            "
          >
            {/* =============================================
                CHANNEL PARTNER
            ============================================== */}

            <Link
              href="/channel-partner"
              className="
                group
                inline-flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-full
                bg-[#C9A45C]
                px-5
                py-3
                text-sm
                font-bold
                text-[#111111]
                shadow-lg
                shadow-black/10
                transition-all
                duration-300
                hover:bg-white
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#C9A45C]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#043927]
                sm:w-fit
                motion-reduce:transition-none
              "
            >
              <span>
                Become Channel Partner
              </span>

              <span
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#043927]
                  text-white
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  motion-reduce:transform-none
                  motion-reduce:transition-none
                "
              >
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                />
              </span>
            </Link>

            {/* =============================================
                BOOK SITE VISIT
            ============================================== */}

            <Link
              href="/#contact"
              className="
                inline-flex
                w-full
                items-center
                justify-center
                rounded-full
                border
                border-white/40
                bg-white/10
                px-6
                py-3
                text-sm
                font-bold
                text-white
                backdrop-blur-sm
                transition-all
                duration-300
                hover:border-white
                hover:bg-white
                hover:text-[#043927]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#043927]
                sm:w-fit
                motion-reduce:transition-none
              "
            >
              Book Site Visit
            </Link>
          </div>

          {/* =================================================
              STATS
          ================================================== */}

          <div
            className="
              mt-9
              grid
              max-w-xl
              grid-cols-3
              border-t
              border-white/25
              pt-5
              sm:mt-10
              sm:pt-6
            "
          >
            {/* PROJECTS */}

            <div className="pr-2 sm:pr-3">
              <p
                className="
                  text-xl
                  font-black
                  text-white
                  sm:text-3xl
                "
              >
                15+
              </p>

              <p
                className="
                  mt-1
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-white/60
                  sm:text-[10px]
                  sm:tracking-[0.13em]
                "
              >
                Projects
              </p>
            </div>

            {/* EXPERIENCE */}

            <div
              className="
                border-l
                border-white/20
                px-2
                sm:px-5
              "
            >
              <p
                className="
                  text-xl
                  font-black
                  text-white
                  sm:text-3xl
                "
              >
                12+
              </p>

              <p
                className="
                  mt-1
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-white/60
                  sm:text-[10px]
                  sm:tracking-[0.13em]
                "
              >
                Years Experience
              </p>
            </div>

            {/* CLIENTS */}

            <div
              className="
                border-l
                border-white/20
                pl-2
                sm:pl-5
              "
            >
              <p
                className="
                  text-xl
                  font-black
                  text-[#C9A45C]
                  sm:text-3xl
                "
              >
                10K+
              </p>

              <p
                className="
                  mt-1
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-white/60
                  sm:text-[10px]
                  sm:tracking-[0.13em]
                "
              >
                Happy Clients
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM LOCATION STRIP
      ====================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-20
          border-t
          border-white/15
          bg-black/15
          backdrop-blur-sm
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1550px]
            flex-col
            gap-2.5
            px-5
            py-3.5
            sm:gap-3
            sm:px-8
            sm:py-4
            md:flex-row
            md:items-center
            md:justify-between
            lg:px-12
          "
        >
          {/* LOCATION */}

          <div className="flex items-center gap-3">
            <span
              className="
                h-2
                w-2
                shrink-0
                rounded-full
                bg-[#C9A45C]
              "
              aria-hidden="true"
            />

            <p
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-white/70
                sm:text-[10px]
                sm:tracking-[0.18em]
              "
            >
              Dholera SIR • Gujarat
            </p>
          </div>

          {/* DISCOVER */}

          <div
            className="
              flex
              items-center
              gap-2
              text-[8px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-white/60
              sm:text-[10px]
              sm:tracking-[0.18em]
            "
          >
            <span>
              Discover the opportunity
            </span>

            <ArrowRight
              size={13}
              className="shrink-0 text-[#C9A45C]"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}