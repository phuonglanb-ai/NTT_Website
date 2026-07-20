import { getCurrentUserRole } from "@/lib/auth/roles";
import { getFormLookups } from "@/lib/content/artworks";
import { createArtwork } from "@/app/admin/tac-pham/actions";
import { ArtworkForm } from "@/components/admin/artwork-form";

export default async function NewArtworkPage() {
  const [current, lookups] = await Promise.all([getCurrentUserRole(), getFormLookups()]);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl">Tạo tác phẩm mới</h1>
      <div className="mt-10">
        <ArtworkForm action={createArtwork} currentRole={current?.role ?? "guest"} lookups={lookups} />
      </div>
    </section>
  );
}
