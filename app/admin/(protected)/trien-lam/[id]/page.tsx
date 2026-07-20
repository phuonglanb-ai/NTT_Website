import { notFound } from "next/navigation";
import { getExhibitionForEdit } from "@/lib/content/exhibitions";
import { updateExhibition } from "../actions";
import { ExhibitionForm } from "@/components/admin/exhibition-form";

export default async function EditExhibitionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exhibition = await getExhibitionForEdit(id);

  if (!exhibition) {
    notFound();
  }

  const boundAction = updateExhibition.bind(null, id);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl">Sửa triển lãm</h1>
      <div className="mt-10">
        <ExhibitionForm action={boundAction} initial={exhibition} />
      </div>
    </section>
  );
}
