import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

import { wordSchema } from "../word/schema";
import { fragmentSchema } from "../fragment/schema";

export const userSchema = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
});

export const userRelations = relations(userSchema, ({ many }) => ({
  words: many(wordSchema),
  fragments: many(fragmentSchema),
}));
