import apiFetch from "./api";

export const getUserCategories = async (store?: string) => {
  return apiFetch(`/categories/${store}`);
};
