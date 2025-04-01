"use server";

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import tryCatch from "./try-catch";


/**
 * Create a new supabase client
 */
export async function supabase() {
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
          } catch (error) {
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
  const spb = await supabase();
  const [data, error] = await tryCatch(() => spb.auth.getUser());
  return [data, error];
}

export async function supabaseSignUp({email, password}) {
  const spb = await supabase();
  const [data, error] = await tryCatch(() => spb.auth.signUpWithPassword({ email: email, password: password }));
  return [data, error];
}

export async function supabaseSignIn({email, password}) {
  const spb = await supabase();
  const [data, error] = await tryCatch(() => spb.auth.signInWithPassword({ email: email, password: password }));
  return [data, error];
}

export async function supabaseSignOut() {
  const spb = await supabase();
  const [data, error] = await tryCatch(() => spb.auth.signOut());
  return [data, error];
}