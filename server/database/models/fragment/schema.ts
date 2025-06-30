import { pgTable, integer, varchar, timestamp } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

import { userSchema } from "../user/schema";

export const fragmentSchema = pgTable("fragments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  authorId: integer("author_id").references(() => userSchema.id, {
    onDelete: "cascade",
  }),
  text: varchar({ length: 255 }).notNull(),
  note: varchar({ length: 255 }),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

export const fragmentRelations = relations(fragmentSchema, ({ one }) => ({
  author: one(userSchema, {
    fields: [fragmentSchema.authorId],
    references: [userSchema.id],
  }),
}));
