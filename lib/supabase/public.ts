import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "./env";

/**
 * Client anon KHONG kem cookie phien. Dung cho sitemap/robots -- luon chi
 * thay noi dung status='published' theo RLS, ke ca khi Admin dang dang nhap
 * (tranh lo URL ban nhap vao sitemap cong khai).
 */
export function createPublicClient() {
  return createSupabaseClient(supabaseUrl(), supabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
