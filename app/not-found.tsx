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
          <h1 className="mt-4 font-serif text-3xl uppercase tracking-[0.14em]">
            Không tìm thấy trang
          </h1>
          <p className="mt-4 text-text-muted">
            Địa chỉ bạn đang mở có thể đã thay đổi hoặc nội dung chưa được công bố.
          </p>
          <div className="mx-auto mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/vi"
              className="border border-accent-cobalt px-5 py-2 text-sm text-text transition-colors hover:bg-accent-cobalt"
            >
              Trở về trang chủ
            </Link>
            <Link
              href="/vi/tac-pham"
              className="border border-white/20 px-5 py-2 text-sm text-text-muted transition-colors hover:border-white/40 hover:text-text"
            >
              Khám phá tác phẩm
            </Link>
          </div>
        </section>
      </body>
    </html>
  );
}
