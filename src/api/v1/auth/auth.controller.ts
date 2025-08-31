import { Context } from "@hono/hono";
import * as authService from "./auth.service.ts";

export const login = async (c: Context) => {
  const { correo, contraseña } = await c.req.json();
  const user = await authService.verifyUser(correo, contraseña);

  if (!user) {
    return c.json({ message: "Invalid credentials" }, 401);
  }

  // In a real application, you would generate and return a JWT or session token here.
  return c.json({ message: "Login successful", user });
};