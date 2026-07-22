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
/**
 * Khoa Supabase la JWT: 3 doan ngan cach boi dau cham, moi doan chi gom ky tu
 * base64url (A-Z a-z 0-9 - _).
 *
 * Kiem tra nay bat mot loi RAT kho doan: khoa chua doan "--", nhieu trinh soan
 * thao (Word, Notepad co autocorrect, o nhap tren web) tu dong doi "--" thanh
 * dau gach dai "—". Khoa van "trong giong that", chi ngan di 1 ky tu, va moi
 * truy van deu that bai voi thong bao chung chung. Da mat nhieu gio vi loi nay
 * -- nen bat no ngay tai cho, noi ro nguyen nhan.
 */
function looksLikeJwt(value: string): boolean {
  const parts = value.split(".");
  return parts.length === 3 && parts.every((p) => /^[A-Za-z0-9_-]+$/.test(p));
}

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

/**
 * Nhu required(), nhung UU TIEN bien co dinh dang JWT hop le: neu bien dau
 * bi hong (vd bi trinh soan thao doi "--" thanh "—") ma bien du phong lai
 * dung, ta dung bien dung thay vi that bai. Chi bao loi khi KHONG cai nao hop le.
 */
function requiredJwt(names: string[]): string {
  const candidates = names
    .map((name) => ({ name, value: process.env[name]?.trim() }))
    .filter((c): c is { name: string; value: string } => Boolean(c.value));

  const valid = candidates.find((c) => looksLikeJwt(c.value));
  if (valid) return valid.value;

  if (candidates.length > 0) {
    throw new Error(
      `Khoá Supabase trong ${candidates.map((c) => c.name).join(", ")} không đúng định dạng JWT. ` +
        `Nguyên nhân thường gặp: khoá bị cắt cụt khi copy, hoặc trình soạn thảo tự đổi "--" ` +
        `thành dấu gạch dài "—". Hãy copy lại trực tiếp từ Supabase → Project Settings → API.`,
    );
  }

  return required(names); // khong co bien nao -> bao thieu bien
}

export function supabaseUrl(): string {
  return required(["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_URL"]);
}

export function supabaseAnonKey(): string {
  return requiredJwt(["NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_ANON_KEY"]);
}

export function supabaseServiceRoleKey(): string {
  return requiredJwt(["SUPABASE_SERVICE_ROLE_KEY"]);
}
