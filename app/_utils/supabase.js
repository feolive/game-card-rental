"use server";

import { createClient } from "@supabase/supabase-js";
import tryCatch from "./try-catch";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";

/**
 * Create a new supabase client
 */
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

/**
 * get the current logged in user
 * @returns 
 */
const getUser = async () => {
  const [data, error] = await tryCatch(() => supabase.auth.getUser());
  return [data, error];
};

export { getUser };