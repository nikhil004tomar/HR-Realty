import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";
import PillNav from "@/components/PillNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* =========================================================
   GLOBAL SEO
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thehrrealty.com"),

  title: {
    default:
      "HR Realty International | Dholera SIR Real Estate & Property",
    template: "%s | HR Realty International",
  },

  description:
    "HR Realty International provides real estate and property opportunities in Dholera SIR, Gujarat, including land, plotted developments, bulk land and channel partner opportunities.",

  keywords: [
    "Dholera SIR",
    "Dholera SIR real estate",
    "Dholera property",
    "Dholera plots",
    "Dholera land",
    "Dholera investment",
    "Dholera SIR property",
    "Dholera real estate company",
    "Dholera plotted development",
    "Dholera bulk land",
    "Dholera channel partner",
    "Dholera SIR Gujarat",
    "Dholera infrastructure",
    "DMIC Dholera",
    "DFC Dholera",
    "Dholera International Airport",
  ],

  authors: [
    {
      name: "HR Realty International",
      url: "https://www.thehrrealty.com",
    },
  ],

  creator: "HR Realty International",
  publisher: "HR Realty International",

  alternates: {
    canonical: "https://www.thehrrealty.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.thehrrealty.com",
    siteName: "HR Realty International",
    title:
      "HR Realty International | Dholera SIR Real Estate & Property",
    description:
      "Explore real estate, land and property opportunities in Dholera SIR, Gujarat with HR Realty International.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "HR Realty International",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "HR Realty International | Dholera SIR Real Estate",
    description:
      "Real estate, land and property opportunities in Dholera SIR, Gujarat.",
    images: ["/images/logo.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

/* =========================================================
   STRUCTURED DATA
========================================================= */

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",

  name: "HR Realty International",

  url: "https://www.thehrrealty.com",

  logo: "https://www.thehrrealty.com/images/logo.png",

  description:
    "HR Realty International provides real estate and property opportunities in Dholera SIR, Gujarat.",

  areaServed: {
    "@type": "Place",
    name: "Dholera SIR, Gujarat, India",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",

  name: "HR Realty International",

  url: "https://www.thehrrealty.com",

  description:
    "HR Realty International real estate and property opportunities in Dholera SIR, Gujarat.",

  publisher: {
    "@type": "Organization",
    name: "HR Realty International",
    url: "https://www.thehrrealty.com",
  },
};

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>

      <body className="min-h-full flex flex-col">
        <PillNav
          items={[
            {
              label: "Home",
              href: "/",
            },

            {
              label: "About-us",
              href: "/about",
            },

            {
              label: "Bulk Land",
              href: "/bulk-land",
            },

            {
              label: "Dholera SIR",
              href: "/dholera-sir",
              children: [
                {
                  label: "Connectivity",
                  href: "/dholera-sir/connectivity",
                },
                {
                  label: "About Dholera SIR",
                  href: "/dholera-sir/projects",
                },
                {
                  label: "Running & Completed Projects",
                  href: "/dholera-sir/running-completed-projects",
                },
                {
                  label: "DMIC",
                  href: "/dholera-sir/dmic",
                },
                {
                  label: "DFC",
                  href: "/dholera-sir/dfc",
                },
                {
                  label: "GIDB",
                  href: "/dholera-sir/gidb",
                },
                {
                  label: "DRDA",
                  href: "/dholera-sir/drda",
                },
                {
                  label: "Maps",
                  href: "/dholera-sir/maps",
                },
              ],
            },

            /*
            {
              label: "Projects",
              href: "/projects",
            },
            */

            {
              label: "BECOME CHANNEL PARTNER",
              href: "/channel-partner",
            },

            {
              label: "Sell Your Property",
              href: "/sell-your-property",
            },

            {
              label: "Contact Us",
              href: "/contact",
              children: [
                {
                  label: "Careers",
                  href: "/careers",
                },
              ],
            },
          ]}
          activeHref="/"
          ease="power2.out"
          baseColor="#043927"
          pillColor="transparent"
          pillTextColor="#FFFFFF"
          hoveredPillTextColor="#C9A45C"
          initialLoadAnimation
        />

        {children}

        <Footer />
      </body>
    </html>
  );
}