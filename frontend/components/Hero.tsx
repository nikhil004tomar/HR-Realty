"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        ".hero-badge",
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        }
      )
        .fromTo(
          ".hero-title-line",
          {
            opacity: 0,
            y: 22,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
          },
          "-=0.2"
        )
        .fromTo(
          ".hero-description",
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.25"
        )
        .fromTo(
          ".hero-buttons",
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.2"
        )
        .fromTo(
          ".hero-stat",
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          "-=0.2"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[720px] overflow-hidden bg-[#043927] text-white sm:min-h-[760px] lg:min-h-[820px]"
    >
      {/* =====================================================
          BACKGROUND VIDEO
      ====================================================== */}

      <video
        className="absolute inset-0 h-full w-full object-cover brightness-110"
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
      </video>

      {/* =====================================================
          VERY LIGHT VIDEO OVERLAY
      ====================================================== */}

      <div className="absolute inset-0 bg-black/10" />

      {/* =====================================================
          SUBTLE HR GREEN BRAND TINT
      ====================================================== */}

      <div className="absolute inset-0 bg-[#043927]/10" />

      {/* =====================================================
          LEFT GRADIENT
          
          Keeps the text readable while allowing the
          video to remain bright and visible.
      ====================================================== */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />

      {/* =====================================================
          TOP GOLD LINE
      ====================================================== */}

      <div className="absolute left-0 top-0 z-20 h-1 w-full bg-[#C9A45C]" />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-[1550px] items-center px-5 py-24 sm:min-h-[760px] sm:px-8 sm:py-28 lg:min-h-[820px] lg:px-12 lg:py-32">

        <div className="max-w-4xl">

          {/* =================================================
              BRAND BADGE
          ================================================== */}

          <div className="hero-badge mb-7 inline-flex items-center gap-3 rounded-full border border-white/25 bg-black/15 px-4 py-2 backdrop-blur-md">

            <span className="relative flex h-2.5 w-2.5">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C9A45C] opacity-50" />

              <span className="relative h-2.5 w-2.5 rounded-full bg-[#C9A45C]" />

            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white sm:text-xs">
              HR REALTY INTERNATIONAL
            </span>

          </div>

          {/* =================================================
              MAIN HEADING
          ================================================== */}

          <h1 className="max-w-5xl text-[clamp(2.5rem,6vw,5.75rem)] font-black uppercase leading-[0.92] tracking-[-0.045em]">

            <span className="hero-title-line block text-white">
              Building India&apos;s
            </span>

            <span className="hero-title-line mt-2 block text-[#C9A45C]">
              Largest Real Estate
            </span>

            <span className="hero-title-line mt-2 block text-white">
              Channel Partner Network
            </span>

          </h1>

          {/* =================================================
              ACCENT
          ================================================== */}

          <div className="mt-7 flex items-center gap-2">

            <span className="h-[3px] w-16 rounded-full bg-[#C9A45C]" />

            <span className="h-[3px] w-8 rounded-full bg-white" />

            <span className="h-[3px] w-3 rounded-full bg-white/30" />

          </div>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <p className="hero-description mt-7 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8 lg:text-lg">
            Dholera SIR — India&apos;s emerging greenfield smart city.
            A city designed for tomorrow, taking shape today.
          </p>

          {/* =================================================
              BUTTONS
          ================================================== */}

          <div className="hero-buttons mt-8 flex flex-col gap-3 sm:flex-row">

            {/* EXPLORE PROJECTS */}

            <Link
              href="/channel-partner"
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#C9A45C] px-5 py-3 text-sm font-bold text-[#111111] shadow-lg shadow-black/10 transition-all duration-300 hover:bg-white"
            >

              <span>
                Become Channel Partner
              </span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#043927] text-white transition-transform duration-300 group-hover:translate-x-1">

                <ArrowRight size={16} />

              </span>

            </Link>

            {/* BOOK SITE VISIT */}

            <Link
              href="/#contact"
              className="inline-flex w-fit items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-[#043927]"
            >
              Book Site Visit
            </Link>

          </div>

          {/* =================================================
              STATS
          ================================================== */}

          <div className="hero-stat mt-10 grid max-w-xl grid-cols-3 border-t border-white/25 pt-6">

            {/* PROJECTS */}

            <div className="pr-3">

              <p className="text-2xl font-black text-white sm:text-3xl">
                15+
              </p>

              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-white/60 sm:text-[10px]">
                Projects
              </p>

            </div>

            {/* EXPERIENCE */}

            <div className="border-l border-white/20 px-3 sm:px-5">

              <p className="text-2xl font-black text-white sm:text-3xl">
                12+
              </p>

              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-white/60 sm:text-[10px]">
                Years Experience
              </p>

            </div>

            {/* CLIENTS */}

            <div className="border-l border-white/20 pl-3 sm:pl-5">

              <p className="text-2xl font-black text-[#C9A45C] sm:text-3xl">
                10K+
              </p>

              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-white/60 sm:text-[10px]">
                Happy Clients
              </p>

            </div>

          </div>

        </div>
      </div>

      {/* =====================================================
          BOTTOM LOCATION STRIP
      ====================================================== */}

      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/15 bg-black/15 backdrop-blur-sm">

        <div className="mx-auto flex max-w-[1550px] flex-col gap-3 px-5 py-4 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">

          {/* LOCATION */}

          <div className="flex items-center gap-3">

            <span className="h-2 w-2 rounded-full bg-[#C9A45C]" />

            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/70 sm:text-[10px]">
              Dholera SIR • Gujarat
            </p>

          </div>

          {/* DISCOVER */}

          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white/60 sm:text-[10px]">

            <span>
              Discover the opportunity
            </span>

            <ArrowRight
              size={13}
              className="text-[#C9A45C]"
            />

          </div>

        </div>
      </div>

    </section>
  );
}