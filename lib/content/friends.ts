import { createClient } from "@/lib/supabase/server";

export type FriendContribution = {
  id: string;
  titleVi: string;
  titleEn: string;
  bodyVi: string | null;
  bodyEn: string | null;
};

export type Friend = {
  id: string;
  slug: string;
  name: string;
  roleNoteVi: string | null;
  roleNoteEn: string | null;
  bioVi: string | null;
  bioEn: string | null;
  avatarUrl: string | null;
  contributions: FriendContribution[];
};

function avatarUrl(
  supabase: Awaited<ReturnType<typeof createClient>>,
  path: string | null,
) {
  if (!path) return null;
  return supabase.storage.from("artwork-web").getPublicUrl(path).data.publicUrl;
}

export async function getPublishedFriends(): Promise<Friend[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("people")
    .select(
      `id, slug, name, role_note_vi, role_note_en, bio_vi, bio_en, avatar_storage_path,
       friend_contributions(id, title_vi, title_en, body_vi, body_en, status)`,
    )
    .eq("status", "published")
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    roleNoteVi: row.role_note_vi,
    roleNoteEn: row.role_note_en,
    bioVi: row.bio_vi,
    bioEn: row.bio_en,
    avatarUrl: avatarUrl(supabase, row.avatar_storage_path),
    contributions: (row.friend_contributions ?? [])
      .filter((c) => c.status === "published")
      .map((c) => ({
        id: c.id,
        titleVi: c.title_vi,
        titleEn: c.title_en,
        bodyVi: c.body_vi,
        bodyEn: c.body_en,
      })),
  }));
}

// ---- Admin ----

export type AdminPerson = {
  id: string;
  slug: string;
  name: string;
  roleNoteVi: string | null;
  roleNoteEn: string | null;
  bioVi: string | null;
  bioEn: string | null;
  avatarUrl: string | null;
  status: string;
};

export async function getAllPeopleForAdmin(): Promise<AdminPerson[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("people")
    .select(
      "id, slug, name, role_note_vi, role_note_en, bio_vi, bio_en, avatar_storage_path, status",
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => mapPerson(supabase, row));
}

export async function getPersonForEdit(id: string): Promise<AdminPerson | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("people")
    .select(
      "id, slug, name, role_note_vi, role_note_en, bio_vi, bio_en, avatar_storage_path, status",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapPerson(supabase, data) : null;
}

function mapPerson(
  supabase: Awaited<ReturnType<typeof createClient>>,
  row: {
    id: string;
    slug: string;
    name: string;
    role_note_vi: string | null;
    role_note_en: string | null;
    bio_vi: string | null;
    bio_en: string | null;
    avatar_storage_path: string | null;
    status: string;
  },
): AdminPerson {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    roleNoteVi: row.role_note_vi,
    roleNoteEn: row.role_note_en,
    bioVi: row.bio_vi,
    bioEn: row.bio_en,
    avatarUrl: avatarUrl(supabase, row.avatar_storage_path),
    status: row.status,
  };
}

export type AdminContribution = {
  id: string;
  personId: string;
  personName: string;
  titleVi: string;
  titleEn: string;
  bodyVi: string | null;
  bodyEn: string | null;
  status: string;
};

export async function getAllContributionsForAdmin(): Promise<AdminContribution[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("friend_contributions")
    .select("id, person_id, title_vi, title_en, body_vi, body_en, status, people(name)")
    .order("submitted_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => {
    const person = Array.isArray(row.people) ? row.people[0] : row.people;
    return {
      id: row.id,
      personId: row.person_id,
      personName: person?.name ?? "",
      titleVi: row.title_vi,
      titleEn: row.title_en,
      bodyVi: row.body_vi,
      bodyEn: row.body_en,
      status: row.status,
    };
  });
}

export async function getContributionForEdit(id: string): Promise<AdminContribution | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("friend_contributions")
    .select("id, person_id, title_vi, title_en, body_vi, body_en, status, people(name)")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  const person = Array.isArray(data.people) ? data.people[0] : data.people;
  return {
    id: data.id,
    personId: data.person_id,
    personName: person?.name ?? "",
    titleVi: data.title_vi,
    titleEn: data.title_en,
    bodyVi: data.body_vi,
    bodyEn: data.body_en,
    status: data.status,
  };
}

export async function getPeopleOptions(): Promise<{ id: string; name: string }[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("people").select("id, name").order("name");
  return data ?? [];
}
