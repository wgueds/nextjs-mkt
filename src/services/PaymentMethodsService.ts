// src/app/services/PaymentMethodsService.ts
import apiFetch from "./api";

export const getPaymentMethods = async () => {
  return apiFetch("/app/payment-methods", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
