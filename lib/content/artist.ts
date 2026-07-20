import { createClient } from "@/lib/supabase/server";

export type Artist = {
  id: string;
  slug: string;
  name: string;
  bioVi: string | null;
  bioEn: string | null;
  statementVi: string | null;
  statementEn: string | null;
  journeyVi: string | null;
  journeyEn: string | null;
  portraitUrl: string | null;
};

export type ExhibitionListItem = {
  id: string;
  slug: string;
  titleVi: string;
  titleEn: string;
  venue: string | null;
  startDate: string | null;
  endDate: string | null;
  status: string;
  exhibitionStatus: string;
};

export type PressItem = {
  id: string;
  titleVi: string;
  titleEn: string;
  author: string | null;
  sourceUrl: string | null;
  publishedAt: string | null;
};

function portraitUrl(
  supabase: Awaited<ReturnType<typeof createClient>>,
  path: string | null,
) {
  if (!path) return null;
  return supabase.storage.from("artwork-web").getPublicUrl(path).data.publicUrl;
}

/** Bang artists chi co 1 ban ghi (nghe si duy nhat) trong MVP. */
export async function getArtist(): Promise<Artist | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("artists")
    .select(
      "id, slug, name, bio_vi, bio_en, statement_vi, statement_en, journey_vi, journey_en, portrait_storage_path",
    )
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    bioVi: data.bio_vi,
    bioEn: data.bio_en,
    statementVi: data.statement_vi,
    statementEn: data.statement_en,
    journeyVi: data.journey_vi,
    journeyEn: data.journey_en,
    portraitUrl: portraitUrl(supabase, data.portrait_storage_path),
  };
}

export async function getPublishedExhibitions(): Promise<ExhibitionListItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("exhibitions")
    .select("id, slug, title_vi, title_en, venue, start_date, end_date, status, exhibition_status")
    .eq("status", "published")
    .order("start_date", { ascending: false, nullsFirst: false });

  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    titleVi: row.title_vi,
    titleEn: row.title_en,
    venue: row.venue,
    startDate: row.start_date,
    endDate: row.end_date,
    status: row.status,
    exhibitionStatus: row.exhibition_status,
  }));
}

export async function getPressArticles(): Promise<PressItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("id, title_vi, title_en, author, source_url, published_at")
    .eq("status", "published")
    .eq("kind", "press")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    titleVi: row.title_vi,
    titleEn: row.title_en,
    author: row.author,
    sourceUrl: row.source_url,
    publishedAt: row.published_at,
  }));
}
