import { createPerson } from "../actions";
import { PersonForm } from "@/components/admin/person-form";

export default function NewPersonPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl">Thêm người</h1>
      <div className="mt-10">
        <PersonForm action={createPerson} />
      </div>
    </section>
  );
}
