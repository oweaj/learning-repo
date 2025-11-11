interface FetchOptions extends RequestInit {}

export const cfetch = async (endpoint: string, options?: FetchOptions) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const res = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || `error status: ${res.status}`);
  }

  return res.json();
};
