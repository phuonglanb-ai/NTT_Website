import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Client dùng service_role key — bỏ qua toàn bộ RLS.
 *
 * CHỈ import trong code chạy phía server (Route Handler/Server Action) SAU KHI
 * đã tự kiểm tra quyền người gọi. Không bao giờ import vào Client Component
 * hay để lộ ra bundle trình duyệt.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
