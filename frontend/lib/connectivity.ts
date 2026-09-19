import API_URL from "@/lib/api";

export interface ConnectivityImage {
  id: number;
  connectivity_id: number;
  image_url: string;
  original_name: string | null;
  display_order: number;
  created_at: string;
}

export interface Connectivity {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  images: ConnectivityImage[];
}

/* =========================================================
   PUBLIC API URL
========================================================= */

const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

/* =========================================================
   IMAGE URL
========================================================= */

export function getConnectivityImageUrl(
  url: string
): string {
  if (!url) {
    return "";
  }

  /* Already a complete URL */
  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    /* Never expose Docker's internal backend hostname */
    if (url.includes("backend:8000")) {
      return url.replace(
        "http://backend:8000",
        PUBLIC_API_URL
      );
    }

    return url;
  }

  /* Backend returns paths such as:
     /uploads/connectivity/1/image.jpg
  */

  return `${PUBLIC_API_URL}${url}`;
}

/* =========================================================
   NORMALIZE CONNECTIVITY
========================================================= */

function normalizeConnectivity(
  item: Connectivity
): Connectivity {
  return {
    ...item,

    images: [...(item.images || [])]
      .sort(
        (a, b) =>
          a.display_order -
          b.display_order
      )
      .map((image) => ({
        ...image,
        image_url:
          getConnectivityImageUrl(
            image.image_url
          ),
      })),
  };
}

/* =========================================================
   GET SINGLE CONNECTIVITY
========================================================= */

export async function getConnectivity(
  slug: string
): Promise<Connectivity | null> {
  try {
    const response = await fetch(
      `${API_URL}/api/connectivity/slug/${encodeURIComponent(
        slug
      )}`,
      {
        cache: "no-store",
      }
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      console.error(
        "Failed to load connectivity:",
        response.status,
        response.statusText
      );

      return null;
    }

    const data =
      (await response.json()) as Connectivity;

    return normalizeConnectivity(data);
  } catch (error) {
    console.error(
      "Connectivity API error:",
      error
    );

    return null;
  }
}

/* =========================================================
   GET ALL CONNECTIVITY
========================================================= */

export async function getAllConnectivity(): Promise<
  Connectivity[]
> {
  try {
    const response = await fetch(
      `${API_URL}/api/connectivity`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "Failed to load connectivity sections:",
        response.status
      );

      return [];
    }

    const data =
      (await response.json()) as Connectivity[];

    return data
      .map(normalizeConnectivity)
      .sort(
        (a, b) =>
          a.display_order -
          b.display_order
      );
  } catch (error) {
    console.error(
      "Connectivity API error:",
      error
    );

    return [];
  }
}