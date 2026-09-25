"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { gsap } from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

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
        )
        .fromTo(
          imageRef.current,
          {
            opacity: 0,
            x: 40,
            scale: 0.97,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
          },
          "-=0.5"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-white text-[#111111]"
    >
      {/* =====================================================
          TOP GREEN LINE
      ====================================================== */}

      <div className="absolute left-0 top-0 h-1 w-full bg-[#043927]" />

      {/* =====================================================
          VERY SUBTLE BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-[#043927]/[0.025] blur-3xl" />

      <div className="mx-auto max-w-[1550px] px-5 pb-14 pt-24 sm:px-8 sm:pb-18 sm:pt-28 lg:px-12 lg:pb-20 lg:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12 xl:gap-16">

          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <div className="max-w-xl">

            {/* =================================================
                BRAND BADGE
            ================================================== */}

            <div className="hero-badge mb-6 inline-flex items-center gap-3 rounded-full border border-[#043927]/15 bg-[#043927]/[0.035] px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C9A45C] opacity-40" />

                <span className="relative h-2.5 w-2.5 rounded-full bg-[#C9A45C]" />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#043927] sm:text-xs">
                HR REALTY INTERNATIONAL
              </span>
            </div>

            {/* =================================================
                MAIN HEADING
            ================================================== */}

            <h1 className="text-[clamp(2.15rem,4.3vw,4.25rem)] font-black uppercase leading-[0.94] tracking-[-0.045em]">

              <span className="hero-title-line block text-[#111111]">
                Building India&apos;s
                <span className="hero-title-line mt-1 block text-[#043927]">
                Largest Real Estate
                <span className="hero-title-line mt-1 block text-[#111111]">
                Channel Partner Network
              </span>
              </span>
              </span>

              {/*<span className="hero-title-line mt-1 block text-[#043927]">
                Largest Real Estate
              </span>*/}

              {/*<span className="hero-title-line mt-1 block text-[#111111]">
                Channel Partner Network
              </span>*/}

            </h1>

            {/* =================================================
                ACCENT
            ================================================== */}

            <div className="mt-6 flex items-center gap-2">
              <span className="h-[3px] w-14 rounded-full bg-[#C9A45C]" />

              <span className="h-[3px] w-7 rounded-full bg-[#043927]" />

              <span className="h-[3px] w-2 rounded-full bg-black/15" />
            </div>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <p className="hero-description mt-6 max-w-lg text-sm leading-7 text-black/55 sm:text-base sm:leading-8">
              Dholera SIR — India&apos;s emerging greenfield smart city.
              A city designed for tomorrow, taking shape today.
            </p>

            {/* =================================================
                BUTTONS
            ================================================== */}

            <div className="hero-buttons mt-7 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/projects"
                className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#043927] px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#111111]"
              >
                <span>
                  Explore Projects
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C9A45C] text-[#111111] transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={16} />
                </span>
              </Link>

              <Link
                href="/#contact"
                className="inline-flex w-fit items-center justify-center rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-bold text-[#111111] transition-all duration-300 hover:border-[#043927] hover:bg-[#043927] hover:text-white"
              >
                Book Site Visit
              </Link>

            </div>

            {/* =================================================
                STATS
            ================================================== */}

            <div className="hero-stat mt-9 grid max-w-lg grid-cols-3 border-t border-black/10 pt-5">

              {/* PROJECTS */}

              <div className="pr-3">
                <p className="text-2xl font-black text-[#043927] sm:text-3xl">
                  15+
                </p>

                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-black/40 sm:text-[10px]">
                  Projects
                </p>
              </div>

              {/* EXPERIENCE */}

              <div className="border-l border-black/10 px-3 sm:px-5">
                <p className="text-2xl font-black text-[#043927] sm:text-3xl">
                  12+
                </p>

                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-black/40 sm:text-[10px]">
                  Years Experience
                </p>
              </div>

              {/* CLIENTS */}

              <div className="border-l border-black/10 pl-3 sm:pl-5">
                <p className="text-2xl font-black text-[#C9A45C] sm:text-3xl">
                  10K+
                </p>

                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-black/40 sm:text-[10px]">
                  Happy Clients
                </p>
              </div>

            </div>
          </div>

          {/* =====================================================
              LARGE IMAGE AREA
              
              Green background shape removed.
              Gold corner decoration removed.
          ====================================================== */}

          <div
            ref={imageRef}
            className="relative mx-auto w-full max-w-[900px]"
          >

            {/* =================================================
                MAIN IMAGE CARD
            ================================================== */}

            <div className="relative overflow-hidden rounded-[1.75rem] border border-black/10 bg-[#f7f7f5] shadow-[0_25px_70px_rgba(17,17,17,0.10)]">

              {/* Gold top line */}

              <div className="absolute left-0 right-0 top-0 z-20 h-1 bg-[#C9A45C]" />

              {/* =================================================
                  MAP
              ================================================== */}

              <div className="relative aspect-[16/9] w-full">

                <img
                  src="/22village.png"
                  alt="Dholera Smart City Location Map"
                  className="h-full w-full object-contain p-3 transition-transform duration-700 hover:scale-[1.01] sm:p-5 lg:p-7"
                />

              </div>

              {/* =================================================
                  IMAGE INFORMATION
              ================================================== */}

              <div className="border-t border-black/10 bg-white px-5 py-4 sm:px-7 sm:py-5">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  {/* LOCATION */}

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#043927]/5 text-[#043927]">
                      <MapPin size={17} />
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/35">
                        Location
                      </p>

                      <p className="mt-0.5 text-sm font-bold text-[#111111]">
                        Dholera, Gujarat
                      </p>
                    </div>

                  </div>

                  {/* DEVELOPMENT */}

                  <div className="flex items-center gap-3">

                    <div className="hidden h-8 w-px bg-black/10 sm:block" />

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/35 sm:text-right">
                        Development
                      </p>

                      <p className="mt-0.5 text-sm font-bold text-[#043927] sm:text-right">
                        Dholera SIR
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          BOTTOM STRIP
      ====================================================== */}

      <div className="border-t border-black/10 bg-[#fafafa]">

        <div className="mx-auto flex max-w-[1550px] flex-col gap-3 px-5 py-4 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">

          <div className="flex items-center gap-3">

            <span className="h-2 w-2 rounded-full bg-[#C9A45C]" />

            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/40 sm:text-[10px]">
              Dholera SIR • Gujarat
            </p>

          </div>

          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-black/30 sm:text-[10px]">

            <span>
              Discover the opportunity
            </span>

            <ArrowRight
              size={13}
              className="text-[#043927]"
            />

          </div>

        </div>
      </div>

    </section>
  );
}