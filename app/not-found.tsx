import Link from "next/link";
import "./globals.css";

/**
 * 404 cho duong dan nam ngoai /vi | /en (vd go sai prefix ngon ngu). Khong co
 * root layout dung chung (moi nhanh /[locale] va /admin tu render <html>), nen
 * trang nay tu dung khung html/body toi gian.
 */
export default function RootNotFound() {
  return (
    <html lang="vi">
      <body className="bg-bg font-sans text-text antialiased">
        <section className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 text-center">
          <p className="font-sans text-xs uppercase tracking-[0.32em] text-text-muted">404</p>
          <h1 className="mt-4 font-serif text-3xl">Không tìm thấy trang</h1>
          <p className="mt-4 text-text-muted">
            Trang bạn tìm không tồn tại hoặc đã được chuyển đi.
          </p>
          <Link
            href="/vi"
            className="mx-auto mt-8 w-fit border border-accent-cobalt px-5 py-2 text-sm text-text transition-colors hover:bg-accent-cobalt"
          >
            ← Về trang chủ
          </Link>
        </section>
      </body>
    </html>
  );
}
