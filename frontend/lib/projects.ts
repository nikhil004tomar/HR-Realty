const API_URL =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL || "http://backend:8000"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";


export interface ProjectImage {
  id: number;
  project_id: number;
  image_url: string;
  alt_text?: string | null;
  sort_order?: number;
}


export interface Project {
  id: number;
  slug: string;
  title: string;
  status: string;
  location: string;
  price: string;
  plot_size: string;
  property_type: string;
  possession: string;
  description: string;
  highlights: string[];
  amenities: string[];
  map_url?: string | null;
  is_published: boolean;
  created_at?: string;
  updated_at?: string | null;
  images: ProjectImage[];
}


/* ============================================================
   IMAGE URL
============================================================ */

export function getImageUrl(
  imageUrl?: string | null
): string {
  if (!imageUrl) {
    return "/images/placeholder.jpg";
  }

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://")
  ) {
    return imageUrl;
  }

  /*
   * Server-side Docker:
   *   http://backend:8000
   *
   * Browser:
   *   http://localhost:8000
   */
  return `${API_URL}${imageUrl}`;
}


/* ============================================================
   GET ALL PROJECTS
============================================================ */

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(
    `${API_URL}/api/projects`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load projects: ${response.status}`
    );
  }

  return response.json();
}


/* ============================================================
   GET PROJECT BY SLUG
============================================================ */

export async function getProject(
  slug: string
): Promise<Project> {
  const response = await fetch(
    `${API_URL}/api/projects/slug/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("PROJECT_NOT_FOUND");
    }

    throw new Error(
      `Failed to load project: ${response.status}`
    );
  }

  return response.json();
}