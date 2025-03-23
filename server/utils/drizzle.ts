// for local postgres:
import { drizzle } from "drizzle-orm/postgres-js";

import { config } from "dotenv";
import * as schema from "../database/schema";
export { and, eq, ilike, or, sql } from "drizzle-orm";
config({ path: ".env" }); // or .env.local

// for neon db:
// import { neon } from "@neondatabase/serverless";

export const tables = schema;

export function useDrizzle() {
  // for local postgres:
  return drizzle(process.env.DATABASE_URL as string);

  // for neon db:
  // const sql = neon(process.env.DATABASE_URL!);
  // return drizzle({ client: sql });
}

export type User = typeof schema.users.$inferSelect;

export const userInsertSchema = schema.userInsertSchema.omit({
  createdAt: true,
  avatar: true,
});
export const userSelectSchema = schema.userSelectSchema;
