"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/roles";
import { journalInputSchema } from "@/lib/validation/journal";
import { slugify } from "@/lib/slug";

export type JournalFormState = { error?: string } | undefined;

function str(formData: FormData, name: string) {
  const value = formData.get(name);
  return value == null ? "" : String(value);
}

function parse(formData: FormData) {
  return journalInputSchema.safeParse({
    source: str(formData, "source"),
    kind: str(formData, "kind") || undefined,
    titleVi: str(formData, "titleVi"),
    titleEn: str(formData, "titleEn"),
    bodyVi: str(formData, "bodyVi"),
    bodyEn: str(formData, "bodyEn"),
    author: str(formData, "author"),
    sourceUrl: str(formData, "sourceUrl"),
    status: str(formData, "status") || undefined,
  });
}

async function uniqueSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  table: "news" | "articles",
  base: string,
  excludeId?: string,
) {
  const root = slugify(base) || table;
  let candidate = root;
  let n = 1;
  for (;;) {
    let query = supabase.from(table).select("id").eq("slug", candidate).limit(1);
    if (excludeId) query = query.neq("id", excludeId);
    const { data } = await query;
    if (!data || data.length === 0) return candidate;
    candidate = `${root}-${++n}`;
  }
}

function revalidateJournal() {
  revalidatePath("/admin/nhat-ky");
  revalidatePath("/vi/nhat-ky");
  revalidatePath("/en/nhat-ky");
  revalidatePath("/vi/nghe-si");
  revalidatePath("/en/nghe-si");
}

export async function createJournalEntry(
  _prevState: JournalFormState,
  formData: FormData,
): Promise<JournalFormState> {
  const current = await requireRole("editor");
  if (!current.authorized) return { error: "Không có quyền thực hiện." };

  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ." };
  const data = parsed.data;

  const supabase = await createClient();
  const publishedAt = data.status === "published" ? new Date().toISOString() : null;

  if (data.source === "news") {
    const slug = await uniqueSlug(supabase, "news", data.titleVi);
    const { error } = await supabase.from("news").insert({
      slug,
      title_vi: data.titleVi,
      title_en: data.titleEn || data.titleVi,
      body_vi: data.bodyVi || null,
      body_en: data.bodyEn || null,
      status: data.status,
      published_at: publishedAt,
    });
    if (error) return { error: `Lỗi lưu dữ liệu: ${error.message}` };
  } else {
    const slug = await uniqueSlug(supabase, "articles", data.titleVi);
    const { error } = await supabase.from("articles").insert({
      slug,
      kind: data.kind,
      title_vi: data.titleVi,
      title_en: data.titleEn || data.titleVi,
      body_vi: data.bodyVi || null,
      body_en: data.bodyEn || null,
      author: data.author || null,
      source_url: data.sourceUrl || null,
      status: data.status,
      published_at: publishedAt,
    });
    if (error) return { error: `Lỗi lưu dữ liệu: ${error.message}` };
  }

  revalidateJournal();
  redirect("/admin/nhat-ky");
}

export async function updateJournalEntry(
  source: "news" | "article",
  id: string,
  _prevState: JournalFormState,
  formData: FormData,
): Promise<JournalFormState> {
  const current = await requireRole("editor");
  if (!current.authorized) return { error: "Không có quyền thực hiện." };

  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ." };
  const data = parsed.data;

  const supabase = await createClient();
  const table = source === "news" ? "news" : "articles";

  const { data: existing } = await supabase
    .from(table)
    .select("status")
    .eq("id", id)
    .maybeSingle();
  const newlyPublished = data.status === "published" && existing?.status !== "published";

  const slug = await uniqueSlug(supabase, table, data.titleVi, id);

  const base: Record<string, unknown> = {
    slug,
    title_vi: data.titleVi,
    title_en: data.titleEn || data.titleVi,
    body_vi: data.bodyVi || null,
    body_en: data.bodyEn || null,
    status: data.status,
  };
  if (newlyPublished) base.published_at = new Date().toISOString();

  if (source === "article") {
    base.kind = data.kind;
    base.author = data.author || null;
    base.source_url = data.sourceUrl || null;
  }

  const { error } = await supabase.from(table).update(base).eq("id", id);
  if (error) return { error: `Lỗi lưu dữ liệu: ${error.message}` };

  revalidateJournal();
  redirect("/admin/nhat-ky");
}
