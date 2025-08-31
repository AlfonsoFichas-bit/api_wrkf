import { Hono } from "@hono/hono";
import * as userController from "./users.controller.ts";

const users = new Hono();

users.get("/", userController.getAllUsers);
users.get("/:id", userController.getUserById);
users.post("/", userController.createUser);

export default users;