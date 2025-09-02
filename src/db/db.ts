import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.ts";
import pg from "pg";

const { Pool } = pg;

const connectionString = Deno.env.get("DATABASE_URL");

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

export const db = drizzle(new Pool({
    connectionString: connectionString,
  }), { schema });