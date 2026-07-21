import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

// Initialise le client Supabase. A appeler une seule fois, au demarrage de l'app.
export function initSupabase(url: string, anonKey: string): SupabaseClient {
  if (!url || !anonKey) {
    throw new Error("Variables Supabase manquantes (url ou anonKey).");
  }
  client = createClient(url, anonKey);
  return client;
}

// Recupere le client Supabase deja initialise.
export function getSupabase(): SupabaseClient {
  if (!client) {
    throw new Error(
      "Supabase n'est pas initialise. Appelez initSupabase() au demarrage de l'app."
    );
  }
  return client;
}
