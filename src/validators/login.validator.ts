import z from "zod";

export const loginUserSchema = z.object({
  email: z.string({ message: "E-mail é obrigatório" }).email({ message: "E-mail inválido" }),
  password: z.string({ message: "Senha é obrigatório" }),
});
