import { createClient } from "@/lib/supabase/server";
import type { CollectionSlug } from "@/lib/content/collections";

export const PAGE_SIZE = 12;

export type ArtworkImage = {
  id: string;
  webUrl: string;
  isPrimary: boolean;
  altTextVi: string;
  altTextEn: string;
  sortOrder: number;
};

export type ArtworkListItem = {
  id: string;
  code: string;
  titleVi: string;
  titleEn: string;
  year: number;
  type: string;
  status: string;
  collectionSlug: string;
  primaryImageUrl: string | null;
  primaryImageAltVi: string | null;
  primaryImageAltEn: string | null;
};

export type ArtworkDetail = ArtworkListItem & {
  mediumVi: string | null;
  mediumEn: string | null;
  dimensions: string | null;
  dominantColors: string[];
  descObjectiveVi: string | null;
  descObjectiveEn: string | null;
  artistNoteVi: string | null;
  artistNoteEn: string | null;
  criticNoteVi: string | null;
  criticNoteEn: string | null;
  criticNoteAuthor: string | null;
  contextVi: string | null;
  contextEn: string | null;
  artistQuoteVi: string | null;
  artistQuoteEn: string | null;
  ownershipStatus: string;
  images: ArtworkImage[];
};

function toPublicUrl(
  supabase: Awaited<ReturnType<typeof createClient>>,
  bucket: string,
  path: string,
) {
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

function mapImages(
  supabase: Awaited<ReturnType<typeof createClient>>,
  rows: Array<{
    id: string;
    web_storage_path: string;
    is_primary: boolean;
    alt_text_vi: string;
    alt_text_en: string;
    sort_order: number;
  }>,
): ArtworkImage[] {
  return rows
    .map((row) => ({
      id: row.id,
      webUrl: toPublicUrl(supabase, "artwork-web", row.web_storage_path),
      isPrimary: row.is_primary,
      altTextVi: row.alt_text_vi,
      altTextEn: row.alt_text_en,
      sortOrder: row.sort_order,
    }))
    .sort((a, b) => (a.isPrimary === b.isPrimary ? a.sortOrder - b.sortOrder : a.isPrimary ? -1 : 1));
}

function pickPrimaryImage(images: ArtworkImage[]) {
  return images.find((img) => img.isPrimary) ?? images[0] ?? null;
}

export async function getPublishedArtworks(
  collection: CollectionSlug,
  { page = 1, type, year }: { page?: number; type?: string; year?: number },
) {
  const supabase = await createClient();

  let query = supabase
    .from("artworks")
    .select(
      "id, code, title_vi, title_en, year, type, status, collections!inner(slug), artwork_images(id, web_storage_path, is_primary, alt_text_vi, alt_text_en, sort_order)",
      { count: "exact" },
    )
    .eq("status", "published")
    .eq("collections.slug", collection)
    .order("year", { ascending: false });

  if (type) query = query.eq("type", type);
  if (year) query = query.eq("year", year);

  const from = (page - 1) * PAGE_SIZE;
  const { data, count, error } = await query.range(from, from + PAGE_SIZE - 1);

  if (error) throw error;

  const items: ArtworkListItem[] = (data ?? []).map((row) => {
    const images = mapImages(supabase, row.artwork_images ?? []);
    const primary = pickPrimaryImage(images);
    return {
      id: row.id,
      code: row.code,
      titleVi: row.title_vi,
      titleEn: row.title_en,
      year: row.year,
      type: row.type,
      status: row.status,
      collectionSlug: collection,
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

export async function getArtworkDetail(
  collection: CollectionSlug,
  code: string,
): Promise<ArtworkDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("artworks")
    .select(
      `id, code, title_vi, title_en, year, type, status, ownership_status,
       dimensions, dominant_colors,
       desc_objective_vi, desc_objective_en,
       artist_note_vi, artist_note_en,
       critic_note_vi, critic_note_en, critic_note_author,
       context_vi, context_en, artist_quote_vi, artist_quote_en,
       collections!inner(slug),
       mediums(name_vi, name_en),
       artwork_images(id, web_storage_path, is_primary, alt_text_vi, alt_text_en, sort_order)`,
    )
    .eq("status", "published")
    .eq("collections.slug", collection)
    .eq("code", code)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const images = mapImages(supabase, data.artwork_images ?? []);
  const primary = pickPrimaryImage(images);
  const medium = Array.isArray(data.mediums) ? data.mediums[0] : data.mediums;

  return {
    id: data.id,
    code: data.code,
    titleVi: data.title_vi,
    titleEn: data.title_en,
    year: data.year,
    type: data.type,
    status: data.status,
    collectionSlug: collection,
    primaryImageUrl: primary?.webUrl ?? null,
    primaryImageAltVi: primary?.altTextVi ?? null,
    primaryImageAltEn: primary?.altTextEn ?? null,
    mediumVi: medium?.name_vi ?? null,
    mediumEn: medium?.name_en ?? null,
    dimensions: data.dimensions,
    dominantColors: data.dominant_colors ?? [],
    descObjectiveVi: data.desc_objective_vi,
    descObjectiveEn: data.desc_objective_en,
    artistNoteVi: data.artist_note_vi,
    artistNoteEn: data.artist_note_en,
    criticNoteVi: data.critic_note_vi,
    criticNoteEn: data.critic_note_en,
    criticNoteAuthor: data.critic_note_author,
    contextVi: data.context_vi,
    contextEn: data.context_en,
    artistQuoteVi: data.artist_quote_vi,
    artistQuoteEn: data.artist_quote_en,
    ownershipStatus: data.ownership_status,
    images,
  };
}

export type AdminArtworkListItem = {
  id: string;
  code: string;
  titleVi: string;
  year: number;
  status: string;
  collectionSlug: string;
  primaryImageUrl: string | null;
};

export async function getAllArtworksForAdmin(): Promise<AdminArtworkListItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("artworks")
    .select(
      "id, code, title_vi, year, status, collections(slug), artwork_images(web_storage_path, is_primary)",
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row) => {
    const collection = Array.isArray(row.collections) ? row.collections[0] : row.collections;
    const primary = (row.artwork_images ?? []).find((img) => img.is_primary);
    return {
      id: row.id,
      code: row.code,
      titleVi: row.title_vi,
      year: row.year,
      status: row.status,
      collectionSlug: collection?.slug ?? "",
      primaryImageUrl: primary ? toPublicUrl(supabase, "artwork-web", primary.web_storage_path) : null,
    };
  });
}

export type ArtworkEditData = {
  id: string;
  code: string;
  titleVi: string;
  titleEn: string;
  year: number;
  type: string;
  status: string;
  collectionId: string;
  mediumId: string | null;
  seriesId: string | null;
  dimensions: string | null;
  dominantColors: string[];
  descObjectiveVi: string | null;
  descObjectiveEn: string | null;
  artistNoteVi: string | null;
  artistNoteEn: string | null;
  criticNoteVi: string | null;
  criticNoteEn: string | null;
  criticNoteAuthor: string | null;
  contextVi: string | null;
  contextEn: string | null;
  artistQuoteVi: string | null;
  artistQuoteEn: string | null;
  videoUrl: string | null;
  ownershipStatus: string;
  exhibitionStatus: string;
  imageRights: string;
  keywords: string[];
  styleIds: string[];
  themeIds: string[];
  images: ArtworkImage[];
};

export async function getArtworkForEdit(id: string): Promise<ArtworkEditData | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("artworks")
    .select(
      `id, code, title_vi, title_en, year, type, status, collection_id, medium_id, series_id,
       dimensions, dominant_colors,
       desc_objective_vi, desc_objective_en,
       artist_note_vi, artist_note_en,
       critic_note_vi, critic_note_en, critic_note_author,
       context_vi, context_en, artist_quote_vi, artist_quote_en,
       video_url, ownership_status, exhibition_status, image_rights, keywords,
       artwork_images(id, web_storage_path, is_primary, alt_text_vi, alt_text_en, sort_order),
       artwork_styles(style_id), artwork_themes(theme_id)`,
    )
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    code: data.code,
    titleVi: data.title_vi,
    titleEn: data.title_en,
    year: data.year,
    type: data.type,
    status: data.status,
    collectionId: data.collection_id,
    mediumId: data.medium_id,
    seriesId: data.series_id,
    dimensions: data.dimensions,
    dominantColors: data.dominant_colors ?? [],
    descObjectiveVi: data.desc_objective_vi,
    descObjectiveEn: data.desc_objective_en,
    artistNoteVi: data.artist_note_vi,
    artistNoteEn: data.artist_note_en,
    criticNoteVi: data.critic_note_vi,
    criticNoteEn: data.critic_note_en,
    criticNoteAuthor: data.critic_note_author,
    contextVi: data.context_vi,
    contextEn: data.context_en,
    artistQuoteVi: data.artist_quote_vi,
    artistQuoteEn: data.artist_quote_en,
    videoUrl: data.video_url,
    ownershipStatus: data.ownership_status,
    exhibitionStatus: data.exhibition_status,
    imageRights: data.image_rights,
    keywords: data.keywords ?? [],
    styleIds: (data.artwork_styles ?? []).map((row) => row.style_id),
    themeIds: (data.artwork_themes ?? []).map((row) => row.theme_id),
    images: mapImages(supabase, data.artwork_images ?? []),
  };
}

export async function getFormLookups() {
  const supabase = await createClient();

  const [{ data: collections }, { data: mediums }, { data: styles }, { data: themes }] =
    await Promise.all([
      supabase.from("collections").select("id, slug, name_vi").order("slug"),
      supabase.from("mediums").select("id, name_vi").order("name_vi"),
      supabase.from("styles").select("id, name_vi").order("name_vi"),
      supabase.from("themes").select("id, name_vi").order("name_vi"),
    ]);

  return {
    collections: collections ?? [],
    mediums: mediums ?? [],
    styles: styles ?? [],
    themes: themes ?? [],
  };
}
