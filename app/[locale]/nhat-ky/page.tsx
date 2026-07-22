import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getJournalFeed } from "@/lib/content/journal";
import { Paragraphs } from "@/components/ui/paragraphs";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("journal");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

const KIND_KEY: Record<string, string> = {
  news: "kindNews",
  journal: "kindJournal",
  criticism: "kindCriticism",
};

export default async function JournalPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const isEn = locale === "en";

  const [t, { items, totalPages }] = await Promise.all([
    getTranslations("journal"),
    getJournalFeed({ page }),
  ]);

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-serif text-3xl uppercase tracking-[0.14em]">{t("title")}</h1>
      <Paragraphs text={t("intro")} className="mt-6 text-text-muted" />

      {items.length === 0 ? (
        <p className="mt-16 border border-dashed border-white/15 px-6 py-10 text-center text-text-muted">
          {t("empty")}
        </p>
      ) : (
        <ul className="mt-12 flex flex-col gap-10">
          {items.map((entry) => {
            const title = isEn ? entry.titleEn : entry.titleVi;
            const excerpt = isEn ? entry.excerptEn : entry.excerptVi;
            return (
              <li key={`${entry.kind}-${entry.slug}`} className="border-b border-white/10 pb-8">
                <p className="text-xs uppercase tracking-[0.24em] text-text-muted">
                  {t(KIND_KEY[entry.kind] ?? "kindJournal")}
                </p>
                <h2 className="mt-2 font-serif text-2xl">
                  <Link href={`/nhat-ky/${entry.slug}`} className="hover:text-accent-cobalt-bright">
                    {title}
                  </Link>
                </h2>
                {excerpt && <p className="mt-3 text-text-muted">{excerpt}</p>}
                <Link
                  href={`/nhat-ky/${entry.slug}`}
                  className="mt-3 inline-block text-sm text-accent-cobalt-bright hover:underline"
                >
                  {t("readMore")}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {totalPages > 1 && (
        <nav className="mt-16 flex items-center justify-center gap-6 text-sm text-text-muted">
          {page > 1 ? (
            <Link href={`/nhat-ky?page=${page - 1}`} className="hover:text-text">
              {t("prev")}
            </Link>
          ) : (
            <span className="opacity-40">{t("prev")}</span>
          )}
          <span>{t("pageOf", { page, totalPages })}</span>
          {page < totalPages ? (
            <Link href={`/nhat-ky?page=${page + 1}`} className="hover:text-text">
              {t("next")}
            </Link>
          ) : (
            <span className="opacity-40">{t("next")}</span>
          )}
        </nav>
      )}
    </section>
  );
}
