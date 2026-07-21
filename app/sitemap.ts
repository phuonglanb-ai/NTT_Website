import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { createPublicClient } from "@/lib/supabase/public";
import { COLLECTION_SLUGS } from "@/lib/content/collections";
import { routing } from "@/i18n/routing";

const LOCALES = routing.locales;

/** Sinh 1 entry cho moi locale, kem alternates.languages cho cap vi/en. */
function localizedEntries(
  path: string,
  options: { lastModified?: Date; priority?: number } = {},
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`]),
  );
  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    lastModified: options.lastModified,
    priority: options.priority,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    { path: "", priority: 1 },
    { path: "/nghe-si", priority: 0.8 },
    { path: "/tac-pham", priority: 0.9 },
    ...COLLECTION_SLUGS.map((slug) => ({ path: `/tac-pham/${slug}`, priority: 0.9 })),
    { path: "/nhat-ky", priority: 0.7 },
    { path: "/ban-be", priority: 0.6 },
    { path: "/lien-he", priority: 0.5 },
    { path: "/tim-kiem", priority: 0.4 },
    { path: "/chinh-sach-rieng-tu", priority: 0.3 },
    { path: "/dieu-khoan-hinh-anh", priority: 0.3 },
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.flatMap((p) =>
    localizedEntries(p.path, { priority: p.priority }),
  );

  // URL dong: chi noi dung da published (client anon -> RLS tu loc).
  try {
    const supabase = createPublicClient();

    const [{ data: artworks }, { data: news }, { data: articles }] = await Promise.all([
      supabase
        .from("artworks")
        .select("code, published_at, collections!inner(slug)")
        .eq("status", "published"),
      supabase.from("news").select("slug, published_at").eq("status", "published"),
      supabase
        .from("articles")
        .select("slug, published_at, kind")
        .eq("status", "published")
        .in("kind", ["journal", "criticism"]),
    ]);

    for (const row of artworks ?? []) {
      const collection = Array.isArray(row.collections) ? row.collections[0] : row.collections;
      if (!collection?.slug) continue;
      entries.push(
        ...localizedEntries(`/tac-pham/${collection.slug}/${row.code}`, {
          lastModified: row.published_at ? new Date(row.published_at) : undefined,
          priority: 0.8,
        }),
      );
    }

    for (const row of [...(news ?? []), ...(articles ?? [])]) {
      entries.push(
        ...localizedEntries(`/nhat-ky/${row.slug}`, {
          lastModified: row.published_at ? new Date(row.published_at) : undefined,
          priority: 0.6,
        }),
      );
    }
  } catch (error) {
    // Neu DB khong san sang (vd build khi chua co env), van tra ve sitemap
    // phan tinh thay vi lam vo build -- NHUNG phai ghi log, khong nuot im
    // lang: sitemap thieu URL dong trong rat giong sitemap binh thuong, de
    // bo sot hang thang.
    console.error("[sitemap] Khong lay duoc noi dung dong:", error);
  }

  return entries;
}
