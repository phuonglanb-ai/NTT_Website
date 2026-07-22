/**
 * Doc bien moi truong Supabase va bao loi RO RANG khi thieu.
 *
 * Truoc day cac client dung `process.env.X!` (non-null assertion): khi bien
 * thieu tren moi truong deploy, loi bat duoc chi la thong bao chung chung cua
 * thu vien -> rat kho doan la thieu bien nao. Ham nay noi thang ten bien con
 * thieu, va KHONG BAO GIO in ra gia tri (tranh lo khoa vao log).
 *
 * Ve ten bien: toan bo truy cap Supabase trong app nay deu o PHIA MAY CHU
 * (lib/supabase/{server,public,admin}.ts). Vi vay tien to NEXT_PUBLIC_ khong
 * bat buoc -- ta chap nhan CA HAI ten cho URL va anon key:
 *   - NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY  (giu tuong
 *     thich, va can neu sau nay dung client trinh duyet)
 *   - SUPABASE_URL / SUPABASE_ANON_KEY                          (don gian hon
 *     tren moi truong deploy)
 * Uu tien ban NEXT_PUBLIC_ neu ca hai cung co.
 */
function readFirst(names: string[]): string | undefined {
  for (const name of names) {
    const value = process.env[name];
    if (value && value.trim() !== "") return value;
  }
  return undefined;
}

function required(names: string[]): string {
  const value = readFirst(names);
  if (!value) {
    const list = names.join(" hoặc ");
    throw new Error(
      `Thiếu biến môi trường ${list}. ` +
        `Kiểm tra file .env.local (khi chạy ở máy) hoặc Environment Variables ` +
        `trên Vercel (khi deploy) — nhớ deploy lại sau khi thêm biến.`,
    );
  }
  return value;
}

export function supabaseUrl(): string {
  return required(["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_URL"]);
}

export function supabaseAnonKey(): string {
  return required(["NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_ANON_KEY"]);
}

export function supabaseServiceRoleKey(): string {
  return required(["SUPABASE_SERVICE_ROLE_KEY"]);
}
