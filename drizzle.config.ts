import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./server/database/models/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NUXT_DB_URL!,
  },
});
