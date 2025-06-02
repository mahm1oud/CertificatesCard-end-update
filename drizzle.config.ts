/*import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
*/


import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config(); // لتحميل متغيرات البيئة من .env تلقائيًا

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("❌ DATABASE_URL is not defined in your .env file.");
}

export default defineConfig({
  schema: "./shared/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
