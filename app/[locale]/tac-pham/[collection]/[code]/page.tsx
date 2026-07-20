import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { isCollectionSlug } from "@/lib/content/collections";
import { getArtworkDetail } from "@/lib/content/artworks";
import { DualModeViewer } from "@/components/artwork/dual-mode-viewer";
import { Link } from "@/i18n/navigation";

type PageParams = { locale: string; collection: string; code: string };

async function loadArtwork(params: Promise<PageParams>) {
  const { locale, collection, code } = await params;
  if (!isCollectionSlug(collection)) return { locale, collection, code, artwork: null };
  const artwork = await getArtworkDetail(collection, code);
  return { locale, collection, code, artwork };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, artwork } = await loadArtwork(params);
  if (!artwork) return {};

  const title = locale === "en" ? artwork.titleEn : artwork.titleVi;
  const description =
    (locale === "en" ? artwork.descObjectiveEn : artwork.descObjectiveVi) ?? undefined;

  return {
    title: `${title} — Nguyễn Tuấn Thịnh`,
    description,
    openGraph: {
      title,
      description,
      images: artwork.primaryImageUrl ? [artwork.primaryImageUrl] : undefined,
    },
  };
}

export default async function ArtworkDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale, collection, artwork } = await loadArtwork(params);

  if (!artwork) {
    notFound();
  }

  const [t, tOwnership] = await Promise.all([
    getTranslations("artworkDetail"),
    getTranslations("ownershipStatus"),
  ]);

  const title = locale === "en" ? artwork.titleEn : artwork.titleVi;
  const medium = locale === "en" ? artwork.mediumEn : artwork.mediumVi;
  const descObjective = locale === "en" ? artwork.descObjectiveEn : artwork.descObjectiveVi;
  const artistNote = locale === "en" ? artwork.artistNoteEn : artwork.artistNoteVi;
  const criticNote = locale === "en" ? artwork.criticNoteEn : artwork.criticNoteVi;
  const context = locale === "en" ? artwork.contextEn : artwork.contextVi;

  const ownershipLabel =
    artwork.ownershipStatus === "available" ? tOwnership("available") : tOwnership("notAvailable");

  const primaryImage = artwork.images.find((img) => img.isPrimary) ?? artwork.images[0] ?? null;
  const detailImages = artwork.images.filter((img) => !img.isPrimary);

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <Link href={`/tac-pham/${collection}`} className="text-sm text-text-muted hover:text-text">
        {t("backToCollection")}
      </Link>

      <header className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-white/10 pb-6">
        <h1 className="font-serif text-3xl">{title}</h1>
        <p className="font-sans text-sm text-text-muted">
          {artwork.year}
          {medium ? ` · ${medium}` : ""}
          {artwork.dimensions ? ` · ${artwork.dimensions}` : ""}
        </p>
      </header>

      <div className="mt-10">
        <DualModeViewer primaryImage={primaryImage} detailImages={detailImages} locale={locale} />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-4 text-sm">
        <span className="text-text-muted">{ownershipLabel}</span>
      </div>

      <div className="mt-10 flex flex-col gap-8 font-serif text-lg leading-relaxed">
        {descObjective && (
          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-text-muted">
              {t("objectiveLabel")}
            </h2>
            <p className="mt-2">{descObjective}</p>
          </section>
        )}

        {artistNote && (
          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-text-muted">
              {t("artistNoteLabel")} — Nguyễn Tuấn Thịnh
            </h2>
            <p className="mt-2 italic">{artistNote}</p>
          </section>
        )}

        {criticNote && (
          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-text-muted">
              {t("criticNoteLabel")}
              {artwork.criticNoteAuthor ? ` — ${artwork.criticNoteAuthor}` : ""}
            </h2>
            <p className="mt-2">{criticNote}</p>
          </section>
        )}

        {context && (
          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-text-muted">
              {t("contextLabel")}
            </h2>
            <p className="mt-2">{context}</p>
          </section>
        )}
      </div>
    </article>
  );
}
