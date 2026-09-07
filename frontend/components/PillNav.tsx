"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";
import { gsap } from "gsap";

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

// ============================================================
// LOGO
// ============================================================
// File:
// public/images/logo.png
//
// Browser URL:
// /images/logo.png
// ============================================================

const LOGO_SRC = "/images/logo.png";

const PillNav: React.FC<PillNavProps> = ({
  items = [],
  activeHref,
  className = "",
  ease = "power3.out",
  baseColor = "#ffffff",
  pillColor = "#ffffff",
  hoveredPillTextColor = "#ffffff",
  pillTextColor = "#111111",
  onMobileMenuClick,
  initialLoadAnimation = true,
}) => {
  // ==========================================================
  // STATE
  // ==========================================================

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const resolvedPillTextColor =
    pillTextColor || "#111111";

  // ==========================================================
  // REFS
  // ==========================================================

  const circleRefs =
    useRef<Array<HTMLSpanElement | null>>([]);

  const tlRefs =
    useRef<Array<gsap.core.Timeline | null>>([]);

  const activeTweenRefs =
    useRef<Array<gsap.core.Tween | null>>([]);

  const logoImgRef =
    useRef<HTMLImageElement | null>(null);

  const logoTweenRef =
    useRef<gsap.core.Tween | null>(null);

  const hamburgerRef =
    useRef<HTMLButtonElement | null>(null);

  const mobileMenuRef =
    useRef<HTMLDivElement | null>(null);

  const navItemsRef =
    useRef<HTMLDivElement | null>(null);

  const logoRef =
    useRef<HTMLAnchorElement | null>(null);

  // ==========================================================
  // NAVIGATION ANIMATION
  // ==========================================================

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) {
          return;
        }

        const pill =
          circle.parentElement as HTMLElement;

        const rect =
          pill.getBoundingClientRect();

        const { width: w, height: h } =
          rect;

        if (!w || !h) {
          return;
        }

        // ------------------------------------------------------
        // Calculate hover circle
        // ------------------------------------------------------

        const R =
          ((w * w) / 4 + h * h) /
          (2 * h);

        const D =
          Math.ceil(2 * R) + 2;

        const delta =
          Math.ceil(
            R -
              Math.sqrt(
                Math.max(
                  0,
                  R * R -
                    (w * w) / 4
                )
              )
          ) + 1;

        const originY =
          D - delta;

        circle.style.width =
          `${D}px`;

        circle.style.height =
          `${D}px`;

        circle.style.bottom =
          `-${delta}px`;

        // ------------------------------------------------------
        // Initial circle state
        // ------------------------------------------------------

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin:
            `50% ${originY}px`,
        });

        // ------------------------------------------------------
        // Labels
        // ------------------------------------------------------

        const label =
          pill.querySelector<HTMLElement>(
            ".pill-label"
          );

        const hoverLabel =
          pill.querySelector<HTMLElement>(
            ".pill-label-hover"
          );

        if (label) {
          gsap.set(label, {
            y: 0,
          });
        }

        if (hoverLabel) {
          gsap.set(hoverLabel, {
            y: h + 12,
            opacity: 0,
          });
        }

        // ------------------------------------------------------
        // Find index
        // ------------------------------------------------------

        const index =
          circleRefs.current.indexOf(
            circle
          );

        if (index === -1) {
          return;
        }

        // Kill old timeline

        tlRefs.current[index]?.kill();

        // ------------------------------------------------------
        // Create timeline
        // ------------------------------------------------------

        const tl =
          gsap.timeline({
            paused: true,
          });

        // Hover circle

        tl.to(
          circle,
          {
            scale: 1.2,
            xPercent: -50,
            duration: 0.7,
            ease,
            overwrite: "auto",
          },
          0
        );

        // Normal label

        if (label) {
          tl.to(
            label,
            {
              y: -(h + 8),
              duration: 0.7,
              ease,
              overwrite: "auto",
            },
            0
          );
        }

        // Hover label

        if (hoverLabel) {
          tl.to(
            hoverLabel,
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease,
              overwrite: "auto",
            },
            0
          );
        }

        tlRefs.current[index] =
          tl;
      });
    };

    // ----------------------------------------------------------
    // Initial layout
    // ----------------------------------------------------------

    layout();

    // ----------------------------------------------------------
    // Resize
    // ----------------------------------------------------------

    const resizeHandler = () => {
      layout();
    };

    window.addEventListener(
      "resize",
      resizeHandler
    );

    // ----------------------------------------------------------
    // Fonts ready
    // ----------------------------------------------------------

    if (document.fonts) {
      document.fonts.ready
        .then(layout)
        .catch(() => {});
    }

    // ==========================================================
    // MOBILE MENU INITIAL STATE
    // ==========================================================

    const menu =
      mobileMenuRef.current;

    if (menu) {
      gsap.set(menu, {
        visibility: "hidden",
        opacity: 0,
        y: -10,
      });
    }

    // ==========================================================
    // INITIAL LOAD ANIMATION
    // ==========================================================

    if (initialLoadAnimation) {
      const logo =
        logoRef.current;

      const navItems =
        navItemsRef.current;

      if (logo) {
        gsap.set(logo, {
          scale: 0.85,
          opacity: 0,
        });

        gsap.to(logo, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease,
        });
      }

      if (navItems) {
        gsap.set(navItems, {
          opacity: 0,
          y: -10,
        });

        gsap.to(navItems, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.1,
          ease,
        });
      }
    }

    // ==========================================================
    // CLEANUP
    // ==========================================================

    return () => {
      window.removeEventListener(
        "resize",
        resizeHandler
      );

      tlRefs.current.forEach(
        (tl) => tl?.kill()
      );

      activeTweenRefs.current.forEach(
        (tween) => tween?.kill()
      );

      logoTweenRef.current?.kill();
    };
  }, [
    items,
    ease,
    initialLoadAnimation,
  ]);

  // ==========================================================
  // PILL ENTER
  // ==========================================================

  const handleEnter = (
    index: number
  ) => {
    const tl =
      tlRefs.current[index];

    if (!tl) {
      return;
    }

    activeTweenRefs.current[
      index
    ]?.kill();

    activeTweenRefs.current[
      index
    ] =
      tl.tweenTo(
        tl.duration(),
        {
          duration: 0.3,
          ease,
          overwrite: "auto",
        }
      );
  };

  // ==========================================================
  // PILL LEAVE
  // ==========================================================

  const handleLeave = (
    index: number
  ) => {
    const tl =
      tlRefs.current[index];

    if (!tl) {
      return;
    }

    activeTweenRefs.current[
      index
    ]?.kill();

    activeTweenRefs.current[
      index
    ] =
      tl.tweenTo(
        0,
        {
          duration: 0.25,
          ease,
          overwrite: "auto",
        }
      );
  };

  // ==========================================================
  // LOGO HOVER
  // ==========================================================

  const handleLogoEnter = () => {
    const img =
      logoImgRef.current;

    if (!img) {
      return;
    }

    logoTweenRef.current?.kill();

    logoTweenRef.current =
      gsap.to(img, {
        rotate: 360,
        duration: 0.5,
        ease,
        overwrite: "auto",
      });
  };

  // ==========================================================
  // MOBILE MENU
  // ==========================================================

  const toggleMobileMenu = () => {
    const nextState =
      !isMobileMenuOpen;

    setIsMobileMenuOpen(
      nextState
    );

    const hamburger =
      hamburgerRef.current;

    const menu =
      mobileMenuRef.current;

    // ========================================================
    // HAMBURGER ANIMATION
    // ========================================================

    if (hamburger) {
      const lines =
        hamburger.querySelectorAll<HTMLElement>(
          ".hamburger-line"
        );

      if (lines.length >= 2) {
        if (nextState) {
          gsap.to(lines[0], {
            rotation: 45,
            y: 4,
            duration: 0.25,
            ease,
          });

          gsap.to(lines[1], {
            rotation: -45,
            y: -4,
            duration: 0.25,
            ease,
          });
        } else {
          gsap.to(lines[0], {
            rotation: 0,
            y: 0,
            duration: 0.25,
            ease,
          });

          gsap.to(lines[1], {
            rotation: 0,
            y: 0,
            duration: 0.25,
            ease,
          });
        }
      }
    }

    // ========================================================
    // MOBILE MENU ANIMATION
    // ========================================================

    if (menu) {
      if (nextState) {
        gsap.set(menu, {
          visibility: "visible",
        });

        gsap.fromTo(
          menu,
          {
            opacity: 0,
            y: -10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease,
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease,
          onComplete: () => {
            gsap.set(menu, {
              visibility:
                "hidden",
            });
          },
        });
      }
    }

    onMobileMenuClick?.();
  };

  // ==========================================================
  // LINK HELPERS
  // ==========================================================

  const isExternalLink = (
    href: string
  ) => {
    if (!href) {
      return false;
    }

    return (
      href.startsWith(
        "http://"
      ) ||
      href.startsWith(
        "https://"
      ) ||
      href.startsWith(
        "//"
      ) ||
      href.startsWith(
        "mailto:"
      ) ||
      href.startsWith(
        "tel:"
      ) ||
      href.startsWith("#")
    );
  };

  const isNextLink = (
    href?: string
  ) => {
    return Boolean(
      href &&
        !isExternalLink(
          href
        )
    );
  };

  // ==========================================================
  // HOME LINK
  // ==========================================================

  const homeHref =
    items?.[0]?.href || "/";

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div
      className={`
        fixed
        left-1/2
        top-5
        z-[1000]
        w-[calc(100%-32px)]
        -translate-x-1/2
        md:w-auto
        ${className}
      `}
    >

      {/* ==================================================== */}
      {/* NAVBAR */}
      {/* ==================================================== */}

      <nav
        aria-label="Primary Navigation"
        className="
          flex
          items-center
          rounded-full
          border
          border-white/60
          bg-white
          p-2
          shadow-[0_10px_35px_rgba(0,0,0,0.18)]
        "
        style={{
          background:
            baseColor,
        }}
      >

        {/* ================================================== */}
        {/* LOGO */}
        {/* ================================================== */}

        {isNextLink(
          homeHref
        ) ? (
          <Link
            href={homeHref}
            aria-label="Home"
            ref={logoRef}
            onMouseEnter={
              handleLogoEnter
            }
            className="
              mr-4
              flex
              h-[52px]
              w-[150px]
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-full
              bg-transparent
              px-3
              py-2
              transition-transform
              duration-300
              hover:scale-[1.03]
              sm:mr-5
              sm:h-[54px]
              sm:w-[165px]
            "
          >
            <img
              src={LOGO_SRC}
              alt="HR Realty International"
              ref={logoImgRef}
              draggable={false}
              className="
                block
                h-full
                w-full
                object-contain
              "
            />
          </Link>
        ) : (
          <a
            href={homeHref}
            aria-label="Home"
            ref={logoRef}
            onMouseEnter={
              handleLogoEnter
            }
            className="
              mr-4
              flex
              h-[52px]
              w-[150px]
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-full
              bg-transparent
              px-3
              py-2
              transition-transform
              duration-300
              hover:scale-[1.03]
              sm:mr-5
              sm:h-[54px]
              sm:w-[165px]
            "
          >
            <img
              src={LOGO_SRC}
              alt="HR Realty International"
              ref={logoImgRef}
              draggable={false}
              className="
                block
                h-full
                w-full
                object-contain
              "
            />
          </a>
        )}

        {/* ================================================== */}
        {/* DESKTOP NAVIGATION */}
        {/* ================================================== */}

        <div
          ref={navItemsRef}
          className="
            hidden
            items-center
            md:flex
          "
        >
          <ul
            role="menubar"
            className="
              m-0
              flex
              list-none
              items-center
              gap-1
              p-0
            "
          >
            {items.map(
              (
                item,
                index
              ) => {

                const isActive =
                  activeHref ===
                  item.href;

                const pillContent = (
                  <>
                    {/* ====================================== */}
                    {/* HOVER CIRCLE */}
                    {/* ====================================== */}

                    <span
                      className="
                        hover-circle
                        pointer-events-none
                        absolute
                        bottom-0
                        left-1/2
                        z-[1]
                        block
                        rounded-full
                      "
                      style={{
                        background:
                          "#043927",
                        willChange:
                          "transform",
                      }}
                      aria-hidden="true"
                      ref={(el) => {
                        circleRefs.current[
                          index
                        ] = el;
                      }}
                    />

                    {/* ====================================== */}
                    {/* LABEL STACK */}
                    {/* ====================================== */}

                    <span
                      className="
                        label-stack
                        relative
                        z-[2]
                        inline-block
                        leading-none
                      "
                    >

                      {/* Normal label */}

                      <span
                        className="
                          pill-label
                          relative
                          z-[2]
                          inline-block
                          leading-none
                        "
                      >
                        {
                          item.label
                        }
                      </span>

                      {/* Hover label */}

                      <span
                        className="
                          pill-label-hover
                          absolute
                          left-0
                          top-0
                          z-[3]
                          inline-block
                        "
                        style={{
                          color:
                            hoveredPillTextColor,
                        }}
                        aria-hidden="true"
                      >
                        {
                          item.label
                        }
                      </span>

                    </span>

                    {/* ====================================== */}
                    {/* ACTIVE DOT */}
                    {/* ====================================== */}

                    {isActive && (
                      <span
                        className="
                          absolute
                          bottom-[-5px]
                          left-1/2
                          z-[4]
                          h-2
                          w-2
                          -translate-x-1/2
                          rounded-full
                        "
                        style={{
                          background:
                            "#043927",
                        }}
                        aria-hidden="true"
                      />
                    )}

                  </>
                );

                const classes = `
                  relative
                  inline-flex
                  h-[38px]
                  cursor-pointer
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  px-4
                  text-[13px]
                  font-semibold
                  uppercase
                  tracking-[0.3px]
                  no-underline
                  transition-all
                  duration-200
                  hover:shadow-sm
                `;

                return (
                  <li
                    key={`${item.href}-${index}`}
                    role="none"
                  >

                    {isNextLink(
                      item.href
                    ) ? (

                      <Link
                        href={
                          item.href
                        }
                        role="menuitem"
                        className={
                          classes
                        }
                        style={{
                          background:
                            pillColor,
                          color:
                            resolvedPillTextColor,
                        }}
                        aria-label={
                          item.ariaLabel ||
                          item.label
                        }
                        onMouseEnter={() =>
                          handleEnter(
                            index
                          )
                        }
                        onMouseLeave={() =>
                          handleLeave(
                            index
                          )
                        }
                      >
                        {
                          pillContent
                        }
                      </Link>

                    ) : (

                      <a
                        href={
                          item.href
                        }
                        role="menuitem"
                        className={
                          classes
                        }
                        style={{
                          background:
                            pillColor,
                          color:
                            resolvedPillTextColor,
                        }}
                        aria-label={
                          item.ariaLabel ||
                          item.label
                        }
                        onMouseEnter={() =>
                          handleEnter(
                            index
                          )
                        }
                        onMouseLeave={() =>
                          handleLeave(
                            index
                          )
                        }
                      >
                        {
                          pillContent
                        }
                      </a>

                    )}

                  </li>
                );
              }
            )}
          </ul>
        </div>

        {/* ================================================== */}
        {/* MOBILE BUTTON */}
        {/* ================================================== */}

        <button
          ref={hamburgerRef}
          type="button"
          onClick={
            toggleMobileMenu
          }
          aria-label="Toggle navigation menu"
          aria-expanded={
            isMobileMenuOpen
          }
          className="
            ml-auto
            flex
            h-[42px]
            w-[42px]
            cursor-pointer
            flex-col
            items-center
            justify-center
            gap-1
            rounded-full
            border-0
            bg-[#043927]
            p-0
            md:hidden
          "
        >
          <span
            className="
              hamburger-line
              block
              h-[2px]
              w-4
              rounded-full
              bg-white
            "
          />

          <span
            className="
              hamburger-line
              block
              h-[2px]
              w-4
              rounded-full
              bg-white
            "
          />
        </button>

      </nav>

      {/* ==================================================== */}
      {/* MOBILE MENU */}
      {/* ==================================================== */}

      <div
        ref={mobileMenuRef}
        className="
          absolute
          left-0
          right-0
          top-[66px]
          overflow-hidden
          rounded-[24px]
          bg-white
          p-2
          shadow-[0_15px_40px_rgba(0,0,0,0.2)]
          md:hidden
        "
      >

        <ul
          className="
            m-0
            flex
            list-none
            flex-col
            gap-1
            p-0
          "
        >

          {items.map(
            (item) => (
              <li
                key={item.href}
              >

                {isNextLink(
                  item.href
                ) ? (

                  <Link
                    href={
                      item.href
                    }
                    className="
                      block
                      rounded-full
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      uppercase
                      tracking-wide
                      text-[#111]
                      transition
                      hover:bg-[#043927]
                      hover:text-white
                    "
                    onClick={() => {
                      setIsMobileMenuOpen(
                        false
                      );
                    }}
                  >
                    {
                      item.label
                    }
                  </Link>

                ) : (

                  <a
                    href={
                      item.href
                    }
                    className="
                      block
                      rounded-full
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      uppercase
                      tracking-wide
                      text-[#111]
                      transition
                      hover:bg-[#043927]
                      hover:text-white
                    "
                    onClick={() => {
                      setIsMobileMenuOpen(
                        false
                      );
                    }}
                  >
                    {
                      item.label
                    }
                  </a>

                )}

              </li>
            )
          )}

        </ul>
      </div>

    </div>
  );
};

export default PillNav;