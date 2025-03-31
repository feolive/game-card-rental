"use server";

import { createClient } from "@supabase/supabase-js";
import tryCatch from "./try-catch";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";

/**
 * Create a new supabase client
 */
const createSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
});
}
 

/**
 * get the current logged in user
 * @returns 
 */
export async function supabaseGetUser() {
  const supabase = createSupabaseClient();
  const [data, error] = await tryCatch(() => supabase.auth.getUser());
  return [data, error];
}

export async function supabaseSignUp({email, password}) {
  const supabase = createSupabaseClient();
  const [data, error] = await tryCatch(() => supabase.auth.signUpWithPassword({ email: email, password: password }));
  return [data, error];
}

export async function supabaseSignIn({email, password}) {
  const supabase = createSupabaseClient();
  const [data, error] = await tryCatch(() => supabase.auth.signInWithPassword({ email: email, password: password }));
  return [data, error];
}

export async function supabaseSignOut() {
  const supabase = createSupabaseClient();
  const [data, error] = await tryCatch(() => supabase.auth.signOut());
  return [data, error];
}