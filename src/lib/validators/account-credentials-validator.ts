import { z } from "zod";

export const AuthCredentialsValidator = z
  .object({
    name: z.string().min(1, "O campo nome é obrigatório."),
    email: z.string().email("Formato de email inválido."),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    password_confirmation: z
      .string()
      .min(6, "A confirmação de senha deve ter pelo menos 6 caracteres."),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "As senhas não coincidem.",
    path: ["password_confirmation"],
  });

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;
