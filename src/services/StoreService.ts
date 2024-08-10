import apiFetch from "./api";

export const getUser = async (store?: string) => {
  return apiFetch(`/categories/${store}`);
};
