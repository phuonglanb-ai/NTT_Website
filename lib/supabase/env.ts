/**
 * Doc bien moi truong Supabase va bao loi RO RANG khi thieu.
 *
 * Truoc day cac client dung `process.env.X!` (non-null assertion): khi bien
 * thieu tren moi truong deploy, loi bat duoc chi la thong bao chung chung cua
 * thu vien -> rat kho doan la thieu bien nao. Ham nay noi thang ten bien con
 * thieu, va KHONG BAO GIO in ra gia tri (tranh lo khoa vao log).
 */
function required(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(
      `Thiếu biến môi trường ${name}. ` +
        `Kiểm tra file .env.local (khi chạy ở máy) hoặc Environment Variables ` +
        `trên Vercel (khi deploy) — nhớ deploy lại sau khi thêm biến.`,
    );
  }
  return value;
}

export function supabaseUrl(): string {
  return required("NEXT_PUBLIC_SUPABASE_URL");
}

export function supabaseAnonKey(): string {
  return required("NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export function supabaseServiceRoleKey(): string {
  return required("SUPABASE_SERVICE_ROLE_KEY");
}
