import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { supabaseServiceRoleKey, supabaseUrl } from "./env";

/**
 * Client dùng service_role key — bỏ qua toàn bộ RLS.
 *
 * CHỈ import trong code chạy phía server (Route Handler/Server Action) SAU KHI
 * đã tự kiểm tra quyền người gọi. Không bao giờ import vào Client Component
 * hay để lộ ra bundle trình duyệt.
 */
export function createAdminClient() {
  return createSupabaseClient(supabaseUrl(), supabaseServiceRoleKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
