export default function LoadingJournal() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <div className="h-9 w-48 animate-pulse bg-bg-elevated" />
      <div className="mt-4 h-5 w-80 max-w-full animate-pulse bg-bg-elevated" />
      <div className="mt-12 flex flex-col gap-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3 border-b border-white/10 pb-8">
            <div className="h-3 w-20 animate-pulse bg-bg-elevated" />
            <div className="h-7 w-2/3 animate-pulse bg-bg-elevated" />
            <div className="h-4 w-full animate-pulse bg-bg-elevated" />
          </div>
        ))}
      </div>
    </section>
  );
}
