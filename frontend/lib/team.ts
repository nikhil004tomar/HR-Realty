const API_URL =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL || "http://127.0.0.1:8000"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

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

export function getImageUrl(
  imageUrl?: string | null
): string {
  if (!imageUrl) {
    return "/images/placeholder.jpg";
  }

  // Already a complete URL
  if (
    imageUrl.startsWith("https://") ||
    imageUrl.startsWith("http://")
  ) {
    // Prevent internal Docker hostname
    // from being exposed to the browser.
    if (imageUrl.includes("backend:8000")) {
      return imageUrl.replace(
        "http://backend:8000",
        PUBLIC_API_URL
      );
    }

    return imageUrl;
  }

  // Relative upload path
  return `${PUBLIC_API_URL}${imageUrl}`;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await fetch(
      `${API_URL}/api/team`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to load team members: ${response.status}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data;
  } catch (error) {
    console.error(
      "Team API error:",
      error
    );

    return [];
  }
}