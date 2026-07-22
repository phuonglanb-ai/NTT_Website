import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { COLLECTION_SLUGS, isCollectionSlug } from "@/lib/content/collections";
import { getPublishedArtworks } from "@/lib/content/artworks";
import { ArtworkCard } from "@/components/artwork/artwork-card";
import { FilterBar } from "@/components/artwork/filter-bar";
import { TypeFilter } from "@/components/artwork/type-filter";
import { Paragraphs } from "@/components/ui/paragraphs";
import { Motif } from "@/components/ui/motif";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  return COLLECTION_SLUGS.map((collection) => ({ collection }));
}

const ARTWORK_TYPE_VALUES = ["painting", "sketch", "sculpture", "other"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection } = await params;
  if (!isCollectionSlug(collection)) return {};
  const t = await getTranslations("collections");
  return {
    title: t(`${collection}.metaTitle`),
    description: t(`${collection}.metaDescription`),
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; collection: string }>;
  searchParams: Promise<{ type?: string; year?: string; page?: string }>;
}) {
  const { locale, collection } = await params;
  const { type, year, page: pageParam } = await searchParams;

  if (!isCollectionSlug(collection)) {
    notFound();
  }

  const page = Math.max(1, Number(pageParam) || 1);
  const yearNumber = year ? Number(year) : undefined;
  const hasFilter = Boolean(type || year);
  const basePath = `/tac-pham/${collection}`;

  const [tCollections, t, tFilters, tTypes, { items, total, totalPages }] = await Promise.all([
    getTranslations("collections"),
    getTranslations("collectionPage"),
    getTranslations("filters"),
    getTranslations("artworkTypes"),
    getPublishedArtworks(collection, { page, type: type || undefined, year: yearNumber }),
  ]);

  // Loi nghe si dat rieng cho coi Nang. Ban tieng Anh de trong cho toi khi
  // nghe si duyet ban dich -- khong tu dong dich loi nghe si (CLAUDE.md muc 7).
  const artistNote = collection === "nang" ? tCollections("nang.artistNote").trim() : "";

  const pageHref = (targetPage: number) => {
    const qs = new URLSearchParams();
    if (type) qs.set("type", type);
    if (year) qs.set("year", year);
    qs.set("page", String(targetPage));
    return `${basePath}?${qs.toString()}`;
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <header className="max-w-2xl">
        <h1 className="font-serif text-3xl uppercase tracking-[0.14em]">
          {tCollections(`${collection}.name`)}
        </h1>

        {/*
          Cau gioi thieu ngan (dong dan) phai TACH HAN khoi than bai phia duoi,
          neu khong hai khoi chu nhin y het nhau. Phan biet bang BON tin hieu
          cung luc: co chu lon hon, chu serif thay vi sans, mau sang hon
          (text thay vi text-muted), va mot ky hieu hoa quynh dan dau.
        */}
        <p className="mt-5 flex items-start gap-3 font-serif text-xl leading-snug text-text">
          <Motif className="mt-[0.45rem] h-4 w-4 flex-none text-accent-cobalt" />
          <span>{tCollections(`${collection}.note`)}</span>
        </p>

        <Paragraphs
          text={tCollections(`${collection}.intro`)}
          className="mt-8 text-text-muted"
        />
      </header>

      {artistNote && (
        <blockquote className="mt-12 max-w-2xl border-l-2 border-accent-cobalt pl-6">
          <p className="text-xs uppercase tracking-[0.24em] text-text-muted">
            Lời nghệ sĩ — Nguyễn Tuấn Thịnh
          </p>
          <Paragraphs text={artistNote} className="mt-4 font-serif text-lg italic" />
        </blockquote>
      )}

      <div className="mt-16 flex flex-col gap-8 border-t border-white/10 pt-10">
        <TypeFilter
          basePath={basePath}
          currentType={type ?? ""}
          currentYear={year ?? ""}
          options={ARTWORK_TYPE_VALUES.map((value) => ({ value, label: tTypes(value) }))}
          allLabel={tFilters("allTypes")}
          heading={tFilters("typeLabel")}
        />

        <FilterBar
          basePath={basePath}
          currentType={type ?? ""}
          currentYear={year ?? ""}
          labels={{
            yearLabel: tFilters("yearLabel"),
            submit: tFilters("submit"),
            clear: tFilters("clear"),
          }}
        />
      </div>

      {items.length === 0 ? (
        <p className="mt-16 border border-dashed border-white/15 px-6 py-10 text-center text-text-muted">
          {hasFilter ? t("noResults") : t("empty")}
        </p>
      ) : (
        <>
          <p className="mt-10 text-sm text-text-muted">{t("count", { count: total })}</p>

          <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} locale={locale} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="mt-16 flex items-center justify-center gap-6 text-sm text-text-muted">
              {page > 1 ? (
                <Link href={pageHref(page - 1)} className="hover:text-text">
                  {t("prev")}
                </Link>
              ) : (
                <span className="opacity-40">{t("prev")}</span>
              )}
              <span>{t("pageOf", { page, totalPages })}</span>
              {page < totalPages ? (
                <Link href={pageHref(page + 1)} className="hover:text-text">
                  {t("next")}
                </Link>
              ) : (
                <span className="opacity-40">{t("next")}</span>
              )}
            </nav>
          )}
        </>
      )}
    </section>
  );
}
