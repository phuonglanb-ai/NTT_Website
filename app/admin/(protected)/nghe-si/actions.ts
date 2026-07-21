"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/roles";
import { artistInputSchema } from "@/lib/validation/artist";
import { uploadWebImage } from "@/lib/images/upload";
import { logAudit } from "@/lib/audit";

export type ArtistFormState = { error?: string; ok?: boolean } | undefined;

function str(formData: FormData, name: string) {
  const value = formData.get(name);
  return value == null ? "" : String(value);
}

export async function updateArtist(
  artistId: string,
  _prevState: ArtistFormState,
  formData: FormData,
): Promise<ArtistFormState> {
  const current = await requireRole("editor");
  if (!current.authorized) return { error: "Không có quyền thực hiện." };

  const parsed = artistInputSchema.safeParse({
    name: str(formData, "name"),
    bioVi: str(formData, "bioVi"),
    bioEn: str(formData, "bioEn"),
    statementVi: str(formData, "statementVi"),
    statementEn: str(formData, "statementEn"),
    journeyVi: str(formData, "journeyVi"),
    journeyEn: str(formData, "journeyEn"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ." };
  }
  const data = parsed.data;

  const supabase = await createClient();

  const payload: Record<string, unknown> = {
    name: data.name,
    bio_vi: data.bioVi || null,
    bio_en: data.bioEn || null,
    statement_vi: data.statementVi || null,
    statement_en: data.statementEn || null,
    journey_vi: data.journeyVi || null,
    journey_en: data.journeyEn || null,
  };

  const portrait = formData.get("portrait");
  if (portrait instanceof File && portrait.size > 0) {
    const result = await uploadWebImage(supabase, portrait, `artists/${artistId}`);
    if ("error" in result) return { error: result.error };
    payload.portrait_storage_path = result.path;
  }

  const { error } = await supabase.from("artists").update(payload).eq("id", artistId);
  if (error) return { error: `Lỗi lưu dữ liệu: ${error.message}` };

  await logAudit({
    action: "update",
    entity: "artist",
    entityId: artistId,
    summary: data.name,
  });

  revalidatePath("/admin/nghe-si");
  revalidatePath("/vi/nghe-si");
  revalidatePath("/en/nghe-si");
  return { ok: true };
}
