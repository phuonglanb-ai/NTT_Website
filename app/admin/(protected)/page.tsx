import Link from "next/link";

export default function AdminHomePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-serif text-3xl">Quản trị</h1>
      <div className="mt-10">
        <Link
          href="/admin/tac-pham"
          className="inline-block border border-accent-cobalt-bright px-5 py-2 text-sm text-text hover:bg-accent-cobalt"
        >
          Quản lý tác phẩm
        </Link>
      </div>
    </section>
  );
}
