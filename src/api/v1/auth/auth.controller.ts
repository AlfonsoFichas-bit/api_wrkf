import { Context } from "@hono/hono";
import * as authService from "./auth.service.ts";

export const login = async (c: Context) => {
  const { correo, contraseña } = await c.req.json();
  const result = await authService.verifyUser(correo, contraseña);

  if (!result) {
    return c.json({ message: "Invalid credentials" }, 401);
  }

  const { user, token } = result;
  return c.json({ message: "Login successful", user, token });
};