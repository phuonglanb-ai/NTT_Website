import { notFound } from "next/navigation";
import { getPersonForEdit } from "@/lib/content/friends";
import { updatePerson } from "../actions";
import { PersonForm } from "@/components/admin/person-form";

export default async function EditPersonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const person = await getPersonForEdit(id);
  if (!person) {
    notFound();
  }

  const boundAction = updatePerson.bind(null, id);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl">Sửa: {person.name}</h1>
      <div className="mt-10">
        <PersonForm action={boundAction} initial={person} />
      </div>
    </section>
  );
}
