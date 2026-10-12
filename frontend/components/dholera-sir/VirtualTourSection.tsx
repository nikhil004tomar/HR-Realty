
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";

import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Compass,
  ExternalLink,
  Factory,
  MapPin,
  RotateCcw,
  X,
} from "lucide-react";

type TourLocation = {
  id: string;
  name: string;
  image: string;
  description: string;
  link: string;
  category: string;
};

type Hotspot = {
  id: string;
  targetId: string;
  yaw: string;
  pitch: string;
};

const LOCATIONS: TourLocation[] = [
  {
    id: "overview",
    name: "Dholera SIR Overview",
    image: "/images/dholera-sir/virtual-tour/overview.webp",
    description:
      "Explore the wider Dholera SIR development area through an interactive 360° experience.",
    link: "/dholera-sir",
    category: "Overview",
  },
  {
    id: "activation",
    name: "Activation Area",
    image: "/images/dholera-sir/virtual-tour/activation-area.webp",
    description:
      "Explore the Activation Area and discover key infrastructure and development zones.",
    link: "/dholera-sir/running-completed-projects",
    category: "Development",
  },
  {
    id: "abcd",
    name: "ABCD Building",
    image: "/images/dholera-sir/virtual-tour/abcd-building.webp",
    description:
      "Explore the Administrative and Business Centre of Dholera and its role in city management.",
    link: "/dholera-sir/abcd-building",
    category: "Infrastructure",
  },
  {
    id: "industrial",
    name: "Industrial Zone",
    image: "/images/dholera-sir/virtual-tour/industrial-zone.webp",
    description:
      "Discover the industrial development area planned for manufacturing and business activity.",
    link: "/dholera-sir/projects",
    category: "Industrial",
  },
  {
    id: "residential",
    name: "Residential Zone",
    image: "/images/dholera-sir/virtual-tour/residential-zone.webp",
    description:
      "Explore the residential development areas planned as part of the wider smart-city vision.",
    link: "/dholera-sir/projects",
    category: "Residential",
  },
  {
    id: "airport",
    name: "Dholera Airport",
    image: "/images/dholera-sir/virtual-tour/airport.webp",
    description:
      "Explore the airport development and its anticipated role in regional connectivity.",
    link: "/dholera-sir/connectivity",
    category: "Connectivity",
  },
  {
    id: "torrent-power",
    name: "Torrent Power Station",
    image: "/images/dholera-sir/virtual-tour/torrent-power.webp",
    description:
      "Explore the power infrastructure associated with the region's development.",
    link: "/dholera-sir/connectivity",
    category: "Energy",
  },
  {
    id: "tata-semiconductor",
    name: "Tata Semiconductor",
    image: "/images/dholera-sir/virtual-tour/tata-semiconductor.webp",
    description:
      "Learn about the semiconductor manufacturing development associated with Dholera's industrial ecosystem.",
    link: "/dholera-sir/projects",
    category: "Technology",
  },
  {
    id: "renew-power",
    name: "ReNew Power Plant",
    image: "/images/dholera-sir/virtual-tour/renew-power.webp",
    description:
      "Explore renewable energy infrastructure and its relevance to the region's development.",
    link: "/dholera-sir/connectivity",
    category: "Renewable Energy",
  },
  {
    id: "canal-front",
    name: "Canal Front",
    image: "/images/dholera-sir/virtual-tour/canal-front.webp",
    description:
      "Explore the canal-front area and surrounding infrastructure.",
    link: "/dholera-sir/connectivity",
    category: "Infrastructure",
  },
  {
    id: "water-treatment",
    name: "Water Treatment Plant",
    image: "/images/dholera-sir/virtual-tour/water-treatment.webp",
    description:
      "Discover water-treatment infrastructure supporting the planned urban environment.",
    link: "/dholera-sir/connectivity",
    category: "Utilities",
  },
];

/*
 * IMPORTANT:
 * These yaw/pitch values are example positions, not verified geographical
 * coordinates. Adjust them to match the actual overview panorama.
 */
const HOTSPOTS: Hotspot[] = [
  {
    id: "activation-hotspot",
    targetId: "activation",
    yaw: "20deg",
    pitch: "-5deg",
  },
  {
    id: "abcd-hotspot",
    targetId: "abcd",
    yaw: "70deg",
    pitch: "0deg",
  },
  {
    id: "industrial-hotspot",
    targetId: "industrial",
    yaw: "-45deg",
    pitch: "-3deg",
  },
  {
    id: "residential-hotspot",
    targetId: "residential",
    yaw: "-100deg",
    pitch: "-2deg",
  },
  {
    id: "airport-hotspot",
    targetId: "airport",
    yaw: "140deg",
    pitch: "-4deg",
  },
  {
    id: "torrent-power-hotspot",
    targetId: "torrent-power",
    yaw: "165deg",
    pitch: "-5deg",
  },
  {
    id: "tata-semiconductor-hotspot",
    targetId: "tata-semiconductor",
    yaw: "-135deg",
    pitch: "0deg",
  },
  {
    id: "renew-power-hotspot",
    targetId: "renew-power",
    yaw: "100deg",
    pitch: "-3deg",
  },
  {
    id: "canal-front-hotspot",
    targetId: "canal-front",
    yaw: "-65deg",
    pitch: "-2deg",
  },
  {
    id: "water-treatment-hotspot",
    targetId: "water-treatment",
    yaw: "35deg",
    pitch: "-4deg",
  },
];

export default function VirtualTourSection() {
  const viewerContainer = useRef<HTMLDivElement | null>(null);
  const viewer = useRef<Viewer | null>(null);
  const markersPlugin = useRef<MarkersPlugin | null>(null);

  const [activeLocation, setActiveLocation] = useState<TourLocation>(
    LOCATIONS[0]
  );
  const [selectedHotspot, setSelectedHotspot] =
    useState<TourLocation | null>(null);
  const [isChangingLocation, setIsChangingLocation] = useState(false);
  const [viewerReady, setViewerReady] = useState(false);
  const [viewerError, setViewerError] = useState(false);

  const getLocation = useCallback((id: string) => {
    return LOCATIONS.find((location) => location.id === id);
  }, []);

  const addHotspots = useCallback((locationId: string) => {
    const plugin = markersPlugin.current;

    if (!plugin) return;

    plugin.clearMarkers();

    // Only show overview hotspots on the overview panorama.
    if (locationId !== "overview") return;

    HOTSPOTS.forEach((hotspot) => {
      const location = LOCATIONS.find(
        (item) => item.id === hotspot.targetId
      );

      if (!location) return;

      plugin.addMarker({
        id: hotspot.id,
        position: {
          yaw: hotspot.yaw,
          pitch: hotspot.pitch,
        },
        html: `
          <button
            type="button"
            class="hr-tour-hotspot"
            aria-label="Explore ${location.name}"
            title="${location.name}"
          >
            <span class="hr-tour-hotspot-dot"></span>
            <span class="hr-tour-hotspot-label">${location.name}</span>
          </button>
        `,
        anchor: "center center",
        tooltip: {
          content: location.name,
          position: "top",
        },
        data: {
          tourLocation: location.id,
        },
      });
    });
  }, []);

  const changeLocation = useCallback(
    async (location: TourLocation) => {
      const currentViewer = viewer.current;

      if (!currentViewer || location.id === activeLocation.id) {
        setSelectedHotspot(null);
        return;
      }

      setIsChangingLocation(true);
      setSelectedHotspot(null);

      try {
        await currentViewer.setPanorama(location.image, {
          transition: true,
          showLoader: true,
        });

        currentViewer.rotate({
          yaw: 0,
          pitch: 0,
        });

        addHotspots(location.id);
        setActiveLocation(location);
      } catch (error) {
        console.error("Unable to load virtual tour panorama:", error);
        setViewerError(true);
      } finally {
        setIsChangingLocation(false);
      }
    },
    [activeLocation.id, addHotspots]
  );

  const handleResetView = useCallback(() => {
    if (!viewer.current) return;

    viewer.current.rotate({
      yaw: 0,
      pitch: 0,
    });
  }, []);

  useEffect(() => {
    const container = viewerContainer.current;

    if (!container || viewer.current) return;

    let instance: Viewer | null = null;
    let isMounted = true;

    try {
      instance = new Viewer({
        container,
        panorama: LOCATIONS[0].image,
        caption: "Explore Dholera SIR",
        loadingImg: undefined,
        navbar: [
          "zoom",
          "move",
          "fullscreen",
        ],
        plugins: [
          [
            MarkersPlugin,
            {
              markers: [],
            },
          ],
        ],
      });

      viewer.current = instance;

      const plugin = instance.getPlugin(
        MarkersPlugin
      ) as MarkersPlugin;

      markersPlugin.current = plugin;

      const handleReady = () => {
        if (!isMounted) return;

        setViewerReady(true);
        addHotspots("overview");
      };

      const handleSelectMarker = (event: {
        marker: {
          data?: { tourLocation?: string };
          config?: { data?: { tourLocation?: string } };
        };
      }) => {
        const targetId =
          event.marker.data?.tourLocation ??
          event.marker.config?.data?.tourLocation;

        if (!targetId) return;

        const location = getLocation(targetId);

        if (location) {
          setSelectedHotspot(location);
        }
      };

      instance.addEventListener("ready", handleReady);
      plugin.addEventListener("select-marker", handleSelectMarker);

      return () => {
        isMounted = false;

        instance?.removeEventListener("ready", handleReady);
        plugin.removeEventListener("select-marker", handleSelectMarker);

        instance?.destroy();

        if (viewer.current === instance) {
          viewer.current = null;
          markersPlugin.current = null;
        }
      };
    } catch (error) {
      console.error("Unable to initialize virtual tour:", error);
      setViewerError(true);

      instance?.destroy();
      viewer.current = null;
      markersPlugin.current = null;
    }
  }, [addHotspots, getLocation]);

  const visibleLocations = LOCATIONS.filter(
    (location) => location.id !== "overview"
  );

  return (
    <section
      id="virtual-tour"
      className="relative overflow-hidden bg-[#061b15] py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-emerald-700/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9A45C]/30 bg-[#C9A45C]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#E2C889]">
            <Compass className="h-4 w-4" />
            Interactive Virtual Experience
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Experience Dholera SIR{" "}
            <span className="text-[#C9A45C]">in 360°</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
            Explore key development areas, industrial infrastructure,
            connectivity, energy and essential utilities through an
            interactive virtual tour.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-white/60 sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-[#C9A45C]" />
              Drag to look around
            </span>
            <span className="hidden text-white/25 sm:inline">•</span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#C9A45C]" />
              Select a hotspot to explore
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b241c] shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-3 border-b border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#C9A45C]">
                Currently exploring
              </p>
              <h3 className="mt-1 truncate text-lg font-semibold sm:text-xl">
                {activeLocation.name}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleResetView}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm text-white/80 transition hover:border-[#C9A45C]/60 hover:text-[#E2C889]"
              >
                <RotateCcw className="h-4 w-4" />
                Reset view
              </button>

              <button
                type="button"
                onClick={() => changeLocation(LOCATIONS[0])}
                disabled={activeLocation.id === "overview" || isChangingLocation}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C9A45C] px-3 py-2 text-sm font-semibold text-[#092017] transition hover:bg-[#ddbb77] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Compass className="h-4 w-4" />
                Overview
              </button>
            </div>
          </div>

          <div className="relative">
            <div
              ref={viewerContainer}
              className="h-[360px] w-full bg-[#07140f] sm:h-[480px] lg:h-[600px]"
              aria-label="Interactive 360 degree Dholera SIR virtual tour"
            />

            {!viewerReady && !viewerError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#07140f]">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-[#C9A45C]" />
                <p className="text-sm text-white/70">
                  Loading the 360° experience...
                </p>
              </div>
            )}

            {viewerError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#07140f] px-6 text-center">
                <Compass className="mb-4 h-10 w-10 text-[#C9A45C]" />
                <h4 className="text-lg font-semibold">
                  Virtual tour could not be loaded
                </h4>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/60">
                  Please check that the panorama images exist in the public
                  folder and that the files are valid 360° images.
                </p>
              </div>
            )}

            {isChangingLocation && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/45 backdrop-blur-[2px]">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0b241c]/95 px-5 py-4">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-[#C9A45C]" />
                  <span className="text-sm font-medium">
                    Changing location...
                  </span>
                </div>
              </div>
            )}

            {selectedHotspot && (
              <div className="absolute bottom-4 left-4 right-4 z-20 sm:bottom-6 sm:left-6 sm:right-auto sm:w-[360px]">
                <div className="rounded-2xl border border-[#C9A45C]/30 bg-[#071b14]/95 p-5 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-[#C9A45C]/15 p-3 text-[#E2C889]">
                        <Building2 className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">
                          {selectedHotspot.category}
                        </p>
                        <h4 className="mt-1 text-base font-bold">
                          {selectedHotspot.name}
                        </h4>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedHotspot(null)}
                      className="rounded-lg p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
                      aria-label="Close location details"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-white/65">
                    {selectedHotspot.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => changeLocation(selectedHotspot)}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#C9A45C] px-4 py-2.5 text-sm font-semibold text-[#092017] transition hover:bg-[#ddbb77]"
                    >
                      Explore 360°
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <a
                      href={selectedHotspot.link}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-white/85 transition hover:border-[#C9A45C]/50 hover:text-[#E2C889]"
                    >
                      Learn more
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-xs leading-5 text-white/50 sm:text-sm">
              Move around the panorama and select a location marker to explore.
            </p>

            <a
              href="/dholera-sir"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#E2C889] transition hover:text-white"
            >
              Explore Dholera SIR
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">
                Choose your destination
              </p>
              <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                Explore Key Locations
              </h3>
            </div>

            <p className="max-w-md text-sm leading-6 text-white/55">
              Select any location to load its panorama in the virtual tour.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleLocations.map((location) => {
              const isActive = activeLocation.id === location.id;

              return (
                <button
                  key={location.id}
                  type="button"
                  onClick={() => changeLocation(location)}
                  disabled={isChangingLocation}
                  className={`group flex h-full flex-col rounded-2xl border p-5 text-left transition duration-300 disabled:cursor-wait ${
                    isActive
                      ? "border-[#C9A45C]/60 bg-[#C9A45C]/10"
                      : "border-white/10 bg-white/[0.025] hover:-translate-y-1 hover:border-[#C9A45C]/35 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex w-full items-start justify-between gap-3">
                    <div
                      className={`rounded-xl p-3 ${
                        isActive
                          ? "bg-[#C9A45C]/20 text-[#E2C889]"
                          : "bg-white/[0.06] text-white/75 group-hover:text-[#E2C889]"
                      }`}
                    >
                      {location.category === "Industrial" ||
                      location.category === "Energy" ||
                      location.category === "Renewable Energy" ? (
                        <Factory className="h-5 w-5" />
                      ) : (
                        <MapPin className="h-5 w-5" />
                      )}
                    </div>

                    {isActive ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#C9A45C]/15 px-2.5 py-1 text-[10px] font-semibold text-[#E2C889]">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Selected
                      </span>
                    ) : (
                      <ArrowRight className="h-5 w-5 text-white/35 transition group-hover:translate-x-1 group-hover:text-[#C9A45C]" />
                    )}
                  </div>

                  <span className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C9A45C]">
                    {location.category}
                  </span>

                  <h4 className="mt-2 text-lg font-semibold text-white">
                    {location.name}
                  </h4>

                  <p className="mt-2 flex-1 text-sm leading-6 text-white/55">
                    {location.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#E2C889]">
                    Explore location
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#C9A45C]/20 bg-[#C9A45C]/[0.06] p-6 sm:flex-row sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#C9A45C]/15 p-3 text-[#E2C889]">
              <Compass className="h-6 w-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold sm:text-xl">
                Discover investment opportunities
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                Connect with HR Realty to learn more about available
                properties and development opportunities in Dholera SIR.
              </p>
            </div>
          </div>

          <a
            href="/#contact"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#C9A45C] px-5 py-3 text-sm font-bold text-[#092017] transition hover:bg-[#ddbb77]"
          >
            Contact HR Realty
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="#virtual-tour"
            className="inline-flex items-center gap-2 text-xs text-white/40 transition hover:text-[#E2C889]"
          >
            Back to virtual tour
            <ArrowDown className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <style jsx global>{`
        .hr-tour-hotspot {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          padding: 0;
          border: 0;
          background: transparent;
          color: #ffffff;
          cursor: pointer;
          white-space: nowrap;
          transform: translateY(0);
          transition: transform 180ms ease;
        }

        .hr-tour-hotspot:hover {
          transform: translateY(-3px);
        }

        .hr-tour-hotspot-dot {
          display: block;
          width: 18px;
          height: 18px;
          border: 3px solid #ffffff;
          border-radius: 9999px;
          background: #c9a45c;
          box-shadow:
            0 0 0 5px rgba(201, 164, 92, 0.22),
            0 0 22px rgba(201, 164, 92, 0.75);
          animation: hr-tour-pulse 2s infinite;
        }

        .hr-tour-hotspot-label {
          max-width: 180px;
          padding: 7px 10px;
          border: 1px solid rgba(201, 164, 92, 0.35);
          border-radius: 8px;
          background: rgba(6, 27, 21, 0.92);
          color: #ffffff;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.35;
          text-align: center;
          box-shadow: 0 5px 18px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(8px);
        }

        @keyframes hr-tour-pulse {
          0%,
          100% {
            box-shadow:
              0 0 0 4px rgba(201, 164, 92, 0.18),
              0 0 18px rgba(201, 164, 92, 0.55);
          }

          50% {
            box-shadow:
              0 0 0 8px rgba(201, 164, 92, 0.04),
              0 0 25px rgba(201, 164, 92, 0.85);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hr-tour-hotspot,
          .hr-tour-hotspot-dot {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
