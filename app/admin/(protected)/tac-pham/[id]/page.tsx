import { notFound } from "next/navigation";
import { getCurrentUserRole } from "@/lib/auth/roles";
import { getArtworkForEdit, getFormLookups } from "@/lib/content/artworks";
import { updateArtwork } from "@/app/admin/tac-pham/actions";
import { ArtworkForm } from "@/components/admin/artwork-form";

export default async function EditArtworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [current, lookups, artwork] = await Promise.all([
    getCurrentUserRole(),
    getFormLookups(),
    getArtworkForEdit(id),
  ]);

  if (!artwork) {
    notFound();
  }

  const boundAction = updateArtwork.bind(null, id);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl">Sửa tác phẩm — {artwork.code}</h1>
      <div className="mt-10">
        <ArtworkForm
          action={boundAction}
          currentRole={current?.role ?? "guest"}
          lookups={lookups}
          initialData={artwork}
          existingImages={artwork.images}
        />
      </div>
    </section>
  );
}
