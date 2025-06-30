import type { fragmentSchema } from "./schema";

export type FragmentSelect = typeof fragmentSchema.$inferSelect;
export type FragmentInsert = typeof fragmentSchema.$inferInsert;
