import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_BUCKET_ID: z.string().min(1),
    NEXT_PUBLIC_APPWRITE_PROJECT_ID: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_BUCKET_ID: process.env.NEXT_PUBLIC_APPWRITE_BUCKET,
    NEXT_PUBLIC_APPWRITE_PROJECT_ID:
      process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  },
});
