import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "~/server/database/models/schema";

export { sql, eq, and, or, ilike, like } from "drizzle-orm";

export * from "../database/models/types";

export const tables = schema;

export function useDrizzle() {
  return drizzle(process.env.DB_URL, {
    schema: schema,
  });
}

export type PostgresError = Error & {
  code: string;
  detail?: string;
};

export function isPostgresError(error: unknown): error is PostgresError {
  return (
    typeof error === "object"
    && error !== null
    && "code" in error
    && typeof (error as any).code === "string"
  );
}
