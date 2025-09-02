import { db } from "../../../db/db.ts";
import { users } from "../../../db/schema.ts";
import { eq } from "drizzle-orm";
import { verify } from "jsr:@felix/bcrypt";
import { generateToken } from "../../../core/utils/jwt.ts";

export const verifyUser = async (correo: string, contraseña: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.correo, correo));

    if (user.length === 0) {
      return null; // User not found
    }

    const isPasswordValid = await verify(contraseña, user[0].contraseña);

    if (!isPasswordValid) {
      return null; // Invalid password
    }

    const { contraseña: _, ...userWithoutPassword } = user[0];
    const token = await generateToken(user[0].id);

    return { user: userWithoutPassword, token };
  } catch (error) {
    console.error("Error during user verification:", error);
    return null; // Indicate failure without revealing details
  }
};