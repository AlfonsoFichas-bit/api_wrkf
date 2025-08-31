import { db } from "../../../db/db.ts";
import { users } from "../../../db/schema.ts";
import { eq, sql } from "drizzle-orm";
import { hash } from "jsr:@felix/bcrypt";

export const getAllUsers = async () => {
  return await db.select().from(users);
};

export const getUserById = async (id: number) => {
  return await db.select().from(users).where(eq(users.id, id));
};

export const createUser = async (user: any) => {
  const hashedPassword = await hash(user.contraseña);
  const { id, ...userData } = user; // Destructure id if present, and get other user data
  try {
    const newUser = await db.insert(users).values({ ...userData, id: sql`DEFAULT`, contraseña: hashedPassword }).returning();
    return { success: true, data: newUser };
  } catch (error: any) {
    console.error("Error creating user:", error);
    return { success: false, error: error.message };
  }
};