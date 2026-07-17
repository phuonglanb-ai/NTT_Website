import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { COLLECTION_SLUGS, isCollectionSlug } from "@/lib/content/collections";

export function generateStaticParams() {
  return COLLECTION_SLUGS.map((collection) => ({ collection }));
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;

  if (!isCollectionSlug(collection)) {
    notFound();
  }

  const tCollections = await getTranslations("collections");
  const t = await getTranslations("collectionPage");

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="font-serif text-3xl">
        {tCollections(`${collection}.name`)}
      </h1>
      <p className="mt-3 max-w-2xl text-text-muted">
        {tCollections(`${collection}.note`)}
      </p>

      {/* Empty state — sẽ thay bằng danh sách tác phẩm thật ở Slice 1 */}
      <p className="mt-16 border border-dashed border-white/15 px-6 py-10 text-center text-text-muted">
        {t("empty")}
      </p>
    </section>
  );
}
