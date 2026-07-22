import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact-form";
import { ObfuscatedEmail } from "@/components/ui/obfuscated-email";
import { CONTACT } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <section className="mx-auto max-w-xl px-6 py-20">
      <h1 className="font-serif text-3xl uppercase tracking-[0.14em]">{t("title")}</h1>
      <p className="mt-6 text-text-muted">{t("intro")}</p>
      <p className="mt-4 text-sm text-text-muted">{t("priceNote")}</p>

      <div className="mt-10">
        <ContactForm />
      </div>

      {/* Lien he truc tiep -- cong khai theo phe duyet cua chu du an */}
      <div className="mt-16 border-t border-white/10 pt-10">
        <h2 className="text-xs uppercase tracking-[0.28em] text-text-muted">
          {t("directTitle")}
        </h2>
        <p className="mt-4 text-sm text-text-muted">{t("location")}</p>
        <dl className="mt-2 flex flex-col gap-2 text-sm">
          <div className="flex flex-wrap gap-x-3">
            <dt className="text-text-muted">{t("phoneLabel")}</dt>
            <dd className="text-text">{CONTACT.phone}</dd>
          </div>
          <div className="flex flex-wrap gap-x-3">
            <dt className="text-text-muted">{t("emailLabel")}</dt>
            <dd>
              <ObfuscatedEmail className="text-text hover:text-accent-cobalt" />
            </dd>
          </div>
        </dl>
        <p className="mt-6 text-sm text-text-muted">{t("visitNote")}</p>
      </div>
    </section>
  );
}
