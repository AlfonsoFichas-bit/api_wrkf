import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.ts";
import pg from "pg";

const { Pool } = pg;

export const db = drizzle(new Pool({
    connectionString: Deno.env.get("DATABASE_URL"),
  }), { schema });