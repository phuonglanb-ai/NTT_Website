import { getArtist } from "@/lib/content/artist";
import { updateArtist } from "./actions";
import { ArtistForm } from "@/components/admin/artist-form";

export default async function AdminArtistPage() {
  const artist = await getArtist();

  if (!artist) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-serif text-3xl">Nghệ sĩ</h1>
        <p className="mt-6 text-text-muted">
          Chưa có bản ghi nghệ sĩ trong cơ sở dữ liệu.
        </p>
      </section>
    );
  }

  const boundAction = updateArtist.bind(null, artist.id);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl">Thông tin nghệ sĩ</h1>
      <p className="mt-2 text-sm text-text-muted">
        Nội dung này hiển thị ở trang Nghệ sĩ công khai (song ngữ).
      </p>
      <div className="mt-10">
        <ArtistForm action={boundAction} artist={artist} />
      </div>
    </section>
  );
}
