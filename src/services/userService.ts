import apiFetch from "./api";

export const getUser = async (userId: string) => {
  return apiFetch(`/users/${userId}`);
};

export const createUser = async (userData: Record<string, any>) => {
  return apiFetch(`/users`, {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const updateUser = async (
  userId: string,
  userData: Record<string, any>
) => {
  return apiFetch(`/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(userData),
  });
};
