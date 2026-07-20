"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/roles";
import { exhibitionInputSchema } from "@/lib/validation/exhibition";
import { slugify } from "@/lib/slug";

export type ExhibitionFormState = { error?: string } | undefined;

function str(formData: FormData, name: string) {
  const value = formData.get(name);
  return value == null ? "" : String(value);
}

function parse(formData: FormData) {
  return exhibitionInputSchema.safeParse({
    titleVi: str(formData, "titleVi"),
    titleEn: str(formData, "titleEn"),
    venue: str(formData, "venue"),
    startDate: str(formData, "startDate"),
    endDate: str(formData, "endDate"),
    exhibitionStatus: str(formData, "exhibitionStatus") || undefined,
    descriptionVi: str(formData, "descriptionVi"),
    descriptionEn: str(formData, "descriptionEn"),
    status: str(formData, "status") || undefined,
  });
}

async function uniqueSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  base: string,
  excludeId?: string,
) {
  const root = slugify(base) || "trien-lam";
  let candidate = root;
  let n = 1;
  for (;;) {
    let query = supabase.from("exhibitions").select("id").eq("slug", candidate).limit(1);
    if (excludeId) query = query.neq("id", excludeId);
    const { data } = await query;
    if (!data || data.length === 0) return candidate;
    candidate = `${root}-${++n}`;
  }
}

function payloadFrom(
  data: ReturnType<typeof exhibitionInputSchema.parse>,
  slug: string,
  wasPublished: boolean,
) {
  return {
    slug,
    title_vi: data.titleVi,
    title_en: data.titleEn || data.titleVi,
    venue: data.venue || null,
    start_date: data.startDate || null,
    end_date: data.endDate || null,
    exhibition_status: data.exhibitionStatus,
    description_vi: data.descriptionVi || null,
    description_en: data.descriptionEn || null,
    status: data.status,
    published_at:
      data.status === "published" && !wasPublished ? new Date().toISOString() : undefined,
  };
}

export async function createExhibition(
  _prevState: ExhibitionFormState,
  formData: FormData,
): Promise<ExhibitionFormState> {
  const current = await requireRole("editor");
  if (!current.authorized) return { error: "Không có quyền thực hiện." };

  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ." };

  const supabase = await createClient();
  const slug = await uniqueSlug(supabase, parsed.data.titleVi);
  const payload = payloadFrom(parsed.data, slug, false);

  const { error } = await supabase.from("exhibitions").insert(payload);
  if (error) return { error: `Lỗi lưu dữ liệu: ${error.message}` };

  revalidatePath("/admin/trien-lam");
  redirect("/admin/trien-lam");
}

export async function updateExhibition(
  id: string,
  _prevState: ExhibitionFormState,
  formData: FormData,
): Promise<ExhibitionFormState> {
  const current = await requireRole("editor");
  if (!current.authorized) return { error: "Không có quyền thực hiện." };

  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ." };

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("exhibitions")
    .select("status")
    .eq("id", id)
    .maybeSingle();

  const slug = await uniqueSlug(supabase, parsed.data.titleVi, id);
  const payload = payloadFrom(parsed.data, slug, existing?.status === "published");

  const { error } = await supabase.from("exhibitions").update(payload).eq("id", id);
  if (error) return { error: `Lỗi lưu dữ liệu: ${error.message}` };

  revalidatePath("/admin/trien-lam");
  redirect("/admin/trien-lam");
}
