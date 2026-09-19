
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  children?: PillNavItem[];
};

export interface PillNavProps {
  items?: PillNavItem[];
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

const GREEN = "#043927";
const GOLD = "#C9A45C";
const WHITE = "#FFFFFF";

const LOGO_SRC = "/images/logo.png";

const PillNav: React.FC<PillNavProps> = ({
  items = [],
  activeHref,
  className = "",
  ease = "power2.out",
  baseColor = GREEN,
  pillColor = "transparent",
  hoveredPillTextColor = GOLD,
  pillTextColor = WHITE,
  onMobileMenuClick,
  initialLoadAnimation = true,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);

  // ============================================================
  // INITIAL ANIMATION
  // ============================================================

  useEffect(() => {
    if (!initialLoadAnimation) return;

    const logo = logoRef.current;
    const navItems = navItemsRef.current;

    if (logo) {
      gsap.fromTo(
        logo,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease,
        }
      );
    }

    if (navItems) {
      gsap.fromTo(
        navItems,
        {
          opacity: 0,
          y: -10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.1,
          ease,
        }
      );
    }
  }, [ease, initialLoadAnimation]);

  // ============================================================
  // LOGO ANIMATION
  // ============================================================

  const handleLogoEnter = () => {
    const img = logoImgRef.current;

    if (!img) return;

    logoTweenRef.current?.kill();

    logoTweenRef.current = gsap.to(img, {
      scale: 1.06,
      duration: 0.25,
      ease,
      overwrite: "auto",
    });
  };

  const handleLogoLeave = () => {
    const img = logoImgRef.current;

    if (!img) return;

    logoTweenRef.current?.kill();

    logoTweenRef.current = gsap.to(img, {
      scale: 1,
      duration: 0.25,
      ease,
      overwrite: "auto",
    });
  };

  // ============================================================
  // LINK HELPERS
  // ============================================================

  const isExternalLink = (href: string) => {
    if (!href) return false;

    return (
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("//") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("#")
    );
  };

  const isNextLink = (href?: string) => {
    return Boolean(href && !isExternalLink(href));
  };

  const homeHref = items?.[0]?.href || "/";

  // ============================================================
  // DROPDOWN
  // ============================================================

  const toggleDropdown = (label: string) => {
    setOpenDropdown((current) =>
      current === label ? null : label
    );
  };

  // ============================================================
  // MOBILE MENU
  // ============================================================

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);

    const menu = mobileMenuRef.current;

    if (menu) {
      gsap.to(menu, {
        opacity: 0,
        y: -8,
        duration: 0.2,
        ease,
        onComplete: () => {
          gsap.set(menu, {
            visibility: "hidden",
          });
        },
      });
    }

    const hamburger = hamburgerRef.current;

    if (hamburger) {
      const lines =
        hamburger.querySelectorAll<HTMLElement>(
          ".hamburger-line"
        );

      if (lines.length >= 2) {
        gsap.to(lines[0], {
          rotation: 0,
          y: 0,
          duration: 0.2,
          ease,
        });

        gsap.to(lines[1], {
          rotation: 0,
          y: 0,
          duration: 0.2,
          ease,
        });
      }
    }
  };

  const toggleMobileMenu = () => {
    const nextState = !isMobileMenuOpen;

    setIsMobileMenuOpen(nextState);

    const menu = mobileMenuRef.current;
    const hamburger = hamburgerRef.current;

    if (nextState) {
      if (menu) {
        gsap.set(menu, {
          visibility: "visible",
        });

        gsap.fromTo(
          menu,
          {
            opacity: 0,
            y: -8,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
            ease,
          }
        );
      }

      if (hamburger) {
        const lines =
          hamburger.querySelectorAll<HTMLElement>(
            ".hamburger-line"
          );

        if (lines.length >= 2) {
          gsap.to(lines[0], {
            rotation: 45,
            y: 4,
            duration: 0.2,
            ease,
          });

          gsap.to(lines[1], {
            rotation: -45,
            y: -4,
            duration: 0.2,
            ease,
          });
        }
      }
    } else {
      closeMobileMenu();
    }

    onMobileMenuClick?.();
  };

  // ============================================================
  // DESKTOP DROPDOWN
  // ============================================================

  const renderDesktopItem = (
    item: PillNavItem,
    index: number
  ) => {
    const isActive = activeHref === item.href;
    const hasChildren =
      Boolean(item.children && item.children.length > 0);

    const linkClasses = `
      group
      relative
      flex
      h-[44px]
      items-center
      gap-1.5
      rounded-full
      px-4
      text-[13px]
      font-semibold
      uppercase
      tracking-[0.2px]
      transition-all
      duration-200
      hover:text-[#C9A45C]
      ${isActive ? "text-[#C9A45C]" : ""}
    `;

    const content = (
      <>
        <span>{item.label}</span>

        {hasChildren && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="
              transition-transform
              duration-200
              group-hover:rotate-180
            "
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        )}

        {isActive && (
          <span
            className="
              absolute
              bottom-[5px]
              left-1/2
              h-[3px]
              w-3
              -translate-x-1/2
              rounded-full
              bg-[#C9A45C]
            "
          />
        )}
      </>
    );

    return (
      <li
        key={`${item.label}-${index}`}
        className="group relative"
      >
        {hasChildren ? (
          <>
            <button
              type="button"
              className={linkClasses}
              style={{
                color:
                  isActive
                    ? GOLD
                    : pillTextColor,
              }}
              onClick={() =>
                toggleDropdown(item.label)
              }
              aria-expanded={
                openDropdown === item.label
              }
            >
              {content}
            </button>

            {/* DROPDOWN */}

            <div
              className="
                invisible
                absolute
                left-1/2
                top-[48px]
                z-[1100]
                w-[250px]
                -translate-x-1/2
                translate-y-2
                rounded-2xl
                border
                border-white/10
                bg-[#043927]
                p-2
                opacity-0
                shadow-[0_15px_40px_rgba(0,0,0,0.25)]
                transition-all
                duration-200
                group-hover:visible
                group-hover:translate-y-0
                group-hover:opacity-100
              "
            >
              <div className="mb-1 px-3 py-2">
                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[1.5px]
                    text-[#C9A45C]
                  "
                >
                  {item.label}
                </span>
              </div>

              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  aria-label={
                    child.ariaLabel ||
                    child.label
                  }
                  className="
                    flex
                    items-center
                    rounded-xl
                    px-3
                    py-2.5
                    text-[12px]
                    font-medium
                    text-white
                    transition-all
                    duration-150
                    hover:bg-[#C9A45C]
                    hover:text-white
                  "
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </>
        ) : isNextLink(item.href) ? (
          <Link
            href={item.href}
            aria-label={
              item.ariaLabel || item.label
            }
            className={linkClasses}
            style={{
              color:
                isActive
                  ? GOLD
                  : pillTextColor,
              background: pillColor,
            }}
          >
            {content}
          </Link>
        ) : (
          <a
            href={item.href}
            aria-label={
              item.ariaLabel || item.label
            }
            className={linkClasses}
            style={{
              color:
                isActive
                  ? GOLD
                  : pillTextColor,
              background: pillColor,
            }}
          >
            {content}
          </a>
        )}
      </li>
    );
  };

  // ============================================================
  // MOBILE ITEM
  // ============================================================

  const renderMobileItem = (
    item: PillNavItem
  ) => {
    const hasChildren =
      Boolean(item.children && item.children.length > 0);

    const isActive = activeHref === item.href;

    if (hasChildren) {
      const isOpen =
        openDropdown === item.label;

      return (
        <li key={item.label}>
          <button
            type="button"
            onClick={() =>
              toggleDropdown(item.label)
            }
            className="
              flex
              w-full
              items-center
              justify-between
              rounded-xl
              px-4
              py-3
              text-left
              text-sm
              font-semibold
              uppercase
              tracking-wide
              text-white
              transition
              hover:bg-[#C9A45C]
            "
          >
            <span>{item.label}</span>

            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`
                transition-transform
                duration-200
                ${isOpen ? "rotate-180" : ""}
              `}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {isOpen && (
            <div className="ml-3 mt-1 border-l border-[#C9A45C]/40 pl-2">
              {item.children?.map(
                (child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="
                      block
                      rounded-lg
                      px-4
                      py-2.5
                      text-xs
                      font-medium
                      text-white/90
                      transition
                      hover:bg-[#C9A45C]
                      hover:text-white
                    "
                    onClick={
                      closeMobileMenu
                    }
                  >
                    {child.label}
                  </Link>
                )
              )}
            </div>
          )}
        </li>
      );
    }

    const linkClass = `
      block
      rounded-xl
      px-4
      py-3
      text-sm
      font-semibold
      uppercase
      tracking-wide
      transition
      ${
        isActive
          ? "bg-[#C9A45C] text-white"
          : "text-white hover:bg-[#C9A45C] hover:text-white"
      }
    `;

    return (
      <li key={item.href}>
        {isNextLink(item.href) ? (
          <Link
            href={item.href}
            className={linkClass}
            onClick={closeMobileMenu}
          >
            {item.label}
          </Link>
        ) : (
          <a
            href={item.href}
            className={linkClass}
            onClick={closeMobileMenu}
          >
            {item.label}
          </a>
        )}
      </li>
    );
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <header
      ref={navRef}
      className={`
        fixed
        left-0
        right-0
        top-0
        z-[1000]
        w-full
        ${className}
      `}
    >
      <nav
        aria-label="Primary Navigation"
        className="
          w-full
          border-b
          border-white/10
          shadow-[0_4px_20px_rgba(0,0,0,0.12)]
        "
        style={{
          background: baseColor,
        }}
      >
        <div
          className="
            mx-auto
            flex
            min-h-[82px]
            w-full
            max-w-[1600px]
            items-center
            px-4
            sm:px-6
            lg:px-8
            xl:px-10
          "
        >
          {/* ================================================== */}
          {/* LOGO */}
          {/* ================================================== */}

          {isNextLink(homeHref) ? (
            <Link
              href={homeHref}
              aria-label="Home"
              ref={logoRef}
              onMouseEnter={handleLogoEnter}
              onMouseLeave={handleLogoLeave}
              className="
                flex
                h-[62px]
                w-[190px]
                shrink-0
                items-center
                justify-start
                overflow-hidden
                sm:h-[68px]
                sm:w-[220px]
                lg:w-[240px]
              "
            >
              <img
                ref={logoImgRef}
                src={LOGO_SRC}
                alt="HR Realty International"
                draggable={false}
                className="
                  block
                  h-full
                  w-full
                  object-contain
                  object-left
                "
              />
            </Link>
          ) : (
            <a
              href={homeHref}
              aria-label="Home"
              ref={logoRef}
              onMouseEnter={handleLogoEnter}
              onMouseLeave={handleLogoLeave}
              className="
                flex
                h-[62px]
                w-[190px]
                shrink-0
                items-center
                justify-start
                overflow-hidden
                sm:h-[68px]
                sm:w-[220px]
                lg:w-[240px]
              "
            >
              <img
                ref={logoImgRef}
                src={LOGO_SRC}
                alt="HR Realty International"
                draggable={false}
                className="
                  block
                  h-full
                  w-full
                  object-contain
                  object-left
                "
              />
            </a>
          )}

          {/* ================================================== */}
          {/* DESKTOP NAV */}
          {/* ================================================== */}

          <div
            ref={navItemsRef}
            className="
              ml-auto
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
                gap-0.5
                p-0
                lg:gap-1
              "
            >
              {items.map(
                renderDesktopItem
              )}

              {/* ============================================ */}
              {/* CTA */}
              {/* ============================================ */}

              <li className="ml-2">
                <Link
                  href="/#contact"
                  className="
                    inline-flex
                    h-[44px]
                    items-center
                    justify-center
                    rounded-full
                    bg-[#C9A45C]
                    px-5
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-[0.5px]
                    text-white
                    shadow-[0_5px_15px_rgba(201,164,92,0.25)]
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:shadow-[0_8px_20px_rgba(201,164,92,0.35)]
                  "
                >
                  Book Your Site Visit
                </Link>
              </li>
            </ul>
          </div>

          {/* ================================================== */}
          {/* MOBILE BUTTON */}
          {/* ================================================== */}

          <button
            ref={hamburgerRef}
            type="button"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            className="
              ml-auto
              flex
              h-[44px]
              w-[44px]
              flex-col
              items-center
              justify-center
              gap-1.5
              rounded-full
              border
              border-[#C9A45C]
              bg-[#C9A45C]
              md:hidden
            "
          >
            <span
              className="
                hamburger-line
                block
                h-[2px]
                w-5
                rounded-full
                bg-white
              "
            />

            <span
              className="
                hamburger-line
                block
                h-[2px]
                w-5
                rounded-full
                bg-white
              "
            />
          </button>
        </div>
      </nav>

      {/* ==================================================== */}
      {/* MOBILE MENU */}
      {/* ==================================================== */}

      <div
        ref={mobileMenuRef}
        className="
          absolute
          left-3
          right-3
          top-[90px]
          invisible
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-[#043927]
          p-2
          opacity-0
          shadow-[0_15px_40px_rgba(0,0,0,0.25)]
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
          {items.map(renderMobileItem)}

          <li className="mt-1">
            <Link
              href="/#contact"
              className="
                block
                rounded-xl
                bg-[#C9A45C]
                px-4
                py-3
                text-center
                text-sm
                font-bold
                uppercase
                tracking-wide
                text-white
              "
              onClick={closeMobileMenu}
            >
              Book Your Site Visit
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default PillNav;

