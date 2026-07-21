import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "./env";

/**
 * Supabase client cho trình duyệt (Client Components).
 * Chỉ dùng anon key — mọi quyền truy cập dữ liệu đi qua RLS.
 */
export function createClient() {
  return createBrowserClient(supabaseUrl(), supabaseAnonKey());
}
