import API_URL from "./api";
import { getToken } from "./auth";


type RequestOptions = RequestInit & {
  authenticated?: boolean;
};


export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {

  const {
    authenticated = false,
    ...fetchOptions
  } = options;


  const headers = new Headers(
    fetchOptions.headers
  );


  headers.set(
    "Content-Type",
    "application/json"
  );


  if (authenticated) {

    const token = getToken();

    if (token) {

      headers.set(
        "Authorization",
        `Bearer ${token}`
      );
    }
  }


  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...fetchOptions,
      headers,
    }
  );


  if (!response.ok) {

    let message =
      "Something went wrong";

    try {

      const error =
        await response.json();

      message =
        error.detail ||
        message;

    } catch {
      // Ignore invalid JSON
    }


    throw new Error(
      message
    );
  }


  if (response.status === 204) {
    return undefined as T;
  }


  return response.json();
}