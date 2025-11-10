import { z } from "zod";
import dotenv from "dotenv";

const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

const envSchema = z.object({
  PORT: z.string().default("3000").transform(Number),
  MONGO_URI: z.string().refine((val) => {
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  }),
  MONGO_INITDB_ROOT_USERNAME: z.string(),
  MONGO_INITDB_ROOT_PASSWORD: z.string(),
  JWT_SECRET: z.string(),
  MONGO_PORT: z.string().default("27017").transform(Number),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development")
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(parsedEnv.error.issues);
  process.exit(1);
}

export const ENV = parsedEnv.data;
