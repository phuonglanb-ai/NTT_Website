import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { COLLECTION_SLUGS } from "@/lib/content/collections";
import { Paragraphs } from "@/components/ui/paragraphs";
import { Motif, MotifDivider } from "@/components/ui/motif";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
  };
}

/*
 * `inline-block` la BAT BUOC: <a> mac dinh la inline, ma margin doc khong co
 * tac dung tren phan tu inline -- nut se dinh sat vao doan van phia tren.
 */
const primaryCta =
  "inline-block border border-accent-cobalt px-6 py-3 text-sm tracking-wide text-text transition-colors hover:bg-accent-cobalt";
const secondaryCta =
  "inline-block border border-white/20 px-6 py-3 text-sm tracking-wide text-text-muted transition-colors hover:border-white/40 hover:text-text";

const sectionHeading = "font-serif text-2xl uppercase tracking-[0.18em]";

export default async function HomePage() {
  const [t, tCollections] = await Promise.all([
    getTranslations("home"),
    getTranslations("collections"),
  ]);

  return (
    /*
     * MOT khung duy nhat cho ca trang. Truoc day moi phan tu dat max-w rieng
     * (3xl / 5xl) nen le trai lech nhau, nhin nhu tho ra thut vao. Nay tat ca
     * cung mot khung; rieng van ban dai thi thu hep bang max-w-2xl BEN TRONG,
     * le trai van thang hang.
     */
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero -- giu tinh lang, khong dat nut mua tranh */}
      <section className="flex min-h-[70vh] max-w-2xl flex-col justify-center gap-6 py-24">
        <h1 className="font-serif text-4xl tracking-wide sm:text-5xl">{t("name")}</h1>
        <p className="text-sm uppercase tracking-[0.32em] text-text-muted">
          {t("discipline")}
        </p>
        <p className="font-serif text-xl uppercase tracking-[0.18em] text-text sm:text-2xl">
          {t("tagline")}
        </p>
        <p className="leading-[1.5] text-text-muted">{t("lead")}</p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link href="/tac-pham" className={primaryCta}>
            {t("ctaArtworks")}
          </Link>
          <Link href="/nghe-si" className={secondaryCta}>
            {t("ctaArtist")}
          </Link>
        </div>
      </section>

      <MotifDivider />

      {/* Gioi thieu ngan */}
      <section className="py-20">
        <Paragraphs text={t("intro")} className="max-w-2xl text-text-muted" />
        <div className="mt-10">
          <Link href="/nghe-si" className={secondaryCta}>
            {t("introCta")}
          </Link>
        </div>
      </section>

      <MotifDivider />

      {/* Ba coi sang tac -- dieu huong chinh */}
      <section className="py-20">
        <h2 className={sectionHeading}>{t("realmsTitle")}</h2>
        <p className="mt-5 max-w-2xl leading-[1.5] text-text-muted">{t("realmsLead")}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {COLLECTION_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={`/tac-pham/${slug}`}
              className="flex flex-col gap-3 border border-white/10 bg-bg-elevated p-6 transition-colors hover:border-accent-cobalt"
            >
              {/* Hoa quynh lam dau muc -- ba the giu chung mot nhip thi giac */}
              <Motif className="h-5 w-5 text-text-muted" />
              <h3 className="font-serif text-xl">{tCollections(`${slug}.name`)}</h3>
              {/* Serif + leading-snug: cung mot kieu voi dong dan o trang coi */}
              <p className="font-serif leading-snug text-text-muted">
                {tCollections(`${slug}.note`)}
              </p>
              <span className="mt-auto pt-5 text-sm text-accent-cobalt">
                {tCollections(`${slug}.explore`)} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <MotifDivider />

      {/* Tu xuong hoa -- nhat ky + tin tuc + trien lam (gop chung mot trang) */}
      <section className="py-20">
        <h2 className={sectionHeading}>{t("studioTitle")}</h2>
        <p className="mt-5 max-w-2xl leading-[1.5] text-text-muted">{t("studioLead")}</p>
        <div className="mt-10">
          <Link href="/nhat-ky" className={secondaryCta}>
            {t("studioCta")}
          </Link>
        </div>
      </section>

      <MotifDivider />

      {/* Lien he rieng */}
      <section className="py-20">
        <h2 className={sectionHeading}>{t("contactTitle")}</h2>
        <p className="mt-5 max-w-2xl leading-[1.5] text-text-muted">{t("contactLead")}</p>
        <div className="mt-10">
          <Link href="/lien-he" className={primaryCta}>
            {t("contactCta")}
          </Link>
        </div>
      </section>
    </div>
  );
}
