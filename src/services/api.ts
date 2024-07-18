// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import { toast } from "sonner";

const defaultHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
};

const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }
  );

  if (!response.ok) {
    if (!response.ok) {
      if (response.status === 422) {
        const errorDetails = await response.json();
        const errorMessages = Object.values(errorDetails.errors).flat();

        errorMessages.forEach((message) => toast.error(message as string));

        return new Error(
          `Validation Error: ${JSON.stringify(errorDetails.errors)}`
        );
      }
    }
  }

  return await response.json();
};

export default apiFetch;
