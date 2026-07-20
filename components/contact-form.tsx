"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitInquiry } from "@/app/[locale]/lien-he/actions";

const fieldClass =
  "w-full border border-white/15 bg-bg-elevated px-3 py-2 text-text outline-none focus:border-accent-cobalt";
const labelClass = "text-sm text-text-muted";

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, formAction, pending] = useActionState(submitInquiry, undefined);

  if (state?.ok) {
    return (
      <p className="border border-accent-cobalt px-6 py-8 text-center text-text">
        {t("success")}
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {/* Honeypot: an voi nguoi that, bot hay dien */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex flex-col gap-1">
        <label className={labelClass} htmlFor="name">
          {t("name")}
        </label>
        <input id="name" name="name" required className={fieldClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass} htmlFor="email">
          {t("email")}
        </label>
        <input id="email" name="email" type="email" required className={fieldClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass} htmlFor="message">
          {t("message")}
        </label>
        <textarea id="message" name="message" rows={6} required className={fieldClass} />
      </div>

      {state?.error && (
        <p role="alert" className="text-sm text-accent-oxblood">
          {t(state.error === "required" ? "required" : state.error === "rateLimited" ? "rateLimited" : "error")}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-fit border border-accent-cobalt px-6 py-3 text-sm text-text transition-colors hover:bg-accent-cobalt disabled:opacity-50"
      >
        {pending ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
