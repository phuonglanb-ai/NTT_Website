import { createJournalEntry } from "../actions";
import { JournalForm } from "@/components/admin/journal-form";

export default function NewJournalEntryPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl">Tạo bài mới</h1>
      <div className="mt-10">
        <JournalForm action={createJournalEntry} />
      </div>
    </section>
  );
}
