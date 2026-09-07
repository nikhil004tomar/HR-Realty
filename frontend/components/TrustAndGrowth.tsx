"use client";

import { useEffect, useRef, useState } from "react";

const videos = [
  {
    href: "https://youtube.com/shorts/VBEGFSuoz7s?feature=share",
    image: "/images/bulk-land/index5.webp",
  },
  {
    href: "https://youtube.com/shorts/VFuwjm2HcXA?feature=share",
    image: "/images/bulk-land/index5.webp",
  },
  {
    href: "https://youtube.com/shorts/Xi58BJd4mKk?si=13qbcfwik97JiT07",
    image: "/images/bulk-land/index5.webp",
  },
  {
    href: "https://youtube.com/shorts/yuYfqpoZroM?si=fORXDnxvUuQKuS7Y",
    image: "/images/bulk-land/index5.webp",
  },
  {
    href: "https://youtube.com/shorts/jAI4cmmXIvY?si=25zLswfeokDCgImS",
    image: "/images/bulk-land/index5.webp",
  },
  {
    href: "https://youtube.com/shorts/uGWnDsEbbkY?si=clT-mMVCEcPJ4Zfs",
    image: "/images/bulk-land/index5.webp",
  },
];

export default function TrustAndGrowth() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToSlide = (direction: "next" | "prev") => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const card = slider.querySelector<HTMLElement>(
      "[data-trust-card]"
    );

    if (!card) return;

    const gap = 20;
    const cardWidth = card.offsetWidth + gap;

    const maxIndex = videos.length - 1;

    let newIndex =
      direction === "next"
        ? activeIndex + 1
        : activeIndex - 1;

    if (newIndex < 0) newIndex = maxIndex;
    if (newIndex > maxIndex) newIndex = 0;

    setActiveIndex(newIndex);

    slider.scrollTo({
      left: newIndex * cardWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const handleScroll = () => {
      const card = slider.querySelector<HTMLElement>(
        "[data-trust-card]"
      );

      if (!card) return;

      const gap = 20;
      const cardWidth = card.offsetWidth + gap;

      const index = Math.round(slider.scrollLeft / cardWidth);

      setActiveIndex(
        Math.min(Math.max(index, 0), videos.length - 1)
      );
    };

    slider.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="trust-growth-section relative overflow-hidden bg-[#043927]">

      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-[#d8c9a3]/5 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-black/20 blur-3xl" />

      <div className="relative px-5 py-16 sm:px-8 md:py-20 lg:px-12 lg:py-24">

        <div className="mx-auto max-w-[1600px]">

          {/* Header */}
          <div className="mb-10 flex items-end justify-between gap-6 md:mb-12 lg:mb-14">

            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-[#d8c9a3]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#d8c9a3] sm:text-xs">
                  Our Journey
                </span>
              </div>

              <h2 className="sfpro-bold text-4xl leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Trust{" "}
                <span className="canela-reg-font font-normal text-[#d8c9a3]">
                  and Growth
                </span>
              </h2>
            </div>

            {/* Desktop Controls */}
            <div className="hidden items-center gap-3 md:flex">

              <button
                type="button"
                onClick={() => scrollToSlide("prev")}
                aria-label="Previous video"
                className="
                  group
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-white/5
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:border-[#d8c9a3]/60
                  hover:bg-[#d8c9a3]
                  hover:text-[#043927]
                "
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 group-hover:-translate-x-0.5"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => scrollToSlide("next")}
                aria-label="Next video"
                className="
                  group
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-white/5
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:border-[#d8c9a3]/60
                  hover:bg-[#d8c9a3]
                  hover:text-[#043927]
                "
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

            </div>
          </div>

          {/* Video Slider */}
          <div className="relative">

            <div
              ref={sliderRef}
              className="
                trust-growth-slider
                flex
                snap-x
                snap-mandatory
                gap-5
                overflow-x-auto
                pb-4
                [-ms-overflow-style:none]
                [scrollbar-width:none]
              "
            >

              {videos.map((video, index) => (
                <a
                  key={video.href}
                  data-trust-card
                  href={video.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    trust-growth-card
                    group
                    relative
                    block
                    min-w-[82%]
                    snap-start
                    overflow-hidden
                    rounded-[22px]
                    border
                    border-white/10
                    bg-[#063f2f]
                    shadow-[0_20px_60px_rgba(0,0,0,0.22)]
                    sm:min-w-[48%]
                    lg:min-w-[32%]
                  "
                >

                  <div className="relative aspect-[4/5] overflow-hidden">

                    {/* Image */}
                    <img
                      src={video.image}
                      alt="Trust and Growth"
                      loading={index < 3 ? "eager" : "lazy"}
                      className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-1000
                        ease-out
                        group-hover:scale-[1.06]
                      "
                    />

                    {/* Green cinematic overlay */}
                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#043927]/80
                        via-[#043927]/10
                        to-transparent
                        opacity-80
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                      "
                    />

                    {/* Hover highlight */}
                    <div
                      className="
                        absolute
                        inset-0
                        bg-[#d8c9a3]/0
                        transition-all
                        duration-500
                        group-hover:bg-[#d8c9a3]/5
                      "
                    />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">

                      <div
                        className="
                          flex
                          h-[68px]
                          w-[68px]
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/30
                          bg-[#043927]/80
                          shadow-[0_10px_40px_rgba(0,0,0,0.3)]
                          backdrop-blur-md
                          transition-all
                          duration-500
                          group-hover:scale-110
                          group-hover:border-[#d8c9a3]/70
                          group-hover:bg-[#043927]
                        "
                      >
                        <img
                          src="/images/icon/Video_Play_icon.svg"
                          alt="Play"
                          width={44}
                          height={44}
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                    </div>

                    {/* Bottom accent */}
                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        h-[2px]
                        w-0
                        bg-[#d8c9a3]
                        transition-all
                        duration-700
                        group-hover:w-full
                      "
                    />

                  </div>

                </a>
              ))}

            </div>

            {/* Progress */}
            <div className="mt-6 flex items-center justify-between">

              {/* Progress line */}
              <div className="flex flex-1 items-center gap-2">

                {videos.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to video ${index + 1}`}
                    onClick={() => {
                      if (!sliderRef.current) return;

                      const card =
                        sliderRef.current.querySelector<HTMLElement>(
                          "[data-trust-card]"
                        );

                      if (!card) return;

                      const gap = 20;
                      const cardWidth =
                        card.offsetWidth + gap;

                      setActiveIndex(index);

                      sliderRef.current.scrollTo({
                        left: index * cardWidth,
                        behavior: "smooth",
                      });
                    }}
                    className="group h-5 flex-1"
                  >
                    <span
                      className={`
                        block
                        h-[2px]
                        w-full
                        rounded-full
                        transition-all
                        duration-500
                        ${
                          index === activeIndex
                            ? "bg-[#d8c9a3]"
                            : "bg-white/15 group-hover:bg-white/30"
                        }
                      `}
                    />
                  </button>
                ))}

              </div>

              {/* Counter */}
              <div className="ml-5 hidden min-w-[58px] text-right sm:block">
                <span className="text-xs tracking-[0.2em] text-white/40">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>

                <span className="mx-1 text-xs text-white/20">
                  /
                </span>

                <span className="text-xs tracking-[0.2em] text-white/40">
                  {String(videos.length).padStart(2, "0")}
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}