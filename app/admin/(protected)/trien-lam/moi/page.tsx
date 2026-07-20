import { createExhibition } from "../actions";
import { ExhibitionForm } from "@/components/admin/exhibition-form";

export default function NewExhibitionPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl">Tạo triển lãm mới</h1>
      <div className="mt-10">
        <ExhibitionForm action={createExhibition} />
      </div>
    </section>
  );
}
