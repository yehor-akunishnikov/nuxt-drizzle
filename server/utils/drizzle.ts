import type { H3Event } from "h3";

import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "~/server/database/models/schema";

export { sql, eq, and, or, ilike, like } from "drizzle-orm";

export * from "../database/models/types";

export const tables = schema;

export type PostgresError = Error & {
  cause: {
    code: string;
  };
};

export function isPostgresError(error: unknown): error is PostgresError {
  return (
    typeof error === "object"
    && error !== null
    && "cause" in error
    && typeof (error as any).cause === "object"
  );
}

export function useDrizzle(event: H3Event) {
  const config = useRuntimeConfig(event);

  return drizzle(config.dbUrl, {
    schema: schema,
  });
}

export type DrizzleInstance = ReturnType<typeof useDrizzle>;
