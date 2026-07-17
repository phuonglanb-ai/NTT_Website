import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
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
  title: "Quản trị — Nguyễn Tuấn Thịnh",
};

// Khu quản trị chỉ dùng tiếng Việt và nằm ngoài routing /vi /en (xem middleware.ts).
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-bg font-sans text-text antialiased">{children}</body>
    </html>
  );
}
