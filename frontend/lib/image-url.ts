import API_URL from "@/lib/api";


export function getImageUrl(
  imageUrl?: string | null
): string {

  if (!imageUrl) {
    return "/placeholder.jpg";
  }


  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://")
  ) {

    return imageUrl;
  }


  return `${API_URL}${imageUrl}`;
}