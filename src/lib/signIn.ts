import { supabase } from "@/src/lib/supabase";

export async function signIn(email: string, password: string) {
  console.log("signIn1", email, password);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log("signIn2", data, error);
  if (error) throw error;
  return data;
}
