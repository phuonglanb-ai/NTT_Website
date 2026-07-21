"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/roles";
import { personInputSchema, contributionInputSchema } from "@/lib/validation/friends";
import { uploadWebImage } from "@/lib/images/upload";
import { slugify } from "@/lib/slug";
import { logAudit } from "@/lib/audit";

export type FriendsFormState = { error?: string } | undefined;

function str(formData: FormData, name: string) {
  const value = formData.get(name);
  return value == null ? "" : String(value);
}

async function uniquePersonSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  base: string,
  excludeId?: string,
) {
  const root = slugify(base) || "nguoi";
  let candidate = root;
  let n = 1;
  for (;;) {
    let query = supabase.from("people").select("id").eq("slug", candidate).limit(1);
    if (excludeId) query = query.neq("id", excludeId);
    const { data } = await query;
    if (!data || data.length === 0) return candidate;
    candidate = `${root}-${++n}`;
  }
}

function revalidateFriends() {
  revalidatePath("/admin/ban-be");
  revalidatePath("/vi/ban-be");
  revalidatePath("/en/ban-be");
}

// ---- People ----

export async function createPerson(
  _prevState: FriendsFormState,
  formData: FormData,
): Promise<FriendsFormState> {
  const current = await requireRole("editor");
  if (!current.authorized) return { error: "Không có quyền thực hiện." };

  const parsed = personInputSchema.safeParse({
    name: str(formData, "name"),
    roleNoteVi: str(formData, "roleNoteVi"),
    roleNoteEn: str(formData, "roleNoteEn"),
    bioVi: str(formData, "bioVi"),
    bioEn: str(formData, "bioEn"),
    status: str(formData, "status") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ." };
  const data = parsed.data;

  const supabase = await createClient();
  const slug = await uniquePersonSlug(supabase, data.name);

  const payload: Record<string, unknown> = {
    slug,
    name: data.name,
    role_note_vi: data.roleNoteVi || null,
    role_note_en: data.roleNoteEn || null,
    bio_vi: data.bioVi || null,
    bio_en: data.bioEn || null,
    status: data.status,
  };

  const avatar = formData.get("avatar");
  if (avatar instanceof File && avatar.size > 0) {
    const result = await uploadWebImage(supabase, avatar, "people");
    if ("error" in result) return { error: result.error };
    payload.avatar_storage_path = result.path;
  }

  const { error } = await supabase.from("people").insert(payload);
  if (error) return { error: `Lỗi lưu dữ liệu: ${error.message}` };

  await logAudit({
    action: "create",
    entity: "person",
    entityId: slug,
    summary: `${data.name} (${data.status})`,
  });

  revalidateFriends();
  redirect("/admin/ban-be");
}

export async function updatePerson(
  id: string,
  _prevState: FriendsFormState,
  formData: FormData,
): Promise<FriendsFormState> {
  const current = await requireRole("editor");
  if (!current.authorized) return { error: "Không có quyền thực hiện." };

  const parsed = personInputSchema.safeParse({
    name: str(formData, "name"),
    roleNoteVi: str(formData, "roleNoteVi"),
    roleNoteEn: str(formData, "roleNoteEn"),
    bioVi: str(formData, "bioVi"),
    bioEn: str(formData, "bioEn"),
    status: str(formData, "status") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ." };
  const data = parsed.data;

  const supabase = await createClient();
  const slug = await uniquePersonSlug(supabase, data.name, id);

  const payload: Record<string, unknown> = {
    slug,
    name: data.name,
    role_note_vi: data.roleNoteVi || null,
    role_note_en: data.roleNoteEn || null,
    bio_vi: data.bioVi || null,
    bio_en: data.bioEn || null,
    status: data.status,
  };

  const avatar = formData.get("avatar");
  if (avatar instanceof File && avatar.size > 0) {
    const result = await uploadWebImage(supabase, avatar, "people");
    if ("error" in result) return { error: result.error };
    payload.avatar_storage_path = result.path;
  }

  const { error } = await supabase.from("people").update(payload).eq("id", id);
  if (error) return { error: `Lỗi lưu dữ liệu: ${error.message}` };

  await logAudit({
    action: "update",
    entity: "person",
    entityId: id,
    summary: `${data.name} (${data.status})`,
  });

  revalidateFriends();
  redirect("/admin/ban-be");
}

// ---- Contributions ----

export async function createContribution(
  _prevState: FriendsFormState,
  formData: FormData,
): Promise<FriendsFormState> {
  const current = await requireRole("editor");
  if (!current.authorized) return { error: "Không có quyền thực hiện." };

  const parsed = contributionInputSchema.safeParse({
    personId: str(formData, "personId"),
    titleVi: str(formData, "titleVi"),
    titleEn: str(formData, "titleEn"),
    bodyVi: str(formData, "bodyVi"),
    bodyEn: str(formData, "bodyEn"),
    status: str(formData, "status") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ." };
  const data = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase.from("friend_contributions").insert({
    person_id: data.personId,
    title_vi: data.titleVi,
    title_en: data.titleEn || data.titleVi,
    body_vi: data.bodyVi || null,
    body_en: data.bodyEn || null,
    status: data.status,
    published_at: data.status === "published" ? new Date().toISOString() : null,
  });
  if (error) return { error: `Lỗi lưu dữ liệu: ${error.message}` };

  await logAudit({
    action: "create",
    entity: "friend_contribution",
    summary: `${data.titleVi} (${data.status})`,
  });

  revalidateFriends();
  redirect("/admin/ban-be/bai-viet");
}

export async function updateContribution(
  id: string,
  _prevState: FriendsFormState,
  formData: FormData,
): Promise<FriendsFormState> {
  const current = await requireRole("editor");
  if (!current.authorized) return { error: "Không có quyền thực hiện." };

  const parsed = contributionInputSchema.safeParse({
    personId: str(formData, "personId"),
    titleVi: str(formData, "titleVi"),
    titleEn: str(formData, "titleEn"),
    bodyVi: str(formData, "bodyVi"),
    bodyEn: str(formData, "bodyEn"),
    status: str(formData, "status") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ." };
  const data = parsed.data;

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("friend_contributions")
    .select("status")
    .eq("id", id)
    .maybeSingle();

  const payload: Record<string, unknown> = {
    person_id: data.personId,
    title_vi: data.titleVi,
    title_en: data.titleEn || data.titleVi,
    body_vi: data.bodyVi || null,
    body_en: data.bodyEn || null,
    status: data.status,
  };
  if (data.status === "published" && existing?.status !== "published") {
    payload.published_at = new Date().toISOString();
  }

  const { error } = await supabase.from("friend_contributions").update(payload).eq("id", id);
  if (error) return { error: `Lỗi lưu dữ liệu: ${error.message}` };

  await logAudit({
    action: "update",
    entity: "friend_contribution",
    entityId: id,
    summary: `${data.titleVi} (${data.status})`,
  });

  revalidateFriends();
  redirect("/admin/ban-be/bai-viet");
}
