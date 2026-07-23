import { createClient } from "@/lib/supabase/server";
import { createWebRendition } from "./process";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

/**
 * Upload 1 anh (bản hiển thị web, đã bỏ EXIF) vào bucket artwork-web dưới
 * folder cho trước. Trả về storage path để lưu vào DB. Dùng cho ảnh không cần
 * giữ bản gốc riêng tư (vd chân dung nghệ sĩ). Ảnh tác phẩm vẫn dùng luồng
 * riêng ở app/admin/tac-pham/actions.ts (có bucket gốc riêng tư).
 */
export async function uploadWebImage(
  supabase: SupabaseServerClient,
  file: File,
  folder: string,
): Promise<{ path: string } | { error: string }> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const { buffer: webBuffer, contentType } = await createWebRendition(buffer);
  const path = `${folder}/${crypto.randomUUID()}.jpg`;

  // Boc Blob: xem chu thich o app/admin/tac-pham/actions.ts. Truyen thang Node
  // Buffer cho supabase-js tren Vercel lam anh bi hong (byte nhi phan bi ma hoa
  // lai thanh UTF-8). Blob gui du lieu di duoi dang nhi phan ro rang.
  const { error } = await supabase.storage
    .from("artwork-web")
    .upload(path, new Blob([new Uint8Array(webBuffer)], { type: contentType }), { contentType });

  if (error) return { error: `Lỗi upload ảnh: ${error.message}` };
  return { path };
}
