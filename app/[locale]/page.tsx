import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center gap-8 px-6 py-24">
      <p className="text-xs uppercase tracking-[0.32em] text-text-muted">
        {t("eyebrow")}
      </p>
      <h1 className="font-serif text-3xl italic leading-snug sm:text-4xl">
        {t("statement")}
      </h1>
      <Link
        href="/tac-pham"
        className="w-fit border border-accent-cobalt px-5 py-2 text-sm tracking-wide text-text transition-colors hover:bg-accent-cobalt"
      >
        {t("cta")}
      </Link>
    </section>
  );
}
