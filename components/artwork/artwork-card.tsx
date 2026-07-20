import { Link } from "@/i18n/navigation";
import type { ArtworkListItem } from "@/lib/content/artworks";

export function ArtworkCard({
  artwork,
  locale,
}: {
  artwork: ArtworkListItem;
  locale: string;
}) {
  const title = locale === "en" ? artwork.titleEn : artwork.titleVi;
  const alt = (locale === "en" ? artwork.primaryImageAltEn : artwork.primaryImageAltVi) ?? title;

  return (
    <Link
      href={`/tac-pham/${artwork.collectionSlug}/${artwork.code}`}
      className="group block"
    >
      <div className="aspect-[4/5] w-full overflow-hidden bg-bg-elevated">
        {artwork.primaryImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={artwork.primaryImageUrl}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="mt-3 flex items-baseline justify-between font-sans text-sm">
        <span className="font-serif text-base text-text">{title}</span>
        <span className="text-text-muted">{artwork.year}</span>
      </div>
    </Link>
  );
}
