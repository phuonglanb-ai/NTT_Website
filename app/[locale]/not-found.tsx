import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="mx-auto flex min-h-[50vh] max-w-2xl flex-col justify-center px-6 py-24 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.32em] text-text-muted">404</p>
      <h1 className="mt-4 font-serif text-3xl uppercase tracking-[0.14em]">{t("title")}</h1>
      <p className="mt-4 text-text-muted">{t("message")}</p>
      <div className="mx-auto mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="border border-accent-cobalt px-5 py-2 text-sm text-text transition-colors hover:bg-accent-cobalt"
        >
          {t("backHome")}
        </Link>
        <Link
          href="/tac-pham"
          className="border border-white/20 px-5 py-2 text-sm text-text-muted transition-colors hover:border-white/40 hover:text-text"
        >
          {t("exploreArtworks")}
        </Link>
      </div>
    </section>
  );
}
