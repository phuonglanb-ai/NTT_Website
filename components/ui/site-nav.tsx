import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { COLLECTION_SLUGS } from "@/lib/content/collections";
import { LocaleSwitcher } from "./locale-switcher";

export async function SiteNav() {
  const t = await getTranslations("nav");
  const tCollections = await getTranslations("collections");
  const tSearch = await getTranslations("search");
  const tA11y = await getTranslations("a11y");

  return (
    <header className="border-b border-white/10">
      {/*
        gap-x / gap-y tach rieng: tren dien thoai thanh dieu huong xuong dong,
        neu dung `gap-6` chung thi khoang cach GIUA HAI DONG cung la 1.5rem --
        nhin roi rac. Giu gian cach ngang, thu hep gian cach doc.
      */}
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-6 py-5">
        <Link href="/" className="font-serif text-lg tracking-wide text-text">
          Nguyễn Tuấn Thịnh
        </Link>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-sm text-text-muted">
          {/*
            Menu Tac pham chi liet ke BA COI + "Toan bo tac pham".
            Loai hinh (tranh gia ve / ky hoa / dieu khac / thuc hanh khac) la
            BO LOC, dat noi bat o dau trang Tac pham -- khong dua vao menu,
            theo CLAUDE.md muc 1 (ba coi la dieu huong chinh).
          */}
          <div className="group relative">
            <Link href="/tac-pham" className="transition-colors hover:text-text">
              {t("artworks")}
            </Link>
            <div
              aria-label={tA11y("artworkMenu")}
              className="invisible absolute left-0 top-full z-10 mt-3 min-w-[240px] border border-white/10 bg-bg-elevated py-2 opacity-0 transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
            >
              {COLLECTION_SLUGS.map((slug) => (
                <Link
                  key={slug}
                  href={`/tac-pham/${slug}`}
                  className="block px-4 py-2 text-sm text-text-muted hover:text-text"
                >
                  {tCollections(`${slug}.name`)}
                </Link>
              ))}
              <span className="my-2 block border-t border-white/10" aria-hidden="true" />
              <Link
                href="/tac-pham"
                className="block px-4 py-2 text-sm text-text-muted hover:text-text"
              >
                {t("allArtworks")}
              </Link>
            </div>
          </div>

          <Link href="/nghe-si" className="transition-colors hover:text-text">
            {t("artist")}
          </Link>
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
