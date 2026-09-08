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
  const sectionRef = useRef<HTMLElement>(null);

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 2;

      setMouse({
        x,
        y,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#043927] text-white"
    >
      {/* =====================================================
          GLOBAL AMBIENT LIGHT
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[20%] h-[350px] w-[350px] animate-pulse rounded-full bg-emerald-400/10 blur-[130px]" />

        <div
          className="absolute right-[5%] top-[10%] h-[450px] w-[450px] rounded-full bg-teal-300/[0.07] blur-[150px]"
          style={{
            transform: `translate(${mouse.x * 25}px, ${
              mouse.y * 20
            }px)`,
            transition: "transform 0.5s ease-out",
          }}
        />

        <div className="absolute bottom-[-200px] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/[0.07] blur-[150px]" />
      </div>

      {/* =====================================================
          3D GRID FLOOR
      ====================================================== */}

      <div
        className="pointer-events-none absolute bottom-[-35%] left-1/2 h-[70%] w-[140%] -translate-x-1/2 opacity-[0.08]"
        style={{
          transform: `
            translateX(-50%)
            perspective(700px)
            rotateX(68deg)
            rotateZ(${mouse.x * 1.5}deg)
          `,
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.7) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.7) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* =====================================================
          ROTATING 3D ORBIT
      ====================================================== */}

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `
            translate(-50%, -50%)
            perspective(900px)
            rotateX(${65 + mouse.y * 4}deg)
            rotateY(${mouse.x * 5}deg)
          `,
          transition: "transform 0.4s ease-out",
        }}
      >
        <div className="absolute inset-0 animate-[spin_18s_linear_infinite] rounded-full border border-white/[0.07]" />

        <div className="absolute inset-[55px] animate-[spin_14s_linear_infinite_reverse] rounded-full border border-emerald-200/[0.08]" />

        <div className="absolute inset-[110px] animate-[spin_22s_linear_infinite] rounded-full border border-white/[0.05]" />
      </div>

      {/* =====================================================
          LARGE BACKGROUND 10
      ====================================================== */}

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 select-none text-[18rem] font-black leading-none tracking-[-0.12em] text-white/[0.025] sm:text-[25rem] md:text-[32rem] lg:text-[42rem]"
        style={{
          transform: `
            translate(-50%, -50%)
            perspective(1000px)
            rotateX(${mouse.y * -3}deg)
            rotateY(${mouse.x * 5}deg)
          `,
          transition: "transform 0.5s ease-out",
        }}
      >
        10
      </div>

      {/* =====================================================
          OUTER FRAME
      ====================================================== */}

      <div className="pointer-events-none absolute inset-4 rounded-[2rem] border border-white/[0.1] sm:inset-6 lg:inset-10 lg:rounded-[3rem]" />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col justify-center px-8 py-28 sm:px-12 lg:px-20">
        {/* =================================================
            TOP LABEL
        ================================================= */}

        <div
          className={`flex items-center gap-4 transition-all duration-1000 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative h-2.5 w-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-300/50" />

            <span className="relative block h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_20px_rgba(110,231,183,.8)]" />
          </div>

          <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/45 sm:text-xs">
            Our Journey
          </span>

          <div className="h-px w-12 bg-white/15" />
        </div>

        {/* =================================================
            MAIN HERO GRID
        ================================================= */}

        <div className="mt-8 grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          {/* =================================================
              LEFT TYPOGRAPHY
          ================================================= */}

          <div
            className={`transition-all delay-100 duration-1000 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-16 opacity-0"
            }`}
          >
            <h2 className="text-[clamp(4rem,9vw,9rem)] font-light leading-[0.82] tracking-[-0.075em]">
              <span className="block font-medium text-white">
                08 Years
              </span>

              <span className="block text-white/[0.35]">
                of Dedication
              </span>

              <span className="block text-white/80">
                & Trust
                <span className="text-emerald-300">.</span>
              </span>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
              A decade of creating spaces, building
              relationships and delivering lasting value.
              Our journey continues with a vision for
              tomorrow.
            </p>
          </div>

          {/* =================================================
              3D OBJECT
          ================================================= */}

          <div
            className={`relative flex h-[360px] items-center justify-center transition-all delay-300 duration-1000 sm:h-[430px] ${
              visible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-20 scale-90 opacity-0"
            }`}
          >
            {/* Outer rotating ring */}

            <div
              className="absolute h-[290px] w-[290px] rounded-full border border-white/10 sm:h-[350px] sm:w-[350px]"
              style={{
                transform: `
                  perspective(800px)
                  rotateX(${65 + mouse.y * 5}deg)
                  rotateY(${mouse.x * 8}deg)
                `,
                transition: "transform 0.4s ease-out",
              }}
            >
              <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_25px_rgba(110,231,183,.9)]" />

              <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/40" />
            </div>

            {/* 3D cube */}

            <div
              className="relative h-[170px] w-[170px] sm:h-[210px] sm:w-[210px]"
              style={{
                transform: `
                  perspective(900px)
                  rotateX(${mouse.y * -12 + 12}deg)
                  rotateY(${mouse.x * 18 + 25}deg)
                  rotateZ(${mouse.x * 2}deg)
                `,
                transition: "transform 0.2s ease-out",
                transformStyle: "preserve-3d",
              }}
            >
              {/* FRONT */}

              <div
                className="absolute inset-0 rounded-[35px] border border-white/20 bg-white/[0.07] shadow-[inset_0_0_60px_rgba(255,255,255,.04),0_30px_100px_rgba(0,0,0,.25)] backdrop-blur-xl"
                style={{
                  transform: "translateZ(85px)",
                }}
              >
                <div className="flex h-full flex-col items-center justify-center">
                  <span className="text-7xl font-semibold tracking-[-0.08em] sm:text-8xl">
                    08
                  </span>

                  <span className="mt-2 text-[9px] uppercase tracking-[0.4em] text-emerald-200/50">
                    Years
                  </span>
                </div>
              </div>

              {/* RIGHT */}

              <div
                className="absolute inset-0 rounded-[35px] border border-white/10 bg-emerald-500/[0.06]"
                style={{
                  transform:
                    "rotateY(90deg) translateZ(85px)",
                }}
              />

              {/* LEFT */}

              <div
                className="absolute inset-0 rounded-[35px] border border-white/10 bg-black/10"
                style={{
                  transform:
                    "rotateY(-90deg) translateZ(85px)",
                }}
              />

              {/* TOP */}

              <div
                className="absolute inset-0 rounded-[35px] border border-white/10 bg-white/[0.04]"
                style={{
                  transform:
                    "rotateX(90deg) translateZ(85px)",
                }}
              />
            </div>

            {/* Floating glass card */}

            <div
              className="absolute bottom-3 right-[5%] rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,.25)] backdrop-blur-xl sm:right-[10%]"
              style={{
                transform: `
                  translate(
                    ${mouse.x * 12}px,
                    ${mouse.y * 12}px
                  )
                `,
                transition: "transform 0.3s ease-out",
              }}
            >
              <div className="text-[9px] uppercase tracking-[0.3em] text-white/35">
                Since
              </div>

              <div className="mt-1 text-xl font-medium">
                2018
              </div>
            </div>

            {/* Floating + card */}

            <div
              className="absolute left-[5%] top-[10%] flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-xl text-emerald-200/70 backdrop-blur-xl sm:left-[8%]"
              style={{
                transform: `
                  translate(
                    ${mouse.x * -15}px,
                    ${mouse.y * -15}px
                  )
                `,
                transition: "transform 0.3s ease-out",
              }}
            >
              +
            </div>
          </div>
        </div>

        {/* =================================================
            DIVIDER
        ================================================= */}

        <div className="relative my-14 h-px bg-white/10 sm:my-20">
          <div className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_20px_rgba(110,231,183,.8)]" />

          <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white/30" />
        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-all duration-700 hover:-translate-y-3 hover:border-emerald-200/30 hover:bg-white/[0.07] sm:p-7 lg:p-8 ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
              style={{
                transitionDelay: `${500 + index * 120}ms`,
              }}
            >
              {/* Hover glow */}

              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-300/10 blur-[50px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Top */}

              <div className="relative flex items-center justify-between">
                <span className="text-[9px] tracking-[0.35em] text-white/25">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-300">
                  ↗
                </span>
              </div>

              {/* Number */}

              <div className="relative mt-10">
                <h3 className="text-4xl font-medium tracking-[-0.06em] sm:text-5xl">
                  {stat.number}
                </h3>

                <div className="mt-5 h-px w-8 bg-emerald-300/60 transition-all duration-500 group-hover:w-14" />

                <p className="mt-4 text-xs uppercase tracking-[0.12em] text-white/35">
                  {stat.short}
                </p>

                <p className="mt-1 max-w-[180px] text-xs leading-5 text-white/45">
                  {stat.label}
                </p>
              </div>

              {/* Bottom shine */}

              <div className="absolute bottom-0 left-0 h-px w-0 bg-emerald-300 transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-white/25">
              Building the future
            </span>
          </div>

          <span className="hidden text-[9px] uppercase tracking-[0.35em] text-white/20 sm:block">
            Vision • Growth • Trust
          </span>
        </div>
      </div>
    </section>
  );
}