import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  getArtist,
  getPublishedExhibitions,
  getPressArticles,
} from "@/lib/content/artist";
import { Paragraphs } from "@/components/ui/paragraphs";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("artistPage");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [t, artist, exhibitions, press] = await Promise.all([
    getTranslations("artistPage"),
    getArtist(),
    getPublishedExhibitions(),
    getPressArticles(),
  ]);

  const isEn = locale === "en";
  const bio = isEn ? artist?.bioEn : artist?.bioVi;
  const statement = isEn ? artist?.statementEn : artist?.statementVi;
  const journey = isEn ? artist?.journeyEn : artist?.journeyVi;

  const hasAnyContent = bio || statement || journey || exhibitions.length || press.length;

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end">
        {artist?.portraitUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={artist.portraitUrl}
            alt={artist.name}
            className="h-40 w-40 flex-none border border-white/10 object-cover"
          />
        )}
        <div>
          <h1 className="font-serif text-4xl">{artist?.name ?? t("title")}</h1>
          <p className="mt-2 text-sm uppercase tracking-[0.28em] text-text-muted">
            {t("role")}
          </p>
        </div>
      </header>

      {!hasAnyContent && (
        <p className="mt-16 border border-dashed border-white/15 px-6 py-10 text-center text-text-muted">
          {t("empty")}
        </p>
      )}

      {bio && (
        <section className="mt-16">
          <h2 className="text-xs uppercase tracking-[0.28em] text-text-muted">{t("bio")}</h2>
          <Paragraphs text={bio} className="mt-4 text-text" />
        </section>
      )}

      {/* Loi nghe si -- van ban do chinh nghe si duyet (xem docs/content-approvals.md) */}
      {statement && (
        <section className="mt-16">
          <h2 className="text-xs uppercase tracking-[0.28em] text-text-muted">
            {t("statement")} — Nguyễn Tuấn Thịnh
          </h2>
          <Paragraphs
            text={statement}
            className="mt-4 font-serif text-xl italic"
          />
        </section>
      )}

      {journey && (
        <section className="mt-16">
          <h2 className="text-xs uppercase tracking-[0.28em] text-text-muted">{t("journey")}</h2>
          <Paragraphs text={journey} className="mt-4 text-text" />
        </section>
      )}

      {exhibitions.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xs uppercase tracking-[0.28em] text-text-muted">
            {t("exhibitions")}
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {exhibitions.map((ex) => (
              <li key={ex.id} className="border-b border-white/5 pb-3">
                <p className="font-serif text-lg">{isEn ? ex.titleEn : ex.titleVi}</p>
                <p className="text-sm text-text-muted">
                  {[ex.venue, ex.startDate].filter(Boolean).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {press.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xs uppercase tracking-[0.28em] text-text-muted">{t("press")}</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {press.map((item) => (
              <li key={item.id} className="border-b border-white/5 pb-3">
                <p className="font-serif text-lg">{isEn ? item.titleEn : item.titleVi}</p>
                <p className="text-sm text-text-muted">
                  {item.author}
                  {item.sourceUrl && (
                    <>
                      {item.author ? " · " : ""}
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-cobalt-bright hover:underline"
                      >
                        {t("readSource")}
                      </a>
                    </>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
