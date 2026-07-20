import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { COLLECTION_SLUGS, isCollectionSlug } from "@/lib/content/collections";
import { getPublishedArtworks } from "@/lib/content/artworks";
import { ArtworkCard } from "@/components/artwork/artwork-card";
import { FilterBar } from "@/components/artwork/filter-bar";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  return COLLECTION_SLUGS.map((collection) => ({ collection }));
}

const ARTWORK_TYPE_VALUES = ["painting", "sculpture", "sketch", "other"] as const;

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

  const [tCollections, t, tFilters, tTypes, { items, totalPages }] = await Promise.all([
    getTranslations("collections"),
    getTranslations("collectionPage"),
    getTranslations("filters"),
    getTranslations("artworkTypes"),
    getPublishedArtworks(collection, { page, type: type || undefined, year: yearNumber }),
  ]);

  const pageHref = (targetPage: number) => {
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (year) params.set("year", year);
    params.set("page", String(targetPage));
    return `?${params.toString()}`;
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="font-serif text-3xl">{tCollections(`${collection}.name`)}</h1>
      <p className="mt-3 max-w-2xl text-text-muted">{tCollections(`${collection}.note`)}</p>

      <div className="mt-10">
        <FilterBar
          currentType={type ?? ""}
          currentYear={year ?? ""}
          typeOptions={ARTWORK_TYPE_VALUES.map((value) => ({ value, label: tTypes(value) }))}
          labels={{
            typeLabel: tFilters("typeLabel"),
            yearLabel: tFilters("yearLabel"),
            allTypes: tFilters("allTypes"),
            submit: tFilters("submit"),
          }}
        />
      </div>

      {items.length === 0 ? (
        <p className="mt-16 border border-dashed border-white/15 px-6 py-10 text-center text-text-muted">
          {t("empty")}
        </p>
      ) : (
        <>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} locale={locale} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="mt-16 flex items-center justify-center gap-6 text-sm text-text-muted">
              {page > 1 ? (
                <Link href={`/tac-pham/${collection}${pageHref(page - 1)}`} className="hover:text-text">
                  {t("prev")}
                </Link>
              ) : (
                <span className="opacity-40">{t("prev")}</span>
              )}
              <span>{t("pageOf", { page, totalPages })}</span>
              {page < totalPages ? (
                <Link href={`/tac-pham/${collection}${pageHref(page + 1)}`} className="hover:text-text">
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
