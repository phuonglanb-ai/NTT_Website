import { createContribution } from "../../actions";
import { getPeopleOptions } from "@/lib/content/friends";
import { ContributionForm } from "@/components/admin/contribution-form";

export default async function NewContributionPage() {
  const people = await getPeopleOptions();

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl">Thêm bài đóng góp</h1>
      {people.length === 0 ? (
        <p className="mt-8 text-text-muted">
          Cần thêm ít nhất một người ở mục Góc bạn bè trước khi tạo bài.
        </p>
      ) : (
        <div className="mt-10">
          <ContributionForm action={createContribution} people={people} />
        </div>
      )}
    </section>
  );
}
