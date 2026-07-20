import { createClient } from "@/lib/supabase/server";

export type AdminExhibition = {
  id: string;
  slug: string;
  titleVi: string;
  titleEn: string;
  venue: string | null;
  startDate: string | null;
  endDate: string | null;
  exhibitionStatus: string;
  descriptionVi: string | null;
  descriptionEn: string | null;
  status: string;
};

export async function getAllExhibitionsForAdmin(): Promise<AdminExhibition[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("exhibitions")
    .select(
      "id, slug, title_vi, title_en, venue, start_date, end_date, exhibition_status, description_vi, description_en, status",
    )
    .order("start_date", { ascending: false, nullsFirst: false });

  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function getExhibitionForEdit(id: string): Promise<AdminExhibition | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("exhibitions")
    .select(
      "id, slug, title_vi, title_en, venue, start_date, end_date, exhibition_status, description_vi, description_en, status",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapRow(data) : null;
}

function mapRow(row: {
  id: string;
  slug: string;
  title_vi: string;
  title_en: string;
  venue: string | null;
  start_date: string | null;
  end_date: string | null;
  exhibition_status: string;
  description_vi: string | null;
  description_en: string | null;
  status: string;
}): AdminExhibition {
  return {
    id: row.id,
    slug: row.slug,
    titleVi: row.title_vi,
    titleEn: row.title_en,
    venue: row.venue,
    startDate: row.start_date,
    endDate: row.end_date,
    exhibitionStatus: row.exhibition_status,
    descriptionVi: row.description_vi,
    descriptionEn: row.description_en,
    status: row.status,
  };
}
