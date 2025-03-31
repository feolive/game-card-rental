"use server";

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import tryCatch from "./try-catch";


/**
 * Create a new supabase client
 */
export async function createSupabaseClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            console.error("Failed to set cookies");
          }
        },
      },
    }
  )
}
 

/**
 * get the current logged in user
 * @returns 
 */
export async function supabaseGetUser() {
  const supabase = await createSupabaseClient();
  const [data, error] = await tryCatch(() => supabase.auth.getUser());
  return [data, error];
}

export async function supabaseSignUp({email, password}) {
  const supabase = await createSupabaseClient();
  const [data, error] = await tryCatch(() => supabase.auth.signUpWithPassword({ email: email, password: password }));
  return [data, error];
}

export async function supabaseSignIn({email, password}) {
  const supabase = await createSupabaseClient();
  const [data, error] = await tryCatch(() => supabase.auth.signInWithPassword({ email: email, password: password }));
  return [data, error];
}

export async function supabaseSignOut() {
  const supabase = await createSupabaseClient();
  const [data, error] = await tryCatch(() => supabase.auth.signOut());
  return [data, error];
}