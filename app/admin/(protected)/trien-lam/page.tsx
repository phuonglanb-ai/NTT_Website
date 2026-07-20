import Link from "next/link";
import { getAllExhibitionsForAdmin } from "@/lib/content/exhibitions";

const STATUS_LABEL: Record<string, string> = {
  draft: "Nháp",
  published: "Đã xuất bản",
};

export default async function AdminExhibitionListPage() {
  const exhibitions = await getAllExhibitionsForAdmin();

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl">Triển lãm</h1>
        <Link
          href="/admin/trien-lam/moi"
          className="border border-accent-cobalt px-4 py-2 text-sm text-text hover:bg-accent-cobalt"
        >
          Tạo triển lãm mới
        </Link>
      </div>

      {exhibitions.length === 0 ? (
        <p className="mt-16 border border-dashed border-white/15 px-6 py-10 text-center text-text-muted">
          Chưa có triển lãm nào.
        </p>
      ) : (
        <table className="mt-10 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-text-muted">
              <th className="py-2 pr-4">Tiêu đề</th>
              <th className="py-2 pr-4">Địa điểm</th>
              <th className="py-2 pr-4">Bắt đầu</th>
              <th className="py-2 pr-4">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {exhibitions.map((ex) => (
              <tr key={ex.id} className="border-b border-white/5 hover:bg-bg-elevated">
                <td className="py-2 pr-4">
                  <Link href={`/admin/trien-lam/${ex.id}`} className="hover:text-accent-cobalt">
                    {ex.titleVi}
                  </Link>
                </td>
                <td className="py-2 pr-4 text-text-muted">{ex.venue ?? "—"}</td>
                <td className="py-2 pr-4 text-text-muted">{ex.startDate ?? "—"}</td>
                <td className="py-2 pr-4 text-text-muted">
                  {STATUS_LABEL[ex.status] ?? ex.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
