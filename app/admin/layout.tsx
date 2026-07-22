import type { Metadata } from "next";
import { Source_Sans_3, Playfair_Display } from "next/font/google";
import "../globals.css";

// Giu dong bo voi app/[locale]/layout.tsx: cung font, cung bo ky tu.
// Bo `vietnamese` la bat buoc -- khu quan tri toan bo bang tieng Viet.
const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const bodySans = Source_Sans_3({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quản trị — Nguyễn Tuấn Thịnh",
};

// Khu quản trị chỉ dùng tiếng Việt và nằm ngoài routing /vi /en (xem middleware.ts).
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${playfair.variable} ${bodySans.variable}`}>
      <body className="bg-bg font-sans text-text antialiased">{children}</body>
    </html>
  );
}
