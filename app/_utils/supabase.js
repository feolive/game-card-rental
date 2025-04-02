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
  const spb = await createSupabaseClient();
  const [data, error] = await tryCatch(() => spb.auth.getUser());
  return [data, error];
}

/**
 * Sign up a new user
 * @param {string} email email
 * @param {string} password password
 * @returns 
 */
export async function supabaseSignUp({email, password}) {
  const spb = await createSupabaseClient();
  const [data, error] = await tryCatch(() => spb.auth.signUpWithPassword({ email: email, password: password }));
  return [data, error];
}

/**
 * Sign in an existing user
 * @param {string} email email
 * @param {string} password password
 * @returns 
 */
export async function supabaseSignIn({email, password}) {
  const spb = await createSupabaseClient();
  const [data, error] = await tryCatch(() => spb.auth.signInWithPassword({ email: email, password: password }));
  return [data, error];
}


/**
 * Sign out the current user
 * @returns 
 */
export async function supabaseSignOut() {
  const spb = await createSupabaseClient();
  const [data, error] = await tryCatch(() => spb.auth.signOut());
  return [data, error];
}


export async function supabaseQuery({table, columns, eq, filters}) {
  const spb = await createSupabaseClient();
  const data = await spb.from(table).select(columns).eq(eq, filters);
  return data;
}

export async function supabaseInsert({table, item}) {
  const spb = await createSupabaseClient();
  const error = await spb.from(table).insert(item);
  return error;
}

export async function supabaseUpdate({table, item, eq, filters}) {
  const spb = await createSupabaseClient();
  const error = await spb.from(table).update(item).eq(eq, filters);
  return error;
}
