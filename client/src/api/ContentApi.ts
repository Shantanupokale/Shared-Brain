const BASE_URL = "http://localhost:3000";

// Fetching contents logic
interface FetchContentsParams {
  queryKey: [string, { searchQuery?: string }];
}

export const fetchContents = async ({ queryKey }: FetchContentsParams) => {
  const [, { searchQuery = "" }] = queryKey;
  const token = localStorage.getItem("authToken");

  const url = searchQuery
    ? `${BASE_URL}/api/v1/content?search=${encodeURIComponent(searchQuery)}`
    : `${BASE_URL}/api/v1/content`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch content");
  }

  return response.json();
};

// Adding new content
interface AddContentParams {
  title: string;
  link: string;
  type: string;
  description? : string
}

export const addContent = async ({ title, link, type, description }: AddContentParams) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`${BASE_URL}/api/v1/content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
    },
    body: JSON.stringify({
      title,
      link,
      type,
      description,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add content");
  }

  return response.json();
};
