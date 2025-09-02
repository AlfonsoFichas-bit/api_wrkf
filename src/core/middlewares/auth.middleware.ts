import { Context, Next } from "@hono/hono";
import { verify } from "https://deno.land/x/djwt@v3.0.2/mod.ts";

const JWT_SECRET = Deno.env.get("JWT_SECRET");

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set.");
}

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ message: "Unauthorized: No token provided" }, 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = await verify(token, JWT_SECRET);
    // Attach user information to the context
    c.set("userId", payload.uid);
    await next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return c.json({ message: "Unauthorized: Invalid token" }, 401);
  }
};