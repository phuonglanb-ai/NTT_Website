import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { COLLECTION_SLUGS } from "@/lib/content/collections";

export default async function ArtworksOverviewPage() {
  const t = await getTranslations("artworksOverview");
  const tCollections = await getTranslations("collections");

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="font-serif text-3xl">{t("title")}</h1>
      <p className="mt-4 max-w-2xl text-text-muted">{t("intro")}</p>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {COLLECTION_SLUGS.map((slug) => (
          <Link
            key={slug}
            href={`/tac-pham/${slug}`}
            className="border border-white/10 bg-bg-elevated p-6 transition-colors hover:border-accent-cobalt"
          >
            <h2 className="font-serif text-xl">{tCollections(`${slug}.name`)}</h2>
            <p className="mt-2 text-sm text-text-muted">
              {tCollections(`${slug}.note`)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
