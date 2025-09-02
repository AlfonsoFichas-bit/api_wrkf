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
        return new Response(JSON.stringify({ errors: error.errors }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      return c.json({ message: "Internal server error" }, 500);
    }
  };