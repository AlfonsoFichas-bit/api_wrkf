import { z } from "npm:zod";

export const loginSchema = z.object({
  correo: z.string().email("Invalid email address"),
  contraseña: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginInput = z.infer<typeof loginSchema>;