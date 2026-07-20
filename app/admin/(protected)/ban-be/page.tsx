import Link from "next/link";
import { getAllPeopleForAdmin } from "@/lib/content/friends";

const STATUS_LABEL: Record<string, string> = {
  draft: "Nháp",
  published: "Đã xuất bản",
};

export default async function AdminPeopleListPage() {
  const people = await getAllPeopleForAdmin();

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl">Góc bạn bè</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/ban-be/bai-viet"
            className="border border-white/15 px-4 py-2 text-sm text-text-muted hover:text-text"
          >
            Bài đóng góp
          </Link>
          <Link
            href="/admin/ban-be/moi"
            className="border border-accent-cobalt px-4 py-2 text-sm text-text hover:bg-accent-cobalt"
          >
            Thêm người
          </Link>
        </div>
      </div>

      {people.length === 0 ? (
        <p className="mt-16 border border-dashed border-white/15 px-6 py-10 text-center text-text-muted">
          Chưa có người nào.
        </p>
      ) : (
        <table className="mt-10 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-text-muted">
              <th className="py-2 pr-4">Ảnh</th>
              <th className="py-2 pr-4">Tên</th>
              <th className="py-2 pr-4">Vai trò</th>
              <th className="py-2 pr-4">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {people.map((p) => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-bg-elevated">
                <td className="py-2 pr-4">
                  {p.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.avatarUrl} alt="" className="h-12 w-12 object-cover" />
                  ) : (
                    <div className="h-12 w-12 bg-bg-elevated" />
                  )}
                </td>
                <td className="py-2 pr-4">
                  <Link href={`/admin/ban-be/${p.id}`} className="hover:text-accent-cobalt">
                    {p.name}
                  </Link>
                </td>
                <td className="py-2 pr-4 text-text-muted">{p.roleNoteVi ?? "—"}</td>
                <td className="py-2 pr-4 text-text-muted">{STATUS_LABEL[p.status] ?? p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
