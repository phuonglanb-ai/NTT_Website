import { createClient } from "@/lib/supabase/server";
import { PAGE_SIZE, type ArtworkListItem } from "@/lib/content/artworks";

// Thoat cac ky tu dac biet cua PostgREST or() de tranh loi cu phap / injection
// vao bo loc (dau phay, ngoac, sao...). Chi giu lai noi dung nguoi dung go.
function sanitize(term: string) {
  return term.replace(/[,()*\\]/g, " ").trim();
}

/**
 * Tim kiem co ban tren tac pham da published: khop title_vi/title_en (ilike)
 * hoac keywords (mang) chua tu khoa. Du cho MVP; full-text nang cao (tsvector)
 * de V2.
 */
export async function searchArtworks(
  rawQuery: string,
  { page = 1 }: { page?: number },
) {
  const q = sanitize(rawQuery);
  const supabase = await createClient();

  if (!q) {
    return { items: [] as ArtworkListItem[], total: 0, totalPages: 1 };
  }

  const like = `%${q}%`;
  const from = (page - 1) * PAGE_SIZE;

  const { data, count, error } = await supabase
    .from("artworks")
    .select(
      "id, code, title_vi, title_en, year, type, status, collections!inner(slug), artwork_images(web_storage_path, is_primary, alt_text_vi, alt_text_en, sort_order)",
      { count: "exact" },
    )
    .eq("status", "published")
    .or(`title_vi.ilike.${like},title_en.ilike.${like},keywords.cs.{${q}}`)
    .order("year", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  if (error) throw error;

  const items: ArtworkListItem[] = (data ?? []).map((row) => {
    const collection = Array.isArray(row.collections) ? row.collections[0] : row.collections;
    const images = (row.artwork_images ?? [])
      .map((img) => ({
        webUrl: supabase.storage.from("artwork-web").getPublicUrl(img.web_storage_path).data
          .publicUrl,
        isPrimary: img.is_primary,
        altTextVi: img.alt_text_vi,
        altTextEn: img.alt_text_en,
        sortOrder: img.sort_order,
      }))
      .sort((a, b) =>
        a.isPrimary === b.isPrimary ? a.sortOrder - b.sortOrder : a.isPrimary ? -1 : 1,
      );
    const primary = images.find((i) => i.isPrimary) ?? images[0] ?? null;
    return {
      id: row.id,
      code: row.code,
      titleVi: row.title_vi,
      titleEn: row.title_en,
      year: row.year,
      type: row.type,
      status: row.status,
      collectionSlug: collection?.slug ?? "",
      primaryImageUrl: primary?.webUrl ?? null,
      primaryImageAltVi: primary?.altTextVi ?? null,
      primaryImageAltEn: primary?.altTextEn ?? null,
    };
  });

  return {
    items,
    total: count ?? 0,
    totalPages: Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE)),
  };
}
