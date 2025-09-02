import { Hono } from "@hono/hono";
import * as userController from "./users.controller.ts";
import { authMiddleware } from "../../../core/middlewares/auth.middleware.ts";

const users = new Hono();

users.get("/", userController.getAllUsers);
users.get("/:id", userController.getUserById);
users.post("/", userController.createUser);

// Protected route example
users.get("/me", authMiddleware, userController.getMe);

export default users;