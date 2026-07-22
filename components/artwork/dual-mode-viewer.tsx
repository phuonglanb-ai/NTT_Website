"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { ArtworkImage } from "@/lib/content/artworks";
import { ZoomPanImage } from "./zoom-pan-image";

type Props = {
  primaryImage: ArtworkImage | null;
  detailImages: ArtworkImage[];
  locale: string;
};

export function DualModeViewer({ primaryImage, detailImages, locale }: Props) {
  const [mode, setMode] = useState<"full" | "detail">("full");
  const t = useTranslations("artworkDetail");

  const altFor = (img: ArtworkImage) => (locale === "en" ? img.altTextEn : img.altTextVi);
  const hasDetail = detailImages.length > 0;

  return (
    <div>
      <div className="mb-4 flex gap-2 text-sm">
        <button
          type="button"
          onClick={() => setMode("full")}
          aria-pressed={mode === "full"}
          className={`border px-4 py-2 ${
            mode === "full" ? "border-accent-cobalt-bright text-text" : "border-white/15 text-text-muted"
          }`}
        >
          {t("fullView")}
        </button>
        <button
          type="button"
          onClick={() => setMode("detail")}
          aria-pressed={mode === "detail"}
          disabled={!hasDetail}
          className={`border px-4 py-2 disabled:opacity-30 ${
            mode === "detail" ? "border-accent-cobalt-bright text-text" : "border-white/15 text-text-muted"
          }`}
        >
          {t("detailView")}
        </button>
      </div>

      {(() => {
        const imagesToShow =
          mode === "detail" && hasDetail ? detailImages : primaryImage ? [primaryImage] : [];

        return (
          <div className="flex flex-col gap-10">
            {imagesToShow.map((img) => (
              <ZoomPanImage key={img.id} src={img.webUrl} alt={altFor(img)} />
            ))}
          </div>
        );
      })()}
    </div>
  );
}
