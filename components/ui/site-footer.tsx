import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ObfuscatedEmail } from "./obfuscated-email";
import { CONTACT } from "@/lib/site";

export async function SiteFooter() {
  const [t, tNav, tContact] = await Promise.all([
    getTranslations("footer"),
    getTranslations("nav"),
    getTranslations("contact"),
  ]);
  const year = new Date().getFullYear();

  const links: { href: string; label: string }[] = [
    { href: "/tac-pham", label: tNav("artworks") },
    { href: "/nghe-si", label: tNav("artist") },
    { href: "/nhat-ky", label: tNav("journal") },
    { href: "/ban-be", label: tNav("friends") },
    { href: "/lien-he", label: tNav("contact") },
  ];

  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-serif text-lg">Nguyễn Tuấn Thịnh</p>
            <p className="mt-1 text-sm text-text-muted">{t("tagline")}</p>
          </div>

          <nav aria-label={t("sitemapHeading")}>
            <h2 className="text-xs uppercase tracking-[0.24em] text-text-muted">
              {t("sitemapHeading")}
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-text-muted hover:text-text">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs uppercase tracking-[0.24em] text-text-muted">
              {t("contactHeading")}
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-text-muted">
              <li>{tContact("location")}</li>
              <li>{CONTACT.phone}</li>
              <li>
                <ObfuscatedEmail className="hover:text-text" />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-text-muted sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-2xl">
            © {year} Nguyễn Tuấn Thịnh. {t("rights")}
          </p>
          <nav className="flex flex-none flex-wrap gap-x-6 gap-y-2">
            <Link href="/chinh-sach-rieng-tu" className="hover:text-text">
              {t("privacy")}
            </Link>
            <Link href="/dieu-khoan-hinh-anh" className="hover:text-text">
              {t("imageTerms")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
