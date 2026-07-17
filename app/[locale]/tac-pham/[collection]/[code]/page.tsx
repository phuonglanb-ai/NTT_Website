import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { isCollectionSlug } from "@/lib/content/collections";

export default async function ArtworkDetailPage({
  params,
}: {
  params: Promise<{ collection: string; code: string }>;
}) {
  const { collection, code } = await params;

  if (!isCollectionSlug(collection)) {
    notFound();
  }

  const t = await getTranslations("artworkDetail");

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <p className="font-sans text-xs uppercase tracking-widest text-text-muted">
        {code}
      </p>
      <p className="mt-6 text-text-muted">{t("comingSoon")}</p>
    </section>
  );
}
