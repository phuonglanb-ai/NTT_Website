import Link from "next/link";
import { getAllContributionsForAdmin } from "@/lib/content/friends";

const STATUS_LABEL: Record<string, string> = {
  draft: "Nháp",
  published: "Đã xuất bản",
};

export default async function AdminContributionListPage() {
  const contributions = await getAllContributionsForAdmin();

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl">Bài đóng góp</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/ban-be"
            className="border border-white/15 px-4 py-2 text-sm text-text-muted hover:text-text"
          >
            ← Bạn bè
          </Link>
          <Link
            href="/admin/ban-be/bai-viet/moi"
            className="border border-accent-cobalt-bright px-4 py-2 text-sm text-text hover:bg-accent-cobalt"
          >
            Thêm bài
          </Link>
        </div>
      </div>

      {contributions.length === 0 ? (
        <p className="mt-16 border border-dashed border-white/15 px-6 py-10 text-center text-text-muted">
          Chưa có bài đóng góp nào.
        </p>
      ) : (
        <table className="mt-10 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-text-muted">
              <th className="py-2 pr-4">Tiêu đề</th>
              <th className="py-2 pr-4">Người</th>
              <th className="py-2 pr-4">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((c) => (
              <tr key={c.id} className="border-b border-white/5 hover:bg-bg-elevated">
                <td className="py-2 pr-4">
                  <Link href={`/admin/ban-be/bai-viet/${c.id}`} className="hover:text-accent-cobalt-bright">
                    {c.titleVi}
                  </Link>
                </td>
                <td className="py-2 pr-4 text-text-muted">{c.personName}</td>
                <td className="py-2 pr-4 text-text-muted">{STATUS_LABEL[c.status] ?? c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
