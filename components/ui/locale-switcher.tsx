"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1" aria-label="Language switcher">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-current={loc === locale ? "true" : undefined}
          className={
            loc === locale
              ? "px-1 text-text"
              : "px-1 text-text-muted hover:text-text"
          }
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
