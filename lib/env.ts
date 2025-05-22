import { z } from "zod"

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
})

export function validateEnv() {
  const env = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }

  const result = envSchema.safeParse(env)

  if (!result.success) {
    const missingVars = Object.keys(result.error.flatten().fieldErrors)
    throw new Error(
      `Missing or invalid environment variables: ${missingVars.join(", ")}`
    )
  }

  return result.data
}

export const env = validateEnv() 