import { notFound } from "next/navigation";
import { getJournalEntryForEdit } from "@/lib/content/journal";
import { updateJournalEntry } from "../../actions";
import { JournalForm } from "@/components/admin/journal-form";

export default async function EditJournalEntryPage({
  params,
}: {
  params: Promise<{ source: string; id: string }>;
}) {
  const { source, id } = await params;
  if (source !== "news" && source !== "article") {
    notFound();
  }

  const entry = await getJournalEntryForEdit(source, id);
  if (!entry) {
    notFound();
  }

  const boundAction = updateJournalEntry.bind(null, source, id);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl">Sửa bài</h1>
      <div className="mt-10">
        <JournalForm action={boundAction} initial={entry} />
      </div>
    </section>
  );
}
