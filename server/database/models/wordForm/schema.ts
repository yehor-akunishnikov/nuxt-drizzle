import { integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { wordSchema } from "../word/schema";

export const partOfSpeechEnum = pgEnum("part_of_speech", [
  "noun",
  "verb",
  "adjective",
  "adverb",
  "pronoun",
  "preposition",
  "conjunction",
  "interjection",
]);

export const wordFormSchema = pgTable("word_forms", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  baseWordId: integer("base_word").references(() => wordSchema.id, {
    onDelete: "cascade",
  }),
  spelling: varchar({ length: 255 }).notNull(),
  partOfSpeech: partOfSpeechEnum().notNull(),
  transcription: varchar({ length: 255 }),
  definition: varchar({ length: 500 }),
  sound: varchar({ length: 255 }),
});

export const wordFormRelations = relations(wordFormSchema, ({ one }) => ({
  baseWord: one(wordSchema, {
    fields: [wordFormSchema.baseWordId],
    references: [wordSchema.id],
  }),
}));
