import apiFetch from "./api";
// import { cookies } from "next/headers";

export const getUser = async (userId: string) => {
  return apiFetch(`/users/${userId}`);
};

export const createUser = async (userData: Record<string, any>) => {
  return await apiFetch("/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const sendCodeValidate = async (userData: Record<string, any>) => {
  return await apiFetch("/users/code-validation", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

/**
 * Method responsible for resend code validation
 *
 * @param data
 * @returns
 */
export const resendCodeValidate = async (data: Record<string, any>) => {
  return await apiFetch("/users/code-resend", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * Method responsible for get login user
 *
 * @param data
 * @returns
 */
export const loginUser = async (userData: Record<string, any>) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
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
