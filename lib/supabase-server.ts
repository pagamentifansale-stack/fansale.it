import { createClient } from '@supabase/supabase-js'

/**
 * Server-side Supabase client using the service role key.
 * Use ONLY in API routes / server components — never expose to the browser.
 */
export function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables'
    )
  }

  return createClient(url, key, {
    auth: {
      // Service-role client must not persist sessions
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
