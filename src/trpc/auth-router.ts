import { AuthCredentialsValidator } from "@/lib/validators/account-credentials-validator";
import { publicProcedure, router } from "./trpc";
// import { getPayloadClient } from "@/get-payload";

import { TRPCError } from "@trpc/server";
import getApiClient from "@/services/api";

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { name, email, password } = input;
      const client = await getApiClient();

      // check if user already exists
      const { data: users } = await client.get("/users/validate", {
        params: {
          email: email,
        },
      });

      console.log(users);

      if (users.length !== 0) throw new TRPCError({ code: "CONFLICT" });

      //   await client.post("users", {
      //     name,
      //     email,
      //     password,
      //     role: "consumer",
      //   });

      return { success: true, sentToEmail: email };
    }),
});
