import API_URL from "@/lib/api";

export interface TeamMember {
  id: number;
  name: string;
  designation: string;
  bio: string | null;
  profile_image: string | null;
  phone: string | null;
  email: string | null;
  linkedin_url: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Convert backend image paths into browser-accessible URLs.
 */
export function getImageUrl(
  imageUrl?: string | null
): string {
  if (!imageUrl) {
    return "/images/placeholder.jpg";
  }

  const cleanUrl = imageUrl.trim();

  if (!cleanUrl) {
    return "/images/placeholder.jpg";
  }

  // Backend Docker URL
  if (cleanUrl.startsWith("http://backend:8000")) {
    return cleanUrl.replace(
      "http://backend:8000",
      API_URL
    );
  }

  // Local backend URL
  if (cleanUrl.startsWith("http://127.0.0.1:8000")) {
    return cleanUrl.replace(
      "http://127.0.0.1:8000",
      API_URL
    );
  }

  // Localhost backend URL
  if (cleanUrl.startsWith("http://localhost:8000")) {
    return cleanUrl.replace(
      "http://localhost:8000",
      API_URL
    );
  }

  // Already a public URL
  if (
    cleanUrl.startsWith("https://") ||
    cleanUrl.startsWith("http://")
  ) {
    return cleanUrl;
  }

  // Relative upload path
  return `${API_URL}${
    cleanUrl.startsWith("/")
      ? cleanUrl
      : `/${cleanUrl}`
  }`;
}

/**
 * Get team members from backend.
 */
export async function getTeamMembers(): Promise<
  TeamMember[]
> {
  try {
    console.log(
      "TEAM API URL:",
      `${API_URL}/api/team`
    );

    const response = await fetch(
      `${API_URL}/api/team`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        "Team API error:",
        response.status,
        errorText
      );

      throw new Error(
        `Failed to load team members: ${response.status}`
      );
    }

    const data =
      await response.json();

    if (!Array.isArray(data)) {
      console.error(
        "Invalid team API response:",
        data
      );

      return [];
    }

    return data;
  } catch (error) {
    console.error(
      "Team API error:",
      error
    );

    throw error;
  }
}