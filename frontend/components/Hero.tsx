"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#043927] text-white"
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[700px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-emerald-400/10
          blur-[140px]
        "
      />

      {/* GRID */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.07]
          [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]
          [background-size:70px_70px]
        "
      />

      {/* FLOATING ORB */}
      <div
        className="
          pointer-events-none
          absolute
          left-[8%]
          top-[28%]
          h-24
          w-24
          rounded-full
          bg-emerald-300/10
          blur-xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[8%]
          top-[18%]
          h-32
          w-32
          rounded-full
          bg-lime-200/10
          blur-2xl
        "
      />

      {/* HERO CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] items-center px-6 pb-20 pt-32 sm:px-10 lg:px-16">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          
          {/* LEFT */}
          <div className="relative z-20 max-w-2xl">
            {/* BADGE */}
            <div
              className="
                mb-7
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-white/15
                bg-white/[0.06]
                px-4
                py-2
                backdrop-blur-xl
              "
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
              </span>

              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
                Premium Real Estate
              </span>
            </div>

            {/* HEADING */}
            <h1
              className="
                text-[clamp(3.5rem,8vw,8.5rem)]
                font-semibold
                leading-[0.88]
                tracking-[-0.065em]
              "
            >
              <span className="block">BUILD</span>

              <span className="block text-white/40">
                YOUR
              </span>

              <span className="relative block">
                FUTURE
                <span
                  className="
                    absolute
                    -right-2
                    top-1/2
                    hidden
                    h-4
                    w-4
                    -translate-y-1/2
                    rounded-full
                    bg-emerald-300
                    shadow-[0_0_35px_rgba(110,231,183,.8)]
                    sm:block
                  "
                />
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p
              className="
                mt-8
                max-w-lg
                text-base
                leading-7
                text-white/60
                sm:text-lg
              "
            >
              DHOLERA SIR 
              INDIA'S FIRST GREENFIELD SMART CITY.
              A CITY DESIGNED FOR TOMORROW, TAKING SHAPE TODAY.
            </p>

            {/* BUTTONS */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/projects"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-white
                  px-7
                  py-4
                  text-sm
                  font-semibold
                  text-[#043927]
                  transition-all
                  duration-300
                  hover:scale-[1.03]
                  hover:shadow-[0_15px_50px_rgba(255,255,255,.15)]
                "
              >
                Explore Projects

                <span
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-[#043927]
                    text-white
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </Link>

             
            </div>

            {/* STATS */}
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/10 pt-6">
              <div>
                <div className="text-2xl font-semibold">
                  15+
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-white/40">
                  Projects
                </div>
              </div>

              {/* <div>
                <div className="text-2xl font-semibold">
                  10K+
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-white/40">
                  Happy Clients
                </div>
              </div> */}

              <div>
                <div className="text-2xl font-semibold">
                  12+
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-white/40">
                  Years Experience
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 3D SCENE */}
          <div className="relative hidden h-[680px] items-center justify-center lg:flex">
            
            {/* 3D FLOOR */}
            <div
              className="
                absolute
                bottom-[8%]
                left-1/2
                h-[320px]
                w-[520px]
                -translate-x-1/2
                rotate-x-[65deg]
                rounded-[40px]
                border
                border-white/10
                bg-white/[0.025]
                shadow-[0_0_100px_rgba(100,255,190,.05)]
              "
              style={{
                transform: `
                  translateX(-50%)
                  perspective(1000px)
                  rotateX(65deg)
                  rotateZ(-8deg)
                  translate(
                    ${mouse.x * -10}px,
                    ${mouse.y * -5}px
                  )
                `,
              }}
            />

            {/* MAIN BUILDING CARD */}
            <div
              className="absolute left-1/2 top-1/2 z-20 w-[390px]"
              style={{
                transform: `
                  translate(-50%, -50%)
                  perspective(1200px)
                  rotateY(${mouse.x * 8}deg)
                  rotateX(${mouse.y * -6}deg)
                  translate(${mouse.x * 15}px, ${mouse.y * 10}px)
                `,
                transition: "transform 0.15s ease-out",
              }}
            >
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[35px]
                  border
                  border-white/20
                  bg-white/10
                  p-3
                  shadow-[0_40px_100px_rgba(0,0,0,.35)]
                  backdrop-blur-xl
                "
              >
                {/* IMAGE */}
                <div
                  className="
                    relative
                    h-[480px]
                    overflow-hidden
                    rounded-[27px]
                    bg-gradient-to-br
                    from-emerald-900
                    via-[#176148]
                    to-[#081f17]
                  "
                >
                  {/* Replace this div with your actual property image */}
                  <div
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/Location_Map_DMC-3.jpg')",
  }}
/>



                  {/* BUILDING */}
                   

                  {/* IMAGE LABEL */}
                  <div
                    className="
                      absolute
                      left-5
                      top-5
                      rounded-full
                      border
                      border-white/20
                      bg-black/20
                      px-4
                      py-2
                      text-xs
                      font-medium
                      uppercase
                      tracking-widest
                      text-white
                      backdrop-blur-xl
                    "
                  >
                    Featured
                  </div>

                  {/* CARD INFO */}
                  <div
                    className="
                      absolute
                      bottom-5
                      left-5
                      right-5
                      rounded-[22px]
                      border
                      border-white/15
                      bg-black/25
                      p-5
                      backdrop-blur-xl
                    "
                  >
                    <div className="text-xs uppercase tracking-widest text-white/50">
                      Premium Development
                    </div>

                    <div className="mt-2 text-xl font-semibold">
                      Your Next Address
                    </div>

                    <div className="mt-1 text-sm text-white/50">
                      Modern living • Prime location
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING CARD 1 */}
            <div
              className="
                absolute
                left-[2%]
                top-[15%]
                z-30
                w-[180px]
                rounded-[25px]
                border
                border-white/15
                bg-white/[0.08]
                p-4
                shadow-[0_25px_70px_rgba(0,0,0,.25)]
                backdrop-blur-xl
              "
              style={{
                transform: `
                  perspective(900px)
                  rotateY(${mouse.x * -10}deg)
                  rotateX(${mouse.y * 8}deg)
                  translate(${mouse.x * -20}px, ${mouse.y * -15}px)
                `,
                transition: "transform 0.2s ease-out",
              }}
            >
              <div className="text-3xl">⌂</div>

              <div className="mt-4 text-sm font-semibold">
                Premium Living
              </div>

              <div className="mt-1 text-xs leading-5 text-white/40">
                Designed for modern lifestyles.
              </div>
            </div>

            {/* FLOATING CARD 2 */}
            <div
              className="
                absolute
                bottom-[14%]
                right-[2%]
                z-30
                w-[185px]
                rounded-[25px]
                border
                border-white/15
                bg-white/[0.08]
                p-5
                shadow-[0_25px_70px_rgba(0,0,0,.25)]
                backdrop-blur-xl
              "
              style={{
                transform: `
                  perspective(900px)
                  rotateY(${mouse.x * 10}deg)
                  rotateX(${mouse.y * -7}deg)
                  translate(${mouse.x * 20}px, ${mouse.y * 12}px)
                `,
                transition: "transform 0.2s ease-out",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-white/40">
                  Growth
                </span>

                <span className="text-emerald-300">
                  ↗
                </span>
              </div>

              <div className="mt-3 text-3xl font-semibold">
                24.8%
              </div>

              <div className="mt-1 text-xs text-white/40">
                Investment potential
              </div>
            </div>

            {/* CENTER GLOW */}
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[350px]
                w-[350px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-emerald-300/10
                blur-[100px]
              "
            />
          </div>

          {/* MOBILE VISUAL */}
          <div className="relative mx-auto flex w-full max-w-md justify-center lg:hidden">
            <div
              className="
                relative
                w-full
                max-w-[390px]
                overflow-hidden
                rounded-[30px]
                border
                border-white/15
                bg-white/10
                p-3
                shadow-[0_30px_80px_rgba(0,0,0,.3)]
                backdrop-blur-xl
              "
            >
              <div
                className="
                  relative
                  h-[430px]
                  overflow-hidden
                  rounded-[24px]
                  bg-gradient-to-br
                  from-emerald-800
                  via-[#176148]
                  to-[#071c14]
                "
              >
                <div
                  className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,.2),transparent_35%)]
                  "
                />

                {/* MOBILE BUILDING */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    h-[72%]
                    w-[65%]
                    -translate-x-1/2
                    rounded-t-[25px]
                    bg-white/15
                    backdrop-blur-sm
                  "
                >
                  <div className="grid h-full grid-cols-3 gap-3 p-5">
                    {Array.from({ length: 15 }).map(
                      (_, index) => (
                        <div
                          key={index}
                          className="
                            rounded-sm
                            border
                            border-white/10
                            bg-emerald-100/20
                          "
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 right-5 rounded-[20px] bg-black/25 p-5 backdrop-blur-xl">
                  <div className="text-xs uppercase tracking-widest text-white/50">
                    Featured Development
                  </div>

                  <div className="mt-2 text-xl font-semibold">
                    Your Next Address
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div
        className="
          absolute
          bottom-7
          left-1/2
          z-20
          hidden
          -translate-x-1/2
          items-center
          gap-3
          text-[10px]
          uppercase
          tracking-[0.3em]
          text-white/30
          sm:flex
        "
      >
        <span>Scroll to explore</span>

        <span className="h-px w-12 bg-white/20" />

        <span>↓</span>
      </div>
    </section>
  );
}