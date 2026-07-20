import { createClient } from "@/lib/supabase/server";

export const JOURNAL_PAGE_SIZE = 10;

// Loai muc trong feed Nhat ky. news = tin tuc; article kind journal/criticism.
export type JournalEntry = {
  id: string;
  slug: string;
  kind: "news" | "journal" | "criticism";
  titleVi: string;
  titleEn: string;
  excerptVi: string | null;
  excerptEn: string | null;
  publishedAt: string | null;
};

export type JournalDetail = {
  slug: string;
  source: "news" | "article";
  kind: string;
  titleVi: string;
  titleEn: string;
  bodyVi: string | null;
  bodyEn: string | null;
  author: string | null;
  sourceUrl: string | null;
  publishedAt: string | null;
};

function excerpt(body: string | null): string | null {
  if (!body) return null;
  const trimmed = body.trim();
  return trimmed.length > 180 ? `${trimmed.slice(0, 180)}…` : trimmed;
}

/**
 * Feed gop tin tuc (news) + bai viet (articles kind journal/criticism), sap
 * theo published_at giam dan. Doc rieng 2 bang roi merge o app-layer (don gian,
 * du cho khoi luong MVP; khong can view SQL rieng).
 */
export async function getJournalFeed({ page = 1 }: { page?: number }) {
  const supabase = await createClient();

  const [{ data: news, error: newsErr }, { data: articles, error: artErr }] = await Promise.all([
    supabase
      .from("news")
      .select("id, slug, title_vi, title_en, body_vi, body_en, published_at")
      .eq("status", "published"),
    supabase
      .from("articles")
      .select("id, slug, kind, title_vi, title_en, body_vi, body_en, published_at")
      .eq("status", "published")
      .in("kind", ["journal", "criticism"]),
  ]);

  if (newsErr) throw newsErr;
  if (artErr) throw artErr;

  const entries: JournalEntry[] = [
    ...(news ?? []).map((row) => ({
      id: row.id,
      slug: row.slug,
      kind: "news" as const,
      titleVi: row.title_vi,
      titleEn: row.title_en,
      excerptVi: excerpt(row.body_vi),
      excerptEn: excerpt(row.body_en),
      publishedAt: row.published_at,
    })),
    ...(articles ?? []).map((row) => ({
      id: row.id,
      slug: row.slug,
      kind: (row.kind === "criticism" ? "criticism" : "journal") as "journal" | "criticism",
      titleVi: row.title_vi,
      titleEn: row.title_en,
      excerptVi: excerpt(row.body_vi),
      excerptEn: excerpt(row.body_en),
      publishedAt: row.published_at,
    })),
  ].sort((a, b) => {
    const ta = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const tb = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return tb - ta;
  });

  const total = entries.length;
  const totalPages = Math.max(1, Math.ceil(total / JOURNAL_PAGE_SIZE));
  const from = (page - 1) * JOURNAL_PAGE_SIZE;
  return {
    items: entries.slice(from, from + JOURNAL_PAGE_SIZE),
    total,
    totalPages,
  };
}

/** Slug la unique tren tung bang; thu news truoc, roi articles. */
export async function getJournalEntry(slug: string): Promise<JournalDetail | null> {
  const supabase = await createClient();

  const { data: news } = await supabase
    .from("news")
    .select("slug, title_vi, title_en, body_vi, body_en, published_at, status")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (news) {
    return {
      slug: news.slug,
      source: "news",
      kind: "news",
      titleVi: news.title_vi,
      titleEn: news.title_en,
      bodyVi: news.body_vi,
      bodyEn: news.body_en,
      author: null,
      sourceUrl: null,
      publishedAt: news.published_at,
    };
  }

  const { data: article } = await supabase
    .from("articles")
    .select("slug, kind, title_vi, title_en, body_vi, body_en, author, source_url, published_at, status")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (article) {
    return {
      slug: article.slug,
      source: "article",
      kind: article.kind,
      titleVi: article.title_vi,
      titleEn: article.title_en,
      bodyVi: article.body_vi,
      bodyEn: article.body_en,
      author: article.author,
      sourceUrl: article.source_url,
      publishedAt: article.published_at,
    };
  }

  return null;
}

// ---- Admin ----

export type AdminJournalItem = {
  id: string;
  source: "news" | "article";
  kind: string;
  titleVi: string;
  status: string;
  publishedAt: string | null;
};

export async function getAllJournalForAdmin(): Promise<AdminJournalItem[]> {
  const supabase = await createClient();
  const [{ data: news }, { data: articles }] = await Promise.all([
    supabase.from("news").select("id, title_vi, status, published_at").order("created_at", { ascending: false }),
    supabase
      .from("articles")
      .select("id, kind, title_vi, status, published_at")
      .order("created_at", { ascending: false }),
  ]);

  return [
    ...(news ?? []).map((r) => ({
      id: r.id,
      source: "news" as const,
      kind: "news",
      titleVi: r.title_vi,
      status: r.status,
      publishedAt: r.published_at,
    })),
    ...(articles ?? []).map((r) => ({
      id: r.id,
      source: "article" as const,
      kind: r.kind,
      titleVi: r.title_vi,
      status: r.status,
      publishedAt: r.published_at,
    })),
  ];
}

export type AdminJournalEntry = {
  id: string;
  source: "news" | "article";
  kind: string;
  titleVi: string;
  titleEn: string;
  bodyVi: string | null;
  bodyEn: string | null;
  author: string | null;
  sourceUrl: string | null;
  status: string;
};

export async function getJournalEntryForEdit(
  source: "news" | "article",
  id: string,
): Promise<AdminJournalEntry | null> {
  const supabase = await createClient();

  if (source === "news") {
    const { data } = await supabase
      .from("news")
      .select("id, title_vi, title_en, body_vi, body_en, status")
      .eq("id", id)
      .maybeSingle();
    if (!data) return null;
    return {
      id: data.id,
      source: "news",
      kind: "news",
      titleVi: data.title_vi,
      titleEn: data.title_en,
      bodyVi: data.body_vi,
      bodyEn: data.body_en,
      author: null,
      sourceUrl: null,
      status: data.status,
    };
  }

  const { data } = await supabase
    .from("articles")
    .select("id, kind, title_vi, title_en, body_vi, body_en, author, source_url, status")
    .eq("id", id)
    .maybeSingle();
  if (!data) return null;
  return {
    id: data.id,
    source: "article",
    kind: data.kind,
    titleVi: data.title_vi,
    titleEn: data.title_en,
    bodyVi: data.body_vi,
    bodyEn: data.body_en,
    author: data.author,
    sourceUrl: data.source_url,
    status: data.status,
  };
}
