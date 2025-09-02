import { Context } from "@hono/hono";
import * as userService from "./users.service.ts";

export const getAllUsers = async (c: Context) => {
  const users = await userService.getAllUsers();
  return c.json(users);
};

export const getUserById = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  const user = await userService.getUserById(id);
  if (!user) {
    return c.json({ message: "User not found" }, 404);
  }
  return c.json(user);
};

export const createUser = async (c: Context) => {
  const user = await c.req.json();
  const result = await userService.createUser(user);
  if (result.success) {
    return c.json(result.data, 201);
  } else {
    return c.json({ message: "Failed to create user", error: result.error }, 500);
  }
};

export const getMe = async (c: Context) => {
  const userId = c.get("userId"); // Get userId from context set by authMiddleware
  if (!userId) {
    return c.json({ message: "User ID not found in context" }, 500); // Should not happen if middleware works
  }
  const user = await userService.getUserById(userId);
  if (!user) {
    return c.json({ message: "User not found" }, 404);
  }
  return c.json(user);
};