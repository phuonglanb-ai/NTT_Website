import Link from "next/link";
import { getAllArtworksForAdmin } from "@/lib/content/artworks";

const STATUS_LABEL: Record<string, string> = {
  draft: "Nháp",
  published: "Đã xuất bản",
};

export default async function AdminArtworkListPage() {
  const artworks = await getAllArtworksForAdmin();

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl">Tác phẩm</h1>
        <Link
          href="/admin/tac-pham/moi"
          className="border border-accent-cobalt-bright px-4 py-2 text-sm text-text hover:bg-accent-cobalt"
        >
          Tạo tác phẩm mới
        </Link>
      </div>

      {artworks.length === 0 ? (
        <p className="mt-16 border border-dashed border-white/15 px-6 py-10 text-center text-text-muted">
          Chưa có tác phẩm nào. Bấm &quot;Tạo tác phẩm mới&quot; để bắt đầu.
        </p>
      ) : (
        <table className="mt-10 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-text-muted">
              <th className="py-2 pr-4">Ảnh</th>
              <th className="py-2 pr-4">Mã</th>
              <th className="py-2 pr-4">Tiêu đề</th>
              <th className="py-2 pr-4">Cõi</th>
              <th className="py-2 pr-4">Năm</th>
              <th className="py-2 pr-4">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map((artwork) => (
              <tr key={artwork.id} className="border-b border-white/5 hover:bg-bg-elevated">
                <td className="py-2 pr-4">
                  {artwork.primaryImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={artwork.primaryImageUrl}
                      alt=""
                      className="h-12 w-12 object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-bg-elevated" />
                  )}
                </td>
                <td className="py-2 pr-4 font-sans text-text-muted">{artwork.code}</td>
                <td className="py-2 pr-4">
                  <Link href={`/admin/tac-pham/${artwork.id}`} className="hover:text-accent-cobalt-bright">
                    {artwork.titleVi}
                  </Link>
                </td>
                <td className="py-2 pr-4 text-text-muted">{artwork.collectionSlug}</td>
                <td className="py-2 pr-4 text-text-muted">{artwork.year}</td>
                <td className="py-2 pr-4 text-text-muted">
                  {STATUS_LABEL[artwork.status] ?? artwork.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
