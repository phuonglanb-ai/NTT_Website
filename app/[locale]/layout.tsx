import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Inter, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { SiteNav } from "@/components/ui/site-nav";
import { SiteFooter } from "@/components/ui/site-footer";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nguyễn Tuấn Thịnh",
  description:
    "Không gian số chính thức lưu giữ tác phẩm, hành trình sáng tác và thế giới quan của họa sĩ Nguyễn Tuấn Thịnh.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations("a11y");

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-bg font-sans text-text antialiased">
        <NextIntlClientProvider>
          {/* Skip-link: an cho toi khi dung phim Tab -- WCAG 2.4.1 */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-accent-cobalt focus:bg-bg-elevated focus:px-4 focus:py-2 focus:text-text"
          >
            {t("skipToContent")}
          </a>
          <SiteNav />
          <main id="main">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
