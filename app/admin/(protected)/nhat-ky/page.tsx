import Link from "next/link";
import { getAllJournalForAdmin } from "@/lib/content/journal";

const STATUS_LABEL: Record<string, string> = {
  draft: "Nháp",
  published: "Đã xuất bản",
};

const KIND_LABEL: Record<string, string> = {
  news: "Tin tức",
  journal: "Góc nhìn",
  criticism: "Phê bình",
  press: "Báo chí",
};

export default async function AdminJournalListPage() {
  const items = await getAllJournalForAdmin();

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl">Nhật ký</h1>
        <Link
          href="/admin/nhat-ky/moi"
          className="border border-accent-cobalt px-4 py-2 text-sm text-text hover:bg-accent-cobalt"
        >
          Tạo bài mới
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="mt-16 border border-dashed border-white/15 px-6 py-10 text-center text-text-muted">
          Chưa có bài viết nào.
        </p>
      ) : (
        <table className="mt-10 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-text-muted">
              <th className="py-2 pr-4">Tiêu đề</th>
              <th className="py-2 pr-4">Loại</th>
              <th className="py-2 pr-4">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={`${item.source}-${item.id}`} className="border-b border-white/5 hover:bg-bg-elevated">
                <td className="py-2 pr-4">
                  <Link
                    href={`/admin/nhat-ky/${item.source}/${item.id}`}
                    className="hover:text-accent-cobalt"
                  >
                    {item.titleVi}
                  </Link>
                </td>
                <td className="py-2 pr-4 text-text-muted">{KIND_LABEL[item.kind] ?? item.kind}</td>
                <td className="py-2 pr-4 text-text-muted">
                  {STATUS_LABEL[item.status] ?? item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
