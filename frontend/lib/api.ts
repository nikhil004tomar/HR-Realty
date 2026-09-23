const API_URL =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL
    : process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "API URL is not configured. Set INTERNAL_API_URL or NEXT_PUBLIC_API_URL."
  );
}

export default API_URL;