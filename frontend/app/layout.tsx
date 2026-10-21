import { GoogleAnalytics } from "@next/third-parties/google";
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

const siteUrl = "https://www.thehrrealty.com";

/* ================= GLOBAL SEO ================= */

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "HR Realty International | Dholera SIR Real Estate",
    template: "%s | HR Realty International",
  },

  description:
    "Explore real estate, land, plotted developments, bulk land and property opportunities in Dholera SIR, Gujarat, with HR Realty International.",

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
    "DMIC Dholera",
    "DFC Dholera",
  ],

  authors: [
    {
      name: "HR Realty International",
      url: siteUrl,
    },
  ],

  creator: "HR Realty International",
  publisher: "HR Realty International",

  alternates: {
    canonical: "/",
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
    url: siteUrl,
    siteName: "HR Realty International",
    title: "HR Realty International | Dholera SIR Real Estate",
    description:
      "Explore real estate, land and property opportunities in Dholera SIR, Gujarat.",
    images: [
      {
        url: "/images/logo.webp",
        alt: "HR Realty International",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "HR Realty International | Dholera SIR Real Estate",
    description:
      "Real estate and land opportunities in Dholera SIR, Gujarat.",
    images: ["/images/logo.webp"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

/* ================= STRUCTURED DATA ================= */

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "HR Realty International",
  url: `${siteUrl}/`,
  logo: `${siteUrl}/images/logo.png`,
  description:
    "HR Realty International provides real estate and property opportunities in Dholera SIR, Gujarat, India.",
  areaServed: {
    "@type": "Place",
    name: "Dholera SIR, Gujarat, India",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "HR Realty International",
  url: `${siteUrl}/`,
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
  inLanguage: "en-IN",
};

/* ================= ROOT LAYOUT ================= */

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
      <body className="min-h-full flex flex-col">
        {/* Organization and website structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />

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
                  label: "Kalpasar Project",
                  href: "/dholera-sir/kalpasar",
                },
                {
                  label: "ABCD Building",
                  href: "/dholera-sir/abcd-building",
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
         <GoogleAnalytics gaId="G-HWVYMNSTVD" />
      </body>
    </html>
  );
}
