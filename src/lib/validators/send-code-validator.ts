import { z } from "zod";

export const SendCodeValidator = z.object({
  code: z
    .string()
    .regex(/^\d{6}$/, "O código deve conter exatamente 6 dígitos numéricos."),
  hash: z.string(),
});

export type TSendCodeValidator = z.infer<typeof SendCodeValidator>;
