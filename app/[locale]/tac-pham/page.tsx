import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { COLLECTION_SLUGS } from "@/lib/content/collections";
import { getPublishedArtworks } from "@/lib/content/artworks";
import { ArtworkCard } from "@/components/artwork/artwork-card";
import { FilterBar } from "@/components/artwork/filter-bar";
import { TypeFilter } from "@/components/artwork/type-filter";
import { Paragraphs } from "@/components/ui/paragraphs";

const ARTWORK_TYPE_VALUES = ["painting", "sketch", "sculpture", "other"] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("artworksOverview");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ArtworksOverviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string; year?: string; page?: string }>;
}) {
  const { locale } = await params;
  const { type, year, page: pageParam } = await searchParams;

  const page = Math.max(1, Number(pageParam) || 1);
  const yearNumber = year ? Number(year) : undefined;
  const hasFilter = Boolean(type || year);

  const [t, tCollections, tList, tFilters, tTypes, { items, total, totalPages }] =
    await Promise.all([
      getTranslations("artworksOverview"),
      getTranslations("collections"),
      getTranslations("collectionPage"),
      getTranslations("filters"),
      getTranslations("artworkTypes"),
      getPublishedArtworks(null, { page, type: type || undefined, year: yearNumber }),
    ]);

  const pageHref = (targetPage: number) => {
    const qs = new URLSearchParams();
    if (type) qs.set("type", type);
    if (year) qs.set("year", year);
    qs.set("page", String(targetPage));
    return `/tac-pham?${qs.toString()}`;
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="font-serif text-3xl uppercase tracking-[0.14em]">{t("title")}</h1>
      <Paragraphs text={t("intro")} className="mt-6 max-w-2xl text-text-muted" />

      {/* Ba coi -- dieu huong chinh, dat truoc bo loc */}
      <div className="mt-14">
        <h2 className="text-xs uppercase tracking-[0.24em] text-text-muted">
          {t("realmsHeading")}
        </h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          {COLLECTION_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={`/tac-pham/${slug}`}
              className="border border-white/10 bg-bg-elevated p-6 transition-colors hover:border-accent-cobalt"
            >
              <h3 className="font-serif text-xl">{tCollections(`${slug}.name`)}</h3>
              <p className="mt-2 font-serif leading-snug text-text-muted">
                {tCollections(`${slug}.note`)}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Bo loc loai hinh -- noi bat, khong nam trong menu */}
      <div className="mt-16 border-t border-white/10 pt-10">
        <h2 className="font-serif text-2xl">{t("allWorks")}</h2>

        <div className="mt-8 flex flex-col gap-8">
          <TypeFilter
            basePath="/tac-pham"
            currentType={type ?? ""}
            currentYear={year ?? ""}
            options={ARTWORK_TYPE_VALUES.map((value) => ({ value, label: tTypes(value) }))}
            allLabel={tFilters("allTypes")}
            heading={t("typesHeading")}
          />

          <FilterBar
            basePath="/tac-pham"
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
            {hasFilter ? tList("noResults") : tList("empty")}
          </p>
        ) : (
          <>
            <p className="mt-10 text-sm text-text-muted">{tList("count", { count: total })}</p>

            <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} locale={locale} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-16 flex items-center justify-center gap-6 text-sm text-text-muted">
                {page > 1 ? (
                  <Link href={pageHref(page - 1)} className="hover:text-text">
                    {tList("prev")}
                  </Link>
                ) : (
                  <span className="opacity-40">{tList("prev")}</span>
                )}
                <span>{tList("pageOf", { page, totalPages })}</span>
                {page < totalPages ? (
                  <Link href={pageHref(page + 1)} className="hover:text-text">
                    {tList("next")}
                  </Link>
                ) : (
                  <span className="opacity-40">{tList("next")}</span>
                )}
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}
