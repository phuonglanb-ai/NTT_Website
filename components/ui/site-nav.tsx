import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { COLLECTION_SLUGS } from "@/lib/content/collections";
import { LocaleSwitcher } from "./locale-switcher";

export async function SiteNav() {
  const t = await getTranslations("nav");
  const tCollections = await getTranslations("collections");
  const tSearch = await getTranslations("search");

  return (
    <header className="border-b border-white/10">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link href="/" className="font-serif text-lg tracking-wide text-text">
          Nguyễn Tuấn Thịnh
        </Link>

        <div className="flex flex-wrap items-center gap-6 font-sans text-sm text-text-muted">
          <Link href="/nghe-si" className="transition-colors hover:text-text">
            {t("artist")}
          </Link>

          <div className="group relative">
            <Link href="/tac-pham" className="transition-colors hover:text-text">
              {t("artworks")}
            </Link>
            <div className="invisible absolute left-0 top-full z-10 mt-3 min-w-[220px] border border-white/10 bg-bg-elevated py-2 opacity-0 transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              {COLLECTION_SLUGS.map((slug) => (
                <Link
                  key={slug}
                  href={`/tac-pham/${slug}`}
                  className="block px-4 py-2 text-sm text-text-muted hover:text-text"
                >
                  {tCollections(`${slug}.name`)}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/nhat-ky" className="transition-colors hover:text-text">
            {t("journal")}
          </Link>
          <Link href="/ban-be" className="transition-colors hover:text-text">
            {t("friends")}
          </Link>
          <Link href="/lien-he" className="transition-colors hover:text-text">
            {t("contact")}
          </Link>
          <Link href="/tim-kiem" className="transition-colors hover:text-text">
            {tSearch("nav")}
          </Link>

          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
}
