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

  const { error } = await supabase.storage
    .from("artwork-web")
    .upload(path, webBuffer, { contentType });

  if (error) return { error: `Lỗi upload ảnh: ${error.message}` };
  return { path };
}
