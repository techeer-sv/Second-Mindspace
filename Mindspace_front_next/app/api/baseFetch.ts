const VERSION = "api/v1/";
const BASEURL = `${process.env.API_URL}${VERSION}`;

const defaultHeaders = {
  "Content-Type": "application/json",
};

export async function baseFetch(endpoint: string, options?: RequestInit) {
  const accessToken = localStorage.getItem("accessToken");

  const authHeader: Record<string, string> = {};
  if (accessToken) {
    authHeader.Authorization = `Bearer ${accessToken}`;
  }
  const combinedHeaders = {
    ...defaultHeaders,
    ...authHeader,
    ...options?.headers,
  };

  const response = await fetch(`${BASEURL}${endpoint}`, {
    ...options,
    headers: new Headers(combinedHeaders),
  });

  return handleResponse(response);
}

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (isJson && data.errors !== null) {
      throw new Error(JSON.stringify(data.errors));
    }

    throw new Error(data.message || response.statusText);
  }

  return data as T;
}
