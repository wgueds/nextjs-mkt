import apiFetch from "./api";

export const getProducts = async (sort?: string) => {
  const queryParams = sort ? `?sort=${encodeURIComponent(sort)}` : "";
  const url = `/products${queryParams}`;

  return apiFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getProduct = async (id: number) => {
  const url = `/products/${id}`;

  return apiFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
