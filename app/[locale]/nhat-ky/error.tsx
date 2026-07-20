"use client";

import { useTranslations } from "next-intl";

export default function JournalError({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations("journal");
  const tCommon = useTranslations("common");

  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-text-muted">{t("error")}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 border border-white/15 px-4 py-2 text-sm text-text-muted hover:text-text"
      >
        {tCommon("retry")}
      </button>
    </section>
  );
}
