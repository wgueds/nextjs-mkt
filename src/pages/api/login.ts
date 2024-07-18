import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import Cookies from "js-cookie";
import apiFetch from "@/services/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const response = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify(req.body),
      });

      if (response.success) {
        const { user, token } = response.data;

        // 1 day in seconds
        const oneDay = 24 * 60 * 60;

        // settins cookies
        res.setHeader("Set-Cookie", [
          serialize("_token", token, {
            path: "/",
            // httpOnly: true,
            // secure: false,
            maxAge: oneDay,
          }),
          serialize("_user", JSON.stringify(user), {
            path: "/",
            // httpOnly: true,
            // secure: false,
            maxAge: oneDay,
          }),
          serialize("_isLoggedIn", "1", {
            path: "/",
            // httpOnly: false,
            // secure: false,
            maxAge: oneDay,
          }),
        ]);

        res
          .status(200)
          .json({ success: true, message: "Login successful", user });
      } else {
        res.status(200).json({ success: false, message: response.message });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
