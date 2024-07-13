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

        throw new Error(
          `Validation Error: ${JSON.stringify(errorDetails.errors)}`
        );
      }
      throw new Error(`API request failed with status ${response.status}`);
    }

    throw new Error(`API request failed with status ${response.status}`);
  }

  return await response.json();
};

export default apiFetch;

// const getApiClient = (): AxiosInstance => {
//   const client = axios.create({
//     baseURL: process.env.API_BASE_URL,
//     headers: {
//       ...defaultHeaders,
//     },
//   });

//   client.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       // Trate erros globais aqui, se necessário
//       return Promise.reject(error);
//     }
//   );

//   return client;
// };

// export default getApiClient;
