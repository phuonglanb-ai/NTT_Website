"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import Script from "next/script";
import { useLocale, useTranslations } from "next-intl";
import { submitInquiry } from "@/app/[locale]/lien-he/actions";

const fieldClass =
  "w-full border border-white/15 bg-bg-elevated px-3 py-2 text-text outline-none focus:border-accent-cobalt-bright";
const labelClass = "text-sm text-text-muted";

/**
 * Turnstile dat mot o kiem tra "toi khong phai robot" vao form.
 *
 * Che do IMPLICIT: script cua Cloudflare tu tim phan tu `.cf-turnstile` roi
 * chen mot input an ten `cf-turnstile-response` vao form bao quanh. Server
 * (`lien-he/actions.ts`) doc dung ten do de xac minh.
 *
 * ENV-GATED o CA HAI PHIA, va hai phia phai khop nhau:
 *   - Chua dat NEXT_PUBLIC_TURNSTILE_SITE_KEY -> khong ve o kiem tra.
 *   - Chua dat TURNSTILE_SECRET_KEY           -> server bo qua xac minh.
 * Neu chi dat MOT trong hai, form se luon bao loi. Xem docs/runbook.md muc 10.
 */
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: { reset: (widget?: string) => void };
  }
}

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [state, formAction, pending] = useActionState(submitInquiry, undefined);

  /*
   * Moi ma Turnstile chi dung duoc MOT LAN. Neu gui that bai (thieu truong,
   * gui qua nhanh...), ma cu da bi tieu -> lan gui lai chac chan hong neu
   * khong lam moi o kiem tra.
   */
  useEffect(() => {
    if (state?.error) window.turnstile?.reset();
  }, [state]);

  if (state?.ok) {
    return (
      <p className="border border-accent-cobalt-bright px-6 py-8 text-center text-text">
        {t("success")}
      </p>
    );
  }

  return (
    <>
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      )}

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

        {TURNSTILE_SITE_KEY && (
          <div
            className="cf-turnstile"
            data-sitekey={TURNSTILE_SITE_KEY}
            data-theme="dark"
            data-language={locale === "en" ? "en" : "vi"}
          />
        )}

        {state?.error && (
          <p role="alert" className="text-sm text-accent-oxblood">
            {t(
              state.error === "required"
                ? "required"
                : state.error === "rateLimited"
                  ? "rateLimited"
                  : state.error === "captcha"
                    ? "captcha"
                    : "error",
            )}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-fit border border-accent-cobalt-bright px-6 py-3 text-sm text-text transition-colors hover:bg-accent-cobalt disabled:opacity-50"
        >
          {pending ? t("sending") : t("submit")}
        </button>
      </form>
    </>
  );
}
