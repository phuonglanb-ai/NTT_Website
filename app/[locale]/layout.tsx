import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Source_Sans_3, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { SiteNav } from "@/components/ui/site-nav";
import { SiteFooter } from "@/components/ui/site-footer";
import "../globals.css";

/*
 * Bo ky tu `vietnamese` la BAT BUOC. Truoc day chi khai bao "latin", nen cac
 * chu co dau (ữ, ệ, ạ, ơ...) khong nam trong file font duoc tai ve -- trinh
 * duyet phai lay tam tu font he thong. Ket qua: chu tieng Viet lech net so voi
 * chu khong dau ngay trong cung mot dong.
 */
const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

/*
 * Source Sans 3 -- sans humanist (khung chu dua tren net viet tay, khau chu mo).
 * Thay cho Inter: Inter la neo-grotesque, net rat deu va trung tinh, doc tot
 * nhung cung va kho tinh. Source Sans mem hon o cung mot do ro net.
 */
const bodySans = Source_Sans_3({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "600"],
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
    <html lang={locale} className={`${playfair.variable} ${bodySans.variable}`}>
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
