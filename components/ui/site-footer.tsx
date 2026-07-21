import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} Nguyễn Tuấn Thịnh. {t("rights")}
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/chinh-sach-rieng-tu" className="hover:text-text">
            {t("privacy")}
          </Link>
          <Link href="/dieu-khoan-hinh-anh" className="hover:text-text">
            {t("imageTerms")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
