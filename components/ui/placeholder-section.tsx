export function PlaceholderSection({
  title,
  note,
}: {
  title: string;
  note: string;
}) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-serif text-3xl">{title}</h1>
      <p className="mt-6 border border-dashed border-white/15 px-6 py-10 text-center text-text-muted">
        {note}
      </p>
    </section>
  );
}
