import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  getArtist,
  getPublishedExhibitions,
  getPressArticles,
} from "@/lib/content/artist";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const artist = await getArtist();
  const bio = locale === "en" ? artist?.bioEn : artist?.bioVi;
  return {
    title: `${artist?.name ?? "Nghệ sĩ"} — Nguyễn Tuấn Thịnh`,
    description: bio ?? undefined,
  };
}

function Paragraphs({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-4 whitespace-pre-wrap leading-relaxed">
      {text.split(/\n{2,}/).map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
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
        <h1 className="font-serif text-4xl">{artist?.name ?? t("title")}</h1>
      </header>

      {!hasAnyContent && (
        <p className="mt-16 border border-dashed border-white/15 px-6 py-10 text-center text-text-muted">
          {t("empty")}
        </p>
      )}

      {statement && (
        <section className="mt-16">
          <h2 className="text-xs uppercase tracking-[0.28em] text-text-muted">
            {t("statement")}
          </h2>
          <div className="mt-4 font-serif text-xl italic leading-relaxed">
            <Paragraphs text={statement} />
          </div>
        </section>
      )}

      {bio && (
        <section className="mt-16">
          <h2 className="text-xs uppercase tracking-[0.28em] text-text-muted">{t("bio")}</h2>
          <div className="mt-4 text-text">
            <Paragraphs text={bio} />
          </div>
        </section>
      )}

      {journey && (
        <section className="mt-16">
          <h2 className="text-xs uppercase tracking-[0.28em] text-text-muted">{t("journey")}</h2>
          <div className="mt-4 text-text">
            <Paragraphs text={journey} />
          </div>
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
                        className="text-accent-cobalt hover:underline"
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
