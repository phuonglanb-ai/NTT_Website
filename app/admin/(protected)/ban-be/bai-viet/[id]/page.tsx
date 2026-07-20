import { notFound } from "next/navigation";
import { getContributionForEdit, getPeopleOptions } from "@/lib/content/friends";
import { updateContribution } from "../../actions";
import { ContributionForm } from "@/components/admin/contribution-form";

export default async function EditContributionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [contribution, people] = await Promise.all([
    getContributionForEdit(id),
    getPeopleOptions(),
  ]);

  if (!contribution) {
    notFound();
  }

  const boundAction = updateContribution.bind(null, id);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl">Sửa bài đóng góp</h1>
      <div className="mt-10">
        <ContributionForm action={boundAction} people={people} initial={contribution} />
      </div>
    </section>
  );
}
