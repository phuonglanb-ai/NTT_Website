import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { isCollectionSlug } from "@/lib/content/collections";
import { getArtworkDetail } from "@/lib/content/artworks";
import { artworkStatusKey } from "@/lib/content/artwork-status";
import { DualModeViewer } from "@/components/artwork/dual-mode-viewer";
import { Paragraphs } from "@/components/ui/paragraphs";
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

  const [t, tStatus, tTypes, tCollections] = await Promise.all([
    getTranslations("artworkDetail"),
    getTranslations("artworkStatus"),
    getTranslations("artworkTypes"),
    getTranslations("collections"),
  ]);

  const title = locale === "en" ? artwork.titleEn : artwork.titleVi;
  const medium = locale === "en" ? artwork.mediumEn : artwork.mediumVi;
  const descObjective = locale === "en" ? artwork.descObjectiveEn : artwork.descObjectiveVi;
  const artistNote = locale === "en" ? artwork.artistNoteEn : artwork.artistNoteVi;
  const criticNote = locale === "en" ? artwork.criticNoteEn : artwork.criticNoteVi;
  const context = locale === "en" ? artwork.contextEn : artwork.contextVi;

  const statusLabel = tStatus(
    artworkStatusKey(artwork.ownershipStatus, artwork.exhibitionStatus),
  );

  const facts: { label: string; value: string }[] = [
    { label: t("codeLabel"), value: artwork.code },
    { label: t("yearLabel"), value: String(artwork.year) },
    { label: t("mediumLabel"), value: medium ?? "" },
    { label: t("dimensionsLabel"), value: artwork.dimensions ?? "" },
    { label: t("typeLabel"), value: tTypes(artwork.type) },
    { label: t("collectionLabel"), value: tCollections(`${collection}.name`) },
    { label: tStatus("label"), value: statusLabel },
  ].filter((fact) => fact.value !== "");

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

      {/* Nhan thong tin -- chi hien truong da co du lieu that */}
      <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 border-y border-white/10 py-6 text-sm sm:grid-cols-2">
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-wrap gap-x-3">
            <dt className="text-text-muted">{fact.label}</dt>
            <dd className="text-text">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 flex flex-col gap-10 leading-relaxed">
        {descObjective && (
          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-text-muted">
              {t("objectiveLabel")}
            </h2>
            <Paragraphs text={descObjective} className="mt-3 font-serif text-lg" />
          </section>
        )}

        {/* Loi nghe si: luon ghi ro tac gia, khong bao gio de van ban khac
            dung o vi tri nay (CLAUDE.md -- An toan & liem chinh). */}
        {artistNote && (
          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-text-muted">
              {t("artistNoteLabel")} — Nguyễn Tuấn Thịnh
            </h2>
            <Paragraphs text={artistNote} className="mt-3 font-serif text-lg italic" />
          </section>
        )}

        {context && (
          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-text-muted">
              {t("editorialNoteLabel")}
            </h2>
            <Paragraphs text={context} className="mt-3 font-serif text-lg" />
          </section>
        )}

        {criticNote && (
          <section>
            <h2 className="font-sans text-xs uppercase tracking-widest text-text-muted">
              {t("criticNoteLabel")}
              {artwork.criticNoteAuthor ? ` — ${artwork.criticNoteAuthor}` : ""}
            </h2>
            <Paragraphs text={criticNote} className="mt-3 font-serif text-lg" />
          </section>
        )}

        {!descObjective && !artistNote && !context && !criticNote && (
          <p className="text-sm text-text-muted">{t("missingData")}</p>
        )}
      </div>

      <div className="mt-14 border-t border-white/10 pt-8">
        <Link
          href="/lien-he"
          className="inline-block border border-accent-cobalt-bright px-6 py-3 text-sm text-text transition-colors hover:bg-accent-cobalt"
        >
          {t("askAboutWork")}
        </Link>
      </div>
    </article>
  );
}
