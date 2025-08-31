import { db } from "../../../db/db.ts";
import { users } from "../../../db/schema.ts";
import { eq } from "drizzle-orm";
import { verify } from "jsr:@felix/bcrypt";

export const verifyUser = async (correo: string, contraseña: string) => {
  const user = await db.select().from(users).where(eq(users.correo, correo));

  if (user.length === 0) {
    return null; // User not found
  }

  const isPasswordValid = await verify(contraseña, user[0].contraseña);

  if (!isPasswordValid) {
    return null; // Invalid password
  }

  // In a real application, you might want to omit the password hash from the returned user object
  return user[0];
};