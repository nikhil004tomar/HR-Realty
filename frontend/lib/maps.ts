const API_URL =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL || "http://backend:8000"
    : process.env.NEXT_PUBLIC_API_URL || "https://api.thehrrealty.com";

const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.thehrrealty.com";

export interface SiteMap {
  id: number;
  title: string;
  description: string | null;
  image: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

// ==========================================================
// IMAGE URL
// ==========================================================

export function getMapImageUrl(
  imageUrl?: string | null
): string {
  if (!imageUrl) {
    return "/Location_Map_DMC-3.jpg";
  }

  // If backend returns the internal Docker hostname,
  // convert it to the public API URL.
  if (imageUrl.includes("backend:8000")) {
    return imageUrl.replace(
      "http://backend:8000",
      PUBLIC_API_URL
    );
  }

  // Already a complete URL
  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://")
  ) {
    return imageUrl;
  }

  // Relative upload path
  return `${PUBLIC_API_URL}${imageUrl}`;
}

// ==========================================================
// GET PUBLISHED MAPS
// ==========================================================

export async function getMaps(): Promise<SiteMap[]> {
  try {
    const response = await fetch(
      `${API_URL}/api/maps`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to load maps: ${response.status}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data;
  } catch (error) {
    console.error("Maps API error:", error);

    return [];
  }
}