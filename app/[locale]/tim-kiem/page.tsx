import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { searchArtworks } from "@/lib/content/search";
import { ArtworkCard } from "@/components/artwork/artwork-card";

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { locale } = await params;
  const { q = "", page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const query = q.trim();

  const [t, result] = await Promise.all([
    getTranslations("search"),
    query ? searchArtworks(query, { page }) : Promise.resolve({ items: [], total: 0, totalPages: 1 }),
  ]);

  const pageHref = (targetPage: number) =>
    `?q=${encodeURIComponent(query)}&page=${targetPage}`;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="font-serif text-3xl">{t("title")}</h1>

      <form method="GET" className="mt-6 flex flex-wrap gap-3">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder={t("placeholder")}
          className="min-w-0 flex-1 border border-white/15 bg-bg-elevated px-4 py-2 text-text outline-none focus:border-accent-cobalt-bright"
        />
        <button
          type="submit"
          className="border border-accent-cobalt-bright px-5 py-2 text-sm text-text hover:bg-accent-cobalt"
        >
          {t("submit")}
        </button>
      </form>

      {!query ? (
        <p className="mt-16 text-center text-text-muted">{t("prompt")}</p>
      ) : result.items.length === 0 ? (
        <p className="mt-16 border border-dashed border-white/15 px-6 py-10 text-center text-text-muted">
          {t("empty")}
        </p>
      ) : (
        <>
          <p className="mt-8 text-sm text-text-muted">{t("resultsFor", { q: query })}</p>
          <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {result.items.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} locale={locale} />
            ))}
          </div>

          {result.totalPages > 1 && (
            <nav className="mt-16 flex items-center justify-center gap-6 text-sm text-text-muted">
              {page > 1 ? (
                <Link href={`/tim-kiem${pageHref(page - 1)}`} className="hover:text-text">
                  ‹
                </Link>
              ) : (
                <span className="opacity-40">‹</span>
              )}
              <span>
                {page} / {result.totalPages}
              </span>
              {page < result.totalPages ? (
                <Link href={`/tim-kiem${pageHref(page + 1)}`} className="hover:text-text">
                  ›
                </Link>
              ) : (
                <span className="opacity-40">›</span>
              )}
            </nav>
          )}
        </>
      )}
    </section>
  );
}
