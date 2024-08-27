// src/app/services/SaleService.ts
import apiFetch from "./api";

export const sendPayment = async (
  saleData: Record<string, any>,
  userToken: string
) => {
  return await apiFetch("/sales", {
    method: "POST",
    body: JSON.stringify(saleData),
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

export const getOrders = async (
  page: number,
  perPage: number,
  sort?: string
) => {
  return apiFetch(`/sales?sort=${sort}&page=${page}&per_page=${perPage}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getOrder = async (identifier: string) => {
  return apiFetch(`/sales/${identifier}/detail`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
