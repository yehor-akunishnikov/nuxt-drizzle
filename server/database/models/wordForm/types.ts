import type { partOfSpeechEnum, wordFormSchema } from "./schema";

export type WordFormSelect = typeof wordFormSchema.$inferSelect;
export type WordFormInsert = typeof wordFormSchema.$inferInsert;
export type PARTS_OF_SPEECH = (typeof partOfSpeechEnum.enumValues)[number];
