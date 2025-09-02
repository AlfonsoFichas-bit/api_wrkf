import { Context, Next } from "@hono/hono";
import { z } from "npm:zod";

export const validate = (schema: z.ZodObject<any, any>) =>
  async (c: Context, next: Next) => {
    console.log("Validation middleware executed.");
    try {
      const body = await c.req.json();
      console.log("Request body:", body);
      schema.parse(body);
      await next();
    } catch (error) {
      console.log("Error caught in validation middleware:", error);
      if (error instanceof z.ZodError) {
        console.log("Error is ZodError. Details:", error.errors);
        return new Response(JSON.stringify({ errors: JSON.parse(error.message) }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      console.log("Error is not ZodError.");
      return new Response(JSON.stringify({ message: "Internal server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  };