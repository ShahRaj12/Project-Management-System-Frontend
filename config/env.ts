import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_ENV: z.enum(["local", "stage", "production"]),
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_APP_NAME: z.string().default("My App"),
  NEXT_PUBLIC_APP_VERSION: z.string().default("1.0.0"),
});

// Since NextJS bundles environment variables during build time, we read process.env.
// In client components, only NEXT_PUBLIC_ variables are accessible.
const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
});

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const APP_ENV = parsedEnv.data.NEXT_PUBLIC_APP_ENV;
export const API_URL = parsedEnv.data.NEXT_PUBLIC_API_URL;
export const APP_NAME = parsedEnv.data.NEXT_PUBLIC_APP_NAME;
export const APP_VERSION = parsedEnv.data.NEXT_PUBLIC_APP_VERSION;
