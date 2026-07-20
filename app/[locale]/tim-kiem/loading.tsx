export default function LoadingSearch() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="h-9 w-40 animate-pulse bg-bg-elevated" />
      <div className="mt-6 h-11 w-full animate-pulse bg-bg-elevated" />
      <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="aspect-[4/5] w-full animate-pulse bg-bg-elevated" />
        ))}
      </div>
    </section>
  );
}
