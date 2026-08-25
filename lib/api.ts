import { cookies } from "next/headers";
import { API_URL } from "./config";

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const isServer = typeof window === 'undefined';
  
  const headers: Record<string, string> = {
    "Accept": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (!headers["Content-Type"] && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (isServer) {
    try {
      // In server components or server actions, get token from cookies
      const token = cookies().get("admin_token")?.value;
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (e) {
      // cookies() throws error if called outside of request context (shouldn't happen here)
    }
  }

  const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;
  
  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`API Error on ${endpoint}: ${res.status} - ${errorText}`);
    throw new Error(`API Error: ${res.status}`);
  }

  if (res.status === 204) {
    return null;
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }

  return res.text();
}
