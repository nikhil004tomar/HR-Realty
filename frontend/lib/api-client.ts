import API_URL from "./api";
import { getToken } from "./auth";

type RequestOptions = Omit<RequestInit, "body"> & {
  authenticated?: boolean;
  body?: BodyInit | Record<string, unknown> | null;
};

function formatApiError(error: unknown): string {
  // ----------------------------------------------------------
  // STRING
  // ----------------------------------------------------------

  if (typeof error === "string") {
    return error;
  }

  // ----------------------------------------------------------
  // NULL / UNDEFINED
  // ----------------------------------------------------------

  if (error === null || error === undefined) {
    return "Something went wrong";
  }

  // ----------------------------------------------------------
  // ARRAY
  // ----------------------------------------------------------

  if (Array.isArray(error)) {
    return error
      .map((item) => formatApiError(item))
      .join("; ");
  }

  // ----------------------------------------------------------
  // OBJECT
  // ----------------------------------------------------------

  if (typeof error === "object") {
    const data = error as Record<string, unknown>;

    // FastAPI validation item
    if (typeof data.msg === "string") {
      const location = Array.isArray(data.loc)
        ? data.loc.join(".")
        : "";

      return location
        ? `${location}: ${data.msg}`
        : data.msg;
    }

    // FastAPI detail
    if (data.detail !== undefined) {
      return formatApiError(data.detail);
    }

    // Generic message
    if (typeof data.message === "string") {
      return data.message;
    }

    // Generic error
    if (typeof data.error === "string") {
      return data.error;
    }

    try {
      return JSON.stringify(data);
    } catch {
      return "Unknown API error";
    }
  }

  return String(error);
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    authenticated = false,
    body,
    ...fetchOptions
  } = options;

  // ==========================================================
  // HEADERS
  // ==========================================================

  const headers = new Headers(fetchOptions.headers);

  // ==========================================================
  // BODY
  // ==========================================================

  const isFormData =
    typeof FormData !== "undefined" &&
    body instanceof FormData;

  let requestBody: BodyInit | undefined;

  if (body !== null && body !== undefined) {
    if (
      isFormData ||
      typeof body === "string"
    ) {
      requestBody = body as BodyInit;
    } else {
      requestBody = JSON.stringify(body);
    }
  }

  // ==========================================================
  // CONTENT TYPE
  // ==========================================================

  if (isFormData) {
    // Let the browser set the multipart boundary.
    headers.delete("Content-Type");
  } else {
    headers.set(
      "Content-Type",
      "application/json"
    );
  }

  // ==========================================================
  // AUTHENTICATION
  // ==========================================================

  if (authenticated) {
    const token = getToken();

    if (token) {
      headers.set(
        "Authorization",
        `Bearer ${token}`
      );
    }
  }

  // ==========================================================
  // REQUEST
  // ==========================================================

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...fetchOptions,
      body: requestBody,
      headers,
    }
  );

  // ==========================================================
  // ERROR RESPONSE
  // ==========================================================

  if (!response.ok) {
    let message =
      `Request failed with status ${response.status}`;

    try {
      const errorData = await response.json();

      message = formatApiError(errorData);
    } catch {
      try {
        const text = await response.text();

        if (text.trim()) {
          message = text;
        }
      } catch {
        // Keep default message
      }
    }

    console.error(
      "API REQUEST ERROR:",
      {
        endpoint,
        status: response.status,
        message,
      }
    );

    throw new Error(message);
  }

  // ==========================================================
  // NO CONTENT
  // ==========================================================

  if (response.status === 204) {
    return undefined as T;
  }

  // ==========================================================
  // RESPONSE CONTENT TYPE
  // ==========================================================

  const contentType =
    response.headers.get("content-type") || "";

  if (
    !contentType.includes(
      "application/json"
    )
  ) {
    const text = await response.text();

    return text as T;
  }

  // ==========================================================
  // JSON RESPONSE
  // ==========================================================

  return response.json();
}