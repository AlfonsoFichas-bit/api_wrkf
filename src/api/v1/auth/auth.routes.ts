import { Hono } from "@hono/hono";
import * as authController from "./auth.controller.ts";
import { validate } from "../../../core/middlewares/validation.middleware.ts";
import { loginSchema } from "./auth.validation.ts";
import { rateLimiter } from "jsr:@hono-rate-limiter/hono-rate-limiter@^0.4.2";

const auth = new Hono();

const loginRateLimiter = rateLimiter({
  windowMs: 60 * 1000, // 1 minute
  limit: 5, // 5 requests per minute
  standardHeaders: true, // Return rate limit info in the headers
  keyGenerator: (c) => c.req.ip, // Use IP address as key
  message: "Too many login attempts from this IP, please try again after a minute.",
});

auth.post("/login", loginRateLimiter, validate(loginSchema), authController.login);

export default auth;