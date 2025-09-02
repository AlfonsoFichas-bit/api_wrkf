import { create, getNumericDate, Header } from "https://deno.land/x/djwt@v3.0.2/mod.ts";

const JWT_SECRET = Deno.env.get("JWT_SECRET");

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set.");
}

const header: Header = {
  alg: "HS256",
  typ: "JWT",
};

export const generateToken = async (userId: number) => {
  const payload = {
    uid: userId,
    exp: getNumericDate(60 * 60), // 1 hour expiration
  };
  const token = await create(header, payload, JWT_SECRET);
  return token;
};