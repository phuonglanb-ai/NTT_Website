import Link from "next/link";
import { requireRole } from "@/lib/auth/roles";
import { logout } from "@/app/admin/actions";

const ROLE_LABEL_VI: Record<string, string> = {
  editor: "Editor",
  artist: "Artist",
  moderator: "Moderator",
  admin: "Admin",
};

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const current = await requireRole("editor");

  if (!current.authorized) {
    return (
      <section className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="font-serif text-2xl">Không có quyền truy cập</h1>
        <p className="mt-4 text-text-muted">
          Tài khoản {current.email} chưa được cấp quyền quản trị. Liên hệ
          Admin để được cấp quyền.
        </p>
        <form action={logout} className="mt-8">
          <button
            type="submit"
            className="border border-white/15 px-4 py-2 text-sm text-text-muted hover:text-text"
          >
            Đăng xuất
          </button>
        </form>
      </section>
    );
  }

  return (
    <div>
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted">
          <Link href="/admin" className="hover:text-text">
            Quản trị
          </Link>
          <Link href="/admin/tac-pham" className="hover:text-text">
            Tác phẩm
          </Link>
          <Link href="/admin/nghe-si" className="hover:text-text">
            Nghệ sĩ
          </Link>
          <Link href="/admin/trien-lam" className="hover:text-text">
            Triển lãm
          </Link>
          <Link href="/admin/nhat-ky" className="hover:text-text">
            Nhật ký
          </Link>
          <Link href="/admin/ban-be" className="hover:text-text">
            Bạn bè
          </Link>
          <Link href="/admin/lien-he" className="hover:text-text">
            Lời nhắn
          </Link>
        </nav>
        <div className="flex items-center gap-4 text-sm text-text-muted">
          <span>
            {current.email} · {ROLE_LABEL_VI[current.role] ?? current.role}
          </span>
          <form action={logout}>
            <button type="submit" className="hover:text-text">
              Đăng xuất
            </button>
          </form>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
