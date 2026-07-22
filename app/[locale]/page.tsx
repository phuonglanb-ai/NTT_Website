import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { COLLECTION_SLUGS } from "@/lib/content/collections";
import { Paragraphs } from "@/components/ui/paragraphs";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
  };
}

const primaryCta =
  "w-fit border border-accent-cobalt px-6 py-3 text-sm tracking-wide text-text transition-colors hover:bg-accent-cobalt";
const secondaryCta =
  "w-fit border border-white/20 px-6 py-3 text-sm tracking-wide text-text-muted transition-colors hover:border-white/40 hover:text-text";

export default async function HomePage() {
  const [t, tCollections] = await Promise.all([
    getTranslations("home"),
    getTranslations("collections"),
  ]);

  return (
    <>
      {/* Hero -- giu tinh lang, khong dat nut mua tranh */}
      <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center gap-6 px-6 py-24">
        <h1 className="font-serif text-4xl tracking-wide sm:text-5xl">{t("name")}</h1>
        <p className="text-sm uppercase tracking-[0.32em] text-text-muted">
          {t("discipline")}
        </p>
        <p className="font-serif text-xl uppercase tracking-[0.18em] text-text sm:text-2xl">
          {t("tagline")}
        </p>
        <p className="max-w-2xl text-text-muted">{t("lead")}</p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link href="/tac-pham" className={primaryCta}>
            {t("ctaArtworks")}
          </Link>
          <Link href="/nghe-si" className={secondaryCta}>
            {t("ctaArtist")}
          </Link>
        </div>
      </section>

      {/* Gioi thieu ngan */}
      <section className="mx-auto max-w-3xl border-t border-white/10 px-6 py-20">
        <Paragraphs text={t("intro")} className="text-text-muted" />
        <Link href="/nghe-si" className={`${secondaryCta} mt-8`}>
          {t("introCta")}
        </Link>
      </section>

      {/* Ba coi sang tac -- dieu huong chinh */}
      <section className="mx-auto max-w-5xl border-t border-white/10 px-6 py-20">
        <h2 className="font-serif text-2xl uppercase tracking-[0.18em]">
          {t("realmsTitle")}
        </h2>
        <p className="mt-4 max-w-2xl text-text-muted">{t("realmsLead")}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {COLLECTION_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={`/tac-pham/${slug}`}
              className="flex flex-col gap-3 border border-white/10 bg-bg-elevated p-6 transition-colors hover:border-accent-cobalt"
            >
              <h3 className="font-serif text-xl">{tCollections(`${slug}.name`)}</h3>
              <p className="text-sm text-text-muted">{tCollections(`${slug}.note`)}</p>
              <span className="mt-auto pt-4 text-sm text-accent-cobalt">
                {tCollections(`${slug}.explore`)} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Tu xuong hoa -- nhat ky + tin tuc + trien lam (gop chung mot trang) */}
      <section className="mx-auto max-w-3xl border-t border-white/10 px-6 py-20">
        <h2 className="font-serif text-2xl uppercase tracking-[0.18em]">
          {t("studioTitle")}
        </h2>
        <p className="mt-4 text-text-muted">{t("studioLead")}</p>
        <Link href="/nhat-ky" className={`${secondaryCta} mt-8`}>
          {t("studioCta")}
        </Link>
      </section>

      {/* Lien he rieng */}
      <section className="mx-auto max-w-3xl border-t border-white/10 px-6 py-20">
        <h2 className="font-serif text-2xl uppercase tracking-[0.18em]">
          {t("contactTitle")}
        </h2>
        <p className="mt-4 text-text-muted">{t("contactLead")}</p>
        <Link href="/lien-he" className={`${primaryCta} mt-8`}>
          {t("contactCta")}
        </Link>
      </section>
    </>
  );
}
