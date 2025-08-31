import { Hono } from "@hono/hono";
import * as authController from "./auth.controller.ts";

const auth = new Hono();

auth.post("/login", authController.login);

export default auth;