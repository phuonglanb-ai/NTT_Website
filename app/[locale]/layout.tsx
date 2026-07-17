import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Inter, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteNav } from "@/components/ui/site-nav";
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

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-bg font-sans text-text antialiased">
        <NextIntlClientProvider>
          <SiteNav />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
