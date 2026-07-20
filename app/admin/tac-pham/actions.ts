"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole, type UserRole } from "@/lib/auth/roles";
import { artworkInputSchema } from "@/lib/validation/artwork";
import { createWebRendition } from "@/lib/images/process";

export type ArtworkFormState = { error?: string } | undefined;

function str(formData: FormData, name: string) {
  const value = formData.get(name);
  return value == null ? "" : String(value);
}

function csv(formData: FormData, name: string) {
  return str(formData, name)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseFormFields(formData: FormData) {
  return {
    code: str(formData, "code"),
    titleVi: str(formData, "titleVi"),
    titleEn: str(formData, "titleEn"),
    year: str(formData, "year"),
    type: str(formData, "type"),
    collectionId: str(formData, "collectionId"),
    mediumId: str(formData, "mediumId"),
    seriesId: str(formData, "seriesId"),
    dimensions: str(formData, "dimensions"),
    dominantColors: csv(formData, "dominantColors"),
    descObjectiveVi: str(formData, "descObjectiveVi"),
    descObjectiveEn: str(formData, "descObjectiveEn"),
    artistNoteVi: str(formData, "artistNoteVi"),
    artistNoteEn: str(formData, "artistNoteEn"),
    criticNoteVi: str(formData, "criticNoteVi"),
    criticNoteEn: str(formData, "criticNoteEn"),
    criticNoteAuthor: str(formData, "criticNoteAuthor"),
    contextVi: str(formData, "contextVi"),
    contextEn: str(formData, "contextEn"),
    artistQuoteVi: str(formData, "artistQuoteVi"),
    artistQuoteEn: str(formData, "artistQuoteEn"),
    videoUrl: str(formData, "videoUrl"),
    ownershipStatus: str(formData, "ownershipStatus") || undefined,
    exhibitionStatus: str(formData, "exhibitionStatus") || undefined,
    status: str(formData, "status") || undefined,
    imageRights: str(formData, "imageRights") || undefined,
    keywords: csv(formData, "keywords"),
    styleIds: formData.getAll("styleIds").map(String),
    themeIds: formData.getAll("themeIds").map(String),
  };
}

function mapDbError(error: { code?: string; message: string }) {
  if (error.code === "23505") return "Mã tác phẩm này đã tồn tại.";
  return `Lỗi lưu dữ liệu: ${error.message}`;
}

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

async function uploadArtworkImages(
  supabase: SupabaseServerClient,
  artworkId: string,
  formData: FormData,
  { requirePrimary }: { requirePrimary: boolean },
): Promise<string | null> {
  const primaryFile = formData.get("primaryImage");
  const hasPrimaryFile = primaryFile instanceof File && primaryFile.size > 0;

  if (requirePrimary && !hasPrimaryFile) {
    return "Bắt buộc chọn ảnh chính.";
  }

  const entries: { file: File; altVi: string; altEn: string; isPrimary: boolean }[] = [];

  if (hasPrimaryFile) {
    const altVi = str(formData, "primaryAltVi");
    const altEn = str(formData, "primaryAltEn");
    if (!altVi || !altEn) {
      return "Bắt buộc nhập alt text (vi/en) cho ảnh chính.";
    }
    entries.push({ file: primaryFile as File, altVi, altEn, isPrimary: true });

    if (!requirePrimary) {
      // Dang sua va co anh chinh moi -> anh chinh cu khong con la primary nua.
      await supabase
        .from("artwork_images")
        .update({ is_primary: false })
        .eq("artwork_id", artworkId)
        .eq("is_primary", true);
    }
  }

  let i = 0;
  while (formData.has(`detailImage_${i}`)) {
    const file = formData.get(`detailImage_${i}`);
    if (file instanceof File && file.size > 0) {
      const altVi = str(formData, `detailAltVi_${i}`);
      const altEn = str(formData, `detailAltEn_${i}`);
      if (!altVi || !altEn) {
        return `Bắt buộc nhập alt text (vi/en) cho ảnh chi tiết #${i + 1}.`;
      }
      entries.push({ file, altVi, altEn, isPrimary: false });
    }
    i++;
  }

  const { count } = await supabase
    .from("artwork_images")
    .select("id", { count: "exact", head: true })
    .eq("artwork_id", artworkId);
  let sortOrder = count ?? 0;

  for (const entry of entries) {
    const arrayBuffer = await entry.file.arrayBuffer();
    const originalBuffer = Buffer.from(arrayBuffer);
    const { buffer: webBuffer, contentType } = await createWebRendition(originalBuffer);

    const originalExt = entry.file.name.split(".").pop() || "bin";
    const key = crypto.randomUUID();
    const webPath = `${artworkId}/${key}.jpg`;
    const originalPath = `${artworkId}/${key}-original.${originalExt}`;

    const { error: webUploadError } = await supabase.storage
      .from("artwork-web")
      .upload(webPath, webBuffer, { contentType });
    if (webUploadError) return `Lỗi upload ảnh: ${webUploadError.message}`;

    const { error: originalUploadError } = await supabase.storage
      .from("artwork-originals")
      .upload(originalPath, originalBuffer, {
        contentType: entry.file.type || "application/octet-stream",
      });
    if (originalUploadError) return `Lỗi upload ảnh gốc: ${originalUploadError.message}`;

    const { error: dbError } = await supabase.from("artwork_images").insert({
      artwork_id: artworkId,
      web_storage_path: webPath,
      original_storage_path: originalPath,
      is_primary: entry.isPrimary,
      alt_text_vi: entry.altVi,
      alt_text_en: entry.altEn,
      sort_order: sortOrder++,
    });
    if (dbError) return `Lỗi lưu thông tin ảnh: ${dbError.message}`;
  }

  return null;
}

async function replaceStylesAndThemes(
  supabase: SupabaseServerClient,
  artworkId: string,
  styleIds: string[],
  themeIds: string[],
) {
  await supabase.from("artwork_styles").delete().eq("artwork_id", artworkId);
  await supabase.from("artwork_themes").delete().eq("artwork_id", artworkId);

  if (styleIds.length) {
    await supabase
      .from("artwork_styles")
      .insert(styleIds.map((styleId) => ({ artwork_id: artworkId, style_id: styleId })));
  }
  if (themeIds.length) {
    await supabase
      .from("artwork_themes")
      .insert(themeIds.map((themeId) => ({ artwork_id: artworkId, theme_id: themeId })));
  }
}

function canEditArtistNote(role: UserRole) {
  return role === "artist" || role === "admin";
}

export async function createArtwork(
  _prevState: ArtworkFormState,
  formData: FormData,
): Promise<ArtworkFormState> {
  const current = await requireRole("editor");
  if (!current.authorized) return { error: "Không có quyền thực hiện." };

  const parsed = artworkInputSchema.safeParse(parseFormFields(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ." };
  }
  const data = parsed.data;
  const allowArtistNote = canEditArtistNote(current.role);

  const supabase = await createClient();

  const { data: inserted, error: insertError } = await supabase
    .from("artworks")
    .insert({
      code: data.code,
      title_vi: data.titleVi,
      title_en: data.titleEn || data.titleVi,
      year: data.year,
      type: data.type,
      collection_id: data.collectionId,
      medium_id: data.mediumId,
      series_id: data.seriesId || null,
      dimensions: data.dimensions || null,
      dominant_colors: data.dominantColors,
      desc_objective_vi: data.descObjectiveVi || null,
      desc_objective_en: data.descObjectiveEn || null,
      artist_note_vi: allowArtistNote ? data.artistNoteVi || null : null,
      artist_note_en: allowArtistNote ? data.artistNoteEn || null : null,
      artist_note_author: allowArtistNote && data.artistNoteVi ? current.userId : null,
      critic_note_vi: data.criticNoteVi || null,
      critic_note_en: data.criticNoteEn || null,
      critic_note_author: data.criticNoteVi ? data.criticNoteAuthor || null : null,
      context_vi: data.contextVi || null,
      context_en: data.contextEn || null,
      artist_quote_vi: data.artistQuoteVi || null,
      artist_quote_en: data.artistQuoteEn || null,
      video_url: data.videoUrl || null,
      ownership_status: data.ownershipStatus,
      exhibition_status: data.exhibitionStatus,
      status: data.status,
      image_rights: data.imageRights,
      keywords: data.keywords,
      published_at: data.status === "published" ? new Date().toISOString() : null,
    })
    .select("id")
    .single();

  if (insertError || !inserted) {
    return { error: mapDbError(insertError ?? { message: "unknown" }) };
  }

  const artworkId = inserted.id as string;

  await replaceStylesAndThemes(supabase, artworkId, data.styleIds, data.themeIds);

  const uploadError = await uploadArtworkImages(supabase, artworkId, formData, {
    requirePrimary: true,
  });
  if (uploadError) return { error: uploadError };

  revalidatePath("/admin/tac-pham");
  redirect(`/admin/tac-pham/${artworkId}`);
}

export async function updateArtwork(
  artworkId: string,
  _prevState: ArtworkFormState,
  formData: FormData,
): Promise<ArtworkFormState> {
  const current = await requireRole("editor");
  if (!current.authorized) return { error: "Không có quyền thực hiện." };

  const parsed = artworkInputSchema.safeParse(parseFormFields(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ." };
  }
  const data = parsed.data;
  const allowArtistNote = canEditArtistNote(current.role);

  const supabase = await createClient();

  const updatePayload: Record<string, unknown> = {
    code: data.code,
    title_vi: data.titleVi,
    title_en: data.titleEn || data.titleVi,
    year: data.year,
    type: data.type,
    collection_id: data.collectionId,
    medium_id: data.mediumId,
    series_id: data.seriesId || null,
    dimensions: data.dimensions || null,
    dominant_colors: data.dominantColors,
    desc_objective_vi: data.descObjectiveVi || null,
    desc_objective_en: data.descObjectiveEn || null,
    critic_note_vi: data.criticNoteVi || null,
    critic_note_en: data.criticNoteEn || null,
    critic_note_author: data.criticNoteVi ? data.criticNoteAuthor || null : null,
    context_vi: data.contextVi || null,
    context_en: data.contextEn || null,
    artist_quote_vi: data.artistQuoteVi || null,
    artist_quote_en: data.artistQuoteEn || null,
    video_url: data.videoUrl || null,
    ownership_status: data.ownershipStatus,
    exhibition_status: data.exhibitionStatus,
    status: data.status,
    image_rights: data.imageRights,
    keywords: data.keywords,
  };

  if (allowArtistNote) {
    updatePayload.artist_note_vi = data.artistNoteVi || null;
    updatePayload.artist_note_en = data.artistNoteEn || null;
    updatePayload.artist_note_author = data.artistNoteVi ? current.userId : null;
  }

  const { data: existing } = await supabase
    .from("artworks")
    .select("status, published_at")
    .eq("id", artworkId)
    .maybeSingle();

  if (data.status === "published" && existing?.status !== "published") {
    updatePayload.published_at = new Date().toISOString();
  }

  const { error: updateError } = await supabase
    .from("artworks")
    .update(updatePayload)
    .eq("id", artworkId);

  if (updateError) {
    return { error: mapDbError(updateError) };
  }

  await replaceStylesAndThemes(supabase, artworkId, data.styleIds, data.themeIds);

  const uploadError = await uploadArtworkImages(supabase, artworkId, formData, {
    requirePrimary: false,
  });
  if (uploadError) return { error: uploadError };

  revalidatePath("/admin/tac-pham");
  revalidatePath(`/admin/tac-pham/${artworkId}`);
  redirect(`/admin/tac-pham/${artworkId}`);
}
