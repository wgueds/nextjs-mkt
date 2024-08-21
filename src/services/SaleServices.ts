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
