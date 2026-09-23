const API_URL =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL || "http://backend:8000"
    : process.env.NEXT_PUBLIC_API_URL || "https://api.thehrrealty.com";

export default API_URL;