import { Context, Next } from "@hono/hono";
import { z } from "npm:zod";

export const validate = (schema: z.ZodObject<any, any>) =>
  async (c: Context, next: Next) => {
    try {
      const body = await c.req.json();
      schema.parse(body);
      await next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({ errors: error.errors }, 400);
      }
      return c.json({ message: "Internal server error" }, 500);
    }
  };