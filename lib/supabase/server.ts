import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase client cho Server Components / Server Actions / Route Handlers.
 * Vẫn dùng anon key + cookie phiên đăng nhập — RLS quyết định quyền đọc/ghi,
 * không phải client này.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll được gọi từ một Server Component không thể set cookie
            // (vd trong quá trình render) — bỏ qua vì middleware/proxy sẽ
            // refresh session ở request kế tiếp.
          }
        },
      },
    },
  );
}
