/* ============================================================
   API URL CONFIGURATION
============================================================ */

const API_URL =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL || "http://127.0.0.1:8000"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/*
 * Public API URL.
 *
 * This URL can safely be used in browser HTML.
 *
 * Local:
 *   http://localhost:8000
 *
 * Production:
 *   https://api.thehrrealty.com
 */

const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";


/* ============================================================
   PROJECT IMAGE
============================================================ */

export interface ProjectImage {
  id: number;

  project_id: number;

  image_url: string;

  alt_text?: string | null;

  sort_order?: number;
}


/* ============================================================
   PROJECT
============================================================ */

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

  /*
   * No image
   */
  if (!imageUrl) {
    return "/images/placeholder.jpg";
  }


  /*
   * Internal Docker URL
   *
   * Example:
   *
   * http://backend:8000/uploads/projects/...
   *
   * Never expose this URL to the browser.
   */
  if (
    imageUrl.startsWith(
      "http://backend:8000"
    )
  ) {
    return imageUrl.replace(
      "http://backend:8000",
      PUBLIC_API_URL
    );
  }


  /*
   * Other complete URL
   */
  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://")
  ) {
    return imageUrl;
  }


  /*
   * Relative upload path
   *
   * Example:
   *
   * /uploads/projects/dvsdbf/dvsdbf-1.jpg
   *
   * Convert to:
   *
   * http://localhost:8000/uploads/projects/...
   *
   * OR
   *
   * https://api.thehrrealty.com/uploads/projects/...
   */
  return `${PUBLIC_API_URL}${imageUrl}`;
}


/* ============================================================
   GET ALL PROJECTS
============================================================ */

export async function getProjects(): Promise<Project[]> {

  try {

    const url =
      `${API_URL}/api/projects`;


    console.log(
      "Loading projects from:",
      url
    );


    const response =
      await fetch(
        url,
        {
          cache: "no-store",
        }
      );


    /*
     * API error
     */
    if (!response.ok) {

      let errorDetails = "";

      try {
        errorDetails =
          await response.text();
      } catch {
        // Ignore parsing error
      }


      console.error(
        "Projects API error:",
        {
          url,
          status: response.status,
          statusText: response.statusText,
          body: errorDetails,
        }
      );


      /*
       * Don't crash the entire
       * projects page.
       */
      return [];
    }


    /*
     * Read JSON
     */
    const data =
      await response.json();


    /*
     * Make sure response
     * is an array.
     */
    if (!Array.isArray(data)) {

      console.error(
        "Invalid projects response.",
        "Expected an array but received:",
        data
      );

      return [];
    }


    return data;

  } catch (error) {

    console.error(
      "Projects API request failed:",
      error
    );


    /*
     * Keep page renderable
     * if backend is unavailable.
     */
    return [];
  }
}


/* ============================================================
   GET SINGLE PROJECT BY SLUG
============================================================ */

export async function getProject(
  slug: string
): Promise<Project> {

  try {

    /*
     * IMPORTANT:
     *
     * Backend route is:
     *
     * GET /api/projects/slug/{slug}
     *
     * Example:
     *
     * /api/projects/slug/dvsdbf
     */
    const url =
      `${API_URL}/api/projects/slug/${encodeURIComponent(slug)}`;


    console.log(
      "Loading project from:",
      url
    );


    const response =
      await fetch(
        url,
        {
          cache: "no-store",
        }
      );


    /* ========================================================
       PROJECT NOT FOUND
    ======================================================== */

    if (response.status === 404) {

      console.error(
        `Project not found: ${slug}`
      );

      throw new Error(
        "PROJECT_NOT_FOUND"
      );
    }


    /* ========================================================
       OTHER API ERRORS
    ======================================================== */

    if (!response.ok) {

      let errorDetails = "";

      try {

        errorDetails =
          await response.text();

      } catch {
        // Ignore response parsing error
      }


      console.error(
        "Project API error:",
        {
          url,
          status: response.status,
          statusText: response.statusText,
          body: errorDetails,
        }
      );


      throw new Error(
        `Failed to load project: ${response.status}`
      );
    }


    /* ========================================================
       READ PROJECT JSON
    ======================================================== */

    const data =
      await response.json();


    /* ========================================================
       VALIDATE RESPONSE
    ======================================================== */

    if (
      !data ||
      typeof data !== "object"
    ) {

      console.error(
        "Invalid project response:",
        data
      );

      throw new Error(
        "PROJECT_INVALID_RESPONSE"
      );
    }


    console.log(
      "Project loaded successfully:",
      data
    );


    return data as Project;


  } catch (error) {

    /*
     * Keep the specific
     * not-found error.
     */
    if (
      error instanceof Error &&
      error.message ===
        "PROJECT_NOT_FOUND"
    ) {

      throw error;
    }


    /*
     * Log the real error
     * for debugging.
     */
    console.error(
      `Failed to load project "${slug}":`,
      error
    );


    /*
     * Keep the same error
     * expected by your page.
     */
    throw new Error(
      "PROJECT_LOAD_FAILED"
    );
  }
}