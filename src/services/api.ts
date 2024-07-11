import axios, { AxiosInstance } from "axios";

const defaultHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.API_TOKEN}`,
};

// const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
//   const response = await fetch(`${process.env.API_BASE_URL}${endpoint}`, {
//     ...options,
//     headers: {
//       ...defaultHeaders,
//       ...options.headers,
//     },
//   });

//   console.log(response);

//   if (!response.ok) {
//     throw new Error(`API request failed with status ${response.status}`);
//   }

//   return response.json();
// };

const getApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
      ...defaultHeaders,
    },
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // Trate erros globais aqui, se necessário
      return Promise.reject(error);
    }
  );

  return client;
};

export default getApiClient;
