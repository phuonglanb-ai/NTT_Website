import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getJournalEntry } from "@/lib/content/journal";

type PageParams = { locale: string; slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const entry = await getJournalEntry(slug);
  if (!entry) return {};
  const title = locale === "en" ? entry.titleEn : entry.titleVi;
  const body = locale === "en" ? entry.bodyEn : entry.bodyVi;
  const description = body ? body.trim().slice(0, 160) : undefined;
  return {
    title: `${title} — Nguyễn Tuấn Thịnh`,
    description,
    openGraph: { title, description },
  };
}

export default async function JournalDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale, slug } = await params;
  const [t, entry] = await Promise.all([getTranslations("journal"), getJournalEntry(slug)]);

  if (!entry) {
    notFound();
  }

  const isEn = locale === "en";
  const title = isEn ? entry.titleEn : entry.titleVi;
  const body = isEn ? entry.bodyEn : entry.bodyVi;

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/nhat-ky" className="text-sm text-text-muted hover:text-text">
        {t("backToJournal")}
      </Link>

      <header className="mt-6 border-b border-white/10 pb-6">
        <h1 className="font-serif text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-text-muted">
          {[entry.author, entry.publishedAt?.slice(0, 10)].filter(Boolean).join(" · ")}
        </p>
      </header>

      {body && (
        <div className="mt-8 flex flex-col gap-5 whitespace-pre-wrap font-serif text-lg leading-relaxed">
          {body.split(/\n{2,}/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {entry.sourceUrl && (
        <a
          href={entry.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block text-sm text-accent-cobalt-bright hover:underline"
        >
          {t("readMore")}
        </a>
      )}
    </article>
  );
}
